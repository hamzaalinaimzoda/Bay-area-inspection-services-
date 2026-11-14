import { motion } from "framer-motion";
import { Hammer, Scale, Zap, ShieldCheck } from "lucide-react";

export function WhyChooseUs() {
  const reasons = [
    {
      icon: <Hammer className="w-8 h-8 text-white" />,
      title: "Builder's Background",
      description: "I don't just read inspection manuals. I spent 5+ years building and remodeling kitchens and baths. I know exactly where contractors cut corners and where water hides."
    },
    {
      icon: <Scale className="w-8 h-8 text-white" />,
      title: "Inspection-Only",
      description: "No conflict of interest. We don't do repairs, remediation, or remodeling. Our only job is to give you an honest, unbiased assessment of the property."
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Same-Day Reports",
      description: "In the Bay Area real estate market, hours matter. We deliver comprehensive, easy-to-read reports with high-resolution photos the same day as your inspection."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      title: "Certified & Insured",
      description: "InterNACHI certified. Fully covered by General Liability and Errors & Omissions insurance. Your investment is protected when we're on the job."
    }
  ];

  return (
    <section className="py-20 bg-white" data-testid="section-why-choose-us">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Bay Area Inspection Services</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-6 shadow-lg shadow-primary/20">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
