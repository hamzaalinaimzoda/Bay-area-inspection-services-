import { Droplets } from "lucide-react";
import type { Service } from "./types";
import { photos } from "@/data/photos";


export const moldInspection: Service = {
  slug: "mold-inspection",
  name: "Mold Inspection & Air Quality Assessment",
  shortName: "Mold Inspection",
  tagline: "A thermal and moisture-based mold assessment that finds the source, not just the spot on the wall.",
  icon: Droplets,
  featured: true,
  cardImage: photos.moldExpert.src,
  cardImageAlt: photos.moldExpert.alt,
  heroImage: photos.thermalMold.src,
  heroImageAlt: photos.thermalMold.alt,
  metaDescription:
    "Certified mold and moisture inspection in San Francisco and across the Bay Area. Thermal imaging, moisture mapping, and a same-day, plain-English report.",
  summary:
    "A comprehensive visual and instrument-based mold assessment — thermal imaging and calibrated moisture readings find the hidden moisture source that's actually feeding the growth.",
  overview: [
    "Mold is the Bay Area's quiet problem. Our damp coastal microclimate, aging housing stock, and slab-on-grade construction create the perfect conditions for hidden moisture — and where there's moisture, mold follows. By the time you can see or smell it, the colony is usually well established behind walls, under flooring, or in the crawl space.",
    "Our mold inspection goes far beyond a flashlight and a guess. We combine a trained visual assessment with infrared thermal imaging, calibrated moisture meters, and psychrometric readings to find both visible growth and the hidden moisture source feeding it — because treating the mold without finding the water just resets the clock.",
    "Because we're an inspection-only company, we have zero incentive to oversell remediation. Our job is to give you an honest, documented assessment — nothing more, nothing less.",
  ],
  includes: [
    { title: "Full Visual Assessment", desc: "Room-by-room inspection of all accessible areas including attics, basements, crawl spaces, and under sinks." },
    { title: "Infrared Thermal Imaging", desc: "We scan walls and ceilings for the temperature differences that reveal hidden moisture you can't see." },
    { title: "Moisture Mapping", desc: "Calibrated moisture meters pinpoint elevated readings in drywall, subfloors, and framing." },
    { title: "Humidity & Condensation Assessment", desc: "Psychrometric readings distinguish a condensation problem from an active leak — the two need completely different fixes." },
    { title: "Lab-Analysed Mold Samples", desc: "When it helps answer the question, we take surface swabs and settle-plate air samples and send them to PRO-LAB, an AIHA LAP-accredited laboratory (ISO/IEC 17025). The lab results are added to your report." },
  ],
  equipment: [
    { name: "Infrared thermal camera", purpose: "Reveals the temperature differences created by damp material behind an intact wall or ceiling, so we can find moisture without opening anything up." },
    { name: "Pin and pinless moisture meters", purpose: "Confirms and quantifies what the thermal camera suggests. Pinless readings scan broad areas; pins give a definitive reading in a specific spot." },
    { name: "Hygrometer and psychrometric readings", purpose: "Measures relative humidity and dew point, which is how we tell a condensation problem from a leak." },
    { name: "Borescope camera", purpose: "Inspects wall cavities, chases and closed framing bays through a small access hole when there is reason to look inside." },
  ],
  commonFindings: [
    { title: "Growth behind bathroom tile and under vanities", desc: "Bathrooms remodelled without upgrading ventilation are the single most common source of indoor mold I write up. The tile looks fine; the substrate behind it is not." },
    { title: "Crawl space fungal growth on joists and subfloor", desc: "Damp soil, missing or torn vapour barrier, and blocked vents produce visible growth on floor framing. Very common in older Bay Area homes at low elevation." },
    { title: "Condensation mold on exterior-wall closets", desc: "Cold exterior walls plus poor air circulation inside a closet produce surface growth on drywall and on stored contents. Frequently mistaken for a leak." },
    { title: "Window sill and frame growth from single-pane condensation", desc: "Original single-pane glazing sheds condensation onto sills all winter. The result is persistent growth at the frame and staining below it." },
    { title: "Concealed growth from historic roof or plumbing leaks", desc: "A leak that was fixed years ago often left wet insulation and framing behind it. The repair stopped the water; nothing dried the cavity." },
    { title: "Musty odor with no visible source", desc: "Sometimes the smell tells a story the eye cannot. When there's a persistent musty odor with nothing visible, there is usually a reservoir somewhere — and that is what the thermal scan and moisture mapping are for." },
  ],
  sfContext: [
    "San Francisco is a harder mold environment than most of the Bay Area, and for structural reasons rather than bad luck. The marine layer keeps exterior wood damp for long stretches, west-facing walls take wind-driven rain, and a great deal of the city's housing is attached — so a moisture problem in one building can present in the one next door.",
    "The city's housing stock compounds it. Post-1906 Edwardians were built fast, with minimal wall cavities and no vapour control, and later remodels frequently sealed those assemblies up without adding ventilation. Ground-floor rooms and in-law units carved out of garages are especially prone, because they sit close to grade in a foggy climate with little air movement.",
  ],
  whoItsFor: [
    { who: "Buyers in contract", need: "You need to know whether a musty smell or a stained ceiling is cosmetic or structural, and you need it inside a short contingency window." },
    { who: "Owners with unexplained symptoms", need: "Persistent congestion, headaches or worsening allergies at home and nowhere else. A thermal and moisture assessment establishes whether the house is contributing." },
    { who: "Sellers preparing to list", need: "Finding and documenting an issue before the buyer's inspector does keeps you in control of the negotiation." },
    { who: "Landlords and tenants in dispute", need: "Independent documentation of what is present and where, from an inspector with no stake in the outcome." },
  ],
  process: [
    { title: "Pre-Inspection Survey", desc: "We discuss the property's history — past leaks, water damage, and any odors or symptoms you've noticed." },
    { title: "On-Site Inspection", desc: "A thorough visual, thermal, and moisture assessment of every accessible area of the property." },
    { title: "Moisture Source Tracing", desc: "Wherever the thermal scan or moisture meter flags an elevated reading, we trace it back to find where the water is actually coming from." },
    { title: "Clear Report", desc: "You receive a plain-English report with findings, photos, and practical next steps — delivered the same day." },
  ],
  benefits: [
    "Find hidden moisture before it becomes a major repair",
    "Protect your family from mold-related health issues",
    "Documented findings you can use in real estate negotiations",
    "No conflict of interest — we don't sell remediation",
  ],
  priceNote:
    "A standard visual, thermal and moisture assessment. Larger properties are quoted before we book. Call for a fast, transparent quote.",
  gallery: [photos.moldExpert, photos.basementMold, photos.crawlspaceMold, photos.protectiveSuit, photos.dehumidifier, photos.remediationPlan].map((p) => ({ src: p.src, alt: p.alt })),
  faqs: [
    { q: "How long does a mold inspection take?", a: "Most residential mold inspections take 1–3 hours depending on the size of the home and how many areas need a closer look. Your report follows the same day." },
    { q: "How do you find mold that isn't visible yet?", a: "Infrared thermal imaging and calibrated moisture meters find the damp material behind an intact wall or ceiling before growth is ever visible on the surface. Mold needs moisture to establish, so tracing the moisture is how we find a problem early." },
    { q: "Can you inspect before I buy a home?", a: "Absolutely. Pre-purchase mold inspections are one of our most common requests, and we offer same-day and next-day scheduling to fit tight contingency windows." },
    { q: "Is black mold different from other mold?", a: "\"Black mold\" usually refers to Stachybotrys, but plenty of harmless moulds are dark, and appearance alone is not a reliable way to judge risk. What actually matters for your health and your home either way is the same thing: find the moisture source and stop it." },
    { q: "Do you remove the mold you find?", a: "No, and that is deliberate. We are inspection-only, so we have no financial interest in finding more of a problem than is there. You get an independent assessment you can hand to a remediation contractor." },
    { q: "Can you check after remediation to confirm it worked?", a: "Yes. We re-inspect the treated area with the thermal camera and moisture meter to confirm the underlying moisture source was actually resolved, not just the visible growth painted over." },
  ],
  relatedBlog: ["signs-of-hidden-mold", "mold-inspection-cost-bay-area"],
};
