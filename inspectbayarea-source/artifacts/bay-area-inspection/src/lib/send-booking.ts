import type { ServiceOption } from "@/data/service-options";
import { trackBookingStarted, trackBookingSubmitted, trackAdsConversion } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";

/** The page a form was sent from, without a trailing slash. */
const sourcePath = () => window.location.pathname.replace(/\/+$/, "") || "/";

/**
 * The phone number whose lead has already been reported to Google Ads this
 * page load. A step-one lead and the finished booking are one customer: the
 * conversion is reported when the owner first gets the lead, not twice.
 */
let adsLeadReportedFor = "";

/** Phone numbers whose step one has been sent this page load. */
const startedPhones = new Set<string>();

/**
 * Send step one of the two-step booking form — name, phone and inspection — to
 * /api/book/started, so the owner has the lead even if step two is never
 * finished. Sent once per phone number per page load.
 *
 * Never throws and is never awaited by the form: a failure here must not stand
 * between the visitor and step two. The Ads conversion fires once the server
 * has the lead, for the same reason as in sendBooking — a name and a number
 * the owner can call is a completed lead, not an intent.
 */
export async function sendBookingStarted(
  fields: { name: string; phone: string; company?: string },
  option: ServiceOption,
): Promise<void> {
  const phone = fields.phone.trim();
  if (startedPhones.has(phone)) return;
  startedPhones.add(phone);
  try {
    const res = await fetch("/api/book/started", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: fields.name,
        phone,
        company: fields.company ?? "",
        service: option.value,
        serviceLabel: option.label,
        jobTypeNote: option.note ?? "",
        sourcePath: sourcePath(),
        attribution: getAttribution(),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; leadId?: number };
    if (!res.ok || !data.success) {
      startedPhones.delete(phone);
      return;
    }
    // No leadId means the honeypot caught it: nothing was saved, so nothing to count.
    if (data.leadId === undefined) return;
    trackBookingStarted(option.value);
    trackAdsConversion(option.conversionKey ?? option.value);
    adsLeadReportedFor = phone;
  } catch {
    startedPhones.delete(phone);
  }
}

/**
 * Post a booking to /api/book from either booking form (the full form on /book
 * or the short one on /schedule), with the page it came from and the ad click
 * that brought the visitor, then record the conversion.
 *
 * The Ads conversion fires only after the server accepts the request — a
 * conversion fired on intent rather than completion teaches Smart Bidding to
 * buy abandonment. Throws with the server's message when it refuses.
 */
export async function sendBooking(fields: Record<string, unknown>, option: ServiceOption): Promise<void> {
  const res = await fetch("/api/book", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...fields,
      service: option.value,
      serviceLabel: option.label,
      jobTypeNote: option.note ?? "",
      sourcePath: sourcePath(),
      attribution: getAttribution(),
    }),
  });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };
  if (!res.ok || !data.success) throw new Error(data.error || "Request failed");

  trackBookingSubmitted(option.value);
  if (adsLeadReportedFor !== String(fields.phone ?? "").trim()) {
    trackAdsConversion(option.conversionKey ?? option.value);
  }
}
