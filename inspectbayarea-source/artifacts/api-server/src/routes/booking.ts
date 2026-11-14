import { Router, type IRouter } from "express";
import { SubmitBookingBody, SubmitBookingResponse } from "@workspace/api-zod";
import { db, bookingsTable } from "@workspace/db";
import { sendBookingEmail } from "../email";
import { mirrorLead } from "../crm/mirror";
import { confirmUrl } from "../booking-links";
import { sendRequestReceivedEmail, needsFromNotes, serviceLabelFor } from "../customer-email";
import { SERVICE_LABELS } from "../email";

const router: IRouter = Router();

router.post("/booking", async (req, res) => {
  const parse = SubmitBookingBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid input. Please check all required fields." });
    return;
  }

  const { name, phone, email, service, address, preferredDate, preferredTime, notes } = parse.data;

  // The generated zod schema coerces `format: date` to a Date, but the `preferred_date`
  // column and the email template both want a plain YYYY-MM-DD string. The Date was built
  // from a date-only string, so it sits at UTC midnight and slicing the ISO form round-trips.
  const preferredDateStr = preferredDate.toISOString().slice(0, 10);

  try {
    const [inserted] = await db
      .insert(bookingsTable)
      .values({
        name,
        phone,
        email,
        service,
        address,
        preferredDate: preferredDateStr,
        preferredTime,
        notes: notes ?? null,
      })
      .returning({ id: bookingsTable.id });

    req.log.info({ name, email, service, preferredDate: preferredDateStr, preferredTime }, "Booking request saved");

    mirrorLead({
      source: "website_booking",
      bookingId: inserted.id,
      name, phone, email, service, address, notes,
      scheduledFor: new Date(`${preferredDateStr}T12:00:00Z`),
    }).catch((err) => req.log.error({ err }, "Failed to mirror booking into CRM"));

    sendBookingEmail({ name, phone, email, service, address, preferredDate: preferredDateStr, preferredTime, notes, bookingId: inserted.id, confirmUrl: confirmUrl(inserted.id) }).catch((err) =>
      req.log.error({ err }, "Failed to send booking notification email")
    );

    sendRequestReceivedEmail({
      to: email,
      name,
      phone,
      serviceLabel: serviceLabelFor(service, notes, SERVICE_LABELS[service] ?? service),
      address,
      preferredDate: preferredDateStr,
      preferredTime,
      needs: needsFromNotes(service, notes),
    }).catch((err) => req.log.error({ err }, "Failed to send customer request-received email"));

    const result = SubmitBookingResponse.parse({
      success: true,
      message: "Your booking request has been received! We'll confirm your appointment within the hour.",
      bookingId: inserted.id,
    });
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to save booking");
    res.status(500).json({ error: "Something went wrong. Please call us directly or try again." });
  }
});

export default router;
