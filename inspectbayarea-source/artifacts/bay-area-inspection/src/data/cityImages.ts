/**
 * Which six library images each city page shows.
 *
 * Assignments start from that city's own housing eras and common findings, then
 * top up deterministically from the available pool so every city gets a full
 * six without 28 hand-maintained lists. The hash is on the slug, so a city
 * always renders the same photos and the prerendered HTML is stable between
 * builds.
 *
 * Images are deliberately reused across cities: an inspector in a Campbell
 * crawl space is indistinguishable from one in Santa Clara, and buying 168
 * unique photos would be waste.
 *
 * Remediation shots are excluded here on purpose — we are inspection-only and
 * should not imply we perform remediation work.
 *
 * Ids must exist in images.ts AND have a file in public/images/library/;
 * city-detail filters against imageManifest.ts so anything missing simply does
 * not render.
 */

export const cityImageIds: Record<string, string[]> = {
  "san-francisco": [
    "foundation-crack",
    "crawlspace-inspection",
    "air-quality-sampling",
    "mold-prevention-ventilation",
    "mold-test-kit",
    "attic-blown-insulation",
  ],
  "daly-city": [
    "mold-drywall",
    "thermal-camera-wall",
    "mold-test-kit",
    "electrical-panel",
    "bathroom-plumbing",
    "gutter-debris",
  ],
  "south-san-francisco": [
    "foundation-crack",
    "moisture-meter-drywall",
    "exterior-grading-landscape",
    "roof-shingles-flashing",
    "attic-insulation-ventilation",
    "dry-rot-wood",
  ],
  "palo-alto": [
    "thermal-camera-wall",
    "home-entry-exterior",
    "crawlspace-inspection",
    "air-quality-sampling",
    "roof-shingles-flashing",
    "foundation-crack",
  ],
  "menlo-park": [
    "crawlspace-moisture",
    "thermal-camera-wall",
    "dehumidifier-drying",
    "home-entry-exterior",
    "exterior-grading-landscape",
    "inspection-tools-kit",
  ],
  "atherton": [
    "thermal-camera-wall",
    "mold-test-kit",
    "electrical-panel",
    "moisture-meter-drywall",
    "mold-drywall",
    "roof-shingles-flashing",
  ],
  "redwood-city": [
    "foundation-crack",
    "crawlspace-moisture",
    "thermal-camera-wall",
    "moisture-meter-drywall",
    "mold-drywall",
    "roof-shingles-flashing",
  ],
  "san-mateo": [
    "crawlspace-moisture",
    "attic-insulation-ventilation",
    "thermal-camera-wall",
    "mold-prevention-ventilation",
    "post-remediation-clearance",
    "dehumidifier-drying",
  ],
  "belmont": [
    "air-quality-sampling",
    "mold-prevention-ventilation",
    "mold-drywall",
    "combustion-appliance",
    "attic-framing",
    "electrical-panel-interior",
  ],
  "foster-city": [
    "foundation-crack",
    "moisture-meter-drywall",
    "mold-drywall",
    "combustion-appliance",
    "crawlspace-moisture",
    "electrical-panel",
  ],
  "woodside": [
    "mold-test-kit",
    "electrical-panel",
    "electrical-panel-exterior",
    "bathroom-plumbing",
    "gutter-debris",
    "ceiling-water-stain",
  ],
  "portola-valley": [
    "foundation-crack",
    "attic-insulation-ventilation",
    "thermal-camera-wall",
    "dry-rot-wood",
    "combustion-appliance",
    "mold-prevention-ventilation",
  ],
  "east-palo-alto": [
    "electrical-panel",
    "crawlspace-moisture",
    "mold-drywall",
    "thermal-camera-wall",
    "kitchen-interior",
    "kitchen-electrical",
  ],
  "fremont": [
    "crawlspace-inspection",
    "air-quality-sampling",
    "mold-prevention-ventilation",
    "mold-drywall",
    "roof-shingles-flashing",
    "foundation-crack",
  ],
  "newark": [
    "thermal-camera-wall",
    "mold-test-kit",
    "electrical-panel",
    "inspection-tools-kit",
    "kitchen-interior",
    "kitchen-electrical",
  ],
  "union-city": [
    "crawlspace-moisture",
    "foundation-crack",
    "gutter-debris",
    "ceiling-water-stain",
    "bungalow-craftsman",
    "crawlspace-inspection",
  ],
  "hayward": [
    "moisture-meter-drywall",
    "exterior-grading-landscape",
    "attic-blown-insulation",
    "attic-framing",
    "electrical-panel-interior",
    "electrical-panel-exterior",
  ],
  "milpitas": [
    "moisture-meter-drywall",
    "exterior-grading-landscape",
    "attic-insulation-ventilation",
    "mold-test-kit",
    "attic-blown-insulation",
    "attic-framing",
  ],
  "mountain-view": [
    "electrical-panel",
    "moisture-meter-drywall",
    "crawlspace-moisture",
    "foundation-crack",
    "attic-insulation-ventilation",
    "dry-rot-wood",
  ],
  "los-altos": [
    "attic-insulation-ventilation",
    "electrical-panel",
    "exterior-grading-landscape",
    "mold-prevention-ventilation",
    "post-remediation-clearance",
    "dehumidifier-drying",
  ],
  "los-altos-hills": [
    "thermal-camera-wall",
    "mold-test-kit",
    "electrical-panel",
    "post-remediation-clearance",
    "dehumidifier-drying",
    "home-entry-exterior",
  ],
  "sunnyvale": [
    "moisture-meter-drywall",
    "exterior-grading-landscape",
    "roof-shingles-flashing",
    "foundation-crack",
    "attic-insulation-ventilation",
    "dry-rot-wood",
  ],
  "cupertino": [
    "moisture-meter-drywall",
    "exterior-grading-landscape",
    "home-entry-exterior",
    "inspection-tools-kit",
    "kitchen-interior",
    "kitchen-electrical",
  ],
  "san-jose": [
    "foundation-crack",
    "moisture-meter-drywall",
    "exterior-grading-landscape",
    "electrical-panel",
    "thermal-camera-wall",
    "mold-drywall",
  ],
  "santa-clara": [
    "foundation-crack",
    "mold-drywall",
    "crawlspace-moisture",
    "kitchen-interior",
    "kitchen-electrical",
    "air-quality-sampling",
  ],
  "saratoga": [
    "electrical-panel",
    "crawlspace-moisture",
    "foundation-crack",
    "dehumidifier-drying",
    "home-entry-exterior",
    "exterior-grading-landscape",
  ],
  "campbell": [
    "exterior-grading-landscape",
    "attic-insulation-ventilation",
    "electrical-panel-interior",
    "electrical-panel-exterior",
    "bathroom-plumbing",
    "gutter-debris",
  ],
  "los-gatos": [
    "moisture-meter-drywall",
    "exterior-grading-landscape",
    "attic-insulation-ventilation",
    "combustion-appliance",
    "mold-prevention-ventilation",
    "post-remediation-clearance",
  ],
};
