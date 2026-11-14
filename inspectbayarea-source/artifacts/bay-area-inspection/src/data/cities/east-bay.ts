import type { City } from "./types";

export const eastBayCities: City[] = [
  {
    slug: "fremont",
    name: "Fremont",
    county: "Alameda County",
    region: "East Bay",
    heroSubtitle: "Five former towns in one city — historic Niles, Mission San Jose hillsides and vast post-war tracts.",
    metaTitle: "Home & Mold Inspection in Fremont, CA",
    metaDescription:
      "Certified home and mold inspection in Fremont, CA. Niles, Mission San Jose, Irvington and Warm Springs. Thermal imaging, air testing, same-day reports.",
    intro: [
      "Fremont was formed by merging five separate towns, and its housing still reflects that. Niles holds genuinely historic homes, Mission San Jose climbs into the hills, and Irvington, Centerville and Warm Springs are largely post-war tract development with newer construction layered in.",
      "The other defining feature is the Hayward fault, which runs along the eastern edge of the city through the hillside neighbourhoods. Foundation condition, retrofitting and evidence of ground movement carry more weight here than in most Bay Area cities.",
    ],
    housingStock: {
      summary:
        "Historic homes in Niles, hillside properties in Mission San Jose, extensive 1950s–80s tract housing across the flats, and substantial recent development near Warm Springs.",
      eras: [
        {
          label: "Pre-1930 Niles & historic districts",
          desc: "Older homes with original unreinforced foundations, unbraced cripple walls, masonry chimneys and knob-and-tube remnants.",
        },
        {
          label: "1950s–70s tracts",
          desc: "Centerville, Irvington and Sundale. Galvanised supply piping, cast-iron waste, undersized electrical services and original windows are standard.",
        },
        {
          label: "1980s–present development",
          desc: "Ardenwood, Warm Springs and newer infill. Findings shift toward envelope detailing, deck and balcony waterproofing, and mechanical installation quality.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Hayward fault proximity in the eastern hills",
        desc: "The fault runs along the eastern edge of the city. Foundation type, anchor bolting, cripple wall bracing and any evidence of ground displacement receive particular attention in Mission San Jose and adjacent areas.",
      },
      {
        title: "Hillside drainage in Mission San Jose",
        desc: "Sloped lots with uphill runoff, retaining walls and stepped foundations follow the same pattern as other Bay Area hillside neighbourhoods — water management is the root cause behind most findings.",
      },
      {
        title: "Low-lying drainage in the western flats",
        desc: "Areas near the bay margin sit at low elevation with a high water table, producing damp crawl spaces and elevated indoor humidity.",
      },
      {
        title: "Original systems in post-war tracts",
        desc: "Galvanised supply and cast-iron waste in the 1950s–70s housing are at end of life. Functional testing under simultaneous demand is more informative than pipe age.",
      },
      {
        title: "Unpermitted additions and conversions",
        desc: "Common across the city's tract neighbourhoods. Egress, headers, ventilation and apparently unpermitted electrical or heating work all get flagged.",
      },
    ],
    neighborhoods: [
      "Mission San Jose",
      "Niles",
      "Irvington",
      "Centerville",
      "Warm Springs",
      "Ardenwood",
      "Glenmoor",
      "Sundale",
    ],
    localNote:
      "The Hayward fault runs through Fremont's eastern hillside neighbourhoods, and portions of the western city sit at low elevation near the bay. Foundation and drainage priorities differ sharply between the two ends of the city.",
    faqs: [
      {
        q: "Does the Hayward fault affect homes in Fremont?",
        a: "It runs along the eastern side of the city, through and near the Mission San Jose area. For homes in that zone I pay particular attention to foundation type, anchor bolting, cripple wall bracing and any signs of ground displacement. Seismic retrofit status is worth establishing before you buy.",
      },
      {
        q: "Fremont is very spread out. Do you cover all of it?",
        a: "Yes — Niles, Mission San Jose, Irvington, Centerville, Warm Springs and Ardenwood. The districts differ a great deal in era and terrain, which is exactly why knowing the neighbourhood matters going in.",
      },
      {
        q: "Are crawl spaces damp in Fremont?",
        a: "In the lower-lying western parts of the city, frequently. High water table and low elevation combine to make crawl space moisture and fungal growth among the more common findings there.",
      },
    ],
    nearby: ["newark", "union-city", "milpitas"],
  },

  {
    slug: "newark",
    name: "Newark",
    county: "Alameda County",
    region: "East Bay",
    heroSubtitle: "Low-lying post-war tracts where drainage and water table drive most findings.",
    metaTitle: "Home & Mold Inspection in Newark, CA",
    metaDescription:
      "Certified home and mold inspection in Newark, CA. Post-war tracts, high water table and drainage specialists. Thermal imaging and same-day reports.",
    intro: [
      "Newark is compact, flat and largely built between the 1950s and 1980s, with newer development added in recent years. It sits at low elevation close to the bay margin, and that single fact drives most of what an inspection turns up here.",
      "Where hillside cities have drainage problems caused by slope, Newark has them caused by the absence of it. Flat sites, a high water table and bay-adjacent soils combine to make crawl space moisture, slab conditions and site drainage the recurring themes.",
    ],
    housingStock: {
      summary:
        "Predominantly 1950s–80s single-family tract housing on flat, low-lying ground, with newer subdivisions and attached housing added more recently.",
      eras: [
        {
          label: "1950s–60s tracts",
          desc: "The oldest of the city's housing. Galvanised supply piping, cast-iron waste lines, undersized electrical services and original windows are typical.",
        },
        {
          label: "1970s–80s tracts",
          desc: "Larger homes, often on slab. Priorities are slab moisture, original HVAC and water heaters, and envelope maintenance.",
        },
        {
          label: "2000s–present subdivisions",
          desc: "Newer construction where findings concentrate on workmanship — flashing, drainage grading and mechanical installation.",
        },
      ],
    },
    commonIssues: [
      {
        title: "High water table and crawl space moisture",
        desc: "Low elevation near the bay means persistently damp crawl spaces. This is the single most common source of fungal growth findings in Newark homes.",
      },
      {
        title: "Flat-site drainage and negative grading",
        desc: "Without slope to move water away, grading and area drains have to do all the work. Negative grading toward the foundation is a frequent and correctable finding.",
      },
      {
        title: "Slab moisture transmission",
        desc: "Slab-on-grade homes over damp soils transmit moisture upward, showing as flooring failures, baseboard damage and elevated indoor humidity.",
      },
      {
        title: "Original plumbing in 1950s–60s housing",
        desc: "Galvanised supply and cast-iron waste in the oldest tracts are at end of life. Functional flow and drainage testing tells you where they actually stand.",
      },
      {
        title: "Indoor humidity and ventilation",
        desc: "Damp ground and tight homes make bathroom and laundry ventilation more important here than in drier inland cities. Inadequate ventilation shows up quickly as surface mold.",
      },
    ],
    neighborhoods: [
      "Newark Centre",
      "Lakeshore",
      "Bridgepointe",
      "Birch Grove",
      "Musick",
      "Cherry-Guardino",
    ],
    localNote:
      "Newark sits at low elevation on the bay plain with a correspondingly high water table. Moisture-related findings are more common here than in most of the cities I serve, and they are usually correctable with drainage and ventilation work.",
    faqs: [
      {
        q: "Why is mold more common in Newark?",
        a: "Low elevation and a high water table keep crawl spaces and soils damp, and flat sites make drainage harder to achieve. That combination produces more moisture findings than in hillside or inland cities. It is generally correctable with vapour barrier, drainage and ventilation improvements.",
      },
      {
        q: "Should I get air quality testing here?",
        a: "It is worth considering, particularly on older homes with crawl spaces or any history of drainage problems. I do the thermal scan and moisture mapping during the same visit.",
      },
      {
        q: "Are slab homes a problem in Newark?",
        a: "Not inherently, but slab-on-grade over damp soils can transmit moisture upward. I check for the signs — flooring failures, baseboard damage, elevated humidity — rather than assuming based on construction type.",
      },
    ],
    nearby: ["fremont", "union-city", "milpitas"],
  },

  {
    slug: "union-city",
    name: "Union City",
    county: "Alameda County",
    region: "East Bay",
    heroSubtitle: "1960s–80s tracts on the flats, hillside homes above, and the Hayward fault between them.",
    metaTitle: "Home & Mold Inspection in Union City, CA",
    metaDescription:
      "Certified home and mold inspection in Union City, CA. Tract and hillside homes, seismic and drainage considerations. Thermal imaging, same-day reports.",
    intro: [
      "Union City divides between flat, low-lying tract neighbourhoods to the west and hillside development climbing into the eastern hills. The Hayward fault runs between them, which makes foundation condition and retrofit status a live question across much of the city.",
      "The two halves need different attention. On the flats the priorities are drainage, water table and aging original systems. On the hillside they are site drainage, retaining structures, decks and evidence of ground movement.",
    ],
    housingStock: {
      summary:
        "Predominantly 1960s–80s single-family tract housing across the flats, hillside development to the east, and newer attached housing near the BART corridor.",
      eras: [
        {
          label: "1960s–70s tracts",
          desc: "The core of the city. Cast-iron waste lines, original electrical services, aging water heaters and furnaces, and original windows are the standard findings.",
        },
        {
          label: "1980s–90s hillside development",
          desc: "Sloped lots dependent on engineered foundations, retaining walls and site drainage. Decks and under-floor ventilation are recurring items.",
        },
        {
          label: "2000s–present transit-oriented development",
          desc: "Attached housing near BART. Focus on unit-boundary systems, balcony waterproofing and shared-assembly moisture.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Hayward fault proximity",
        desc: "The fault runs through the city. Foundation type, anchor bolting, cripple wall bracing and retrofit status all receive particular attention, especially in the eastern neighbourhoods.",
      },
      {
        title: "Hillside drainage and retaining walls",
        desc: "Eastern hillside properties show the familiar pattern — undrained retaining walls and uphill runoff directed toward structures as the root cause of later moisture and movement.",
      },
      {
        title: "Low-lying crawl space moisture",
        desc: "The western flats sit at low elevation with a high water table, producing damp crawl spaces and the fungal growth that follows.",
      },
      {
        title: "Original systems in 1960s–70s tracts",
        desc: "Cast-iron waste lines, original panels and aging mechanical equipment are at or past expected service life across much of the city's housing.",
      },
      {
        title: "Unpermitted conversions",
        desc: "Garage conversions and added living space are common. Egress, headers, ventilation and apparently unpermitted electrical work are flagged.",
      },
    ],
    neighborhoods: [
      "Decoto",
      "Alvarado",
      "Sugar Mill Landing",
      "Union Landing",
      "Mission Hills",
      "Cabello",
    ],
    localNote:
      "The Hayward fault crosses Union City, separating low-lying western tracts from eastern hillside development. Seismic retrofit status is worth establishing on any older home here.",
    faqs: [
      {
        q: "Should I ask about seismic retrofitting in Union City?",
        a: "Yes. With the Hayward fault running through the city, foundation anchor bolting and cripple wall bracing are worth confirming on any pre-1980 home. I report what I can observe and tell you plainly whether the work appears to have been done.",
      },
      {
        q: "Is there a big difference between east and west Union City?",
        a: "A substantial one. The western flats are low-lying with drainage and water table concerns; the eastern hillside areas have slope drainage, retaining walls and deck considerations. The inspection emphasis shifts accordingly.",
      },
      {
        q: "Do you offer same-day reports in the East Bay?",
        a: "Yes. Same-day reporting is standard on every inspection regardless of which city the property is in.",
      },
    ],
    nearby: ["fremont", "newark", "hayward"],
  },

  {
    slug: "hayward",
    name: "Hayward",
    county: "Alameda County",
    region: "East Bay",
    heroSubtitle: "The Hayward fault runs straight through town — and the housing stock spans a century.",
    metaTitle: "Home & Mold Inspection in Hayward, CA",
    metaDescription:
      "Certified home and mold inspection in Hayward, CA. Seismic considerations, older housing stock and hillside homes. Thermal imaging, same-day reports.",
    intro: [
      "Hayward is defined more directly by geology than any other city I serve. The Hayward fault runs through the middle of the city, and its trace is visible in offset curbs and structures in places. For older homes here, foundation condition and seismic retrofit status are not background considerations — they are the main event.",
      "The housing stock spans a full century, from pre-war homes downtown through extensive post-war tracts to hillside development above. That range means the inspection has to be matched to the era and location rather than run from a single template.",
    ],
    housingStock: {
      summary:
        "Pre-war homes near downtown, extensive 1940s–70s tract housing across the flats, hillside development in the Hayward Hills, and newer infill near transit.",
      eras: [
        {
          label: "Pre-1940 downtown homes",
          desc: "Original unreinforced foundations, unbraced cripple walls, unreinforced masonry chimneys, knob-and-tube remnants and clay sewer laterals.",
        },
        {
          label: "1940s–70s tracts",
          desc: "The bulk of the city. Galvanised supply piping, cast-iron waste, undersized electrical services and original windows are the standard set.",
        },
        {
          label: "1970s–present hillside & infill",
          desc: "Hillside homes bring drainage, retaining wall and deck considerations; newer infill brings envelope detailing and waterproofing.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Hayward fault and seismic retrofit status",
        desc: "The fault runs directly through the city. Foundation anchor bolting, cripple wall bracing and chimney condition are central findings on any older Hayward home, and retrofit status materially affects both safety and insurance.",
      },
      {
        title: "Unreinforced masonry chimneys",
        desc: "Common in the pre-war housing stock and a genuine life-safety concern in a city sitting on an active fault. Condition and attachment are documented specifically.",
      },
      {
        title: "Deferred maintenance in older tracts",
        desc: "Long ownership tenures mean roofing, plumbing, electrical and drainage backlogs are common. The value of the report is in sequencing them correctly.",
      },
      {
        title: "Hillside drainage above the fault line",
        desc: "Hayward Hills properties combine slope drainage and retaining wall concerns with fault proximity, making site observation especially important.",
      },
      {
        title: "Unpermitted work",
        desc: "Additions, conversions and added units are frequent. Egress, headers, ventilation and apparently unpermitted electrical and heating work are all flagged for follow-up with the city.",
      },
    ],
    neighborhoods: [
      "Hayward Hills",
      "Downtown Hayward",
      "Mount Eden",
      "Cherryland",
      "Fairway Park",
      "Glen Eden",
      "Harder-Tennyson",
    ],
    localNote:
      "The Hayward fault runs through the centre of the city, and its surface trace is visible in offset curbs and structures in some neighbourhoods. Seismic retrofit status deserves explicit attention on any older home here.",
    faqs: [
      {
        q: "How much should the Hayward fault affect my decision?",
        a: "It should inform what you check rather than whether you buy — a great many people live along it. What matters is whether the specific home has been retrofitted: foundation anchor bolting, cripple wall bracing and chimney condition. I report clearly on all three so you know where the house stands.",
      },
      {
        q: "What is a cripple wall and why does it keep coming up?",
        a: "It is the short stud wall between the foundation and the first floor, common in homes built before the 1970s. Unbraced, it is one of the most likely points of failure in an earthquake, and adding plywood shear panels and anchor bolts is a well-understood, relatively affordable retrofit.",
      },
      {
        q: "Do you inspect older homes with a lot of deferred maintenance?",
        a: "Regularly, and it is where a good report earns its cost. I separate safety and structural items needing attention now from systems you should budget for and maintenance you can schedule, so the backlog becomes a plan rather than a wall of problems.",
      },
    ],
    nearby: ["union-city", "fremont", "newark"],
  },

  {
    slug: "milpitas",
    name: "Milpitas",
    county: "Santa Clara County",
    region: "East Bay",
    heroSubtitle: "1960s–80s tracts, hillside development above, and extensive new transit-oriented housing.",
    metaTitle: "Home & Mold Inspection in Milpitas, CA",
    metaDescription:
      "Certified home and mold inspection in Milpitas, CA. Tract homes, hillside properties and new transit-oriented development. Same-day reports.",
    intro: [
      "Milpitas is mostly 1960s through 1980s tract housing on the valley floor, with hillside development climbing the eastern foothills and a large volume of recent high-density construction near the BART and light rail corridor.",
      "The valley floor tracts follow a predictable pattern driven by age. The hillside neighbourhoods bring drainage and retaining wall considerations. The new attached housing brings a different set again — waterproofing, unit boundaries and workmanship rather than wear.",
    ],
    housingStock: {
      summary:
        "Predominantly 1960s–80s single-family tracts, eastern hillside development, and substantial recent condominium and townhome construction near transit.",
      eras: [
        {
          label: "1960s–70s tracts",
          desc: "The core of the city's housing. Cast-iron waste lines, original electrical services, aging mechanical equipment and original windows are typical.",
        },
        {
          label: "1980s–90s hillside development",
          desc: "Sloped lots with engineered foundations, retaining walls and drainage systems. Decks and under-floor ventilation are recurring findings.",
        },
        {
          label: "2010s–present transit-oriented housing",
          desc: "High-density condominium and townhome construction. Priorities are balcony and deck waterproofing, unit-boundary systems and moisture from shared assemblies.",
        },
      ],
    },
    commonIssues: [
      {
        title: "Low-lying drainage on the western flats",
        desc: "Areas closer to the bay margin sit at low elevation, producing damp crawl spaces, slab moisture and elevated indoor humidity.",
      },
      {
        title: "Hillside drainage and retaining walls",
        desc: "Eastern foothill properties show the standard slope pattern — undrained walls and uphill runoff aimed at structures driving later moisture and movement findings.",
      },
      {
        title: "Original systems in 1960s–70s housing",
        desc: "Cast-iron waste, original panels and aging water heaters and furnaces are at or past service life in much of the city's older tract stock.",
      },
      {
        title: "Balcony waterproofing in new attached housing",
        desc: "Elevated balconies over occupied space depend entirely on waterproofing detail. Failures are expensive and slow to become visible, so these get direct attention.",
      },
      {
        title: "Unpermitted conversions",
        desc: "Garage conversions and added living space are common in the older tracts. Egress, headers, ventilation and apparently unpermitted work are flagged.",
      },
    ],
    neighborhoods: [
      "Sunnyhills",
      "Milpitas Hills",
      "Parktown",
      "Sinclair Horizon",
      "Terra Serena",
      "Midtown",
      "McCarthy Ranch",
    ],
    localNote:
      "Milpitas runs from low-lying bay-margin flats up into the eastern foothills, and the recent wave of transit-oriented construction has added a third housing type with an entirely different inspection profile.",
    faqs: [
      {
        q: "Do you inspect new condos and townhomes in Milpitas?",
        a: "Yes, and it is worth doing. New construction issues are workmanship issues — balcony waterproofing, flashing, mechanical installation — and they are far easier to address before closing than after.",
      },
      {
        q: "Are the hillside homes different to inspect?",
        a: "Yes. Site drainage, retaining walls, stepped foundations and decks matter much more on a slope than on the valley floor, and problems there tend to be expensive if left alone.",
      },
      {
        q: "Is crawl space moisture common in Milpitas?",
        a: "In the lower-lying western areas, yes. It is the most frequent source of fungal growth findings there, and it is usually correctable with vapour barrier, drainage and ventilation work.",
      },
    ],
    nearby: ["fremont", "san-jose", "santa-clara", "newark"],
  },
];
