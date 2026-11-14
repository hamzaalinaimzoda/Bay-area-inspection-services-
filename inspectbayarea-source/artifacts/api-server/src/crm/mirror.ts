import { and, desc, eq, gt, isNull } from "drizzle-orm";
import { db, leadsTable, leadEventsTable } from "@workspace/db";

/**
 * Mirror a public form submission into the CRM pipeline.
 *
 * Deliberately fire-and-forget and never awaited by the request path: a CRM
 * write must not be able to fail a customer's booking. If this throws, the
 * booking is still saved and the operator still gets the notification email —
 * the lead can be recovered later with the idempotent /crm/backfill route.
 */
export async function mirrorLead(input: {
  source: "website_booking" | "website_contact";
  bookingId?: number;
  contactId?: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  notes?: string | null;
  scheduledFor?: Date | null;
}): Promise<void> {
  const [lead] = await db
    .insert(leadsTable)
    .values({
      source: input.source,
      bookingId: input.bookingId ?? null,
      contactId: input.contactId ?? null,
      name: input.name,
      phone: input.phone,
      email: input.email,
      service: input.service,
      address: input.address,
      notes: input.notes ?? null,
      scheduledFor: input.scheduledFor ?? null,
    })
    .returning({ id: leadsTable.id });

  await db.insert(leadEventsTable).values({
    leadId: lead.id,
    type: "created",
    body: input.source === "website_booking"
      ? "Booking request submitted on the website."
      : "Contact form submitted on the website.",
    toStage: "new",
  });
}

/** A lead from step one of the two-step booking form: a name, a phone and an inspection. */
export const STARTED_SOURCE = "website_booking_started";

/** How long a started booking waits for its second step before it is its own lead for good. */
const STARTED_WINDOW_MS = 24 * 60 * 60 * 1000;

/** The newest unfinished started booking for this phone number, if there is one. */
export async function findStartedLead(phone: string, withinMs = STARTED_WINDOW_MS): Promise<number | null> {
  const [found] = await db
    .select({ id: leadsTable.id })
    .from(leadsTable)
    .where(
      and(
        eq(leadsTable.source, STARTED_SOURCE),
        eq(leadsTable.phone, phone),
        isNull(leadsTable.bookingId),
        gt(leadsTable.createdAt, new Date(Date.now() - withinMs)),
      ),
    )
    .orderBy(desc(leadsTable.createdAt))
    .limit(1);
  return found?.id ?? null;
}

/**
 * Turn a started booking into the finished one, so the pipeline holds one lead
 * per customer rather than a "started" and a "booked" for the same person.
 * Matched on the phone number typed into the same form a moment earlier.
 * Returns false when there is nothing to complete.
 */
export async function completeStartedLead(input: {
  bookingId: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  notes?: string | null;
  scheduledFor?: Date | null;
}): Promise<boolean> {
  const id = await findStartedLead(input.phone);
  if (id === null) return false;

  await db
    .update(leadsTable)
    .set({
      source: "website_booking",
      bookingId: input.bookingId,
      name: input.name,
      email: input.email,
      service: input.service,
      address: input.address,
      notes: input.notes ?? null,
      scheduledFor: input.scheduledFor ?? null,
      updatedAt: new Date(),
    })
    .where(eq(leadsTable.id, id));

  await db.insert(leadEventsTable).values({
    leadId: id,
    type: "note",
    body: "Finished the booking form: address, day and time added.",
  });
  return true;
}
