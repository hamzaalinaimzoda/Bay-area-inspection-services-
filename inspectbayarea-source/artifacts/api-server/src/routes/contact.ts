import { Router, type IRouter } from "express";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";
import { db, contactsTable } from "@workspace/db";
import { sendContactEmail } from "../email";
import { mirrorLead } from "../crm/mirror";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parse = SubmitContactBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid input. Please check all required fields." });
    return;
  }

  const { name, phone, email, service, address, message } = parse.data;

  try {
    const [inserted] = await db.insert(contactsTable).values({
      name,
      phone,
      email,
      service,
      address,
      message: message ?? null,
    }).returning({ id: contactsTable.id });

    req.log.info({ name, email, service }, "Contact form submission saved");

    mirrorLead({
      source: "website_contact",
      contactId: inserted.id,
      name, phone, email, service, address, notes: message,
    }).catch((err) => req.log.error({ err }, "Failed to mirror contact into CRM"));

    sendContactEmail({ name, phone, email, service, address, message }).catch((err) =>
      req.log.error({ err }, "Failed to send contact notification email")
    );

    const result = SubmitContactResponse.parse({
      success: true,
      message: "Thank you! We'll be in touch within the hour. For faster service, call us directly.",
    });
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to save contact form submission");
    res.status(500).json({ error: "Something went wrong. Please call us directly or try again." });
  }
});

export default router;
