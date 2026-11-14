import type { City } from "./types";

export const peninsulaCities: City[] = [
  {
    slug: "palo-alto",
    name: "Palo Alto",
    county: "Santa Clara County",
    region: "The Peninsula",
    heroSubtitle: "Eichlers, Professorville Craftsman homes, and century-old housing stock — inspected by a former builder.",
    metaTitle: "Home & Mold Inspection in Palo Alto, CA",
    metaDescription:
      "Certified home and mold inspection in Palo Alto, CA. Eichler and pre-war specialist, thermal imaging, same-day reports. Book online or call for a quote.",
    intro: [
      "Palo Alto has some of the most varied housing stock on the Peninsula, and it rewards an inspector who knows the difference between eras. A 1902 Craftsman in Professorville and a 1956 Eichler in Greenmeadow fail in completely different ways, and a generic checklist inspection will miss what matters in both.",
      "Because prices here are high and contingency windows are short, buyers rarely get a second visit. That makes the first inspection the only real chance to understand what you are committing to — which is why every Palo Alto inspection I do includes thermal moisture imaging as standard, not as an upsell.",
    ],
    housingStock: {
      summary:
        "Roughly three distinct waves: pre-1940 Craftsman and Colonial Revival near downtown, mid-century post-and-beam tracts to the south, and a growing number of full rebuilds on original lots.",
      eras: [
        {
          label: "Pre-1940 Craftsman & Colonial Revival",
          desc: "Common in Professorville, Old Palo Alto and Community Center. Expect original cripple walls with no shear bracing, unreinforced masonry chimneys, knob-and-tube remnants in attics, and galvanized supply lines that have narrowed with corrosion.",
        },
        {
          label: "1950s–60s Eichler & post-and-beam",
          desc: "Greenmeadow, Fairmeadow, Royal Manor and Green Gables. The recurring issues are flat or low-slope roof membranes at end of life, in-slab radiant heating that can no longer be pressure-tested or repaired economically, single-pane glass walls, and exposed post bases that have rotted at grade.",
        },
        {
          label: "1990s–present rebuilds",
          desc: "Large replacement homes on original lots. Problems here are workmanship rather than age — flashing details at complex rooflines, poorly integrated deck-to-wall transitions, and mechanical systems oversized for the envelope.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Eichler roof and radiant slab failures",
        desc: "Original radiant tubing embedded in the slab is effectively unrepairable when it leaks. I check supply and return temperatures and look for warm spots and efflorescence at the slab edge before you inherit a five-figure retrofit.",
      },
      {
        title: "Unbraced cripple walls in pre-war homes",
        desc: "Many Palo Alto homes from the 1920s and 30s still sit on original short stud walls above the foundation with no plywood shear panels or anchor bolts. It is one of the most consequential and most fixable findings in the city.",
      },
      {
        title: "Mature tree roots and sewer laterals",
        desc: "The street trees Palo Alto is known for send roots into clay lateral lines. Recurring backups are usually a root intrusion problem, not a fixture problem.",
      },
      {
        title: "Additions built across multiple decades",
        desc: "Layered remodels are common here. I look specifically at where old framing meets new, since that is where flashing, drainage and load paths tend to get compromised.",
      },
      {
        title: "Moisture behind single-wall construction",
        desc: "Mid-century homes often have minimal wall cavity and no vapour control. Thermal imaging catches wet insulation and hidden leaks that a visual-only inspection cannot.",
      },
    ],
    neighborhoods: [
      "Professorville",
      "Old Palo Alto",
      "Crescent Park",
      "Midtown",
      "Barron Park",
      "Greenmeadow",
      "Fairmeadow",
      "College Terrace",
    ],
    localNote:
      "San Francisquito Creek forms the northern boundary, and parts of the city near the creek sit in a mapped flood zone. Crawl space moisture and drainage findings carry more weight in those blocks than they would elsewhere in the city.",
    faqs: [
      {
        q: "Do you have experience inspecting Eichler homes in Palo Alto?",
        a: "Yes. Eichlers are a large share of the inspections I do in Greenmeadow, Fairmeadow and Royal Manor. The critical items are the low-slope roof membrane, the in-slab radiant heating system, exposed post bases at grade, and the original single-pane glazing — all of which I check specifically rather than generically.",
      },
      {
        q: "How fast can I get a report for a Palo Alto transaction?",
        a: "Same day. Palo Alto contingency windows are often seven days or less, so the report goes out the evening of the inspection rather than several days later.",
      },
      {
        q: "Is mold a common problem in Palo Alto homes?",
        a: "It is most common in mid-century homes with minimal wall cavities, in crawl spaces near San Francisquito Creek, and behind bathroom and kitchen remodels where the original ventilation was never upgraded. A thermal and moisture assessment is available as part of the inspection.",
      },
    ],
    nearby: ["menlo-park", "mountain-view", "los-altos", "east-palo-alto"],
  },

  {
    slug: "menlo-park",
    name: "Menlo Park",
    county: "San Mateo County",
    region: "The Peninsula",
    heroSubtitle: "From Allied Arts bungalows to Sharon Heights ranch homes — a builder's eye on every system.",
    metaTitle: "Home & Mold Inspection in Menlo Park, CA",
    metaDescription:
      "Certified home and mold inspection in Menlo Park, CA. Thermal imaging, thermal & moisture testing, same-day reports. Serving Allied Arts, Sharon Heights & West Menlo.",
    intro: [
      "Menlo Park splits sharply by neighbourhood. The Allied Arts and Felton Gables areas are dense with 1920s and 30s bungalows on narrow lots, while Sharon Heights and Stanford Hills are 1960s and 70s ranch and split-level homes on larger, sloped parcels. The inspection priorities are not the same in the two halves of the city.",
      "A lot of Menlo Park housing has been remodelled at least twice. I spend a disproportionate amount of time on the seams — where an addition meets original framing, where a new bathroom was dropped into an old wet wall, and where drainage was rerouted around a new hardscape.",
    ],
    housingStock: {
      summary:
        "Pre-war bungalows east of Alameda, mid-century ranch and split-level in the western hills, and a steady stream of teardown rebuilds throughout.",
      eras: [
        {
          label: "1920s–30s bungalows",
          desc: "Allied Arts, Felton Gables and central Menlo Park. Typical findings are original clay sewer laterals, ungrounded two-prong circuits, cripple walls without shear panels, and crawl spaces with inadequate ventilation.",
        },
        {
          label: "1950s–70s ranch & split-level",
          desc: "Sharon Heights and Stanford Hills. Watch for original cast-iron drain lines reaching end of life, aluminium branch wiring in a narrow band of mid-1960s homes, and retaining walls that were never engineered.",
        },
        {
          label: "2000s–present rebuilds",
          desc: "Large new construction on original lots. Findings skew toward detailing — roof-to-wall flashing, window head flashing, and deck waterproofing over living space.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Sloped-lot drainage in the western neighbourhoods",
        desc: "Sharon Heights and Stanford Hills homes frequently move water toward the structure rather than away from it. I look at grading, area drains, downspout discharge and any retaining wall weep systems.",
      },
      {
        title: "Aged sewer laterals under mature landscaping",
        desc: "Original clay laterals in the older eastern neighbourhoods are a frequent and expensive surprise. Recurring slow drains usually point here.",
      },
      {
        title: "Crawl space moisture and fungal growth",
        desc: "Low crawl spaces with blocked or missing vents are common in pre-war Menlo Park homes. This is the single most common source of mold findings I write up in the city.",
      },
      {
        title: "Unpermitted conversions",
        desc: "Garage and basement conversions are widespread. I flag missing egress, undersized headers, and heating or electrical work that was never inspected.",
      },
      {
        title: "Deck and balcony waterproofing",
        desc: "Elevated decks over occupied space are common in the hills. Ledger attachment and flashing are checked directly rather than assumed.",
      },
    ],
    neighborhoods: [
      "Allied Arts",
      "Felton Gables",
      "Sharon Heights",
      "Stanford Hills",
      "West Menlo Park",
      "Suburban Park",
      "Linfield Oaks",
      "Belle Haven",
    ],
    localNote:
      "The city straddles a marked transition from flat bayside soils in the east to the foothills in the west. Foundation and drainage findings differ substantially between the two, and a report that ignores which side of town you are on is not much use.",
    faqs: [
      {
        q: "What should I watch for buying in Sharon Heights?",
        a: "Site drainage and retaining walls first, then decks and the age of original cast-iron waste lines. Sloped lots in that area regularly direct water toward the foundation, and many retaining walls were built without engineering.",
      },
      {
        q: "Do older Menlo Park homes need a sewer lateral inspection?",
        a: "For anything built before about 1960 with original clay pipe, it is worth doing. It is one of the more common four- and five-figure repairs on the Peninsula and it does not show up in a standard visual inspection.",
      },
      {
        q: "Can you inspect and test for mold in the same visit?",
        a: "Yes. Thermal imaging and moisture mapping are done during the same appointment, and you get the full report the same day.",
      },
    ],
    nearby: ["palo-alto", "atherton", "redwood-city", "east-palo-alto"],
  },

  {
    slug: "atherton",
    name: "Atherton",
    county: "San Mateo County",
    region: "The Peninsula",
    heroSubtitle: "Large estates, decades of layered remodels, and systems that are rarely simple.",
    metaTitle: "Home & Mold Inspection in Atherton, CA",
    metaDescription:
      "Certified home and mold inspection in Atherton, CA. Estate properties, layered remodels, thermal imaging and same-day reporting. Book online or call.",
    intro: [
      "Atherton inspections are different in scale rather than in kind. Properties are large, often on an acre or more, with detached structures, pool equipment, extensive irrigation, long private drives and mechanical systems that were expanded piecemeal over thirty or forty years.",
      "The most valuable thing an inspector can do on an Atherton property is trace how the systems actually grew. A house that has been remodelled four times usually has four generations of electrical, plumbing and HVAC coexisting, and the failures tend to happen where those generations meet.",
    ],
    housingStock: {
      summary:
        "Large custom homes across a wide range of eras, from early-20th-century estates to recent ground-up construction, almost all with significant remodel history.",
      eras: [
        {
          label: "Pre-war estates",
          desc: "Original slate or tile roofs, extensive masonry, and heating systems that have been replaced but often not fully removed. Abandoned oil tanks and disused boiler rooms are not unusual.",
        },
        {
          label: "1950s–80s custom homes",
          desc: "Frequently expanded. Look for undersized original electrical services carrying modern loads, and additions with independent HVAC that was never balanced against the original system.",
        },
        {
          label: "2000s–present ground-up builds",
          desc: "High specification, but complexity introduces risk — flat roof sections, extensive glazing, below-grade rooms, and elaborate waterproofing that depends entirely on detailing.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Below-grade rooms and water intrusion",
        desc: "Basements, wine rooms and subterranean garages are common in newer Atherton construction. These depend on waterproofing and drainage that cannot be visually confirmed after the fact, so thermal imaging and moisture metering matter a great deal here.",
      },
      {
        title: "Multiple generations of electrical",
        desc: "It is common to find original 1950s panels, a 1980s subpanel and a recent service upgrade all live on the same property. I map what feeds what and flag any of it that is unsafe or over capacity.",
      },
      {
        title: "Pool, spa and outbuilding systems",
        desc: "Pool equipment, guest houses, studios and sport courts each have their own electrical, gas and drainage. These are frequently skipped in a standard inspection and are included in mine.",
      },
      {
        title: "Large-lot drainage and mature trees",
        desc: "Heritage oaks, deep landscaping and long driveways all affect how water moves across the site. Root intrusion into laterals and hardscape lifting are recurring findings.",
      },
      {
        title: "Irrigation-driven moisture at the foundation",
        desc: "Extensive irrigation running close to the structure is a frequent and easily corrected cause of persistent crawl space moisture and fungal growth.",
      },
    ],
    neighborhoods: [
      "West Atherton",
      "Lindenwood",
      "Lloyden Park",
      "Atherton Oaks",
      "Fair Oaks",
    ],
    localNote:
      "Lot sizes mean an Atherton inspection typically covers far more ground and more independent systems than a comparable Peninsula home. I schedule these with extra time rather than compressing them into a standard slot.",
    faqs: [
      {
        q: "Does an Atherton inspection take longer?",
        a: "Yes. Between the size of the main structure, detached buildings, pool equipment and site systems, these usually take considerably longer than a standard single-family inspection. I book them accordingly so nothing gets rushed.",
      },
      {
        q: "Do you inspect guest houses and pool equipment?",
        a: "Yes, both are included. Detached structures have their own electrical, plumbing and drainage, and they are among the more commonly overlooked parts of a large property.",
      },
      {
        q: "Can you still deliver a same-day report on a large estate?",
        a: "In most cases yes. If a property is unusually large or has several detached structures, I will tell you up front if the report will land the following morning instead.",
      },
    ],
    nearby: ["menlo-park", "redwood-city", "woodside", "portola-valley"],
  },

  {
    slug: "redwood-city",
    name: "Redwood City",
    county: "San Mateo County",
    region: "The Peninsula",
    heroSubtitle: "Downtown Victorians, post-war tracts, and Redwood Shores homes built on engineered bay fill.",
    metaTitle: "Home & Mold Inspection in Redwood City, CA",
    metaDescription:
      "Certified home and mold inspection in Redwood City, CA. Victorian, tract and Redwood Shores specialist. Thermal imaging, same-day reports. Book online.",
    intro: [
      "Redwood City covers a wider range of building conditions than almost any city on the Peninsula. Downtown and Centennial hold late-1800s and early-1900s homes. Woodside Plaza and Farm Hill are post-war tracts. Redwood Shores, built from the 1960s onward, sits on engineered fill over bay mud and behaves differently from all of it.",
      "That last distinction matters more than most buyers expect. Homes on fill can show differential settlement, sticking doors and hairline slab cracking that are normal for the area — and separately can show movement that is not normal at all. Telling those apart is the job.",
    ],
    housingStock: {
      summary:
        "Victorian and early-1900s homes near downtown, 1940s–60s tracts through the middle of the city, and 1960s-onward planned development in Redwood Shores.",
      eras: [
        {
          label: "1890s–1920s Victorian & Craftsman",
          desc: "Downtown, Centennial and Mount Carmel. Expect original foundations with little or no reinforcement, unbraced cripple walls, knob-and-tube remnants, and clay sewer laterals.",
        },
        {
          label: "1940s–60s tracts",
          desc: "Woodside Plaza, Farm Hill and Palm Park. Typical findings include original galvanised supply piping, aging cast-iron waste lines, and 100-amp services carrying modern loads.",
        },
        {
          label: "1960s–present Redwood Shores",
          desc: "Built on engineered fill beside the lagoon system. Settlement patterns, slab performance, and moisture at ground level are the priorities, along with the condition of any lagoon-facing decking and bulkheads.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Differential settlement on fill in Redwood Shores",
        desc: "Some settlement is expected in this area. What matters is the pattern — I check for progressive movement, separation at the slab, and doors and windows racking in a way that suggests something beyond normal consolidation.",
      },
      {
        title: "High water table and crawl space moisture",
        desc: "Low elevation across much of the city means damp crawl spaces are common. This is the leading source of fungal growth findings in Redwood City homes.",
      },
      {
        title: "Unreinforced foundations in pre-1930 homes",
        desc: "Downtown and Centennial homes frequently sit on original unreinforced foundations with no anchor bolting. It is a significant finding and a well-understood retrofit.",
      },
      {
        title: "Aging cast-iron and galvanised plumbing",
        desc: "Post-war tracts are at the age where original supply and waste piping fails. I check flow, drainage and any visible corrosion rather than assuming age alone.",
      },
      {
        title: "Lagoon-facing exterior components",
        desc: "In Redwood Shores, constant moisture exposure accelerates deterioration of decks, railings, fasteners and bulkhead structures.",
      },
    ],
    neighborhoods: [
      "Redwood Shores",
      "Woodside Plaza",
      "Farm Hill",
      "Centennial",
      "Mount Carmel",
      "Emerald Hills",
      "Palm Park",
      "Friendly Acres",
    ],
    localNote:
      "Parts of Redwood City sit at low elevation near the bay, and portions of the city are in mapped liquefaction-susceptible areas. Foundation type and site drainage carry more weight here than in the foothill cities.",
    faqs: [
      {
        q: "Should I be worried about settlement in Redwood Shores?",
        a: "Some settlement is normal for homes on engineered fill. The important question is whether movement is historic and stable or ongoing. I look at crack patterns, slab separation and how doors and windows are sitting to distinguish between them, and I say plainly which one I think you have.",
      },
      {
        q: "Are damp crawl spaces common in Redwood City?",
        a: "Yes, particularly in the lower-lying parts of the city. It is the most frequent source of mold findings I write up here, and it is usually correctable with drainage, vapour barrier and ventilation work.",
      },
      {
        q: "Do you inspect homes in Emerald Hills?",
        a: "Yes. Emerald Hills is sloped and wooded, so the priorities shift toward site drainage, retaining walls, decks and defensible space rather than the fill and water table concerns of the flats.",
      },
    ],
    nearby: ["san-mateo", "menlo-park", "atherton", "belmont"],
  },

  {
    slug: "san-mateo",
    name: "San Mateo",
    county: "San Mateo County",
    region: "The Peninsula",
    heroSubtitle: "1920s Spanish and Tudor homes, Hillsdale tracts, and a lot of layered remodel history.",
    metaTitle: "Home & Mold Inspection in San Mateo, CA",
    metaDescription:
      "Certified home and mold inspection in San Mateo, CA. Pre-war and tract home specialist, thermal imaging, thermal & moisture testing, same-day reports.",
    intro: [
      "San Mateo has an unusually deep pre-war housing stock for the Peninsula. San Mateo Park, Baywood and Aragon are full of 1920s and 30s Spanish Revival and Tudor homes, many still on their original foundations. Hillsdale and Sunnybrae are largely post-war tract construction with a very different failure profile.",
      "The pre-war homes here are well built but were built to standards that predate modern seismic, electrical and moisture practice. Most of what I write up in those neighbourhoods is not deterioration — it is original construction that no longer meets what a buyer should reasonably expect.",
    ],
    housingStock: {
      summary:
        "Substantial 1920s–30s period homes in the western neighbourhoods, 1940s–60s tracts through the centre and east, and scattered newer infill and condominium development near downtown.",
      eras: [
        {
          label: "1920s–30s Spanish Revival & Tudor",
          desc: "San Mateo Park, Baywood and Aragon. Common findings are unreinforced masonry chimneys, cripple walls without shear bracing, original clay laterals, and stucco with no drainage plane behind it.",
        },
        {
          label: "1940s–60s tracts",
          desc: "Hillsdale, Sunnybrae and Shoreview. Galvanised supply lines, cast-iron waste, undersized electrical services, and original single-pane aluminium windows are typical.",
        },
        {
          label: "1990s–present infill & condos",
          desc: "Concentrated near downtown and the Bay Meadows area. Priorities shift to envelope detailing, deck waterproofing and shared-system boundaries in attached housing.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Unreinforced masonry chimneys",
        desc: "Very common in San Mateo's pre-war housing. These are a genuine seismic and life-safety concern and I document their condition and attachment specifically.",
      },
      {
        title: "Stucco without a drainage plane",
        desc: "Original stucco on many 1920s and 30s homes was applied without the weather-resistive barrier assemblies used today. Thermal imaging helps identify where water is getting behind it.",
      },
      {
        title: "Shoreview and Shoreline moisture",
        desc: "The lower-lying eastern neighbourhoods sit close to the bay, and crawl space moisture, elevated humidity and fungal growth are correspondingly more common.",
      },
      {
        title: "Original galvanised supply piping",
        desc: "Post-war tract homes in Hillsdale and Sunnybrae frequently still have galvanised supply lines that have narrowed significantly. I test functional flow at multiple fixtures simultaneously.",
      },
      {
        title: "Additions over original footprints",
        desc: "Layered remodels are widespread here. Roof-to-wall transitions and re-routed drainage at those junctions are consistent problem areas.",
      },
    ],
    neighborhoods: [
      "San Mateo Park",
      "Baywood",
      "Aragon",
      "Hillsdale",
      "Sunnybrae",
      "Shoreview",
      "Bay Meadows",
      "Hayward Park",
    ],
    localNote:
      "San Mateo runs from bayfront flats up into the western hills, and the eastern neighbourhoods sit at low elevation on softer soils. Foundation performance and moisture findings track that gradient closely.",
    faqs: [
      {
        q: "Are chimneys a common problem in San Mateo?",
        a: "Yes. Unreinforced masonry chimneys are one of the most frequent significant findings in the city's pre-war neighbourhoods. I check condition, cracking and how the stack is tied to the structure, and note whether it presents a seismic concern.",
      },
      {
        q: "What is different about inspecting a 1920s home versus a 1950s tract home?",
        a: "Almost everything. Pre-war homes tend to have foundation, chimney and stucco concerns; post-war tracts tend to have plumbing, electrical capacity and window concerns. Both are inspected against what is reasonable for their era, not against a single generic checklist.",
      },
      {
        q: "Do you cover condos and townhomes in San Mateo?",
        a: "Yes. For attached housing I focus on what falls inside your boundary — the unit's own systems, envelope penetrations, and any evidence of moisture crossing from shared assemblies.",
      },
    ],
    nearby: ["belmont", "foster-city", "redwood-city"],
  },

  {
    slug: "belmont",
    name: "Belmont",
    county: "San Mateo County",
    region: "The Peninsula",
    heroSubtitle: "Hillside homes, split-levels and retaining walls that deserve a closer look.",
    metaTitle: "Home & Mold Inspection in Belmont, CA",
    metaDescription:
      "Certified home and mold inspection in Belmont, CA. Hillside and split-level specialist. Drainage, retaining walls, thermal imaging, same-day reports.",
    intro: [
      "Belmont is a hillside city, and that single fact drives most of what matters in an inspection here. Homes are built on slopes, on stepped foundations, on cut-and-fill pads, and with retaining walls that range from properly engineered to improvised.",
      "The recurring theme in Belmont is water — where it comes from, where it goes, and what it does to a structure on a slope when it is not managed. Drainage findings here are not cosmetic; they are usually the root cause of the foundation and moisture issues that follow.",
    ],
    housingStock: {
      summary:
        "Predominantly 1950s–70s hillside homes and split-levels, with older housing near Belmont Village and newer construction on infill hillside lots.",
      eras: [
        {
          label: "1950s–70s hillside & split-level",
          desc: "The bulk of the city. Common findings are stepped foundations with cracking at the steps, under-floor areas with poor ventilation, original decks nearing end of life, and retaining walls with no visible drainage.",
        },
        {
          label: "Pre-war homes near Belmont Village",
          desc: "Older, smaller and generally on flatter ground. Expect original foundations, unbraced cripple walls and outdated electrical.",
        },
        {
          label: "1990s–present hillside infill",
          desc: "Built on more difficult remaining lots. These depend heavily on engineered foundations, drainage systems and retaining structures performing as designed.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Retaining walls without drainage",
        desc: "Undrained retaining walls build hydrostatic pressure and eventually lean, crack or fail. I look for weep holes, drainage provisions and any tilt or displacement.",
      },
      {
        title: "Hillside drainage directed at the structure",
        desc: "Uphill runoff routed toward rather than around the building is the most common root cause I find in Belmont. It shows up later as crawl space moisture and foundation movement.",
      },
      {
        title: "Stepped foundation cracking",
        desc: "Foundations that step down a slope crack at predictable points. Distinguishing normal shrinkage from active movement is the important judgement here.",
      },
      {
        title: "Aging elevated decks",
        desc: "Hillside homes rely on decks for usable outdoor space, and many are original. Ledger attachment, flashing and post bases are checked directly.",
      },
      {
        title: "Under-floor moisture and fungal growth",
        desc: "Enclosed under-floor areas on slopes ventilate poorly and stay damp. This is the leading source of mold findings in Belmont homes.",
      },
    ],
    neighborhoods: [
      "Belmont Heights",
      "Belmont Village",
      "Sterling Downs",
      "Homeview",
      "Belmont Woods",
      "Hallmark",
    ],
    localNote:
      "Belmont's terrain means two homes a block apart can have entirely different risk profiles depending on whether they sit on cut or fill and where uphill water is directed. Site work is a major part of every inspection here.",
    faqs: [
      {
        q: "Are retaining walls included in the inspection?",
        a: "Yes, as a visual assessment. I check for tilt, displacement, cracking and whether any drainage provisions are present. If a wall shows signs of distress or appears to be retaining significant load without engineering, I recommend evaluation by a structural engineer.",
      },
      {
        q: "Why is drainage such a focus in Belmont?",
        a: "Because on a slope, water is the mechanism behind most structural and moisture problems. Get drainage right and many other issues never develop. It is the highest-leverage thing to understand before buying here.",
      },
      {
        q: "Do hillside homes need a different kind of inspection?",
        a: "The scope is the same but the emphasis shifts substantially toward site drainage, retaining structures, foundation stepping, decks and under-floor conditions. A flat-lot checklist applied to a Belmont hillside home will miss the things most likely to cost you money.",
      },
    ],
    nearby: ["san-mateo", "redwood-city", "foster-city"],
  },

  {
    slug: "foster-city",
    name: "Foster City",
    county: "San Mateo County",
    region: "The Peninsula",
    heroSubtitle: "A planned city built on engineered fill — where settlement and moisture are the questions that matter.",
    metaTitle: "Home & Mold Inspection in Foster City, CA",
    metaDescription:
      "Certified home and mold inspection in Foster City, CA. Bay fill settlement, lagoon-front properties, moisture and thermal imaging. Same-day reports.",
    intro: [
      "Foster City is unusual: it is an entirely planned community, built from the early 1960s onward on engineered fill placed over bay mud, and organised around a lagoon system. Almost every inspection consideration here follows from that.",
      "Homes on this kind of fill can show settlement that is entirely expected, and separately can show movement that is not. Buyers are often told either that any crack is catastrophic or that all of it is normal. Neither is true, and the useful answer requires actually looking at the pattern.",
    ],
    housingStock: {
      summary:
        "Almost entirely 1960s onward, developed in phases — early tract housing, 1970s–80s planned neighbourhoods, and newer condominium and townhome development.",
      eras: [
        {
          label: "1960s–70s original development",
          desc: "The city's first neighbourhoods. Priorities are slab and foundation performance on fill, original plumbing at end of life, and electrical services sized for a much lower load than a modern household.",
        },
        {
          label: "1980s–90s planned neighbourhoods",
          desc: "Generally better documented and better drained. Findings tend toward envelope maintenance, original windows, and aging water heaters and HVAC.",
        },
        {
          label: "2000s–present condos & townhomes",
          desc: "Concentrated near the commercial core. Emphasis on unit-boundary systems, deck and balcony waterproofing, and any moisture migrating from shared assemblies.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Settlement over bay mud",
        desc: "The central question in Foster City. I assess crack patterns, floor level variation, and door and window operation to judge whether movement appears historic and stable or ongoing, and I say so plainly.",
      },
      {
        title: "High water table and slab moisture",
        desc: "Low elevation and a high water table mean slab moisture transmission is common. It shows up as flooring failures, baseboard damage and elevated indoor humidity.",
      },
      {
        title: "Lagoon-front exterior deterioration",
        desc: "Constant moisture exposure accelerates wear on decking, railings, fasteners and any bulkhead or dock structure. These are checked directly on waterfront properties.",
      },
      {
        title: "Original plumbing in 1960s–70s homes",
        desc: "The earliest Foster City housing is at the age where original supply and waste piping commonly fails. Functional flow and drainage testing matters more than pipe age alone.",
      },
      {
        title: "Indoor humidity and ventilation",
        desc: "Tight homes at low elevation with high ambient humidity are prone to condensation and fungal growth, particularly in bathrooms and closets on exterior walls.",
      },
    ],
    neighborhoods: [
      "Edgewater Isle",
      "Harbor Side",
      "Marlin Cove",
      "Isle Cove",
      "Sea Colony",
      "Treasure Isle",
      "Bay Vista",
    ],
    localNote:
      "The entire city sits on engineered fill over bay mud, behind a levee system, at low elevation. That single geological fact shapes the foundation, drainage and moisture priorities of every property here.",
    faqs: [
      {
        q: "Is settlement in Foster City a deal breaker?",
        a: "Usually not. Homes on engineered fill are expected to consolidate over time, and a great deal of the cracking people worry about is historic and stable. What matters is whether movement is ongoing and whether it is differential. I give you a direct read on which one you appear to have.",
      },
      {
        q: "Do you inspect lagoon-front properties?",
        a: "Yes. On waterfront homes I additionally assess decking, railings, fasteners and any visible bulkhead or dock structure, all of which deteriorate faster in constant moisture exposure.",
      },
      {
        q: "Is mold a common finding in Foster City?",
        a: "More than average, because of the high water table, low elevation and ambient humidity. It typically appears at slab level, in bathrooms with inadequate ventilation, and on exterior-wall closets. A thermal and moisture assessment is available with the inspection.",
      },
    ],
    nearby: ["san-mateo", "belmont", "redwood-city"],
  },

  {
    slug: "woodside",
    name: "Woodside",
    county: "San Mateo County",
    region: "The Peninsula",
    heroSubtitle: "Wooded acreage, wells and septic systems — rural inspection considerations on the Peninsula.",
    metaTitle: "Home & Mold Inspection in Woodside, CA",
    metaDescription:
      "Certified home and mold inspection in Woodside, CA. Well and septic properties, wooded acreage, wildfire exposure, thermal imaging and same-day reports.",
    intro: [
      "Woodside is a rural property inspection wearing a Peninsula address. Many homes are on acreage, served by private wells and septic systems rather than municipal utilities, set among heavy tree cover, and accessed by long private drives.",
      "That changes the inspection meaningfully. Water supply, wastewater disposal, wildfire exposure and access are all live considerations here in a way they simply are not in Redwood City or San Mateo, and they are frequently the items with the largest financial consequences.",
    ],
    housingStock: {
      summary:
        "Custom homes across a wide span of eras on large wooded parcels, ranging from early ranch properties to substantial recent construction, many with barns, stables or guest structures.",
      eras: [
        {
          label: "Mid-century ranch & country homes",
          desc: "Often extensively remodelled. Common findings are aging septic components, original electrical serving expanded loads, and decks and outbuildings with significant weathering.",
        },
        {
          label: "1980s–2000s custom homes",
          desc: "Larger, with more complex rooflines and mechanical systems. Detailing at roof-to-wall transitions and deck waterproofing are the recurring issues.",
        },
        {
          label: "Outbuildings & agricultural structures",
          desc: "Barns, stables, workshops and guest houses each have independent systems and are frequently omitted from standard inspections. They are included in mine.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Septic system condition and capacity",
        desc: "Septic is the single highest-consequence item on most Woodside properties. I assess what is visible and observable and will tell you clearly when a specialist septic evaluation and pumping inspection is warranted before you remove contingencies.",
      },
      {
        title: "Private well supply and equipment",
        desc: "Well properties depend on pump, pressure tank and treatment equipment that a municipal home simply does not have. I check function and condition and recommend water quality testing where appropriate.",
      },
      {
        title: "Wildfire exposure and defensible space",
        desc: "Heavy tree cover close to structures, combustible decking, and vegetation overhanging roofs are common. These affect both safety and insurability, which is an increasingly practical concern.",
      },
      {
        title: "Tree impact on structures and drainage",
        desc: "Mature oaks and redwoods drop limbs, lift hardscape, block gutters and intrude into drain lines. Persistent roof and drainage problems here are usually tree-driven.",
      },
      {
        title: "Long private drives and access",
        desc: "Drive condition, drainage and turning radius affect emergency access and maintenance cost, and are worth understanding before purchase.",
      },
    ],
    neighborhoods: [
      "Woodside Heights",
      "Skywood",
      "Family Farm",
      "Mountain Home Road",
      "Kings Mountain",
      "Woodside Glens",
    ],
    localNote:
      "Much of Woodside sits in a state-designated high fire hazard severity zone, with heavy tree cover and limited access. Defensible space and roof condition carry weight here for insurance as well as safety.",
    faqs: [
      {
        q: "Do you inspect septic systems in Woodside?",
        a: "I assess visible and observable components and functional performance as part of the inspection, and flag anything of concern. For a property you are purchasing, I recommend a dedicated septic evaluation with tank pumping and component inspection by a septic specialist — it is a high-consequence system and worth the separate assessment.",
      },
      {
        q: "What about well water?",
        a: "I check the pump, pressure tank, visible plumbing and functional flow. Water quality testing is a separate specialized service that I can point you toward, and on a well property I would consider it essential rather than optional.",
      },
      {
        q: "Does wildfire risk affect the inspection?",
        a: "It affects what I emphasise. Roof condition and material, vegetation clearance, vent screening, and combustible decking near the structure all get specific attention because they matter for both safety and insurance availability.",
      },
    ],
    nearby: ["portola-valley", "atherton", "menlo-park", "redwood-city"],
  },

  {
    slug: "portola-valley",
    name: "Portola Valley",
    county: "San Mateo County",
    region: "The Peninsula",
    heroSubtitle: "Hillside homes in an active fault corridor — geology matters here more than anywhere on the Peninsula.",
    metaTitle: "Home & Mold Inspection in Portola Valley, CA",
    metaDescription:
      "Certified home and mold inspection in Portola Valley, CA. Hillside properties, septic and well systems, drainage and thermal imaging. Same-day reports.",
    intro: [
      "Portola Valley sits directly along the San Andreas fault corridor, and the town has mapped its own geology in unusual detail — including landslide-susceptible areas and fault trace zones. No other Peninsula city makes geology this central to what a buyer needs to understand.",
      "Practically, that means an inspection here has to pay close attention to how a structure sits on its site, how ground water moves through the slope, and whether there is evidence of movement that goes beyond ordinary settling. Many properties also run on wells and septic.",
    ],
    housingStock: {
      summary:
        "Custom homes on large hillside and wooded parcels, mostly from the 1950s onward, with a strong tradition of site-sensitive architecture and a significant number of substantial remodels.",
      eras: [
        {
          label: "1950s–70s custom hillside homes",
          desc: "Often post-and-beam or site-specific designs. Findings centre on foundation stepping, under-floor ventilation, original decks, and drainage across sloped sites.",
        },
        {
          label: "1980s–2000s custom construction",
          desc: "Larger footprints on more challenging lots, relying on engineered foundations, retaining structures and drainage systems performing as designed.",
        },
        {
          label: "Extensively remodelled properties",
          desc: "Very common. The interfaces between original and new construction are the areas that most often reveal drainage and flashing problems.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Evidence of slope movement",
        desc: "Landslide-susceptible ground is mapped across parts of the town. I look for tilting retaining walls, offset hardscape, distorted door and window openings and foundation displacement, and recommend geotechnical evaluation where the pattern warrants it.",
      },
      {
        title: "Hillside drainage and ground water",
        desc: "Water moving through a slope is the mechanism behind most structural problems here. Subdrains, area drains and how uphill runoff is managed are central to the inspection.",
      },
      {
        title: "Septic systems on difficult terrain",
        desc: "Sloped, wooded sites complicate septic design and maintenance. I flag visible concerns and recommend a specialist septic evaluation before contingency removal.",
      },
      {
        title: "Wildfire exposure",
        desc: "Heavy tree cover and limited access make defensible space, roof condition and vent screening material to both safety and insurability.",
      },
      {
        title: "Aging elevated decks over slopes",
        desc: "Decks here are often high above grade, making ledger attachment, flashing and post base condition consequential rather than cosmetic.",
      },
    ],
    neighborhoods: [
      "Ladera",
      "Westridge",
      "Portola Valley Ranch",
      "Blue Oaks",
      "Brookside Park",
      "Los Trancos Woods",
    ],
    localNote:
      "The San Andreas fault runs through the town, and Portola Valley maintains detailed geologic mapping including landslide and fault-trace zones. Reviewing the town's geologic map for a specific parcel is worth doing alongside the inspection.",
    faqs: [
      {
        q: "Does the San Andreas fault affect buying here?",
        a: "It affects what you should understand before buying. The town maintains geologic mapping that identifies fault trace and landslide-susceptible areas by parcel, and it is worth reviewing for any property you are considering. My inspection covers observable structural evidence; a geotechnical engineer covers the ground itself.",
      },
      {
        q: "Can you tell me if a house is moving?",
        a: "I can tell you what the structure is showing — crack patterns, floor level variation, retaining wall tilt, hardscape offset — and whether that pattern suggests ongoing movement. Where it does, the right next step is a geotechnical or structural engineer, and I will say so directly rather than leaving it ambiguous.",
      },
      {
        q: "Are most Portola Valley homes on septic?",
        a: "Many are, along with private wells in some areas. Both are high-consequence systems that deserve dedicated evaluation beyond a general home inspection, and I will tell you which ones a given property has.",
      },
    ],
    nearby: ["woodside", "atherton", "menlo-park", "los-altos-hills"],
  },

  {
    slug: "east-palo-alto",
    name: "East Palo Alto",
    county: "San Mateo County",
    region: "The Peninsula",
    heroSubtitle: "Post-war homes, deferred maintenance, and flood-zone considerations near the creek.",
    metaTitle: "Home & Mold Inspection in East Palo Alto, CA",
    metaDescription:
      "Certified home and mold inspection in East Palo Alto, CA. Post-war homes, flood zone and moisture considerations, thermal imaging, same-day reports.",
    intro: [
      "East Palo Alto's housing is mostly modest post-war single-family construction, with newer infill and multi-family development added in recent years. Many of the older homes have had long ownership and deferred maintenance, which changes what an inspection needs to prioritise.",
      "Deferred maintenance is not the same as a bad house. A lot of these homes are structurally sound and simply have a backlog — roofing, electrical capacity, plumbing and drainage. The useful thing an inspection does here is separate the genuinely urgent from the merely overdue, so you can budget in the right order.",
    ],
    housingStock: {
      summary:
        "Predominantly 1940s–60s single-family homes on modest lots, with newer townhome, apartment and infill development concentrated in redeveloped areas.",
      eras: [
        {
          label: "1940s–60s single-family",
          desc: "The majority of the housing stock. Common findings are original or near-original electrical services, galvanised supply piping, aging roofing, and foundations without anchor bolting.",
        },
        {
          label: "Owner-modified homes",
          desc: "Unpermitted additions, converted garages and added units are relatively common. I check egress, headers, and whether electrical and heating work was ever inspected.",
        },
        {
          label: "2000s–present infill",
          desc: "Newer townhomes and apartments. Focus shifts to envelope detailing, deck waterproofing and unit-boundary systems.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Flood zone exposure near San Francisquito Creek",
        desc: "Portions of the city near the creek are in mapped flood hazard areas. This affects crawl space conditions, drainage priorities and insurance, and it is worth confirming the specific parcel's status.",
      },
      {
        title: "Undersized electrical service",
        desc: "Original services on post-war homes were never intended for modern loads. I check service capacity, panel condition, and whether any known-problem panel equipment is present.",
      },
      {
        title: "Deferred roofing and drainage",
        desc: "Aging roofing and gutter systems are among the most common findings, and they are usually the root cause of the moisture problems that follow.",
      },
      {
        title: "Unpermitted conversions and added units",
        desc: "Common and not automatically a problem — but egress, ventilation, heating and electrical need to be checked, and permit status is worth confirming with the city.",
      },
      {
        title: "Crawl space moisture and fungal growth",
        desc: "Low elevation, older drainage and deferred maintenance combine to make damp crawl spaces frequent. This is the main source of mold findings in the city.",
      },
    ],
    neighborhoods: [
      "Gardens",
      "Woodland Park",
      "University Village",
      "Palo Alto Park",
      "Ravenswood",
      "Weeks",
    ],
    localNote:
      "East Palo Alto sits at low elevation between the bay and San Francisquito Creek, and parts of the city are in mapped flood hazard areas. Drainage, crawl space condition and flood zone status deserve specific attention here.",
    faqs: [
      {
        q: "Should I be concerned about flood zones in East Palo Alto?",
        a: "It is worth confirming for the specific parcel, since portions of the city near San Francisquito Creek are in mapped flood hazard areas and portions are not. Flood zone status affects insurance requirements as well as how much weight to give drainage and crawl space findings.",
      },
      {
        q: "A lot of homes here need work. How do I know what is urgent?",
        a: "That is exactly what the report is for. I separate findings into safety and structural items that need attention now, systems at end of life you should budget for, and maintenance that can be scheduled. Deferred maintenance is common here and it is usually manageable once it is sequenced properly.",
      },
      {
        q: "Do you inspect unpermitted additions and converted garages?",
        a: "Yes. I inspect them as built and report what I find — egress, headers, ventilation, electrical and heating. I cannot confirm permit history, but I will tell you what looks like it was done outside the permit process so you can check with the city.",
      },
    ],
    nearby: ["palo-alto", "menlo-park", "mountain-view", "redwood-city"],
  },
];
