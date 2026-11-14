import { motion } from "framer-motion";
import { PhoneCall, CalendarCheck, ClipboardCheck, FileText } from "lucide-react";
import { site } from "@/data/site";

export function HowItWorks() {
  const steps = [
    {
      icon: <CalendarCheck className="w-8 h-8 text-secondary" />,
      title: "Book Online or Call",
      description: `Use our online booking form or call ${site.phoneDisplay}. We'll confirm your appointment within the hour and answer any questions upfront.`,
    },
    {
      icon: <PhoneCall className="w-8 h-8 text-secondary" />,
      title: "Same-Day Scheduling",
      description: "Real estate moves fast in the Bay Area. We offer same-day and next-day scheduling to keep your contingency timeline on track.",
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-secondary" />,
      title: "Thorough On-Site Inspection",
      description: "Inspections typically take 2–4 hours. We evaluate the full property using thermal imaging, moisture meters, and our builder's expertise — and walk you through our findings on-site.",
    },
    {
      icon: <FileText className="w-8 h-8 text-secondary" />,
      title: "Digital Report by End of Day",
      description: "Receive a detailed digital report with high-resolution photos, condition summaries, and repair recommendations — delivered the same day so you can act fast.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-primary text-white scroll-mt-20" data-testid="section-how-it-works">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-300">
            A streamlined process designed for the fast-paced Bay Area real estate market. From booking to report in one day.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-primary border-4 border-white/20 rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-secondary text-white font-bold rounded-full flex items-center justify-center border-4 border-primary text-sm">
                    {index + 1}
                  </div>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openBookingModal"))}
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-secondary/20"
          >
            <CalendarCheck className="w-5 h-5" />
            Book Your Inspection Now
          </button>
          <p className="mt-3 text-gray-300 text-sm">No deposit required · Confirmation within 1 hour</p>
        </div>
      </div>
    </section>
  );
}
