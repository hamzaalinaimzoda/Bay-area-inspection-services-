import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Phone, CalendarCheck } from "lucide-react";
import { site } from "@/data/site";

/**
 * Header for the ad landing page and its thank-you page: logo and phone only.
 * Like /quote, these pages leave out the site navigation on purpose — every
 * extra link is a way to leave before booking.
 */
export function LandingHeader() {
  return (
    <header className="bg-primary text-white border-b border-white/10">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 min-w-0" aria-label={`${site.name} home`}>
          <img src="/images/logo.webp" alt="" width={32} height={37} className="h-8 w-auto" />
          <span className="font-bold text-sm sm:text-base truncate">{site.name}</span>
        </Link>
        <a
          href={site.phoneHref}
          className="inline-flex flex-shrink-0 items-center gap-2 text-gray-200 font-semibold text-sm sm:text-base hover:text-white hover:underline"
          data-testid="link-landing-header-call"
        >
          <Phone className="w-4 h-4" />
          {site.phoneDisplay}
        </a>
      </div>
    </header>
  );
}

/**
 * Sticky bar for the ad landing pages, phones only: book first, call second.
 *
 * /schedule runs several phone screens, so both ways to reach us stay a thumb
 * away the whole way down. Booking is the wide orange button and the call is
 * the quiet one beside it: the owner is on inspections through the day and a
 * form reaches him when a ringing phone cannot (his call, Nov 2026 — this bar
 * led with "Call Now" before). The number is still here, in the header and
 * under the form.
 *
 * Hidden while the form itself is on screen: there the form's own button is
 * the thing to press, and a second orange "Book Now" an inch below it that
 * only scrolls to where you already are is noise. It starts hidden, because
 * the form is the first thing on the page, and slides in once the form has
 * scrolled away.
 *
 * Pages that render this also need bottom padding, or the bar sits on top of
 * the last thing on the page.
 */
export function LandingCallBar({ bookHref = "#book" }: { bookHref?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.querySelector('[data-testid="quick-book-form"]');
    if (!form || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting));
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 z-50 flex gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-[transform,visibility] duration-200 ${show ? "" : "translate-y-full invisible"}`}
      data-testid="bar-landing-sticky"
    >
      <a
        href={bookHref}
        className="flex-[2] inline-flex items-center justify-center gap-2 rounded-lg bg-secondary text-white font-bold h-12 text-base hover:bg-secondary/90 transition-colors"
        data-testid="button-landing-sticky-book"
      >
        <CalendarCheck className="w-4 h-4" />
        Book Now
      </a>
      <a
        href={site.phoneHref}
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 text-primary font-semibold h-12 text-base hover:bg-gray-50 transition-colors"
        data-testid="button-landing-sticky-call"
      >
        <Phone className="w-4 h-4" />
        Call
      </a>
    </div>
  );
}

export function LandingFooter() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl py-6 text-xs text-gray-500 flex flex-col sm:flex-row gap-2 justify-between">
        <p>&copy; 2026 {site.legalName} · {site.certifications}</p>
        <p>{site.hours}</p>
      </div>
    </footer>
  );
}
