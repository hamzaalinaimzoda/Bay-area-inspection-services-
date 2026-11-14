import { services } from "@/data/services";

/**
 * Rows for the service dropdown in the booking modal and the contact form.
 *
 * Previously each form built its own copy of this list, identically. They now
 * share it, so a job type added here is bookable from both at once.
 *
 * `value` is what the API receives and must be a member of the service enum in
 * openapi.yaml — the API rejects anything else. Job types that have no enum
 * value of their own (condo, manufactured home, ADU…) reuse the closest one and
 * say what they really are in `note`, which the forms prefix to the customer's
 * notes. That keeps the backend contract unchanged: the inspector still sees
 * the job type in the email, and Google Ads still gets the right value through
 * `conversionKey`.
 *
 * No prices appear here. The site does not publish them (owner's decision,
 * 2026-09-24); `priceNote` explains how the quote works instead. The last
 * version with published prices is commit c83b8b6.
 */
export interface ServiceOption {
  id: string;
  value: string;
  label: string;
  /** Shown under the dropdown once a row is chosen. */
  priceNote: string;
  /** Prefixed to the form's free-text notes, e.g. "Property type: Condo / attached unit." */
  note?: string;
  /** Key into the Ads lead-value table in analytics.ts. Defaults to `value`. */
  conversionKey?: string;
}

const variants: ServiceOption[] = [
  {
    id: "manufactured-home",
    value: "full-home-inspection",
    label: "Manufactured / Mobile Home",
    priceNote:
      "A full inspection of a manufactured or mobile home, including the underbelly and support system. We'll confirm the price with you before we book.",
    note: "Property type: Manufactured / mobile home.",
    conversionKey: "manufactured-home",
  },
  {
    id: "manufactured-home-5-point",
    value: "other",
    label: "Insurance 5-Point Report (Manufactured Home)",
    priceNote:
      "The limited report an insurance company asks for: roof, exterior, electrical, plumbing and water heater, with the photos on their request form.",
    note: "Service: Insurance 5-point report for a manufactured home.",
    conversionKey: "manufactured-home-5-point",
  },
  {
    id: "adu-inspection",
    value: "full-home-inspection",
    label: "ADU Inspection",
    priceNote:
      "The accessory dwelling unit inspected as its own home, with its own report. Inspecting the main house on the same visit? We'll quote both together.",
    note: "Property type: ADU only (accessory dwelling unit).",
    conversionKey: "adu-inspection",
  },
];

export const SERVICE_OPTIONS: ServiceOption[] = [
  ...services.flatMap((s) => {
    const base: ServiceOption = {
      id: s.slug,
      value: s.slug,
      label: s.shortName,
      priceNote: s.priceNote,
    };
    // Air quality testing is booked under the mold enum value; the note tells
    // the inspector it is lab sampling, and ads can preselect it by id.
    if (s.slug === "mold-inspection") {
      return [
        base,
        {
          id: "air-quality-testing",
          value: s.slug,
          label: "Air Quality Testing",
          priceNote:
            "Settle-plate air samples and surface swabs analysed by an accredited lab, with the results added to your report. We'll confirm the price with you before we book.",
          note: "Service: Air quality testing (settle plates / swabs to lab).",
          conversionKey: "air-quality-testing",
        },
      ];
    }
    // The full home inspection is also booked as a condo; that row is quoted
    // on its own basis (an attached unit has no roof or foundation of its own).
    if (s.slug !== "full-home-inspection") return [base];
    return [
      base,
      {
        id: `${s.slug}-condo`,
        value: s.slug,
        label: "Condo Inspection",
        priceNote:
          "For a condo or attached unit — no roof or foundation of your own to inspect, so the visit is shorter than a single-family home. We'll confirm the price with you before we book.",
        note: "Property type: Condo / attached unit.",
        conversionKey: `${s.slug}-condo`,
      },
    ];
  }),
  ...variants,
  { id: "other", value: "other", label: "Not sure / Other", priceNote: "We'll confirm pricing once we know what you need." },
];

/** The notes to send: the option's job-type note, then whatever the customer typed. */
export function notesWithJobType(option: ServiceOption | undefined, typed?: string): string | undefined {
  if (!option?.note) return typed;
  return typed ? `${option.note} ${typed}` : option.note;
}
