import { Link } from "wouter";
import { Check, Phone, CalendarCheck, FileText, X } from "lucide-react";
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
import { getLandingPage, landingLink } from "@/data/landing";
import { site } from "@/data/site";
import NotFound from "./not-found";
import { ReadMore } from "@/components/ReadMore";

/**
 * Template for the single-service landing pages in data/landing (pre-listing,
 * manufactured home, ADU, new construction). Same structure as the condo page,
 * driven by data so each new job type is a content file rather than another
 * 350-line component.
 */

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">{children}</h2>
      <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
    </div>
  );
}

export default function Landing({ slug }: { slug: string }) {
  const page = getLandingPage(slug);
  if (!page) return <NotFound />;

  const { label, icon: Icon } = landingLink(page.slug);
  const url = `${site.domain}/${page.slug}`;
  const openBooking = () =>
    window.dispatchEvent(new CustomEvent("openBookingModal", { detail: { serviceId: page.bookingServiceId } }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: page.name,
      description: page.metaDescription,
      url,
      image: page.image.src.startsWith("http") ? page.image.src : `${site.domain}${page.image.src}`,
      provider: {
        "@type": "LocalBusiness",
        name: site.name,
        url: site.domain,
        telephone: site.phoneDisplay,
        address: { "@type": "PostalAddress", addressLocality: "Mountain View", addressRegion: "CA", addressCountry: "US" },
      },
      areaServed: { "@type": "State", name: "California", alternateName: "Bay Area, CA" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.domain}/services` },
        { "@type": "ListItem", position: 3, name: page.name, item: url },
      ],
    },
  ];

  // Sections alternate white / grey. The fixed ones before and after the
  // free-form sections take their colour from their position.
  const bg = (i: number) => (i % 2 === 0 ? "bg-white" : "bg-gray-50");
  const afterSections = 2 + page.sections.length;

  return (
    <Layout>
      <Seo title={page.seoTitle} description={page.metaDescription} path={`/${page.slug}`} jsonLd={jsonLd} />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label }]}
      />

      {/* Overview + booking card */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
              <img src={page.image.src} alt={page.image.alt} width={1200} height={900} className="w-full h-64 md:h-80 object-cover" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">{page.overviewHeading}</h2>
            <ReadMore clampClass="max-h-[216px]" fade="white" label="Read the full overview">
              <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
                {page.overview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </ReadMore>
          </div>

          <div className="lg:col-span-1 order-first lg:order-none">
            <div className="lg:sticky lg:top-28 bg-primary rounded-2xl p-6 md:p-7 text-white shadow-lg">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-secondary-on-dark" />
              </div>
              <p className="text-2xl font-bold mb-2">Free quote</p>
              <p className="text-white/70 text-sm mb-5 leading-relaxed">{page.priceNote}</p>
              <button
                onClick={openBooking}
                className={cn(buttonVariants(), "w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-auto min-h-12 py-3 gap-2 mb-3 whitespace-normal")}
                data-testid={`button-${page.slug}-book`}
              >
                <CalendarCheck className="w-5 h-5 shrink-0" />
                {page.bookLabel}
              </button>
              <a
                href={site.phoneHref}
                className={cn(buttonVariants({ variant: "outline" }), "w-full border-white text-white hover:bg-white/10 hover:text-white bg-transparent font-bold h-12 gap-2")}
              >
                <Phone className="w-4 h-4" />
                {site.phoneDisplay}
              </a>
              <Link href="/sample-report" className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/80 hover:text-white">
                <FileText className="w-4 h-4" />
                See a sample report
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <Heading>{page.includesHeading}</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.includes.map((item) => (
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

      {/* Free-form sections */}
      {page.sections.map((s, i) => {
        const ItemIcon = s.itemStyle === "cross" ? X : Check;
        return (
          <section key={s.heading} className={`py-10 md:py-20 ${bg(i)}`}>
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5">{s.heading}</h2>
              <ReadMore clampClass="max-h-[260px]" fade={i % 2 === 0 ? "white" : "gray"} label="Read more">
                {s.paragraphs?.map((p) => (
                  <p key={p} className="text-base md:text-lg text-gray-600 leading-relaxed mb-5">{p}</p>
                ))}
                {s.items && (
                  <ul className="space-y-3 mb-5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-800 text-base md:text-lg leading-relaxed">
                        <ItemIcon className={`w-5 h-5 mt-1.5 shrink-0 ${s.itemStyle === "cross" ? "text-gray-400" : "text-secondary"}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.closing && <p className="text-base md:text-lg text-gray-600 leading-relaxed">{s.closing}</p>}
              </ReadMore>
            </div>
          </section>
        );
      })}

      {/* Findings */}
      <section className={`py-10 md:py-20 ${bg(afterSections)}`}>
        <div className="container mx-auto px-4 max-w-5xl">
          <Heading>{page.findingsHeading}</Heading>
          <div className="grid md:grid-cols-2 gap-5">
            {page.findings.map((f) => (
              <div
                key={f.title}
                className={`${bg(afterSections) === "bg-white" ? "bg-gray-50" : "bg-white shadow-sm"} border border-gray-100 rounded-xl p-6`}
              >
                <h3 className="font-bold text-gray-900 mb-1.5">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className={`py-10 md:py-20 ${bg(afterSections + 1)}`}>
        <div className="container mx-auto px-4 max-w-3xl">
          <Heading>Frequently Asked Questions</Heading>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {page.faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="border border-gray-200 rounded-lg px-4 bg-white shadow-sm data-[state=open]:border-primary/20 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary hover:no-underline py-4 text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTASection title={page.ctaTitle} subtitle={page.ctaSubtitle} />
    </Layout>
  );
}
