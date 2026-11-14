import { photos } from "@/data/photos";
import type { LandingPage } from "./types";

// A full home inspection framed for pre-war housing. Every claim here is
// already made elsewhere on the site — the full-home service page's common
// findings and San Francisco context, and the mold page's older-home issues —
// gathered onto one page so it can rank for the searches that describe it.

export const olderHome: LandingPage = {
  slug: "older-home-inspection",
  name: "Older & Historic Home Inspection",
  seoTitle: "Older & Historic Home Inspection — San Francisco",
  metaDescription: `Victorian, Edwardian and pre-war homes inspected by a former builder: foundations, cripple walls, old wiring, dry rot. Same-day report.`,
  summary: `A full home inspection for Victorian, Edwardian and other older homes, focused on what a century of alterations leaves behind.`,
  eyebrow: "Older Home Inspection",
  heroTitle: "Built fast after 1906. Altered ever since.",
  heroSubtitle:
    "Older Bay Area homes carry a century of repairs, additions and conversions — often without a complete permit trail. A former builder inspects them knowing where that history hides.",
  image: photos.foundation,
  overviewHeading: "What makes an older home a different inspection",
  overview: [
    "Most of San Francisco was rebuilt quickly after 1906, on narrow attached lots, using construction practices that no longer exist. Buildings share party walls, sit on steep grades, and have been altered repeatedly across a century — usually without a complete permit trail.",
    "That history is the inspection. An electrical service sized for a different era now running modern loads, original supply piping near the end of its life, a garage turned into living space, a newer addition meeting old roofing — in an older house, that is where problems concentrate.",
    "The scope is the same as any full inspection, roof to foundation. The difference is knowing which details matter in a house this age.",
  ],
  priceNote: "Every inspection is quoted for your specific property. Send us the address and we'll give you a firm number, usually within the hour.",
  bookingServiceId: "full-home-inspection",
  bookLabel: "Book an Older-Home Inspection",
  includesHeading: "What we look at closely",
  includes: [
    { title: "Foundation and seismic bracing", desc: "Shrinkage cracking versus active movement, and whether anchor bolting and cripple-wall shear bracing are present — significant in a seismic region." },
    { title: "Electrical capacity and panels", desc: "An older service checked against today's actual load, with known-problem panel equipment flagged." },
    { title: "Original supply piping", desc: "Galvanised steel corrodes from the inside and looks fine until flow collapses. We test several fixtures under simultaneous demand." },
    { title: "Dry rot", desc: "Fog and wind-driven rain concentrate it at light wells, bay windows and west-facing walls." },
    { title: "Converted and added space", desc: "Garage conversions and in-law units: egress, ceiling height, ventilation and heating, and whether the work appears to have been inspected." },
    { title: "Infrared imaging included", desc: "Finds moisture, missing insulation and overheating connections behind finished surfaces." },
  ],
  sections: [
    {
      heading: "San Francisco specifics",
      items: [
        "Soft-story configurations — a wide garage opening directly beneath living space — are the city's defining structural weakness and the subject of its Mandatory Soft Story Retrofit Program.",
        "Ground-floor in-law units are extremely common, frequently unpermitted, and carry real questions about egress, ceiling height and heating.",
        "Much of the city's housing is attached, so a moisture problem in one building can show up in the one next door.",
      ],
    },
    {
      heading: "What it doesn't include",
      items: [
        "The sewer lateral. It needs a camera run down the line; on older homes with original clay laterals and mature trees, we'll recommend a dedicated sewer scope.",
        "Permit research. We can't check permit records, but we point out work that looks uninspected so you can check.",
        "Opening walls, or licensed pest work. Where a finding needs a specialist, we say which one.",
      ],
      itemStyle: "cross",
    },
  ],
  findingsHeading: "Common findings in older homes",
  findings: [
    { title: "Roof-to-wall flashing at additions", desc: "Where a newer addition meets original roofing is where water gets in — a large share of the concealed damage we find." },
    { title: "Unpermitted converted space", desc: "Garage conversions and added units, checked for egress, header sizing and ventilation." },
    { title: "Deferred drainage", desc: "Soil sloping toward the house and downspouts emptying at the foundation — cheap to fix, and behind many crawl space problems." },
    { title: "Crawl space moisture", desc: "Damp soil, a missing or torn vapour barrier and blocked vents. Very common in older Bay Area homes at low elevation." },
    { title: "Single-pane condensation", desc: "Original glazing sheds condensation onto sills all winter, leaving growth at the frame and staining below it." },
    { title: "Remodelled bathrooms", desc: "Bathrooms remodelled without upgrading ventilation are the most common source of indoor mold we write up. The tile looks fine; the substrate behind it may not be." },
  ],
  faqs: [
    {
      q: "Is this different from a full home inspection?",
      a: "It is a full home inspection — the same scope, quoted the same way for the same home. The difference is where we look hardest: the foundation, wiring, piping and converted space that a century of alterations leaves behind.",
    },
    {
      q: "Do you check seismic retrofitting?",
      a: "We report whether anchor bolting and cripple-wall shear bracing are present, and distinguish shrinkage cracking from active movement. Where a finding warrants it, we'll say plainly that a structural engineer should look.",
    },
    {
      q: "Do you inspect the sewer lateral?",
      a: "Not as part of the general inspection, because it requires a camera run down the line. On older homes with original clay laterals and mature trees we will recommend a dedicated sewer scope, since root intrusion is common and it is one of the more expensive repairs that a standard inspection cannot see.",
    },
    {
      q: "Can you tell whether work was permitted?",
      a: "We can't check permit records, but we point out work that looks uninspected — converted space, added bathrooms, electrical or heating changes — so you can check before you commit.",
    },
    {
      q: "How long does it take?",
      a: "Typically 2–4 hours, depending on the size and age of the home.",
    },
    {
      q: "Should I add a mold inspection?",
      a: "If there's a musty smell, staining or a history of leaks, it's worth considering. Our Home + Mold Bundle covers both in one visit at a discounted combined rate.",
    },
  ],
  ctaTitle: "Buying an older home?",
  ctaSubtitle: "Book a full inspection from a former builder who knows where a century of changes hides.",
};
