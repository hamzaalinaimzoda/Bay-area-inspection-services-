import { Link } from "wouter";
import { Check, MapPin, Phone, CalendarCheck, ArrowRight, Home as HomeIcon } from "lucide-react";
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
import { cities, getCity, getNearbyCities } from "@/data/cities";
import { services } from "@/data/services";
import { servicesForCity } from "@/data/city-service";
import { site } from "@/data/site";
import { getImage } from "@/data/images";
import { cityImageIds } from "@/data/cityImages";
import { availableImageIds } from "@/data/imageManifest";

const openBooking = () => window.dispatchEvent(new CustomEvent("openBookingModal"));

// Responsive derivatives for the photos used on Newark and Woodside. Other
// cities sharing these photos benefit too; originals remain available at 1200w.
const responsiveImageIds = new Set([
  "thermal-camera-wall", "electrical-panel", "crawlspace-inspection",
  "foundation-crack", "mold-drywall", "attic-insulation-ventilation",
  "air-quality-sampling",
]);

export default function CityDetail({ slug }: { slug: string }) {
  const city = getCity(slug);

  if (!city) {
    return (
      <Layout>
        <Seo title="Area Not Found" description="The requested service area could not be found." />
        <div className="container mx-auto px-4 max-w-3xl py-32 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Area Not Found</h1>
          <p className="text-gray-600 mb-8">
            We couldn't find that service area. Browse the full list of cities we cover instead.
          </p>
          <Link href="/service-areas" className={cn(buttonVariants(), "bg-primary text-white")}>
            View All Service Areas
          </Link>
        </div>
      </Layout>
    );
  }

  const nearby = getNearbyCities(city);
  /** Services with enough city-specific findings to have earned their own page here. */
  const localServices = servicesForCity(city.slug);
  const cityUrl = `${site.domain}/service-areas/${city.slug}`;

  // Only render photos that have actually been licensed and dropped into
  // public/images/library/ — see sync-image-library.mjs.
  const gallery = (cityImageIds[city.slug] ?? [])
    .filter((id) => availableImageIds.includes(id))
    .map((id) => getImage(id))
    .filter((img): img is NonNullable<typeof img> => Boolean(img));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      name: `${site.name} — ${city.name}`,
      url: cityUrl,
      telephone: site.phoneHref.replace("tel:", "+1"),
      description: city.metaDescription,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mountain View",
        addressRegion: "CA",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "City",
        name: city.name,
        containedInPlace: { "@type": "AdministrativeArea", name: city.county },
      },
      knowsAbout: city.commonIssues.map((i) => i.title),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: city.faqs.map((f) => ({
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
        { "@type": "ListItem", position: 2, name: "Service Areas", item: `${site.domain}/service-areas` },
        { "@type": "ListItem", position: 3, name: city.name, item: cityUrl },
      ],
    },
  ];

  return (
    <Layout>
      <Seo
        title={`${city.metaTitle} | ${site.name}`}
        description={city.metaDescription}
        path={`/service-areas/${city.slug}`}
        jsonLd={jsonLd}
      />

      <PageHero
        eyebrow={city.region}
        title={`Home & Mold Inspection in ${city.name}`}
        subtitle={city.heroSubtitle}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas" },
          { label: city.name },
        ]}
      />

      {/* Intro */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-secondary mb-4">
                <MapPin className="w-4 h-4" />
                <span>
                  {city.name}, {city.county}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Inspecting {city.name} homes
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                {city.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Local note</h3>
                <p className="text-gray-700 leading-relaxed">{city.localNote}</p>
              </div>
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:sticky lg:top-28">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Booking in {city.name}?
                </h3>
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  Same-day reports, thermal imaging included as standard, and a former builder doing
                  the inspection — not a rotating junior inspector.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={openBooking}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-secondary hover:bg-secondary/90 text-white font-bold gap-2 w-full",
                    )}
                    data-testid="button-city-book"
                  >
                    <CalendarCheck className="w-5 h-5" />
                    Book Online
                  </button>
                  <a
                    href={site.phoneHref}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "border-primary text-primary font-bold gap-2 w-full",
                    )}
                    data-testid="link-city-call"
                  >
                    <Phone className="w-4 h-4" />
                    {site.phoneDisplay}
                  </a>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    Same-day report
                  </li>
                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    InterNACHI certified
                  </li>
                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    Thermal imaging included
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Housing stock */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {city.name} housing stock
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mb-10 leading-relaxed">
            {city.housingStock.summary}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {city.housingStock.eras.map((era) => (
              <div key={era.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-3">
                  <HomeIcon className="w-5 h-5 text-secondary shrink-0" />
                  <h3 className="font-bold text-gray-900 leading-snug">{era.label}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{era.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common issues */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            What I look for in {city.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mb-10 leading-relaxed">
            These findings come up disproportionately often in {city.name}, so they get specific
            attention rather than a generic checklist entry.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {city.commonIssues.map((issue) => (
              <div
                key={issue.title}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1.5">{issue.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{issue.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery — hidden entirely until images are licensed */}
      {gallery.length > 0 && (
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {city.name} homes and what I find in them
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mb-10 leading-relaxed">
              The housing types you'll see around {city.name}, and the conditions that come up most
              often when I inspect them.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {gallery.map((img) => (
                <figure
                  key={img.id}
                  className="overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-white"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/library/${img.id}.webp`}
                    srcSet={responsiveImageIds.has(img.id)
                      ? `${import.meta.env.BASE_URL}images/city-thumbnails/${img.id}-480.webp 480w, ${import.meta.env.BASE_URL}images/city-thumbnails/${img.id}-800.webp 800w, ${import.meta.env.BASE_URL}images/library/${img.id}.webp 1200w`
                      : undefined}
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, calc(100vw - 32px)"
                    alt={`${img.alt} — ${city.name}, CA`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-56 object-cover"
                  />
                  <figcaption className="px-4 py-3 text-sm text-gray-600 leading-snug">
                    {img.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Neighborhoods */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Neighborhoods I serve in {city.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mb-8 leading-relaxed">
            Coverage across {city.name} and the surrounding area — if your neighborhood isn't listed,
            call and ask.
          </p>
          <div className="flex flex-wrap gap-2">
            {city.neighborhoods.map((n) => (
              <span
                key={n}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Inspection services in {city.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mb-10 leading-relaxed">
            Every service below is available throughout {city.name}, with same-day reporting.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              // Where this city has enough of its own findings for this
              // service, link to the city-specific page rather than the
              // generic one — the heading already promises "in {city}".
              const local = localServices.find((p) => p.serviceSlug === s.slug);
              return (
                <Link
                  key={s.slug}
                  href={local ? `/service-areas/${city.slug}/${s.slug}` : `/services/${s.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <Icon className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors">
                    {s.shortName} in {city.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{s.tagline}</p>
                  <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                    {local ? `${local.issues.length} local findings` : "Learn more"}{" "}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            {city.name} inspection questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {city.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-gray-900">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Nearby cities */}
      {nearby.length > 0 && (
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Also serving near {city.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/service-areas/${n.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-secondary shrink-0" />
                    <h3 className="font-bold text-gray-900 group-hover:text-secondary transition-colors">
                      {n.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">{n.region}</p>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/service-areas"
                className="text-primary font-semibold inline-flex items-center gap-1 hover:text-secondary transition-colors"
              >
                View all {cities.length} cities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </Layout>
  );
}
