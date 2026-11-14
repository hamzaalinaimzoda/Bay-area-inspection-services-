/**
 * City landing pages.
 *
 * Every field below is deliberately required. These pages only earn their place
 * in the index if each one says something a homeowner in *that* city could not
 * get from any of the other 24 — near-duplicate location pages get filtered by
 * search engines and are worse than having no city pages at all. Housing stock,
 * common findings, neighbourhoods and FAQs must all be genuinely local.
 */

export interface CityEra {
  /** e.g. "1950s–60s tract" */
  label: string;
  /** What an inspector actually finds in homes of this era, in this city. */
  desc: string;
}

export interface CityIssue {
  title: string;
  desc: string;
}

export interface CityFaq {
  q: string;
  a: string;
}

export type CityRegion = "San Francisco" | "The Peninsula" | "South Bay" | "East Bay";

export interface City {
  slug: string;
  name: string;
  county: string;
  region: CityRegion;
  /** Shown under the H1. One line, specific to the city. */
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  /** 2–3 paragraphs of city-specific context. */
  intro: string[];
  housingStock: {
    summary: string;
    eras: CityEra[];
  };
  /** 4–5 findings that are disproportionately common in this city. */
  commonIssues: CityIssue[];
  /** Real neighbourhoods / districts. */
  neighborhoods: string[];
  /** One distinctive geographic, geologic or climate factor. */
  localNote: string;
  faqs: CityFaq[];
  /** Slugs of nearby cities, for internal linking. */
  nearby: string[];
}
