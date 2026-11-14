import { Router, type IRouter, type Response } from "express";
import { z } from "zod/v4";
import { eq } from "drizzle-orm";
import { db, bookingsTable, leadsTable, leadEventsTable } from "@workspace/db";
import { verifyBookingToken } from "../booking-links";
import { esc, SERVICE_LABELS, TIME_LABELS, BUSINESS_NAME } from "../email";
import { sendBookingConfirmedEmail, needsFromNotes, longDate, serviceLabelFor } from "../customer-email";

const router: IRouter = Router();

/**
 * Confirm a booking from the owner's notification email.
 *
 * GET shows a small form prefilled with what the customer asked for; POST sends
 * the customer their "confirmed" email and records the booking as confirmed.
 * It is a two-step page rather than a one-click link on purpose: mail security
 * scanners open links in emails, and a GET that sent email would fire on its
 * own. The link is signed (see booking-links.ts), so only the owner's inbox can
 * open it.
 */

/** Start of each requested slot, used to prefill the arrival time. */
const SLOT_START: Record<string, string> = {
  "8am-11am": "08:00",
  "11am-2pm": "11:00",
  "2pm-5pm": "14:00",
  "5pm-8pm": "17:00",
};

/** A Pacific wall-clock date and time as a real instant. Exported for testing. */
export function pacificToUtc(date: string, time: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
  }).formatToParts(new Date(guess));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const shown = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return new Date(guess - (shown - guess));
}

