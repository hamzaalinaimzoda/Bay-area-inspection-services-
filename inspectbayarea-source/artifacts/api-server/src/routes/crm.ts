import { Router, type IRouter } from "express";
import { and, desc, eq, gte, ilike, inArray, isNotNull, or, sql } from "drizzle-orm";
import { z } from "zod/v4";
import {
  db,
  leadsTable,
  leadEventsTable,
  bookingsTable,
  contactsTable,
  LEAD_SOURCES,
  LEAD_STAGES,
  LOST_REASONS,
  PROPERTY_TYPES,
  LEAD_EVENT_TYPES,
} from "@workspace/db";
import { handleLogin, handleLogout, handleSession, requireAuth } from "../crm/auth";

const router: IRouter = Router();

/* ------------------------------------------------------------------ *
 * Session
 * ------------------------------------------------------------------ */

router.post("/crm/login", handleLogin);
router.post("/crm/logout", handleLogout);
router.get("/crm/session", handleSession);

// Everything below this line requires a signed session cookie.
router.use("/crm", requireAuth);

/* ------------------------------------------------------------------ *
 * Validation
 * ------------------------------------------------------------------ */

/**
 * Money crosses the wire as dollars, because that is what the operator types,
 * and is stored as integer cents. Rounding happens once, here, at the boundary.
 */
const dollarsToCents = z
  .union([z.number(), z.string()])
  .transform((v) => (typeof v === "string" ? Number(v.replace(/[^0-9.]/g, "")) : v))
  .refine((n) => Number.isFinite(n) && n >= 0 && n < 1_000_000, "Amount out of range")
  .transform((n) => Math.round(n * 100));

const LeadPatch = z.object({
  stage: z.enum(LEAD_STAGES).optional(),
  name: z.string().min(1).max(200).optional(),
  phone: z.string().max(50).nullable().optional(),
  email: z.string().max(200).nullable().optional(),
  service: z.string().max(100).nullable().optional(),
  propertyType: z.enum(PROPERTY_TYPES).optional(),
  address: z.string().max(300).nullable().optional(),
  city: z.string().max(120).nullable().optional(),
  zip: z.string().max(20).nullable().optional(),
  quotedValue: dollarsToCents.nullable().optional(),
  wonValue: dollarsToCents.nullable().optional(),
  lostReason: z.enum(LOST_REASONS).nullable().optional(),
  scheduledFor: z.coerce.date().nullable().optional(),
  notes: z.string().max(5000).nullable().optional(),
});

const NewLead = z.object({
  source: z.enum(LEAD_SOURCES).default("phone"),
  name: z.string().min(1).max(200),
  phone: z.string().max(50).optional(),
  email: z.string().max(200).optional(),
  service: z.string().max(100).optional(),
  propertyType: z.enum(PROPERTY_TYPES).default("unknown"),
  address: z.string().max(300).optional(),
  city: z.string().max(120).optional(),
  zip: z.string().max(20).optional(),
  quotedValue: dollarsToCents.optional(),
  notes: z.string().max(5000).optional(),
});

const NewEvent = z.object({
  type: z.enum(LEAD_EVENT_TYPES).default("note"),
  body: z.string().min(1).max(5000),
});

/* ------------------------------------------------------------------ *
 * Leads
 * ------------------------------------------------------------------ */

router.get("/crm/leads", async (req, res) => {
  const stage = typeof req.query.stage === "string" ? req.query.stage : undefined;
  const source = typeof req.query.source === "string" ? req.query.source : undefined;
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
  const limit = Math.min(Number(req.query.limit) || 200, 500);

  const where = [];
  if (stage === "open") {
    // The default working view: everything not yet decided.
    where.push(inArray(leadsTable.stage, ["new", "contacted", "quoted", "scheduled", "inspected"]));
  } else if (stage && (LEAD_STAGES as readonly string[]).includes(stage)) {
    where.push(eq(leadsTable.stage, stage));
  }
  if (source && (LEAD_SOURCES as readonly string[]).includes(source)) {
    where.push(eq(leadsTable.source, source));
  }
  if (q) {
    const like = `%${q}%`;
    where.push(
      or(
        ilike(leadsTable.name, like),
        ilike(leadsTable.phone, like),
        ilike(leadsTable.email, like),
        ilike(leadsTable.address, like),
        ilike(leadsTable.city, like),
      ),
    );
  }

  try {
    const rows = await db
      .select()
      .from(leadsTable)
      .where(where.length ? and(...where) : undefined)
      .orderBy(desc(leadsTable.createdAt))
      .limit(limit);
    res.json({ leads: rows });
  } catch (err) {
    req.log.error({ err }, "CRM: failed to list leads");
    res.status(500).json({ error: "Could not load leads." });
  }
});

