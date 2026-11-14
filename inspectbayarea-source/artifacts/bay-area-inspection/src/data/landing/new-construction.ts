import { photos } from "@/data/photos";
import type { LandingPage } from "./types";

// A new house is still a house: priced as the full home inspection. The owner
// chose to offer both the pre-closing and the 11-month warranty visit.

export const newConstruction: LandingPage = {
  slug: "new-construction-inspection",
  name: "New Construction & 11-Month Warranty Inspection",
  seoTitle: "New Construction & 11-Month Warranty Inspection",
  metaDescription: `New-build and 11-month builder warranty inspections in San Francisco and the Bay Area, by a former builder. Find workmanship defects while the builder still has to fix them.`,
  summary: `New-build inspections before closing and 11-month builder-warranty inspections, by a former builder.`,
  eyebrow: "New Construction",
  heroTitle: "New construction & 11-month warranty inspections",
  heroSubtitle:
    "A brand-new house isn't automatically a sound one. We inspect new builds before closing, and again before the builder's one-year warranty runs out — as a former builder who knows where crews cut corners.",
  image: photos.newHome,
  overviewHeading: "New homes have workmanship problems, not age problems",
  overview: [
    "Nothing in a new house is worn out, so the defects are different: flashing installed in the wrong order, missing insulation, a drain with no slope, a bathroom fan that ends in the attic instead of outside. They're installation mistakes, and far cheaper to fix before you close — or while the builder is still responsible.",
    "The city's inspections check that work meets code at set stages of construction. They aren't a check on everything, and the city inspector isn't working for you. We are.",
    "Our inspector spent years building homes, so we know how they go together and where a crew in a hurry takes shortcuts.",
  ],
  priceNote: "Quoted for your home, and the same for either visit. Thermal imaging included — it's how missing insulation and hidden leaks show up in a new house.",
  bookingServiceId: "full-home-inspection",
  bookLabel: "Book a New Construction Inspection",
  includesHeading: "What we inspect",
  includes: [
    { title: "Roof, flashing & exterior", desc: "Flashing at windows, doors and where walls meet the roof, and drainage away from the foundation." },
    { title: "Insulation", desc: "Thermal imaging across walls and ceilings to find insulation that's missing or compressed behind the drywall." },
    { title: "Plumbing", desc: "Drain slope, leaks with fixtures running together, and the water heater's installation and venting." },
    { title: "Electrical", desc: "The panel and its labelling, GFCI and AFCI protection, and outlets tested at every accessible location." },
    { title: "Heating & cooling", desc: "Supply and return temperatures, duct connections in the attic, and where exhaust fans actually end up." },
    { title: "Finishes & operation", desc: "Doors, windows, cabinets and appliances — the punch-list items that are easy to miss at a walkthrough." },
  ],
  sections: [
    {
      heading: "Two times to inspect a new home",
      items: [
        "Before closing. At or before your final walkthrough, so what we find goes on the builder's punch list before you sign.",
        "Before the warranty ends. Around month eleven, after a year of weather and settling, problems show up that weren't there on day one: leaks, cracks, sticking doors, fans that don't vent outside. Report them in writing while the builder still has to respond.",
      ],
      itemStyle: "check",
    },
    {
      heading: "About builder warranties",
      paragraphs: [
        "Warranty terms are in your purchase contract. Check how long each part lasts and how claims must be made — usually in writing, before a deadline. Our report gives you a dated, photographed record to send with the claim.",
      ],
    },
  ],
  findingsHeading: "What we find in new homes",
  findings: [
    { title: "Missing or displaced insulation", desc: "It shows on thermal imaging as cold patches in walls and ceilings." },
    { title: "Flashing and sealant gaps", desc: "At windows, doors and where walls meet the roof — where most new-home leaks begin." },
    { title: "Fans vented into the attic", desc: "Bathroom and dryer vents that stop short of the outside and dump moist air where it rots framing." },
    { title: "Grading and downspouts", desc: "Soil sloping toward the house and downspouts emptying at the foundation." },
    { title: "Leaks that need running water", desc: "Slow drips at new connections that only show when several fixtures run at once." },
    { title: "Punch-list items", desc: "Damaged finishes, sticking doors, missing hardware. Small, but the builder fixes them if they're on the list." },
  ],
  faqs: [
    {
      q: "Is it worth inspecting a brand-new house?",
      a: "Yes. New-construction problems are workmanship problems — flashing, insulation, drainage, mechanical installation — and they're far cheaper to resolve before closing or under warranty than after.",
    },
    {
      q: "Will the builder let you inspect?",
      a: "Most do. Check your purchase contract for any notice or scheduling rules, and tell us about any site requirements when you book.",
    },
    {
      q: "When should I book the 11-month inspection?",
      a: "Around month ten or eleven, so there's time to send the report to the builder before the warranty deadline.",
    },
    {
      q: "How much does it cost?",
      a: "Each visit is quoted for your home, on the same basis as a full home inspection. Larger homes take longer. Send us the address and you'll have a firm number, usually within the hour.",
    },
    {
      q: "Do you check code compliance?",
      a: "No inspector can certify code compliance — that's the building department's job. We report defects and installation problems, and say when a specialist should look further.",
    },
  ],
  ctaTitle: "Closing on a new home, or near month eleven?",
  ctaSubtitle: "New construction and warranty inspections, with a same-day report.",
};
