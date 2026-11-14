import { Router, type IRouter } from "express";
import { z } from "zod/v4";
import { db, bookingsTable } from "@workspace/db";
import { sendDetailedBookingEmail } from "../email";
import { mirrorLead, completeStartedLead } from "../crm/mirror";
import { confirmUrl } from "../booking-links";
import { sendRequestReceivedEmail, needsFromNotes } from "../customer-email";

const router: IRouter = Router();

/**
 * The full booking form at /book, and the short form on the ad landing page
 * /schedule. The short form sends only contact, address, inspection and time,
 * so everything else here is optional; /book enforces its own required fields
 * in the browser.
 *
 * The quick booking modal posts to /booking, whose body is generated from the
 * OpenAPI spec and carries eight fields. This form collects everything the
 * inspector would otherwise ask on the confirmation call — property type and
 * size, access, the contingency deadline, the agent — so it gets its own route
 * rather than loosening that shared contract.
 *
 * It writes the same `bookings` row and CRM lead as /booking, so the job lands
 * in the same pipeline. The fields the table has no column for are composed
 * into `notes`, one labelled line each, and the notification email lays them
 * out in sections.
 *
 * Kept outside the OpenAPI contract, like /quote and /google-reviews.
 */

const text = (max: number) => z.string().trim().max(max);
const optionalText = (max: number) => text(max).optional().or(z.literal(""));
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date");

export const SERVICES = [
  "full-home-inspection",
  "mold-inspection",
  "gas-leak-detection",
  "moisture-water-damage",
  "home-mold-bundle",
  "other",
] as const;
const TIMES = ["8am-11am", "11am-2pm", "2pm-5pm", "5pm-8pm"] as const;

/** Where the visitor came from, captured on landing (see src/lib/attribution.ts on the site). */
export const AttributionBody = z
  .object({
    gclid: optionalText(200),
    gbraid: optionalText(200),
    wbraid: optionalText(200),
    utmSource: optionalText(100),
    utmMedium: optionalText(100),
    utmCampaign: optionalText(200),
    utmTerm: optionalText(200),
    utmContent: optionalText(200),
    landingPage: optionalText(200),
    referrer: optionalText(300),
  })
  .partial()
  .optional();

export const BookBody = z.object({
  name: text(200).min(2, "Name is required"),
  phone: text(50).min(7, "Phone number is required"),
  email: z.email("Valid email required").max(200),
  role: optionalText(60),
  contactPreference: optionalText(40),

  addressStreet: text(200).min(3, "Street address is required"),
  addressUnit: optionalText(40),
  addressCity: text(80).min(1, "City is required"),
  addressZip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code").optional().or(z.literal("")),

  propertyType: optionalText(80),
  squareFeet: optionalText(40),
  yearBuilt: optionalText(10),
  bedrooms: optionalText(10),
  bathrooms: optionalText(10),
  foundation: optionalText(60),
  occupancy: optionalText(60),
  utilitiesOn: optionalText(20),

  service: z.enum(SERVICES),
  serviceLabel: text(120).min(1),
  jobTypeNote: optionalText(200),
  addOns: z.array(text(80)).max(6).default([]),
  concerns: optionalText(2000),

  preferredDate: isoDate,
  preferredTime: z.enum(TIMES),
  altDate: isoDate.optional().or(z.literal("")),
  altTime: z.enum(TIMES).optional().or(z.literal("")),
  deadline: isoDate.optional().or(z.literal("")),
  access: optionalText(80),
  attending: optionalText(40),

  agentName: optionalText(200),
  agentPhone: optionalText(50),
  agentEmail: optionalText(200),

  heardFrom: optionalText(80),
  discountEligible: z.boolean().default(false),
  notes: optionalText(2000),
  /** The /book checkbox ("this is a request, not a confirmed time"); the short form says so in its copy instead. */
  agreed: z.boolean().optional(),

  sourcePath: optionalText(200),
  /** "quick" from the short form, which is on /schedule and in the site's booking popup on every page. */
  form: z.enum(["quick", "full"]).optional(),
  attribution: AttributionBody,
  /** Honeypot. Hidden from people; bots fill it. */
  company: optionalText(200),
});

export type BookInput = z.infer<typeof BookBody>;

const TIME_LABELS: Record<string, string> = {
  "8am-11am": "Morning (8–11 AM)",
  "11am-2pm": "Midday (11 AM–2 PM)",
  "2pm-5pm": "Afternoon (2–5 PM)",
  "5pm-8pm": "Evening (5–8 PM)",
};

/** One line saying where the booking came from: Google Ads, another campaign, or organic. Exported for testing. */
export function describeSource(a: BookInput["attribution"]): string {
  if (!a) return "";
  const clickId = a.gclid || a.gbraid || a.wbraid;
  const campaign = [a.utmCampaign && `campaign ${a.utmCampaign}`, a.utmTerm && `keyword "${a.utmTerm}"`].filter(Boolean).join(", ");
  if (clickId) return `Google Ads click${campaign ? ` (${campaign})` : ""}${a.landingPage ? ` · landed on ${a.landingPage}` : ""}`;
  if (a.utmSource) return `${a.utmSource}${a.utmMedium ? ` / ${a.utmMedium}` : ""}${campaign ? ` (${campaign})` : ""}`;
  if (a.referrer) return `Referred by ${a.referrer}`;
  return a.landingPage ? `Direct · landed on ${a.landingPage}` : "";
}

/** The page a booking was sent from. */
const formPage = (d: BookInput) => d.sourcePath?.replace(/\/+$/, "") || "/";

/** True for the short form. Older pages that predate `form` sent the short form only from /schedule. */
const isQuickForm = (d: BookInput) => d.form === "quick" || formPage(d) === "/schedule";

