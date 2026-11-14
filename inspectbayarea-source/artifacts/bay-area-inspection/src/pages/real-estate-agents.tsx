import { Link } from "wouter";
import {
  Clock,
  CalendarCheck,
  DollarSign,
  ListChecks,
  FileSearch,
  Scale,
  ShieldCheck,
  Phone,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
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
import { site } from "@/data/site";
import { BuyBackGuarantee } from "@/components/sections/BuyBackGuarantee";

/**
 * Real estate agent page.
 *
 * Agents are the largest referral source for home inspectors, and the main SF
 * competitor has a dedicated agent section. Two things constrain what this page
 * may say, and both were checked against InterNACHI's own pages (Sep 2026):
 *
 *   - Negligent Referral Protection (nachi.org/agent-indemnification.htm):
 *     InterNACHI indemnifies a *registered* agent up to $10,000. The agent must
 *     register before referring, it is residential only, and the inspector must
 *     have a written inspection agreement with the client. The conditions are
 *     stated on the page so an agent is not misled into thinking they are
 *     covered without registering.
 *   - Code of Ethics (nachi.org/code_of_ethics.htm): members may not pay agents
 *     for referrals, and may not release the report to a third party without
 *     the client's explicit agreement. Hence "no referral fees" and "with your
 *     client's OK, we copy you" — never an automatic copy.
 */

const NACHI_AGENT_URL = "https://www.nachi.org/agent-indemnification.htm";

const openBooking = () => window.dispatchEvent(new CustomEvent("openBookingModal"));

const reasons = [
  {
    icon: Clock,
    title: "Same-day reports",
    desc: "Contingency periods are short. The report normally arrives the evening of the inspection, not three days later.",
  },
  {
    icon: CalendarCheck,
    title: "Fast scheduling",
    desc: "Same-day and next-day appointments are often available, including evenings and Saturdays.",
  },
  {
    icon: DollarSign,
    title: "A firm quote, fast",
    desc: "Send us the address and your client gets one firm number, usually within the hour — not a range that shifts later.",
  },
  {
    icon: ListChecks,
    title: "Findings rated by urgency",
    desc: "Safety, Priority, Investigate or Maintenance. A cracked cover plate doesn't read like a foundation problem, and your client can see which is which.",
  },
  {
    icon: FileSearch,
    title: "Ready for the repair request",
    desc: "Every finding points to numbered photos, and the report ends with next steps in order, naming the specialist to call for each.",
  },
  {
    icon: Scale,
    title: "Inspection-only",
    desc: "We don't do repairs or remediation, so nothing in the report is there to sell work.",
  },
];

const steps = [
  { title: "Send us your client", desc: "They book online or call us. Or call us yourself with their name and number and we'll reach out to them." },
  { title: "We confirm price and time with your client", desc: "Before anything is booked, so there are no surprises on inspection day." },
  { title: "Inspection", desc: "You and your client are welcome at the end for a walkthrough of what we found." },
  { title: "Same-day report", desc: "The report goes to your client. With their OK, we send you a copy at the same time." },
];

const faqs = [
  {
    q: "Do you pay referral fees?",
    a: "No. InterNACHI's Code of Ethics prohibits members from paying agents or brokerages for referrals or for a place on a preferred-inspector list. It keeps the report beyond question for your client, and keeps you clear of any kickback issue.",
  },
  {
    q: "Will your report kill my deal?",
    a: "The report describes what we found and rates how urgent each item is. In most homes most findings are maintenance, and the report says so plainly. The ones that aren't are things your client needs to know before closing — and finding them now is better for everyone than finding them after.",
  },
  {
    q: "Can you meet a tight contingency?",
    a: "Usually. Same-day and next-day appointments are often available, and the report is normally delivered the same day as the inspection. Call us and we'll tell you the earliest slot straight away.",
  },
  {
    q: "Do you send the report to me?",
    a: "Your client decides. The report belongs to them; with their OK we copy you as soon as it's issued, which is what most clients want.",
  },
  {
    q: "Do you inspect condos?",
    a: "Yes, and quoted per unit. We inspect everything inside the unit and note anything visible outside it that affects the unit. The roof, structure and common areas are the association's and aren't part of a condo inspection.",
  },
  {
    q: "What areas do you cover?",
    a: "San Francisco is our primary market, and we cover the Peninsula, the South Bay and the East Bay as well.",
  },
];

export default function RealEstateAgents() {
  const url = `${site.domain}/real-estate-agents`;
  const jsonLd = [
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
        { "@type": "ListItem", position: 2, name: "For Real Estate Agents", item: url },
      ],
    },
  ];

  return (
    <Layout>
      <Seo
        title="For Real Estate Agents — Bay Area Home Inspector"
        description="A Bay Area home inspector agents can hand clients to: firm quotes, same-day reports and findings rated by urgency. InterNACHI Certified — registered agents get InterNACHI's free negligent-referral protection."
        path="/real-estate-agents"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="For Real Estate Agents"
        title="An inspector you can hand your clients to"
        subtitle="Firm quotes, same-day reports, and findings written plainly enough that your client knows what matters, what can wait, and who to call."
        crumbs={[{ label: "Home", href: "/" }, { label: "For Real Estate Agents" }]}
      />

      {/* Reasons */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">What your clients get</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <r.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{r.title}</h3>
                <p className="text-gray-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* InterNACHI negligent referral protection */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-8 h-8 text-secondary-on-dark shrink-0" />
            <p className="text-secondary-on-dark font-semibold uppercase tracking-wide text-sm">
              Free for agents who register
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Up to $10,000 of negligent-referral protection</h2>
          <p className="text-lg text-gray-200 leading-relaxed mb-6">
            We're an InterNACHI Certified Professional Inspector (member {site.nachiId}). InterNACHI
            will indemnify a licensed agent up to $10,000 if a third party successfully sues the agent
            for negligently referring an InterNACHI inspector. It costs agents nothing, but it only
            applies if you register first:
          </p>
          <ul className="space-y-2 text-gray-200 mb-8 list-disc pl-5 marker:text-secondary-on-dark">
            <li>Register with InterNACHI before you make the referral</li>
            <li>Residential inspections only, not commercial</li>
            <li>The inspection must be under a written agreement with your client</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={NACHI_AGENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-lg h-12 px-6 transition-colors"
              data-testid="link-nachi-agent-protection"
            >
              Full terms and registration
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={site.nachiVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/40 hover:bg-white/10 text-white font-bold rounded-lg h-12 px-6 transition-colors"
            >
              Verify our membership
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* How a referral works */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">How a referral works</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <BuyBackGuarantee />

      {/* Sample report */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid md:grid-cols-5">
            <img
              src={`${import.meta.env.BASE_URL}images/sample-report/plate-42.webp`}
              alt="A rusted appliance drain pan, photographed for a report"
              width={600}
              height={800}
              loading="lazy"
              decoding="async"
              className="w-full h-56 md:h-full object-cover md:col-span-2"
            />
            <div className="p-7 md:p-10 md:col-span-3">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Read a report before you recommend us</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                A real report we issued, with the client and address removed. See how findings are
                rated, how each one ties to a photo, and how the next steps are laid out for a repair
                request.
              </p>
              <Link
                href="/sample-report"
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-secondary transition-colors"
              >
                See the sample report <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Questions agents ask</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`} className="border border-gray-200 rounded-lg px-4 bg-gray-50 shadow-sm data-[state=open]:bg-white data-[state=open]:border-primary/20 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary hover:no-underline py-4 text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-6 text-sm text-gray-500">
            More on condos: <Link href="/condo-inspection" className="font-semibold text-primary hover:text-secondary">condo inspections</Link>.
            Full coverage list: <Link href="/service-areas" className="font-semibold text-primary hover:text-secondary">service areas</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-[#0f2438] text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a client who needs an inspection?</h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Call and we'll give you the earliest slot straight away, or book it online for your client.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={site.phoneHref}
              className={cn(buttonVariants({ size: "lg" }), "bg-secondary hover:bg-secondary/90 text-white font-bold text-lg h-14 px-8 gap-2")}
            >
              <Phone className="w-5 h-5" />
              Call {site.phoneDisplay}
            </a>
            <button
              onClick={openBooking}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white text-white hover:bg-white/10 hover:text-white font-bold text-lg h-14 px-8 bg-transparent gap-2")}
            >
              <CalendarCheck className="w-5 h-5" />
              Book Online
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
