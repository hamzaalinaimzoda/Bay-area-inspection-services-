import { Phone, Mail, MapPin, Clock, CalendarCheck, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/data/site";

/** What actually happens between getting in touch and having the report. */
const steps = [
  {
    title: "You get in touch",
    desc: "Call, book online, or send the form below. Online booking runs 24/7, and calls and form submissions are answered fast — usually within the hour during business hours.",
  },
  {
    title: "We confirm the details",
    desc: "Property address, square footage, age, and which inspection you need. That is what determines the price, so you get a firm quote rather than a range that moves later.",
  },
  {
    title: "We agree a time",
    desc: "Same-day and next-day appointments are usually available. If you are working to a contingency deadline, say so — that gets priority.",
  },
  {
    title: "The inspection",
    desc: "Two to four hours for a typical single-family home, longer for larger or older properties. You are welcome to join for the final walkthrough.",
  },
  {
    title: "Same-day report",
    desc: "A detailed, photo-rich report lands the same evening — findings, photos, and next steps in one place.",
  },
];

const bookingFaqs = [
  {
    q: "How quickly can you schedule an inspection?",
    a: "Same-day and next-day appointments are usually available, and online booking is open 24/7. If you are inside a contingency window with a hard deadline, mention it when you get in touch — those get priority, because a report that arrives after your deadline is worth nothing to you.",
  },
  {
    q: "What information do you need to give me a quote?",
    a: "The property address, approximate square footage, the age of the home, and which inspection you want. Price is based on size, age, and features rather than a flat rate, so those four things are enough for a firm number rather than a vague range that changes later.",
  },
  {
    q: "Do I need to be there for the inspection?",
    a: "You do not, but it is worth it if you can be. Seeing an issue in person and asking about it on the spot tells you far more than reading it in a report. If you cannot attend, I will walk you through the findings by phone once the report is out.",
  },
  {
    q: "How and when do I get the report?",
    a: "The report is emailed the same day in nearly all cases, with photos of every significant finding, so a short contingency window is never left waiting on results.",
  },
  {
    q: "What if I need to reschedule?",
    a: "Call or email as early as you reasonably can and we will move it. Real estate timelines shift constantly and that is expected — the only genuine problem is finding out on the day, since that slot could have gone to someone else working to their own deadline.",
  },
  {
    q: "Do you serve my city?",
    a: `San Francisco is the primary service area, and coverage extends to ${site.city.split(",")[0]}, the Peninsula, South Bay and East Bay — 28 cities with a page each. If your city is not listed, call and ask: properties just outside the usual area are often still workable, particularly for larger inspections.`,
  },
  {
    q: "Can I book more than one service in a single visit?",
    a: "Yes, and it is usually cheaper and faster than booking separately. The home and mold bundle is the most common combination, and gas leak detection is regularly added to a full home inspection on the same visit.",
  },
];

export default function ContactPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: bookingFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Bay Area Inspection Services",
      url: `${site.domain}/contact`,
      mainEntity: {
        "@type": "LocalBusiness",
        name: site.name,
        telephone: site.phoneHref.replace("tel:", "+1"),
        email: site.email,
        url: site.domain,
        openingHours: "Mo-Sa 08:00-20:00",
      },
    },
  ];

  return (
    <Layout>
      <Seo
        title="Contact for a Bay Area home inspection"
        appendSiteName={false}
        description="Get a firm quote for your Bay Area home inspection. Replies usually arrive within an hour during business hours. Call or message us today."
        path="/contact"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="Get In Touch"
        title="Get in touch about your Bay Area home inspection"
        subtitle="Call, email, or send us a message. We respond fast — usually within the hour — and offer same-day and next-day appointments."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Contact methods */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href={site.phoneHref} className="group bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-secondary/40 hover:bg-white transition-colors text-center">
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/10 transition-colors">
                <Phone className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
              <p className="text-secondary font-semibold">{site.phoneDisplay}</p>
            </a>
            <a href={`mailto:${site.email}`} className="group bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-secondary/40 hover:bg-white transition-colors text-center">
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/10 transition-colors">
                <Mail className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
              <p className="text-secondary font-semibold text-sm break-all">{site.email}</p>
            </a>
            <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100 text-center">
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-secondary" />
              </div>
              {/* The service area, not the business address — those are
                  different, and leading with the home city here undercut the
                  San Francisco positioning. The address stays truthful in the
                  LocalBusiness schema and the "Based In" block below. */}
              <h3 className="font-bold text-gray-900 mb-1">Service Area</h3>
              <p className="text-gray-600 text-sm">San Francisco &amp; the wider Bay Area</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100 text-center">
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Hours</h3>
              <p className="text-gray-600 text-sm">{site.hours}<br />Online booking 24/7</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("openBookingModal"))}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-7 py-3.5 rounded-lg text-base transition-colors shadow-sm"
            >
              <CalendarCheck className="w-5 h-5" />
              Or book your inspection online
            </button>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            What happens after you get in touch
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-3xl">
            No guessing about where things stand. Here is the whole sequence, from first contact to
            report in your inbox.
          </p>
          <ol className="space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What to have ready */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            What to have ready when you call
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl">
            Four things get you a firm quote on the first call instead of a range that shifts later.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ["The property address", "Determines the service area and, in San Francisco, whether city-specific requirements like sewer lateral compliance apply."],
              ["Approximate square footage", "The main driver of both price and how long the inspection takes."],
              ["Roughly when it was built", "Age changes what gets prioritised — a 1925 Edwardian and a 1985 tract home need different attention."],
              ["Your deadline, if you have one", "Contingency windows get priority scheduling. Say so up front rather than hoping it works out."],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-3 bg-gray-50 border border-gray-100 rounded-xl p-5">
                <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking FAQs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Booking questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {bookingFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-gray-900">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Contact />

      <section className="py-12 md:py-16 bg-white" aria-labelledby="contact-details-heading" data-testid="contact-details">
        <div className="container mx-auto px-4 max-w-4xl text-gray-600 leading-relaxed space-y-6">
          <h2 id="contact-details-heading" className="text-2xl md:text-3xl font-bold text-gray-900">
            How to reach your Bay Area inspector
          </h2>
          <p>
            San Francisco is our primary service area, with coverage across the Peninsula,
            South Bay, and East Bay. Cities served include Daly City, San Mateo, Redwood City,
            Palo Alto, Mountain View, Sunnyvale, San Jose, Campbell, Fremont, Newark, and Hayward.
            If your city is not listed, call and ask about coverage before planning an appointment.
          </p>
          <p>
            Our business hours are Monday through Saturday, 8 AM to 8 PM. Online booking is open
            24/7, so you can request an inspection outside phone hours. After you get in touch,
            we confirm the property details and agree an appointment time and a firm quote.
          </p>
          <p>
            Calls and form submissions are usually answered within the hour during business hours.
            Same-day and next-day appointments are usually available. If you are working to a
            contingency deadline, mention it when you contact us: those requests receive priority.
            Have the property address, approximate square footage, age of the home, and inspection
            type ready so we can provide a firm quote.
          </p>
          <p>
            Call{" "}
            <a href={site.phoneHref} className="text-primary underline">{site.phoneDisplay}</a>,
            email{" "}
            <a href={`mailto:${site.email}`} className="text-primary underline break-words">{site.email}</a>,
            or use the contact form on this page. Share your contact details, property information,
            and any questions about the inspection. You can also use the online booking button
            to send an inspection request. If you need to reschedule, call or email as early as
            you reasonably can.
          </p>
        </div>
      </section>
    </Layout>
  );
}
