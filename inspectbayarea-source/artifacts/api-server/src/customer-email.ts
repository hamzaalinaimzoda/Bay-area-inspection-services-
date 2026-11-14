import { getTransporter, htmlWrap, esc, row, BUSINESS_EMAIL, SMTP_USER, BUSINESS_NAME, BUSINESS_PHONE, TIME_LABELS } from "./email";

/**
 * Emails sent to the customer, not the owner.
 *
 *   1. "Request received" — immediately after a booking form is submitted.
 *   2. "Booking confirmed" — when the owner confirms from their notification
 *      email (routes/book-confirm.ts), with the agreed date and time.
 *
 * Both carry a preparation checklist built from what the customer told us:
 * property type, what's under the house, whether it's vacant, which services,
 * their deadline and agent. A condo buyer booking a mold add-on and a vacant
 * crawl-space house with the power off get different instructions, because
 * they need different things done before the inspector arrives.
 */

const PAYMENT = "credit and debit cards, Zelle, Venmo, Cash App, check and cash";
const CANCELLATION = "There's no fee to cancel or reschedule — we just ask for 24 hours' notice.";
const SITE = (process.env.PUBLIC_SITE_URL || "https://inspectbayarea.com").replace(/\/$/, "");

export interface CustomerNeeds {
  service: string;
  propertyType?: string;
  foundation?: string;
  occupancy?: string;
  utilitiesOn?: string;
  addOns: string[];
  access?: string;
  attending?: string;
  agentName?: string;
  deadline?: string;
  discountEligible?: boolean;
}

/**
 * Recover needs from a saved booking's notes. The full form writes labelled
 * lines ("Property: Condo or townhouse · Crawl space · Vacant"); the quick modal
 * writes a job-type sentence ("Property type: Condo / attached unit."). Both are
 * produced by our own code, so the format is known.
 */
export function needsFromNotes(service: string, notes: string | null | undefined): CustomerNeeds {
  const text = notes ?? "";
  const line = (label: string) => text.match(new RegExp(`^${label}: (.+)$`, "m"))?.[1]?.trim();
  const needs: CustomerNeeds = { service, addOns: [] };

  const property = line("Property");
  if (property) {
    const parts = property.split(" · ").map((p) => p.trim());
    needs.propertyType = parts[0];
    needs.foundation = parts.find((p) => ["Crawl space", "Basement", "Slab"].includes(p));
    needs.occupancy = parts.find((p) => p === "Occupied" || p === "Vacant");
    needs.utilitiesOn = parts.find((p) => p.startsWith("utilities on:"))?.split(": ")[1];
  } else {
    needs.propertyType = text.match(/Property type: ([^.]+)\./)?.[1];
  }
  needs.addOns = (line("Add-ons") ?? "").split(",").map((a) => a.trim()).filter(Boolean);
  const access = line("Access");
  if (access) {
    const [how, att] = access.split(" · client attending: ");
    if (how && !how.startsWith("client attending")) needs.access = how;
    needs.attending = att ?? access.match(/client attending: (.+)$/)?.[1];
  }
  needs.agentName = line("Agent")?.split(" · ")[0];
  needs.deadline = line("Deadline");
  needs.discountEligible = /^Discount: Eligible/m.test(text);
  return needs;
}

const has = (n: CustomerNeeds, service: string, addOnWord: string) =>
  n.service === service || n.addOns.some((a) => a.toLowerCase().includes(addOnWord));

export function durationFor(n: CustomerNeeds): string {
  const condo = /condo|attached/i.test(n.propertyType ?? "");
  const extra = n.addOns.length > 0;
  switch (n.service) {
    case "gas-leak-detection": return extra ? "one to two hours" : "about an hour";
    case "mold-inspection":
    case "moisture-water-damage": return extra ? "two to three hours" : "one to two hours";
    case "home-mold-bundle": return "three to five hours";
    default:
      if (condo) return extra ? "two to three hours" : "about two hours";
      return extra ? "three to five hours" : "two to four hours";
  }
}

/**
 * The customer-facing name of what they booked. The bookings table stores the
 * API enum ("full-home-inspection"), but a condo or ADU booking reuses that
 * value and says what it really is in its notes.
 */
