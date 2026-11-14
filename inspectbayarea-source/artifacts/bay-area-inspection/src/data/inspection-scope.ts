import { Home, Zap, Droplets, Wind, Layers, Shield, Thermometer, DoorOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * The component-level inspection scope.
 *
 * This exists because the service pages describe inspections at the level a
 * buyer thinks about them ("we check the electrical system"), while people
 * searching before they book overwhelmingly search at the component level —
 * "water heater strapping", "GFCI kitchen outlet", "cripple wall bracing",
 * "sewer lateral clay pipe". Those are real questions from real homeowners and
 * each one deserves an actual answer rather than a bullet.
 *
 * Every entry names a component and says what is actually being judged about
 * it, why it matters, and where relevant what is specific to Bay Area housing.
 * Nothing here describes anything outside a visual, non-invasive inspection.
 */

export interface ScopeItem {
  /** The component, named the way a homeowner would search for it. */
  name: string;
  /** What is actually assessed, and what a problem looks like. */
  detail: string;
}

export interface ScopeSection {
  id: string;
  title: string;
  icon: LucideIcon;
  /** Why this system matters, in two or three sentences. */
  intro: string;
  items: ScopeItem[];
}

export const inspectionScope: ScopeSection[] = [
  {
    id: "roof-exterior",
    title: "Roof & Exterior",
    icon: Home,
    intro:
      "The exterior is what keeps water out, and water is behind most expensive surprises in Bay Area housing. Roof covering matters less than the details around it — flashing, transitions and drainage are where failures actually start. The roof is inspected from the ground, a ladder at the eave, or the surface itself where it is safe and the covering can bear traffic.",
    items: [
      { name: "Roof covering & remaining life", detail: "Composition shingle, tile, slate, wood shake or flat membrane — assessed for granule loss, curling, cracking, blistering, patching and how much service life appears to remain. Age matters less than condition: a well-maintained 18-year-old roof can outlast a poorly installed 8-year-old one." },
      { name: "Flashing at penetrations & transitions", detail: "Chimneys, skylights, vent stacks, valleys, and above all the junction where a later addition meets the original roofline. Flashing fails far more often than roof covering does, and additions are where it fails first." },
      { name: "Gutters, downspouts & discharge", detail: "Whether gutters are sloped, secured and clear, and critically whether downspouts discharge away from the foundation or dump against it. A downspout discharging at the foundation is one of the most common root causes behind crawl space moisture." },
      { name: "Fascia, soffit & eave condition", detail: "Checked for dry rot, pest entry and staining. On San Francisco and coastal Peninsula homes, wind-driven rain attacks west and north elevations year-round and these are where it shows first." },
      { name: "Siding, stucco & cladding", detail: "Wood siding, stucco, fiber cement or shingle — inspected for cracking, delamination, moisture staining, contact with soil, and whether a drainage plane appears to exist behind stucco. Older stucco over wood framing frequently has none." },
      { name: "Exterior trim, windows & door seals", detail: "Sill and casing condition, failed caulking, and evidence of water entry at bay windows and light wells, which is where Edwardian and Victorian rot typically begins." },
      { name: "Grading & site drainage", detail: "Whether soil slopes away from the structure. Negative grading directing water toward the foundation is the single most correctable cause of chronic moisture problems." },
      { name: "Decks, balconies & stairs", detail: "Ledger attachment and flashing, guardrail height and spacing, post bases, and waterproofing on elevated decks. Deck ledger failure is a genuine safety issue, not a cosmetic one." },
      { name: "Driveways, walkways & retaining walls", detail: "Settlement, trip hazards, and on sloped lots whether retaining walls show drainage provision. Undrained retaining walls build hydrostatic pressure and eventually move." },
      { name: "Fences, gates & site structures", detail: "Assessed where they affect drainage, egress or safety — including whether landscaping has blocked foundation vents, a very common finding." },
    ],
  },
  {
    id: "structure-foundation",
    title: "Structure & Foundation",
    icon: Layers,
    intro:
      "Almost every foundation has cracks and most of them mean very little. What matters is pattern — whether cracking is displaced or hairline, progressive or stable, and whether doors and windows are racking in a way that suggests active movement. In a seismic region two findings carry extra weight on older homes.",
    items: [
      { name: "Foundation type & condition", detail: "Poured concrete, perimeter with crawl space, slab-on-grade, or on older San Francisco housing brick and unreinforced rubble. Type largely determines what can go wrong and what a retrofit would involve." },
      { name: "Foundation cracking — pattern & significance", detail: "Hairline shrinkage cracking is normal as concrete cures. Displaced, stepped or widening cracks are not. The report distinguishes the two rather than listing every mark." },
      { name: "Cripple wall bracing", detail: "The short stud walls between foundation and first floor. Unbraced cripple walls are one of the most common seismic vulnerabilities in pre-1970s Bay Area homes and one of the most well-understood retrofits." },
      { name: "Foundation anchor bolting & sill plate connection", detail: "Whether the house is bolted to its foundation. Many pre-war homes simply rest on theirs. Checked alongside cripple wall bracing since the two are usually retrofitted together." },
      { name: "Soft-story conditions", detail: "A garage opening beneath living space leaves little lateral resistance. Widespread in San Francisco and identified along with whether retrofit work appears to have been performed." },
      { name: "Floor framing, joists & subfloor", detail: "Inspected from the crawl space or basement for rot, notching, sagging, prior repair, and moisture damage at bathrooms and kitchens." },
      { name: "Posts, piers & beam support", detail: "Post bases in contact with soil, undersized or improvised piers, and beams with inadequate bearing — all common in older crawl spaces and in unpermitted alterations." },
      { name: "Masonry chimney condition & attachment", detail: "Unreinforced masonry chimneys are a genuine concern in a seismic region. Assessed for cracking, separation from the structure, spalling and crown condition." },
      { name: "Signs of settlement or active movement", detail: "Racking doors and windows, sloping floors, and cracking patterns traced across the structure rather than noted room by room. Seasonal movement on expansive clay soils is distinguished from progressive settlement." },
      { name: "Evidence of prior structural repair", detail: "Previous underpinning, added piers, epoxy injection or sistered joists — noted along with whether the work appears adequate and whether it looks permitted." },
    ],
  },
  {
    id: "electrical",
    title: "Electrical System",
    icon: Zap,
    intro:
      "Electrical findings split into two categories: what is unsafe, and what is simply undersized for how people live now. A 100-amp service installed in 1955 was never intended to run air conditioning, induction cooking and EV charging at once — not a defect exactly, but a real cost worth knowing before you own it.",
    items: [
      { name: "Main service panel & capacity", detail: "Amperage rating against how the home is actually used. Undersized service is one of the most commonly overlooked costs on older Bay Area homes, especially with EV charging added." },
      { name: "Breakers, fuses & overcurrent protection", detail: "Correct sizing for conductors, double-tapped breakers, and evidence of overheating. Fuse panels are noted along with what replacing one typically involves." },
      { name: "Panel brand & known concerns", detail: "Certain older panel brands have documented failure histories. Where one is present it is identified plainly and evaluation by a licensed electrician is recommended." },
      { name: "Branch wiring type & condition", detail: "Copper, aluminum branch wiring, or knob-and-tube. Aluminum branch circuits and live knob-and-tube both warrant specific attention rather than a passing mention." },
      { name: "Knob-and-tube remnants & partial rewiring", detail: "Very common in pre-war San Francisco and Berkeley housing that was only partially updated. Original wiring is frequently left live in attics and wall cavities, sometimes buried under later insulation." },
      { name: "GFCI protection", detail: "Tested at kitchens, bathrooms, laundry, garage and exterior outlets. Missing GFCI protection at wet locations is among the most frequent findings on any older home." },
      { name: "AFCI protection", detail: "Checked where required by the home's era and any updated circuits." },
      { name: "Outlets, switches & fixtures", detail: "Representative testing for polarity, grounding, open neutrals and physical damage. Ungrounded two-prong outlets are noted with what grounding would involve." },
      { name: "Grounding & bonding", detail: "Grounding electrode, water pipe bonding, and gas line bonding where accessible." },
      { name: "Smoke & carbon monoxide alarms", detail: "Presence and placement against current expectations. California requires CO alarms in homes with attached garages or fuel-burning appliances, and this is a routine point of sale correction." },
      { name: "Amateur & unpermitted wiring", detail: "Junction boxes without covers, wiring buried in walls without boxes, extension cords used as permanent wiring — all common in garage and basement conversions." },
    ],
  },
  {
    id: "plumbing",
    title: "Plumbing System",
    icon: Droplets,
    intro:
      "Original galvanised steel supply piping is the quiet expense in a lot of mid-century Bay Area housing. It corrodes from the inside, so it can look perfectly sound while flow has collapsed. Testing several fixtures under simultaneous demand reveals far more than looking at the pipe does.",
    items: [
      { name: "Supply piping material", detail: "Copper, galvanised steel, PEX or CPVC. Galvanised is noted along with the practical implication — it fails from the inside and typically needs replacement rather than repair." },
      { name: "Functional flow under simultaneous demand", detail: "Multiple fixtures run at once rather than one at a time. This is what actually exposes corroded supply lines and undersized piping." },
      { name: "Water pressure & regulator", detail: "Static pressure measured where a hose bib allows. Excessive pressure shortens the life of every fixture and appliance in the house." },
      { name: "Drain, waste & vent piping", detail: "Cast iron, ABS or galvanised drain lines assessed for corrosion, sagging, improper slope and prior repair. Mid-century cast-iron waste lines are commonly at or past service life." },
      { name: "Sewer lateral — visible condition & local requirements", detail: "The accessible portion is assessed visually. On older properties with mature trees, root intrusion into original clay pipe is common, expensive and invisible without a camera scope — a separate service by a licensed plumber, and in San Francisco often a transaction requirement." },
      { name: "Water heater — age, capacity & condition", detail: "Age from the data plate, corrosion, and whether capacity suits the household." },
      { name: "Water heater seismic strapping", detail: "Double strapping at upper and lower thirds is required in California. Unstrapped or single-strapped heaters are among the most common findings and among the cheapest to correct." },
      { name: "TPR valve & discharge piping", detail: "Temperature and pressure relief valve present, correctly oriented, and discharging to an approved location. A missing or improperly terminated discharge line is a genuine safety issue." },
      { name: "Fixtures, faucets & toilets", detail: "Operation, leaks at supply connections, loose or rocking toilets, and drainage at each fixture." },
      { name: "Shower & tub enclosures", detail: "Grout and seal condition, and moisture readings at adjacent surfaces where the pattern suggests a leak behind the enclosure." },
      { name: "Shutoff valves & hose bibs", detail: "Main shutoff location and accessibility, angle stops at fixtures, and exterior hose bibs including anti-siphon protection." },
      { name: "Gas piping — visible condition", detail: "Accessible gas lines, unions, sediment traps, and flexible connectors. Bonding and appliance connections checked where accessible." },
    ],
  },
  {
    id: "hvac",
    title: "Heating, Cooling & Ventilation",
    icon: Thermometer,
    intro:
      "Equipment is checked for operation, age, and whether it performs rather than merely switching on. On gas equipment, venting matters as much as the appliance — a disconnected or badly sloped flue connector is a carbon monoxide concern, not an efficiency one.",
    items: [
      { name: "Furnace or heating equipment", detail: "Type, age from the data plate, operation through a full cycle, and condition of accessible components. Wall and floor furnaces common in older San Francisco flats are assessed on their own terms." },
      { name: "Heat exchanger — visible condition", detail: "Assessed to the extent visible without dismantling the appliance. Where condition cannot be determined, that limit is stated plainly rather than glossed over." },
      { name: "Flue, venting & draft", detail: "Flue connector slope and connection, clearance to combustibles, and draft at the appliance. Improper venting on gas appliances is a carbon monoxide risk and is treated as a safety finding." },
      { name: "Combustion air supply", detail: "Whether appliances in closets, garages or basements have adequate combustion air — frequently compromised when a space is converted or tightened up." },
      { name: "Air conditioning & heat pump", detail: "Operation, age, refrigerant line insulation, condensate handling, and temperature differential across the system where conditions allow testing." },
      { name: "Ductwork condition & distribution", detail: "Accessible ducts inspected for disconnection, crushing, missing insulation and obvious leakage. Disconnected crawl space ducts are a common and costly-to-run finding." },
      { name: "Thermostat & controls", detail: "Operation and whether controls actually command the equipment as expected." },
      { name: "Bathroom & kitchen exhaust ventilation", detail: "Whether fans exist, actually move air, and terminate outside rather than into an attic or crawl space. Venting into an attic is a direct cause of the moisture and mold problems found later." },
      { name: "Dryer venting", detail: "Material, routing, length and termination. Flexible foil ducting and runs terminating in a crawl space are both frequent findings and both are fire or moisture concerns." },
      { name: "Whole-house & attic ventilation", detail: "Soffit, ridge and gable venting assessed for adequacy and blockage — directly tied to attic moisture and roof deck condition." },
    ],
  },
  {
    id: "attic-insulation",
    title: "Attic, Insulation & Roof Structure",
    icon: Wind,
    intro:
      "Attics are where a small roof leak turns into framing damage while nobody is looking, and where inadequate ventilation quietly produces the moisture problems that show up later as mold. Entered and traversed where access and structure allow it safely.",
    items: [
      { name: "Roof framing & sheathing from below", detail: "Rafters, trusses, ridge and sheathing inspected for staining, delamination, prior repair and any modification — cut or notched framing from a later installation is a common finding." },
      { name: "Evidence of roof leaks", detail: "Staining, rusted fasteners, delaminated sheathing and daylight at penetrations. Active versus historic leakage is distinguished where possible." },
      { name: "Attic moisture & condensation", detail: "Moisture patterns assessed and, where relevant, confirmed with meter readings rather than judged by appearance alone." },
      { name: "Fungal growth on sheathing & framing", detail: "Where growth is visible it is identified and the moisture source traced. Assessment is visual and instrument-based — thermal imaging and moisture metering — not sampling." },
      { name: "Insulation type, depth & coverage", detail: "Material and approximate R-value, gaps, compression and displacement. Older Bay Area attics are frequently under-insulated relative to current expectations." },
      { name: "Vapor barrier & air sealing", detail: "Presence and condition, and whether penetrations from below have been sealed." },
      { name: "Attic ventilation adequacy", detail: "Intake and exhaust venting balance, and whether insulation or storage has blocked soffit vents — a very common and easily corrected cause of attic moisture." },
      { name: "Exhaust fans terminating in the attic", detail: "Bathroom or dryer exhaust discharging into the attic instead of outside. Common, and a direct cause of sheathing moisture and growth." },
      { name: "Wiring & junction boxes in the attic", detail: "Open splices, unsupported wiring, and knob-and-tube buried under later insulation." },
      { name: "Pest & rodent evidence", detail: "Droppings, nesting material, chewed insulation and entry points noted. Identification of active infestation and any treatment is the province of a licensed pest operator." },
    ],
  },
  {
    id: "crawlspace",
    title: "Crawl Space & Under-Floor Areas",
    icon: Shield,
    intro:
      "The crawl space is where Bay Area moisture problems most often begin, and because nobody looks, they grow unchecked for years. The usual combination is bare soil, a torn or absent vapour barrier, and vents blocked by landscaping. Entered and traversed where clearance and safety allow.",
    items: [
      { name: "Vapor barrier presence & condition", detail: "Whether ground cover exists, is continuous, and is intact. A torn or missing vapour barrier over bare soil keeps floor framing damp year-round." },
      { name: "Standing water & moisture intrusion", detail: "Evidence of pooling, efflorescence on foundation walls, and moisture readings at framing. Source traced where possible — usually roof drainage or grading rather than plumbing." },
      { name: "Sub-area ventilation", detail: "Foundation vents present, unobstructed and adequate. Blocked by landscaping, fallen insulation or a later addition is the most common finding here." },
      { name: "Floor framing, joists & girders", detail: "Rot, insect damage, sagging, prior sistering and moisture staining, with particular attention beneath bathrooms and kitchens." },
      { name: "Under-floor insulation", detail: "Presence, condition and whether it has fallen or become saturated. Wet insulation holds moisture against framing and makes matters worse than none at all." },
      { name: "Plumbing & ductwork in the crawl space", detail: "Accessible supply and drain lines for leaks and corrosion, and ducts for disconnection and missing insulation." },
      { name: "Fungal growth on framing", detail: "Where growth is visible it is documented and the moisture source traced with thermal imaging and moisture meters. This is a visual and instrument-based assessment; no samples are taken or analysed." },
      { name: "Post bases & soil contact", detail: "Wood in direct contact with soil, deteriorated post bases, and improvised support — common in older crawl spaces and unpermitted work." },
      { name: "Pest & wood-destroying organism evidence", detail: "Visible evidence noted and referred to a licensed pest operator, which is a separate licensed discipline from a general home inspection." },
      { name: "Access & clearance limitations", detail: "Where a crawl space cannot be safely entered or fully traversed, exactly which areas were not inspected is stated rather than left implied." },
    ],
  },
  {
    id: "interior",
    title: "Interior, Rooms & Safety",
    icon: DoorOpen,
    intro:
      "Interior findings are usually symptoms rather than causes. A stained ceiling, a sticking door or a soft patch of flooring generally points at something structural or moisture-related elsewhere, which is why they get traced rather than simply noted.",
    items: [
      { name: "Ceilings, walls & visible moisture staining", detail: "Staining traced toward a likely source rather than listed room by room, and confirmed with moisture readings where the pattern warrants it." },
      { name: "Floors — condition & slope", detail: "Covering condition plus whether slope suggests framing or foundation movement. Soft spots checked for underlying moisture damage." },
      { name: "Windows — operation, glazing & seals", detail: "Representative operation, failed dual-pane seals, condensation between panes, and security of latching." },
      { name: "Doors — operation & racking", detail: "Doors that stick or fail to latch often indicate movement. Seasonal versus progressive is distinguished where possible." },
      { name: "Stairs, handrails & guardrails", detail: "Riser and tread consistency, handrail presence and graspability, and guardrail height and baluster spacing — genuine safety items, especially in older homes." },
      { name: "Garage — firewall separation & door", detail: "Fire separation between garage and living space, self-closing door hardware, and automatic reversal and photo-eye function on the overhead door." },
      { name: "Fireplaces & wood stoves", detail: "Firebox, damper, hearth extension and visible flue condition. A Level 2 chimney inspection by a specialist is recommended where the visible condition warrants it." },
      { name: "Kitchen appliances — as installed", detail: "Built-in appliances operated in normal modes. Range anti-tip bracket presence is checked and is a routine safety finding." },
      { name: "Laundry connections", detail: "Supply valves, drain, and dryer venting including material and termination." },
      { name: "Egress from bedrooms & converted spaces", detail: "Window egress dimensions and ceiling height in basement and garage conversions — frequently non-compliant in unpermitted work, and a genuine life-safety issue." },
      { name: "Unpermitted alterations & conversions", detail: "Garage, basement and in-law conversions are widespread across the Bay Area. Not automatically a defect, but egress, ceiling height, ventilation, heating and electrical all need checking because nobody inspected them the first time." },
    ],
  },
];

/** Total component-level items, for display. Derived so it can never go stale. */
export const scopeItemCount = inspectionScope.reduce((n, s) => n + s.items.length, 0);
