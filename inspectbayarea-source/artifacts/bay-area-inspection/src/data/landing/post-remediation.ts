import { photos } from "@/data/photos";
import type { LandingPage } from "./types";

// A mold re-inspection after someone else's remediation. Booked as a mold
// inspection. The page's whole argument is independence, so it must never
// imply a formal clearance protocol or any health assurance the site doesn't
// already make — it confirms the moisture source, as the mold FAQ says.

export const postRemediation: LandingPage = {
  slug: "post-remediation-mold-inspection",
  name: "Post-Remediation Mold Inspection",
  seoTitle: "Post-Remediation Mold Inspection — Bay Area",
  metaDescription: `Check that mold remediation worked, from an inspector who didn't do it. Thermal imaging, moisture readings and lab samples when needed. Same-day report.`,
  summary: `An independent re-inspection after mold remediation, to confirm the moisture source was fixed rather than the growth covered over.`,
  eyebrow: "Post-Remediation Inspection",
  heroTitle: "Check the remediation with someone who didn't do it",
  heroSubtitle:
    "After mold remediation, we re-inspect the treated area with a thermal camera and moisture meters to confirm the moisture source was actually resolved — not just the visible growth removed or painted over.",
  image: photos.remediationPlan,
  overviewHeading: "Why the check should be independent",
  overview: [
    "Remediation removes growth. Whether it lasts depends on whether the moisture that fed it has stopped. A repair can stop the water without drying what's behind the finish, and a wall can look done while the cavity behind it is still wet.",
    "We are inspection-only. We don't do remediation, so we have no stake in whether the work passes or needs another round. You get an independent assessment you can hand back to the contractor.",
    "The report records what we measured and where, with photos, and you have it the same day.",
  ],
  priceNote: "A visual, thermal and moisture assessment of the treated area, quoted before we book. Call for a fast, transparent quote.",
  bookingServiceId: "mold-inspection",
  bookLabel: "Book a Post-Remediation Check",
  includesHeading: "What the inspection covers",
  includes: [
    { title: "Thermal imaging", desc: "Reveals the temperature differences damp material creates behind an intact wall or ceiling, without opening anything up." },
    { title: "Moisture readings", desc: "Pin and pinless meters confirm and quantify what the thermal camera suggests." },
    { title: "Humidity and dew point", desc: "Psychrometric readings tell a condensation problem from a leak — the question that decides whether growth comes back." },
    { title: "Lab samples when they help", desc: "Surface swabs and settle-plate air samples, analysed by PRO-LAB, an AIHA LAP-accredited laboratory. The results are added to your report." },
    { title: "Same-day report", desc: "Plain English, with photos and readings, delivered the same day." },
    { title: "No stake in the outcome", desc: "We don't do remediation, so whether the work passes means nothing to us financially." },
  ],
  sections: [
    {
      heading: "When to book it",
      items: [
        "After the contractor says the work is done, and before walls or finishes go back over the treated area.",
        "Before you sell or rent out a property where remediation was part of its history.",
        "When the musty smell that started it all hasn't gone away.",
      ],
    },
    {
      heading: "What we don't do",
      items: [
        "Remediation or repairs of any kind.",
        "Open walls. Thermal imaging and moisture meters work through intact surfaces.",
        "Medical advice. We report moisture and growth; questions about health belong with your doctor.",
      ],
      itemStyle: "cross",
    },
  ],
  findingsHeading: "What a post-remediation check can turn up",
  findings: [
    { title: "A source that's still active", desc: "The growth was removed but the leak or condensation feeding it continues. Current elevated readings mean water is arriving now." },
    { title: "Wet material left in the cavity", desc: "A repair can stop the water without drying what's behind the finish. Thermal imaging shows where it's still damp." },
    { title: "Condensation rather than a leak", desc: "Cold exterior walls and poor air movement — common in closets — grow mold with no leak at all. Humidity and dew point readings tell them apart." },
    { title: "Moisture outside the treated area", desc: "Where a reading is elevated, we trace it back to where the water is coming from — which isn't always inside the area that was treated." },
  ],
  faqs: [
    {
      q: "Can you confirm the remediation worked?",
      a: "Yes. We re-inspect the treated area with the thermal camera and moisture meter to confirm the underlying moisture source was actually resolved, not just the visible growth painted over.",
    },
    {
      q: "Do you do remediation?",
      a: "No, and that is deliberate. We are inspection-only, so we have no financial interest in finding more of a problem than is there. You get an independent assessment you can hand to a remediation contractor.",
    },
    {
      q: "Do you take samples for a lab?",
      a: "When it helps answer the question. We take surface swabs and settle-plate air samples and send them to PRO-LAB, an AIHA LAP-accredited laboratory, and the results are added to your report.",
    },
    {
      q: "Can you tell whether water is still getting in?",
      a: "Usually. Current elevated readings mean water is arriving now; staining with dry readings and no ongoing source suggests a past event.",
    },
    {
      q: "How long does it take?",
      a: "A mold inspection typically takes 1–3 hours, depending on the size of the home and how many areas need a closer look. The report follows the same day.",
    },
    {
      q: "Will the home be safe afterwards?",
      a: "We can tell you where moisture and growth are, and whether the source has been resolved. We don't make medical determinations — for questions about health, talk to your doctor.",
    },
  ],
  ctaTitle: "Remediation finished?",
  ctaSubtitle: "Book an independent check before the walls close up or the job is signed off.",
};
