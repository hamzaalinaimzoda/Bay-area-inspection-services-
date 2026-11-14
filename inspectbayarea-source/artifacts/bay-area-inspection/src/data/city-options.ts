/**
 * Lightweight booking dropdown data. Keep order and values identical to the
 * city catalog; prerender.mjs validates this before emitting a production build.
 * Do not import the rich catalog here: its findings/FAQs are unused by the form.
 */
export const cityOptions = [
  { slug: "san-francisco", name: "San Francisco" },
  { slug: "daly-city", name: "Daly City" },
  { slug: "south-san-francisco", name: "South San Francisco" },
  { slug: "palo-alto", name: "Palo Alto" },
  { slug: "menlo-park", name: "Menlo Park" },
  { slug: "atherton", name: "Atherton" },
  { slug: "redwood-city", name: "Redwood City" },
  { slug: "san-mateo", name: "San Mateo" },
  { slug: "belmont", name: "Belmont" },
  { slug: "foster-city", name: "Foster City" },
  { slug: "woodside", name: "Woodside" },
  { slug: "portola-valley", name: "Portola Valley" },
  { slug: "east-palo-alto", name: "East Palo Alto" },
  { slug: "mountain-view", name: "Mountain View" },
  { slug: "los-altos", name: "Los Altos" },
  { slug: "los-altos-hills", name: "Los Altos Hills" },
  { slug: "sunnyvale", name: "Sunnyvale" },
  { slug: "cupertino", name: "Cupertino" },
  { slug: "san-jose", name: "San Jose" },
  { slug: "santa-clara", name: "Santa Clara" },
  { slug: "saratoga", name: "Saratoga" },
  { slug: "campbell", name: "Campbell" },
  { slug: "los-gatos", name: "Los Gatos" },
  { slug: "fremont", name: "Fremont" },
  { slug: "newark", name: "Newark" },
  { slug: "union-city", name: "Union City" },
  { slug: "hayward", name: "Hayward" },
  { slug: "milpitas", name: "Milpitas" },
];
