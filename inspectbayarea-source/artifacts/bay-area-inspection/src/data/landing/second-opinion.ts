import { photos } from "@/data/photos";
import type { LandingPage } from "./types";

// A full home inspection for a buyer who already holds the seller's report.
// Same scope and quote as any full inspection; only the situation differs, as
// with the pre-listing page. Never disparages the seller's inspector — the
// argument is that the buyer should attend an inspection done for them.

export const secondOpinion: LandingPage = {
  slug: "second-opinion-inspection",
  name: "Second-Opinion Home Inspection",
  seoTitle: "Second-Opinion Home Inspection in San Francisco",
  metaDescription: `Have the seller's inspection report? Get your own. Attend the inspection, ask questions, and get a photo report the same day. InterNACHI certified.`,
  summary: `A full home inspection for buyers who already have the seller's report and want their own — attended, explained, and reported the same day.`,
  eyebrow: "Second-Opinion Inspection",
  heroTitle: "The seller's report is a start. This one is yours.",
  heroSubtitle:
    "If you've been handed the seller's inspection report, read it — then get your own. You attend, you ask the questions, and the report is written for you, the same day.",
  image: photos.crawlspace,
  overviewHeading: "Why your own inspection still matters",
  overview: [
    "A seller's report was commissioned by the seller, on the seller's schedule, before you were involved. It's useful information. It isn't an inspection you attended, and you can't ask its author what a finding means for you.",
    "Your own inspection covers the same home from roof to foundation, with you there. You see the issues in place, ask about anything you don't understand, and leave knowing which items matter.",
    "Reading the two reports side by side is worth doing. Where they agree, you can move faster. Where they don't, you know what to ask before your contingency deadline.",
  ],
  priceNote: "The same scope as a full home inspection, quoted for the property. Send us the address and we'll give you a firm number, usually within the hour.",
  bookingServiceId: "full-home-inspection",
  bookLabel: "Book Your Own Inspection",
  includesHeading: "What you get",
  includes: [
    { title: "The full inspection", desc: "Roof and exterior, structure and foundation, electrical, plumbing, HVAC and the interior — the whole house, not only the items in the seller's report." },
    { title: "Infrared imaging included", desc: "A thermal camera on every full inspection finds moisture, missing insulation and overheating connections behind finished surfaces." },
    { title: "You can be there", desc: "We encourage it. If you can't make it, we walk you through the findings by phone." },
    { title: "Measured, not guessed", desc: "Moisture meters confirm whether a stain is active or old — the difference between a repair you negotiate and one you can ignore." },
    { title: "Same-day report", desc: "Plain English, with photos, delivered the same day in nearly all cases." },
    { title: "Nothing to sell you", desc: "We're inspection-only and don't do repairs, so no finding is there to create work." },
  ],
  sections: [
    {
      heading: "Questions to ask of the seller's report",
      items: [
        "What was outside its scope? Reports list areas that weren't inspected or weren't accessible — note them.",
        "How old is it? A report written before a winter, a remodel or a long vacancy describes a different house.",
        "Which items were marked to monitor rather than repair? Those are worth a second look.",
        "Were readings photographed, or only described? A photographed moisture or electrical reading is evidence; a sentence is an opinion.",
      ],
    },
    {
      heading: "What this isn't",
      paragraphs: [
        "It isn't a critique of the seller's inspector. Two inspections of the same house on different days, with different access, rarely read the same — and the one you attend is the one you can ask about.",
      ],
    },
  ],
  findingsHeading: "Where we look hardest",
  findings: [
    { title: "Water at addition junctions", desc: "Where a newer addition meets the original roof is where water gets in. It accounts for a large share of the concealed damage we find." },
    { title: "Moisture behind finished surfaces", desc: "The thermal camera finds damp material behind intact walls and ceilings, before a stain shows." },
    { title: "Converted and added space", desc: "Garage conversions and added units: we check egress, ventilation and whether electrical or heating work appears to have gone through inspection." },
    { title: "Electrical capacity", desc: "Older services now running modern loads. We check capacity against actual use and flag known-problem panel equipment." },
    { title: "Foundation and seismic bracing", desc: "Shrinkage cracking versus active movement, and whether anchor bolting and cripple-wall bracing are present." },
    { title: "Drainage at the foundation", desc: "Soil sloping toward the house and downspouts emptying at the wall base — the root cause behind many crawl space problems." },
  ],
  faqs: [
    {
      q: "Do I need my own inspection if the seller already had one?",
      a: "That's your decision, and the seller's report is worth reading. Your own inspection means you attend, ask questions in the moment, and get a report written for you — the same day, so it fits a contingency window.",
    },
    {
      q: "Is it the same as a full home inspection?",
      a: "Yes. The same scope — roof to foundation and every major system — quoted the same way for the same home. Only the situation is different.",
    },
    {
      q: "How long does it take?",
      a: "Typically 2–4 hours, depending on the size and age of the home.",
    },
    {
      q: "When will I get the report?",
      a: "The same day, in nearly all cases.",
    },
    {
      q: "What isn't covered?",
      a: "The inspection is visual and non-invasive: we don't open walls, scope the sewer lateral, do licensed pest work, or go anywhere unsafe to reach. Where a finding needs a specialist, we say which one.",
    },
    {
      q: "How much does it cost?",
      a: "It's quoted for the property, the same as a full home inspection of that home. Send us the address and you'll have a firm number, usually within the hour.",
    },
  ],
  ctaTitle: "Holding the seller's report?",
  ctaSubtitle: "Book your own inspection and get a report written for you, the same day.",
};
