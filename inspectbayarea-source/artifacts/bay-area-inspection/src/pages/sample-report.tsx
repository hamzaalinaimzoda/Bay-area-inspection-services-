import { Link } from "wouter";
import { FileText, Download, Check, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";

/**
 * Sample report.
 *
 * Buyers choosing an inspector are choosing a document, and until now the site
 * described that document without ever showing it. The main SF competitor
 * leads with a sample-report page; this is the answer to it.
 *
 * Everything quoted here comes from a real issued report that the owner
 * redacted (client, address, report number and date removed). The PDF
 * served at /sample-report.pdf is that specimen with one further change: the
 * letterhead street address was removed with a true redaction, because this
 * is a service-area business and the site publishes no street address anywhere
 * (see site.ts). Findings, readings and photographs are otherwise unaltered —
 * do not "improve" the numbers below; they must match the PDF.
 */

const PDF_HREF = `${import.meta.env.BASE_URL}sample-report.pdf`;
const IMG = `${import.meta.env.BASE_URL}images/sample-report`;

const coverage = [
  { value: "119", label: "Checklist points inspected" },
  { value: "106", label: "Found without adverse condition" },
  { value: "13", label: "Findings recorded, each tied to a photo" },
  { value: "4", label: "Rated Safety or Priority — the ones to act on first" },
];

type Tier = "safety" | "priority" | "investigate" | "maintenance" | "ok";

const TIER_STYLE: Record<Tier, { label: string; pill: string }> = {
  safety: { label: "Safety", pill: "bg-red-100 text-red-800" },
  priority: { label: "Priority", pill: "bg-amber-100 text-amber-900" },
  investigate: { label: "Investigate", pill: "bg-sky-100 text-sky-900" },
  maintenance: { label: "Maintenance", pill: "bg-gray-200 text-gray-800" },
  ok: { label: "No defect", pill: "bg-green-100 text-green-800" },
};

/** Definitions as printed in the report's own findings key. */
const tiers: { tier: Tier; meaning: string; count: number }[] = [
  { tier: "safety", meaning: "Address before occupancy or use.", count: 1 },
  { tier: "priority", meaning: "Address promptly; deterioration is likely to continue.", count: 3 },
  { tier: "investigate", meaning: "A specialist must establish the facts before a repair decision.", count: 5 },
  { tier: "maintenance", meaning: "Ordinary upkeep.", count: 4 },
  { tier: "ok", meaning: "Inspected, nothing adverse found.", count: 2 },
];

/** Plate numbers and captions match the PDF. */
const plates: { n: number; tier: Tier; caption: string }[] = [
  { n: 27, tier: "safety", caption: "White mineral bloom on the foundation below the mudsill. At the same spot, a knife blade entered the mudsill with little resistance." },
  { n: 17, tier: "priority", caption: "A downspout discharging at the wall base, with the soil below scoured into a trench." },
  { n: 42, tier: "priority", caption: "The appliance drain pan, rusted across most of its base — water has stood in it repeatedly." },
  { n: 10, tier: "investigate", caption: "A crack down a porch beam carrying amber-brown staining along its full length." },
  { n: 24, tier: "investigate", caption: "17.0% with the meter's HIGH lamp lit, at a wall-to-ceiling junction." },
  { n: 35, tier: "ok", caption: "Electrical panel with the cover removed: no scorching, corrosion or water staining." },
];

const notEstablished = [
  { what: "Whether the mudsill damage is decay, insect attack, or both — and how far it extends", who: "Registered structural pest control company; structural engineer where support is affected" },
  { what: "Whether mold is present anywhere, and whether it affects air quality", who: "Accredited laboratory — no samples were taken" },
  { what: "Whether the rusted drain pan is still leaking, and whether it still works", who: "Plumber or HVAC contractor, with the appliance running" },
];

const everyReport = [
  "The findings that matter most, summarised on the first pages",
  "Every finding rated Safety, Priority, Investigate or Maintenance",
  "Photographs numbered and referenced in the text, so each claim can be checked",
  "Instrument readings, with the instrument named",
  "Next steps in order, naming the specialist to call for each",
  "A plain list of what the inspection could not determine, and who can",
  "No guessed repair costs — those come from contractors' quotes",
  "Usually delivered the same day as the inspection",
];

function TierPill({ tier }: { tier: Tier }) {
  const s = TIER_STYLE[tier];
  return (
    <span className={`inline-block text-xs font-bold uppercase tracking-wide rounded-full px-2.5 py-1 ${s.pill}`}>
      {s.label}
    </span>
  );
}

function DownloadButton({ location, className = "" }: { location: string; className?: string }) {
  return (
    <a
      href={PDF_HREF}
      target="_blank"
      rel="noopener"
      onClick={() => track("Sample Report Download", { location })}
      className={`inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-lg h-12 px-6 transition-colors ${className}`}
      data-testid={`link-sample-pdf-${location}`}
    >
      <Download className="w-5 h-5" />
      Download the sample report (PDF)
    </a>
  );
}

export default function SampleReport() {
  const url = `${site.domain}/sample-report`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
        { "@type": "ListItem", position: 2, name: "Sample Report", item: url },
      ],
    },
  ];

  return (
    <Layout>
      <Seo
        title="Sample Home Inspection Report"
        description="See a real Bay Area inspection report before you book: 21 pages, 119 checklist points, every finding rated by urgency and tied to a photo. Client and address removed."
        path="/sample-report"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="Sample Report"
        title="See a real report before you book"
        subtitle="This is a report we actually issued, with the client's name, the address, the report number and the date removed. The findings, instrument readings and photos are unchanged."
        crumbs={[{ label: "Home", href: "/" }, { label: "Sample Report" }]}
      />

      {/* Intro + download */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-5 text-lg text-gray-600 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What you're paying for is the report</h2>
            <p>
              The inspection takes a few hours. The report is what you keep — it's what you negotiate
              with, what you hand to contractors, and what you look back on a year after moving in. So
              before you choose an inspector, you should be able to read one.
            </p>
            <p>
              This sample comes from a limited-scope inspection: the client asked us to concentrate on
              the foundation, the crawl space, the exterior walls and a few systems. A full home
              inspection report uses exactly the same format and covers every major system, from the
              roof to the foundation.
            </p>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-primary text-white rounded-2xl p-7 shadow-lg">
              <FileText className="w-10 h-10 text-secondary-on-dark mb-4" />
              <h3 className="text-xl font-bold mb-2">The full sample report</h3>
              <p className="text-white/75 text-sm leading-relaxed mb-5">
                21 pages · 1.9 MB PDF · opens in your browser. Includes the findings, the recommended
                next steps and the photo record.
              </p>
              <DownloadButton location="top" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Coverage + rating tiers */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Coverage at a glance</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {coverage.map((c) => (
              <div key={c.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
                <div className="text-4xl font-bold text-primary tabular-nums mb-1">{c.value}</div>
                <div className="text-sm text-gray-600 leading-snug">{c.label}</div>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Every finding is rated by what it needs from you</h3>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
            A cracked outlet cover and soft wood at the foundation shouldn't read the same. Each
            finding carries one of these ratings, so you can see at a glance what to deal with first.
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
            {tiers.map((t) => (
              <div key={t.tier} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-5">
                <div className="sm:w-36 shrink-0"><TierPill tier={t.tier} /></div>
                <p className="flex-1 text-gray-700">{t.meaning}</p>
                <p className="text-sm text-gray-500 tabular-nums sm:w-32 sm:text-right">
                  {t.count} in this report
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo plates */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Our photos, from the property</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            Every finding points to numbered photos taken during the inspection. Here are six of the
            55 from this report.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plates.map((p) => (
              <figure key={p.n} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                <img
                  src={`${IMG}/plate-${p.n}.webp`}
                  alt={`Plate ${p.n}: ${p.caption}`}
                  width={600}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover"
                />
                <figcaption className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-gray-900">Plate {p.n}</span>
                    <TierPill tier={p.tier} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment excerpt */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Written in plain English</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Our reports open with an overall assessment that connects the findings, so you're not left
            to work out from a list of 13 items what is actually going on. From this one:
          </p>
          <blockquote className="border-l-4 border-secondary bg-white rounded-r-xl p-6 shadow-sm text-gray-800 leading-relaxed space-y-4">
            <p>
              “The findings in this report share a common thread: water is not being managed at the
              building perimeter, and conditions consistent with that appear at the foundation, in the
              sub-area and in the wood above.”
            </p>
            <p>
              “One practical consequence follows regardless of cause: drainage should be corrected
              before soil is reinstated, stucco patched or wood replaced. Repairs made while roof water
              still discharges at the base can be expected to fail in the same places.”
            </p>
          </blockquote>
        </div>
      </section>

      {/* What it does not determine */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">It tells you what it couldn't determine</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl">
            A visual inspection has limits. Rather than blur them, our reports end with a table of the
            questions it leaves open and who can answer each one. Three rows from this report:
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm md:text-base">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <tr>
                  <th scope="col" className="p-4 font-semibold">Not established</th>
                  <th scope="col" className="p-4 font-semibold">Who can establish it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {notEstablished.map((r) => (
                  <tr key={r.what}>
                    <td className="p-4 text-gray-800 align-top">{r.what}</td>
                    <td className="p-4 text-gray-600 align-top">{r.who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mold lab results, for inspections that include sampling */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mold lab results</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-3xl">
            When a mold inspection includes sampling, we take surface swabs and settle-plate air samples
            and send them to PRO-LAB, an AIHA LAP-accredited laboratory (ISO/IEC 17025). The lab
            identifies the mold types found, and we explain what they mean in your report. Here is a real
            lab report from a recent inspection, with the client's details removed.
          </p>
          <a
            href={`${import.meta.env.BASE_URL}sample-mold-lab-report.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold rounded-lg h-12 px-6 hover:bg-primary/90 transition-colors"
            data-testid="link-sample-lab-report"
          >
            View sample lab report (PDF)
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* What our reports include */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">What our reports include</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <ul className="grid sm:grid-cols-2 gap-4">
            {everyReport.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <Check className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <span className="text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <DownloadButton location="bottom" />
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:text-secondary transition-colors"
            >
              See how quotes work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Want a report like this on your home?"
        subtitle="Same-day appointments are often available, and the report arrives the same day as the inspection."
      />
    </Layout>
  );
}
