import { photos } from "@/data/photos";
import type { LandingPage } from "./types";

// Follows the owner's ADU engagement (Aug 2026): the unit inspected as its own
// dwelling under its own report, separate from the main-house report, with
// moisture readings taken where visible growth appeared.

export const adu: LandingPage = {
  slug: "adu-inspection",
  name: "ADU Inspection",
  seoTitle: "ADU Inspection — In-Law Units & Cottages",
  metaDescription: `ADU inspections in San Francisco and the Bay Area: backyard cottages, garage conversions and in-law units, inspected as their own home with moisture readings and a same-day report.`,
  summary: `Accessory dwelling units — backyard cottages, garage conversions, in-law units — inspected as their own home with their own report.`,
  eyebrow: "ADU Inspection",
  heroTitle: "ADU inspections in San Francisco and the Bay Area",
  heroSubtitle:
    "Backyard cottages, garage conversions and in-law units, inspected as a home in their own right — with their own report.",
  image: photos.bathroomLeak,
  overviewHeading: "A second home deserves its own inspection",
  overview: [
    "Accessory dwelling units are everywhere in the Bay Area now: backyard cottages, converted garages and ground-floor in-law units. Each is a small home with its own plumbing, electrical, heating and weather-tight shell — and its own problems, separate from the main house.",
    "They also vary more than most homes. Some were built recently with permits; others are decades-old conversions done without them. A converted garage was built for cars, not people, and it shows up in the floor, the ventilation and the wiring.",
    "We inspect the ADU as its own dwelling and give it its own report, rather than a few lines at the end of the main-house report. Buying the whole property? We can inspect both on the same visit.",
  ],
  priceNote: "Inspecting the main house on the same visit? We'll quote both together. Same-day report included.",
  bookingServiceId: "adu-inspection",
  bookLabel: "Book an ADU Inspection",
  includesHeading: "What we inspect",
  includes: [
    { title: "Roof, walls & windows", desc: "The shell of the unit — roof, siding, windows and doors — where water gets into small, often lightly built units." },
    { title: "Moisture & mold screening", desc: "Moisture readings at window frames, door bases, baseboards and wet areas, with thermal imaging. Any visible growth is photographed." },
    { title: "Electrical", desc: "The unit's panel or subpanel, visible wiring, outlets, GFCI protection, and smoke and carbon monoxide alarms." },
    { title: "Plumbing", desc: "Supply and drains, fixtures and the water heater, plus bathroom floors and showers for cracked tile and open joints." },
    { title: "Heating & ventilation", desc: "The heat source and the bathroom and kitchen fans. Small units trap moisture fast when a fan doesn't work." },
    { title: "Safety & exits", desc: "A second way out, bedroom windows large enough to escape through, and stairs and railings." },
  ],
  sections: [
    {
      heading: "Permits: what an inspection can and can't tell you",
      paragraphs: [
        "An inspection can't confirm whether an ADU was permitted. That's a records question for the city's building department.",
        "What we can do is point out signs of work that probably wasn't inspected: wiring and plumbing that don't match the rest of the property, bedrooms without a way out, and heating or ventilation that wouldn't pass. Ask the seller for the permit and final sign-off, and confirm it with the city.",
      ],
    },
    {
      heading: "Renting it out?",
      paragraphs: [
        "If the unit is, or will be, a rental, an inspection gives you a dated, photographed record of its condition before a tenant moves in — and finds moisture problems before they become a tenant's complaint.",
      ],
    },
  ],
  findingsHeading: "What we find in ADUs",
  findings: [
    { title: "Mold at windows and door bases", desc: "Growth along window frames, tracks and baseboards, with moisture readings above normal at the same spots." },
    { title: "Water-damaged trim and paint", desc: "Blistered, lifting paint and swollen, separating trim where water has been sitting." },
    { title: "Cracked tile in wet areas", desc: "A cracked bathroom floor tile or open grout joint is a path for water into the floor beneath." },
    { title: "Weak ventilation", desc: "No exhaust fan, or one that runs without moving air, in a room too small to air itself out." },
    { title: "Electrical added later", desc: "Circuits added without the protection the rest of the property has, and subpanels asked to carry more than they were meant to." },
    { title: "Garage conversion shortcuts", desc: "Concrete floors that draw up moisture, low ceilings, and an old garage door opening walled in without proper weatherproofing." },
  ],
  faqs: [
    {
      q: "How much does an ADU inspection cost?",
      a: "It's quoted for the unit on its own. If we're inspecting the main house on the same visit, we quote the two together. Send us the address and you'll have a firm number, usually within the hour.",
    },
    {
      q: "Isn't the ADU covered by a normal home inspection?",
      a: "It's a second home with its own systems, so we quote and report it separately. Otherwise it tends to get a few lines at the end of the main-house report, which isn't enough for something you may live in or rent out.",
    },
    {
      q: "Can you tell me whether the ADU is permitted?",
      a: "No — permits are a records question for the city. We point out work that looks uninspected so you know what to ask about.",
    },
    {
      q: "Do you test for mold?",
      a: "We screen for it: visible growth is photographed and moisture is measured where it appears, which shows whether a problem is active. We don't take lab samples.",
    },
    {
      q: "Do you inspect in-law units inside the main house?",
      a: "Yes. A junior ADU or ground-floor in-law unit is inspected the same way, as its own dwelling.",
    },
  ],
  ctaTitle: "Buying, renting or checking an ADU?",
  ctaSubtitle: "ADU inspections with their own same-day report.",
};
