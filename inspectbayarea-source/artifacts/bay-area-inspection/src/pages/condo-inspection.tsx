import { Link } from "wouter";
import { Building2, Check, Phone, CalendarCheck, FileText, ArrowRight, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { BuyBackGuarantee } from "@/components/sections/BuyBackGuarantee";

/**
 * Condo inspection landing page.
 *
 * Not a separate entry in the services data on purpose. A condo inspection is
 * the full home inspection scoped for an attached unit, and the booking forms
 * and the Google Ads conversion values all model it that way
 * ("full-home-inspection" + a condo flag). A second service record would put a
 * duplicate row in every booking dropdown and a second set of city × service
 * pages competing with the first. The site publishes no prices, here or
 * anywhere else (owner's decision, 2026-09-24).
 *
 * What this page adds is a URL that matches "condo inspection San Francisco"
 * searches, which previously landed on a page about houses.
 */

/** Preselects the condo row in the booking modal (see BookingModal). */
const openCondoBooking = () =>
  window.dispatchEvent(
    new CustomEvent("openBookingModal", { detail: { serviceId: "full-home-inspection-condo" } }),
  );

const inside = [
  { title: "Electrical", desc: "The unit's panel or subpanel, visible wiring, outlets, GFCI and AFCI protection, and smoke and carbon monoxide alarms." },
  { title: "Plumbing", desc: "Supply and drain lines inside the unit, fixtures, shutoff valves, and the water heater if it serves only your unit." },
  { title: "Heating & cooling", desc: "Wall heaters, baseboard, furnace or heat pump serving the unit, and radiators in older buildings (the boiler behind them is usually the association's)." },
  { title: "Windows, doors & balcony", desc: "Operation, seals and glazing, balcony door thresholds, and the visible condition of the balcony surface, railing and drainage." },
  { title: "Kitchen & laundry", desc: "Built-in appliances, and in-unit laundry including the dryer vent — long vent runs through a building clog with lint." },
  { title: "Water from next door or upstairs", desc: "Ceilings below the unit above, shared walls and window openings, checked with a moisture meter and thermal camera." },
];

const notInspected = [
  "The roof, foundation and building structure",
  "Hallways, lobbies, garages and other common areas",
  "Building-wide systems such as central boilers, elevators and fire sprinklers",
];

const documents = [
  {
    title: "The association's balcony inspection",
    desc: "California requires condo associations to have wood-supported balconies, decks, stairs and walkways more than six feet above ground inspected by a licensed engineer or architect at least every nine years (Civil Code 5551, from SB 326). That inspection covers a sample of them, not necessarily yours — so read it alongside what we see on your balcony.",
  },
  {
    title: "The reserve study and current budget",
    desc: "Shows whether big repairs are already funded or likely to arrive as a special assessment after you move in.",
  },
  {
    title: "Board minutes from the last year or two",
    desc: "Leaks, special assessments and disputes between owners usually show up in the minutes before they show up anywhere else.",
  },
];

const findings = [
  { title: "Water from the unit above", desc: "Stained ceilings under a neighbour's bathroom or kitchen. We check with a moisture meter whether it's active now or an old leak that was fixed." },
  { title: "Condensation and mold-like growth at windows", desc: "Fog, closed windows and a weak bathroom fan are a common combination in San Francisco. It shows up on window frames and the drywall beside them first." },
  { title: "Bathroom fans that don't move air", desc: "A fan that runs but doesn't pull air leaves moisture in the room. It's one of the most frequent condo findings, and one of the cheapest to fix." },
  { title: "Leaking shower valves and slow drains", desc: "Small in-unit plumbing defects that are yours to repair, not the association's, and which can damage the unit below." },
  { title: "Balcony doors and sliders that let water in", desc: "Worn thresholds, blocked tracks and failed seals at the balcony opening, often with soft or stained flooring just inside." },
  { title: "Old wiring and pipes in converted buildings", desc: "Many San Francisco condos are flats in converted Victorian and Edwardian buildings. Ungrounded outlets and galvanized pipes inside the unit are common." },
];

const faqs = [
  {
    q: "How much does a condo inspection cost?",
    a: "It's quoted for your unit. Size and age move it, and with no roof or foundation of your own to inspect the visit is shorter than a house. Send us the address and you'll have a firm number before you book, usually within the hour, and it's the number you pay. Infrared thermal imaging, moisture readings and a same-day report are included.",
  },
  {
    q: "How long does a condo inspection take?",
    a: "Usually around two hours for a typical unit, compared with three or more for a single-family house. The report is normally delivered the same day.",
  },
  {
    q: "Do you inspect the roof and the rest of the building?",
    a: "No. Those are normally the association's responsibility, and a proper assessment of a whole building is a different job. We do note anything we can see from your unit that affects it — for example, staining that suggests water getting in through an exterior wall.",
  },
  {
    q: "Is a condo inspection worth it if the association maintains the building?",
    a: "Yes. The association maintains the shared parts, but the unit's own systems, fixtures and finishes are generally yours to repair. A leaking shower valve or a failed water heater is your bill, and so is damage it causes to the unit below.",
  },
  {
    q: "Do you inspect townhomes?",
    a: "Yes. Townhome ownership varies: if the title includes the roof and foundation, the inspection needs to cover them too. We confirm the scope and the price with you before booking.",
  },
  {
    q: "Can you document a leak coming from the unit above?",
    a: "Yes. We record where the moisture is, the meter readings and dated photographs. We don't decide who is legally responsible — that's between you, the association and the insurers — but a dated, measured record is what they will ask for.",
  },
];

export default function CondoInspection() {
  const url = `${site.domain}/condo-inspection`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Condo Inspection",
      description: "Condo and attached-unit inspections in San Francisco and the Bay Area.",
      url,
      provider: {
        "@type": "LocalBusiness",
        name: site.name,
        url: site.domain,
        telephone: site.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mountain View",
          addressRegion: "CA",
          addressCountry: "US",
        },
      },
      areaServed: { "@type": "State", name: "California", alternateName: "Bay Area, CA" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.domain}/services` },
        { "@type": "ListItem", position: 3, name: "Condo Inspection", item: url },
      ],
    },
  ];

  return (
    <Layout>
      <Seo
        title="Condo Inspection San Francisco"
        description="Condo inspections in San Francisco and the Bay Area. We inspect everything inside your unit — systems, windows, balcony, water from upstairs — with a same-day report."
        path="/condo-inspection"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="Condo Inspection"
        title="Condo inspections in San Francisco"
        subtitle="The association looks after the building. You're buying everything inside your walls — so that's what we inspect: the unit's own systems, windows and doors, the balcony, and any water coming in from next door or upstairs."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Condo Inspection" }]}
      />

      {/* Overview + booking card */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
              <img
                src={photos.windowCondensation.src}
                alt={photos.windowCondensation.alt}
                width={1200}
                height={900}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Not a smaller house inspection</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                In most condos the roof, the foundation and the exterior walls belong to the
                homeowners' association. So the questions that matter are different: does everything
                you'll own outright work, and is water getting into your unit from somewhere you
                don't control?
              </p>
              <p>
                In San Francisco that second question matters more than most places. Many condos here
                are flats in converted Victorian and Edwardian buildings, sharing century-old walls,
                floors and drain lines with the neighbours. Others are newer units where one leaking
                balcony door can stain the ceiling of the unit below.
              </p>
              <p>
                We inspect everything inside your unit, note anything visible outside it that affects
                you, and tell you plainly which items are yours to fix and which belong to the
                association.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 bg-primary rounded-2xl p-7 text-white shadow-lg">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-sm text-white/70 mb-1">Condo or attached unit</p>
              <p className="text-3xl font-bold mb-3">Free quote</p>
              <p className="text-white/70 text-sm mb-5 leading-relaxed">
                Thermal imaging and moisture readings included. Send us the address and you'll have
                a firm number before you book, usually within the hour.
              </p>
              <button
                onClick={openCondoBooking}
                className={cn(buttonVariants(), "w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12 gap-2 mb-3")}
                data-testid="button-condo-book"
              >
                <CalendarCheck className="w-5 h-5" />
                Book a Condo Inspection
              </button>
              <a
                href={site.phoneHref}
                className={cn(buttonVariants({ variant: "outline" }), "w-full border-white text-white hover:bg-white/10 hover:text-white bg-transparent font-bold h-12 gap-2")}
              >
                <Phone className="w-4 h-4" />
                {site.phoneDisplay}
              </a>
              <Link
                href="/sample-report"
                className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/80 hover:text-white"
              >
                <FileText className="w-4 h-4" />
                See a sample report
              </Link>
            </div>

            <div className="mt-4">
              <BuyBackGuarantee compact />
            </div>
          </div>
        </div>
      </section>

      {/* Inside your boundary */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">What we inspect inside your unit</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inside.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outside your boundary */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">What we don't inspect</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            These are normally the association's responsibility, so they're outside a condo inspection:
          </p>
          <ul className="space-y-3 mb-6">
            {notInspected.map((n) => (
              <li key={n} className="flex items-start gap-3 text-gray-800">
                <X className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg text-gray-600 leading-relaxed">
            Exactly where your responsibility ends is set by the association's CC&amp;Rs, not by us —
            ask your agent for them early. We still note anything we can see from your unit that
            affects it, such as a balcony above that drains onto yours.
          </p>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Three documents to ask for</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            We don't review association paperwork, but these answer the questions an inspection of
            one unit can't. Your agent can request them.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {documents.map((d) => (
              <div key={d.title} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{d.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common findings */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">What we find in Bay Area condos</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {findings.map((f) => (
              <div key={f.title} className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-1.5">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/services/full-home-inspection"
            className="mt-8 inline-flex items-center gap-1 font-semibold text-primary hover:text-secondary transition-colors"
          >
            Buying a house instead? See the full home inspection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Condo Inspection FAQs</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`} className="border border-gray-200 rounded-lg px-4 bg-white shadow-sm data-[state=open]:border-primary/20 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary hover:no-underline py-4 text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTASection
        title="Ready to book your condo inspection?"
        subtitle="Thermal imaging, moisture readings and a same-day report included. Get a firm quote before you book."
      />
    </Layout>
  );
}
