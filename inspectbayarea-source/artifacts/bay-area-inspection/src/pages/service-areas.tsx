import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { serviceAreaRegions } from "@/data/serviceAreas";
import { cities, getCitiesByRegion } from "@/data/cities";
import { site } from "@/data/site";

export default function ServiceAreas() {
  return (
    <Layout>
      <Seo
        title="Service Areas — San Francisco & Bay Area Home Inspection"
        description="San Francisco home and mold inspection, plus 27 more cities across Daly City, the Peninsula, South Bay and East Bay. Same-day reports on every inspection."
        path="/service-areas"
      />
      <PageHero
        eyebrow="Where We Work"
        title="San Francisco & the Bay Area"
        subtitle="San Francisco is our primary service area — every neighborhood, from the Sunset and Richmond to Noe Valley, the Mission and SOMA. We also cover Daly City, the Peninsula, South Bay and East Bay. Don't see yours? Give us a call — we travel."
        crumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]}
      />

      {/* Intro */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-5">San Francisco First, Bay Area Wide</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            San Francisco has the hardest housing stock in the region to inspect well — post-1906 Edwardians, soft-story garages beneath living space, fog-driven dry rot, and in-law units that were never permitted. That is where most of my work is, and it is what I know best. Beyond the city, the same builder's-eye expertise and same-day reporting apply across Daly City, the Peninsula, South Bay and East Bay.
          </p>
        </div>
      </section>

      {/* Regions */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceAreaRegions.map((region, i) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-6 h-6 text-secondary" />
                  <h3 className="text-xl font-bold text-gray-900">{region.name}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 text-sm">{region.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {getCitiesByRegion(region.name).map((city) => (
                    <Link
                      key={city.slug}
                      href={`/service-areas/${city.slug}`}
                      className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-secondary hover:text-secondary hover:bg-orange-50 transition-colors"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All cities */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Every City We Serve</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-10" />
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 -mt-6">
            Each city has its own page covering local housing stock, the findings that come up most
            often there, and the neighborhoods I cover.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-secondary hover:text-secondary hover:bg-orange-50 transition-colors shadow-sm"
              >
                {city.name}
              </Link>
            ))}
          </div>
          <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-100 max-w-2xl mx-auto">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Outside this area?</h3>
            <p className="text-gray-600 mb-4">
              We frequently travel throughout the greater Bay Area for specialized mold and home inspections. Give us a call to see if we can accommodate your property.
            </p>
            <a href={site.phoneHref} className="inline-flex items-center gap-2 text-secondary font-bold hover:underline text-lg">
              <Phone className="w-5 h-5" /> {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
