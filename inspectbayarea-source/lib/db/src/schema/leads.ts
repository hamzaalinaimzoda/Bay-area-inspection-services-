import { pgTable, serial, text, integer, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { bookingsTable } from "./bookings";
import { contactsTable } from "./contacts";

/**
 * The CRM spine.
 *
 * `bookings` and `contacts` stay exactly as they are: they are the raw record of
 * what a form submitted, and the public site writes to them. This table is the
 * *working* record — the thing that gets a stage, an owner, an outcome and a
 * value. Every website submission gets a matching lead row, and phone and Google
 * Business Profile enquiries are entered here directly with no source row at all.
 *
 * Keeping them separate rather than bolting stage columns onto both intake
 * tables means one place to query the pipeline, one place to compute close rate,
 * and no risk of a CRM change breaking the live booking form.
 *
 * The reason this table exists at all: every advertising decision on this
 * account is currently blocked on one unknown — what fraction of leads become
 * paid jobs, and for how much. `stage`, `wonValue` and `lostReason` are that
 * answer.
 */

/** Where the lead came from. Drives cost-per-lead attribution against ad spend. */
export const LEAD_SOURCES = [
  "website_booking",
  /** Step one of the two-step booking form; becomes website_booking when they finish. */
  "website_booking_started",
  "website_contact",
  "website_quote",
  "phone",
  "google_business",
  "referral",
  "repeat_client",
  "other",
] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

/**
 * Pipeline stages, in order.
 *
 * `won` and `lost` are terminal. Everything before them is open pipeline.
 * Deliberately short: a solo operator will not maintain eleven stages, and a
 * stage nobody updates is worse than no stage at all.
 */
export const LEAD_STAGES = [
  "new",
  "contacted",
  "quoted",
  "scheduled",
  "inspected",
  "won",
  "lost",
] as const;
export type LeadStage = (typeof LEAD_STAGES)[number];

/**
 * Why a lead did not convert.
 *
 * `spam` is a first-class reason, not a footnote. This account receives junk
 * enquiries and out-of-scope calls, and counting them as lost leads would
 * understate the real close rate and make paid traffic look worse than it is.
 * Anything marked spam is excluded from conversion maths.
 */
export const LOST_REASONS = [
  "price",
  "timing",
  "went_elsewhere",
  "out_of_area",
  "not_qualified",
  "no_response",
  "spam",
  "other",
] as const;
export type LostReason = (typeof LOST_REASONS)[number];

/** Property type. Drives the price book — a condo is $549 where a house is $649. */
export const PROPERTY_TYPES = ["single_family", "condo", "multi_unit", "commercial", "unknown"] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const leadsTable = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),

    source: text("source").notNull().default("other"),
    /** Set when the lead originated from the site's booking form. */
    bookingId: integer("booking_id").references(() => bookingsTable.id),
    /** Set when the lead originated from the site's contact form. */
    contactId: integer("contact_id").references(() => contactsTable.id),

    name: text("name").notNull(),
    phone: text("phone"),
    email: text("email"),

    /** Service slug, matching the website's service data (e.g. "mold-inspection"). */
    service: text("service"),
    propertyType: text("property_type").notNull().default("unknown"),
    address: text("address"),
    city: text("city"),
    zip: text("zip"),

    stage: text("stage").notNull().default("new"),

    /**
     * Money is stored in whole cents as an integer. Never floats — a rounding
     * drift of a fraction of a cent per row silently corrupts revenue totals,
     * and this table is the input to the close-rate and ROI numbers.
     */
    quotedValueCents: integer("quoted_value_cents"),
    wonValueCents: integer("won_value_cents"),

    lostReason: text("lost_reason"),

    /** When the inspection is booked for. Drives the schedule view. */
    scheduledFor: timestamp("scheduled_for"),
    /** Set when the lead reaches a terminal stage, for time-to-close reporting. */
    closedAt: timestamp("closed_at"),

    notes: text("notes"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    // The inbox sorts by stage then recency; the dashboard groups by source and
    // closed date. These three cover every read the CRM performs.
    index("leads_stage_created_idx").on(t.stage, t.createdAt),
    index("leads_source_idx").on(t.source),
    index("leads_closed_at_idx").on(t.closedAt),
  ],
);

/**
 * Append-only activity log.
 *
 * Separate from `leads.notes` on purpose: `notes` is the current scratchpad you
 * overwrite, this is the history you never lose. Stage changes are written here
 * automatically so "when did this actually get quoted" is answerable later.
 */
export const LEAD_EVENT_TYPES = ["note", "call", "email", "sms", "stage_change", "created"] as const;
export type LeadEventType = (typeof LEAD_EVENT_TYPES)[number];

export const leadEventsTable = pgTable(
  "lead_events",
  {
    id: serial("id").primaryKey(),
    leadId: integer("lead_id")
      .notNull()
      .references(() => leadsTable.id, { onDelete: "cascade" }),
    type: text("type").notNull().default("note"),
    body: text("body"),
    /** Populated only for stage_change events, so the funnel can be reconstructed. */
    fromStage: text("from_stage"),
    toStage: text("to_stage"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("lead_events_lead_id_idx").on(t.leadId, t.createdAt)],
);

export const insertLeadSchema = createInsertSchema(leadsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;

export const insertLeadEventSchema = createInsertSchema(leadEventsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertLeadEvent = z.infer<typeof insertLeadEventSchema>;
export type LeadEvent = typeof leadEventsTable.$inferSelect;
