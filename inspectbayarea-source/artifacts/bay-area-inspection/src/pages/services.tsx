import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { services } from "@/data/services";

export default function Services() {
  return (
    <Layout>
      <Seo
        title="Home & Mold Inspection Services in the Bay Area"
        description="Mold inspection, full home inspection, gas leak detection, moisture testing, and combined bundles across the Bay Area. Certified, unbiased, same-day reports."
        path="/services"
      />
      <PageHero
        eyebrow="What We Do"
        title="Bay Area Home & Mold Inspection Services"
        subtitle="Certified, unbiased inspections by a former builder — with infrared imaging, moisture testing, and same-day reports. Choose the service that fits your property."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                  data-testid={`card-service-${service.slug}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.cardImage}
                      alt={service.cardImageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <service.icon className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {service.shortName}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{service.summary}</p>
                    <ul className="space-y-2 mb-5">
                      {service.benefits.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
