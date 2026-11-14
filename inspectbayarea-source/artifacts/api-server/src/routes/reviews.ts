import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

/**
 * The business's Google reviews, fetched live from the Places API (New).
 *
 * The homepage used to show only a hand-typed rating and count with a link to
 * Google, because quoting reviews on our own site would mean copying text we
 * could edit or invent. Fetching them from Google at view time keeps them
 * verbatim and current: a new review appears on the site without a deploy.
 *
 * Deliberately not cached. Google's Places terms forbid storing or caching
 * review content (only place IDs may be kept), so every response comes from a
 * fresh upstream call. Two guards keep that from costing money:
 *   - concurrent requests share one in-flight upstream call, and
 *   - a daily cap (GOOGLE_REVIEWS_DAILY_LIMIT, default 60) after which the
 *     endpoint reports "unavailable" and the page shows its static fallback.
 * The homepage only asks when the reviews section scrolls into view.
 *
 * Needs GOOGLE_PLACES_API_KEY (a Google Cloud key with "Places API (New)"
 * enabled). Without it the endpoint answers { available: false } and the site
 * behaves exactly as it did before this route existed.
 *
 * Kept outside the OpenAPI contract, like /quote: it is a read-only proxy used
 * by one component, not part of the booking/contact flow the spec describes.
 */

/** Place ID of the Bay Area Inspection Services Business Profile. */
const DEFAULT_PLACE_ID = "ChIJ-xSm-rE4HaoR8MZCAsKKxi8";

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  googleMapsUri?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

type PlacesDetails = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

export type GoogleReviewsPayload =
  | { available: false }
  | {
      available: true;
      rating: number | null;
      count: number | null;
      url: string | null;
      reviews: {
        author: string;
        authorUrl: string | null;
        authorPhoto: string | null;
        rating: number | null;
        text: string;
        when: string | null;
        reviewUrl: string | null;
      }[];
    };

/** Shape Google's response into only what the page renders. Exported for testing. */
export function toPayload(data: PlacesDetails): GoogleReviewsPayload {
  const reviews = (data.reviews ?? [])
    .map((r) => ({
      author: r.authorAttribution?.displayName?.trim() || "Google user",
      authorUrl: r.authorAttribution?.uri ?? null,
      authorPhoto: r.authorAttribution?.photoUri ?? null,
      rating: typeof r.rating === "number" ? r.rating : null,
      // `text` is Google's translation when the review is in another language;
      // `originalText` is what the reviewer wrote. Show the original.
      text: (r.originalText?.text ?? r.text?.text ?? "").trim(),
      when: r.relativePublishTimeDescription ?? null,
      reviewUrl: r.googleMapsUri ?? null,
    }))
    // A star-only review has nothing to quote; the count and rating cover it.
    .filter((r) => r.text.length > 0);

  return {
    available: true,
    rating: typeof data.rating === "number" ? data.rating : null,
    count: typeof data.userRatingCount === "number" ? data.userRatingCount : null,
    url: data.googleMapsUri ?? null,
    reviews,
  };
}

let day = "";
let callsToday = 0;
let inFlight: Promise<GoogleReviewsPayload> | null = null;

function underDailyCap(): boolean {
  const limit = Number(process.env.GOOGLE_REVIEWS_DAILY_LIMIT ?? 60);
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) {
    day = today;
    callsToday = 0;
  }
  return callsToday < limit;
}

async function fetchFromGoogle(apiKey: string, placeId: string): Promise<GoogleReviewsPayload> {
  callsToday += 1;
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      signal: AbortSignal.timeout(5000),
    },
  );
  if (!res.ok) {
    // Log the status only: the body can echo request details.
    logger.warn({ status: res.status }, "google reviews: Places API request failed");
    return { available: false };
  }
  return toPayload((await res.json()) as PlacesDetails);
}

router.get("/google-reviews", async (_req, res) => {
  res.set("Cache-Control", "no-store");

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    res.json({ available: false } satisfies GoogleReviewsPayload);
    return;
  }

  try {
    if (!inFlight) {
      if (!underDailyCap()) {
        res.json({ available: false } satisfies GoogleReviewsPayload);
        return;
      }
      const placeId = process.env.GOOGLE_PLACE_ID || DEFAULT_PLACE_ID;
      inFlight = fetchFromGoogle(apiKey, placeId).finally(() => {
        inFlight = null;
      });
    }
    res.json(await inFlight);
  } catch (err) {
    logger.warn({ err: (err as Error).message }, "google reviews: request errored");
    res.json({ available: false } satisfies GoogleReviewsPayload);
  }
});

export default router;
