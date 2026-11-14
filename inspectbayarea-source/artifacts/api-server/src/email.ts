import nodemailer from "nodemailer";
import { logger } from "./lib/logger";

export const BUSINESS_EMAIL = "info@inspectbayarea.com";
/**
 * The Gmail account that actually sends, which must match GMAIL_APP_PASSWORD.
 * Kept separate from BUSINESS_EMAIL so the public address can change before
 * an app password exists for it: set GMAIL_USER alongside a new
 * GMAIL_APP_PASSWORD to send from info@ instead.
 */
export const SMTP_USER = process.env.GMAIL_USER?.trim() || "renoveraba@gmail.com";
export const BUSINESS_NAME = "Bay Area Inspection Services";
export const BUSINESS_PHONE = "(628) 230-0357";

export function getTransporter() {
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!pass) {
    logger.warn("GMAIL_APP_PASSWORD not set — email notifications disabled");
    return null;
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: SMTP_USER, pass },
  });
}

export const SERVICE_LABELS: Record<string, string> = {
  "mold-inspection": "Mold Inspection & Air Quality",
  "full-home-inspection": "Full Home Inspection",
  "gas-leak-detection": "Gas Leak Detection",
  "moisture-water-damage": "Moisture & Water Damage",
  "home-mold-bundle": "Combined Home + Mold Bundle",
  "other": "Other",
};

export const TIME_LABELS: Record<string, string> = {
  "8am-11am": "8:00 AM – 11:00 AM",
  "11am-2pm": "11:00 AM – 2:00 PM",
  "2pm-5pm": "2:00 PM – 5:00 PM",
  "5pm-8pm": "5:00 PM – 8:00 PM",
};

export function htmlWrap(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#1a3a5c;padding:28px 32px;">
      <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">${BUSINESS_NAME}</h1>
      <p style="margin:6px 0 0;color:#e87722;font-size:13px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">${title}</p>
    </div>
    <div style="padding:32px;">
      ${body}
    </div>
    <div style="background:#f8f9fa;border-top:1px solid #e5e7eb;padding:16px 32px;text-align:center;font-size:12px;color:#9ca3af;">
      ${BUSINESS_NAME} · Mountain View, CA · ${BUSINESS_PHONE}
    </div>
  </div>
</body>
</html>`;
}

/** The owner's one-click confirm button. Rendered only when a signed link exists. */
export function confirmButton(url: string | undefined): string {
  if (!url) return "";
  return `<div style="margin-top:20px;padding:18px;border:2px solid #16a34a;border-radius:10px;background:#f0fdf4;">
      <p style="margin:0 0 10px;font-size:14px;color:#14532d;font-weight:600;">After you've spoken to them:</p>
      <a href="${url}" style="display:inline-block;background:#16a34a;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">Confirm this booking &amp; email the customer</a>
      <p style="margin:10px 0 0;font-size:12px;color:#166534;">Opens a page where you can adjust the time and add the price before it sends.</p>
    </div>`;
}

export function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;width:140px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:#111827;font-size:14px;">${value}</td>
  </tr>`;
}

export interface ContactEmailData {
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  message?: string | null;
}

