import { captureAttribution } from "./attribution";

/**
 * Plausible analytics.
 *
 * Plausible was chosen over GA4 because it sets no cookies — which avoids a
 * consent banner under California's CCPA — and because the script is ~1 KB
 * rather than ~50 KB, so it does not undo the performance work.
 *
 * Phone clicks and scroll depth are captured with delegated document listeners
 * rather than by editing the dozen components that render a phone link. New
 * `tel:` links anywhere on the site are tracked automatically.
 *
 * Every call is a no-op when `window.plausible` is absent, which is the case in
 * local development (Plausible ignores localhost) and if the script fails to
 * load. Analytics must never break the site.
 */

type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: {
      track(name: string, data?: EventProps): void;
    };
    plausible?: {
      (event: string, options?: { props?: EventProps }): void;
      q?: unknown[];
    };
    /**
     * Google Ads gtag. Defined as a dataLayer shim in index.html before
     * gtag.js finishes loading, so it is safe to call early — calls queue.
     */
    gtag?: (...args: unknown[]) => void;
  }
}

/** Section of the site a conversion happened on, for segmenting in the dashboard. */
function pageKind(pathname: string): string {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return "home";
  if (p.startsWith("/service-areas/")) return "city";
  if (p === "/service-areas") return "service-areas";
  if (p.startsWith("/services/")) return "service";
  if (p === "/services") return "services";
  if (p.startsWith("/blog/")) return "blog-post";
  if (p === "/blog") return "blog";
  return p.slice(1) || "other";
}

export function track(event: string, props: EventProps = {}): void {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  const data = { ...props, page: path, page_kind: pageKind(path) };

  try {
    window.plausible?.(event, {
      props: { ...props, page: path, pageKind: pageKind(path) },
    });
  } catch {
    // Analytics must never break the site.
  }

  try {
    window.umami?.track(event.toLowerCase().replace(/\s+/g, "_"), data);
  } catch {
    // Analytics must never break the site.
  }
}

export const trackPhoneClick = (location: string) => track("Phone Click", { location });
export const trackBookingOpened = () => track("Booking Opened");
/** Step one of the two-step form: a name and a phone number, before the address and time. */
export const trackBookingStarted = (service: string) => track("Booking Started", { service });
export const trackBookingSubmitted = (service: string) => track("Booking Submitted", { service });
export const trackContactSubmitted = (service: string) => track("Contact Submitted", { service });
export const trackQuoteSubmitted = (service: string) => track("Quote Submitted", { service });

/* ------------------------------------------------------------------ *
 * Google Ads conversion tracking
 * ------------------------------------------------------------------ */

/**
 * The conversion label for the lead-form action, as `AW-XXXXXXXXX/LABEL`.
 *
 * This is the "Website lead form submission" action: category "Submit lead
 * form", source `inspectbayarea.com`, primary, count-once, value supplied per
 * event by the snippet below (default 279 when the event omits one).
 *
 * Why a new action rather than reusing the existing "Contacts" one: Contacts
 * has source "Other", and Google refuses source-"Other" conversions for
 * bidding entirely — it cannot be attached to a campaign goal, and the goal
 * picker will not even list it. Only a website conversion fired by the tag is
 * eligible. That is the gap this closes.
 *
 * Everything below no-ops if this is ever blanked, so the site cannot break on
 * a missing or misconfigured conversion action.
 */
const ADS_CONVERSION_LABEL = "AW-18237540837/y8-oCNiQpukcEOWTq_hD";

/**
 * What one lead of each service type is worth, for bidding.
 *
 * These are the service starting prices, not a modelled lead value. Smart
 * Bidding cares about the *relative* weighting far more than the absolute
 * figure, and the starting prices already encode the right ordering: a
 * full-home-inspection enquiry really is worth roughly six times a gas-leak
 * enquiry. Using booking value keeps the numbers honest and auditable rather
 * than inventing a close-rate we have not measured.
 *
 * Deliberately not imported from the service data: conversion values must stay
 * stable across pricing changes, or Smart Bidding sees a step change in value
 * that it reads as a performance shift. Revisit these on purpose, not as a
 * side effect of a price edit.
 */
const LEAD_VALUE_BY_SERVICE: Record<string, number> = {
  "full-home-inspection": 649,
  // A condo booking submits the parent slug as `service` so the API enum stays
  // valid, so the forms append "-condo" for this lookup only. Without it every
  // condo lead reported $649 against a $549 job.
  "full-home-inspection-condo": 549,
  "mold-inspection": 279,
  "moisture-water-damage": 119,
  "gas-leak-detection": 99,
  "home-mold-bundle": 800,
  // Job types booked under an existing API enum value; the forms pass these
  // keys through ServiceOption.conversionKey (see data/service-options.ts).
  "manufactured-home": 449,
  "manufactured-home-5-point": 249,
  "adu-inspection": 549,
  // No separate price yet; valued like the mold inspection it is booked under.
  "air-quality-testing": 279,
};

