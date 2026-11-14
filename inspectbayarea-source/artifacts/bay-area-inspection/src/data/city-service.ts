import { cities, getCity } from "@/data/cities";
import { services, getService } from "@/data/services";
import type { City, CityIssue, CityEra } from "@/data/cities/types";
import type { Service } from "@/data/services/types";

/**
 * City × service intersection pages.
 *
 * "mold inspection san jose" and "home inspection fremont" are real,
 * high-intent searches that neither the city page nor the service page ranks
 * well for on its own. This module builds those pages.
 *
 * The obvious way to do this — take the service copy and find-and-replace the
 * city name 140 times — produces doorway pages, which search engines discount
 * and which are worse than not having the pages at all. So instead every page
 * here is assembled from that city's *own* findings, housing eras and
 * geography, filtered to the ones that actually bear on that service.
 *
 * The filter is the important part: a combination only earns a page when the
 * city has at least MIN_ISSUES genuinely relevant findings. Cities with
 * nothing specific to say about gas leak detection simply do not get a gas
 * leak page, and that is the correct outcome rather than a gap to paper over.
 */

/** A combination needs at least this many city-specific findings to justify a page. */
const MIN_ISSUES = 3;

/**
 * Services that get city pages at all.
 *
 * The home + mold bundle is deliberately excluded: it is a combination offer
 * people choose once they are already deciding, not something anyone searches
 * for by city. Generating 28 "Home + Mold Bundle in <city>" pages would add
 * pages targeting no real demand, which is exactly the failure mode the
 * MIN_ISSUES filter exists to prevent.
 *
 * Gas leak detection is not listed either, but it excludes itself — no city
 * has enough gas-specific findings to clear the threshold, which is the right
 * answer rather than a gap to fill.
 */
const CITY_PAGE_SERVICES = new Set([
  "full-home-inspection",
  "mold-inspection",
  "moisture-water-damage",
]);

/**
 * Terms that mark a city finding as relevant to a given service.
 *
 * Matched against the finding's title and description. Deliberately concrete —
 * these are the words the city data actually uses, not abstract categories.
 */
const RELEVANCE_TERMS: Record<string, string[]> = {
  "mold-inspection": [
    "moisture", "mold", "damp", "humid", "ventilation", "vent", "condensation",
    "water", "leak", "rot", "crawl space", "crawlspace", "fog", "rain",
    "drainage", "irrigation", "bathroom", "attic",
  ],
  "moisture-water-damage": [
    "moisture", "water", "leak", "damp", "drainage", "irrigation", "grading",
    "gutter", "downspout", "rot", "condensation", "rain", "fog", "flood",
    "crawl space", "crawlspace", "roof", "flashing", "bathroom",
  ],
  "gas-leak-detection": [
    "gas", "furnace", "water heater", "appliance", "combustion", "venting",
    "flue", "carbon monoxide", "heating", "stove", "range",
  ],
  // The full inspection covers every system, so every finding is relevant.
  "full-home-inspection": [],
  // The bundle spans structure and moisture both.
  "home-mold-bundle": [],
};

/** Services whose relevance filter accepts everything. */
const COVERS_EVERYTHING = new Set(["full-home-inspection", "home-mold-bundle"]);

function matchesService(text: string, serviceSlug: string): boolean {
  if (COVERS_EVERYTHING.has(serviceSlug)) return true;
  const terms = RELEVANCE_TERMS[serviceSlug];
  if (!terms || terms.length === 0) return false;
  const haystack = text.toLowerCase();
  return terms.some((t) => haystack.includes(t));
}

/** The city's findings that actually bear on this service. */
export function relevantIssues(city: City, serviceSlug: string): CityIssue[] {
  return city.commonIssues.filter((issue) =>
    matchesService(`${issue.title} ${issue.desc}`, serviceSlug),
  );
}