function page(res: Response, status: number, title: string, inner: string): void {
  res
    .status(status)
    .set({ "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", "Referrer-Policy": "no-referrer" })
    .type("html")
    .send(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${esc(title)} — ${BUSINESS_NAME}</title>
<style>
  body{margin:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827}
  .wrap{max-width:560px;margin:0 auto;padding:24px 16px}
  .card{background:#fff;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,.08);overflow:hidden}
  .top{background:#1a3a5c;color:#fff;padding:20px 24px}.top p{margin:4px 0 0;color:#fbbf8a;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em}
  .body{padding:24px}
  h1{margin:0;font-size:19px} dl{display:grid;grid-template-columns:110px 1fr;gap:6px 12px;margin:0 0 20px;font-size:14px}
  dt{color:#6b7280;font-weight:600} dd{margin:0}
  label{display:block;font-size:14px;font-weight:600;margin:14px 0 6px}
  input,textarea{width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:8px;padding:11px 12px;font-size:16px;font-family:inherit}
  .row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  button{margin-top:20px;width:100%;background:#16a34a;color:#fff;border:0;border-radius:8px;padding:14px;font-size:16px;font-weight:700;cursor:pointer}
  .note{font-size:13px;color:#6b7280;margin-top:10px}.warn{background:#fef3c7;border-radius:8px;padding:10px 12px;font-size:14px;color:#92400e;margin-bottom:16px}
  .ok{background:#dcfce7;border-radius:8px;padding:14px;font-size:15px;color:#14532d}
</style></head><body><div class="wrap"><div class="card"><div class="top"><h1>${BUSINESS_NAME}</h1><p>${esc(title)}</p></div><div class="body">${inner}</div></div></div></body></html>`);
}

async function loadBooking(idParam: string, token: unknown) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) return null;
  if (!verifyBookingToken(id, typeof token === "string" ? token : undefined)) return null;
  const [booking] = await db.select().from(bookingsTable).where(eq(bookingsTable.id, id)).limit(1);
  return booking ?? null;
}

router.get("/book/:id/confirm", async (req, res) => {
  try {
    const b = await loadBooking(req.params.id, req.query.t);
    if (!b) return page(res, 404, "Link not valid", "<p>This confirm link isn't valid or the booking no longer exists. Confirm the customer by phone instead.</p>");

    const requested = `${longDate(b.preferredDate)}, ${TIME_LABELS[b.preferredTime] ?? b.preferredTime}`;
    const already = b.status === "confirmed"
      ? `<div class="warn">Already confirmed once. Sending again emails the customer an updated confirmation.</div>` : "";
    page(res, 200, "Confirm booking", `
      ${already}
      <dl>
        <dt>Customer</dt><dd>${esc(b.name)}</dd>
        <dt>Email</dt><dd>${esc(b.email)}</dd>
        <dt>Phone</dt><dd>${esc(b.phone)}</dd>
        <dt>Inspection</dt><dd>${esc(serviceLabelFor(b.service, b.notes, SERVICE_LABELS[b.service] ?? b.service))}</dd>
        <dt>Property</dt><dd>${esc(b.address)}</dd>
        <dt>Asked for</dt><dd>${esc(requested)}</dd>
      </dl>
      <form method="post">
        <div class="row">
          <div><label for="date">Date</label><input id="date" name="date" type="date" required value="${esc(b.preferredDate)}"></div>
          <div><label for="time">Arrival time</label><input id="time" name="time" type="time" required step="900" value="${esc(SLOT_START[b.preferredTime] ?? "10:00")}"></div>
        </div>
        <label for="price">Price (optional)</label>
        <input id="price" name="price" placeholder="e.g. $649" maxlength="40">
        <label for="message">Note to the customer (optional)</label>
        <textarea id="message" name="message" rows="3" maxlength="1000" placeholder="e.g. I'll call when I'm 20 minutes away."></textarea>
        <button type="submit">Confirm &amp; email ${esc(b.name.split(" ")[0])}</button>
        <p class="note">They'll get the date, time, price and a preparation checklist based on what they booked.</p>
      </form>`);
  } catch (err) {
    req.log.error({ err }, "Confirm page failed");
    page(res, 500, "Something went wrong", "<p>Couldn't load this booking. Try again, or confirm by phone.</p>");
  }
});

const ConfirmBody = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  price: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

router.post("/book/:id/confirm", async (req, res) => {
  try {
    const b = await loadBooking(req.params.id, req.query.t);
    if (!b) return page(res, 404, "Link not valid", "<p>This confirm link isn't valid. Nothing was sent.</p>");
    const parse = ConfirmBody.safeParse(req.body);
    if (!parse.success) return page(res, 400, "Check the date and time", "<p>Please go back and enter a date and an arrival time. Nothing was sent.</p>");
    const { date, time, price, message } = parse.data;
    const startsAt = pacificToUtc(date, time);

    await sendBookingConfirmedEmail({
      to: b.email,
      name: b.name,
      serviceLabel: serviceLabelFor(b.service, b.notes, SERVICE_LABELS[b.service] ?? b.service),
      address: b.address,
      date,
      time,
      startsAt,
      price: price || undefined,
      message: message || undefined,
      needs: needsFromNotes(b.service, b.notes),
    });

    await db.update(bookingsTable).set({ status: "confirmed" }).where(eq(bookingsTable.id, b.id));

    // Keep the CRM (if it's ever switched on) in step. Best-effort only.
    try {
      const [lead] = await db.select().from(leadsTable).where(eq(leadsTable.bookingId, b.id)).limit(1);
      if (lead) {
        await db.update(leadsTable)
          .set({ stage: "scheduled", scheduledFor: startsAt, updatedAt: new Date() })
          .where(eq(leadsTable.id, lead.id));
        await db.insert(leadEventsTable).values({
          leadId: lead.id,
          type: "email",
          body: `Confirmation emailed to ${b.email} for ${date} ${time}${price ? ` (${price})` : ""}.`,
          fromStage: lead.stage,
          toStage: "scheduled",
        });
      }
    } catch (err) {
      req.log.error({ err }, "Confirm: CRM update failed");
    }

    req.log.info({ bookingId: b.id, date, time }, "Booking confirmed and customer emailed");
    const [hh, mm] = time.split(":").map(Number);
    const clock = new Date(Date.UTC(2000, 0, 1, hh, mm)).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
    page(res, 200, "Booking confirmed", `
      <div class="ok"><strong>Done.</strong> ${esc(b.name)} has been emailed their confirmation for ${esc(longDate(date))} at ${esc(clock)}.</div>
      <p class="note">If you need to change it, open the same link again and send an updated time.</p>`);
  } catch (err) {
    req.log.error({ err }, "Confirm failed");
    page(res, 500, "Not sent", "<p>The confirmation email couldn't be sent, so nothing was changed. Please try again in a minute, or confirm by phone.</p>");
  }
});

export default router;
