import type { City } from "./types";

/**
 * San Francisco is the primary market, so this page runs deeper than the other
 * city pages: more housing eras, more findings, and FAQs covering the city's
 * own requirements (soft-story retrofit program, 3R report, sewer lateral
 * compliance) that simply do not exist elsewhere in the Bay Area.
 */
export const sanFranciscoCities: City[] = [
  {
    slug: "san-francisco",
    name: "San Francisco",
    county: "City and County of San Francisco",
    region: "San Francisco",
    heroSubtitle:
      "Victorians, Edwardians, soft-story garages and in-law units — inspected by a former builder who knows what this city hides.",
    metaTitle: "Home & Mold Inspection in San Francisco, CA",
    metaDescription:
      "Certified home and mold inspection in San Francisco. Victorian and Edwardian specialist — soft-story, dry rot, in-law units, liquefaction zones. Same-day reports.",
    intro: [
      "San Francisco is the hardest housing stock in the Bay Area to inspect well, and the least forgiving of a generic checklist. Most of the city was rebuilt in a rush after 1906, on lots that are narrow, attached, and steep, using construction practices that no longer exist. Almost every building has been altered since, and much of that work never saw a permit.",
      "Four things drive nearly every San Francisco inspection: soft-story ground floors where a garage opening sits under living space, dry rot driven by fog and wind-driven rain, unpermitted in-law units carved out of ground floors and garages, and where the building sits relative to the city's liquefaction zones. Those are what I go looking for, in that order.",
      "I inspect across the whole city — from Edwardian flats in the Richmond and Sunset to Victorians in Noe Valley and the Mission, to newer condos in SOMA, Mission Bay and Dogpatch. Same-day reports, because San Francisco contingency windows are short and often waived under pressure.",
    ],
    housingStock: {
      summary:
        "A small stock of pre-1906 Victorians that survived the fire, a very large post-1906 Edwardian rebuild, 1920s–40s Mediterranean and Marina-style rowhouses across the western neighbourhoods, post-war infill, and modern condo and loft construction east of downtown.",
      eras: [
        {
          label: "Pre-1906 Victorians",
          desc: "Italianate, Stick and Queen Anne homes concentrated in areas the fire missed — Alamo Square, the Haight, parts of Noe Valley, the Mission and Pacific Heights. Expect brick or unreinforced rubble foundations, unbraced cripple walls, knob-and-tube remnants, original clay sewer laterals, and decades of layered alteration.",
        },
        {
          label: "1906–1920s Edwardian rebuild",
          desc: "The largest share of the city's housing, built fast during reconstruction. Common findings are ground-floor garage openings creating soft-story conditions, original single-pane wood windows, dry rot at light wells and bay windows, and shared party walls with the neighbouring building.",
        },
        {
          label: "1920s–40s Mediterranean & Marina-style",
          desc: "Dominant through the Sunset, Richmond and Marina. Stucco over wood framing with limited drainage plane behind it, tunnel entrances, and ground-floor garages beneath living space are the recurring pattern.",
        },
        {
          label: "Post-war & mid-century infill",
          desc: "Scattered through the outer neighbourhoods and along the southern edge. Galvanised supply piping, cast-iron waste, undersized electrical services and original windows are typical.",
        },
        {
          label: "1990s–present condos & lofts",
          desc: "SOMA, Mission Bay, Dogpatch and Hayes Valley. Priorities shift to balcony and deck waterproofing, window-wall assemblies, unit-boundary systems, and moisture crossing from shared construction.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Soft-story ground floors",
        desc: "A garage opening beneath living space leaves little lateral resistance in an earthquake. San Francisco runs a Mandatory Soft Story Retrofit Program for older multi-unit wood-frame buildings, and single-family homes with the same configuration are not covered by it at all. I identify the condition and tell you whether retrofit work appears to have been done.",
      },
      {
        title: "Dry rot at light wells, bays and west walls",
        desc: "Fog and wind-driven rain attack west and north-facing elevations year-round. Light wells, bay window sills and the junctions where stucco meets wood trim are where it starts, and it is usually well advanced before anything is visible from inside.",
      },
      {
        title: "Unpermitted in-law and ground-floor units",
        desc: "Extremely common in San Francisco. I check ceiling height, egress, ventilation, heating and electrical, and flag work that looks like it was done outside the permit process. Whether a unit is legal affects value, financing and insurance, not just safety.",
      },
      {
        title: "Liquefaction-zone building performance",
        desc: "The Marina, SOMA, Mission Bay and parts of the Financial District sit on fill — some of it 1906 rubble. In mapped liquefaction zones I pay particular attention to foundation type, differential settlement, floor level variation and any pattern suggesting ongoing movement.",
      },
      {
        title: "Brick and unreinforced foundations",
        desc: "Pre-1906 buildings frequently sit on brick or unreinforced rubble foundations with no anchor bolting. Combined with unbraced cripple walls this is among the most consequential findings in the city, and the retrofit is well understood.",
      },
      {
        title: "Original clay sewer laterals",
        desc: "The city's older laterals are clay, root-intruded and often shared or running under neighbouring property. A lateral inspection is worth doing separately — it does not appear in a standard visual inspection and it is a recurring four- and five-figure repair here.",
      },
      {
        title: "Party walls and attached construction",
        desc: "Most San Francisco buildings share walls. Moisture, pest activity and structural movement all cross those boundaries, and problems originating next door regularly show up on your side first.",
      },
    ],
    neighborhoods: [
      "Noe Valley",
      "The Mission",
      "Bernal Heights",
      "Pacific Heights",
      "Marina",
      "Inner Richmond",
      "Outer Richmond",
      "Inner Sunset",
      "Outer Sunset",
      "Haight-Ashbury",
      "Potrero Hill",
      "Dogpatch",
      "Glen Park",
      "Castro",
      "Alamo Square",
      "West Portal",
      "Excelsior",
      "SOMA",
      "Russian Hill",
      "Bayview",
    ],
    localNote:
      "San Francisco has requirements no other city I serve does: a Mandatory Soft Story Retrofit Program for qualifying multi-unit buildings, a 3R Report documenting a property's permitted use and unit count, and sewer lateral compliance obligations that can arise at transfer. I flag where these apply so you can confirm status with the city before removing contingencies.",
    faqs: [
      {
        q: "What is a soft-story building and does it apply to my place?",
        a: "It is a building whose ground floor has large openings — typically a garage — beneath living space, leaving little lateral resistance in an earthquake. San Francisco's Mandatory Soft Story Retrofit Program applies to older multi-unit wood-frame buildings of three or more units. Single-family homes with exactly the same configuration are not covered by the program, which means nobody has forced the issue. I identify the condition either way and tell you whether retrofit work appears to have been done.",
      },
      {
        q: "Should I worry about an unpermitted in-law unit?",
        a: "You should understand it before you buy. Unpermitted ground-floor and garage units are very common here, and they affect value, financing, insurance and what you can legally rent. I inspect the space as built and report on ceiling height, egress, ventilation, heating and electrical, and tell you what looks unpermitted. Pull a 3R Report from the city to confirm the legal unit count — that is the document that settles it.",
      },
      {
        q: "Is dry rot really that common in San Francisco?",
        a: "Yes — it is the single most frequent significant finding I write up in this city. Persistent fog and wind-driven rain on west and north elevations keep wood damp for much of the year. Light wells, bay window sills and stucco-to-wood junctions are where it concentrates, and it is usually extensive before it becomes visible from inside. Moisture metering and thermal imaging find it far earlier than a visual-only inspection.",
      },
      {
        q: "Does it matter if the building is in a liquefaction zone?",
        a: "It changes what I look at most closely. The Marina, SOMA, Mission Bay and parts of the Financial District sit on fill, some of it 1906 rubble. In those areas I focus on foundation type, differential settlement, floor level variation and crack patterns, and I tell you plainly whether movement looks historic and stable or ongoing.",
      },
      {
        q: "Do I need a separate sewer lateral inspection?",
        a: "For most older San Francisco buildings, yes. The original laterals are clay, commonly root-intruded, and sometimes shared or routed under neighbouring property. It does not show up in a standard visual inspection and it is a recurring expensive repair here, so it is worth scoping before contingency removal.",
      },
      {
        q: "Can you inspect a condo or a TIC unit?",
        a: "Yes. For attached ownership I concentrate on what falls inside your boundary — the unit's own systems, windows and envelope penetrations, balcony waterproofing, and any evidence of moisture or movement crossing from shared walls, floors above, or the building's common areas. I will also flag building-wide conditions worth raising with the HOA or your co-owners.",
      },
      {
        q: "How fast can you get to a San Francisco property?",
        a: "San Francisco is my primary service area and I schedule there daily. Reports go out the same day as the inspection, which matters here because contingency windows are short and frequently under pressure to be waived.",
      },
    ],
    nearby: ["daly-city", "south-san-francisco", "san-mateo", "redwood-city"],
  },

  {
    slug: "daly-city",
    name: "Daly City",
    county: "San Mateo County",
    region: "San Francisco",
    heroSubtitle: "Dense post-war rowhouses in the fog belt — where moisture and dry rot lead every report.",
    metaTitle: "Home & Mold Inspection in Daly City, CA",
    metaDescription:
      "Certified home and mold inspection in Daly City, CA. Fog-belt moisture, dry rot and post-war rowhouse specialist. Thermal imaging, same-day reports.",
    intro: [
      "Daly City sits directly in the fog belt on San Francisco's southern edge, and its housing is dominated by dense post-war rowhouse tracts — the Westlake development most famously. Homes are attached or near-attached, on small lots, frequently with a garage at ground level beneath living space.",
      "The climate is the defining factor. Persistent fog, high humidity and wind-driven rain off the ocean keep exterior wood damp for much of the year, which makes dry rot and moisture intrusion the leading findings here by a wide margin.",
    ],
    housingStock: {
      summary:
        "Predominantly late-1940s through 1960s attached and semi-attached rowhouse tracts, with hillside development above and newer infill near the BART corridor.",
      eras: [
        {
          label: "1940s–60s Westlake-era rowhouses",
          desc: "The bulk of the city. Ground-floor garages beneath living space, stucco over wood framing with limited drainage plane, original single-pane windows, and galvanised supply piping are typical.",
        },
        {
          label: "1960s–80s hillside development",
          desc: "Built on slopes above the flats. Site drainage, retaining walls, stepped foundations and under-floor ventilation are the priorities.",
        },
        {
          label: "1990s–present infill",
          desc: "Newer attached housing and condominiums. Focus shifts to balcony waterproofing, unit-boundary systems and envelope detailing.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Fog-driven dry rot",
        desc: "Constant humidity and wind-driven rain make exterior dry rot the most common significant finding in Daly City. Trim, sills, garage door framing and stucco-to-wood junctions are where it starts.",
      },
      {
        title: "Soft-story garage configurations",
        desc: "Ground-floor garage openings beneath living space are near-universal in the rowhouse tracts. I identify the condition and whether any bracing or retrofit work is present.",
      },
      {
        title: "Elevated indoor humidity and surface mold",
        desc: "High ambient humidity combined with original ventilation produces condensation and surface growth in bathrooms, closets and on exterior-wall surfaces.",
      },
      {
        title: "Stucco without a drainage plane",
        desc: "Post-war stucco was often applied without the weather-resistive assemblies used today. Thermal imaging identifies where moisture is getting behind it.",
      },
      {
        title: "Attached-construction moisture transfer",
        desc: "In attached and semi-attached rowhouses, moisture and pest activity cross shared walls. Conditions originating next door frequently appear on your side first.",
      },
    ],
    neighborhoods: [
      "Westlake",
      "Serramonte",
      "Original Daly City",
      "Crocker",
      "St. Francis Heights",
      "Broadmoor",
      "Bayshore",
    ],
    localNote:
      "Daly City is one of the foggiest, most persistently damp municipalities in the Bay Area. Exterior wood moisture and dry rot deserve more weight here than almost anywhere else I inspect.",
    faqs: [
      {
        q: "Why is dry rot such a problem in Daly City?",
        a: "The fog belt keeps exterior wood damp for much of the year, and wind-driven rain off the ocean drives moisture into trim, sills and stucco junctions. It is the leading significant finding in this city, and it is usually more extensive than it appears from the outside.",
      },
      {
        q: "Do the Westlake rowhouses have soft-story issues?",
        a: "Many have the configuration — a garage opening at ground level beneath living space, which offers little lateral resistance. Daly City does not run San Francisco's mandatory retrofit program, so the condition frequently goes unaddressed. I identify it and note whether any bracing is present.",
      },
      {
        q: "Is mold testing worth it here?",
        a: "More than in most cities I serve. High ambient humidity, attached construction and original ventilation combine to produce moisture problems. Thermal imaging and moisture mapping are done during the same visit.",
      },
    ],
    nearby: ["san-francisco", "south-san-francisco", "san-mateo"],
  },

  {
    slug: "south-san-francisco",
    name: "South San Francisco",
    county: "San Mateo County",
    region: "San Francisco",
    heroSubtitle: "Post-war hillside tracts and older downtown homes just south of the city line.",
    metaTitle: "Home & Mold Inspection in South San Francisco, CA",
    metaDescription:
      "Certified home and mold inspection in South San Francisco, CA. Hillside tracts, older downtown homes, moisture and drainage. Same-day reports.",
    intro: [
      "South San Francisco combines an older downtown core with extensive post-war tract development climbing the hills above it, plus newer construction near the bay side. It sits just outside the heaviest fog, but moisture is still a bigger factor here than further down the Peninsula.",
      "The hillside neighbourhoods bring drainage and retaining wall considerations; the older downtown blocks bring foundation, chimney and wiring findings typical of pre-war construction. Which half of the city you are buying in changes the inspection substantially.",
    ],
    housingStock: {
      summary:
        "Pre-war homes in the downtown and Old Town areas, extensive 1950s–70s hillside tract development, and newer construction near the bay margin and transit.",
      eras: [
        {
          label: "Pre-1940 downtown & Old Town",
          desc: "Original unreinforced foundations, unbraced cripple walls, masonry chimneys, knob-and-tube remnants and clay sewer laterals are typical.",
        },
        {
          label: "1950s–70s hillside tracts",
          desc: "Sunshine Gardens, Buri Buri and Westborough. Findings centre on site drainage, retaining walls, stepped foundations, galvanised supply piping and original electrical services.",
        },
        {
          label: "1990s–present development",
          desc: "Newer housing near the bay side and transit. Envelope detailing, balcony waterproofing and mechanical installation quality are the priorities.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Hillside drainage and retaining walls",
        desc: "The tract neighbourhoods climb steep terrain. Undrained retaining walls and runoff directed toward structures are the root cause behind most moisture and movement findings here.",
      },
      {
        title: "Exterior moisture and dry rot",
        desc: "Close enough to the fog belt that wind-driven moisture on exposed elevations produces significant rot at trim, sills and stucco junctions.",
      },
      {
        title: "Unreinforced foundations downtown",
        desc: "Pre-war homes in the older core commonly sit on original foundations with no anchor bolting, alongside unbraced cripple walls.",
      },
      {
        title: "Original plumbing in post-war tracts",
        desc: "Galvanised supply and cast-iron waste lines in the 1950s–70s housing are at end of life. Functional testing under simultaneous demand is more informative than pipe age.",
      },
      {
        title: "Unpermitted conversions",
        desc: "Garage and ground-floor conversions are common. Egress, ceiling height, ventilation and apparently unpermitted electrical or heating work are flagged.",
      },
    ],
    neighborhoods: [
      "Sunshine Gardens",
      "Buri Buri",
      "Westborough",
      "Old Town",
      "Sign Hill",
      "Avalon Park",
      "Serra Highlands",
    ],
    localNote:
      "South San Francisco runs from bay-margin flats up onto steep hillsides, and sits at the southern edge of the fog belt. Drainage and exterior moisture both carry more weight here than in the inland Peninsula cities.",
    faqs: [
      {
        q: "How is South San Francisco different from Daly City?",
        a: "Less fog and more topography. Daly City's dominant issue is persistent exterior moisture; South San Francisco has that to a lesser degree plus significant hillside drainage and retaining wall considerations in the tract neighbourhoods.",
      },
      {
        q: "Are the hillside tracts a concern?",
        a: "Not inherently, but they need the right emphasis. Site drainage, retaining wall condition and stepped foundation performance matter far more on those slopes than they would on a flat lot, and problems there get expensive when left alone.",
      },
      {
        q: "Do you serve South San Francisco regularly?",
        a: "Yes. It sits between San Francisco and the Peninsula, both of which I cover daily, so scheduling is usually straightforward and reports go out the same day.",
      },
    ],
    nearby: ["san-francisco", "daly-city", "san-mateo"],
  },
];
