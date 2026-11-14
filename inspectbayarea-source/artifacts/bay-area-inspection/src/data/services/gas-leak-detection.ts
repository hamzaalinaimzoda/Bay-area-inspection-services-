import { Flame } from "lucide-react";
import type { Service } from "./types";
import { photos } from "@/data/photos";


export const gasLeakDetection: Service = {
  slug: "gas-leak-detection",
  name: "Gas Leak Detection",
  shortName: "Gas Leak Detection",
  tagline: "Precision detection of natural gas leaks to keep your family safe.",
  icon: Flame,
  featured: true,
  cardImage: photos.appliance.src,
  cardImageAlt: photos.appliance.alt,
  heroImage: photos.kitchen.src,
  heroImageAlt: photos.kitchen.alt,
  metaDescription:
    "Professional gas leak detection in San Francisco and the Bay Area. Instrument testing of appliances, lines and connections. Same-day scheduling available.",
  summary:
    "Sensitive, instrument-based detection of natural gas leaks at appliances, connections, and supply lines before they become a safety hazard.",
  overview: [
    "Natural gas leaks are among the most dangerous problems a home can have — and many go undetected because the leak is too small to smell. A slow leak at a water heater, furnace, stove, or buried line can pose a serious safety and health risk over time.",
    "Our gas leak detection service uses sensitive combustible-gas instruments to test appliances, connections, shut-off valves, and accessible supply lines. We methodically check the points where leaks most commonly develop.",
    "If we find a leak, we'll show you exactly where it is and explain the severity so you can take the right action quickly. As always, we're inspection-only — our goal is your safety, not selling you a repair.",
  ],
  includes: [
    { title: "Appliance Testing", desc: "We check gas ranges, ovens, water heaters, furnaces, and dryers for leaks at their connections." },
    { title: "Connection & Valve Checks", desc: "Inspection of shut-off valves, flex connectors, and fittings where leaks commonly form." },
    { title: "Accessible Line Survey", desc: "Instrument testing along accessible supply lines and meter connections." },
    { title: "Combustible-Gas Metering", desc: "Calibrated detectors pick up concentrations far too low for the human nose." },
    { title: "Severity Assessment", desc: "Clear explanation of what we found and how urgent it is." },
    { title: "Documented Findings", desc: "Photos and notes you can hand directly to a licensed plumber if repairs are needed." },
  ],
  equipment: [
    { name: "Combustible-gas leak detector", purpose: "A heated-sensor instrument that responds to methane at concentrations far below the human smell threshold, letting us find slow leaks long before they become dangerous." },
    { name: "Gas leak detection solution", purpose: "Applied at a suspect fitting to confirm and pinpoint a leak visually once the instrument has narrowed it down." },
    { name: "Manometer", purpose: "Measures gas supply pressure and lets us watch for pressure drop, which indicates loss somewhere in the system." },
    { name: "Combustion analyser", purpose: "Reads flue gases at the appliance to check for incomplete combustion — the condition that produces carbon monoxide." },
    { name: "Carbon monoxide meter", purpose: "Measures ambient CO in living space, since a venting fault can be hazardous even when no gas is leaking." },
    { name: "Infrared thermal camera", purpose: "Checks flue and vent connections for heat patterns indicating disconnection or backdrafting." },
  ],
  commonFindings: [
    { title: "Leaks at flexible appliance connectors", desc: "The connector behind a range or dryer is the most common leak point in a house, because it gets flexed every time the appliance is pulled out for cleaning." },
    { title: "Corroded or seized shut-off valves", desc: "A valve that will not turn is a safety problem in its own right — in an emergency you need to be able to close it." },
    { title: "Improper venting and backdrafting", desc: "Disconnected, corroded or badly sloped flue connectors let combustion products spill into the living space. This is a carbon monoxide risk, not just an efficiency one." },
    { title: "Unsecured or unstrapped water heaters", desc: "In a seismic region an unstrapped heater can topple and shear its own gas connection. Required strapping is often missing or fitted incorrectly." },
    { title: "Gas piping to unpermitted work", desc: "Lines run to converted garages, in-law units or outdoor kitchens frequently bypassed inspection. We flag piping and connectors that do not look like permitted work." },
    { title: "Sediment and drip leg omissions", desc: "Missing sediment traps at appliance connections allow debris into the control valve, which is a reliability and safety concern over time." },
  ],
  sfContext: [
    "San Francisco's housing makes gas worth taking seriously. The city's building stock is old, largely attached, and heated overwhelmingly by gas — wall furnaces, floor furnaces and gravity systems that in many buildings are original or close to it. When buildings share walls, a problem in one unit is not confined to it.",
    "The other factor is retrofit history. Water heaters and furnaces are commonly relocated into garages, closets and converted ground-floor rooms during remodels, and the venting does not always get done properly. Combined with the city's frequent unpermitted in-law conversions, gas piping and flues are among the systems most likely to have been altered by someone who never pulled a permit.",
  ],
  whoItsFor: [
    { who: "Buyers of older homes", need: "Gas piping and venting are among the least visible systems in a house and among the most consequential when wrong." },
    { who: "Anyone smelling gas intermittently", need: "A faint smell that comes and goes usually means a small leak. Instruments find what the nose cannot localise — though a strong smell means evacuate and call PG&E, not book an inspection." },
    { who: "Owners after appliance work", need: "Verification that a newly installed or relocated range, heater or furnace was connected and vented correctly." },
    { who: "Buyers of homes with converted space", need: "Garage and in-law conversions frequently involve gas work that never went through permit or inspection." },
  ],
  process: [
    { title: "Schedule", desc: "Call us — gas concerns are a priority and we offer fast scheduling." },
    { title: "Systematic Testing", desc: "We test each appliance, connection, and accessible line with calibrated instruments." },
    { title: "Locate & Explain", desc: "If a leak is present, we pinpoint it and explain the severity in plain terms." },
    { title: "Report", desc: "You get documented findings to guide any needed repairs by a licensed professional." },
  ],
  benefits: [
    "Detect leaks too small to smell",
    "Protect your family from a serious safety hazard",
    "Peace of mind before move-in or after appliance work",
    "Independent findings with no repair upsell",
  ],
  priceNote:
    "Can be booked on its own or bundled with a full home inspection. Call for a quick quote and priority scheduling.",
  gallery: [photos.appliance, photos.crawlspace, photos.waterHeater].map((p) => ({ src: p.src, alt: p.alt })),
  faqs: [
    { q: "I smell gas right now — what should I do?", a: "If you smell a strong gas odor, leave the home immediately and call PG&E or 911 from a safe location. Our service is for detection and peace of mind, not active emergencies." },
    { q: "Can you find leaks I can't smell?", a: "Yes. Our combustible-gas detectors pick up concentrations far below what the human nose can sense, which is exactly why slow leaks so often go unnoticed." },
    { q: "Do you repair the leak?", a: "No — we're inspection-only by design. We document the leak and its severity so you can bring in a licensed plumber with confidence and no conflict of interest." },
    { q: "Isn't PG&E's leak check enough?", a: "PG&E will respond to a reported odour and check for hazardous conditions, which is exactly what you want in an emergency. What they are not doing is a systematic survey of every appliance connection, valve and accessible line, or an assessment of venting and combustion — which is what a pre-purchase inspection needs." },
    { q: "Can you check carbon monoxide as well?", a: "Yes, and it is worth doing at the same time. CO comes from incomplete combustion or a venting fault rather than from a gas leak, so an appliance can be perfectly gas-tight and still be dangerous. We measure ambient CO and check flue connections and draft." },
    { q: "What about buried or underground gas lines?", a: "We test accessible piping. Buried lines between the meter and the house, or out to a detached structure, cannot be surveyed visually — where there is reason to suspect a problem we will say so and recommend a pressure test by a licensed plumber." },
    { q: "How often should gas systems be checked?", a: "At purchase, after any appliance is installed or moved, and otherwise every few years on an older home. Flexible connectors age, valves seize, and venting gets disturbed by unrelated work more often than people expect." },
  ],
  relatedBlog: ["home-inspection-checklist"],
};
