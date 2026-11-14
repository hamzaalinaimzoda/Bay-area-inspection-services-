import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, ArrowRight, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { inspectionScope, scopeItemCount } from "@/data/inspection-scope";
import { site } from "@/data/site";

/**
 * The component-level scope page.
 *
 * Service pages answer "what is a home inspection"; this answers "do you check
 * the water heater strapping". Those are different searches and previously only
 * the first had a page. Content comes from `inspection-scope.ts` so the section
 * count and item count can never drift from what is actually rendered.
 */

/** What a general inspection deliberately does not cover. */
const notCovered = [
  {
    title: "Anything concealed or inaccessible",
    desc: "The inspection is visual and non-invasive. Walls do not get opened, finishes do not get removed, and areas that are unsafe or physically unreachable are reported as not inspected rather than assumed sound.",
  },
  {
    title: "Sewer lateral interiors",
    desc: "The accessible portion is assessed visually, but the buried line needs a camera scope from a licensed plumber. On older properties with mature trees this is worth doing separately — and in San Francisco it is frequently a transaction requirement.",
  },
  {
    title: "Pest and wood-destroying organism reports",
    desc: "Visible evidence gets documented, but identifying active infestation and recommending treatment is a separate licensed discipline. A licensed pest operator issues that report.",
  },
  {
    title: "Laboratory analysis of samples",
    desc: "Mold and moisture assessment here is visual and instrument-based — infrared thermal imaging and calibrated moisture meters to find the water source. No samples are collected or sent for analysis.",
  },
  {
    title: "Engineering and geotechnical evaluation",
    desc: "Where a structural finding warrants calculation rather than observation, the report says so plainly and recommends a structural or geotechnical engineer instead of leaving it vague.",
  },
  {
    title: "Code compliance certification",
    desc: "An inspection reports condition and safety concerns; it is not a code compliance certificate. Permit history is a matter for the local building department.",
  },
];

export default function WhatWeInspect() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Home Inspection Scope",
      serviceType: "Home Inspection",
      provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phoneDisplay },
      areaServed: { "@type": "City", name: "San Francisco" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Inspected systems and components",
        itemListElement: inspectionScope.map((section, i) => ({
          "@type": "OfferCatalog",
          position: i + 1,
          name: section.title,
          itemListElement: section.items.map((item, j) => ({
            "@type": "Offer",
            position: j + 1,
            itemOffered: { "@type": "Service", name: item.name, description: item.detail },
          })),
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
        { "@type": "ListItem", position: 2, name: "What We Inspect", item: `${site.domain}/what-we-inspect` },
      ],
    },
  ];

  return (
    <Layout>
      <Seo
        title="What We Inspect — Full Component Checklist"
        description={`Every system and component checked during a Bay Area home inspection — ${scopeItemCount} items across roof, foundation, electrical, plumbing, HVAC, attic, crawl space and interior. Plus what a general inspection does not cover.`}
        path="/what-we-inspect"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="Full Inspection Scope"
        title="Everything we actually check"
        subtitle={`${scopeItemCount} components across ${inspectionScope.length} systems — named specifically, with what's being judged about each one and why it matters in Bay Area housing.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "What We Inspect" }]}
      />

      {/* Jump nav — also gives crawlers a clean map of the page */}
      <section className="py-10 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Jump to a system
          </p>
          <div className="flex flex-wrap gap-2">
            {inspectionScope.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors"
              >
                <section.icon className="w-4 h-4 text-secondary" />
                {section.title}
                {/* gray-400 on white is 2.6:1; gray-600 clears AA at this size. */}
                <span className="text-gray-600 tabular-nums">{section.items.length}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* The scope itself */}
      {inspectionScope.map((section, si) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-16 md:py-20 scroll-mt-24 ${si % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mb-10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{section.title}</h2>
                  <p className="text-sm text-gray-500 tabular-nums">
                    {section.items.length} components checked
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">{section.intro}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
              {section.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (i % 2) * 0.04 }}
                  className="flex gap-4"
                >
                  <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-secondary" />
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1.5">{item.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Limits — honesty section, and it ranks for "what does a home inspection not cover" */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mb-10">
            <p className="text-secondary font-semibold uppercase tracking-wide text-sm mb-3">
              Knowing The Limits
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              What a general inspection does not cover
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed">
              Knowing the boundaries is as useful as knowing the scope, because it tells you which
              specialist to bring in and when. None of the below is a gap — it's the difference
              between a generalist assessment and a specialist one.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {notCovered.map((item) => (
              <div key={item.title}>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route onward to the services that map to this scope */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            This is the full home inspection
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Everything above is covered by the{" "}
            <Link href="/services/full-home-inspection" className="text-primary font-semibold hover:text-secondary">
              full home inspection
            </Link>
            , quoted for your property before you book. Where a property needs
            a closer look at moisture specifically, the{" "}
            <Link href="/services/mold-inspection" className="text-primary font-semibold hover:text-secondary">
              mold inspection
            </Link>{" "}
            and{" "}
            <Link href="/services/moisture-water-damage" className="text-primary font-semibold hover:text-secondary">
              moisture assessment
            </Link>{" "}
            go deeper with thermal imaging and moisture metering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold rounded-lg px-6 h-12 hover:bg-primary/90 transition-colors"
            >
              How quotes work
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-800 font-bold rounded-lg px-6 h-12 hover:border-primary hover:text-primary transition-colors"
              data-testid="link-scope-call"
            >
              <Phone className="w-4 h-4" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <CTASection
        title="Questions about a specific component?"
        subtitle="Call and ask. If it's something a general inspection can't answer, you'll be told that plainly rather than sold an add-on."
      />
    </Layout>
  );
}
