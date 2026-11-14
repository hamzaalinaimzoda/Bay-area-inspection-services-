/**
 * Where this visit came from, kept for the length of the browser session.
 *
 * Google Ads appends a click id (gclid, or gbraid/wbraid on iOS) and campaigns
 * can carry utm_* tags. Both are only in the URL of the first page, and a
 * visitor usually books a few pages later — so they are captured on arrival
 * and sent with the booking, where the owner's email and the CRM notes show
 * "Google Ads click (campaign …, keyword …)".
 *
 * Storage can be unavailable (private mode, blocked site data); every access
 * is guarded and the booking simply goes without a source.
 */

const KEY = "bais-attribution";

export interface Attribution {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingPage?: string;
  referrer?: string;
}

const PARAMS: [keyof Attribution, string][] = [
  ["gclid", "gclid"],
  ["gbraid", "gbraid"],
  ["wbraid", "wbraid"],
  ["utmSource", "utm_source"],
  ["utmMedium", "utm_medium"],
  ["utmCampaign", "utm_campaign"],
  ["utmTerm", "utm_term"],
  ["utmContent", "utm_content"],
];

/** Call once per page load. A new ad click replaces an older one; otherwise the first landing wins. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const fromUrl: Attribution = {};
    for (const [field, param] of PARAMS) {
      const v = url.searchParams.get(param);
      if (v) fromUrl[field] = v.slice(0, 200);
    }
    const tagged = Object.keys(fromUrl).length > 0;
    const existing = sessionStorage.getItem(KEY);
    if (existing && !tagged) return;

    const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
    const landingPage = url.pathname.replace(/\/+$/, "") || "/";
    const record: Attribution = { ...fromUrl, landingPage, referrer: ref.slice(0, 300) || undefined };
    sessionStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    // Storage blocked — nothing to record.
  }
}

export function getAttribution(): Attribution | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : undefined;
  } catch {
    return undefined;
  }
}