router.get("/crm/leads/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "Bad lead id." });
    return;
  }
  try {
    const [lead] = await db.select().from(leadsTable).where(eq(leadsTable.id, id)).limit(1);
    if (!lead) {
      res.status(404).json({ error: "Lead not found." });
      return;
    }
    const events = await db
      .select()
      .from(leadEventsTable)
      .where(eq(leadEventsTable.leadId, id))
      .orderBy(desc(leadEventsTable.createdAt));
    res.json({ lead, events });
  } catch (err) {
    req.log.error({ err }, "CRM: failed to load lead");
    res.status(500).json({ error: "Could not load lead." });
  }
});

/** Manual entry — the path for phone calls and Google Business Profile enquiries. */
router.post("/crm/leads", async (req, res) => {
  const parse = NewLead.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid lead.", details: parse.error.issues });
    return;
  }
  const { quotedValue, ...rest } = parse.data;
  try {
    const [lead] = await db
      .insert(leadsTable)
      .values({ ...rest, quotedValueCents: quotedValue ?? null })
      .returning();
    await db.insert(leadEventsTable).values({
      leadId: lead.id,
      type: "created",
      body: `Lead created manually (${lead.source}).`,
      toStage: lead.stage,
    });
    res.status(201).json({ lead });
  } catch (err) {
    req.log.error({ err }, "CRM: failed to create lead");
    res.status(500).json({ error: "Could not create lead." });
  }
});

router.patch("/crm/leads/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "Bad lead id." });
    return;
  }
  const parse = LeadPatch.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid update.", details: parse.error.issues });
    return;
  }

  try {
    const [before] = await db.select().from(leadsTable).where(eq(leadsTable.id, id)).limit(1);
    if (!before) {
      res.status(404).json({ error: "Lead not found." });
      return;
    }

    const { quotedValue, wonValue, ...rest } = parse.data;
    const patch: Record<string, unknown> = { ...rest, updatedAt: new Date() };
    if (quotedValue !== undefined) patch.quotedValueCents = quotedValue;
    if (wonValue !== undefined) patch.wonValueCents = wonValue;

    // Stamp the close time when a lead first reaches a terminal stage, and clear
    // it if it is reopened, so time-to-close never counts a stale timestamp.
    if (rest.stage && rest.stage !== before.stage) {
      const terminal = rest.stage === "won" || rest.stage === "lost";
      patch.closedAt = terminal ? new Date() : null;
    }

    const [after] = await db.update(leadsTable).set(patch).where(eq(leadsTable.id, id)).returning();

    if (rest.stage && rest.stage !== before.stage) {
      await db.insert(leadEventsTable).values({
        leadId: id,
        type: "stage_change",
        body: `Stage changed from ${before.stage} to ${rest.stage}.`,
        fromStage: before.stage,
        toStage: rest.stage,
      });
    }

    res.json({ lead: after });
  } catch (err) {
    req.log.error({ err }, "CRM: failed to update lead");
    res.status(500).json({ error: "Could not update lead." });
  }
});

router.post("/crm/leads/:id/events", async (req, res) => {
  const id = Number(req.params.id);
  const parse = NewEvent.safeParse(req.body);
  if (!Number.isInteger(id) || !parse.success) {
    res.status(400).json({ error: "Invalid event." });
    return;
  }
  try {
    const [event] = await db
      .insert(leadEventsTable)
      .values({ leadId: id, type: parse.data.type, body: parse.data.body })
      .returning();
    await db.update(leadsTable).set({ updatedAt: new Date() }).where(eq(leadsTable.id, id));
    res.status(201).json({ event });
  } catch (err) {
    req.log.error({ err }, "CRM: failed to add event");
    res.status(500).json({ error: "Could not add note." });
  }
});

/* ------------------------------------------------------------------ *
 * Metrics — the reason this system exists
 * ------------------------------------------------------------------ */

/**
 * Close rate and revenue, windowed by days.
 *
 * Spam is excluded from every denominator. Counting junk enquiries as lost
 * leads would understate the real close rate and make paid traffic look worse
 * than it is — which is exactly the decision this feeds.
 */
