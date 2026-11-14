import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, ArrowRight, MapPin, Phone } from "lucide-react";
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
import NotFound from "@/pages/not-found";
import {
  getCityServicePage,
  nearbyWithSameService,
  buildIntro,
  pageTitle,
  pageDescription,
} from "@/data/city-service";
import { getCityServiceOverride } from "@/data/city-service-overrides";
import { site } from "@/data/site";

/**
 * One page per city × service combination that earned one.
 *
 * The order of sections is deliberate: this city's own findings come first,
 * before any generic service copy. That is what makes the page worth existing
 * separately from the city page and the service page it sits between.
 */

interface Props {
  citySlug: string;
  serviceSlug: string;
}

export default function CityService({ citySlug, serviceSlug }: Props) {
  const page = getCityServicePage(citySlug, serviceSlug);
  if (!page) return <NotFound />;

  const { city, service, cityFaqs } = page;
  const override = getCityServiceOverride(citySlug, serviceSlug);
  const issues = override.issues ?? page.issues;
  const eras = override.hideEras ? [] : page.eras;
  const nearby = nearbyWithSameService(page);
  const intro = override.intro ?? buildIntro(page);
  const description = override.description ?? pageDescription(page);
  const title = pageTitle(page);
  const url = `${site.domain}/service-areas/${citySlug}/${serviceSlug}`;

  // City FAQs lead, since they are what makes this page distinct; the service's
  // own FAQs follow to fill in the general questions.
  const faqs = [...(override.faqs ?? []), ...cityFaqs, ...service.faqs].slice(0, 10);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: title,
      serviceType: service.name,
      description,
      url,
      provider: {
        "@type": "LocalBusiness",
        name: site.name,
        telephone: site.phoneDisplay,
        areaServed: { "@type": "City", name: city.name, addressRegion: "CA" },
      },
      areaServed: { "@type": "City", name: city.name, addressRegion: "CA" },
    },
    ...(faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: `${site.domain}/service-areas` },
        { "@type": "ListItem", position: 3, name: city.name, item: `${site.domain}/service-areas/${citySlug}` },
        { "@type": "ListItem", position: 4, name: service.shortName, item: url },
      ],
    },
  ];

  return (
    <Layout>
      <Seo title={title} description={description} path={`/service-areas/${citySlug}/${serviceSlug}`} jsonLd={jsonLd} />
      <PageHero
        eyebrow={`${city.name} · ${city.county}`}
        title={title}
        subtitle={
          override.subtitle ??
          `${issues.length} findings that come up most often in ${city.name} homes — assessed by a former builder who knows what this housing stock hides.`
        }
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas" },
          { label: city.name, href: `/service-areas/${citySlug}` },
          { label: service.shortName },
        ]}
      />

      {/* Why this city is different — leads with local geography, not service boilerplate */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-5">
              {intro.map((p, i) => (
                <p key={i} className={i === 0 ? "text-lg text-gray-800 leading-relaxed font-medium" : "text-gray-600 leading-relaxed"}>
                  {p}
                </p>
              ))}
            </div>
            <aside className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-fit">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                At a glance
              </p>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-gray-500">Service</dt>
                  <dd className="font-semibold text-gray-900">{service.shortName}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Quote</dt>
                  <dd className="font-bold text-primary text-2xl">Free, same day</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Area</dt>
                  <dd className="font-semibold text-gray-900">
                    {city.name}, {city.region}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Report</dt>
                  <dd className="font-semibold text-gray-900">Same day</dd>
                </div>
              </dl>
              <a
                href={site.phoneHref}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-bold rounded-lg h-12 hover:bg-primary/90 transition-colors"
                data-testid="link-cityservice-call"
              >
                <Phone className="w-4 h-4" />
                {site.phoneDisplay}
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* The core differentiator: this city's actual findings for this service */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mb-10">
            <p className="text-secondary font-semibold uppercase tracking-wide text-sm mb-3">
              Local Findings
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What comes up most in {city.name}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              These are the findings this inspection is actually looking for here — drawn from how{" "}
              {city.name} was built and where it sits, not a generic list.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {issues.map((issue, i) => (
              <motion.div
                key={issue.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (i % 2) * 0.05 }}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-2">{issue.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{issue.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Housing eras relevant to this service in this city */}
      {eras.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {city.name} housing stock that matters here
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Age and construction era change what this inspection prioritises.
              </p>
            </div>
            <div className="space-y-6">
              {eras.map((era) => (
                <div key={era.label} className="flex gap-5">
                  <span className="w-2 bg-secondary/30 rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1.5">{era.label}</h3>
                    <p className="text-gray-600 leading-relaxed">{era.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testing methods and independence, for pages that spell them out */}
      {override.testing && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How we test</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {override.testing.map((t) => (
                <div key={t.title} className="rounded-xl p-6 border border-gray-100 bg-gray-50">
                  <h3 className="font-bold text-gray-900 mb-2">{t.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
            {override.independence && (
              <div className="mt-10 max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Why inspection-only matters</h2>
                <p className="text-gray-600 leading-relaxed">{override.independence}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* How it works + what's included, from the service data */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How the inspection works</h2>
              <ol className="space-y-5">
                {service.process.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What you get</h2>
              <ul className="space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-secondary" />
                    </span>
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-5 bg-white rounded-xl border border-gray-100">
                <p className="text-sm text-gray-600 leading-relaxed">{service.priceNote}</p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mt-3 hover:gap-2.5 transition-all"
                >
                  How quotes work
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighbourhoods — real local signal */}
      {city.neighborhoods.length > 0 && (
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Serving across {city.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {city.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700"
                >
                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {city.name} questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-gray-200 rounded-lg px-4 bg-white shadow-sm data-[state=open]:border-primary/20 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Internal linking: back up to parents, sideways to nearby cities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">More in {city.name}</h2>
              <div className="space-y-2">
                <Link
                  href={`/service-areas/${citySlug}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors group"
                >
                  <span className="font-medium text-gray-800 group-hover:text-primary">
                    All inspection services in {city.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                </Link>
                <Link
                  href={`/services/${serviceSlug}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors group"
                >
                  <span className="font-medium text-gray-800 group-hover:text-primary">
                    {service.shortName} — full service details
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                </Link>
              </div>
            </div>
            {nearby.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {service.shortName} nearby
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {nearby.map((n) => (
                    <Link
                      key={n.citySlug}
                      href={`/service-areas/${n.citySlug}/${n.serviceSlug}`}
                      className="p-3 rounded-lg border border-gray-200 hover:border-primary transition-colors text-sm font-medium text-gray-800 hover:text-primary"
                    >
                      {n.city.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <CTASection
        title={`Book your ${service.shortName.toLowerCase()} in ${city.name}`}
        subtitle="Same-day and next-day appointments, same-day reports, and a firm quote before you commit."
      />
    </Layout>
  );
}
