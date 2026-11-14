import { Layers } from "lucide-react";
import type { Service } from "./types";
import { photos } from "@/data/photos";


export const homeMoldBundle: Service = {
  slug: "home-mold-bundle",
  name: "Combined Home + Mold Bundle",
  shortName: "Home + Mold Bundle",
  tagline: "Total peace of mind — our two most-requested inspections in one discounted visit.",
  icon: Layers,
  featured: false,
  cardImage: photos.labReport.src,
  cardImageAlt: photos.labReport.alt,
  heroImage: photos.moldExpert.src,
  heroImageAlt: photos.moldExpert.alt,
  metaDescription:
    "Bundle a full home inspection with a mold and moisture assessment in San Francisco and the Bay Area and save. One visit, one report, same-day scheduling.",
  summary:
    "Our full home inspection combined with a mold and moisture assessment — the most complete picture of a property, in a single discounted visit.",
  overview: [
    "When you want the most thorough due diligence possible, the Home + Mold Bundle is the answer. You get our complete full home inspection plus a full mold and moisture assessment — covering both the visible structure and the hidden moisture that drives mold.",
    "Bundling makes sense for two reasons. First, it saves you money compared to booking the services separately. Second, the two inspections inform each other: the moisture we find during the home inspection guides exactly where the thermal camera and moisture meters focus during the mold assessment, giving you a sharper, more complete result.",
    "It's the package we recommend for older homes, properties with any history of water issues, and anyone who simply wants total confidence before buying.",
  ],
  includes: [
    { title: "Complete Home Inspection", desc: "Our full roof-to-foundation evaluation of structure and all major systems." },
    { title: "Mold & Moisture Assessment", desc: "Visual assessment, thermal imaging, and moisture mapping across the property." },
    { title: "Infrared Throughout", desc: "Thermal imaging used across the inspection to find hidden moisture early." },
    { title: "Unified Report", desc: "One clear, comprehensive report covering both inspections." },
    { title: "Bundle Savings", desc: "A discounted rate versus booking the two services separately." },
    { title: "Same-Day Turnaround", desc: "Your full report — both halves — the same day." },
  ],
  equipment: [
    { name: "Infrared thermal camera", purpose: "Used across the whole property rather than only at suspect areas, so moisture found structurally directs where the mold assessment focuses." },
    { name: "Pin and pinless moisture meters", purpose: "Quantifies every elevated area the thermal scan identifies, in both the structural and the mold half of the inspection." },
    { name: "Hygrometer and psychrometric readings", purpose: "Distinguishes a condensation problem from an active leak, in whichever part of the property it shows up." },
    { name: "Combustible-gas detector and CO meter", purpose: "Appliance connections, venting and ambient carbon monoxide are covered as part of the structural inspection." },
    { name: "Electrical test instruments and borescope", purpose: "Receptacle and GFCI testing throughout, with a borescope for flues, cavities and closed framing bays." },
  ],
  commonFindings: [
    { title: "A structural defect that explains the mold", desc: "The real value of combining them. Failed flashing or a plumbing leak found during the home inspection tells us exactly where to point the thermal camera, instead of guessing from a smell." },
    { title: "Crawl space problems on both counts", desc: "A damp crawl space is simultaneously a structural finding (rot, corrosion, insulation damage) and a mold finding (growth on joists, spores entering the living space)." },
    { title: "Bathroom remodels done without ventilation", desc: "Shows up structurally as substrate damage and biologically as growth behind tile. One visit catches both sides of the same mistake." },
    { title: "Historic water damage that was covered rather than fixed", desc: "Disclosed damage that was cosmetically repaired but never dried. The structural inspection finds the repair; the thermal scan shows what's still damp behind it." },
    { title: "Ventilation and envelope faults driving humidity", desc: "Missing exhaust fans, blocked soffit vents and single-pane condensation are structural findings with direct biological consequences." },
    { title: "Deferred maintenance stacking up", desc: "On older homes the two inspections together give you a full picture and, more usefully, a sequence — what is urgent, what to budget for, what can wait." },
  ],
  sfContext: [
    "The bundle is the package that makes most sense for San Francisco specifically. The city's housing is old, damp, largely attached, and heavily altered — which means structural problems and moisture problems are usually the same problem viewed from two angles. Dry rot at a light well is a structural finding and a mold source at once.",
    "It also fits how the city's transactions run. Contingency windows are short and access to a property is often limited to a single visit, so getting the structural inspection and the mold assessment done in one appointment is frequently the only practical option — and the structural findings sharpen where the thermal scan focuses.",
  ],
  whoItsFor: [
    { who: "Buyers of pre-1940 housing", need: "Older homes carry both structural age and moisture history. Splitting the two inspections means each one misses half the picture." },
    { who: "Anyone with limited property access", need: "One visit covers both, which matters when the seller is only granting a single inspection window." },
    { who: "Buyers of homes with disclosed water damage", need: "Establishing whether the repair was real requires structural assessment and a thermal/moisture check together." },
    { who: "Owners planning to stay long-term", need: "A complete baseline of the property's condition, prioritised into what needs doing now and what can be scheduled." },
  ],
  process: [
    { title: "Schedule One Visit", desc: "Book the bundle and we handle both inspections in a single appointment." },
    { title: "Full Home Inspection", desc: "A complete evaluation of the property's structure and systems." },
    { title: "Mold & Moisture Assessment", desc: "Thermal and moisture-meter assessment targeted by what the home inspection reveals." },
    { title: "Combined Report", desc: "A single, unified report with all findings and photos, delivered the same day." },
  ],
  benefits: [
    "The most complete due diligence available",
    "Save versus booking services separately",
    "One visit, one report, one point of contact",
    "Ideal for older homes and water-history properties",
  ],
  priceNote:
    "The Home + Mold Bundle is offered at a discounted combined rate based on the property. Call for a custom quote and the best value.",
  gallery: [photos.moldExpert, photos.thermalMold, photos.electricalOutlet, photos.remediationPlan, photos.foundation, photos.labReport].map((p) => ({ src: p.src, alt: p.alt })),
  faqs: [
    { q: "How much do I save with the bundle?", a: "The bundle is always priced below booking a full home inspection and a mold inspection separately. Call and we'll give you the exact combined rate for your property." },
    { q: "Does it take longer than a single inspection?", a: "It's slightly longer than a home inspection alone because of the added mold assessment, but it's far more efficient than scheduling two separate visits." },
    { q: "Who should choose the bundle?", a: "Anyone buying an older home, a property with any history of leaks or water damage, or anyone who simply wants the most thorough assessment possible before committing." },
    { q: "Do I get one report or two?", a: "One unified report covering both inspections. Keeping them together matters — it lets you see that the stain in the hall ceiling and the damp reading in the bedroom wall are the same problem, which two separate reports would obscure." },
    { q: "When do I get the results?", a: "Everything — the structural findings and the mold assessment — goes out the same day, so a contingency window is never left waiting." },
    { q: "Is the bundle worth it on a newer home?", a: "Often not, and we will tell you so. On a well-maintained newer property with no water history and nothing suspicious, a standard home inspection is usually sufficient. The bundle earns its cost on older housing, on anything with disclosed water damage, and where there is a smell or symptom to explain." },
    { q: "Can I add other services to it?", a: "Yes. Gas leak detection is the most common addition, and a dedicated moisture survey can be extended if the initial scan turns up more than expected. It is more efficient to add these to the same visit than to schedule a second appointment later." },
  ],
  relatedBlog: ["home-inspection-checklist", "signs-of-hidden-mold"],
};
