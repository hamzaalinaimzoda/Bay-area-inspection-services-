import { Search } from "lucide-react";
import type { Service } from "./types";
import { photos } from "@/data/photos";


export const moistureWaterDamage: Service = {
  slug: "moisture-water-damage",
  name: "Moisture & Water Damage Inspection",
  shortName: "Moisture & Water Damage",
  tagline: "Infrared thermal imaging that locates hidden water intrusion before it becomes mold.",
  icon: Search,
  featured: false,
  cardImage: photos.thermalMold.src,
  cardImageAlt: photos.thermalMold.alt,
  heroImage: photos.bathroomLeak.src,
  heroImageAlt: photos.bathroomLeak.alt,
  metaDescription:
    "Moisture and water damage inspection in San Francisco and the Bay Area using infrared thermal imaging and moisture meters. Catch hidden leaks before mold and rot.",
  summary:
    "Infrared thermal imaging and moisture metering that reveal hidden leaks, intrusion, and damp areas long before they turn into mold or rot.",
  overview: [
    "Water is the number one enemy of any home. A small, slow leak behind a wall or under a floor can cause thousands of dollars in damage — and breed mold — long before anyone notices a stain.",
    "Our moisture and water damage inspection uses infrared thermal imaging to see the temperature differences that betray hidden moisture, combined with calibrated meters that confirm exactly how wet an area is.",
    "Whether you're chasing a mystery leak, evaluating past water damage, or just want peace of mind before buying, we'll map the moisture, identify likely sources, and give you a clear picture of the risk.",
  ],
  includes: [
    { title: "Infrared Thermal Scan", desc: "Non-invasive imaging of walls, ceilings, and floors to reveal hidden damp areas." },
    { title: "Moisture Metering", desc: "Calibrated meters confirm and quantify elevated moisture in building materials." },
    { title: "Leak Source Tracing", desc: "We work to identify the likely source — roof, plumbing, windows, or grading." },
    { title: "Past-Damage Evaluation", desc: "Assessment of previous water damage and whether it was properly addressed." },
    { title: "Crawl Space & Attic Check", desc: "The hidden spaces where moisture problems most often begin." },
    { title: "Clear Documentation", desc: "Thermal images and readings that show exactly what we found and where." },
  ],
  equipment: [
    { name: "Infrared thermal camera", purpose: "Evaporating moisture cools a surface, so damp material reads colder than its surroundings. This is what lets us survey an entire wall in seconds without touching it." },
    { name: "Pinless moisture meter", purpose: "Scans broad areas non-destructively, reading moisture up to about an inch into the material without leaving a mark on finished surfaces." },
    { name: "Pin-type moisture meter", purpose: "Gives a definitive reading at a specific point and, with extended probes, at depth inside framing." },
    { name: "Hygrometer and dew point calculation", purpose: "Distinguishes a condensation problem from a leak. Those need completely different fixes, and confusing them wastes money." },
    { name: "Borescope camera", purpose: "Looks inside a wall cavity through a small hole when the readings justify confirming what is in there." },
    { name: "Manometer and drainage tracing", purpose: "Helps establish whether water is arriving from plumbing, from the exterior envelope, or from ground water at the foundation." },
  ],
  commonFindings: [
    { title: "Shower pan and surround leaks", desc: "A failing pan or unsealed surround leaks into the framing below, often showing first on the ceiling of the room underneath rather than in the bathroom itself." },
    { title: "Window and door flashing failures", desc: "Water entering at a window head runs down inside the wall and appears well below the actual entry point. Thermal imaging shows the full path rather than just the stain." },
    { title: "Historic damage that was never dried", desc: "A leak repaired years ago frequently left saturated insulation and framing behind the finish. The water stopped; the moisture did not leave." },
    { title: "Slab moisture transmission", desc: "On slab-on-grade homes over damp soil, moisture migrates up through the slab and shows as flooring failure and baseboard damage with no leak anywhere." },
    { title: "Crawl space ground moisture", desc: "Bare soil, torn vapour barrier and blocked vents keep framing damp year-round. The most common root cause we find in low-lying Bay Area cities." },
    { title: "Condensation misdiagnosed as a leak", desc: "Cold surfaces plus humid indoor air produce wet walls that look exactly like a leak. Getting this right is the difference between adding ventilation and opening a wall for nothing." },
  ],
  sfContext: [
    "San Francisco's climate creates moisture problems that inland cities simply do not have. The marine layer keeps humidity high and surfaces damp for extended periods, so exterior wood dries slowly and stays vulnerable. Wind-driven rain off the Pacific pushes water into wall assemblies horizontally, which is why west and southwest-facing elevations weather so much faster than the rest of a building.",
    "The city's construction amplifies it. Light wells, bay windows and the junctions between attached buildings are all places where water collects and dries slowly — and they are precisely where dry rot concentrates in San Francisco housing. Thermal imaging matters more here than almost anywhere, because so much of the damage is inside an assembly that looks intact from the outside.",
  ],
  whoItsFor: [
    { who: "Owners chasing a mystery leak", need: "You have a stain, a smell or a bill that does not add up, and you need the source found before anyone starts opening walls." },
    { who: "Buyers evaluating disclosed damage", need: "The seller disclosed a past leak. The question is whether it was genuinely fixed and dried, or merely covered." },
    { who: "Anyone before a remodel", need: "Finding moisture before new finishes go on is far cheaper than finding it after." },
    { who: "Owners with recurring mold", need: "Mould that keeps returning after cleaning means the moisture source was never addressed. This finds it." },
  ],
  process: [
    { title: "Discuss Concerns", desc: "Tell us what you've noticed — stains, smells, past leaks, or high bills." },
    { title: "Thermal & Moisture Scan", desc: "We scan suspect areas and confirm readings with calibrated meters." },
    { title: "Trace the Source", desc: "We work to identify where the water is coming from, not just where it ended up." },
    { title: "Report", desc: "A documented report with thermal images, readings, and recommended next steps." },
  ],
  benefits: [
    "Catch leaks before they become mold or rot",
    "Non-invasive — no cutting into walls to find moisture",
    "Confirm whether past water damage was truly fixed",
    "Documented evidence for repairs or negotiations",
  ],
  priceNote:
    "Available as a standalone visit, or added to a mold or full home inspection at a reduced rate. Call for a quote.",
  gallery: [photos.thermalMold, photos.bathroomLeak, photos.windowCondensation, photos.dehumidifier, photos.crawlspaceMold, photos.carpetMold].map((p) => ({ src: p.src, alt: p.alt })),
  faqs: [
    { q: "Is thermal imaging the same as an X-ray?", a: "No. Thermal imaging detects surface temperature differences that often indicate moisture behind a surface. It's a powerful, non-invasive clue — we confirm with moisture meters rather than cutting into walls." },
    { q: "Can you find the source of a leak?", a: "In most cases, yes. We trace patterns of moisture back toward likely sources like roofing, plumbing, windows, or poor drainage so repairs can target the real problem." },
    { q: "Should I get this with a mold inspection?", a: "They pair perfectly. Moisture is what feeds mold, so combining the two gives you both the cause and the effect in a single visit — often at a bundled rate." },
    { q: "Will thermal imaging find moisture through any wall?", a: "Not always, and it is worth being honest about the limits. Thermal imaging reads surface temperature, so it works best where there is a temperature difference to see. Very well-insulated assemblies, tile over mortar beds, and surfaces in direct sun can all mask a wet area — which is why readings are always confirmed with a moisture meter rather than trusted on their own." },
    { q: "Do I need to prepare the house?", a: "A little helps. Avoid running showers or laundry for a few hours beforehand, and keep the heating in its normal state rather than turning it off — a stable temperature difference between inside and outside makes the imaging considerably more revealing." },
    { q: "Can you tell how long the water has been there?", a: "Not precisely, but the evidence usually indicates whether it is active or historic. Current elevated readings mean water is arriving now; staining with dry readings and no ongoing source suggests a past event. That distinction is normally what actually matters for a decision." },
    { q: "What if you find moisture but no obvious source?", a: "That happens, and it is a legitimate result rather than a failure. Sometimes the source is intermittent — it only leaks in wind-driven rain, or when a particular fixture is used. We report what we measured, describe the likely mechanisms, and tell you what to observe or test next rather than inventing a cause." },
  ],
  relatedBlog: ["signs-of-hidden-mold", "what-inspectors-find-bay-area-homes"],
};
