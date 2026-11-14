import type { CityIssue } from "@/data/cities/types";

/**
 * Hand-written copy for city × service pages that matter enough to replace
 * the assembled version.
 *
 * The assembler in city-service.ts picks findings by keyword, which works for
 * most pages but let San Francisco's mold page open with soft-story and 3R
 * paperwork and list unpermitted units as a "mold finding". The pages that
 * carry real search demand get written by hand here instead. Anything left
 * out of an override falls back to the assembled content.
 */
export interface CityServiceOverride {
  subtitle?: string;
  description?: string;
  intro?: string[];
  issues?: CityIssue[];
  /** Hides the housing-era section. */
  hideEras?: boolean;
  /** Rendered as "How we test" ahead of the process steps. */
  testing?: { title: string; desc: string }[];
  independence?: string;
  /** Shown before the city and service FAQs. */
  faqs?: { q: string; a: string }[];
}

const overrides: Record<string, CityServiceOverride> = {
  "san-francisco/mold-inspection": {
    subtitle:
      "Thermal imaging, moisture mapping and lab-analysed mold samples — from an inspection-only company that never sells mold removal.",
    description:
      "Mold inspection in San Francisco with thermal imaging, moisture mapping and lab-analysed swab and settle-plate samples. Inspection-only, no remediation upsell. Same-day reports.",
    intro: [
      "San Francisco is a harder place for mold than most of the Bay Area, and for structural reasons rather than bad luck. The marine layer keeps exterior walls damp for long stretches, west-facing walls take wind-driven rain, and much of the city's housing is attached — so a moisture problem in one building can show up in the one next door.",
      "The housing stock compounds it. Post-1906 Edwardians were built fast, with thin wall cavities and no vapour barrier, and later remodels often sealed those walls up without adding ventilation. Ground-floor rooms and in-law units built into garages are especially prone, because they sit close to grade in a foggy climate with little air movement.",
      "That is why a mold inspection here is about finding the water source, not just the stain. Clean the mold without fixing the moisture and it comes back.",
    ],
    issues: [
      { title: "Mold behind bathroom tile and under vanities", desc: "Bathrooms remodelled without upgrading ventilation are the most common source of indoor mold I write up. The tile looks fine; the wall behind it is not." },
      { title: "Condensation mold in exterior-wall closets", desc: "A cold exterior wall plus no air movement inside a closet produces surface growth on drywall and on stored contents. It is frequently mistaken for a leak." },
      { title: "Window sills and frames on single-pane glass", desc: "Original single-pane windows shed condensation onto the sills all winter. The result is persistent growth at the frame and staining below it." },
      { title: "Damp ground-floor and garage in-law units", desc: "Rooms close to grade, with little ventilation and often converted without a moisture barrier. These are where hidden growth turns up most in the city." },
      { title: "Hidden growth from old roof or plumbing leaks", desc: "A leak that was fixed years ago often left wet insulation and framing behind it. The repair stopped the water; nothing dried the cavity." },
      { title: "Moisture crossing shared walls", desc: "Most San Francisco buildings share walls. A problem that starts next door regularly shows up on your side first." },
    ],
    hideEras: true,
    testing: [
      { title: "Full visual assessment", desc: "Every accessible area, including attics, crawl spaces and under sinks." },
      { title: "Infrared thermal imaging", desc: "Spots damp material behind an intact wall or ceiling without opening anything up." },
      { title: "Calibrated moisture meters", desc: "Confirm and measure what the thermal camera suggests." },
      { title: "Humidity readings", desc: "Tell a condensation problem from an active leak — the two need completely different fixes." },
      { title: "Lab-analysed mold samples", desc: "When it helps answer the question, we take surface swabs and settle-plate air samples and send them to PRO-LAB, an AIHA LAP-accredited laboratory (ISO/IEC 17025). The lab results are added to your report." },
    ],
    independence:
      "We are inspection-only. We do not do mold removal and are not paid by anyone who does, so we have no reason to make a problem look bigger than it is. You get an honest, documented report you can hand to any remediation contractor.",
    faqs: [
      { q: "Why is mold so common in San Francisco homes?", a: "Fog and wind-driven rain keep exterior walls damp, much of the housing is attached, and many older homes were sealed up during remodels without adding ventilation. Moisture that cannot dry out is what mold needs." },
      { q: "Do you test the air for mold?", a: "Yes. We take settle-plate air samples and surface swabs, analysed by PRO-LAB, an AIHA LAP-accredited laboratory (ISO/IEC 17025). The lab identifies the mold types found, and the results are added to your report. You can see a real lab report on our sample report page." },
      { q: "Can renters or landlords book an inspection?", a: "Yes. We document what is present and where, from an inspector with no stake in the outcome." },
      { q: "Do you recommend a remediation company?", a: "We tell you exactly what needs fixing and where the moisture is coming from, so you can get fair quotes from any contractor." },
    ],
  },
};

export function getCityServiceOverride(citySlug: string, serviceSlug: string): CityServiceOverride {
  return overrides[`${citySlug}/${serviceSlug}`] ?? {};
}
