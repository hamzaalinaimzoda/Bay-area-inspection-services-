export const site = {
  name: "Bay Area Inspection Services",
  legalName: "Bay Area Inspection Services LLC",
  phoneDisplay: "(628) 230-0357",
  phoneHref: "tel:6282300357",
  email: "info@inspectbayarea.com",
  /**
   * We are a mobile service-area business — customers are never seen at an
   * office — so no street address is published anywhere on the site or in the
   * structured data. `city` is only used in copy that lists coverage ("we also
   * cover Mountain View, the Peninsula…"), not as a business address.
   */
  city: "Mountain View, CA",
  primaryCity: "San Francisco",
  hours: "Mon–Sat: 8 AM – 8 PM",
  domain: "https://inspectbayarea.com",
  tagline: "We find the damage other inspectors miss.",
  certifications: "InterNACHI Certified · Fully Insured (GL + E&O)",
  /**
   * InterNACHI member ID. Drives the badge verification link, so the seals on
   * the site point at the issuing body's own live record rather than being
   * decorative images anyone could copy.
   */
  nachiId: "NACHI26061702",
  nachiVerifyUrl: "https://www.nachi.org/verify?nachiid=NACHI26061702",
  /**
   * The Google Business Profile rating, shown in place of testimonials.
   *
   * The site previously carried six testimonials with AI-generated client
   * photos; the owner confirmed they were not real clients, and they were
   * removed (fake testimonials are an FTC violation, 16 CFR Part 465). The only
   * social proof now is this rating, which links to Google where visitors can
   * read every review themselves.
   *
   * The homepage reviews section replaces these with live figures from
   * /api/google-reviews once GOOGLE_PLACES_API_KEY is set; they remain the
   * prerendered fallback and what the hero shows, so still update them by hand
   * when they change (checked 2026-09-27). Deliberately no AggregateRating
   * schema: Google treats a business marking up its own reviews as
   * self-serving and ignores it.
   */
  google: {
    rating: "5.0",
    reviewCount: 11,
    reviewsUrl: "https://search.google.com/local/reviews?placeid=ChIJ-xSm-rE4HaoR8MZCAsKKxi8",
    writeReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ-xSm-rE4HaoR8MZCAsKKxi8",
  },
};

export const mainNav = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];
