import { useEffect } from "react";
import { Star, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { site } from "@/data/site";

/**
 * inspectbayarea.com/review — a short link for asking past clients for a
 * Google review.
 *
 * Google's own write-review URL is a long place ID nobody can type or say on
 * the phone. This one fits on a business card, in a text message and at the
 * end of every report. It sends the visitor straight to Google's review form;
 * the page itself is only the fallback if the redirect is blocked.
 *
 * Left out of the sitemap in prerender.mjs: it is a redirect, not content.
 */
export default function Review() {
  const url = site.google.writeReviewUrl;

  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <Layout>
      <Seo
        title="Leave a Review"
        description={`Thank you for choosing ${site.name}. Leave us a review on Google.`}
        path="/review"
      />
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <div className="flex justify-center text-yellow-400 mb-6" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-8 h-8 fill-current" />
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Thank you for choosing us</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            A short review on Google helps other Bay Area buyers find an inspector they can trust. It
            takes about a minute.
          </p>
          <a
            href={url}
            className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-lg h-14 px-8 text-lg transition-colors"
            data-testid="link-write-review"
          >
            Leave a Google review
            <ExternalLink className="w-5 h-5" />
          </a>
          <p className="text-sm text-gray-500 mt-6">
            Opening Google… if nothing happens, tap the button above.
          </p>
        </div>
      </section>
    </Layout>
  );
}
