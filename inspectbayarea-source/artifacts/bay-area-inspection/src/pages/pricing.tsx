import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Check,
  Phone,
  Ruler,
  CalendarClock,
  DoorOpen,
  Layers,
  BadgePercent,
  CreditCard,
  CalendarX,
  MapPin,
  MessageSquareText,
  CalendarCheck,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/data/site";
import { discount, paymentList, cancellation } from "@/data/policies";

/**
 * "How quotes work" — served at /pricing.
 *
 * This page used to publish every starting price. The owner decided on
 * 2026-09-24 to publish no prices anywhere on the site, so it now explains how
 * a quote is built instead. The URL is kept on purpose: it is indexed, linked
 * from the navbar, the footer, city pages and blog posts, and in the sitemap,
 * and a 404 would throw all of that away. The last version with numbers is
 * commit c83b8b6.
 */

/** The steps from enquiry to booking. Order is real: each one needs the last. */
const steps = [
  {
    icon: MapPin,
    title: "Send us the address",
    desc: "Plus roughly how big the home is, how old, and which inspection you want. Call, use the quote form, or book online.",
  },
  {
    icon: MessageSquareText,
    title: "Get one firm number",
    desc: "Usually within the hour. Not a range, and not something that changes once we're on site.",
  },
  {
    icon: CalendarCheck,
    title: "Book it, or don't",
    desc: "No obligation. If you book, the number you were quoted is the number you pay.",
  },
];

/** What genuinely changes a quote. Honest, not a list of upsell hooks. */
const priceFactors = [
  {
    icon: Ruler,
    title: "Square footage",
    desc: "Larger properties take longer to walk and document, so they're quoted up front rather than surprising you at the end.",
  },
  {
    icon: CalendarClock,
    title: "Age of the property",
    desc: "Pre-war housing, knob-and-tube remnants, and additions built across several eras all take longer to assess properly than a home built to one code cycle.",
  },
  {
    icon: DoorOpen,
    title: "Crawl space and attic access",
    desc: "A full-height basement is quick. A tight crawl space with a jammed hatch is not. Access difficulty is one of the most common reasons a quote comes in higher.",
  },
  {
    icon: Layers,
    title: "How many services you combine",
    desc: "Booking a mold assessment alongside a home inspection costs less than two separate visits, because it's one trip and one report rather than two of each.",
  },
];

/** What every quote includes, regardless of which service is booked. */
const alwaysIncluded = [
  "A same-day, photo-rich written report",
  "Infrared thermal imaging where it's relevant to the finding",
  "Calibrated moisture meter readings, not guesses",
  "A walkthrough at the end so you can ask questions in person",
  "Plain-language severity — what matters now versus what can wait",
  "No remediation upsell, because we don't sell remediation",
];

const pricingFaqs = [
  {
    q: "How much does a home inspection cost in San Francisco?",
    a: "It depends on the property. Size, age, access and what you want checked all move it, so we quote each home individually rather than name a figure that wouldn't fit yours. Send us the address, or call, and you'll have a firm quote before you book — usually within the hour.",
  },
  {
    q: "What do you need to give me a quote?",
    a: "The property address, roughly how big the home is, how old it is, and which inspection you want. If you have a deadline, say so — contingency windows get priority scheduling.",
  },
  {
    q: "Is the quote the price I'll actually pay?",
    a: "Yes. The number you're quoted before booking is the number you pay. If something about the property turns out to be different from what we were told — a crawl space nobody mentioned, say — we'll tell you before the inspection, not after.",
  },
  {
    q: "Do you charge extra for the report, thermal imaging or same-day delivery?",
    a: "No. The same-day report and infrared thermal imaging are part of how we work, not premium add-ons, and they're included in every quote.",
  },
  {
    q: "Is it cheaper to book more than one service at once?",
    a: "Yes. A combined home and mold inspection is always priced below booking the two separately, and gas leak detection or a moisture survey added to an existing visit costs less than a standalone trip. Tell us everything you're worried about and we'll quote the combined visit.",
  },
  {
    q: "Is a condo quoted differently from a house?",
    a: "Yes. An attached unit has no roof or foundation of its own to assess, so it's quoted for what it actually is: the unit's systems, envelope penetrations, balcony and deck waterproofing, and any moisture arriving from shared walls or the unit above.",
  },
  {
    q: "What payment do you take, and when?",
    a: `Payment is due at the time of the inspection. We accept ${paymentList}. We'll confirm the exact figure for your property before you commit to anything.`,
  },
  {
    q: "Do you offer any discounts?",
    a: `Yes — ${discount.percent}% off for ${discount.who}. ${discount.terms}`,
  },
  {
    q: "What if I need to cancel or reschedule?",
    a: cancellation.detail,
  },
];