/** Fallback when the service is "other" or unrecognised. */
const DEFAULT_LEAD_VALUE = 279;

/**
 * Services deliberately not reported to Google Ads as conversions.
 *
 * A gas leak check is a $99 job. Reporting one taught Smart Bidding that a $99
 * enquiry is a win worth paying for, and at Bay Area click prices that pulls
 * budget away from the inspections the business actually runs on. The service
 * is still sold and booked exactly as before — it just stops steering ad spend.
 *
 * Written as an explicit skip rather than by deleting the key from
 * LEAD_VALUE_BY_SERVICE on purpose: a missing key falls through to
 * DEFAULT_LEAD_VALUE, which would report $279 and make the problem worse.
 */
const SERVICES_EXCLUDED_FROM_ADS_CONVERSIONS = new Set(["gas-leak-detection"]);

/**
 * Conversion label for a click on a `tel:` link, as `AW-XXXXXXXXX/LABEL`.
 *
 * Why this exists: the booking form is the only conversion Google could use for
 * bidding, and it records almost nothing — this site is built to be phoned. The
 * homepage carries eight tel: links and a sticky call bar, and customers use
 * them. Those calls were landing on conversion actions with source "Other",
 * which Google refuses to use for bidding, so Smart Bidding was learning from
 * literally zero signal. This makes the call path countable.
 */
const ADS_PHONE_CONVERSION_LABEL = "AW-18237540837/T-2aCPD1ru8cEOWTq_hD";

/**
 * One phone conversion per visit.
 *
 * Module scope, so it survives client-side route changes and resets only on a
 * real page load — a visitor who taps the number in the header, decides against
 * it, then taps the sticky bar later is one lead, not two. Google's own "count:
 * one" setting dedupes server-side as well; this is the cheaper first line.
 */
let phoneConversionSent = false;

/**
 * Report a click-to-call to Google Ads.
 *
 * Valued at DEFAULT_LEAD_VALUE rather than the full-inspection price on purpose.
 * A tap on a phone number is a weaker signal than a submitted booking form: the
 * service is unknown at click time, and not every tap becomes a completed call.
 * Treating it as "a lead of unspecified service" is the honest reading. Revisit
 * once the CRM reports real close rates by source — that is the number that
 * turns this estimate into a measurement.
 */
export function trackAdsPhoneConversion(): void {
  if (typeof window === "undefined") return;
  if (!ADS_PHONE_CONVERSION_LABEL) return;
  if (!window.gtag) return;
  if (phoneConversionSent) return;

  phoneConversionSent = true;
  window.gtag("event", "conversion", {
    send_to: ADS_PHONE_CONVERSION_LABEL,
    value: DEFAULT_LEAD_VALUE,
    currency: "USD",
  });
}

/**
 * Report a lead-form submission to Google Ads.
 *
 * Call only after a genuinely successful submission — a conversion fired on
 * intent rather than completion teaches Smart Bidding to buy abandonment.
 */
export function trackAdsConversion(service: string): void {
  if (typeof window === "undefined") return;
  if (!ADS_CONVERSION_LABEL) return;
  if (!window.gtag) return;
  if (SERVICES_EXCLUDED_FROM_ADS_CONVERSIONS.has(service)) return;

  window.gtag("event", "conversion", {
    send_to: ADS_CONVERSION_LABEL,
    value: LEAD_VALUE_BY_SERVICE[service] ?? DEFAULT_LEAD_VALUE,
    currency: "USD",
  });
}

/**
 * Best-effort label for where on the page a phone link sits, so the dashboard
 * can distinguish the sticky mobile bar from the footer.
 */
function phoneLinkLocation(el: HTMLElement): string {
  if (el.closest("nav")) return "navbar";
  if (el.closest("footer")) return "footer";
  if (el.closest("[data-testid='section-hero']")) return "hero";
  if (el.closest(".fixed.bottom-0")) return "mobile-bar";
  if (el.closest("aside")) return "sidebar";
  return "body";
}

let initialised = false;

export function initAnalytics(): void {
  if (initialised || typeof window === "undefined") return;
  initialised = true;

  // Remember an ad click id / utm tags from the landing URL for the booking forms.
  captureAttribution();

  // Phone clicks — delegated, so every tel: link is covered without touching
  // the components that render them.
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a[href^='tel:']") as HTMLElement | null;
      if (link) {
        trackPhoneClick(phoneLinkLocation(link));
        trackAdsPhoneConversion();
      }
    },
    { capture: true },
  );

  // Read depth — one event per page at 75% scrolled, which answers "which of
  // the 28 city pages actually get read" without firing on every scroll.
  let reported = false;
  let lastPath = window.location.pathname;
  const onScroll = () => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      reported = false;
    }
    if (reported) return;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable < 400) return; // too short for depth to mean anything
    if ((window.scrollY / scrollable) >= 0.75) {
      reported = true;
      track("Page Read");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}