/** The city's housing eras that bear on this service. */
export function relevantEras(city: City, serviceSlug: string): CityEra[] {
  if (COVERS_EVERYTHING.has(serviceSlug)) return city.housingStock.eras;
  return city.housingStock.eras.filter((era) =>
    matchesService(`${era.label} ${era.desc}`, serviceSlug),
  );
}

/** The city's FAQs that bear on this service. */
export function relevantCityFaqs(city: City, serviceSlug: string) {
  if (COVERS_EVERYTHING.has(serviceSlug)) return city.faqs;
  return city.faqs.filter((f) => matchesService(`${f.q} ${f.a}`, serviceSlug));
}

export interface CityServicePage {
  city: City;
  service: Service;
  /** Path segment pair, e.g. ["san-francisco", "mold-inspection"]. */
  citySlug: string;
  serviceSlug: string;
  issues: CityIssue[];
  eras: CityEra[];
  cityFaqs: ReturnType<typeof relevantCityFaqs>;
}

/**
 * Every combination that earns a page.
 *
 * Built once at module load and reused by the router, the page component and
 * the prerenderer, so the three can never disagree about which pages exist.
 */
export const cityServicePages: CityServicePage[] = (() => {
  const out: CityServicePage[] = [];
  for (const city of cities) {
    for (const service of services) {
      if (!CITY_PAGE_SERVICES.has(service.slug)) continue;
      const issues = relevantIssues(city, service.slug);
      if (issues.length < MIN_ISSUES) continue;
      out.push({
        city,
        service,
        citySlug: city.slug,
        serviceSlug: service.slug,
        issues,
        eras: relevantEras(city, service.slug),
        cityFaqs: relevantCityFaqs(city, service.slug),
      });
    }
  }
  return out;
})();

export function getCityServicePage(
  citySlug: string,
  serviceSlug: string,
): CityServicePage | undefined {
  return cityServicePages.find(
    (p) => p.citySlug === citySlug && p.serviceSlug === serviceSlug,
  );
}

/** Which services earned a page in this city — drives links on the city page. */
export function servicesForCity(citySlug: string): CityServicePage[] {
  return cityServicePages.filter((p) => p.citySlug === citySlug);
}

/** Which cities earned a page for this service — drives links on the service page. */
export function citiesForService(serviceSlug: string): CityServicePage[] {
  return cityServicePages.filter((p) => p.serviceSlug === serviceSlug);
}

/**
 * Nearby cities that also have a page for this service, for internal linking.
 * Uses the city's own `nearby` list so the links are geographically sensible.
 */
export function nearbyWithSameService(page: CityServicePage): CityServicePage[] {
  return page.city.nearby
    .map((slug) => getCityServicePage(slug, page.serviceSlug))
    .filter((p): p is CityServicePage => Boolean(p))
    .slice(0, 4);
}

/**
 * The opening paragraph, assembled from this city's actual geography and
 * findings rather than from a template with the name swapped in.
 */
export function buildIntro(page: CityServicePage): string[] {
  const { city, service, issues } = page;
  const lead = issues[0];
  const second = issues[1];

  return [
    `${city.localNote}`,
    `That shapes what a ${service.shortName.toLowerCase()} in ${city.name} actually needs to look for. ${lead.title} is the finding that comes up most often here${second ? `, followed closely by ${second.title.toLowerCase()}` : ""}. Both are specific to how ${city.name} was built and where it sits — not items from a generic checklist.`,
    `${city.housingStock.summary}`,
  ];
}

/** Page title, kept in one place so metadata and H1 cannot drift apart. */
export function pageTitle(page: CityServicePage): string {
  return `${page.service.shortName} in ${page.city.name}, CA`;
}

export function pageDescription(page: CityServicePage): string {
  return `${page.service.shortName} in ${page.city.name}, ${page.city.county}. ${page.issues.length} findings we see most often in ${page.city.name} homes, by a former builder. Free quote, same-day reports.`;
}
