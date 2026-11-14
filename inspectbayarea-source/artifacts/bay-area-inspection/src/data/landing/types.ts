import type { Photo } from "@/data/photos";
import type { LandingSlug } from "./slugs";

/**
 * A single-service landing page: a job type that is sold and priced on its own
 * but booked under an existing service (see data/service-options.ts), so it
 * has no record in data/services.
 */
export interface LandingPage {
  slug: LandingSlug;
  /** Full name, used in schema. The short label and icon live in slugs.ts. */
  name: string;
  seoTitle: string;
  metaDescription: string;
  /** One line for llms.txt. */
  summary: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  image: Photo;
  overviewHeading: string;
  overview: string[];
  /** What the booking card says about the quote. No figures: the site publishes no prices. */
  priceNote: string;
  /** SERVICE_OPTIONS id the booking modal opens with. */
  bookingServiceId: string;
  bookLabel: string;
  includesHeading: string;
  includes: { title: string; desc: string }[];
  /** Free-form sections between "what's included" and the findings. */
  sections: {
    heading: string;
    paragraphs?: string[];
    items?: string[];
    /** "check" for what we do, "cross" for what we don't. */
    itemStyle?: "check" | "cross";
    closing?: string;
  }[];
  findingsHeading: string;
  findings: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
}
