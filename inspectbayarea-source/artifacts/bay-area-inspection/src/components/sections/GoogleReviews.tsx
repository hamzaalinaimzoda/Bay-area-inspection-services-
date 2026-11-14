import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Star, ExternalLink, PenLine } from "lucide-react";
import { site } from "@/data/site";

/**
 * Social proof, limited to what can be checked.
 *
 * Replaced a testimonials grid whose six "clients" were not real (see the note
 * on `site.google`). The reviews shown here come live from Google through
 * /api/google-reviews, verbatim and with their authors, so they cannot be
 * edited or invented on our side, and a new review appears without a deploy.
 *
 * Until that endpoint has data — no API key configured, Google's daily cap
 * reached, or the request failed — the section renders exactly what it did
 * before: the hand-maintained rating from `site.google` and a link to Google.
 * The prerendered HTML is always that fallback; reviews load in the browser,
 * and only once the section is about to scroll into view, so visitors who never
 * reach it cost no API call.
 */

type Review = {
  author: string;
  authorUrl: string | null;
  authorPhoto: string | null;
  rating: number | null;
  text: string;
  when: string | null;
  reviewUrl: string | null;
};

type LiveReviews = {
  available: true;
  rating: number | null;
  count: number | null;
  url: string | null;
  reviews: Review[];
};

function Stars({ value, className }: { value: number; className: string }) {
  return (
    <span className="flex text-yellow-400" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${className} ${i <= Math.round(value) ? "fill-current" : "text-gray-300"}`} />
      ))}
    </span>
  );
}

export function GoogleReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const [live, setLive] = useState<LiveReviews | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let cancelled = false;

    const load = () => {
      fetch("/api/google-reviews")
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (!cancelled && data?.available && data.reviews?.length > 0) setLive(data);
        })
        .catch(() => {});
    };

    if (!("IntersectionObserver" in window)) {
      load();
      return () => {
        cancelled = true;
      };
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          load();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  const rating = live?.rating != null ? live.rating.toFixed(1) : site.google.rating;
  const reviewCount = live?.count ?? site.google.reviewCount;
  const reviewsUrl = live?.url ?? site.google.reviewsUrl;

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 border-t border-b" data-testid="section-google-reviews">
      <div className={`container mx-auto px-4 text-center ${live ? "max-w-6xl" : "max-w-3xl"}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What our clients say</h2>

        <a
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-col items-center gap-2 bg-white rounded-2xl border border-gray-100 shadow-sm px-10 py-7 hover:shadow-md transition-shadow"
          data-testid="link-google-reviews"
        >
          <span className="text-5xl font-bold text-gray-900 tabular-nums">{rating}</span>
          <Stars value={Number(rating)} className="w-6 h-6" />
          <span className="text-gray-600">
            from {reviewCount} Google reviews
          </span>
        </a>

        {live ? (
          <>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10 text-left" data-testid="list-google-reviews">
              {live.reviews.map((r, i) => (
                <li key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {r.authorPhoto ? (
                      <img
                        src={r.authorPhoto}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                        {r.author.charAt(0)}
                      </span>
                    )}
                    <div className="min-w-0">
                      {r.authorUrl ? (
                        <a
                          href={r.authorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-gray-900 hover:text-primary truncate block"
                        >
                          {r.author}
                        </a>
                      ) : (
                        <span className="font-semibold text-gray-900 truncate block">{r.author}</span>
                      )}
                      {r.when && <span className="text-sm text-gray-500">{r.when}</span>}
                    </div>
                  </div>
                  {r.rating != null && <Stars value={r.rating} className="w-4 h-4" />}
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{r.text}</p>
                  {r.reviewUrl && (
                    <a
                      href={r.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto text-sm font-semibold text-primary hover:text-secondary"
                    >
                      View on Google
                    </a>
                  )}
                </li>
              ))}
            </ul>
            {/* Attribution required by Google when Places content is shown without a map. */}
            <p className="mt-6 text-xs text-gray-500" translate="no">
              Reviews from Google Maps
            </p>
          </>
        ) : (
          <p className="text-lg text-gray-600 leading-relaxed mt-8 mb-8 max-w-2xl mx-auto">
            Every review is from a client, posted on Google, where we can't edit or remove it. Read
            them before you book.
          </p>
        )}

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${live ? "mt-10" : ""}`}>
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg h-12 px-6 transition-colors"
          >
            {live ? `Read all ${reviewCount} reviews on Google` : "Read our reviews on Google"}
            <ExternalLink className="w-4 h-4" />
          </a>
          <Link
            href="/review"
            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-secondary transition-colors"
          >
            <PenLine className="w-4 h-4" />
            Past client? Leave a review
          </Link>
        </div>
      </div>
    </section>
  );
}