export function serviceLabelFor(service: string, notes: string | null | undefined, fallback: string): string {
  const text = notes ?? "";
  if (/Insurance 5-point/i.test(text)) return "Insurance 5-Point Report";
  if (service === "full-home-inspection") {
    if (/Property type: Condo/i.test(text)) return "Condo Inspection";
    if (/Property type: Manufactured/i.test(text)) return "Manufactured Home Inspection";
    if (/Property type: ADU/i.test(text)) return "ADU Inspection";
  }
  return fallback;
}

export function longDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

/** What the customer should do before the visit, in the order it matters. Exported for testing. */
export function prepChecklist(n: CustomerNeeds): string[] {
  const items: string[] = [];
  const type = (n.propertyType ?? "").toLowerCase();
  const inspectsWholeHome = ["full-home-inspection", "home-mold-bundle", "other"].includes(n.service);

  if (has(n, "gas-leak-detection", "gas")) {
    items.push("If you smell gas right now, leave the building and call PG&E at 1-800-743-5000 or 911 — don't wait for the inspection.");
  }
  if (n.utilitiesOn === "No") {
    items.push("You mentioned the utilities may be off. Please have the water, gas and power turned on before we arrive — without them we can't test the plumbing, heating, water heater or appliances.");
  } else if (inspectsWholeHome) {
    items.push("Water, gas and power need to be on so we can run every system.");
  }
  if (inspectsWholeHome) {
    items.push("Clear the way to the attic hatch, electrical panel, water heater and furnace — stored boxes in front of them are the most common thing that stops us.");
  }
  if (n.foundation === "Crawl space") {
    items.push("Clear the path to the crawl-space hatch (often in a closet floor or on an outside wall) so we can go under the house.");
  } else if (n.foundation === "Basement") {
    items.push("Make sure the basement is unlocked and nothing is stacked against its walls.");
  }
  if (/condo|townhouse|attached/.test(type)) {
    items.push("Let the HOA or building manager know we're coming, and tell us about parking and any entry codes. We inspect everything inside your unit.");
  } else if (/manufactured|mobile/.test(type)) {
    items.push("Make sure we can reach the skirting access panel so we can inspect the underbelly, piers and tie-downs.");
  } else if (/multi-unit/.test(type)) {
    items.push("Arrange access to every unit you want inspected and give tenants the notice their lease requires (usually 24 hours).");
  } else if (/adu/.test(type)) {
    items.push("Arrange access to the ADU, and to the main house's electrical panel if the ADU is fed from it.");
  }
  if (n.occupancy === "Vacant" && !n.agentName) {
    items.push("As the home is vacant, send us the lockbox code or arrange for someone to meet us.");
  }
  if (has(n, "mold-inspection", "mold") || n.service === "home-mold-bundle") {
    items.push("For accurate mold readings: keep windows and doors closed for 12 hours beforehand, don't run air purifiers that day, and please don't clean or paint over any suspect areas.");
  }
  if (has(n, "moisture-water-damage", "moisture")) {
    items.push("Leave water stains as they are — they help us trace the source. Jot down any past leaks or repairs you know about.");
  }
  if (has(n, "gas-leak-detection", "gas")) {
    items.push("Keep the stove, water heater, furnace and dryer reachable so we can check every gas connection.");
  }
  items.push("Please keep pets secured or out of the house during the visit.");
  return items;
}

function extras(n: CustomerNeeds): string[] {
  const out: string[] = [];
  if (n.deadline) out.push(`We've noted your deadline of ${longDate(n.deadline)} and will have the report to you before it.`);
  if (n.agentName) out.push(`We'll coordinate access with ${n.agentName}.`);
  if (n.attending === "No") out.push("You don't need to be there — we'll call you to walk through the findings once the report is out.");
  else if (n.attending) out.push("The walkthrough at the end is the most useful part — bring your questions.");
  if (n.discountEligible) out.push("You mentioned you're eligible for our 10% discount — we'll apply it once we confirm eligibility.");
  return out;
}

