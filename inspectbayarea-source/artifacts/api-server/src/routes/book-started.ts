import { Router, type IRouter } from "express";
import { z } from "zod/v4";
import { db, leadsTable, leadEventsTable } from "@workspace/db";
import { sendBookingStartedEmail } from "../email";
import { STARTED_SOURCE, findStartedLead } from "../crm/mirror";
import { AttributionBody, SERVICES, describeSource } from "./book";

const router: IRouter = Router();

/**
 * Step one of the two-step booking form on /schedule: a name, a phone number
 * and which inspection.
 *
 * The form used to send nothing until step two — email, street, city, day and
 * time — was complete, so someone who typed their name and number and then put
 * the phone down was lost, with their number already on the screen. Over the
 * week to Nov 8 the ad page took 20 clicks and sent no bookings.
 *
 * This saves that first step as a lead and tells the owner straight away, so
 * he can call back whether or not the rest arrives. When it does, /book
 * completes this same lead (see completeStartedLead) instead of adding another.
 *
 * No `bookings` row: there is no address or date to book yet. No email to the
 * customer either — there is no address to send it to, and the form tells them
 * they will get a call.
 */

const text = (max: number) => z.string().trim().max(max);
const optionalText = (max: number) => text(max).optional().or(z.literal(""));

const StartedBody = z.object({
  name: text(200).min(2, "Name is required"),
  phone: text(50).min(7, "Phone number is required"),
  service: z.enum(SERVICES),
  serviceLabel: text(120).min(1),
  jobTypeNote: optionalText(200),
  sourcePath: optionalText(200),
  attribution: AttributionBody,
  /** Honeypot. Hidden from people; bots fill it. */
  company: optionalText(200),
});

/** Going back to step one and continuing again is the same person, not a second lead. */
const REPEAT_WINDOW_MS = 30 * 60 * 1000;

router.post("/book/started", async (req, res) => {
  const parse = StartedBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Please enter your name and phone number." });
    return;
  }
  const d = parse.data;

  // A filled honeypot is a bot. Answer as if it worked so it learns nothing.
  if (d.company) {
    res.json({ success: true });
    return;
  }

  const formPage = d.sourcePath?.replace(/\/+$/, "") || "/";
  const source = describeSource(d.attribution);

  try {
    const existing = await findStartedLead(d.phone, REPEAT_WINDOW_MS);
    if (existing !== null) {
      res.json({ success: true, leadId: existing });
      return;
    }

    const notes = [
      `Booking started (${formPage}) — step one only, not finished`,
      d.jobTypeNote && `Job type: ${d.jobTypeNote}`,
      source && `Source: ${source}`,
    ].filter(Boolean).join("\n");

    const [lead] = await db
      .insert(leadsTable)
      .values({ source: STARTED_SOURCE, name: d.name, phone: d.phone, service: d.service, notes })
      .returning({ id: leadsTable.id });

    await db.insert(leadEventsTable).values({
      leadId: lead.id,
      type: "created",
      body: `Started the booking form on ${formPage}: name, phone and inspection.`,
      toStage: "new",
    });

    req.log.info({ leadId: lead.id, service: d.service, sourcePath: d.sourcePath }, "Started booking saved");

    // Never awaited: a mail failure must not get in the way of step two.
    sendBookingStartedEmail({
      name: d.name,
      phone: d.phone,
      serviceLabel: d.serviceLabel,
      jobTypeNote: d.jobTypeNote || undefined,
      attribution: source,
      formPage,
    }).catch((err) => req.log.error({ err }, "Failed to send started-booking notification email"));

    res.json({ success: true, leadId: lead.id });
  } catch (err) {
    req.log.error({ err }, "Failed to save started booking");
    res.status(500).json({ error: "Something went wrong." });
  }
});

export default router;
