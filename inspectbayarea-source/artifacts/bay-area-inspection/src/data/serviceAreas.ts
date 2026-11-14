export const serviceAreaCities = [
  "Palo Alto", "Mountain View", "Los Altos", "Los Altos Hills", "Sunnyvale",
  "Menlo Park", "Redwood City", "East Palo Alto", "Cupertino", "San Jose",
  "Santa Clara", "Atherton", "Portola Valley", "Woodside", "Saratoga",
  "Campbell", "Los Gatos", "Milpitas", "Fremont", "Newark", "Union City",
  "Hayward", "San Mateo", "Belmont", "Foster City",
];

import type { CityRegion } from "./cities/types";

/**
 * Region groupings for the service-areas hub. `name` is typed as CityRegion so
 * it stays in sync with the per-city `region` field — the hub looks up each
 * region's cities from the city data rather than duplicating the list here.
 */
export const serviceAreaRegions: { name: CityRegion; blurb: string; cities: string[] }[] = [
  {
    name: "San Francisco",
    blurb:
      "My primary service area. Victorians and Edwardians, soft-story garages, fog-driven dry rot and unpermitted in-law units — the city's housing needs an inspector who knows its specific failure patterns.",
    cities: ["San Francisco", "Daly City", "South San Francisco"],
  },
  {
    name: "The Peninsula",
    blurb: "Older, high-value housing stock and damp coastal microclimates make thorough inspections essential before any transaction.",
    cities: ["Palo Alto", "Menlo Park", "Atherton", "Redwood City", "San Mateo", "Belmont", "Foster City", "Woodside", "Portola Valley", "East Palo Alto"],
  },
  {
    name: "South Bay",
    blurb: "Fast-moving, competitive markets where same-day reports keep your contingency window on track.",
    cities: ["Mountain View", "Los Altos", "Los Altos Hills", "Sunnyvale", "Cupertino", "San Jose", "Santa Clara", "Saratoga", "Campbell", "Los Gatos"],
  },
  {
    name: "East Bay",
    blurb: "A wide mix of property ages and styles — from new builds to century-old homes that need an expert eye.",
    cities: ["Fremont", "Newark", "Union City", "Hayward", "Milpitas"],
  },
];