function list(items: string[]): string {
  return `<ul style="margin:8px 0 0;padding-left:20px;color:#374151;font-size:14px;line-height:1.6;">${items
    .map((i) => `<li style="margin-bottom:8px;">${esc(i)}</li>`)
    .join("")}</ul>`;
}

function heading(text: string): string {
  return `<h3 style="margin:26px 0 4px;font-size:15px;color:#1a3a5c;">${esc(text)}</h3>`;
}

function footerBlock(): string {
  return `${heading("Good to know")}
    <p style="margin:6px 0;font-size:14px;color:#374151;line-height:1.6;">We accept ${PAYMENT}. ${CANCELLATION}</p>
    <p style="margin:18px 0 0;font-size:14px;color:#374151;line-height:1.6;">Questions? Reply to this email or call <a href="tel:${BUSINESS_PHONE.replace(/\D/g, "")}" style="color:#e87722;font-weight:700;">${BUSINESS_PHONE}</a>.
      Curious what you'll receive? <a href="${SITE}/sample-report" style="color:#1a3a5c;">See a sample report</a>.</p>`;
}

function textVersion(lines: (string | false | undefined)[]): string {
  return lines.filter(Boolean).join("\n");
}

export interface RequestReceivedData {
  to: string;
  name: string;
  phone: string;
  serviceLabel: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  altDate?: string;
  altTime?: string;
  needs: CustomerNeeds;
}

export async function sendRequestReceivedEmail(d: RequestReceivedData): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) return;
  const first = d.name.trim().split(/\s+/)[0] || "there";
  const requested = `${longDate(d.preferredDate)}, ${TIME_LABELS[d.preferredTime] ?? d.preferredTime}`;
  const alt = d.altDate ? `${longDate(d.altDate)}${d.altTime ? `, ${TIME_LABELS[d.altTime] ?? d.altTime}` : ""}` : undefined;
  const prep = prepChecklist(d.needs);
  const notes = extras(d.needs);

  const body = `
    <p style="margin:0 0 14px;font-size:16px;color:#111827;">Hi ${esc(first)},</p>
    <p style="margin:0 0 18px;font-size:15px;color:#374151;line-height:1.6;">Thanks for booking with us. We've got your request and will call you at <strong>${esc(d.phone)}</strong> to confirm the time and give you a firm quote — usually within the hour during business hours. Your appointment isn't final until we've spoken.</p>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Inspection", esc(d.serviceLabel))}
      ${d.needs.addOns.length ? row("Also", esc(d.needs.addOns.join(", "))) : ""}
      ${row("Requested", esc(requested))}
      ${alt ? row("Second choice", esc(alt)) : ""}
      ${row("Property", esc(d.address))}
    </table>
    ${notes.length ? list(notes) : ""}
    ${heading("How to get ready")}
    ${list(prep)}
    <p style="margin:6px 0 0;font-size:13px;color:#6b7280;">Plan for ${esc(durationFor(d.needs))} on site.</p>
    ${footerBlock()}
  `;

  await transporter.sendMail({
    from: `"${BUSINESS_NAME}" <${SMTP_USER}>`,
    to: d.to,
    replyTo: BUSINESS_EMAIL,
    subject: `We got your inspection request — ${BUSINESS_NAME}`,
    html: htmlWrap("Request received", body),
    text: textVersion([
      `Hi ${first},`,
      "",
      `Thanks for booking with us. We'll call you at ${d.phone} to confirm the time and give you a firm quote — usually within the hour.`,
      "",
      `Inspection: ${d.serviceLabel}`,
      d.needs.addOns.length > 0 && `Also: ${d.needs.addOns.join(", ")}`,
      `Requested: ${requested}`,
      alt && `Second choice: ${alt}`,
      `Property: ${d.address}`,
      "",
      ...notes,
      "",
      "How to get ready:",
      ...prep.map((p) => `- ${p}`),
      "",
      `We accept ${PAYMENT}. ${CANCELLATION}`,
      `Questions? Reply to this email or call ${BUSINESS_PHONE}.`,
    ]),
  });
}

