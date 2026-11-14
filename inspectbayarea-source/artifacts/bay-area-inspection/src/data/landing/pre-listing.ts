import { photos } from "@/data/photos";
import type { LandingPage } from "./types";

// Same scope as a buyer's full home inspection; only the client and the
// purpose differ. Quoted per property — the site publishes no prices.

export const preListing: LandingPage = {
  slug: "pre-listing-inspection",
  name: "Pre-Listing Inspection",
  seoTitle: "Pre-Listing Inspection for Sellers — Bay Area",
  metaDescription: `Know what a buyer's inspector will find before you list. Pre-listing inspections in San Francisco and the Bay Area, with a same-day report you can share with buyers.`,
  summary: `An inspection for sellers before listing, so repairs, pricing and disclosure happen on the seller's schedule.`,
  eyebrow: "Pre-Listing Inspection",
  heroTitle: "Find it before the buyer's inspector does",
  heroSubtitle:
    "An inspection for sellers, done before the home goes on the market — so you can fix things on your own schedule, price them in, or disclose them accurately, instead of renegotiating in escrow.",
  image: photos.labReport,
  overviewHeading: "Your inspection, before theirs",
  overview: [
    "A buyer's inspection is done for the buyer, on the buyer's timeline, usually with an offer already on the table. Whatever it turns up becomes a repair request or a price cut, and you have days to answer.",
    "A pre-listing inspection turns that around. You learn the condition of the home before any buyer does, then decide what to repair, what to price in and what to disclose — on your schedule, with your own contractors' quotes.",
    "The report is written plainly, and it records what's in good order as well as what isn't. Many sellers hand it to buyers and their agents with the disclosures.",
  ],
  priceNote: "Same scope as a buyer's inspection, quoted for your property. Send us the address and we'll give you a firm number, usually within the hour.",
  bookingServiceId: "full-home-inspection",
  bookLabel: "Book a Pre-Listing Inspection",
  includesHeading: "What the report gives you",
  includes: [
    { title: "The full inspection", desc: "Roof to foundation and every major system — the same ground a buyer's inspector will cover." },
    { title: "Measured readings", desc: "Moisture, thermal and electrical readings, each photographed with the instrument display legible, so a buyer can't wave them away as opinion." },
    { title: "Findings rated by urgency", desc: "What needs repair, what to keep an eye on, and what is in good order — the good news goes in the report too." },
    { title: "Next steps and who to call", desc: "Which trade to contact for each item, so you can get quotes before the listing goes live." },
    { title: "Same-day report", desc: "Usually with you and your agent the evening of the inspection." },
    { title: "Nothing to sell you", desc: "We're inspection-only and don't do repairs, so no finding is there to create work." },
  ],
  sections: [
    {
      heading: "Three ways to use the findings",
      items: [
        "Repair it before listing. Most findings are small, and cheaper to fix now than to concede in escrow.",
        "Price it in. For bigger items, get a contractor's quote and let the asking price reflect it.",
        "Disclose it. California requires sellers to disclose known material defects. A dated, photographed report makes that disclosure accurate — and a defect disclosed up front can't reopen the deal later.",
      ],
      itemStyle: "check",
    },
    {
      heading: "What it doesn't replace",
      paragraphs: [
        "Most buyers will still hire their own inspector, and they should. A pre-listing inspection doesn't stop that — it makes it far less likely that their report tells you something new.",
      ],
    },
  ],
  findingsHeading: "What sellers are usually surprised by",
  findings: [
    { title: "Moisture with nothing to see", desc: "Readings above normal at wall bases or under sinks, with no stain yet. Usually traced to drainage outside, and usually cheap to correct." },
    { title: "Water heater and alarm requirements", desc: "California requires water heater bracing and working smoke and carbon monoxide alarms when a home is sold. Easy fixes before listing; awkward ones in escrow." },
    { title: "Electrical items", desc: "Ungrounded outlets, missing GFCI protection in kitchens and baths, and double-tapped breakers." },
    { title: "Drainage at the foundation", desc: "Downspouts emptying at the wall base and soil sloping toward the house — the cause behind a lot of crawl space findings." },
    { title: "Unpermitted work", desc: "Garage conversions, added bathrooms and in-law units. We can't check permit records, but we point out work that looks uninspected so you can check before a buyer asks." },
    { title: "Small items that add up", desc: "Cracked cover plates, worn caulk, slow drains. None matter alone, but a long list gives a buyer easy negotiating points." },
  ],
  faqs: [
    {
      q: "Is a pre-listing inspection worth it if the buyer will inspect anyway?",
      a: "Yes. The buyer's inspection still happens; the difference is whether its findings are news to you. Knowing first means you respond with repairs already done or quotes already in hand, not under an escrow deadline.",
    },
    {
      q: "Do I have to disclose what the report finds?",
      a: "California sellers must disclose known material defects, and a pre-listing inspection will make you aware of more. Plan to fix what it finds or disclose it. Your agent can advise on how to present the report.",
    },
    {
      q: "Can I give the report to buyers?",
      a: "Yes, it's yours to share. Many sellers include it with their disclosures. Buyers should still get their own inspection.",
    },
    {
      q: "How much does a pre-listing inspection cost?",
      a: "It's quoted for your property — size, age and access all move it — and it's the same as a buyer's inspection of the same home. Send us the address and you'll have a firm number, usually within the hour.",
    },
    {
      q: "When should I schedule it?",
      a: "Two to four weeks before listing is ideal: early enough to get quotes and make repairs, and before the asking price is set.",
    },
    {
      q: "Do you inspect manufactured homes before a sale?",
      a: "Yes. A manufactured home gets a manufactured home inspection, including the underbelly and support system — see our manufactured home page for what that covers.",
    },
  ],
  ctaTitle: "Selling soon?",
  ctaSubtitle: "Book a pre-listing inspection and know what's in the report before a buyer does.",
};
