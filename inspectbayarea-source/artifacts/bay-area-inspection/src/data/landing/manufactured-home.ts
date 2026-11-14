import { photos } from "@/data/photos";
import type { LandingPage } from "./types";

// Content follows the owner's own manufactured-home reports (a pre-listing
// report and an insurance 5-point report, Aug–Sep 2026): the underbelly and
// support system, the data plate, water heater age, and a carrier-requirements
// table that maps each requested photo to the plates that satisfy it.

export const manufacturedHome: LandingPage = {
  slug: "manufactured-home-inspection",
  name: "Manufactured & Mobile Home Inspection",
  seoTitle: "Mobile & Manufactured Home Inspection — Bay Area",
  metaDescription: "Manufactured and mobile home inspections across the Bay Area, plus insurance 5-point reports. Underbelly, supports, roof, electrical, plumbing and water heater, with a same-day report.",
  summary: "Full inspections of manufactured and mobile homes, and insurance 5-point reports.",
  eyebrow: "Manufactured & Mobile Homes",
  heroTitle: "Manufactured & mobile home inspections in the Bay Area",
  heroSubtitle:
    "For buyers, sellers and owners in Bay Area mobile home parks — and the 5-point report your insurance company asks for.",
  image: photos.waterHeater,
  overviewHeading: "Built differently, inspected differently",
  overview: [
    "A manufactured home is built in a factory to a federal standard (the HUD Code) and then set on piers or blocks on site. Much of what goes wrong happens where it meets the ground: the supports and blocking, the underbelly membrane, and water that collects beneath the home.",
    "The systems differ too. Water heaters must be approved for manufactured housing and often sit in a compartment opened from outside. Roofs are frequently metal or low-slope and depend on sealed seams and penetrations.",
    "We inspect manufactured homes in parks around the Bay Area, and record the details from the home's data plates, so you know exactly what you're buying or insuring.",
  ],
  priceNote: "Quoted for your home — double-wide and larger homes take longer. Same-day report included.",
  bookingServiceId: "manufactured-home",
  bookLabel: "Book a Manufactured Home Inspection",
  includesHeading: "What a full inspection covers",
  includes: [
    { title: "Underbelly & supports", desc: "The underbelly membrane, piers, blocking and tie-downs where they can be seen, and any standing water or debris under the home." },
    { title: "Roof & exterior", desc: "Roof panels, seams, penetrations and edge trim; siding, skirting, awnings and carport." },
    { title: "Electrical", desc: "The panel with its cover removed, breakers and labelling, and outlets tested for voltage, polarity and ground." },
    { title: "Plumbing", desc: "Supply and drain connections under every sink, fixtures, and signs of leaks beneath the home." },
    { title: "Water heater", desc: "Age from the data plate, whether it's the right type for a manufactured home, strapping, venting and its compartment." },
    { title: "Interior & moisture", desc: "Floors, walls, ceilings, windows and doors, with moisture readings at wall bases and wet areas." },
  ],
  sections: [
    {
      heading: "The insurance 5-point report",
      paragraphs: [
        "Some insurance companies require a 5-point inspection before they'll write or renew a policy on a manufactured home. It's a limited report on the five systems insurers care about, with the specific photos their request form lists:",
      ],
      items: [
        "The roof, from the ground and at roof level",
        "The exterior, all four sides",
        "The electrical panel, closed and open",
        "Plumbing under each emptied sink, with supply lines visible",
        "The water heater in place, and its serial number",
      ],
      itemStyle: "check",
      closing:
        "Our report matches each requirement on the carrier's form to the photos that satisfy it, so the underwriter can check it without searching. A 5-point report is not a full inspection and isn't meant for buying a home.",
    },
    {
      heading: "Buying or selling in a park",
      paragraphs: [
        "In most mobile home parks you own the home but rent the space, so the park's rules, the space rent and any planned park-wide work matter as much as the home itself. We inspect the home; ask the park office for its rules and any upcoming work before you commit.",
      ],
    },
  ],
  findingsHeading: "What we find in manufactured homes",
  findings: [
    { title: "Water heaters past their service life", desc: "Units 15 to 20 years old are common. Gas storage water heaters are typically expected to last eight to twelve years, and insurers ask about age." },
    { title: "Moisture at wall bases", desc: "Readings above a same-day control reading, often with nothing visible yet — frequently traced to drainage outside the home." },
    { title: "Underbelly damage", desc: "Torn or sagging membrane, fallen insulation, and water pooling beneath the home." },
    { title: "Roof seams and penetrations", desc: "Low-slope and metal roofs rely on sealed seams and flashing at vents; that's where leaks start." },
    { title: "Soft floors", desc: "Around toilets, tubs and exterior doors, where water has reached the floor structure." },
    { title: "Skirting and ventilation", desc: "Gaps in the skirting let animals in, and blocked vents trap moisture under the home." },
  ],
  faqs: [
    {
      q: "How much does a manufactured home inspection cost?",
      a: "Both are quoted for your home — double-wide and larger homes take longer, and a 5-point report is a shorter, more limited job than a full inspection. Send us the address and you'll have a firm number, usually within the hour.",
    },
    {
      q: "What's the difference between a full inspection and a 5-point report?",
      a: "A full inspection covers the whole home, including the underbelly and supports, and is what you want when buying or selling. A 5-point report covers only the five systems an insurance company asks about, with their required photos.",
    },
    {
      q: "My insurance company sent an inspection request. Can you do it?",
      a: "Yes. Send us the request form. We photograph exactly what it lists and show in the report which photos satisfy each requirement.",
    },
    {
      q: "Do you check whether the home was set up correctly?",
      a: "We look at the visible support system — piers, blocking and tie-downs where accessible — and record anything that looks displaced, missing or unsupported. Certifying an installation is an engineer's job, and we'll say if one is needed.",
    },
    {
      q: "Do you inspect the park's roads, utilities or common areas?",
      a: "No. We inspect the home and what serves it on the space. Park infrastructure is the park's responsibility.",
    },
  ],
  ctaTitle: "Need a manufactured home inspected?",
  ctaSubtitle: "Full inspections and insurance 5-point reports, with a same-day report either way.",
};
