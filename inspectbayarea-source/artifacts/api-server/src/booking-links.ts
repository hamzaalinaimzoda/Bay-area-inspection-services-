import crypto from "node:crypto";

/**
 * Signed links for confirming a booking from the owner's notification email.
 *
 * The CRM is not switched on in production (no CRM_PASSWORD), so the owner's
 * inbox is where bookings are actually handled. Each notification email carries
 * a "Confirm this booking" link. The link identifies the booking and carries an
 * HMAC over its id, so only someone holding that email can open the confirm
 * page — booking ids are sequential and would otherwise be guessable.
 *
 * The key is BOOKING_LINK_SECRET when set, else derived from DATABASE_URL, which
 * is already a server-only secret. Rotating either invalidates old links, which
 * is harmless: the booking can still be confirmed by phone.
 */

function key(): Buffer | null {
  const secret = process.env.BOOKING_LINK_SECRET || process.env.DATABASE_URL;
  if (!secret) return null;
  return crypto.createHash("sha256").update(`booking-confirm:${secret}`).digest();
}

export function signBookingId(id: number): string | null {
  const k = key();
  if (!k) return null;
  return crypto.createHmac("sha256", k).update(`booking:${id}`).digest("base64url").slice(0, 32);
}

export function verifyBookingToken(id: number, token: string | undefined): boolean {
  const expected = signBookingId(id);
  if (!expected || !token || token.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token));
}

/** Absolute URL of the confirm page for a booking, or undefined if links can't be signed. */
export function confirmUrl(id: number): string | undefined {
  const token = signBookingId(id);
  if (!token) return undefined;
  const base = (process.env.PUBLIC_SITE_URL || "https://inspectbayarea.com").replace(/\/$/, "");
  return `${base}/api/book/${id}/confirm?t=${token}`;
}
