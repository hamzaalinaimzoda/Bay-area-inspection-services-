import type { City, CityRegion } from "./types";
import { sanFranciscoCities } from "./san-francisco";
import { peninsulaCities } from "./peninsula";
import { southBayCities } from "./south-bay";
import { eastBayCities } from "./east-bay";

export type { City, CityRegion, CityEra, CityIssue, CityFaq } from "./types";

/**
 * All service-area cities. San Francisco leads because it is the primary
 * market — this ordering drives the service-areas hub and the sitemap.
 */
export const cities: City[] = [
  ...sanFranciscoCities,
  ...peninsulaCities,
  ...southBayCities,
  ...eastBayCities,
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCitiesByRegion(region: CityRegion): City[] {
  return cities.filter((c) => c.region === region);
}

/** Resolve a `nearby` slug list to full city records, dropping any that no longer exist. */
export function getNearbyCities(city: City): City[] {
  return city.nearby
    .map((slug) => getCity(slug))
    .filter((c): c is City => Boolean(c));
}

export const cityRegions: CityRegion[] = [
  "San Francisco",
  "The Peninsula",
  "South Bay",
  "East Bay",
];