export interface BookingConfirmedData {
  to: string;
  name: string;
  serviceLabel: string;
  address: string;
  /** YYYY-MM-DD and HH:MM, both Pacific time. */
  date: string;
  time: string;
  /** Start as a real instant, for the calendar link. */
  startsAt: Date;
  price?: string;
  message?: string;
  needs: CustomerNeeds;
}

function clock(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(Date.UTC(2000, 0, 1, h, m));
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
}

function calendarLink(d: BookingConfirmedData): string {
  const fmt = (t: Date) => t.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = new Date(d.startsAt.getTime() + 3 * 3600_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Home inspection — ${BUSINESS_NAME}`,
    dates: `${fmt(d.startsAt)}/${fmt(end)}`,
    location: d.address,
    details: `${d.serviceLabel}. Questions: ${BUSINESS_PHONE}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export async function sendBookingConfirmedEmail(d: BookingConfirmedData): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) throw new Error("Email is not configured (GMAIL_APP_PASSWORD missing).");
  const first = d.name.trim().split(/\s+/)[0] || "there";
  const when = `${longDate(d.date)} at ${clock(d.time)}`;
  const prep = prepChecklist(d.needs);
  const notes = extras(d.needs).filter((n) => !n.startsWith("You mentioned you're eligible"));

  const body = `
    <p style="margin:0 0 14px;font-size:16px;color:#111827;">Hi ${esc(first)},</p>
    <p style="margin:0 0 18px;font-size:15px;color:#374151;line-height:1.6;">Your inspection is confirmed. Here are the details.</p>
    <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:16px 20px;margin-bottom:18px;">
      <p style="margin:0 0 4px;font-size:12px;color:#166534;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">Confirmed</p>
      <p style="margin:0;font-size:19px;font-weight:700;color:#14532d;">${esc(when)}</p>
      <p style="margin:6px 0 0;font-size:14px;color:#166534;">${esc(d.address)}</p>
      <a href="${esc(calendarLink(d))}" style="display:inline-block;margin-top:12px;color:#166534;font-weight:700;font-size:13px;">+ Add to Google Calendar</a>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Inspection", esc(d.serviceLabel))}
      ${d.needs.addOns.length ? row("Also", esc(d.needs.addOns.join(", "))) : ""}
      ${d.price ? row("Price", `<strong>${esc(d.price)}</strong>`) : ""}
      ${row("Time on site", esc(durationFor(d.needs)))}
    </table>
    ${d.message ? `<p style="margin:18px 0 0;padding:14px 16px;background:#f8fafc;border-left:4px solid #1a3a5c;font-size:14px;color:#374151;line-height:1.6;white-space:pre-line;">${esc(d.message)}</p>` : ""}
    ${notes.length ? list(notes) : ""}
    ${heading("Before we arrive")}
    ${list(prep)}
    ${heading("Need to change the time?")}
    <p style="margin:6px 0 0;font-size:14px;color:#374151;line-height:1.6;">Reply to this email or call ${BUSINESS_PHONE}. The report is emailed the same day, with photos of every finding.</p>
    ${footerBlock()}
  `;

  await transporter.sendMail({
    from: `"${BUSINESS_NAME}" <${SMTP_USER}>`,
    to: d.to,
    replyTo: BUSINESS_EMAIL,
    subject: `Confirmed: your inspection on ${longDate(d.date)} at ${clock(d.time)}`,
    html: htmlWrap("Inspection confirmed", body),
    text: textVersion([
      `Hi ${first},`,
      "",
      `Your inspection is confirmed: ${when}.`,
      `Address: ${d.address}`,
      `Inspection: ${d.serviceLabel}`,
      d.needs.addOns.length > 0 && `Also: ${d.needs.addOns.join(", ")}`,
      d.price && `Price: ${d.price}`,
      `Time on site: ${durationFor(d.needs)}`,
      d.message && `\n${d.message}`,
      "",
      ...notes,
      "",
      "Before we arrive:",
      ...prep.map((p) => `- ${p}`),
      "",
      `Add to calendar: ${calendarLink(d)}`,
      `Need to change the time? Reply or call ${BUSINESS_PHONE}. ${CANCELLATION}`,
    ]),
  });
}