export interface BookingEmailData {
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string | null;
  bookingId?: number;
  /** Signed link to the confirm page (see booking-links.ts). */
  confirmUrl?: string;
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) return;

  const serviceLabel = SERVICE_LABELS[data.service] ?? data.service;
  const body = `
    <h2 style="margin:0 0 20px;font-size:18px;color:#1a3a5c;">New Quote Request</h2>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Name", data.name)}
      ${row("Phone", `<a href="tel:${data.phone.replace(/\D/g,"")}" style="color:#e87722;font-weight:700;">${data.phone}</a>`)}
      ${row("Email", `<a href="mailto:${data.email}" style="color:#1a3a5c;">${data.email}</a>`)}
      ${row("Service", serviceLabel)}
      ${row("Property", data.address)}
      ${data.message ? row("Message", `<em>${data.message}</em>`) : ""}
    </table>
    <div style="margin-top:24px;padding:16px;background:#fef9f0;border-left:4px solid #e87722;border-radius:4px;font-size:13px;color:#92400e;">
      ⚡ This customer is waiting for a response. Call or email them back ASAP to win the job.
    </div>
    <div style="margin-top:20px;">
      <a href="tel:${data.phone.replace(/\D/g,"")}" style="display:inline-block;background:#e87722;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;margin-right:12px;">📞 Call ${data.name.split(" ")[0]}</a>
      <a href="mailto:${data.email}" style="display:inline-block;background:#1a3a5c;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">✉️ Reply by Email</a>
    </div>
  `;

  await transporter.sendMail({
    from: `"${BUSINESS_NAME}" <${SMTP_USER}>`,
    to: BUSINESS_EMAIL,
    subject: `🏠 New Quote Request: ${serviceLabel} — ${data.name}`,
    html: htmlWrap("New Quote Request", body),
  });
}

