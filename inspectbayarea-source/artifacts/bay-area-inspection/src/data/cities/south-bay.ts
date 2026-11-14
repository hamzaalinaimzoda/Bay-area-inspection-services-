import type { City } from "./types";

export const southBayCities: City[] = [
  {
    slug: "mountain-view",
    name: "Mountain View",
    county: "Santa Clara County",
    region: "South Bay",
    heroSubtitle: "My home city — post-war tracts, Eichler pockets and a wave of new attached housing.",
    metaTitle: "Home & Mold Inspection in Mountain View, CA",
    metaDescription:
      "Certified home and mold inspection in Mountain View, CA. Local inspector, former builder. Thermal imaging, thermal & moisture testing, same-day reports.",
    intro: [
      "Mountain View is where I am based, so I know its housing stock street by street. The city is mostly 1950s and 60s tract construction, with Eichler pockets, older homes around Old Mountain View, and a substantial amount of newer condominium and townhome development near downtown and along the El Camino corridor.",
      "The post-war tracts are now at the age where original systems fail on a predictable schedule — supply piping, waste lines, electrical capacity and windows. Most of what I write up in Mountain View is not surprising; it is a matter of knowing which of those have already been addressed and which are still waiting for you.",
    ],
    housingStock: {
      summary:
        "Predominantly 1950s–60s single-family tracts, with Eichler and post-and-beam pockets, older homes near downtown, and significant recent attached housing.",
      eras: [
        {
          label: "1950s–60s tracts",
          desc: "The core of the city. Common findings are galvanised supply piping, cast-iron waste lines at end of life, 100-amp services carrying modern loads, and original aluminium single-pane windows.",
        },
        {
          label: "Eichler & post-and-beam pockets",
          desc: "Low-slope roof membranes, in-slab radiant heating that cannot be economically repaired, exposed post bases at grade, and extensive single-pane glazing.",
        },
        {
          label: "2000s–present condos & townhomes",
          desc: "Concentrated downtown and along El Camino Real. Emphasis shifts to unit-boundary systems, deck and balcony waterproofing, and moisture crossing from shared assemblies.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Original galvanised supply piping",
        desc: "Extremely common in the city's tract housing. Corrosion narrows these lines from the inside, so I test functional flow at several fixtures at once rather than judging by appearance.",
      },
      {
        title: "Electrical services sized for 1955",
        desc: "Original 100-amp services now run air conditioning, EV charging and modern kitchens. I check capacity, panel condition, and whether any known-problem panel equipment is present.",
      },
      {
        title: "Garage and ADU conversions",
        desc: "Very common in Mountain View. I check egress, headers, ventilation, and whether heating and electrical work appears to have been permitted.",
      },
      {
        title: "Eichler radiant slab and roof systems",
        desc: "In the city's post-and-beam pockets these are the two highest-cost items. Both get specific attention rather than a generic note.",
      },
      {
        title: "Bathroom ventilation and hidden moisture",
        desc: "Mid-century bathrooms were rarely built with adequate ventilation, and remodels often did not add it. Thermal imaging finds moisture behind tile and in adjoining walls.",
      },
    ],
    neighborhoods: [
      "Old Mountain View",
      "Cuesta Park",
      "Monta Loma",
      "Rex Manor",
      "Waverly Park",
      "Sylvan Park",
      "Shoreline West",
      "Whisman Station",
    ],
    localNote:
      "Being based here means I can usually offer earlier appointment slots in Mountain View than elsewhere, which matters when a contingency window is short.",
    faqs: [
      {
        q: "You are based in Mountain View — does that mean faster scheduling?",
        a: "Usually yes. Local appointments are easier to fit in at short notice, and same-day reports are standard regardless of where the property is.",
      },
      {
        q: "What is the most common expensive finding in Mountain View homes?",
        a: "Original galvanised supply piping and undersized electrical services, in that order. Both are typical of 1950s and 60s tract construction and both are worth budgeting for if they have not already been replaced.",
      },
      {
        q: "Do you inspect condos and townhomes downtown?",
        a: "Yes. For attached housing I concentrate on what falls within your boundary — the unit's own systems, envelope penetrations, balcony waterproofing, and any evidence of moisture migrating from shared walls or floors above.",
      },
    ],
    nearby: ["palo-alto", "los-altos", "sunnyvale", "santa-clara"],
  },

  {
    slug: "los-altos",
    name: "Los Altos",
    county: "Santa Clara County",
    region: "South Bay",
    heroSubtitle: "1950s ranch homes on former orchard land, and the remodels layered on since.",
    metaTitle: "Home & Mold Inspection in Los Altos, CA",
    metaDescription:
      "Certified home and mold inspection in Los Altos, CA. Mid-century ranch specialist, thermal imaging, thermal & moisture testing, same-day reports.",
    intro: [
      "Los Altos was largely built out in the 1950s and 60s on former orchard land, producing single-storey ranch homes on unusually generous lots. Most have been remodelled at least once, and many have been expanded substantially.",
      "The interesting question in Los Altos is rarely the original construction, which tends to be sound. It is what happened afterwards — how additions were tied in, whether electrical and plumbing were extended properly, and whether drainage still works after decades of landscaping changes.",
    ],
    housingStock: {
      summary:
        "Predominantly 1950s–60s single-storey ranch homes on large lots, heavily remodelled, with an increasing number of full replacement builds.",
      eras: [
        {
          label: "1950s–60s ranch",
          desc: "The dominant type. Typical findings are original galvanised supply lines, cast-iron waste, undersized electrical, and low-pitch roofs with limited attic ventilation.",
        },
        {
          label: "Expanded & remodelled ranch",
          desc: "Additions from the 1980s onward. The recurring problems are roof-to-wall transitions at the junction of old and new, and drainage rerouted around new footprints.",
        },
        {
          label: "2000s–present replacement homes",
          desc: "Large two-storey builds on original lots. Findings skew toward detailing — complex roof geometry, extensive glazing and deck waterproofing over living space.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Addition junctions and roof transitions",
        desc: "Where a 1985 addition meets a 1956 roof is where water gets in. These junctions get direct attention because they account for a large share of the moisture damage I find in Los Altos.",
      },
      {
        title: "Mature tree roots in sewer laterals",
        desc: "Large lots with mature oaks and remaining orchard trees mean root intrusion into original clay laterals is frequent. Recurring drain problems usually trace here.",
      },
      {
        title: "Limited attic ventilation on low-pitch roofs",
        desc: "Ranch homes with shallow roof pitch often have inadequate ventilation, which drives heat load and condensation and shortens roof life.",
      },
      {
        title: "Irrigation against the foundation",
        desc: "Decades of landscaping on generous lots frequently ends with sprinklers running against the structure — a common and correctable cause of persistent crawl space moisture.",
      },
      {
        title: "Original electrical carrying modern loads",
        desc: "Ranch homes expanded over time often still run on their original service. I check capacity and panel condition against what the house now actually draws.",
      },
    ],
    neighborhoods: [
      "Old Los Altos",
      "North Los Altos",
      "South Los Altos",
      "Country Club",
      "Highlands",
      "Loyola Corners",
    ],
    localNote:
      "Los Altos lots are large and heavily landscaped, which makes site drainage and tree impact a bigger factor here than in denser neighbouring cities. Both get specific attention.",
    faqs: [
      {
        q: "Most Los Altos homes have been remodelled. Does that make inspection harder?",
        a: "It makes it more important. Remodels hide as much as they fix, and the junction between original and new construction is where problems concentrate. Thermal imaging is particularly useful on heavily remodelled homes because it sees behind finishes that were added later.",
      },
      {
        q: "Should I get a sewer lateral inspection in Los Altos?",
        a: "For an original 1950s or 60s home with mature trees on the lot, yes. Root intrusion into clay laterals is common here and it does not appear in a standard visual inspection.",
      },
      {
        q: "How long does a Los Altos inspection take?",
        a: "Longer than the square footage alone suggests, because large lots mean more site drainage, landscaping and outbuildings to cover. The report still goes out the same day.",
      },
    ],
    nearby: ["mountain-view", "los-altos-hills", "palo-alto", "sunnyvale"],
  },

  {
    slug: "los-altos-hills",
    name: "Los Altos Hills",
    county: "Santa Clara County",
    region: "South Bay",
    heroSubtitle: "Hillside acreage, septic systems and long private drives — a rural inspection profile.",
    metaTitle: "Home & Mold Inspection in Los Altos Hills, CA",
    metaDescription:
      "Certified home and mold inspection in Los Altos Hills, CA. Hillside acreage, septic systems, wildfire exposure and drainage. Same-day reports.",
    intro: [
      "Los Altos Hills is almost entirely large-lot hillside property, with a one-acre minimum and no commercial development. Most homes sit on sloped, wooded parcels served by septic systems, reached by private drives, and exposed to the same wildfire and drainage considerations as the more rural parts of the Peninsula.",
      "The inspection profile here has more in common with Woodside than with Los Altos below the hills. Site systems and terrain are where the money is, and a report that treats the house in isolation from its site is missing most of the picture.",
    ],
    housingStock: {
      summary:
        "Custom homes on one-acre-plus hillside parcels, spanning the 1950s to the present, most with septic systems and many extensively remodelled or rebuilt.",
      eras: [
        {
          label: "1950s–70s custom hillside homes",
          desc: "Often modest originals that have been heavily expanded. Findings centre on foundation stepping, under-floor ventilation, aging septic components and original decks.",
        },
        {
          label: "1980s–2000s custom construction",
          desc: "Larger homes on graded pads, dependent on engineered foundations, retaining walls and site drainage systems working as designed.",
        },
        {
          label: "Recent replacement builds",
          desc: "Substantial new construction with complex rooflines, extensive glazing and below-grade spaces that rely entirely on waterproofing detail.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Septic system condition on sloped sites",
        desc: "Septic is the highest-consequence system on most properties here, and sloped wooded terrain complicates both design and maintenance. I flag what is observable and recommend a dedicated septic evaluation before contingency removal.",
      },
      {
        title: "Hillside drainage and retaining structures",
        desc: "Uphill runoff, subdrains and retaining wall drainage determine whether a hillside home stays dry. Undrained walls and runoff directed at the structure are the most common root causes I find.",
      },
      {
        title: "Wildfire exposure and defensible space",
        desc: "Heavy tree cover, combustible decking and vegetation against structures affect both safety and insurance availability, which is an increasingly practical problem in these hills.",
      },
      {
        title: "Long private drives and access",
        desc: "Drive surface, drainage and grade affect emergency access and ongoing maintenance cost, and are frequently in worse condition than buyers expect.",
      },
      {
        title: "Elevated decks over sloping grade",
        desc: "Decks here are often high above grade. Ledger attachment, flashing and post base condition are safety items rather than cosmetic ones.",
      },
    ],
    neighborhoods: [
      "Country Club",
      "Fremont Hills",
      "Page Mill",
      "Moody Road",
      "Altamont",
      "La Cresta",
    ],
    localNote:
      "One-acre minimum lots, private septic and significant wildfire exposure make this a rural inspection despite the address. Site systems routinely matter more than anything inside the house.",
    faqs: [
      {
        q: "Are most homes here on septic?",
        a: "Yes, the great majority. Septic is a high-consequence system that deserves a dedicated evaluation with tank pumping and component inspection, in addition to what I cover in the general inspection.",
      },
      {
        q: "How does wildfire risk affect what you inspect?",
        a: "It changes the emphasis. Roof material and condition, vent screening, vegetation clearance and combustible decking near the structure all receive specific attention, because they affect both safety and whether the property can be insured affordably.",
      },
      {
        q: "Do you inspect barns, studios and guest houses?",
        a: "Yes. Detached structures have their own electrical, plumbing and drainage, and they are among the most commonly skipped parts of a large hillside property.",
      },
    ],
    nearby: ["los-altos", "portola-valley", "cupertino", "saratoga"],
  },

  {
    slug: "sunnyvale",
    name: "Sunnyvale",
    county: "Santa Clara County",
    region: "South Bay",
    heroSubtitle: "One of the largest concentrations of Eichler homes anywhere — plus extensive post-war tracts.",
    metaTitle: "Home & Mold Inspection in Sunnyvale, CA",
    metaDescription:
      "Certified home and mold inspection in Sunnyvale, CA. Eichler specialist — radiant slab, low-slope roofs, thermal imaging and same-day reports.",
    intro: [
      "Sunnyvale contains some of the largest Eichler tracts ever built, and inspecting them well requires knowing how they were designed rather than treating them as ordinary houses. Post-and-beam framing, low-slope roofs, in-slab radiant heat and floor-to-ceiling glass all behave differently from conventional construction.",
      "The rest of the city is largely conventional 1950s to 70s tract housing, plus a large volume of newer condominium and townhome development. Those have their own predictable profile, driven mostly by original systems reaching end of life.",
    ],
    housingStock: {
      summary:
        "Major Eichler tracts, extensive conventional post-war tract housing, and substantial recent attached development near the Caltrain corridor and downtown.",
      eras: [
        {
          label: "Eichler tracts",
          desc: "Concentrated in several large neighbourhoods. The critical items are low-slope roof membrane condition, in-slab radiant heating, exposed post bases at grade, original glazing, and electrical panels in atrium or exterior locations.",
        },
        {
          label: "1950s–70s conventional tracts",
          desc: "Galvanised supply piping, cast-iron waste at end of life, undersized electrical services, and original aluminium windows are the standard findings.",
        },
        {
          label: "2000s–present condos & townhomes",
          desc: "Focus on unit-boundary systems, balcony and deck waterproofing, and moisture crossing from shared assemblies.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Eichler in-slab radiant heating",
        desc: "Original copper tubing embedded in the slab is effectively unrepairable once it leaks, and replacement means a new heating system entirely. I check supply and return temperatures and look for warm spots and slab-edge efflorescence.",
      },
      {
        title: "Low-slope roof membranes",
        desc: "Eichler and flat-roof homes depend entirely on membrane condition. I assess membrane age, seams, drainage and any ponding, since a failure here reaches the interior quickly.",
      },
      {
        title: "Rotted post bases at grade",
        desc: "Exposed structural posts meeting concrete at grade is a recurring Eichler weak point. These are structural members and their condition matters.",
      },
      {
        title: "Single-pane glazing and condensation",
        desc: "Extensive original glass drives condensation, which drives fungal growth on adjacent finishes. It is a comfort, energy and moisture issue at once.",
      },
      {
        title: "Original plumbing in conventional tracts",
        desc: "Galvanised supply and cast-iron waste in the city's non-Eichler housing are at the age where failure is common. Functional flow and drainage testing tells you more than pipe age.",
      },
    ],
    neighborhoods: [
      "Ponderosa Park",
      "Fairbrae",
      "Cherry Chase",
      "Birdland",
      "Ortega Park",
      "Heritage District",
      "Lakewood",
      "Raynor Park",
    ],
    localNote:
      "Sunnyvale's Eichler concentration means a meaningful share of the city's housing needs an inspector who understands post-and-beam construction. A conventional checklist will miss the systems that actually cost money in these homes.",
    faqs: [
      {
        q: "Do you specialise in Eichler inspections?",
        a: "Eichlers are a regular part of my work in Sunnyvale, Palo Alto and Mountain View. The items I check specifically are the roof membrane, in-slab radiant heating, post bases at grade, glazing and panel location — the things that distinguish an Eichler from a conventional home.",
      },
      {
        q: "How much does an Eichler radiant heat failure cost to fix?",
        a: "I do not quote repair costs, but it is generally a system replacement rather than a repair, because the tubing is embedded in the slab. That is exactly why I test it specifically rather than noting the system's presence and moving on — you want to know before contingency removal, not after.",
      },
      {
        q: "Is mold common in Eichler homes?",
        a: "Condensation on single-pane glazing and moisture penetrating a failing low-slope roof are the two main drivers, and both are common in original-condition Eichlers. A thermal and moisture assessment is available alongside the inspection.",
      },
    ],
    nearby: ["mountain-view", "cupertino", "santa-clara", "los-altos"],
  },

  {
    slug: "cupertino",
    name: "Cupertino",
    county: "Santa Clara County",
    region: "South Bay",
    heroSubtitle: "Post-war tracts, Rancho Rinconada, and a steady stream of large replacement homes.",
    metaTitle: "Home & Mold Inspection in Cupertino, CA",
    metaDescription:
      "Certified home and mold inspection in Cupertino, CA. Tract homes, remodels and new builds. Thermal imaging, thermal & moisture testing, same-day reports.",
    intro: [
      "Cupertino is mostly 1950s through 1970s tract housing, with Rancho Rinconada representing some of the earliest and most modest construction in the city. Alongside that, a steady stream of original homes has been replaced with much larger two-storey builds.",
      "That mix means two very different inspections. On an original tract home the priorities are systems at end of life. On a recent replacement build the priorities are workmanship and detailing, because age has not had time to become the problem yet.",
    ],
    housingStock: {
      summary:
        "1950s–70s single-family tracts including the compact Rancho Rinconada homes, plus substantial recent replacement construction and some newer attached housing.",
      eras: [
        {
          label: "1950s Rancho Rinconada",
          desc: "Small, simply built original homes. Common findings are minimal insulation, original electrical services, galvanised supply piping and low-pitch roofs with limited ventilation.",
        },
        {
          label: "1960s–70s tracts",
          desc: "Larger and better built, but at the age where cast-iron waste lines, water heaters, furnaces and original windows are due for replacement.",
        },
        {
          label: "2000s–present replacement builds",
          desc: "Large two-storey homes on original lots. Findings concentrate on flashing detail, complex roof geometry, deck waterproofing and mechanical systems sized for the new envelope.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Minimal insulation in early tract homes",
        desc: "Rancho Rinconada and similar early housing was built with little or no wall insulation. This drives energy cost and, more importantly for inspection, condensation on cold surfaces.",
      },
      {
        title: "Additions and second-storey conversions",
        desc: "Adding a floor to a 1950s single-storey home puts loads on framing and foundations never designed for it. I look at load paths, and at whether the work appears to have been engineered and permitted.",
      },
      {
        title: "Original electrical serving expanded homes",
        desc: "Expanded footprints on original services are common. I check capacity and panel condition against actual load.",
      },
      {
        title: "Low-pitch roof ventilation",
        desc: "Shallow roof pitch with limited attic ventilation drives heat load and moisture accumulation, shortening roof and sheathing life.",
      },
      {
        title: "Workmanship on recent rebuilds",
        desc: "New does not mean sound. On replacement builds I concentrate on flashing at roof-to-wall transitions, window head flashing, and deck waterproofing over occupied space.",
      },
    ],
    neighborhoods: [
      "Rancho Rinconada",
      "Monta Vista",
      "Garden Gate",
      "Seven Springs",
      "Oak Valley",
      "Inspiration Heights",
      "Fairgrove",
    ],
    localNote:
      "Cupertino's teardown-and-rebuild rate means many blocks now mix 1950s originals with recent large builds. The two need genuinely different inspections, and I approach them that way.",
    faqs: [
      {
        q: "Do new homes really need an inspection?",
        a: "Yes. New construction defects are workmanship defects — flashing, waterproofing, mechanical installation — and they are easier and cheaper to address before you own them. A brand-new house is not a guaranteed sound house.",
      },
      {
        q: "What should I look for in a Rancho Rinconada home?",
        a: "Insulation, electrical capacity, supply piping and roof ventilation, in roughly that order. These were built as modest starter homes and most have not had all four addressed.",
      },
      {
        q: "Can you inspect a home with a second storey added later?",
        a: "Yes, and it deserves specific attention. Adding a floor imposes loads the original framing and foundation were not designed for, so I look closely at load paths and any signs of deflection or distress.",
      },
    ],
    nearby: ["sunnyvale", "saratoga", "santa-clara", "los-altos-hills"],
  },

  {
    slug: "san-jose",
    name: "San Jose",
    county: "Santa Clara County",
    region: "South Bay",
    heroSubtitle: "The widest range of housing in the Bay Area — from 1900s Willow Glen to 1980s Evergreen.",
    metaTitle: "Home & Mold Inspection in San Jose, CA",
    metaDescription:
      "Certified home and mold inspection in San Jose, CA. Willow Glen, Rose Garden, Almaden, Evergreen and beyond. Thermal imaging, same-day reports.",
    intro: [
      "San Jose is not one housing market, it is a dozen. A 1920s bungalow in Willow Glen, a 1950s tract home in Cambrian, a 1970s hillside home in Almaden and a 1985 build in Evergreen have almost nothing in common from an inspection standpoint.",
      "Because of that, the single most useful thing I bring to a San Jose inspection is knowing what to expect before I arrive. Knowing the era and the neighbourhood tells you which systems are likely at end of life and which construction practices of the period are now considered deficient.",
    ],
    housingStock: {
      summary:
        "Everything from pre-1920 downtown and Willow Glen homes to 1950s–60s central tracts, 1970s–80s foothill development in Almaden and Evergreen, and extensive recent infill.",
      eras: [
        {
          label: "1900s–1930s Willow Glen, Rose Garden & downtown",
          desc: "Bungalows and period homes. Expect unbraced cripple walls, unreinforced masonry chimneys, knob-and-tube remnants, and original clay sewer laterals.",
        },
        {
          label: "1950s–60s central tracts",
          desc: "Cambrian, Blossom Valley and West San Jose. Galvanised supply piping, cast-iron waste, undersized electrical services and original windows are standard.",
        },
        {
          label: "1970s–80s foothill development",
          desc: "Almaden Valley, Evergreen and Silver Creek. Priorities shift to site drainage on sloped lots, retaining walls, decks, and expansive soil movement.",
        },
        {
          label: "2000s–present infill & attached housing",
          desc: "Concentrated downtown and along transit corridors. Emphasis on envelope detailing, balcony waterproofing and unit-boundary systems.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Expansive soils in the foothill neighbourhoods",
        desc: "Parts of Almaden, Evergreen and the eastern foothills have clay soils that shrink and swell seasonally. This drives foundation cracking, sticking doors and hardscape movement, and distinguishing seasonal from progressive movement is the key judgement.",
      },
      {
        title: "Unreinforced chimneys and cripple walls",
        desc: "Pre-war Willow Glen, Rose Garden and downtown homes commonly have both. They are significant seismic findings and both have well-understood retrofits.",
      },
      {
        title: "Unpermitted additions and converted space",
        desc: "Widespread across the city. I inspect what is there and flag egress, headers, ventilation and apparently unpermitted electrical or heating work.",
      },
      {
        title: "Aging original plumbing in central tracts",
        desc: "Galvanised supply and cast-iron waste in 1950s and 60s housing are at end of life. Functional testing under simultaneous load reveals more than visual inspection.",
      },
      {
        title: "Hillside drainage and retaining walls",
        desc: "In the foothill neighbourhoods, undrained retaining walls and runoff directed toward structures are the root cause behind most moisture and movement findings.",
      },
    ],
    neighborhoods: [
      "Willow Glen",
      "Rose Garden",
      "Almaden Valley",
      "Evergreen",
      "Cambrian Park",
      "Blossom Valley",
      "Berryessa",
      "Japantown",
      "Naglee Park",
      "Silver Creek",
    ],
    localNote:
      "San Jose spans bay-adjacent flats, central valley floor and eastern and southern foothills. Soil behaviour, drainage priorities and typical construction era all shift substantially across those zones.",
    faqs: [
      {
        q: "San Jose is huge — do you cover the whole city?",
        a: "Yes, from Willow Glen and the Rose Garden through Cambrian and Blossom Valley out to Almaden, Evergreen and Berryessa. Knowing which neighbourhood and which era a home comes from is most of what makes the inspection useful.",
      },
      {
        q: "What are expansive soils and should I worry?",
        a: "Clay soils that expand when wet and shrink when dry, common in parts of the foothill neighbourhoods. They cause seasonal movement — doors that stick in winter and not summer, hairline foundation cracks. Much of it is manageable. What matters is whether movement is seasonal and stable or progressive, and I give you a direct read on that.",
      },
      {
        q: "Are older Willow Glen homes worth buying?",
        a: "Frequently yes, but go in knowing the era's characteristics. Cripple walls, chimneys and original laterals are common and mostly addressable. The inspection tells you which of them this particular house still has.",
      },
    ],
    nearby: ["santa-clara", "campbell", "milpitas", "los-gatos"],
  },

  {
    slug: "santa-clara",
    name: "Santa Clara",
    county: "Santa Clara County",
    region: "South Bay",
    heroSubtitle: "Old Quad period homes alongside extensive post-war tract housing.",
    metaTitle: "Home & Mold Inspection in Santa Clara, CA",
    metaDescription:
      "Certified home and mold inspection in Santa Clara, CA. Old Quad period homes and post-war tracts. Thermal imaging, air testing, same-day reports.",
    intro: [
      "Santa Clara pairs one of the oldest residential districts in the South Bay — the Old Quad, with homes dating to the late 1800s — with large areas of conventional 1950s and 60s tract development built around it.",
      "Those two housing types fail in entirely different ways. The Old Quad brings foundation, chimney and knob-and-tube considerations; the post-war tracts bring plumbing, electrical capacity and window replacement. Knowing which you are buying shapes the entire inspection.",
    ],
    housingStock: {
      summary:
        "Late-1800s to early-1900s homes in the Old Quad, extensive 1950s–60s tract housing throughout, and newer attached development near the commercial corridors.",
      eras: [
        {
          label: "1870s–1920s Old Quad",
          desc: "Victorians and early bungalows. Expect original unreinforced foundations, unbraced cripple walls, masonry chimneys, knob-and-tube remnants and clay laterals.",
        },
        {
          label: "1950s–60s tracts",
          desc: "The bulk of the city. Galvanised supply lines, cast-iron waste, 100-amp services and original aluminium windows are the standard set.",
        },
        {
          label: "1990s–present attached housing",
          desc: "Townhomes and condominiums near the commercial districts. Unit-boundary systems, balcony waterproofing and shared-assembly moisture are the priorities.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Unreinforced foundations in the Old Quad",
        desc: "Homes from the late 1800s and early 1900s frequently sit on original foundations with no reinforcement or anchor bolting. It is a significant but well-understood retrofit.",
      },
      {
        title: "Knob-and-tube remnants",
        desc: "Older Santa Clara homes often have partially updated wiring with original knob-and-tube left live in attics and walls. I trace what I can access and flag what I find.",
      },
      {
        title: "Original galvanised supply piping",
        desc: "Standard in the post-war tracts. Internal corrosion narrows lines invisibly, so I test flow under simultaneous demand rather than judging by appearance.",
      },
      {
        title: "Additions across eras",
        desc: "Many homes here have been extended more than once. Roof-to-wall junctions and rerouted drainage at those points are consistent trouble spots.",
      },
      {
        title: "Bathroom and kitchen moisture behind remodels",
        desc: "Remodels done without upgrading ventilation trap moisture in walls. Thermal imaging locates it behind tile and cabinetry.",
      },
    ],
    neighborhoods: [
      "Old Quad",
      "Forest Park",
      "Rivermark",
      "Killarney Farms",
      "Santa Clara Gardens",
      "Bracher",
      "Ponderosa",
    ],
    localNote:
      "The gap between the Old Quad's 1890s housing and the surrounding 1955 tracts is over sixty years of construction practice. Two homes a few blocks apart can need almost entirely different inspections.",
    faqs: [
      {
        q: "What is different about Old Quad homes?",
        a: "Age. Foundations, chimneys, wiring and sewer laterals from that era predate essentially all modern practice. That does not make them bad houses, but it does mean a longer list of findings and a different set of priorities than a 1955 tract home.",
      },
      {
        q: "Is knob-and-tube wiring dangerous?",
        a: "It is a concern when it is still live, has been buried in insulation, or has been extended with modern wiring. I report what is visible and accessible and recommend evaluation by a licensed electrician where it appears to still be in service.",
      },
      {
        q: "Do you offer same-day reports in Santa Clara?",
        a: "Yes, same-day reporting is standard on every inspection regardless of city.",
      },
    ],
    nearby: ["san-jose", "sunnyvale", "mountain-view", "campbell"],
  },

  {
    slug: "saratoga",
    name: "Saratoga",
    county: "Santa Clara County",
    region: "South Bay",
    heroSubtitle: "Wooded hillside properties, older custom homes and real wildfire exposure.",
    metaTitle: "Home & Mold Inspection in Saratoga, CA",
    metaDescription:
      "Certified home and mold inspection in Saratoga, CA. Hillside and wooded properties, drainage, decks and wildfire exposure. Same-day reports.",
    intro: [
      "Saratoga runs from valley floor up into heavily wooded foothills, and the difference between the two matters. Flatter properties near the village resemble conventional South Bay housing; hillside properties above it have far more in common with Los Gatos and Los Altos Hills.",
      "On the hillside properties, terrain drives the inspection. Drainage, retaining structures, decks, tree impact and wildfire exposure are usually where the significant findings are, and several of them now affect whether a property can be insured at reasonable cost.",
    ],
    housingStock: {
      summary:
        "Mid-century custom and tract homes on the valley floor, larger custom hillside homes above, and a significant number of substantial recent rebuilds.",
      eras: [
        {
          label: "1950s–70s valley floor homes",
          desc: "Conventional construction. Typical findings are original supply piping, aging waste lines, undersized electrical and original windows.",
        },
        {
          label: "1960s–90s hillside custom homes",
          desc: "Findings centre on site drainage, retaining walls, stepped foundations, elevated decks and under-floor ventilation.",
        },
        {
          label: "2000s–present rebuilds",
          desc: "Large replacement homes. Complex roof geometry, extensive glazing, and deck and balcony waterproofing over occupied space are the recurring issues.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Wildfire exposure and insurability",
        desc: "Much of the Saratoga hillside sits in elevated fire hazard areas. Roof material, vent screening, vegetation clearance and combustible decking affect both safety and whether insurance is available at a workable price.",
      },
      {
        title: "Heavy tree canopy over structures",
        desc: "Mature oaks and redwoods drop debris into gutters and valleys, hold moisture against roofs, and lift hardscape. Persistent roof problems here are usually canopy-driven.",
      },
      {
        title: "Hillside drainage and retaining walls",
        desc: "Undrained walls and uphill runoff directed at structures are the most common root cause of moisture and movement findings on Saratoga hillside lots.",
      },
      {
        title: "Aging elevated decks",
        desc: "Decks over sloping grade are common and frequently original. Ledger connections, flashing and post bases are inspected directly.",
      },
      {
        title: "Under-floor moisture in hillside homes",
        desc: "Enclosed under-floor areas cut into slopes ventilate poorly and retain moisture, making them the leading source of fungal growth findings here.",
      },
    ],
    neighborhoods: [
      "Saratoga Village",
      "Golden Triangle",
      "Sunland Park",
      "Saratoga Woods",
      "Bellgrove",
      "Parker Ranch",
      "Montalvo",
    ],
    localNote:
      "Portions of Saratoga sit in state-designated elevated fire hazard areas, and heavy tree cover compounds it. Roof condition and defensible space carry practical insurance consequences alongside safety ones.",
    faqs: [
      {
        q: "Does wildfire risk affect home insurance in Saratoga?",
        a: "It can significantly. Roof material and condition, vent screening, vegetation clearance and combustible decking near the structure all factor into insurability. I flag these specifically because they can affect your ability to insure the property, not just its safety.",
      },
      {
        q: "Are hillside homes riskier to buy?",
        a: "Not inherently, but they demand a different inspection focus. Drainage, retaining structures and decks matter far more than they would on a flat lot, and problems there tend to be expensive when ignored.",
      },
      {
        q: "Do you inspect properties on septic in Saratoga?",
        a: "Yes. Some outlying hillside properties are on septic. I assess what is observable and recommend a dedicated septic evaluation before contingency removal.",
      },
    ],
    nearby: ["los-gatos", "campbell", "cupertino", "los-altos-hills"],
  },

  {
    slug: "campbell",
    name: "Campbell",
    county: "Santa Clara County",
    region: "South Bay",
    heroSubtitle: "Post-war tracts, older downtown bungalows and a wave of newer townhome development.",
    metaTitle: "Home & Mold Inspection in Campbell, CA",
    metaDescription:
      "Certified home and mold inspection in Campbell, CA. Post-war tracts, downtown bungalows and townhomes. Thermal imaging and same-day reports.",
    intro: [
      "Campbell is compact and mostly post-war, with a core of older bungalows near downtown and the former orchard-town centre, surrounded by 1950s and 60s tract housing and a growing amount of newer townhome development.",
      "The city's tract housing is at the stage where original systems have either been replaced already or are overdue. Most Campbell inspections come down to establishing which of those is true for a given house, and what the remaining sequence of work looks like.",
    ],
    housingStock: {
      summary:
        "Early-1900s bungalows near downtown, extensive 1950s–60s tract housing, and substantial recent townhome and condominium development.",
      eras: [
        {
          label: "1900s–1930s downtown bungalows",
          desc: "Original foundations without anchor bolting, unbraced cripple walls, masonry chimneys and clay laterals are typical.",
        },
        {
          label: "1950s–60s tracts",
          desc: "The bulk of the city. Galvanised supply, cast-iron waste, undersized electrical and original windows dominate the findings.",
        },
        {
          label: "2000s–present townhomes",
          desc: "Concentrated near downtown and the Pruneyard area. Priorities are balcony waterproofing, unit-boundary systems and shared-assembly moisture.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Original supply and waste piping",
        desc: "Galvanised supply and cast-iron waste lines in Campbell's tract housing are at end of life. I test functional flow and drainage under simultaneous load rather than judging by age.",
      },
      {
        title: "Electrical capacity in post-war homes",
        desc: "Original services were sized for a fraction of modern demand. I assess capacity, panel condition and whether any known-problem equipment is installed.",
      },
      {
        title: "Cripple walls and chimneys downtown",
        desc: "Older bungalows near the town centre commonly have unbraced cripple walls and unreinforced masonry chimneys, both significant seismic findings with established retrofits.",
      },
      {
        title: "Garage conversions and added units",
        desc: "Common throughout the city. I check egress, headers, ventilation and whether heating and electrical work appears permitted.",
      },
      {
        title: "Balcony waterproofing in newer townhomes",
        desc: "Elevated balconies over occupied space depend entirely on waterproofing and flashing detail, and failures are both expensive and slow to become visible.",
      },
    ],
    neighborhoods: [
      "Downtown Campbell",
      "San Tomas",
      "Pruneyard",
      "Winchester",
      "Dry Creek",
      "Campbell Village",
    ],
    localNote:
      "Campbell's small size and consistent post-war housing stock make findings unusually predictable here — which means the useful question is less what could be wrong and more what has already been addressed.",
    faqs: [
      {
        q: "What is the most common significant finding in Campbell?",
        a: "Original galvanised supply piping and undersized electrical service, both typical of 1950s and 60s tract construction. Many homes have had one addressed but not the other.",
      },
      {
        q: "Do you inspect townhomes and condos?",
        a: "Yes. I focus on what falls within your boundary — the unit's systems, balcony waterproofing, envelope penetrations and any evidence of moisture entering from shared assemblies.",
      },
      {
        q: "Is a Campbell bungalow near downtown a good buy?",
        a: "Often, provided you go in understanding the era. Cripple walls, chimneys and original laterals are common and addressable. The inspection establishes which of them still apply to that specific house.",
      },
    ],
    nearby: ["san-jose", "los-gatos", "saratoga", "santa-clara"],
  },

  {
    slug: "los-gatos",
    name: "Los Gatos",
    county: "Santa Clara County",
    region: "South Bay",
    heroSubtitle: "Downtown Victorians and wooded hillside homes — two very different inspections in one town.",
    metaTitle: "Home & Mold Inspection in Los Gatos, CA",
    metaDescription:
      "Certified home and mold inspection in Los Gatos, CA. Historic downtown homes and wooded hillside properties. Drainage, decks, thermal imaging, same-day reports.",
    intro: [
      "Los Gatos contains two distinct housing markets. Downtown and the Almond Grove district hold late-1800s and early-1900s Victorians and Craftsman homes. Above them, the hillside neighbourhoods are wooded, sloped and much newer, with an entirely different risk profile.",
      "For the historic homes the priorities are foundations, chimneys, wiring and laterals. For the hillside homes they are drainage, retaining structures, decks, tree impact and wildfire exposure. Applying the wrong emphasis to either misses what matters.",
    ],
    housingStock: {
      summary:
        "Late-1800s to early-1900s homes downtown and in Almond Grove, mid-century homes on the valley floor, and extensive wooded hillside development above town.",
      eras: [
        {
          label: "1880s–1920s downtown & Almond Grove",
          desc: "Victorians and Craftsman homes. Expect original unreinforced foundations, unbraced cripple walls, masonry chimneys, knob-and-tube remnants and clay sewer laterals.",
        },
        {
          label: "1950s–70s valley floor",
          desc: "Conventional construction with the usual post-war profile: galvanised supply, cast-iron waste, undersized electrical and original windows.",
        },
        {
          label: "1970s–present hillside homes",
          desc: "Sloped wooded lots. Findings centre on site drainage, retaining walls, stepped foundations, elevated decks and defensible space.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Hillside drainage and slope stability",
        desc: "The wooded hills above town see significant winter runoff. Undrained retaining walls, runoff directed at structures and evidence of slope movement are the highest-consequence findings here.",
      },
      {
        title: "Wildfire exposure in the hills",
        desc: "Heavy tree cover, limited access and combustible decking make defensible space and roof condition matter for insurability as well as safety.",
      },
      {
        title: "Unreinforced foundations and chimneys downtown",
        desc: "Almond Grove and downtown homes from the Victorian era commonly have both, and both are significant seismic findings with well-understood retrofits.",
      },
      {
        title: "Elevated decks over steep grade",
        desc: "Hillside decks are often high above grade and frequently original. Ledger attachment, flashing and post base condition are checked directly as safety items.",
      },
      {
        title: "Tree canopy and roof deterioration",
        desc: "Dense redwood and oak canopy holds moisture against roofs, fills valleys and gutters with debris, and accelerates deterioration well beyond normal wear.",
      },
    ],
    neighborhoods: [
      "Almond Grove",
      "Downtown Los Gatos",
      "Belgatos",
      "Blossom Manor",
      "Los Gatos Woods",
      "Shannon Valley",
      "Vasona Heights",
    ],
    localNote:
      "The hillside neighbourhoods sit in elevated fire hazard areas with dense canopy and narrow access roads, while downtown holds some of the oldest housing in the county. Few towns require such different inspections within such a short distance.",
    faqs: [
      {
        q: "What should I prioritise on a Los Gatos hillside home?",
        a: "Drainage first, then retaining structures, decks and defensible space. On a slope, water management is the mechanism behind most structural and moisture problems, and wildfire preparedness increasingly determines whether you can insure the property affordably.",
      },
      {
        q: "Are historic downtown homes harder to inspect?",
        a: "They produce longer reports, because construction practice from that era differs from modern standards in many respects. That is expected rather than alarming — the value is in knowing which items are genuinely urgent and which are simply characteristic of the age.",
      },
      {
        q: "Do you inspect properties up in the Santa Cruz Mountains above Los Gatos?",
        a: "Yes, and those tend toward a rural profile — septic systems, private water, wildfire exposure and access. Contact me with the address and I will confirm coverage and what the inspection will need to include.",
      },
    ],
    nearby: ["saratoga", "campbell", "san-jose"],
  },
];
