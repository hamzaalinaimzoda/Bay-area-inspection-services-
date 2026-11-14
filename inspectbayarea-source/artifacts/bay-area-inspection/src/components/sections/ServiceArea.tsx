import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin } from "lucide-react";
import { site } from "@/data/site";
import { cities } from "@/data/cities";

/**
 * Service-area section.
 *
 * The city list is read from `@/data/cities` rather than written out here. It
 * used to be a hardcoded array of 25 names that had drifted from the real data
 * and was missing San Francisco, Daly City and South San Francisco — the
 * primary market was absent from the homepage's own service-area list.
 *
 * The names are links now as well. Every city has a page that is prerendered
 * and in the sitemap, but nothing on the homepage pointed at any of them, so
 * they were reachable only from /service-areas.
 */
export function ServiceArea() {
  return (
    <section id="service-area" className="py-20 bg-white scroll-mt-20" data-testid="section-service-area">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          <motion.div
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-secondary" />
              <h2 className="text-3xl font-bold text-gray-900">Serving the Bay Area</h2>
            </div>

            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              The Bay Area is known for its older housing stock, damp coastal microclimates, and high property values. This unique combination makes thorough, expert inspections absolutely essential before any real estate transaction.
            </p>

            <p className="text-gray-600 mb-4 leading-relaxed">
              San Francisco is the primary service area, and it is the hardest housing stock in the region to inspect well. Most of the city was rebuilt quickly after 1906, on narrow attached lots, and almost every building has been altered since — often without a permit. Soft-story ground floors, dry rot driven by fog and wind-driven rain, in-law units carved out of garages, and liquefaction-zone soils are what an inspection here has to account for.
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Coverage extends across the Peninsula, South Bay and East Bay, to {cities.length} cities in total. Every inspection includes infrared thermal imaging and calibrated moisture readings, and the report is delivered the same day. We are inspection-only and perform no repairs or remediation, so there is nothing to be gained from finding a problem that is not there. Phones are answered {site.hours.replace("Mon–Sat:", "Monday to Saturday,")}.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Outside this area?</h3>
              <p className="text-gray-600 text-sm">
                We frequently travel throughout the greater Bay Area for specialized mold and home inspections. Give us a call to see if we can accommodate your property.
              </p>
              <a href={site.phoneHref} className="inline-block mt-3 text-secondary font-bold hover:underline">
                Call us: {site.phoneDisplay}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2">
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
            <p className="mt-4 text-sm text-gray-500">
              Each city has its own page covering the local housing stock and the problems that come with it.{" "}
              <Link href="/service-areas" className="text-secondary font-medium hover:underline">
                See all service areas
              </Link>
              .
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
