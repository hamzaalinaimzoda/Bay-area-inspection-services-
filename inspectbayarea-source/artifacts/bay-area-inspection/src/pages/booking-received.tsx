import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Check, Phone, Mail, CalendarCheck } from "lucide-react";
import { Seo } from "@/components/Seo";
import { LandingHeader, LandingFooter } from "@/components/booking/LandingHeader";
import { site } from "@/data/site";
import { readBookingSummary, type BookingSummary } from "@/lib/booking-summary";

/**
 * Thank-you page after a booking request from /book or /schedule.
 *
 * The Ads conversion has already fired in the form when the server accepted
 * the request; this page fires nothing, so a reload or a bookmark can't count
 * a second booking. Opened directly, with no request in this tab, it shows the
 * generic version.
 */

const STEPS = [
  { icon: Mail, title: "Check your inbox", body: "A copy of your request is on its way, with a short checklist for getting the home ready. Not there in five minutes? Check spam or promotions." },
  { icon: Phone, title: "We call to confirm", body: "Usually within the hour during business hours, to settle the time and give you a firm price." },
  { icon: CalendarCheck, title: "Your confirmation email", body: "Once the time is set you'll get the date, arrival time and price, with a button to add it to your calendar." },
];

export default function BookingReceivedPage() {
  // Read after mount so the prerendered HTML and the first client render agree.
  const [summary, setSummary] = useState<BookingSummary | null>(null);
  useEffect(() => setSummary(readBookingSummary()), []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Seo
        title="Booking Request Received"
        description="Your home inspection request has been received. We'll call to confirm the time, usually within the hour."
        path="/booking-received"
        noindex
      />
      <LandingHeader />

      <main className="flex-1 py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl grid gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center" data-testid="booking-received">
            <span className="inline-flex w-16 h-16 rounded-full bg-green-100 items-center justify-center mb-6">
              <Check className="w-8 h-8 text-green-700" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-balance">
              {summary?.firstName ? `Thanks, ${summary.firstName} — your request is in` : "Your booking request is in"}
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-lg mx-auto">
              {summary ? (
                <>
                  We've emailed a copy to <strong className="text-gray-900 break-words">{summary.email}</strong> and
                  we'll call you at <strong className="text-gray-900">{summary.phone}</strong> to confirm the time.
                </>
              ) : (
                <>We've emailed you a copy and we'll call to confirm the time, usually within the hour.</>
              )}
            </p>

            {summary && (
              <dl className="grid sm:grid-cols-3 gap-4 text-left mt-8">
                {[
                  ["Inspection", summary.inspection],
                  ["Requested", summary.requested],
                  ["Property", summary.property],
                ].map(([k, val]) => (
                  <div key={k} className="bg-gray-50 rounded-xl p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{k}</dt>
                    <dd className="text-sm font-semibold text-gray-900 mt-1 break-words">{val}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <h2 className="font-bold text-gray-900 mb-5">What happens next</h2>
            <ol className="grid gap-5">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <s.icon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{i + 1}. {s.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={site.phoneHref} className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-secondary text-white font-bold hover:bg-secondary/90">
              <Phone className="w-4 h-4" /> In a hurry? Call {site.phoneDisplay}
            </a>
            <Link href="/sample-report" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-gray-300 bg-white font-semibold text-gray-800 hover:bg-gray-50">
              See a sample report
            </Link>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
