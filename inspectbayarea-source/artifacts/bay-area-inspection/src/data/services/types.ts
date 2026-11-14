import type { LucideIcon } from "lucide-react";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceIncluded {
  title: string;
  desc: string;
}

/** A named instrument and what it is actually for. */
export interface ServiceEquipment {
  name: string;
  purpose: string;
}

/** A specific defect this service regularly turns up. */
export interface ServiceFinding {
  title: string;
  desc: string;
}

/** Who books this, and what they are trying to decide. */
export interface ServiceAudience {
  who: string;
  need: string;
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  icon: LucideIcon;
  featured: boolean;
  cardImage: string;
  cardImageAlt: string;
  heroImage: string;
  /** Alt for heroImage. Separate from cardImageAlt: they are different photos. */
  heroImageAlt: string;
  metaDescription: string;
  summary: string;
  overview: string[];
  includes: ServiceIncluded[];
  /** Named instruments — competitors list theirs, and it reads as competence. */
  equipment: ServiceEquipment[];
  /** Concrete defects found in the field, not generic reassurance. */
  commonFindings: ServiceFinding[];
  /** Why this service matters specifically in San Francisco, the primary market. */
  sfContext: string[];
  whoItsFor: ServiceAudience[];
  process: { title: string; desc: string }[];
  benefits: string[];
  /**
   * What the booking card and forms say about price. Deliberately no figure:
   * the site does not publish prices (owner's decision, 2026-09-24), so this is
   * a note about how the quote works. The last version that carried numbers is
   * commit c83b8b6 in git history.
   */
  priceNote: string;
  gallery: { src: string; alt: string }[];
  faqs: ServiceFaq[];
  relatedBlog: string[];
}
