import { motion } from "framer-motion";
import { Link } from "wouter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { services as allServices } from "@/data/services";


/**
 * Order, titles, blurbs, photos and which cards are featured all come from
 * `data/services`, so this section cannot drift out of step with the navbar,
 * footer, services index and city pages the way it previously did.
 */
export function Services() {
  const services = allServices.map((s) => {
    const Icon = s.icon;
    return {
      title: s.name,
      slug: s.slug,
      icon: <Icon className={`w-10 h-10 ${s.featured ? "text-secondary" : "text-primary"}`} />,
      description: s.tagline,
      photo: s.cardImage,
      photoAlt: s.cardImageAlt,
      featured: s.featured,
    };
  });

  return (
    <section id="services" className="py-20 bg-gray-50 scroll-mt-20" data-testid="section-services">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Professional Inspection Services</h2>
          <p className="text-lg text-gray-600">
            Comprehensive, detail-oriented inspections for every property — and a firm quote for your property before you book.
          </p>
        </div>

        {/* Featured Services (Top 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {services.filter(s => s.featured).map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full flex flex-col border-t-4 border-t-secondary hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                {/* Card photo */}
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src={service.photo}
                    alt={service.photoAlt}
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <CardHeader>
                  <div className="mb-4 bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl md:text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base mt-2">{service.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    href={`/services/${service.slug}`}
                    className={cn(buttonVariants(), "w-full bg-primary hover:bg-primary/90 text-white font-semibold")}
                  >
                    Learn More<span className="sr-only"> about {service.title}</span>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Secondary services — sized for however many aren't featured, rather
            than hardcoded to 2, now that the two San Francisco compliance
            services (sewer lateral, 3R report) sit alongside moisture and the
            bundle. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.filter(s => !s.featured).map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300 bg-white overflow-hidden">
                {/* Card photo */}
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  <img
                    src={service.photo}
                    alt={service.photoAlt}
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex items-center justify-end pt-4 border-t border-gray-100">
                  <Link
                    href={`/services/${service.slug}`}
                    className={cn(buttonVariants({ variant: "outline" }), "font-semibold text-primary border-primary hover:bg-primary/5")}
                  >
                    Learn More<span className="sr-only"> about {service.title}</span>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
