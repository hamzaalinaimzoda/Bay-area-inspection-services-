import { Router, type IRouter } from "express";
import { z } from "zod/v4";
import { db, leadsTable, leadEventsTable } from "@workspace/db";
import { sendContactEmail } from "../email";

const router: IRouter = Router();

/**
 * Minimum-friction quote request.
 *
 * The existing /contact endpoint requires eight fields — name, phone, a valid
 * email, a service, street, city and a five-digit ZIP — before anything can be
 * submitted. Over the week to Sep 1 the campaign produced 55 clicks and zero
 * form submissions. Someone who clicked an ad to ask what an inspection costs
 * had to type their full street address first.
 *
 * This endpoint asks for a name and a phone number. Everything else is optional
 * and can be collected on the callback, which is how the job actually gets
 * quoted anyway. It deliberately does not reuse /contact: that route's contract
 * is generated from the OpenAPI spec and shared with the booking flow, and
 * loosening it there would weaken validation for forms that genuinely need the
 * full address.
 *
 * Writes straight to the CRM `leads` table rather than `contacts`, so a quick
 * quote lands in the same pipeline as everything else and carries its own source
 * for attribution.
 */

const QuoteBody = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  // Kept loose on purpose. A regex that rejects "(628) 230 0357" or an entered
  // country code costs more real leads than the malformed entries it prevents;
  // a human reads this within the hour regardless.
  phone: z.string().trim().min(7, "Phone number is required").max(50),
  email: z.string().trim().max(200).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  address: z.string().trim().max(300).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  /** Which page produced the lead, for landing-page attribution. */
  sourcePath: z.string().trim().max(200).optional(),
});

/** Treat empty strings from an untouched optional input as absent. */
function orNull(v: string | undefined): string | null {
  const t = (v ?? "").trim();
  return t === "" ? null : t;
}

router.post("/quote", async (req, res) => {
  const parse = QuoteBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Please enter your name and phone number." });
    return;
  }

  const { name, phone } = parse.data;
  const email = orNull(parse.data.email);
  const service = orNull(parse.data.service);
  const address = orNull(parse.data.address);
  const message = orNull(parse.data.message);
  const sourcePath = orNull(parse.data.sourcePath);

  try {
    const [lead] = await db
      .insert(leadsTable)
      .values({
        source: "website_quote",
        name,
        phone,
        email,
        service,
        address,
        notes: message,
      })
      .returning({ id: leadsTable.id });

    await db.insert(leadEventsTable).values({
      leadId: lead.id,
      type: "created",
      body: sourcePath
        ? `Quick quote request from ${sourcePath}.`
        : "Quick quote request from the website.",
      toStage: "new",
    });

    req.log.info({ leadId: lead.id, service, sourcePath }, "Quote request saved");

    // Never awaited: a mail failure must not fail the customer's submission.
    // The lead is already durable in the database by this point.
    sendContactEmail({
      name,
      phone,
      email: email ?? "Not provided",
      service: service ?? "other",
      address: address ?? "Not provided",
      message: message ?? undefined,
    }).catch((err) => req.log.error({ err }, "Failed to send quote notification email"));

    res.json({
      success: true,
      message: "Got it. You'll get a call back shortly — usually within the hour.",
      leadId: lead.id,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to save quote request");
    res.status(500).json({ error: "Something went wrong. Please call us directly." });
  }
});

export default router;
