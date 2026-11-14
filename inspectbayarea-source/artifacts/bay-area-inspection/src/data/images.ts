/**
 * Licensed photo library.
 *
 * Each entry describes one image to be licensed from a stock provider and
 * dropped into `public/images/library/<id>.webp`. `shotList` is the search
 * brief used to source it — keep it here so the next person buying images
 * knows exactly what each slot is meant to show.
 *
 * Nothing renders until the file actually exists: `scripts/sync-image-library.mjs`
 * scans the folder and regenerates `imageManifest.ts`, and the city galleries
 * filter against that. So this file can list images we have not bought yet
 * without shipping broken <img> tags.
 */

export type ImageCategory = "architecture" | "technical" | "people";

export interface LibraryImage {
  /** Also the filename: public/images/library/<id>.webp */
  id: string;
  /** Written for screen readers and for the alt-text SEO signal. */
  alt: string;
  category: ImageCategory;
  /** What to search for / what the shot must show. */
  shotList: string;
}

export const imageLibrary: LibraryImage[] = [
  // ---------------------------------------------------------------- architecture
  {
    id: "sf-victorian-row",
    alt: "Row of Victorian and Edwardian houses on a San Francisco street",
    category: "architecture",
    shotList:
      "San Francisco Victorian / Edwardian row houses, colourful painted facades, steep street. Daylight, no heavy filters.",
  },
  {
    id: "sf-bay-window",
    alt: "Bay window and facade detail on a San Francisco Edwardian home",
    category: "architecture",
    shotList:
      "Close-ish exterior of a San Francisco bay window and stucco/wood facade, showing trim and paint condition.",
  },
  {
    id: "soft-story-garage",
    alt: "Home with a wide ground-floor garage opening beneath living space",
    category: "architecture",
    shotList:
      "House with a wide ground-floor garage opening directly under the living floor above — the soft-story configuration. Street view.",
  },
  {
    id: "fog-coastal-street",
    alt: "Coastal residential street under fog",
    category: "architecture",
    shotList:
      "Residential street in coastal fog / marine layer, damp pavement, attached or near-attached homes.",
  },
  {
    id: "eichler-midcentury",
    alt: "Mid-century post-and-beam home with a low-slope roof",
    category: "architecture",
    shotList:
      "Eichler-style mid-century modern home: flat or low-slope roof, post-and-beam, vertical siding, carport. Exterior.",
  },
  {
    id: "eichler-glass-atrium",
    alt: "Floor-to-ceiling glass wall in a mid-century home interior",
    category: "architecture",
    shotList:
      "Mid-century modern interior with floor-to-ceiling single-pane glass wall or atrium, exposed beams.",
  },
  {
    id: "ranch-1950s",
    alt: "Single-storey 1950s ranch home",
    category: "architecture",
    shotList:
      "1950s–60s single-storey ranch house, long low roofline, attached garage, mature front landscaping.",
  },
  {
    id: "postwar-tract-street",
    alt: "Street of post-war tract homes",
    category: "architecture",
    shotList:
      "Street of similar post-war tract houses, 1950s–70s suburban California. Wide shot.",
  },
  {
    id: "hillside-home",
    alt: "Home built on a sloped hillside lot",
    category: "architecture",
    shotList:
      "House on a sloped lot with stepped foundation and/or retaining wall visible below it.",
  },
  {
    id: "waterfront-lagoon-home",
    alt: "Waterfront home backing onto a lagoon",
    category: "architecture",
    shotList:
      "Suburban home backing directly onto a lagoon or canal, with a dock, bulkhead or waterside deck.",
  },
  {
    id: "rural-acreage",
    alt: "Rural property on wooded acreage with a private drive",
    category: "architecture",
    shotList:
      "Rural / semi-rural property on wooded acreage, long private driveway, oaks. No livestock needed.",
  },
  {
    id: "condo-townhome",
    alt: "Modern townhome and condominium building",
    category: "architecture",
    shotList:
      "Recent multi-storey townhome / condominium exterior with elevated balconies.",
  },
  {
    id: "victorian-downtown",
    alt: "Restored Victorian home in an older downtown neighborhood",
    category: "architecture",
    shotList:
      "Older restored Victorian or Craftsman home on a tree-lined street in a small California downtown.",
  },
  {
    id: "two-story-rebuild",
    alt: "Newly built two-storey home on an established street",
    category: "architecture",
    shotList:
      "Large recently built two-storey house on an established suburban street — the teardown-rebuild look.",
  },
  {
    id: "spanish-tudor",
    alt: "1920s Spanish Revival home with stucco and tile roof",
    category: "architecture",
    shotList:
      "1920s–30s Spanish Revival or Tudor home: stucco walls, clay tile or steep roof, arched entry.",
  },
  {
    id: "bungalow-craftsman",
    alt: "Craftsman-style home with a covered entry and attached garage",
    category: "architecture",
    shotList:
      "1920s Craftsman bungalow, low-pitch gable, tapered porch columns, wood siding.",
  },
  {
    id: "wooded-canopy-home",
    alt: "Home beneath heavy oak and redwood canopy",
    category: "architecture",
    shotList:
      "House under dense mature tree canopy, branches over the roof, debris in gutters/valleys if possible.",
  },

  // ------------------------------------------------------------------- technical
  {
    id: "crawlspace-inspection",
    alt: "Crawl space with floor joists, a support pier, plumbing and a vapor barrier",
    category: "technical",
    shotList:
      "Inspector in a crawl space with a light, looking at floor framing. Real crawl space, not staged studio.",
  },
  {
    id: "crawlspace-moisture",
    alt: "Damp crawl space with exposed soil and a vapor barrier",
    category: "technical",
    shotList:
      "Damp crawl space: bare or partly covered soil, plastic vapor barrier, visible moisture staining on joists.",
  },
  {
    id: "electrical-panel",
    alt: "Open residential electrical panel with circuit breakers",
    category: "technical",
    shotList:
      "Open NORTH AMERICAN residential breaker panel — vertical bus, US-style breakers. Avoid European DIN-rail panels.",
  },
  {
    id: "knob-tube-wiring",
    alt: "Original knob-and-tube wiring in an attic",
    category: "technical",
    shotList:
      "Old knob-and-tube or cloth-sheathed wiring running through attic framing.",
  },
  {
    id: "thermal-camera-wall",
    alt: "Thermal imaging camera and work light set up in an attic",
    category: "technical",
    shotList:
      "Hand holding a thermal imaging camera up to an interior wall or ceiling, screen visible.",
  },
  {
    id: "thermal-image-moisture",
    alt: "Thermal camera screen showing a cold moisture pattern behind a wall",
    category: "technical",
    shotList:
      "Thermal/infrared image showing a distinct cool moisture plume on a wall or ceiling.",
  },
  {
    id: "moisture-meter-drywall",
    alt: "Indoor air quality monitor and moisture meter on a table",
    category: "technical",
    shotList:
      "Pin or pinless moisture meter held against drywall or baseboard, reading visible on the display.",
  },
  {
    id: "mold-drywall",
    alt: "Dark staining across an interior wall with moisture testing equipment alongside",
    category: "technical",
    shotList:
      "REAL mold growth on drywall, behind baseboard or in a corner — organic, irregular, water-stained. Not a dark painted blob.",
  },
  {
    id: "roof-shingles-flashing",
    alt: "Aged roof shingles meeting a brick chimney at the flashing",
    category: "technical",
    shotList:
      "Roof surface with flashing at a wall or chimney transition; visible wear, granule loss or lifted shingles.",
  },
  {
    id: "foundation-crack",
    alt: "Cracked concrete at the perimeter of a building",
    category: "technical",
    shotList:
      "Crack in a concrete foundation or stem wall, ideally with a crack gauge or scale for reference.",
  },
  {
    id: "cripple-wall-retrofit",
    alt: "Cripple wall with seismic bracing and foundation anchor bolts",
    category: "technical",
    shotList:
      "Short cripple wall under a house showing plywood shear bracing and/or anchor bolts — seismic retrofit work.",
  },
  {
    id: "galvanized-pipe-corrosion",
    alt: "Corroded galvanized supply pipe",
    category: "technical",
    shotList:
      "Old galvanised steel supply piping with corrosion, ideally a cut section showing the narrowed interior.",
  },
  {
    id: "sewer-scope-camera",
    alt: "Sewer scope camera being fed into a lateral line",
    category: "technical",
    shotList:
      "Drain/sewer inspection camera reel being fed into a clean-out, or a monitor showing pipe interior with root intrusion.",
  },
  {
    id: "water-heater-strapping",
    alt: "Water heater with seismic strapping and connections",
    category: "technical",
    shotList:
      "Residential tank water heater showing seismic straps, TPR valve and flue connection.",
  },
  {
    id: "attic-insulation-ventilation",
    alt: "Attic insulation and roof ventilation",
    category: "technical",
    shotList:
      "Attic interior: batt or blown insulation between joists, roof sheathing and a vent visible.",
  },
  {
    id: "deck-ledger-post",
    alt: "Elevated deck framing, ledger attachment and post base",
    category: "technical",
    shotList:
      "Underside of an elevated deck: ledger board against the house, posts and metal post bases at grade.",
  },
  {
    id: "retaining-wall-drainage",
    alt: "Retaining wall on a sloped lot with drainage provisions",
    category: "technical",
    shotList:
      "Residential retaining wall on a slope, ideally showing weep holes, drainage, or visible tilt/cracking.",
  },
  {
    id: "septic-access",
    alt: "Septic tank access lid in a rural yard",
    category: "technical",
    shotList:
      "Septic tank access lid / riser open or exposed in a rural yard, or a leach field area.",
  },
  {
    id: "masonry-chimney",
    alt: "Unreinforced masonry chimney above a roofline",
    category: "technical",
    shotList:
      "Brick masonry chimney above a roofline, showing mortar joints, cracking or separation from the structure.",
  },
  {
    id: "window-condensation",
    alt: "Condensation on single-pane window glass",
    category: "technical",
    shotList:
      "Heavy condensation on single-pane glass, water pooling on the sill, possible mold at the frame.",
  },
  {
    id: "slab-floor-moisture",
    alt: "Moisture damage at floor level on a slab-on-grade home",
    category: "technical",
    shotList:
      "Flooring lifting or baseboard damage at slab level from moisture transmission.",
  },
  {
    id: "dry-rot-wood",
    alt: "Peeling paint and deteriorated wood at exterior window trim",
    category: "technical",
    shotList:
      "Dry rot / wood decay in exterior trim, siding, window sill or deck board — soft crumbling fibres, paint failure.",
  },
  {
    id: "stucco-wall-detail",
    alt: "Stucco wall with cracking and staining",
    category: "technical",
    shotList:
      "Exterior stucco showing cracking, staining or damage at a window or wall junction.",
  },

  {
    id: "gas-meter-exterior",
    alt: "Exterior residential gas meter and shut-off valve",
    category: "technical",
    shotList:
      "Exterior residential gas meter with piping and shut-off valve against a house wall.",
  },
  {
    id: "gas-line-connection",
    alt: "Gas line connection at an appliance",
    category: "technical",
    shotList:
      "Gas supply line and flexible connector at a water heater, furnace or range — fitting clearly visible.",
  },
  {
    id: "combustion-appliance",
    alt: "Furnace and flue connection in a utility space",
    category: "technical",
    shotList:
      "Residential furnace or wall heater with flue/vent connection, in a closet, garage or utility space.",
  },

  // ---------------------------------------------------------------------- people
  {
    id: "inspector-client-report",
    alt: "Inspector reviewing findings with a homeowner",
    category: "people",
    shotList:
      "Inspector going through a report with a client at a kitchen table or on site. Natural, not stock-cheesy.",
  },
  {
    id: "inspector-tablet-report",
    alt: "Inspector recording findings on a tablet during an inspection",
    category: "people",
    shotList:
      "Inspector holding a tablet or clipboard on site, mid-inspection. Daylight, working clothes, no hard hat cliché.",
  },
  // ------------------------------------------------- owned photography (2026-08)
  // Shot for us: branded uniforms, real equipment. These replaced the earlier
  // AI-generated set across the whole site.
  {
    id: "inspector-portrait",
    alt: "Alex outside a home with his inspection case",
    category: "people",
    shotList: "Owned. Inspector in branded polo holding an inspection case, residential exterior behind.",
  },
  {
    id: "inspector-protective-gear",
    alt: "Inspector in protective coveralls and respirator preparing for a mold assessment",
    category: "people",
    shotList: "Owned. Inspector suited up in PPE before entering a contaminated area.",
  },
  {
    id: "attic-mold-growth",
    alt: "Mold growth on attic sheathing and framing discovered during inspection",
    category: "technical",
    shotList: "Owned. Dark fungal growth across attic roof sheathing and rafters.",
  },
  {
    id: "carpet-mold-growth",
    alt: "Mold growth beneath carpet and padding from prolonged moisture",
    category: "technical",
    shotList: "Owned. Carpet lifted to reveal staining and growth on padding and subfloor.",
  },
  {
    id: "hvac-duct-mold",
    alt: "Mold contamination inside HVAC ductwork and air handling equipment",
    category: "technical",
    shotList: "Owned. Interior of ductwork or air handler showing contamination.",
  },
  {
    id: "mold-prevention-ventilation",
    alt: "Attic ventilation riser and insulated ductwork",
    category: "technical",
    shotList: "Owned. Exhaust ventilation and moisture control in place.",
  },
  {
    id: "mold-containment-work",
    alt: "Containment and remediation work underway in a mold-affected area",
    category: "technical",
    shotList: "Owned. Plastic containment sheeting and remediation setup. Context only — we are inspection-only.",
  },
  {
    id: "post-remediation-clearance",
    alt: "Air sampling instruments and culture plates set up for clearance testing",
    category: "technical",
    shotList: "Owned. Clearance sampling after remediation is complete.",
  },
  {
    id: "negative-air-machine",
    alt: "Negative air machine maintaining containment during remediation",
    category: "technical",
    shotList: "Owned. Negative air unit and ducting inside a containment area.",
  },
  {
    id: "hepa-containment-equipment",
    alt: "HEPA vacuum equipment used in mold containment and cleanup",
    category: "technical",
    shotList: "Owned. HEPA vacuum and containment equipment on site.",
  },
  {
    id: "dehumidifier-drying",
    alt: "Dehumidifier running to reduce moisture in an affected room",
    category: "technical",
    shotList: "Owned. Dehumidifier operating in a damp room.",
  },
  {
    id: "home-entry-exterior",
    alt: "Covered front entry and porch of a home at dusk",
    category: "architecture",
    shotList: "Owned. Front entry, door and doorbell detail at a residential property.",
  },
  {
    id: "driveway-site-drainage",
    alt: "Inspector examining driveway paving and site drainage at a property",
    category: "architecture",
    shotList: "Owned. Driveway surface and how water moves across the site.",
  },
  {
    id: "property-fence-boundary",
    alt: "Inspector checking a property fence and boundary structure",
    category: "architecture",
    shotList: "Owned. Fence line and boundary condition.",
  },
  {
    id: "garage-interior",
    alt: "Inspector assessing a residential garage interior and structure",
    category: "architecture",
    shotList: "Owned. Garage interior — the space most often converted without permit.",
  },
  {
    id: "exterior-grading-landscape",
    alt: "Side wall, gutters and exposed foundation at ground level",
    category: "architecture",
    shotList: "Owned. Grading and landscape drainage at the foundation.",
  },
  {
    id: "interior-staircase",
    alt: "Inspector inspecting interior staircase treads, railings and safety",
    category: "technical",
    shotList: "Owned. Staircase treads, rise/run and handrail condition.",
  },
  {
    id: "window-frame-seal",
    alt: "Inspector examining a window frame, seal and operation",
    category: "technical",
    shotList: "Owned. Window frame, seal and operation being checked.",
  },
  // ------------------------------------------------- illustrative scene library
  // Added Nov 2026 with the replacement photo set. These are illustrative
  // scenes — equipment, conditions and building fabric with nobody in frame.
  // They are NOT photographs of our own inspections and must never be captioned
  // as evidence of a specific job. Real job photos live in the sample report.
  {
    id: "inspection-tools-kit",
    alt: "Inspection tools and a report clipboard laid out at a property",
    category: "technical",
    shotList: "Flashlight, meters, hard case and clipboard staged outside a home. No people.",
  },
  {
    id: "kitchen-interior",
    alt: "Kitchen counters, cabinets and appliances",
    category: "technical",
    shotList: "Kitchen interior showing counters, cabinetry and appliances.",
  },
  {
    id: "kitchen-electrical",
    alt: "Interior electrical panel opened beside a kitchen",
    category: "technical",
    shotList: "Breaker panel mounted in a kitchen or adjoining wall, cover open.",
  },
  {
    id: "air-quality-sampling",
    alt: "Indoor air sampling pump and tripod set up in a living area",
    category: "technical",
    shotList: "Air sampling pump on a tripod with cassettes, in a furnished room.",
  },
  {
    id: "mold-test-kit",
    alt: "Air sampling cassettes, culture plates and monitors on a table",
    category: "technical",
    shotList: "Sampling consumables and handheld monitors laid out indoors.",
  },
  {
    id: "attic-blown-insulation",
    alt: "Blown-in insulation between attic joists",
    category: "technical",
    shotList: "Loose-fill insulation across an attic floor, rafters above.",
  },
  {
    id: "attic-framing",
    alt: "Attic roof framing with inspection equipment in the foreground",
    category: "technical",
    shotList: "Exposed rafters and sheathing, work light and meter in frame.",
  },
  {
    id: "electrical-panel-interior",
    alt: "Open electrical distribution panel with test equipment alongside",
    category: "technical",
    shotList: "Interior distribution panel, cover off, multimeter and tools nearby.",
  },
  {
    id: "electrical-panel-exterior",
    alt: "Exterior electrical cabinet opened for inspection",
    category: "technical",
    shotList: "Exterior-mounted panel on a stucco wall, door open, tools below.",
  },
  {
    id: "bathroom-plumbing",
    alt: "Under-sink plumbing at a bathroom vanity",
    category: "technical",
    shotList: "P-trap and supply lines under an open bathroom vanity.",
  },
  {
    id: "gutter-debris",
    alt: "Leaves and debris built up in a roof gutter",
    category: "technical",
    shotList: "Gutter run packed with leaf litter, seen from above.",
  },
  {
    id: "ceiling-water-stain",
    alt: "Water staining on a bathroom ceiling near a shower",
    category: "technical",
    shotList: "Brown ring staining on ceiling drywall above a shower or tub.",
  },
];

export function getImage(id: string): LibraryImage | undefined {
  return imageLibrary.find((i) => i.id === id);
}
