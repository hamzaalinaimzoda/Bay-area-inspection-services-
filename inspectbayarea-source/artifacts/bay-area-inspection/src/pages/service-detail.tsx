import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, Phone, CalendarCheck, ArrowRight, BadgeCheck, Wrench, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReadMore } from "@/components/ReadMore";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { getService, services } from "@/data/services";
import { BuyBackGuarantee } from "@/components/sections/BuyBackGuarantee";
import { getRelatedPosts } from "@/data/blog";
import { site } from "@/data/site";

const openBooking = () => window.dispatchEvent(new CustomEvent("openBookingModal"));

export default function ServiceDetail({ slug }: { slug: string }) {
  const service = getService(slug);

  if (!service) {
    return (
      <Layout>
        <Seo title="Service Not Found" description="The requested service could not be found." />
        <div className="container mx-auto px-4 max-w-3xl py-32 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find that service. Browse our full list instead.</p>
          <Link href="/services" className={cn(buttonVariants(), "bg-primary text-white")}>
            View All Services
          </Link>
        </div>
      </Layout>
    );
  }

  const related = getRelatedPosts(service.relatedBlog);
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceUrl = `${site.domain}/services/${service.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": service.name,
      "description": service.metaDescription,
      "url": serviceUrl,
      "image": service.heroImage.startsWith("http") ? service.heroImage : `${site.domain}${service.heroImage}`,
      "provider": {
        "@type": "LocalBusiness",
        "name": site.name,
        "url": site.domain,
        "telephone": site.phoneDisplay,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mountain View",
          "addressRegion": "CA",
          "addressCountry": "US",
        },
      },
      "areaServed": {
        "@type": "State",
        "name": "California",
        "alternateName": "Bay Area, CA",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": service.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": site.domain },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": `${site.domain}/services` },
        { "@type": "ListItem", "position": 3, "name": service.name, "item": serviceUrl },
      ],
    },
  ];

  return (
    <Layout>
      <Seo title={`${service.name} | Bay Area`} description={service.metaDescription} path={`/services/${service.slug}`} jsonLd={jsonLd} />
      <PageHero
        eyebrow="Inspection Service"
        title={service.name}
        subtitle={service.tagline}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.shortName }]}
      />

      {/* Overview + sticky CTA card */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
                <img src={service.heroImage} alt={service.heroImageAlt} className="w-full h-64 md:h-80 object-cover" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Overview</h2>
              <ReadMore clampClass="max-h-[216px]" fade="white" label="Read the full overview">
                <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
                  {service.overview.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </ReadMore>
              <div className="mb-8" />
              <div className="grid sm:grid-cols-2 gap-3">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <BadgeCheck className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 font-medium text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* order-first: on desktop this is a sticky sidebar, but stacked on
                a phone it landed below ~2000px of copy. The booking card is the
                point of the page — it goes first on small screens. */}
            <div className="lg:col-span-1 order-first lg:order-none">
              <div className="lg:sticky lg:top-28 bg-primary rounded-2xl p-6 md:p-7 text-white shadow-lg">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Book {service.shortName}</h3>
                <p className="text-white/70 text-sm mb-5 leading-relaxed">{service.priceNote}</p>
                <button
                  onClick={openBooking}
                  className={cn(buttonVariants(), "w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12 gap-2 mb-3")}
                  data-testid="button-service-book"
                >
                  <CalendarCheck className="w-5 h-5" />
                  Book Online
                </button>
                <a
                  href={site.phoneHref}
                  className={cn(buttonVariants({ variant: "outline" }), "w-full border-white text-white hover:bg-white/10 hover:text-white bg-transparent font-bold h-12 gap-2")}
                >
                  <Phone className="w-4 h-4" />
                  {site.phoneDisplay}
                </a>
                <p className="text-center text-xs text-white/50 mt-4">Same-day availability · Report same day</p>
                <Link
                  href="/sample-report"
                  className="mt-3 block text-center text-sm text-white/80 hover:text-white underline underline-offset-4"
                >
                  See a sample report
                </Link>
              </div>

              {/* Only full-home-inspection is backed by the guarantee — see
                  the note in BuyBackGuarantee.tsx before extending this. */}
              {service.slug === "full-home-inspection" && (
                <div className="mt-4">
                  <BuyBackGuarantee compact />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">What's Included</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <ReadMore clampClass="max-h-[360px]" fade="gray" label="Show everything that's included">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.includes.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="bg-white rounded-xl p-5 md:p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          </ReadMore>
        </div>
      </section>

      {/* Equipment — naming the instruments reads as competence and captures
          searches for the tools themselves. */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              The Equipment We Use
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            Every instrument below is used on a standard {service.shortName.toLowerCase()} — none of
            it is an upsell.
          </p>
          <ReadMore clampClass="max-h-[340px]" fade="white" label="Show all equipment">
          <div className="grid md:grid-cols-2 gap-5">
            {service.equipment.map((eq) => (
              <div
                key={eq.name}
                className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex gap-4"
              >
                <Wrench className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{eq.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{eq.purpose}</p>
                </div>
              </div>
            ))}
          </div>
          </ReadMore>
        </div>
      </section>

      {/* Common findings */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              What We Actually Find
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            The findings that come up again and again on Bay Area properties.
          </p>
          <ReadMore clampClass="max-h-[340px]" fade="gray" label="Show everything we find">
          <div className="space-y-4">
            {service.commonFindings.map((f) => (
              <div key={f.title} className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-1.5">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          </ReadMore>
        </div>
      </section>

      {/* San Francisco context */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-semibold text-secondary mb-3">
            <MapPin className="w-4 h-4" />
            <span>Our primary market</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            {service.shortName} in San Francisco
          </h2>
          <ReadMore clampClass="max-h-[216px]" fade="white" label="Read more about San Francisco homes">
            <div className="space-y-4 text-base md:text-lg text-gray-600 leading-relaxed">
              {service.sfContext.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </ReadMore>
          <Link
            href="/service-areas/san-francisco"
            className="mt-6 inline-flex items-center gap-1 font-semibold text-primary hover:text-secondary transition-colors"
          >
            More on inspecting San Francisco homes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">Who Books This</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <ReadMore clampClass="max-h-[300px]" fade="gray" label="Show everyone who books this">
          <div className="grid md:grid-cols-2 gap-5">
            {service.whoItsFor.map((a) => (
              <div key={a.who} className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-1.5">{a.who}</h3>
                <p className="text-gray-600 leading-relaxed">{a.need}</p>
              </div>
            ))}
          </div>
          </ReadMore>
        </div>
      </section>

      {/* Process */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">Our Process</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="space-y-6">
            {service.process.map((step, i) => (
              <div key={step.title} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {service.gallery.length > 0 && (
        <section className="py-10 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">On the Job</h2>
              <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
            </div>
            {/* A 2-col grid of six photos is three screens on a phone. Swipe
                horizontally there; keep the grid from md up. */}
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible">
              {service.gallery.map((photo, i) => (
                <div key={i} className="shrink-0 w-[72vw] snap-start md:w-auto rounded-xl overflow-hidden shadow-sm aspect-[4/3]">
                  <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {service.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-gray-200 rounded-lg px-4 bg-gray-50 shadow-sm data-[state=open]:bg-white data-[state=open]:border-primary/20 transition-colors">
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

      {/* Related blog */}
      {related.length > 0 && (
        <section className="py-10 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Related Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <img src={post.hero} alt={post.heroAlt} loading="lazy" className="w-28 h-28 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">{post.category}</span>
                    <h3 className="font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-auto pt-2">
                      Read more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other services */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Other Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group flex items-center gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-secondary/40 hover:bg-white transition-colors">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <s.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{s.shortName}</h3>
                  <span className="text-sm text-gray-500 inline-flex items-center gap-1">Learn more <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={`Ready to schedule your ${service.shortName.toLowerCase()}?`} />
    </Layout>
  );
}
