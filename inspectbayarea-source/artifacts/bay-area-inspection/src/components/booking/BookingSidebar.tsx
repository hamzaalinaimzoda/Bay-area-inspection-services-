import { Phone, ShieldCheck, FileText, CalendarCheck, BadgeCheck, Clock } from "lucide-react";
import { site } from "@/data/site";
import { paymentList, cancellation } from "@/data/policies";

/** The column beside the booking form on /book and /schedule. */

const NEXT_STEPS = [
  { icon: Phone, title: "We call to confirm", body: "Usually within the hour during business hours, to lock in the time and give you a firm quote." },
  { icon: CalendarCheck, title: "The inspection", body: "Two to four hours for a typical home. Join for the walkthrough at the end if you can." },
  { icon: FileText, title: "Same-day report", body: "Photos of every finding and clear next steps, emailed the same evening." },
];

export function BookingSidebar() {
  return (
    <aside className="grid gap-6 lg:sticky lg:top-28">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="font-bold text-gray-900 mb-4">What happens next</h2>
        <ol className="grid gap-4">
          {NEXT_STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <s.icon className="w-4 h-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{i + 1}. {s.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-primary text-white rounded-2xl p-6">
        <p className="font-bold mb-1">Rather talk it through?</p>
        <p className="text-sm text-white/75 mb-4">Call and book in two minutes. {site.hours}.</p>
        <a href={site.phoneHref} className="inline-flex w-full items-center justify-center gap-2 h-12 rounded-lg bg-secondary font-bold hover:bg-secondary/90">
          <Phone className="w-4 h-4" /> {site.phoneDisplay}
        </a>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 grid gap-3 text-sm text-gray-700">
        <p className="flex gap-2.5"><BadgeCheck className="w-5 h-5 text-secondary flex-shrink-0" /> InterNACHI certified — inspected by a former builder</p>
        <p className="flex gap-2.5"><ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0" /> InterNACHI Buy-Back Guarantee</p>
        <p className="flex gap-2.5"><Clock className="w-5 h-5 text-secondary flex-shrink-0" /> {cancellation.summary}</p>
        <p className="text-gray-500 border-t pt-3">We accept {paymentList}.</p>
      </div>
    </aside>
  );
}
