import { useLocation } from "wouter";
import { Star, ShieldCheck, Camera, Clock, BadgeCheck } from "lucide-react";
import { Seo } from "@/components/Seo";
import { QuickBookingForm } from "@/components/booking/QuickBookingForm";
import { BookingSidebar } from "@/components/booking/BookingSidebar";
import { LandingHeader, LandingFooter, LandingCallBar } from "@/components/booking/LandingHeader";
import { site } from "@/data/site";
import { saveBookingSummary } from "@/lib/booking-summary";

/**
 * Ad landing page for booking.
 *
 * The Google Ads final URL: a short booking form (QuickBookingForm) without the
 * site's navigation or footer, so an ad click has one thing to do. Keeping ad traffic on its own
 * URL also separates it in analytics from people who found /book on the site,
 * and the form sends the ad click id and campaign with the booking, so the
 * owner's notification says which campaign and keyword it came from.
 *
 * Not indexed and not in the sitemap: organic visitors belong on /book.
 * A finished booking goes to /booking-received.
 */

const TRUST = [
  { icon: BadgeCheck, text: "InterNACHI certified, former builder" },
  { icon: Camera, text: "Thermal imaging included" },
  { icon: Clock, text: "Same-day report with photos" },
  { icon: ShieldCheck, text: "InterNACHI Buy-Back Guarantee" },
];

export default function SchedulePage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Seo
        title="Book a Home Inspection — San Francisco & Bay Area"
        description="Book a San Francisco or Bay Area home inspection in a few minutes. InterNACHI certified, thermal imaging included, same-day report. We confirm within the hour."
        path="/schedule"
        noindex
      />
      <LandingHeader />

      {/* On a phone the heading is all the hero keeps: the paragraph repeats the
          form's own subheading and the trust list moves below the form, so the
          first screen is the form's first step rather than a page to scroll past. */}
      <section className="bg-primary text-white">
        <div className="container mx-auto px-4 max-w-7xl pt-5 pb-6 lg:pt-12 lg:pb-14">
          <a
            href={site.google.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-200 hover:text-white mb-2 lg:mb-4"
          >
            <span className="flex text-yellow-400" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </span>
            <span><strong className="text-white">{site.google.rating}</strong> on Google · {site.google.reviewCount} reviews</span>
          </a>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight max-w-3xl text-balance">
            Book your home inspection in San Francisco &amp; the Bay Area
          </h1>
          <p className="hidden lg:block text-lg text-gray-200 leading-relaxed mt-4 max-w-2xl">
            Pick a day and time — it takes about a minute. You'll get an email right away, and we'll call to confirm
            the time and a firm price, usually within the hour.
          </p>
          <ul className="hidden lg:grid mt-8 grid-cols-4 gap-x-6 gap-y-3 max-w-4xl">
            {TRUST.map((t) => (
              <li key={t.text} className="flex items-start gap-2.5 text-sm text-gray-200">
                <t.icon className="w-5 h-5 text-secondary-on-dark flex-shrink-0" aria-hidden="true" />
                {t.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <main id="book" className="flex-1 py-5 lg:py-14 scroll-mt-4">
        <div className="container mx-auto px-4 max-w-7xl grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] items-start">
          <QuickBookingForm
            twoStep
            onSuccess={(summary) => {
              saveBookingSummary(summary);
              navigate("/booking-received");
            }}
          />
          <ul className="lg:hidden grid grid-cols-2 gap-x-4 gap-y-3" data-testid="list-schedule-trust-mobile">
            {TRUST.map((t) => (
              <li key={t.text} className="flex items-start gap-2 text-sm text-gray-700">
                <t.icon className="w-5 h-5 text-secondary flex-shrink-0" aria-hidden="true" />
                {t.text}
              </li>
            ))}
          </ul>
          <BookingSidebar />
        </div>
      </main>

      <LandingFooter />
      {/* Clears the sticky call bar so it never covers the footer. */}
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <LandingCallBar />
    </div>
  );
}