router.get("/crm/metrics", async (req, res) => {
  const days = Math.min(Math.max(Number(req.query.days) || 90, 1), 730);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    const notSpam = sql`(${leadsTable.lostReason} is distinct from 'spam')`;

    const [totals] = await db
      .select({
        total: sql<number>`count(*)::int`,
        won: sql<number>`count(*) filter (where ${leadsTable.stage} = 'won')::int`,
        lost: sql<number>`count(*) filter (where ${leadsTable.stage} = 'lost')::int`,
        open: sql<number>`count(*) filter (where ${leadsTable.stage} not in ('won','lost'))::int`,
        spam: sql<number>`count(*) filter (where ${leadsTable.lostReason} = 'spam')::int`,
        revenueCents: sql<number>`coalesce(sum(${leadsTable.wonValueCents}) filter (where ${leadsTable.stage} = 'won'), 0)::int`,
      })
      .from(leadsTable)
      .where(and(gte(leadsTable.createdAt, since), notSpam));

    const byStage = await db
      .select({ stage: leadsTable.stage, count: sql<number>`count(*)::int` })
      .from(leadsTable)
      .where(and(gte(leadsTable.createdAt, since), notSpam))
      .groupBy(leadsTable.stage);

    const bySource = await db
      .select({
        source: leadsTable.source,
        total: sql<number>`count(*)::int`,
        won: sql<number>`count(*) filter (where ${leadsTable.stage} = 'won')::int`,
        revenueCents: sql<number>`coalesce(sum(${leadsTable.wonValueCents}) filter (where ${leadsTable.stage} = 'won'), 0)::int`,
      })
      .from(leadsTable)
      .where(and(gte(leadsTable.createdAt, since), notSpam))
      .groupBy(leadsTable.source);

    const byLostReason = await db
      .select({ reason: leadsTable.lostReason, count: sql<number>`count(*)::int` })
      .from(leadsTable)
      .where(and(gte(leadsTable.createdAt, since), eq(leadsTable.stage, "lost"), isNotNull(leadsTable.lostReason)))
      .groupBy(leadsTable.lostReason);

    // Close rate is measured over *decided* leads only. Including still-open
    // pipeline in the denominator would drag the number down purely because
    // recent leads have not been worked yet.
    const decided = totals.won + totals.lost;
    const closeRate = decided > 0 ? totals.won / decided : null;
    const avgJobCents = totals.won > 0 ? Math.round(totals.revenueCents / totals.won) : null;

    res.json({
      windowDays: days,
      totals,
      closeRate,
      decided,
      avgJobCents,
      /** Expected gross value of one lead — the number to compare against cost per lead. */
      valuePerLeadCents: closeRate !== null && avgJobCents !== null ? Math.round(closeRate * avgJobCents) : null,
      byStage,
      bySource,
      byLostReason,
    });
  } catch (err) {
    req.log.error({ err }, "CRM: failed to compute metrics");
    res.status(500).json({ error: "Could not load metrics." });
  }
});

/* ------------------------------------------------------------------ *
 * Backfill
 * ------------------------------------------------------------------ */

/**
 * Create lead rows for bookings and contacts submitted before the CRM existed.
 *
 * Idempotent: rows already linked by bookingId/contactId are skipped, so this is
 * safe to run repeatedly and safe to leave wired to a button in the UI.
 */
router.post("/crm/backfill", async (req, res) => {
  try {
    const existing = await db
      .select({ bookingId: leadsTable.bookingId, contactId: leadsTable.contactId })
      .from(leadsTable);
    const haveBooking = new Set(existing.map((r) => r.bookingId).filter(Boolean));
    const haveContact = new Set(existing.map((r) => r.contactId).filter(Boolean));

    const bookings = await db.select().from(bookingsTable);
    const contacts = await db.select().from(contactsTable);

    const toInsert = [
      ...bookings
        .filter((b) => !haveBooking.has(b.id))
        .map((b) => ({
          source: "website_booking" as const,
          bookingId: b.id,
          name: b.name,
          phone: b.phone,
          email: b.email,
          service: b.service,
          address: b.address,
          notes: b.notes,
          scheduledFor: b.preferredDate ? new Date(`${b.preferredDate}T12:00:00Z`) : null,
          createdAt: b.createdAt,
        })),
      ...contacts
        .filter((c) => !haveContact.has(c.id))
        .map((c) => ({
          source: "website_contact" as const,
          contactId: c.id,
          name: c.name,
          phone: c.phone,
          email: c.email,
          service: c.service,
          address: c.address,
          notes: c.message,
          createdAt: c.createdAt,
        })),
    ];

    if (toInsert.length === 0) {
      res.json({ created: 0, message: "Already up to date." });
      return;
    }

    const created = await db.insert(leadsTable).values(toInsert).returning({ id: leadsTable.id });
    await db.insert(leadEventsTable).values(
      created.map((c) => ({
        leadId: c.id,
        type: "created" as const,
        body: "Imported from an earlier website submission.",
        toStage: "new",
      })),
    );

    req.log.info({ created: created.length }, "CRM: backfilled leads");
    res.json({ created: created.length });
  } catch (err) {
    req.log.error({ err }, "CRM: backfill failed");
    res.status(500).json({ error: "Backfill failed." });
  }
});

export default router;
