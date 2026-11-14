/**
 * What the thank-you page at /booking-received shows about the request just
 * sent. The booking forms save it right before navigating there; it lives only
 * for the browser tab's session and holds nothing the visitor didn't just type.
 *
 * Storage can be blocked; the thank-you page then shows its generic version.
 */

const KEY = "bais-booking-summary";

export interface BookingSummary {
  firstName: string;
  phone: string;
  email: string;
  inspection: string;
  requested: string;
  property: string;
}

export function saveBookingSummary(summary: BookingSummary): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(summary));
  } catch {
    // Storage blocked — the thank-you page falls back to generic copy.
  }
}

export function readBookingSummary(): BookingSummary | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BookingSummary) : null;
  } catch {
    return null;
  }
}

/** "2026-10-02" -> "Fri, Oct 2". Parsed at noon so no timezone can shift the day. */
export function friendlyDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
