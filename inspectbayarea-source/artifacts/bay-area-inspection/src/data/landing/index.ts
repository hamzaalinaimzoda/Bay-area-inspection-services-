import type { LandingPage } from "./types";
import { LANDING_SLUGS, type LandingSlug } from "./slugs";
import { preListing } from "./pre-listing";
import { manufacturedHome } from "./manufactured-home";
import { adu } from "./adu";
import { newConstruction } from "./new-construction";
import { secondOpinion } from "./second-opinion";
import { postRemediation } from "./post-remediation";
import { olderHome } from "./older-home";

export type { LandingPage } from "./types";
export { LANDING_SLUGS, LANDING_LINKS, NAV_LANDING_LINKS, isLandingSlug, landingLink, type LandingSlug } from "./slugs";

/** Typed against LANDING_SLUGS: a slug without content is a type error. */
const bySlug: Record<LandingSlug, LandingPage> = {
  "pre-listing-inspection": preListing,
  "manufactured-home-inspection": manufacturedHome,
  "adu-inspection": adu,
  "new-construction-inspection": newConstruction,
  "second-opinion-inspection": secondOpinion,
  "post-remediation-mold-inspection": postRemediation,
  "older-home-inspection": olderHome,
};

/** In LANDING_SLUGS order — drives the navbar, footer and pricing page. */
export const landingPages: LandingPage[] = LANDING_SLUGS.map((s) => bySlug[s]);

export function getLandingPage(slug: string): LandingPage | undefined {
  return (bySlug as Record<string, LandingPage>)[slug];
}
