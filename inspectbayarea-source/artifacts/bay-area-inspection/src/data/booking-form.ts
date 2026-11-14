import { z } from "zod/v4";

/**
 * Options and validation for the full booking form at /book.
 *
 * Every choice here is what the inspector would otherwise ask on the
 * confirmation call, so the answers arrive before the call instead. The
 * server (api-server/src/routes/book.ts) validates the same shape; labels are
 * sent as-is so the notification email reads naturally.
 */

export const ROLES = [
  "Buyer",
  "Seller",
  "Homeowner",
  "Real estate agent",
  "Property manager",
  "Other",
] as const;

export const CONTACT_PREFERENCES = ["Phone call", "Text message", "Email"] as const;

export const PROPERTY_TYPES = [
  "Single-family house",
  "Condo or townhouse",
  "Multi-unit (2–4 units)",
  "Manufactured / mobile home",
  "ADU",
  "Other",
] as const;

export const SQUARE_FEET = ["Under 1,000", "1,000–1,999", "2,000–2,999", "3,000–3,999", "4,000+", "Not sure"] as const;

export const FOUNDATIONS = ["Crawl space", "Basement", "Slab", "Not sure"] as const;

export const OCCUPANCY = ["Occupied", "Vacant"] as const;

export const UTILITIES = ["Yes", "No", "Not sure"] as const;

/** Extra services that can share the visit. Hidden when already the main service. */
export const ADD_ONS = [
  { label: "Mold inspection", service: "mold-inspection" },
  { label: "Moisture & water damage assessment", service: "moisture-water-damage" },
  { label: "Gas leak detection", service: "gas-leak-detection" },
] as const;

export const TIME_SLOTS = [
  { value: "8am-11am", label: "Morning", sub: "8 – 11 AM" },
  { value: "11am-2pm", label: "Midday", sub: "11 AM – 2 PM" },
  { value: "2pm-5pm", label: "Afternoon", sub: "2 – 5 PM" },
  { value: "5pm-8pm", label: "Evening", sub: "5 – 8 PM" },
] as const;

export const ACCESS = [
  "My agent will let you in",
  "Lockbox",
  "Owner or tenant will be there",
  "I'll be there",
  "Not sure yet",
] as const;

export const ATTENDING = ["Yes, the whole time", "For the walkthrough at the end", "No"] as const;

export const HEARD_FROM = [
  "Google search",
  "Google Maps",
  "My real estate agent",
  "Friend or family",
  "Yelp",
  "Other",
] as const;

const times = ["8am-11am", "11am-2pm", "2pm-5pm", "5pm-8pm"] as const;
// Unanswered radio groups come back from react-hook-form as null, so every
// optional field accepts null as well as undefined and "".
const opt = z.string().trim().nullish();
const pick = (message: string) => z.string({ error: message }).min(1, message);

export const bookingFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z.string().trim().min(7, "Please enter a phone number we can reach you on"),
  email: z.email("Please enter a valid email address"),
  role: pick("Please choose one"),
  contactPreference: opt,

  addressStreet: z.string().trim().min(3, "Please enter the street address"),
  addressUnit: opt,
  addressCity: z.string().min(1, "Please choose the city"),
  addressZip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Please enter a 5-digit ZIP code"),

  propertyType: pick("Please choose the property type"),
  squareFeet: opt,
  yearBuilt: z
    .string()
    .trim()
    .regex(/^$|^(1[6-9]\d\d|20\d\d)$/, "Please enter a 4-digit year")
    .nullish(),
  bedrooms: opt,
  bathrooms: opt,
  foundation: opt,
  occupancy: opt,
  utilitiesOn: opt,

  serviceId: z.string().min(1, "Please choose the inspection you need"),
  addOns: z.union([z.array(z.string()), z.literal(false)]).nullish(),
  concerns: opt,

  preferredDate: z.string().min(1, "Please choose a date"),
  preferredTime: z.enum(times, { error: "Please choose a time" }),
  altDate: opt,
  altTime: z.enum(times).nullish().or(z.literal("")),
  deadline: opt,
  access: opt,
  attending: opt,

  agentName: opt,
  agentPhone: opt,
  agentEmail: z.email("Please enter a valid email address").nullish().or(z.literal("")),

  heardFrom: opt,
  discountEligible: z.boolean().default(false),
  notes: opt,
  agreed: z.literal(true, { error: "Please confirm to send your request" }),

  /** Honeypot, visually hidden. */
  company: opt,
});

export type BookingFormValues = z.input<typeof bookingFormSchema>;

/**
 * The short form on the ad landing page /schedule: only what it takes to hold
 * a time and send the confirmation email. Everything else is asked on the
 * confirmation call.
 */
export const quickBookingSchema = z.object({
  name: bookingFormSchema.shape.name,
  phone: bookingFormSchema.shape.phone,
  email: bookingFormSchema.shape.email,
  addressStreet: bookingFormSchema.shape.addressStreet,
  addressCity: bookingFormSchema.shape.addressCity,
  serviceId: bookingFormSchema.shape.serviceId,
  preferredDate: bookingFormSchema.shape.preferredDate,
  preferredTime: bookingFormSchema.shape.preferredTime,
  notes: opt,
  company: opt,
});

export type QuickBookingValues = z.input<typeof quickBookingSchema>;
