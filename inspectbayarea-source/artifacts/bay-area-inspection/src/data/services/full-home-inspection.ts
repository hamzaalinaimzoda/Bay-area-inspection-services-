import { Home } from "lucide-react";
import type { Service } from "./types";
import { photos } from "@/data/photos";


export const fullHomeInspection: Service = {
  slug: "full-home-inspection",
  name: "Full Home Inspection",
  shortName: "Home Inspection",
  tagline: "A top-to-bottom evaluation by a former builder who knows exactly where problems hide.",
  icon: Home,
  featured: true,
  cardImage: photos.newHome.src,
  cardImageAlt: photos.newHome.alt,
  heroImage: photos.foundation.src,
  heroImageAlt: photos.foundation.alt,
  metaDescription:
    "Comprehensive full home inspections in San Francisco and across the Bay Area by a former builder. Roof to foundation, all major systems, same-day reports.",
  summary:
    "A comprehensive, unbiased evaluation of the home's structure and systems — from the roof to the foundation — delivered in a clear, same-day report.",
  overview: [
    "A home is the biggest purchase most people ever make, and in the Bay Area the stakes are higher than almost anywhere in the country. Our full home inspection gives you a complete, objective picture of a property's true condition before you commit.",
    "What sets us apart is experience on the other side of the wall. As a former builder, our inspector knows how homes are actually put together — and where corners get cut. That's why we routinely find issues that other inspectors walk right past.",
    "We evaluate every major system and component, document our findings with photos, and explain what matters most in plain English. You'll leave knowing exactly what you're buying, what needs attention now, and what can wait.",
  ],
  includes: [
    { title: "Roof & Exterior", desc: "Roofing, gutters, flashing, siding, trim, grading, drainage, walkways, and driveways." },
    { title: "Structure & Foundation", desc: "Foundation, framing, crawl spaces, and signs of settlement or movement." },
    { title: "Electrical System", desc: "Panel, wiring, outlets, GFCI protection, and safety hazards." },
    { title: "Plumbing System", desc: "Supply lines, drains, water heater, fixtures, and signs of leaks." },
    { title: "HVAC", desc: "Heating and cooling equipment, ductwork, and overall performance." },
    { title: "Interior", desc: "Walls, ceilings, floors, windows, doors, stairs, and built-in appliances." },
  ],
  equipment: [
    { name: "Infrared thermal camera", purpose: "Included on every full inspection, not charged as an extra. Finds moisture, missing insulation and overheating electrical connections behind finished surfaces." },
    { name: "Moisture meters", purpose: "Confirms whether a stain is active or historic — the difference between a repair you negotiate and one you ignore." },
    { name: "Combustible-gas detector", purpose: "Checks appliance connections and accessible gas piping during the walkthrough rather than assuming they are sound." },
    { name: "GFCI and receptacle testers", purpose: "Verifies grounding, polarity and that protective devices actually trip, at every accessible outlet." },
    { name: "Telescoping inspection mirror and borescope", purpose: "Gets eyes into flues, tight framing bays and behind equipment where a torch alone cannot reach." },
    { name: "Digital thermometer and manometer", purpose: "Measures HVAC supply and return temperature split and gas appliance draft, so performance is measured rather than eyeballed." },
  ],
  commonFindings: [
    { title: "Original supply piping at end of life", desc: "Galvanised steel corrodes from the inside, so it looks fine until flow collapses. We test several fixtures under simultaneous demand rather than judging by appearance." },
    { title: "Electrical services sized for a different era", desc: "A 100-amp service installed in 1955 now runs air conditioning, induction cooking and EV charging. We check capacity against actual load, and flag known-problem panel equipment." },
    { title: "Unpermitted additions and converted space", desc: "Garage conversions and added units are widespread. We check egress, header sizing, ventilation and whether electrical or heating work appears to have gone through inspection." },
    { title: "Roof-to-wall flashing at addition junctions", desc: "Where a newer addition meets original roofing is where water gets in. It accounts for a large share of the concealed damage we find." },
    { title: "Foundation cracking and cripple wall bracing", desc: "We distinguish shrinkage cracking from active movement, and report whether anchor bolting and shear bracing are present — significant in a seismic region." },
    { title: "Deferred drainage and negative grading", desc: "Soil sloping toward the structure and downspouts discharging at the foundation are cheap to fix and the root cause behind a surprising share of crawl space problems." },
  ],
  sfContext: [
    "A San Francisco home inspection is not the same job as a suburban one. Most of the city was rebuilt quickly after 1906 on narrow, attached lots, using construction practices that no longer exist. Buildings share party walls, sit on steep grades, and were altered repeatedly across a century — usually without a complete permit trail.",
    "Three things matter here that barely register elsewhere. Soft-story configurations, where a wide garage opening sits directly beneath living space, are the city's defining structural weakness and the subject of its Mandatory Soft Story Retrofit Program. Dry rot driven by fog and wind-driven rain concentrates at light wells, bay windows and west-facing walls. And ground-floor in-law units are extremely common, frequently unpermitted, and carry real questions about egress, ceiling height and heating.",
  ],
  whoItsFor: [
    { who: "Buyers in a contingency window", need: "A complete picture fast enough to act on — which is why the report goes out the same day rather than three days later." },
    { who: "Buyers waiving contingencies", need: "A pre-offer inspection so you know what you are taking on before you give up your protection. Increasingly common in competitive Bay Area offers." },
    { who: "Sellers preparing to list", need: "A pre-listing inspection surfaces what a buyer's inspector would find, so you can fix it, price it in, or disclose it on your terms." },
    { who: "Owners planning renovation", need: "An objective baseline of what is sound and what is not, before you spend money on the wrong thing." },
  ],
  process: [
    { title: "Schedule", desc: "Book online or by phone — same-day and next-day appointments are often available." },
    { title: "On-Site Inspection", desc: "A thorough 2–4 hour walkthrough of the entire property, inside and out." },
    { title: "Walk & Talk", desc: "You're welcome to join at the end so we can show you findings in person." },
    { title: "Same-Day Report", desc: "A detailed, photo-rich report delivered the same day so you never lose momentum." },
  ],
  benefits: [
    "Know the home's true condition before you buy",
    "Builder's-eye perspective catches what others miss",
    "Same-day reports keep your contingency window on track",
    "Confident, data-backed negotiating leverage",
  ],
  priceNote:
    "Every inspection is quoted for your specific property — house, condo or attached unit. Send us the address and we'll give you a firm number, usually within the hour.",
  gallery: [photos.roof, photos.crawlspace, photos.atticInsulation, photos.electricalOutlet, photos.waterHeater, photos.window].map((p) => ({ src: p.src, alt: p.alt })),
  faqs: [
    { q: "How long does a full home inspection take?", a: "Typically 2–4 hours depending on the size and age of the home. You're welcome to attend the final walkthrough so we can point out our findings directly." },
    { q: "Should I attend the inspection?", a: "We encourage it. Seeing issues firsthand — and asking questions in the moment — gives you far more than a report alone. If you can't make it, we'll walk you through everything by phone." },
    { q: "When will I get the report?", a: "We deliver detailed, photo-rich reports the same day in nearly all cases, so you can move quickly in a competitive market." },
    { q: "What is not covered by a home inspection?", a: "A general inspection is visual and non-invasive. We do not open walls, dig up sewer laterals, test for pests as a licensed operator, or evaluate anything inaccessible or unsafe to reach. Where a finding warrants it we will say plainly that a specialist — structural engineer, sewer scope, licensed pest operator, geotechnical engineer — should look further, rather than leaving it vague." },
    { q: "Do you inspect condos and townhomes?", a: "Yes. For attached housing we focus on what falls inside your boundary: the unit's own systems, envelope penetrations, balcony and deck waterproofing, and any evidence of moisture arriving from shared walls or the unit above. Common-area components are the association's responsibility, but we note anything visible that affects your unit." },
    { q: "Is a new-build home worth inspecting?", a: "Yes. New construction problems are workmanship problems — flashing, waterproofing, mechanical installation — and they are far cheaper to resolve before closing than after. A brand-new house is not automatically a sound one." },
    { q: "Do you inspect the sewer lateral?", a: "Not as part of the general inspection, because it requires a camera run down the line. On older homes with original clay laterals and mature trees we will recommend a dedicated sewer scope, since root intrusion is common and it is one of the more expensive repairs that a standard inspection cannot see." },
  ],
  relatedBlog: ["home-inspection-checklist", "what-inspectors-find-bay-area-homes"],
};