/** The three policy cards shown above the FAQ. */
const policyCards = [
  {
    icon: BadgePercent,
    title: `${discount.percent}% off for those who serve`,
    desc: `For ${discount.who}. ${discount.terms}`,
  },
  {
    icon: CreditCard,
    title: "Pay how you like",
    desc: `We accept ${paymentList}. Payment is due at the inspection.`,
  },
  {
    icon: CalendarX,
    title: "No cancellation fee",
    desc: "Plans change. Just give us 24 hours' notice to cancel or reschedule, and there's nothing to pay.",
  },
];

export default function Pricing() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: pricingFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
        { "@type": "ListItem", position: 2, name: "Get a Quote", item: `${site.domain}/pricing` },
      ],
    },
  ];

  return (
    <Layout>
      <Seo
        title="Get a Home Inspection Quote in San Francisco & the Bay Area"
        description="How a Bay Area home inspection is quoted: send the address and get one firm number, usually within the hour. What moves a quote, what's always included, and how payment works."
        path="/pricing"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="Get a Quote"
        title="One firm number for your property, before you book"
        subtitle="Every home is different, so every inspection is quoted individually. Send us the address and you'll have a firm quote — usually within the hour."
        crumbs={[{ label: "Home", href: "/" }, { label: "Get a Quote" }]}
      />

      {/* How a quote works */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">How a quote works</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </motion.li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-white font-bold rounded-lg px-6 h-12 hover:opacity-90 transition-opacity"
              data-testid="link-pricing-quote"
            >
              Get my quote
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-800 font-bold rounded-lg px-6 h-12 hover:border-primary hover:text-primary transition-colors"
              data-testid="link-pricing-call"
            >
              <Phone className="w-4 h-4" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* What moves a quote */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What moves a quote
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Four things, and none of them is a surprise sprung on you after the inspection.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {priceFactors.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <f.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Included in every quote */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-secondary font-semibold uppercase tracking-wide text-sm mb-3">
                Included Every Time
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                Nothing on this list is an add-on
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Rush report fees, thermal imaging surcharges, and travel add-ons are common in this
                market. None of them appear on your invoice here — the quote is the whole service,
                not the cheapest possible version of it.
              </p>
            </div>
            <ul className="space-y-4">
              {alwaysIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-secondary" />
                  </span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Discounts, payment and cancellation */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            Discounts, payment and cancellations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {policyCards.map((c) => (
              <div key={c.title} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <c.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote FAQ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Quote questions
          </h2>
          <p className="text-lg text-gray-600 mb-10 text-center leading-relaxed">
            The things people ask before they book, answered without the runaround.
          </p>
          <Accordion type="single" collapsible className="space-y-3">
            {pricingFaqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-gray-200 rounded-lg px-4 bg-white shadow-sm data-[state=open]:border-primary/20 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary hover:no-underline py-4 text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 p-6 bg-white border border-gray-200 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-gray-700 leading-relaxed flex-1">
              Have a property that doesn't fit anything above? Call and describe it — you'll get a
              real number, usually within the hour.
            </p>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold rounded-lg px-6 h-12 hover:bg-primary/90 transition-colors flex-shrink-0"
              data-testid="link-pricing-call-faq"
            >
              <Phone className="w-4 h-4" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <CTASection
        title="Get your quote before you book"
        subtitle="Same-day appointments, same-day reports, and one firm number for your property."
      />
    </Layout>
  );
}
