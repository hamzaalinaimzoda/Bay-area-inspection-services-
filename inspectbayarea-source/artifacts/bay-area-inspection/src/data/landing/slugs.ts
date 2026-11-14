import { Tag, Caravan, HousePlus, HardHat, FileSearch, ShieldCheck, Landmark, type LucideIcon } from "lucide-react";

/**
 * The single-service landing pages (served at /<slug>), with the label and
 * icon the navbar and footer show for each.
 *
 * Kept apart from the page content on purpose: the router, lazy.ts, the navbar
 * and the footer only need this much, and importing the content there would
 * put every landing page's copy into the bundle that all visitors download.
 * index.ts is typed against this list, so a slug without content fails the
 * type check rather than shipping a broken page.
 */
export const LANDING_LINKS = [
  { slug: "pre-listing-inspection", label: "Pre-Listing Inspection", icon: Tag },
  { slug: "manufactured-home-inspection", label: "Mobile Home Inspection", icon: Caravan },
  { slug: "adu-inspection", label: "ADU Inspection", icon: HousePlus },
  { slug: "new-construction-inspection", label: "New Construction Inspection", icon: HardHat },
  { slug: "second-opinion-inspection", label: "Second-Opinion Inspection", icon: FileSearch },
  { slug: "post-remediation-mold-inspection", label: "Post-Remediation Mold Check", icon: ShieldCheck },
  { slug: "older-home-inspection", label: "Older Home Inspection", icon: Landmark },
] as const satisfies readonly { slug: string; label: string; icon: LucideIcon }[];

export type LandingSlug = (typeof LANDING_LINKS)[number]["slug"];

export const LANDING_SLUGS: LandingSlug[] = LANDING_LINKS.map((l) => l.slug);

/**
 * Landing pages that describe a situation rather than a kind of job — a buyer
 * holding the seller's report, a remediation just finished, a pre-war house.
 * People arrive at these from search and from the pages that link to them, so
 * they are routed and listed in the footer but left out of the navbar's
 * Services menu, which with them would run past the bottom of a laptop screen.
 */
const SITUATIONAL_SLUGS: readonly LandingSlug[] = [
  "second-opinion-inspection",
  "post-remediation-mold-inspection",
  "older-home-inspection",
];

export const NAV_LANDING_LINKS = LANDING_LINKS.filter((l) => !SITUATIONAL_SLUGS.includes(l.slug));

export function isLandingSlug(s: string): s is LandingSlug {
  return (LANDING_SLUGS as string[]).includes(s);
}

export function landingLink(slug: LandingSlug) {
  return LANDING_LINKS.find((l) => l.slug === slug)!;
}
