/**
 * Typed shortcuts into the shared photo library.
 *
 * The canonical list lives in `images.ts` (and the files in
 * public/images/library/). This module exists so service data can reference a
 * photo by a readable name and get `{ src, alt }` back, without every service
 * file repeating the path convention or duplicating alt text.
 *
 * City pages go through `cityImages.ts` + `imageManifest.ts` instead, because
 * they need the "only render what has actually been added" filtering.
 */

import { getImage } from "@/data/images";

const BASE = import.meta.env.BASE_URL;

export interface Photo {
  src: string;
  alt: string;
}

/** Resolve a library id to a renderable photo. Falls back rather than throwing. */
function pick(id: string, fallbackAlt: string): Photo {
  const meta = getImage(id);
  return {
    src: `${BASE}images/library/${id}.webp`,
    alt: meta?.alt ?? fallbackAlt,
  };
}

export const photos = {
  // Nov 2026: the previous library was 32 generated images of an invented
  // inspector in a branded polo — four different faces, garbled logo. All of it
  // is gone. What is here now is people-free: equipment, conditions and
  // building fabric. Any key whose old photo had no honest replacement points
  // at the nearest truthful subject instead, because the visible caption always
  // comes from the image's own alt text, never from the key name.
  moldExpert: pick("air-quality-sampling", "Air sampling set up indoors"),
  labReport: pick("inspection-tools-kit", "Inspection tools and report clipboard"),
  protectiveSuit: pick("mold-test-kit", "Air sampling cassettes and monitors"),

  foundation: pick("foundation-crack", "Cracked concrete at a building perimeter"),
  crawlspace: pick("crawlspace-inspection", "Crawl space framing and vapor barrier"),
  atticInsulation: pick("attic-insulation-ventilation", "Attic insulation and ventilation"),
  garage: pick("kitchen-electrical", "Interior electrical panel beside a kitchen"),
  landscape: pick("exterior-grading-landscape", "Grading and drainage at a foundation"),
  kitchen: pick("kitchen-interior", "Kitchen counters, cabinets and appliances"),
  newHome: pick("bungalow-craftsman", "Craftsman-style home with a covered entry"),
  window: pick("dry-rot-wood", "Deteriorated wood at exterior window trim"),
  roof: pick("roof-shingles-flashing", "Aged roof shingles and chimney flashing"),
  doorbell: pick("home-entry-exterior", "Covered front entry of a home"),

  electricalOutlet: pick("electrical-panel", "Open residential electrical panel"),
  waterHeater: pick("bathroom-plumbing", "Under-sink plumbing at a vanity"),
  appliance: pick("combustion-appliance", "Furnace and flue connection"),

  thermalMold: pick("thermal-camera-wall", "Thermal imaging camera in use"),
  bathroomLeak: pick("moisture-meter-drywall", "Air monitor and moisture meter"),
  windowCondensation: pick("ceiling-water-stain", "Water staining on a ceiling"),
  dehumidifier: pick("dehumidifier-drying", "Dehumidifier reducing moisture"),

  basementMold: pick("mold-drywall", "Dark staining across an interior wall"),
  crawlspaceMold: pick("crawlspace-moisture", "Damp crawl space over a vapor barrier"),
  carpetMold: pick("gutter-debris", "Debris built up in a roof gutter"),
  hvacMold: pick("mold-prevention-ventilation", "Attic ventilation and ductwork"),
  moldPrevention: pick("attic-blown-insulation", "Blown-in attic insulation"),

  remediationPlan: pick("post-remediation-clearance", "Clearance sampling instruments"),
} as const;

export type PhotoKey = keyof typeof photos;