export async function sendBookingEmail(data: BookingEmailData): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) return;

  const serviceLabel = SERVICE_LABELS[data.service] ?? data.service;
  const timeLabel = TIME_LABELS[data.preferredTime] ?? data.preferredTime;

  const dateFormatted = new Date(data.preferredDate + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const body = `
    <h2 style="margin:0 0 4px;font-size:18px;color:#1a3a5c;">New Booking Request</h2>
    ${data.bookingId ? `<p style="margin:0 0 20px;font-size:12px;color:#9ca3af;">Booking #${data.bookingId}</p>` : "<div style='margin-bottom:20px;'></div>"}
    <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 4px;font-size:12px;color:#0369a1;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Requested Appointment</p>
      <p style="margin:0;font-size:20px;font-weight:700;color:#1a3a5c;">📅 ${dateFormatted}</p>
      <p style="margin:4px 0 0;font-size:15px;color:#374151;">🕐 ${timeLabel}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Service", `<strong>${serviceLabel}</strong>`)}
      ${row("Name", data.name)}
      ${row("Phone", `<a href="tel:${data.phone.replace(/\D/g,"")}" style="color:#e87722;font-weight:700;">${data.phone}</a>`)}
      ${row("Email", `<a href="mailto:${data.email}" style="color:#1a3a5c;">${data.email}</a>`)}
      ${row("Property", data.address)}
      ${data.notes ? row("Notes", `<em>${data.notes}</em>`) : ""}
    </table>
    <div style="margin-top:24px;padding:16px;background:#fef9f0;border-left:4px solid #e87722;border-radius:4px;font-size:13px;color:#92400e;">
      ⚡ Confirm this appointment within 1 hour to secure the booking.
    </div>
    ${confirmButton(data.confirmUrl)}
    <div style="margin-top:20px;">
      <a href="tel:${data.phone.replace(/\D/g,"")}" style="display:inline-block;background:#e87722;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;margin-right:12px;">📞 Confirm with ${data.name.split(" ")[0]}</a>
      <a href="mailto:${data.email}" style="display:inline-block;background:#1a3a5c;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">✉️ Send Confirmation</a>
    </div>
  `;

  await transporter.sendMail({
    from: `"${BUSINESS_NAME}" <${SMTP_USER}>`,
    to: BUSINESS_EMAIL,
    subject: `📅 New Booking: ${serviceLabel} — ${data.name} on ${dateFormatted}`,
    html: htmlWrap("New Booking Request", body),
  });
}

/* ------------------------------------------------------------------ *
 * Full booking form (/book)
 * ------------------------------------------------------------------ */

export interface DetailedBookingEmailData {
  bookingId?: number;
  confirmUrl?: string;
  attribution?: string;
  /** True for the short form (on /schedule and in the site's booking popup), which asks for less. */
  quickForm?: boolean;
  /** The page the booking was sent from, e.g. "/schedule" or "/services/mold-inspection". */
  formPage?: string;
  /** True when a "booking started" email already went out for this person a moment ago. */
  completesStarted?: boolean;
  name: string;
  phone: string;
  email: string;
  role?: string;
  contactPreference?: string;
  address: string;
  propertyType?: string;
  squareFeet?: string;
  yearBuilt?: string;
  bedrooms?: string;
  bathrooms?: string;
  foundation?: string;
  occupancy?: string;
  utilitiesOn?: string;
  serviceLabel: string;
  addOns: string[];
  concerns?: string;
  preferredDate: string;
  preferredTime: string;
  altDate?: string;
  altTime?: string;
  deadline?: string;
  access?: string;
  attending?: string;
  agentName?: string;
  agentPhone?: string;
  agentEmail?: string;
  heardFrom?: string;
  discountEligible: boolean;
  notes?: string;
}

/**
 * Every value here was typed by a member of the public, so it is escaped before
 * it goes into HTML. (The older templates above interpolate raw values.)
 */
export function esc(value: string | undefined | null): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function longDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

function section(title: string, rows: [string, string | undefined][]): string {
  const filled = rows.filter(([, v]) => v && v.trim() !== "");
  if (filled.length === 0) return "";
  return `
    <h3 style="margin:24px 0 4px;font-size:13px;color:#1a3a5c;text-transform:uppercase;letter-spacing:0.05em;">${esc(title)}</h3>
    <table style="width:100%;border-collapse:collapse;">
      ${filled.map(([label, value]) => row(esc(label), esc(value))).join("")}
    </table>`;
}

export async function sendDetailedBookingEmail(d: DetailedBookingEmailData): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) return;

  const phoneDigits = d.phone.replace(/\D/g, "");
  const first = d.name.split(" ")[0];
  const when = `${longDate(d.preferredDate)} · ${TIME_LABELS[d.preferredTime] ?? d.preferredTime}`;
  const alt = d.altDate ? `${longDate(d.altDate)}${d.altTime ? ` · ${TIME_LABELS[d.altTime] ?? d.altTime}` : ""}` : undefined;
  const beds = d.bedrooms || d.bathrooms ? `${d.bedrooms || "?"} bed / ${d.bathrooms || "?"} bath` : undefined;

  const body = `
    <h2 style="margin:0 0 4px;font-size:18px;color:#1a3a5c;">New Booking Request — ${d.quickForm ? (d.formPage === "/schedule" ? "quick form (from the ad page)" : `quick form (from ${esc(d.formPage ?? "the website")})`) : "full form"}</h2>
    ${d.bookingId ? `<p style="margin:0 0 20px;font-size:12px;color:#9ca3af;">Booking #${d.bookingId}</p>` : ""}
    ${d.completesStarted ? `<p style="margin:0 0 16px;padding:10px 14px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;font-size:13px;color:#166534;">${esc(first)} finished the booking you got a "started" email about. This is the full request.</p>` : ""}
    <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:16px 20px;margin-bottom:8px;">
      <p style="margin:0 0 4px;font-size:12px;color:#0369a1;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Requested appointment</p>
      <p style="margin:0;font-size:18px;font-weight:700;color:#1a3a5c;">${esc(when)}</p>
      ${alt ? `<p style="margin:6px 0 0;font-size:14px;color:#374151;">Alternate: ${esc(alt)}</p>` : ""}
      ${d.deadline ? `<p style="margin:6px 0 0;font-size:14px;color:#b45309;font-weight:700;">Deadline: ${esc(longDate(d.deadline))}</p>` : ""}
    </div>
    ${section("Client", [
      ["Name", d.name],
      ["Phone", d.phone],
      ["Email", d.email],
      ["Is the", d.role],
      ["Prefers", d.contactPreference],
    ])}
    ${section("Property", [
      ["Address", d.address],
      ["Type", d.propertyType],
      ["Size", d.squareFeet ? `${d.squareFeet} sq ft` : undefined],
      ["Year built", d.yearBuilt],
      ["Bed / bath", beds],
      ["Foundation", d.foundation],
      ["Occupancy", d.occupancy],
      ["Utilities on", d.utilitiesOn],
    ])}
    ${section("Inspection", [
      ["Service", d.serviceLabel],
      ["Add-ons", d.addOns.join(", ")],
      ["Concerns", d.concerns],
    ])}
    ${section("Access", [
      ["Access", d.access],
      ["Attending", d.attending],
    ])}
    ${section("Agent", [
      ["Name", d.agentName],
      ["Phone", d.agentPhone],
      ["Email", d.agentEmail],
    ])}
    ${section("Source", [["Came from", d.attribution]])}
    ${section("Other", [
      ["Heard from", d.heardFrom],
      ["Discount", d.discountEligible ? "Eligible for 10% (veteran, military, first responder, teacher or healthcare)" : undefined],
      ["Notes", d.notes],
    ])}
    <div style="margin-top:24px;padding:16px;background:#fef9f0;border-left:4px solid #e87722;border-radius:4px;font-size:13px;color:#92400e;">
      Call to confirm within the hour to secure the booking.
    </div>
    ${confirmButton(d.confirmUrl)}
    <div style="margin-top:20px;">
      <a href="tel:${phoneDigits}" style="display:inline-block;background:#e87722;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;margin-right:12px;">Call ${esc(first)}</a>
      <a href="mailto:${esc(d.email)}" style="display:inline-block;background:#1a3a5c;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Reply by email</a>
    </div>
  `;

  await transporter.sendMail({
    from: `"${BUSINESS_NAME}" <${SMTP_USER}>`,
    to: BUSINESS_EMAIL,
    replyTo: d.email,
    subject: `New Booking: ${d.serviceLabel} — ${d.name} on ${longDate(d.preferredDate)}`,
    html: htmlWrap("New Booking Request", body),
  });
}

export interface BookingStartedEmailData {
  name: string;
  phone: string;
  serviceLabel: string;
  jobTypeNote?: string;
  attribution?: string;
  /** The page the form is on, e.g. "/schedule". */
  formPage: string;
}

/**
 * Step one of the two-step booking form: a name and a number, before the
 * address and time. Sent at once so the owner can call back if the rest never
 * arrives; the full booking email follows separately when it does.
 */
export async function sendBookingStartedEmail(d: BookingStartedEmailData): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) return;

  const phoneDigits = d.phone.replace(/\D/g, "");
  const first = d.name.split(" ")[0];

  const body = `
    <h2 style="margin:0 0 4px;font-size:18px;color:#1a3a5c;">Booking started — not finished yet</h2>
    <p style="margin:0 0 20px;font-size:13px;color:#6b7280;">${esc(first)} entered a name and phone number on the booking form${d.formPage === "/schedule" ? " (the ad page)" : ` (${esc(d.formPage)})`} and went on to the address and time.</p>
    ${section("Client", [
      ["Name", d.name],
      ["Phone", d.phone],
    ])}
    ${section("Inspection", [
      ["Service", d.serviceLabel],
      ["Job type", d.jobTypeNote],
    ])}
    ${section("Source", [["Came from", d.attribution]])}
    <div style="margin-top:24px;padding:16px;background:#fef9f0;border-left:4px solid #e87722;border-radius:4px;font-size:13px;color:#92400e;">
      If they finish, the full booking email arrives in a minute or two. If it doesn't, call them — they have asked for an inspection and left their number.
    </div>
    <div style="margin-top:20px;">
      <a href="tel:${phoneDigits}" style="display:inline-block;background:#e87722;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Call ${esc(first)}</a>
    </div>
  `;

  await transporter.sendMail({
    from: `"${BUSINESS_NAME}" <${SMTP_USER}>`,
    to: BUSINESS_EMAIL,
    subject: `Booking started: ${d.serviceLabel} — ${d.name} (${d.phone})`,
    html: htmlWrap("Booking started", body),
  });
}
