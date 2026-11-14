import { motion } from "framer-motion";
import { ShieldCheck, Hammer, Eye, Clock, Award, HeartHandshake } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { CertificationBadges } from "@/components/CertificationBadges";
import { site } from "@/data/site";

const values = [
  { icon: Hammer, title: "A Builder's Eye", desc: "Our inspector spent years building homes. We know how they go together — and exactly where corners get cut." },
  { icon: Eye, title: "Truly Unbiased", desc: "We're inspection-only. We never sell repairs or remediation, so our findings have zero conflict of interest." },
  { icon: Clock, title: "Same-Day Reports", desc: "Detailed, photo-rich reports delivered the same day so you never lose momentum in a fast market." },
  { icon: ShieldCheck, title: "Certified & Insured", desc: "InterNACHI certified, fully covered by General Liability and E&O insurance." },
  { icon: Award, title: "Documented Findings", desc: "Thermal imaging and moisture readings for every finding — real data, not guesswork." },
  { icon: HeartHandshake, title: "Honest Guidance", desc: "Plain-English explanations and no pressure. We tell you what matters and what can wait." },
];

export default function About() {
  return (
    <Layout>
      <Seo
        title="About Bay Area Inspection Services"
        description="Bay Area Inspection Services is a certified, inspection-only home inspection company serving San Francisco and the Bay Area — founded by a former builder who finds what others miss."
        path="/about"
      />
      <PageHero
        eyebrow="Who We Are"
        title="Inspections You Can Actually Trust"
        subtitle="We're a local, certified, inspection-only company founded on a simple idea: give people honest answers about the biggest purchase of their lives."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
            <p>
              {site.legalName} was founded with one mission: bring genuine construction expertise and total honesty to home inspections across San Francisco and the Bay Area — with specialist mold and moisture testing when a property calls for it.
            </p>
            <p>
              After years in residential construction, our founder saw the same thing again and again — inspections that skimmed the surface and missed the problems that actually cost homeowners money. Hidden moisture. Quiet gas leaks. Water damage painted over instead of repaired. The issues that don't show up until it's too late.
            </p>
            <p>
              So we built a different kind of inspection company. We use a builder's knowledge of how homes are really constructed, modern tools like infrared thermal imaging and calibrated moisture meters, and a strict inspection-only policy that means we have nothing to sell you but the truth.
            </p>
            <p>
              Today we serve homeowners, buyers, and sellers across the Peninsula, South Bay, and East Bay — with same-day reports and the kind of straight talk that helps people make confident decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">What Sets Us Apart</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <p className="text-secondary font-semibold uppercase tracking-wide text-sm mb-2">Certifications & Coverage</p>
          <p className="text-xl md:text-2xl font-bold">{site.certifications}</p>
          {/* The seals sit here rather than only in the footer: this is the page
              where someone is actually evaluating whether to trust the
              inspector, and the badges link straight to InterNACHI's record. */}
          <CertificationBadges
            size={96}
            tone="dark"
            className="mt-8 flex flex-col items-center"
            caption={`Member ${site.nachiId} — click either seal to verify with InterNACHI directly.`}
          />
        </div>
      </section>

      <GoogleReviews />

      <CTASection />
    </Layout>
  );
}