/** Labelled lines for everything the bookings table has no column for. Exported for testing. */
export function composeNotes(d: BookInput): string {
  const join = (...parts: (string | undefined | false)[]) => parts.filter(Boolean).join(" · ");
  const lines: [string, string][] = [
    ["Job type", d.jobTypeNote ?? ""],
    ["Client", join(d.role, d.contactPreference && `prefers ${d.contactPreference.toLowerCase()}`)],
    [
      "Property",
      join(
        d.propertyType,
        d.squareFeet && `${d.squareFeet} sq ft`,
        d.yearBuilt && `built ${d.yearBuilt}`,
        (d.bedrooms || d.bathrooms) && `${d.bedrooms || "?"} bd / ${d.bathrooms || "?"} ba`,
        d.foundation,
        d.occupancy,
        d.utilitiesOn && `utilities on: ${d.utilitiesOn}`,
      ),
    ],
    ["Add-ons", d.addOns.join(", ")],
    ["Alternate", d.altDate ? join(d.altDate, d.altTime ? TIME_LABELS[d.altTime] : "") : ""],
    ["Deadline", d.deadline ?? ""],
    ["Access", join(d.access, d.attending && `client attending: ${d.attending}`)],
    ["Agent", join(d.agentName, d.agentPhone, d.agentEmail)],
    ["Heard from", d.heardFrom ?? ""],
    ["Source", describeSource(d.attribution)],
    ["Discount", d.discountEligible ? "Eligible (veteran, military, first responder, teacher or healthcare)" : ""],
    ["Concerns", d.concerns ?? ""],
    ["Notes", d.notes ?? ""],
  ];
  const header = isQuickForm(d) ? `Quick booking form (${formPage(d)})` : "Full booking form (/book)";
  return [header, ...lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join("\n");
}

router.post("/book", async (req, res) => {
  const parse = BookBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Please check the highlighted fields and try again." });
    return;
  }
  const d = parse.data;

  // A filled honeypot is a bot. Answer as if it worked so it learns nothing.
  if (d.company) {
    res.json({ success: true, message: "Thanks — we'll be in touch." });
    return;
  }

  const address = `${d.addressStreet}${d.addressUnit ? `, ${d.addressUnit}` : ""}, ${d.addressCity}, CA${d.addressZip ? ` ${d.addressZip}` : ""}`;
  const notes = composeNotes(d);
  // The short form has no property-type question; a "Condo Inspection" choice
  // still says so in its job-type note, which the checklist can use.
  const fromNotes = needsFromNotes(d.service, notes);

  try {
    const [inserted] = await db
      .insert(bookingsTable)
      .values({
        name: d.name,
        phone: d.phone,
        email: d.email,
        service: d.service,
        address,
        preferredDate: d.preferredDate,
        preferredTime: d.preferredTime,
        notes,
      })
      .returning({ id: bookingsTable.id });

    req.log.info(
      { bookingId: inserted.id, service: d.service, preferredDate: d.preferredDate, sourcePath: d.sourcePath },
      "Full booking request saved",
    );

    const lead = {
      source: "website_booking" as const,
      bookingId: inserted.id,
      name: d.name,
      phone: d.phone,
      email: d.email,
      service: d.service,
      address,
      notes,
      scheduledFor: new Date(`${d.preferredDate}T12:00:00Z`),
    };

    // The two-step form on /schedule already sent this person's name and phone
    // when they finished step one (see book-started.ts). Finishing the booking
    // completes that lead rather than adding a second one, and the owner's
    // email says so — he has already had a "booking started" email for them.
    // A CRM failure here must not fail a saved booking, so it falls back to
    // "not a completion" and the lead is mirrored as usual.
    const completesStarted = await completeStartedLead(lead).catch((err) => {
      req.log.error({ err }, "Failed to look up a started booking");
      return false;
    });

    // Neither is awaited: a CRM or mail failure must not fail a saved booking.
    if (!completesStarted) {
      mirrorLead(lead).catch((err) => req.log.error({ err }, "Failed to mirror full booking into CRM"));
    }

    sendDetailedBookingEmail({
      ...d,
      address,
      bookingId: inserted.id,
      confirmUrl: confirmUrl(inserted.id),
      attribution: describeSource(d.attribution),
      quickForm: isQuickForm(d),
      formPage: formPage(d),
      completesStarted,
    }).catch((err) => req.log.error({ err }, "Failed to send full booking notification email"));

    // The customer's own "we got your request" email, with a checklist built
    // from what they told us. Never awaited, like the owner's.
    sendRequestReceivedEmail({
      to: d.email,
      name: d.name,
      phone: d.phone,
      serviceLabel: d.serviceLabel,
      address,
      preferredDate: d.preferredDate,
      preferredTime: d.preferredTime,
      altDate: d.altDate || undefined,
      altTime: d.altTime || undefined,
      needs: {
        service: d.service,
        propertyType: d.propertyType || fromNotes.propertyType,
        foundation: d.foundation || undefined,
        occupancy: d.occupancy || undefined,
        utilitiesOn: d.utilitiesOn || undefined,
        addOns: d.addOns,
        access: d.access || undefined,
        attending: d.attending || undefined,
        agentName: d.agentName || undefined,
        deadline: d.deadline || undefined,
        discountEligible: d.discountEligible,
      },
    }).catch((err) => req.log.error({ err }, "Failed to send customer request-received email"));

    res.json({
      success: true,
      message: "Your booking request has been received. We'll call to confirm within the hour.",
      bookingId: inserted.id,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to save full booking");
    res.status(500).json({ error: "Something went wrong. Please call us directly." });
  }
});

export default router;
