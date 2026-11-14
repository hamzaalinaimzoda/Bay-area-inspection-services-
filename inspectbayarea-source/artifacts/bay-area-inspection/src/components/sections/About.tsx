import { motion } from "framer-motion";
import { Quote, ShieldCheck } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 scroll-mt-20" data-testid="section-about">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary to-[#0a1928]">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <ShieldCheck className="w-16 h-16 text-secondary mb-6" />
                <p className="text-3xl font-bold text-white leading-tight mb-3">
                  Built by a Contractor.<br />Trusted by Homeowners.
                </p>
                <p className="text-gray-300 text-base max-w-xs">
                  Hands-on building experience behind every inspection across the Bay Area.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <p className="text-white font-bold text-xl">Lead Inspector</p>
                <p className="text-gray-300">Former Remodeling Contractor</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">From Building Homes to Inspecting Them</h2>
            
            <div className="space-y-4 text-lg text-gray-600 mb-8">
              <p>
                For over 5 years, I ran a successful kitchen and bath remodeling company here in the Bay Area. I tore down drywall, replaced rotting subfloors, and fixed the hidden nightmares that previous contractors left behind.
              </p>
              <p>
                Now, I apply that hands-on builder's knowledge to full home inspections across San Francisco and the Bay Area. I specialize in catching the hidden water damage and structural issues that textbook-trained inspectors often miss — and when a property needs it, I test for mold and moisture myself rather than sending you elsewhere.
              </p>
              <p>
                When you hire Bay Area Inspection Services, you aren't just getting a checklist. You're getting the trained eye of someone who knows exactly how these houses were built—and exactly how they fail.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative mb-8">
              <Quote className="absolute top-4 left-4 w-8 h-8 text-gray-200 rotate-180" />
              <p className="text-xl italic font-serif text-gray-800 relative z-10 pl-10 pr-4">
                Most inspectors read checklists. I've opened these walls.
              </p>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 inline-block text-sm font-medium text-primary">
              Bay Area Inspection Services LLC | CA LLC #B20260264730 (Filed June 2026)
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
