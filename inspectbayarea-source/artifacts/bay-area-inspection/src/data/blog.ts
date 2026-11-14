import { photos } from "@/data/photos";


export type InlineNode = string | { text: string; href: string };

export interface BlogSection {
  heading?: string;
  body?: (string | InlineNode[])[];
  list?: (string | InlineNode[])[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string; // ISO
  readTime: string;
  hero: string;
  heroAlt: string;
  tags: string[];
  intro: string[];
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "home-inspection-cost-san-francisco",
    title: "How Much Does a Home Inspection Cost in San Francisco?",
    excerpt:
      "What actually decides the cost of a Bay Area home inspection, what should be included in every quote, and how to compare two quotes fairly.",
    category: "Pricing & Value",
    author: "Bay Area Inspection Services",
    date: "2026-08-19",
    readTime: "6 min read",
    hero: photos.doorbell.src,
    heroAlt: "Front entry of a San Francisco home before an inspection",
    tags: ["home inspection cost", "san francisco", "quote", "condo inspection", "bay area"],
    intro: [
      "The honest answer is that a home inspection in San Francisco is priced to the property, not to a rate sheet. A one-bedroom condo and a three-story Victorian with a crawl space and an attic are not the same afternoon, and a number quoted without knowing which one you have is a guess.",
      "So we quote each property individually, for free, usually within the hour. Here is what moves the number, what should be included whatever it turns out to be, and how to compare two quotes so you are pricing the same service.",
    ],
    sections: [
      {
        heading: "How we quote, and what is included",
        body: [
          "Send us the address and we give you one firm number for your property. It covers the entire visit: a full walkthrough of every major system, infrared thermal imaging, calibrated moisture readings, and a same-day, photo-rich report.",
          "Some firms in this market charge extra for a fast turnaround on the report, or treat thermal imaging as an add-on rather than a standard part of the inspection. Neither is a line item here. If a quote you're comparing treats thermal imaging as an upsell rather than a default, you're not pricing the same service.",
        ],
      },
      {
        heading: "Why a quote should come from the property, not a rate card",
        body: [
          "Pricing genuinely depends on square footage, age, and access, so any number given without seeing the property is necessarily approximate. The useful version of a quote is one where you send an address and get back a firm figure that will not change on the day, rather than a range that opens the door to a surcharge.",
          "That is why we ask for the address first. It takes a minute, and it means the number you hear is the number you pay.",
        ],
      },
      {
        heading: "What actually changes the quote",
        body: [
          "Four things move a quote, and none of them are a surprise sprung on you after the inspection is already done.",
        ],
        list: [
          "Square footage — larger properties take longer to document properly.",
          "Age of the property — pre-war housing, knob-and-tube remnants, and additions built across several code eras all take longer to assess than a home built in one pass.",
          "Crawl space and attic access — a full-height basement is quick to inspect; a crawl space with a jammed hatch and eighteen inches of clearance is not.",
          "How many services you combine — booking a mold assessment alongside the home inspection costs less than two separate visits, because it's one trip and one report.",
        ],
      },
      {
        heading: "Why a condo is quoted differently from a house",
        body: [
          "An attached unit has no roof or foundation of its own to assess, and the building envelope is smaller — so the inspection focuses on what actually falls inside your unit: the systems, the envelope penetrations, balcony and deck waterproofing, and any moisture arriving from a shared wall or the unit above.",
          "That is a genuinely shorter visit than a three-story Victorian with a full basement and an attic, so the quote reflects that rather than charging condo buyers for time nobody's spending on their property.",
        ],
      },
      {
        heading: "What you get, no matter which one you book",
        list: [
          "A same-day, photo-rich written report",
          "Infrared thermal imaging where it's relevant to a finding",
          "Calibrated moisture meter readings, not guesses",
          "A walkthrough at the end so you can ask questions in person",
          "No pressure to book remediation or repairs — we don't sell either",
        ],
      },
      {
        heading: "If a quote comes in lower, ask these questions before you book",
        body: [
          "A lower quote isn't automatically a worse inspection — some of the most competitively priced inspectors in this region genuinely run a tight, efficient operation. But price alone doesn't tell you what you're comparing. Before you book the cheaper option, ask a few specific questions: Is thermal imaging included, or is it a paid add-on? Do you get the report the same day, or does that cost extra? Does the inspector walk the property with you, or do you just receive a PDF by email?",
          "Those three questions expose most of the real difference between a budget inspection and a full one. Sometimes the cheaper option genuinely includes all of it. Often it doesn't, and the gap shows up as a surcharge you didn't know to ask about until you're already on the phone.",
        ],
      },
      {
        heading: "Beyond the home inspection",
        body: [
          [
            "If moisture, mold, or a possible gas leak is part of what's worrying you, each has its own service: ",
            { text: "mold inspection", href: "/services/mold-inspection" },
            ", ",
            { text: "moisture and water damage assessment", href: "/services/moisture-water-damage" },
            " and ",
            { text: "gas leak detection", href: "/services/gas-leak-detection" },
            ". On an older home or anything with a history of water damage, the ",
            { text: "Home + Mold Bundle", href: "/services/home-mold-bundle" },
            " combines the full inspection with a mold assessment at a discounted combined rate. See ",
            { text: "how quotes work", href: "/pricing" },
            ", or ",
            { text: "get in touch", href: "/contact" },
            " for a firm quote on your specific property.",
          ],
        ],
      },
    ],
  },
  {
    slug: "signs-of-hidden-mold",
    title: "7 Signs of Hidden Mold in Your Bay Area Home",
    excerpt:
      "Mold rarely announces itself. Here are the warning signs Bay Area homeowners should never ignore — and what to do about them.",
    category: "Mold & Air Quality",
    author: "Bay Area Inspection Services",
    date: "2026-05-28",
    readTime: "6 min read",
    hero: photos.basementMold.src,
    heroAlt: "Dark staining across an interior wall",
    tags: ["mold", "air quality", "health"],
    intro: [
      "Most mold problems start out of sight — behind drywall, under flooring, or in a crawl space you never visit. By the time mold becomes visible, the colony is usually well established. In the Bay Area, our damp coastal air and older housing stock make hidden mold especially common.",
      "The good news: your home almost always gives you clues before you ever see a spot. Here are seven signs worth taking seriously.",
    ],
    sections: [
      {
        heading: "1. A persistent musty smell",
        body: [
          "That damp, earthy odor — strongest in closets, bathrooms, basements, or near the floor — is one of the most reliable indicators of mold. Mold releases gases as it grows, and your nose often detects it long before your eyes can. If a room smells musty even after cleaning, treat it as a signal, not a nuisance.",
          "Two details make the smell more informative. It is usually strongest low down, because spores and the gases mold produces are heavier than air and settle. And it often intensifies when a space has been closed up — coming home after a weekend away, or opening a rarely used closet, is when people most often notice it.",
        ],
      },
      {
        heading: "2. Past water damage or leaks",
        body: [
          "Any history of a roof leak, plumbing leak, flooding, or a slow drip under a sink dramatically raises the odds of hidden mold. Mold only needs 24–48 hours of moisture to take hold. Even a leak that was 'fixed' years ago can leave colonies behind the wall if the area never fully dried.",
          "This is the single most common scenario found in older Bay Area homes: the water was stopped, the finish was repaired, and nothing ever dried the cavity behind it. If a seller discloses past water damage, the useful question is not whether it was repaired but whether the structure was dried and verified — those are different things, and only one of them prevents mold.",
        ],
      },
      {
        heading: "3. Discoloration or staining",
        body: [
          "Yellow, brown, or greenish stains on walls, ceilings, or baseboards often mark where moisture has traveled — and where mold may be feeding. Bubbling paint, warped drywall, or peeling wallpaper are physical signs that water is or was present behind the surface.",
        ],
      },
      {
        heading: "4. Allergy-like symptoms that improve when you leave",
        body: [
          "If you or your family experience congestion, coughing, itchy eyes, headaches, or worsened asthma at home — and feel noticeably better when you're away — indoor air quality may be the culprit. Mold spores are a common trigger, and the pattern of feeling better away from home is a meaningful clue.",
        ],
      },
      {
        heading: "5. Condensation and high humidity",
        body: [
          "Frequent condensation on windows, sweating pipes, or a generally damp feeling indicates humidity high enough to support mold. Bathrooms, laundry areas, and rooms with poor ventilation are especially vulnerable.",
        ],
      },
      {
        heading: "6. A crawl space or attic you never check",
        body: [
          "These hidden spaces are where Bay Area mold problems most often begin. Poor ventilation, ground moisture, and minor roof leaks create ideal conditions — and because nobody looks, problems grow unchecked for years.",
          "In crawl spaces the usual combination is bare soil, a torn or absent vapour barrier, and vents blocked by landscaping or fallen insulation. In attics it is a small roof leak plus inadequate ventilation. Both are correctable, and both are considerably cheaper to address before the framing is affected.",
        ],
      },
      {
        heading: "7. Recent remodeling over old problems",
        body: [
          "Fresh paint and new flooring can hide a multitude of sins. We regularly find mold behind beautifully remodeled bathrooms where moisture was sealed in rather than resolved. If a home looks suspiciously perfect, it's worth looking deeper.",
        ],
      },
      {
        heading: "When it is probably not mold",
        body: [
          "Not every musty smell or dark patch is mold, and assuming it is can send you spending money in the wrong place. Dark staining around bathroom grout is frequently soap residue or surface mildew rather than growth in the substrate. Efflorescence — the white, powdery mineral deposit that appears on concrete and masonry — looks alarming and is not biological at all.",
          "Condensation is the other frequent misdiagnosis. Cold surfaces plus humid indoor air produce damp walls that look exactly like a leak, and the fix is ventilation and humidity control rather than opening the wall. Telling these apart is largely what moisture metering and dew point readings are for.",
        ],
      },
      {
        heading: "What to do before you call anyone",
        list: [
          "Note where the smell is strongest, and whether it changes after the house has been closed up.",
          "Photograph any staining, and check whether it spreads over the following weeks — a static mark is less urgent than a growing one.",
          "Check the crawl space and attic if you can safely reach them; that is where problems most often start.",
          "Ask the seller, or check your records, about any past leak — and specifically whether the area was dried, not just repaired.",
          "Note whether anyone in the household feels better away from home. That pattern is genuinely informative.",
        ],
      },
      {
        heading: "What to do next",
        body: [
          [
            "If any of these sound familiar, a ",
            { text: "professional mold inspection", href: "/services/mold-inspection" },
            " will tell you definitively what's going on. We combine infrared thermal imaging and moisture mapping to find both visible and hidden mold — without any incentive to oversell remediation. ",
            { text: "Contact us", href: "/contact" },
            " to schedule a same-day assessment.",
          ],
        ],
      },
    ],
  },
  {
    slug: "mold-inspection-cost-bay-area",
    title: "How Much Does a Mold Inspection Cost in the Bay Area?",
    excerpt:
      "What drives the cost of a mold inspection in the Bay Area, and how to make sure you're getting real value.",
    category: "Pricing & Value",
    author: "Bay Area Inspection Services",
    date: "2026-05-12",
    readTime: "5 min read",
    hero: photos.thermalMold.src,
    heroAlt: "Thermal camera used during a mold inspection",
    tags: ["mold", "pricing", "cost"],
    intro: [
      "It's the first question almost everyone asks, and it deserves a straight answer: it depends on the property and on how deep the assessment goes, so we quote each one individually. And the price alone doesn't tell the whole story.",
      "Here's what actually drives the cost — and how to make sure you're paying for a real inspection, not just a quick look.",
    ],
    sections: [
      {
        heading: "What affects the price",
        list: [
          "Property size — larger homes take longer to scan and assess.",
          "Depth of assessment — a quick visual check costs less than a full thermal and moisture survey of the whole property.",
          "Accessibility — crawl spaces, attics, and hard-to-reach areas add time.",
          "Urgency — same-day or rush scheduling may carry a premium.",
        ],
      },
      {
        heading: "Visual-only vs. a full thermal and moisture inspection",
        body: [
          "A visual-only mold assessment is the most affordable option and can be enough when mold is clearly visible and the source is obvious. A full inspection adds infrared thermal imaging and calibrated moisture meters across the property, which is what finds a problem before it is visible on the surface. If you have health concerns, can't see a source but suspect one, or need documented results for a real estate transaction, the full inspection is worth it.",
          "The practical dividing line is whether you already know where the problem is. If there is visible growth on a bathroom wall and an obvious failing seal above it, a visual assessment largely confirms what you can see. If there is a smell with no visible source, or symptoms that improve when the household leaves, the value is entirely in finding what is hidden — and that requires the thermal camera and moisture meters, not just a flashlight.",
        ],
      },
      {
        heading: "Why the cheapest option can cost more",
        body: [
          "Be cautious of remediation companies that offer 'free' or very cheap inspections. When the company that tests for mold also sells the cleanup, there's a built-in conflict of interest — and a strong incentive to find expensive problems. An independent, inspection-only company has no reason to oversell. You're paying for an honest answer, which is exactly what protects your wallet.",
          "The asymmetry is worth spelling out. A free inspection that leads to an unnecessary five-figure remediation is vastly more expensive than a paid inspection that concludes you do not have a problem. Being told there is nothing significant to fix is a perfectly good outcome, and it is one an inspection-only company can deliver without losing anything.",
          "It is also worth asking who verifies remediation afterwards. If the contractor who performed the work also certifies that it succeeded, that is the same conflict at the other end of the job. An independent re-check with a thermal camera and moisture meter is the verification that actually means something.",
        ],
      },
      {
        heading: "Questions worth asking before you book",
        list: [
          "Do you also sell remediation? If yes, understand the incentive before you read the findings.",
          "Is thermal imaging included or charged extra? Finding the moisture source matters more than confirming the mold.",
          "Do you check crawl spaces and attics, or only what's visible from the main living areas?",
          "When do I get the report, and does it include photographs?",
          "Will you re-check after remediation? Independent verification is the only real confirmation the work succeeded.",
        ],
      },
      {
        heading: "What you should get for your money",
        list: [
          "A thorough visual assessment of all accessible areas",
          "Infrared thermal imaging and moisture readings",
          "A clear, plain-English report with photos",
          "Practical next steps with no pressure to buy remediation",
        ],
      },
      {
        heading: "The bottom line",
        body: [
          [
            "A good ",
            { text: "mold inspection", href: "/services/mold-inspection" },
            " is one of the highest-value things you can pay for on a home — especially in the Bay Area, where a single hidden moisture problem can cost tens of thousands to fix. ",
            { text: "Contact us for a fast, transparent quote", href: "/contact" },
            " tailored to your property.",
          ],
        ],
      },
    ],
  },
  {
    slug: "home-inspection-checklist",
    title: "The Complete Home Inspection Checklist for Buyers",
    excerpt:
      "Exactly what a thorough home inspection should cover — so you know what you're getting and what to look for before you buy.",
    category: "Home Buying",
    author: "Bay Area Inspection Services",
    date: "2026-04-30",
    readTime: "7 min read",
    hero: photos.labReport.src,
    heroAlt: "Inspection tools and a report clipboard laid out at a property",
    tags: ["home inspection", "buyers", "checklist"],
    intro: [
      "A home inspection is your single best opportunity to understand what you're really buying. But not all inspections are equal. Use this checklist to know what a thorough inspection covers — and to make sure nothing important gets skipped.",
      "Two things are worth understanding before you read the list. A general home inspection is visual and non-invasive: nothing gets opened up, dug out, or dismantled. And it is a snapshot of one day — it tells you the condition of the property at the moment it was inspected, not a warranty against what happens afterwards. Within those limits, a thorough inspection is still the most useful few hundred dollars you will spend on a purchase.",
    ],
    sections: [
      {
        heading: "Roof and exterior",
        body: [
          "The exterior is where most expensive problems start, because it is what keeps water out. Roof covering, flashing at every penetration and transition, gutters that actually discharge away from the building, and grading that slopes away rather than toward the foundation all get checked. In Bay Area housing, the single most common root cause behind interior damage is water that was allowed to sit against or run into the structure from outside.",
          "On older homes, pay particular attention to where a later addition meets the original roofline. That junction is where flashing details most often fail, and it accounts for a large share of the concealed damage found during inspections.",
        ],
        list: [
          "Roof covering, flashing, and signs of leaks or aging",
          "Gutters, downspouts, and drainage away from the foundation",
          "Siding, trim, and exterior paint condition",
          "Grading, walkways, driveways, and retaining walls",
          "Roof-to-wall transitions where additions meet original construction",
        ],
      },
      {
        heading: "Structure and foundation",
        body: [
          "Foundations crack. That by itself tells you very little — concrete shrinks as it cures and hairline cracking is normal. What matters is the pattern: whether cracks are stable or progressive, whether they are displaced, and whether doors and windows are racking in a way that suggests active movement.",
          "In a seismic region, two findings carry extra weight on older homes: unbraced cripple walls (the short stud walls between foundation and first floor) and unreinforced masonry chimneys. Both are common in pre-1970s construction, both are genuine concerns, and both have well-understood retrofits. A good report tells you which of them this particular house still has.",
        ],
        list: [
          "Foundation for cracks, settlement, or movement",
          "Framing and load-bearing elements where visible",
          "Crawl space for moisture, pests, and support issues",
          "Signs of past or ongoing structural repair",
          "Cripple wall bracing and foundation anchor bolting",
          "Masonry chimney condition and attachment",
        ],
      },
      {
        heading: "Electrical",
        body: [
          "Electrical findings split into two categories: what is unsafe, and what is simply undersized for how people live now. A 100-amp service installed in 1955 was never intended to run air conditioning, induction cooking and EV charging simultaneously. That is not a defect exactly, but it is a cost you should know about before you own it.",
          "Certain panel brands and older wiring types warrant specific attention, and knob-and-tube remnants left live in attics and wall cavities are common in pre-war homes that were only partially rewired. Anything of that kind should be flagged clearly rather than buried in a list.",
        ],
        list: [
          "Main panel, breakers, and wiring condition",
          "Service capacity against how the home is actually used",
          "GFCI protection in kitchens, baths, and exterior outlets",
          "Outlets, switches, and visible safety hazards",
          "Knob-and-tube remnants and prior partial rewiring",
          "Smoke and carbon monoxide detector presence",
        ],
      },
      {
        heading: "Plumbing",
        body: [
          "Original galvanised steel supply piping is the quiet expense in a lot of mid-century Bay Area housing. It corrodes from the inside, so it can look perfectly sound while flow has collapsed. Testing several fixtures under simultaneous demand reveals far more than looking at the pipe.",
          "Cast-iron waste lines of the same era are at or past their expected service life. And on any older property with mature trees, the sewer lateral deserves its own conversation — root intrusion into original clay pipe is common, expensive, and completely invisible to a standard visual inspection.",
        ],
        list: [
          "Supply lines, water pressure, and visible leaks",
          "Functional flow tested under simultaneous demand",
          "Drains, traps, and waste lines",
          "Water heater age, condition, and seismic strapping",
          "Fixtures, faucets, and toilets",
        ],
      },
      {
        heading: "HVAC and interior",
        body: [
          "Heating and cooling equipment is checked for operation, age, and whether it performs to specification rather than merely switching on. On gas equipment, venting matters as much as the appliance itself — a disconnected or badly sloped flue connector is a carbon monoxide concern, not just an efficiency one.",
          "Interior findings are often symptoms rather than causes. A stained ceiling, a sticking door, or a soft patch of flooring usually points at something structural or moisture-related elsewhere, which is why they get traced rather than simply noted.",
        ],
        list: [
          "Heating and cooling equipment operation and age",
          "Gas appliance venting and draft",
          "Ductwork and overall system performance",
          "Walls, ceilings, and floors for damage or stains",
          "Windows, doors, stairs, and railings",
        ],
      },
      {
        heading: "What a general inspection does not cover",
        body: [
          "Knowing the boundaries is as useful as knowing the scope, because it tells you which specialists to bring in and when. A general inspection is visual and non-invasive, so it does not include opening walls, running a camera down the sewer lateral, licensed pest work, geotechnical assessment of the ground itself, or anything genuinely inaccessible or unsafe to reach.",
          "None of that is a gap in the inspection — it is the difference between a generalist assessment and a specialist one. What a good report does is tell you plainly when a finding warrants a specialist, rather than leaving it vague. On an older property with mature trees, for example, a sewer scope from a licensed plumber is worth doing separately, and in San Francisco it may be a transaction requirement rather than an option.",
        ],
      },
      {
        heading: "Don't forget moisture and mold",
        body: [
          [
            "A ",
            { text: "standard home inspection", href: "/services/full-home-inspection" },
            " is visual. In the Bay Area, where moisture is the leading cause of expensive surprises, it's smart to add infrared thermal imaging and — for older or water-history homes — ",
            { text: "mold testing", href: "/services/mold-inspection" },
            ". That's why we offer a combined ",
            { text: "Home + Mold Bundle", href: "/services/home-mold-bundle" },
            " that covers both the visible structure and the hidden threats in a single visit.",
          ],
        ],
      },
      {
        heading: "Attend if you can",
        body: [
          "The report matters, but standing in the home while your inspector points out findings is invaluable. You'll understand the difference between a cosmetic note and a deal-breaker — and you'll negotiate from a position of knowledge.",
        ],
      },
    ],
  },
  {
    slug: "what-inspectors-find-bay-area-homes",
    title: "5 Problems We Find Most Often in Bay Area Homes",
    excerpt:
      "From slab leaks to overloaded panels, here are the issues that show up again and again in Bay Area properties — and why they matter.",
    category: "Home Buying",
    author: "Bay Area Inspection Services",
    date: "2026-04-15",
    readTime: "6 min read",
    hero: photos.foundation.src,
    heroAlt: "Cracked concrete at the perimeter of a building",
    tags: ["home inspection", "bay area", "common issues"],
    intro: [
      "After inspecting hundreds of Bay Area homes, certain problems show up over and over. The region's older housing stock, seismic considerations, and damp microclimate create a recognizable pattern of issues. Here are the five we find most often.",
      "None of these are exotic. That is rather the point — the expensive surprises in Bay Area housing are usually predictable consequences of when and how these homes were built, which means they can be anticipated, budgeted for, and negotiated around rather than discovered after closing.",
    ],
    sections: [
      {
        heading: "1. Hidden moisture and water intrusion",
        body: [
          "This is the big one. Slow roof leaks, plumbing drips, poor drainage, and condensation all leave moisture where you can't see it. Left alone, it leads to rot, structural damage, and mold. Infrared imaging routinely reveals damp areas that look perfectly normal to the naked eye.",
          "The most common single location is the crawl space: bare soil, a torn or missing vapour barrier, and vents that have been blocked by landscaping or insulation. That combination keeps floor framing damp year-round. The second most common is a bathroom that was remodelled without upgrading the ventilation — the tile looks new, the substrate behind it does not.",
          "Worth distinguishing from a leak is straightforward condensation. Cold surfaces plus humid indoor air produce wet walls that look identical to water intrusion but need a completely different fix. Getting that distinction right is the difference between adding ventilation and opening a wall for nothing.",
        ],
      },
      {
        heading: "2. Aging or overloaded electrical systems",
        body: [
          "Many Bay Area homes were built decades before modern electrical demands existed. We frequently find outdated panels, missing GFCI protection, ungrounded outlets, and amateur wiring from past DIY projects — all of which are safety concerns worth addressing.",
          "Capacity is the theme. A service sized for a 1955 household now runs air conditioning, induction cooking, and increasingly EV charging. That is not a defect in the original work, but it is a real cost, and it is one buyers routinely fail to budget for because nothing looks visibly wrong.",
          "On pre-war homes, partial rewiring is the specific thing to watch. A house that was updated in the 1980s often still has original knob-and-tube left live in attics and wall cavities, sometimes buried under later insulation. Anything of that kind warrants evaluation by a licensed electrician rather than a note in passing.",
        ],
      },
      {
        heading: "3. Foundation and drainage issues",
        body: [
          "From expansive soils to hillside lots, foundations here take a beating. We look closely for cracks, settlement, and — critically — drainage that directs water toward the home instead of away from it, which is often the root cause of foundation and crawl space problems.",
          "Almost every foundation has cracks, and most of them mean very little. What matters is the pattern: displaced versus hairline, progressive versus stable, and whether doors and windows are racking. Seasonal movement on expansive clay soils — doors that stick in winter and not in summer — is common in parts of the South Bay and generally manageable.",
          "On sloped lots the mechanism is almost always water. Uphill runoff directed at the structure, undrained retaining walls building hydrostatic pressure, and downspouts discharging at the foundation cause the problems that later present as movement. Fixing drainage is usually far cheaper than fixing what drainage did.",
        ],
      },
      {
        heading: "4. Deferred roof and exterior maintenance",
        body: [
          "Roofs that are near the end of their life, failing flashing, and dried-out caulking are common. These aren't always dramatic, but they're the entry points for the moisture problems in point one — so catching them early saves money.",
          "Flashing fails more often than roof covering does, and it fails at transitions: chimneys, skylights, valleys, and above all where a later addition meets original roofline. On homes with heavy tree canopy, debris in valleys and gutters holds moisture against the roof and accelerates deterioration well beyond normal wear.",
        ],
      },
      {
        heading: "5. Problems hidden by recent remodeling",
        body: [
          "Beautiful updates can mask unresolved issues — mold sealed behind a new bathroom, or a leak painted over rather than repaired. A builder's eye knows the difference between quality work and a cover-up, which is exactly why experience matters in an inspector.",
          "The tells are usually at the edges rather than in the middle of the finished surface. Fresh paint on one wall only. Flooring that stops at a threshold for no design reason. A newly boxed-in section of ceiling. None of these prove anything on their own, but together with a thermal scan they usually explain themselves quickly.",
          "Unpermitted work belongs in the same category. Garage and basement conversions are widespread across the Bay Area, and they are not automatically a problem — but egress, ceiling height, ventilation, heating and electrical all need checking, because nobody inspected them the first time.",
        ],
      },
      {
        heading: "Why it pays to know",
        body: [
          "None of these problems mean you shouldn't buy a home — they mean you should buy it with your eyes open. A thorough inspection turns unknown risks into known facts you can plan and negotiate around.",
          "The useful output is not a list of everything wrong. It is a sequence: what is a safety or structural issue needing attention now, what is a system at end of life you should budget for, and what is ordinary maintenance you can schedule. Almost every older home produces a long list. Knowing the order is what makes it manageable.",
        ],
      },
    ],
  },
  {
    slug: "when-to-get-home-inspection",
    title: "When Should You Get a Home Inspection? (Buyers & Sellers)",
    excerpt:
      "It's not just for buyers. Here's when an inspection makes sense — and how a pre-listing inspection can give sellers the upper hand.",
    category: "Home Buying",
    author: "Bay Area Inspection Services",
    date: "2026-03-22",
    readTime: "5 min read",
    hero: photos.electricalOutlet.src,
    heroAlt: "Open residential electrical panel with circuit breakers",
    tags: ["home inspection", "buyers", "sellers"],
    intro: [
      "Most people think of a home inspection as a buyer's tool — and it absolutely is. But there are several moments in a home's life when an inspection pays for itself many times over. Here's when to schedule one.",
      "The timing question matters more in the Bay Area than in most markets, because contingency windows here are short and competitive offers frequently compress or waive them entirely. Booking at the right moment is often the difference between an inspection that informs your decision and one that merely confirms what you have already committed to.",
    ],
    sections: [
      {
        heading: "Before you buy (the obvious one)",
        body: [
          "A pre-purchase inspection during your contingency period is essential. It tells you the true condition of the home, gives you negotiating leverage, and protects you from inheriting expensive surprises. In the Bay Area's fast market, same-day reports are critical so you don't lose your window.",
          "The practical constraint is the calendar. A seven-day contingency means the inspection needs to happen in the first day or two, not the fifth — you need time to read the report, get repair estimates on anything significant, and decide. Booking the inspection the same day your offer is accepted is not excessive; it is what the timeline actually requires.",
        ],
      },
      {
        heading: "Before you make an offer, if you're waiving contingencies",
        body: [
          "This is increasingly the situation Bay Area buyers find themselves in. If competitive pressure means your offer will waive the inspection contingency, the inspection has to happen before the offer, during the disclosure package review or at an open house — because afterwards you have no protection left to exercise.",
          "Pre-offer inspections are shorter and access is limited, so they are less thorough than a full contingency-period inspection. They are still vastly better than nothing. Knowing that a property has an unbraced cripple wall and an original galvanised supply system changes what you are willing to bid, even if you cannot make the offer conditional on it.",
        ],
      },
      {
        heading: "Before you sell (the underrated one)",
        body: [
          "A pre-listing inspection lets you find and fix issues on your own terms before buyers' inspectors find them for you. It reduces last-minute renegotiations, builds buyer confidence, and can speed up your escrow. Sellers who inspect first are rarely caught off guard.",
          "The leverage argument is simple. A defect discovered by the buyer's inspector mid-escrow gets negotiated under time pressure, usually at a number well above what the repair would actually cost, because the buyer is pricing in uncertainty. The same defect found before listing gets fixed at market rate on your schedule, or disclosed and priced in deliberately. Same problem, very different outcome.",
        ],
      },
      {
        heading: "After major water events or storms",
        body: [
          "If your home has experienced flooding, a roof leak, or a plumbing failure, an inspection — ideally with moisture and mold testing — confirms whether the problem was fully resolved or whether damage lingers behind the walls.",
          "The common failure here is that the water gets stopped but the structure never gets dried. Wet insulation and framing behind an intact, freshly painted wall will keep causing problems for years, and it is invisible without thermal imaging and moisture metering. If a repair was done without documented drying, it is worth verifying.",
        ],
      },
      {
        heading: "For new construction and warranties",
        body: [
          "Even brand-new homes have defects. An independent inspection before your builder's warranty expires lets you get issues fixed at no cost to you — a step many new homeowners wish they'd taken.",
          "New construction defects are workmanship defects rather than wear: flashing details, waterproofing at decks and balconies, mechanical installation. They are easier and cheaper to have corrected while someone else is still contractually responsible for them.",
        ],
      },
      {
        heading: "Periodically, as a homeowner",
        body: [
          "A maintenance inspection every few years catches small problems before they become big ones. Think of it as a checkup for the biggest asset you own.",
          "It is most worthwhile on older properties and on anything with a crawl space, since those are the conditions that deteriorate quietly. Drainage that has shifted, a vapour barrier that has torn, or a slow leak under a bathroom will all be considerably cheaper to address at year two than at year eight.",
        ],
      },
      {
        heading: "The short version",
        body: [
          "Buying with a contingency: inspect immediately after acceptance. Buying without one: inspect before you offer. Selling: inspect before you list. After water damage: inspect once repairs are complete, to verify they worked. New build: inspect before the warranty lapses. Otherwise: every few years, particularly on older homes.",
          [
            "If you are working to a deadline, say so when you book — contingency windows get priority scheduling. You can see what a full inspection covers on the ",
            { text: "home inspection page", href: "/services/full-home-inspection" },
            ", or ",
            { text: "get in touch", href: "/contact" },
            " for a firm quote.",
          ],
        ],
      },
    ],
  },
  {
    slug: "mold-health-effects",
    title: "Mold and Your Health: What Bay Area Homeowners Should Know",
    excerpt:
      "How mold exposure can affect your family's health, who's most at risk, and the steps to protect your indoor air.",
    category: "Mold & Air Quality",
    author: "Bay Area Inspection Services",
    date: "2026-03-08",
    readTime: "5 min read",
    hero: photos.moldExpert.src,
    heroAlt: "Indoor air sampling pump and tripod set up in a living area",
    tags: ["mold", "health", "air quality"],
    intro: [
      "Mold isn't just a cosmetic or structural problem — it's an indoor air quality issue that can affect your family's health. Understanding the risks helps you take it as seriously as it deserves, without panic.",
      "One clarification first, because this subject attracts a lot of exaggeration. We are home inspectors, not doctors — what follows describes commonly reported effects and the conditions that produce them, not medical advice. If someone in your household has persistent symptoms, that is a conversation for a physician. What an inspection can tell you is whether the building is contributing.",
    ],
    sections: [
      {
        heading: "How mold affects health",
        body: [
          "Mold reproduces by releasing tiny spores into the air. When inhaled, these spores can trigger allergic and respiratory reactions in sensitive people. Common symptoms include nasal congestion, coughing, wheezing, throat irritation, itchy eyes, skin irritation, and headaches.",
          "Sensitivity varies enormously between individuals. It is entirely normal for one person in a household to react noticeably while others in the same home notice nothing at all — that difference is about the individual, not evidence that the mold is imaginary.",
          "It is also worth being clear about what colour does not tell you. \"Black mold\" usually refers to Stachybotrys, but plenty of harmless moulds are dark, and appearance alone is not a reliable guide to risk. What actually matters is the same thing regardless of colour: find the moisture feeding it and stop it.",
        ],
      },
      {
        heading: "Who's most at risk",
        list: [
          "Infants and young children",
          "Older adults",
          "People with asthma or chronic respiratory conditions",
          "Anyone with allergies or a weakened immune system",
        ],
      },
      {
        heading: "The tell-tale pattern",
        body: [
          "One of the clearest signs that your home's air may be the problem is symptoms that improve when you leave and return when you're back. If your family consistently feels better away from home, indoor air quality is worth investigating.",
        ],
      },
      {
        heading: "Finding what you can't see",
        body: [
          "Visible mold is only part of the picture. Infrared thermal imaging finds the temperature difference that damp material creates behind an intact wall or ceiling, and calibrated moisture meters confirm and quantify it — which is how a hidden problem gets found before it's ever visible on the surface. This is especially valuable when someone in the home is experiencing symptoms but nothing is visibly wrong.",
          "Finding a moisture reading tells you there is a reservoir somewhere; the thermal scan is what helps trace it back to where the water is actually coming from — and finding the moisture source is what actually resolves the problem, because cleaning growth without removing the water that fed it simply resets the clock.",
        ],
      },
      {
        heading: "Protecting your indoor air",
        list: [
          "Fix leaks and moisture sources promptly — within 24–48 hours when possible",
          "Ventilate bathrooms, kitchens, and laundry areas well",
          "Keep indoor humidity in a healthy range",
          "Get a professional inspection if you suspect a problem or notice symptoms",
        ],
      },
      {
        heading: "What an inspection can and cannot tell you",
        body: [
          "A thermal and moisture inspection establishes where a building has a hidden moisture problem, and how significant it is. That is genuinely useful information about the building.",
          "What it does not do is diagnose anybody. No inspection finding corresponds to a particular medical outcome, and any inspector who tells you a result means a specific health effect has stepped well outside what the inspection supports. The honest framing is that an inspection describes the building; a physician addresses symptoms.",
        ],
      },
      {
        heading: "A reasonable way to think about it",
        body: [
          "Mold is a moisture problem that happens to be biological. Treated that way it is tractable: find the water, stop it, dry the structure, remove the growth, then verify. Homes across the Bay Area go through exactly that sequence routinely without drama.",
          "The two unhelpful extremes are dismissing a persistent musty smell as normal for an old house, and treating any visible spot as a crisis requiring immediate five-figure remediation. Most situations sit between those, and the point of an independent inspection is to establish which one you actually have.",
          [
            "If someone in your household has symptoms that improve away from home, that is worth investigating. A ",
            { text: "mold and air quality inspection", href: "/services/mold-inspection" },
            " will tell you what the building is contributing, and ",
            { text: "getting in touch", href: "/contact" },
            " costs nothing.",
          ],
        ],
      },
    ],
  },
  {
    slug: "how-fast-home-inspection-bay-area",
    title: "How Fast Can You Get a Home Inspection in the Bay Area?",
    excerpt:
      "Scheduling, report turnaround, and how an inspection actually fits inside a contingency period — including what to do when the deadline is tighter than the standard timeline.",
    category: "Home Buying",
    author: "Bay Area Inspection Services",
    date: "2026-08-21",
    readTime: "6 min read",
    hero: photos.doorbell.src,
    heroAlt: "Front door of a Bay Area home being inspected",
    tags: ["same day home inspection", "contingency period", "san francisco", "home buying", "timeline"],
    intro: [
      "The direct answer: most inspections here can be scheduled within 24 to 48 hours, and the report goes out the same day as the visit. That is the useful number, because in a Bay Area transaction the binding constraint is almost never the inspector's calendar — it is how much of your contingency period is left by the time anyone thinks to book one.",
      "Contingency windows in this market have compressed considerably. A seven-day inspection contingency is now common, and shorter ones appear regularly on competitive properties. That changes the question from \"how long does an inspection take\" to \"how do I sequence this so the report lands while I still have room to act on it.\"",
    ],
    sections: [
      {
        heading: "The short answer, and what sets the pace",
        body: [
          "A standard single-family inspection takes roughly three hours on site. A condo or smaller attached unit is usually closer to two. The report is written the same day, with photographs of every finding, so you are reading it that evening rather than waiting two or three days for it to be typed up.",
          "What actually determines the timeline is access. Getting the listing agent, the seller, and any tenants aligned on a window takes longer than the inspection itself in most cases. If you can confirm access when you make the booking rather than after, you typically save a day.",
          "Same-day reporting is not a premium service here, and it is worth checking whether it is one wherever you are comparing quotes. A report that arrives 72 hours after the visit consumes nearly half of a seven-day contingency before you have read a word of it.",
        ],
      },
      {
        heading: "How an inspection fits inside a contingency period",
        body: [
          "Work backwards from the deadline rather than forwards from acceptance. If you have seven days, you want the report in hand by roughly day three or four, which leaves genuine time to get contractor pricing on anything significant and to draft a request for repairs or a credit.",
          "That means booking on day one, not day three. The sequence that works is: offer accepted, inspection booked the same afternoon, inspection on day two or three, report that evening, and the remaining days spent on quotes and negotiation. The days you want to protect are the ones at the end, not the beginning.",
          "The common failure is treating the inspection as the last step of due diligence rather than the first. By the time a report reveals something that warrants a plumber's or an engineer's opinion, you need days remaining to obtain one. A finding you cannot price is much harder to negotiate around than one you can.",
        ],
      },
      {
        heading: "When the deadline is tighter than the standard timeline",
        body: [
          "Short and waived contingencies are a reality here, and they do not have to mean going in blind. A pre-offer inspection — booked while the property is still on the market, with the listing agent's cooperation — gives you the same information before you are committed to anything. On a property you are serious about, it is the strongest version of this.",
          "Where a full pre-offer inspection is not possible, a shorter consultative visit focused on the systems that carry the most financial risk — foundation, roof, drainage, electrical service, and evidence of moisture — will surface the issues large enough to change your number. It is not a substitute for a full report, and it should not be sold as one, but it beats guessing.",
          "If you are already in contract with a tight window, say so when you book. Scheduling can usually be prioritised for a genuine deadline, and it is far better to know on day one that the calendar is tight than to discover it on day five.",
        ],
      },
      {
        heading: "What actually slows an inspection down",
        list: [
          "Tenant-occupied properties, where legally required notice periods can add days regardless of how quickly everyone else moves.",
          "Utilities shut off at a vacant property — with no power, gas or water, significant portions of the inspection cannot be performed and a return visit becomes necessary.",
          "Blocked access to the crawl space, attic hatch, or electrical panel, which frequently means storage stacked in front of them rather than anything structural.",
          "Locked side gates and unavailable garage remotes, which sound trivial and routinely prevent exterior and drainage assessment.",
          "Coordinating a specialist in parallel — a sewer scope or a pest report is a separate licensed discipline, and those have their own schedules.",
        ],
      },
      {
        heading: "Why same-day reporting matters more here",
        body: [
          "In a slower market, a two-day report turnaround is an inconvenience. In this one it is a material loss of negotiating position, because the request for repairs has to be drafted, delivered and responded to inside the same compressed window.",
          "There is also a quality argument for it. A report written the same day is written while the property is still fresh in the inspector's mind, with the photographs in front of them. Detail genuinely degrades when a report is assembled from notes several days later, across several intervening properties.",
        ],
      },
      {
        heading: "Booking against a deadline",
        body: [
          [
            "If you are working to a contingency date, the most useful thing you can do is call rather than wait. A ",
            { text: "full home inspection", href: "/services/full-home-inspection" },
            " is quoted for your specific property, usually within the hour, and scheduling is usually possible inside 48 hours. Where moisture or a musty smell is part of what prompted the inspection, adding a ",
            { text: "mold inspection", href: "/services/mold-inspection" },
            " at the same visit avoids a second appointment you do not have time for.",
          ],
          [
            "You can see the ",
            { text: "how quotes work", href: "/pricing" },
            " before you call, and ",
            { text: "everything covered during the visit", href: "/what-we-inspect" },
            " is listed component by component. If the timeline is tight, say so on the first call — it changes how the booking is scheduled.",
          ],
        ],
      },
    ],
  },
  {
    slug: "san-francisco-3r-report-explained",
    title: "The San Francisco 3R Report: What It Tells You, and What It Can't",
    excerpt:
      "Nearly every San Francisco sale involves a Report of Residential Building Record. Here is what is actually in it, why it is not an inspection, and the gap that leaves for a buyer.",
    category: "Home Buying",
    author: "Bay Area Inspection Services",
    date: "2026-08-23",
    readTime: "6 min read",
    hero: photos.newHome.src,
    heroAlt: "Craftsman-style home with a covered entry and attached garage",
    tags: ["3R report", "san francisco", "home buying", "permits", "due diligence"],
    intro: [
      "If you are buying in San Francisco, a document called the 3R Report — formally the Report of Residential Building Record — will appear in your disclosure package. It comes from the Department of Building Inspection, and it is a record of what the city believes about the property on paper.",
      "It is genuinely useful, and it is routinely misread. The most common mistake is treating it as a verdict on the building's condition. It is not, and it was never intended to be. Understanding precisely what it covers is the difference between using it well and being falsely reassured by it.",
    ],
    sections: [
      {
        heading: "What the 3R actually is",
        body: [
          "The 3R is a summary of the city's own records for a residential property: the permitted number of units, the recorded occupancy classification, and the permit history the department holds on file. Sellers of residential property in San Francisco typically obtain one as part of preparing a sale.",
          "The important word is records. The report describes what has been filed with the city, not what a person has gone out and observed. It is a paperwork document produced from a file, not a site visit.",
        ],
      },
      {
        heading: "What it is genuinely good for",
        body: [
          "It answers the legal-use question better than anything else available to a buyer. How many dwelling units is this property permitted to contain? Does the record match what you walked through? For a building being marketed as a two-unit or three-unit property, that comparison is the single most valuable thing in the disclosure package.",
          "It also gives you the permit trail. Additions, conversions, electrical and plumbing work, and seismic retrofits generally leave a record when they were done properly. A permit history that goes quiet for forty years on a house that has visibly been remodelled several times tells you something worth following up.",
        ],
      },
      {
        heading: "What it cannot tell you",
        body: [
          "It says nothing at all about condition. A fully permitted, perfectly documented house can have a failing roof, a saturated crawl space, and an electrical service at the end of its life. None of that appears on a 3R, because none of it is a permit question.",
          "The reverse holds as well, and it is worth stating plainly because it cuts against the intuition: unpermitted work is not automatically bad work. Some of it is competent and safe and simply never had paperwork filed. Some permitted work is poor. The document records process, not quality.",
          "It also will not tell you about anything that never required a permit, or about conditions that developed since the last filing. Dry rot, drainage failure, deferred maintenance and moisture intrusion are invisible to it by definition.",
        ],
      },
      {
        heading: "The gap between permits and condition",
        body: [
          "This is where buyers get caught. A clean 3R feels like a clean bill of health, and it reads like one to anyone who has not been told otherwise. It is closer to a title search than to a physical examination — necessary, informative, and about an entirely different category of risk.",
          "The two documents answer complementary questions. The 3R answers \"is this building legally what it is being sold as?\" An inspection answers \"is this building physically what it appears to be?\" You can fail either one independently, and the expensive surprises in San Francisco housing tend to come from the second.",
        ],
      },
      {
        heading: "Reading the two together",
        body: [
          "The most useful approach is to read the 3R before the inspection and bring its discrepancies with you. If the record shows two units and you walked through three, that is a specific thing to look at on site: is the third a converted space, does it have its own entry, its own kitchen, its own heating, adequate ceiling height and egress?",
          "Equally, an inspection finding can send you back to the 3R. A garage that has clearly been converted into living space, a basement with a kitchen in it, or an addition off the back are all worth checking against the permit record — not to catch anyone out, but because the answer changes what you are buying and sometimes how you can finance it.",
          "Where the two disagree, that is not automatically a reason to walk away. It is a reason to price the resolution before you commit rather than after.",
        ],
      },
      {
        heading: "Using both properly",
        body: [
          [
            "The 3R comes from the city and costs very little. An inspection is the other half of the picture. A ",
            { text: "full home inspection", href: "/services/full-home-inspection" },
            " is quoted for your specific property, and covers the physical condition the 3R is silent on — ",
            { text: "every system and component we check", href: "/what-we-inspect" },
            " is listed in full.",
          ],
          [
            "If your 3R shows a unit count that does not match what you saw, or a permit history with a conspicuous gap, mention it when you book. Knowing where the paperwork disagrees with the building tells an inspector exactly where to look. You can also ",
            { text: "get in touch", href: "/contact" },
            " with the specific discrepancy and we will tell you whether it is the kind of thing an inspection can resolve.",
          ],
        ],
      },
    ],
  },
  {
    slug: "san-francisco-soft-story-retrofit-buyers",
    title: "Buying a Soft-Story Building in San Francisco: Reading the Retrofit Status",
    excerpt:
      "San Francisco's mandatory soft-story program reshaped the risk profile of thousands of buildings. What the compliance status means for a buyer, and what an inspection can and cannot confirm about the work.",
    category: "Home Buying",
    author: "Bay Area Inspection Services",
    date: "2026-08-25",
    readTime: "7 min read",
    hero: photos.crawlspace.src,
    heroAlt: "Crawl space with floor joists, a support pier and a vapor barrier",
    tags: ["soft story", "seismic retrofit", "san francisco", "multi-unit", "structural"],
    intro: [
      "If you are looking at a multi-unit wood-frame building in San Francisco, the phrase \"soft story\" will come up, and the compliance status will be somewhere in the disclosures. It is one of the few structural questions in this city where the paperwork genuinely matters as much as the walkthrough.",
      "It is also widely misunderstood by buyers, partly because the term describes a building shape rather than a defect. A soft-story building is not damaged. It is built in a way that behaves poorly in an earthquake unless it has been strengthened.",
    ],
    sections: [
      {
        heading: "What 'soft story' actually describes",
        body: [
          "It refers to a ground floor that is substantially more open than the floors above it — typically a garage, a tuck-under parking area, or ground-floor retail, with apartments stacked over the top. All those openings mean there is far less wall down there to resist sideways movement.",
          "In an earthquake the upper floors move as a relatively rigid mass and the weak ground floor takes the strain. The failure mode is the ground level leaning or collapsing while the floors above stay largely intact. It is a recognisable pattern from past Bay Area earthquakes, and it is why the city legislated about it specifically.",
          "The shape is extremely common in San Francisco housing stock. Corner buildings with garages underneath, Marina-style flats, and the ubiquitous two-over-one and three-over-one layouts all fall into it. It is a normal way buildings here were constructed, not an aberration.",
        ],
      },
      {
        heading: "The mandatory program in brief",
        body: [
          "San Francisco adopted a mandatory retrofit ordinance for soft-story wood-frame buildings, aimed at multi-unit residential properties of a certain size and vintage — broadly, older wood-frame buildings with several residential units and multiple storeys. Affected owners were required to have engineered strengthening work designed, permitted and completed on a tiered schedule.",
          "The practical consequence for a buyer today is that a building in scope should have a documented compliance status. Either the work has been completed and signed off, or it has not, and both are knowable before you make an offer.",
          "Because the specifics of scope, tiers and current enforcement do change, treat any summary — including this one — as orientation rather than authority. The Department of Building Inspection is the source of truth for whether a particular address is in scope and where it stands. Confirm the address directly rather than relying on how a listing characterises it.",
        ],
      },
      {
        heading: "What the compliance status means to you",
        body: [
          "Completed and signed off is the straightforward case. The building has engineered lateral strengthening, and you are buying a known quantity — though the work itself is still worth looking at, which is the next section.",
          "Outstanding is not automatically a reason to walk. It is a reason to price it. Retrofit work on a soft-story building is a real capital project involving an engineer, permits, and construction that affects the ground floor and often the parking. Whoever owns the building when it happens pays for it and lives through it. That belongs in your number, and in most cases it belongs in the negotiation.",
          "The version to be most careful about is work that was performed without permits, or performed to a lesser standard than the ordinance requires, and is being described in conversation as \"retrofitted.\" Strengthening a soft-story building properly is an engineered design, not a matter of adding a few brackets. The permit record is what distinguishes the two.",
        ],
      },
      {
        heading: "What an inspection can confirm — and what it cannot",
        body: [
          "A general inspection can confirm a great deal that is observable: whether visible strengthening exists at the ground floor, whether steel moment frames or plywood shear panels are present where you would expect them, whether hardware is installed and corroded or sound, whether anchor bolting is visible at the mudsill, and whether there is evidence of moisture or rot in the framing that the retrofit relies on.",
          "What a general inspection cannot do is certify that an engineered design was correctly specified or correctly executed. Whether a particular frame was sized right for that building's loads is a calculation, not an observation. Where that question matters — and on a soft-story purchase it often does — a structural engineer is the right person, and a report that pretends otherwise is doing you a disservice.",
          "The honest division of labour is this: the inspection tells you what is physically there and what condition it is in, the permit record tells you what was approved, and an engineer tells you whether what was approved was adequate. On a multi-unit purchase those are three separate spends and all three are usually justified.",
        ],
      },
      {
        heading: "If the retrofit is done, look at these",
        list: [
          "Corrosion on hardware and hold-downs, particularly in garages that get damp or are washed down.",
          "Rot or moisture damage in the framing the new work is fastened to — new steel bolted to compromised wood is not a strengthened building.",
          "Whether the retrofit changed drainage or grade at the ground floor, which occasionally creates a moisture problem that did not previously exist.",
          "Garage slab cracking and movement, which is common, usually cosmetic, and occasionally not.",
          "Whether the finished work matches the permitted drawings, at least at the level of what is visible and countable.",
        ],
      },
      {
        heading: "Where to start",
        body: [
          [
            "Check the compliance status with the city first — it is public, it is free, and it will shape everything else. Then have the building looked at. A ",
            { text: "full home inspection", href: "/services/full-home-inspection" },
            " is quoted for your specific building, and on an older multi-unit building it is worth pairing with a ",
            { text: "moisture and water damage assessment", href: "/services/moisture-water-damage" },
            " as well, because damp framing at the ground floor is common in exactly the buildings this program covers.",
          ],
          [
            "If a report identifies something that warrants calculation rather than observation, it will say so plainly and recommend an engineer rather than leaving it vague. You can ",
            { text: "get in touch", href: "/contact" },
            " with the address and the disclosed status before you book, and we will tell you what an inspection will and will not settle.",
          ],
        ],
      },
    ],
  },
  {
    slug: "unpermitted-in-law-units-san-francisco",
    title: "Unpermitted In-Law Units in San Francisco: How to Spot One Before You Buy",
    excerpt:
      "Converted garages, basement flats and back-of-house studios are everywhere in San Francisco. How to recognise one on a walkthrough, what the real risks are, and what to check before it becomes yours.",
    category: "Home Buying",
    author: "Bay Area Inspection Services",
    date: "2026-08-27",
    readTime: "7 min read",
    hero: photos.garage.src,
    heroAlt: "Interior electrical panel opened beside a kitchen",
    tags: ["in-law unit", "unpermitted work", "san francisco", "adu", "home buying"],
    intro: [
      "San Francisco has an enormous number of informal dwelling units — converted garages, finished basements, and ground-floor rooms with a kitchenette and a separate entrance. Many were built decades ago, many are lived in, and a significant share never appeared on a permit.",
      "The instinct on discovering one is usually alarm, and that is not quite the right response. An unpermitted unit is a real issue with real consequences, but the consequences are specific and mostly knowable in advance. What you want is to identify it before you are committed, not to be surprised by it at appraisal.",
    ],
    sections: [
      {
        heading: "Why they are so common here",
        body: [
          "The combination of expensive housing, deep lots, high ground-floor garages, and decades of pressure to add rental income produced exactly this outcome. In many neighbourhoods the ground floor of a house is functionally a separate flat and has been for thirty years.",
          "It is worth holding onto the fact that this is normal rather than scandalous. These conversions are a large part of how the city actually houses people. That does not make them permitted, safe, or financeable — but it does mean encountering one is unremarkable and does not by itself indicate a seller acting in bad faith.",
        ],
      },
      {
        heading: "The physical tells on a walkthrough",
        list: [
          "Ceiling height noticeably lower than the rest of the house, particularly under seven feet, which is the single most common reason a conversion cannot be legalised as it stands.",
          "A separate exterior entrance that does not appear in the listing photographs, or a door from the garage into a finished room.",
          "A kitchen or kitchenette where the plumbing has obviously been added later — supply lines run on the surface, a waste line that takes an improbable route, or a sink plumbed into what was clearly a laundry connection.",
          "A second electrical subpanel, or a panel with a run of newer breakers feeding one area of the building.",
          "Heating that does not connect to the main system — wall heaters, plug-in units, or a room with no supply register at all.",
          "Bedrooms without a window large enough to climb out of, which is an egress issue and a genuine safety matter rather than a paperwork one.",
          "Bathrooms with no exterior ventilation, venting into a crawl space or attic instead of outside.",
        ],
      },
      {
        heading: "What the paperwork will and will not show",
        body: [
          [
            "The ",
            { text: "3R Report", href: "/blog/san-francisco-3r-report-explained" },
            " is the first place to look. It records the permitted number of units, and a mismatch between that number and what you walked through is the clearest signal available. A property recorded as a single-family home with an obvious second kitchen and separate entry is telling you something specific.",
          ],
          "What the record will not do is describe the quality of the conversion. Nothing in a permit history indicates whether the wiring was done competently, whether the bathroom vents outside, or whether the ceiling height clears the minimum. Those are observations, not filings.",
          "It is also worth knowing that absence of a permit is not proof of absence of work. Older conversions predate a lot of record-keeping. A quiet permit history on a building that has visibly changed is a prompt to look harder, not a conclusion in itself.",
        ],
      },
      {
        heading: "The real risks, in the order that matters",
        body: [
          "Safety comes first, and it is the part buyers under-weight. Egress, ventilation, heating and electrical work performed without inspection are where actual harm comes from. A bedroom with no escape window and a bathroom venting into a crawl space are problems regardless of what the city knows about them.",
          "Financing and valuation come second. A lender's appraiser may decline to attribute value to unpermitted square footage, and the rental income from an unpermitted unit generally cannot be counted toward qualifying. If your purchase maths depends on that income, this is the point at which the deal changes shape — and it is much better to discover it during due diligence than during underwriting.",
          "Enforcement risk comes third, and it is genuinely the least predictable of the three. Requirements around legalisation, tenant protections, and what an owner can and cannot do with an existing informal unit are specific and they change. That is a question for the city and, where the money is significant, for a lawyer — not for an inspection report and not for a blog post.",
        ],
      },
      {
        heading: "Legalisation exists, but treat it as a project",
        body: [
          "San Francisco has had pathways intended to bring existing informal units into compliance, and for some properties that route is realistic. It is not a formality. It typically involves drawings, permits, bringing the space up to current requirements, and construction — and some conversions simply cannot get there, most often because of ceiling height or the absence of any workable egress.",
          "If a seller or agent describes a unit as \"easily legalised,\" treat that as a claim to verify rather than a fact. The honest version of the sentence is usually \"legalisation may be possible, at a cost nobody has yet estimated.\" Before you rely on it, get the specifics from the city for that address.",
        ],
      },
      {
        heading: "What to do before you commit",
        body: [
          [
            "Have the space inspected as living space, not treated as a garage. A ",
            { text: "full home inspection", href: "/services/full-home-inspection" },
            " covers the electrical, heating, ventilation, egress and moisture conditions in a converted unit the same way it covers the rest of the house — ",
            { text: "the full component list", href: "/what-we-inspect" },
            " sets out exactly what that includes.",
          ],
          [
            "Converted ground-floor and basement spaces are also where moisture problems concentrate, because they sit against soil and were frequently finished without a vapour barrier or adequate ventilation. Where there is any musty smell or visible staining, a ",
            { text: "mold inspection", href: "/services/mold-inspection" },
            " at the same visit is usually the efficient call. Bring the unit count discrepancy with you when you ",
            { text: "book", href: "/contact" },
            " — it tells the inspection where to concentrate.",
          ],
        ],
      },
    ],
  },
  {
    slug: "san-francisco-condo-inspection-what-it-covers",
    title: "What a San Francisco Condo Inspection Actually Covers",
    excerpt:
      "A condo inspection is not a smaller house inspection — it is a different scope. What is yours, what belongs to the association, and where the expensive surprises actually hide.",
    category: "Home Buying",
    author: "Bay Area Inspection Services",
    date: "2026-08-29",
    readTime: "6 min read",
    hero: photos.windowCondensation.src,
    heroAlt: "Water staining on a bathroom ceiling near a shower",
    tags: ["condo inspection", "san francisco", "hoa", "home buying", "attached unit"],
    intro: [
      "A condo inspection is quoted differently from a single-family home, and the reason is not that it is a lighter version of the same job. It is a different scope. You do not own a roof or a foundation, so nobody is inspecting yours.",
      "That difference is where the misunderstanding lives. Buyers frequently assume a condo inspection is less necessary because there is less to go wrong. In practice the boundary between what is yours and what is the association's is exactly where the expensive and contested problems sit.",
    ],
    sections: [
      {
        heading: "Why it is shorter",
        body: [
          "A typical condo inspection takes about two hours against roughly three for a house. There is no roof covering to walk, no foundation of your own, no site drainage, and usually no attic or crawl space that belongs to you specifically.",
          "What remains is still substantial: the electrical from your panel in, all supply and waste plumbing within the unit, heating and any cooling, water heater, appliances, windows and doors, interior surfaces, and every wet area. On an older building that is plenty to find things in.",
          "Larger units get quoted before booking rather than after. A large flat in a converted Edwardian can take as long as a modest house, and the quote should reflect that up front rather than appearing as a surprise.",
        ],
      },
      {
        heading: "What is yours",
        body: [
          "Generally, everything from the interior surface of the walls inward — though the precise line is set by your building's governing documents, not by a general rule, and it varies more than people expect.",
          "The items that most often produce findings are the ones that were replaced or altered by a previous owner rather than by the association: a bathroom remodelled without upgrading ventilation, a kitchen where the waste line was rerouted, a water heater at the end of its life, an electrical panel with amateur additions, and windows that were replaced individually without addressing the flashing behind them.",
        ],
      },
      {
        heading: "What belongs to the association",
        body: [
          "Roof, exterior walls, structure, common plumbing stacks, and usually the windows in their openings — depending, again, on the documents. These are not inspected as yours because they are not yours, but their condition affects you directly through assessments and through what leaks into your unit.",
          "This is the reason to read the reserve study and the assessment history alongside the inspection report rather than treating them as separate exercises. A building with a roof at the end of its life and a thin reserve fund is telling you about a bill in your future that no inspection of your unit will reveal.",
        ],
      },
      {
        heading: "The gap nobody inspects",
        body: [
          "The interesting failures happen at the boundary. A common plumbing stack that leaks inside a party wall, water entering from the unit above, a shared heating system serving your space, and exterior envelope failures that show up first as a damp patch on your bedroom wall — all of these present inside your unit while originating outside it.",
          "This is precisely where thermal imaging and moisture metering earn their place on a condo inspection. A stain on a party wall is ambiguous by eye. Whether the material behind it is currently wet is not, and that answer determines whether you are looking at an old resolved event or an active leak someone else is responsible for.",
          "Getting that distinction documented before you close matters more in a condo than in a house, because the remedy involves another party. \"Wet on the date of inspection, photographed, with moisture readings\" is a materially stronger position than \"there was a mark on the wall.\"",
        ],
      },
      {
        heading: "San Francisco specifics worth knowing",
        body: [
          "A large share of the condo stock here is converted rather than purpose-built — two, three and four-unit Victorians and Edwardians divided at some point in the last several decades. Those conversions vary enormously in quality, and the age of the conversion is usually more informative than the age of the building.",
          "The recurring themes in converted buildings are sound and fire separation between units that was done to the standard of its day, plumbing and electrical that were split in ways that are not always obvious, and heating that was subdivided from a single original system. None of these are necessarily defects. All of them are worth understanding before you own one.",
          "Ground-floor and garden-level units carry the additional moisture exposure that comes with sitting against soil, which in this climate combines with fog-driven damp to produce problems that upper-floor units in the same building simply do not have.",
        ],
      },
      {
        heading: "Booking a condo inspection",
        body: [
          [
            "A ",
            { text: "condo inspection", href: "/services/full-home-inspection" },
            " is quoted for your specific unit and includes infrared thermal imaging and calibrated moisture readings as standard rather than as add-ons — which on an attached unit is the part that does the most work. The ",
            { text: "full component checklist", href: "/what-we-inspect" },
            " sets out everything covered, and the ",
            { text: "quote page", href: "/pricing" },
            " explains how we work out a quote for a condo.",
          ],
          [
            "Where there is any history of a leak from a neighbouring unit or from the building envelope, adding a ",
            { text: "mold inspection", href: "/services/mold-inspection" },
            " is worth considering, because that is the scenario where documenting the condition before closing changes who pays. If you already know about a stain or a past leak, mention it when you ",
            { text: "get in touch", href: "/contact" },
            " so the visit can be planned around it.",
          ],
        ],
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return blogPosts.filter((p) => slugs.includes(p.slug));
}
