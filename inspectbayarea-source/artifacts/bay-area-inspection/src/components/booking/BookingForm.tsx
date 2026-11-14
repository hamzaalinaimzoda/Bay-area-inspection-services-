import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ChevronRight } from "lucide-react";
import { FormSection, Field, TextInput, SelectInput, TextArea, ChoiceGroup } from "@/components/booking/fields";
import { site } from "@/data/site";
import { cityOptions as cities } from "@/data/city-options";
import { SERVICE_OPTIONS } from "@/data/service-options";
import { discount } from "@/data/policies";
import {
  bookingFormSchema, type BookingFormValues, ROLES, CONTACT_PREFERENCES, PROPERTY_TYPES, SQUARE_FEET,
  FOUNDATIONS, OCCUPANCY, UTILITIES, ADD_ONS, TIME_SLOTS, ACCESS, ATTENDING, HEARD_FROM,
} from "@/data/booking-form";
import { sendBooking } from "@/lib/send-booking";
import { friendlyDate, type BookingSummary } from "@/lib/booking-summary";
import { trackBookingSubmitted } from "@/lib/analytics";

/**
 * The full booking form on /book. (The ad landing page /schedule uses the
 * short QuickBookingForm instead.)
 *
 * It collects what the inspector would otherwise ask by phone: property type
 * and size, age, crawl space or slab, access, the deadline, the agent. Posts to
 * /api/book through sendBooking, which writes the same bookings row and CRM
 * lead as the modal and emails the customer a checklist built from these
 * answers. The page decides what happens next through onSuccess.
 */

const BEDROOMS = ["Studio", "1", "2", "3", "4", "5", "6+"];
const BATHROOMS = ["1", "1.5", "2", "2.5", "3", "3.5", "4+"];

type Status = "idle" | "sending" | "error";

export function BookingForm({ onSuccess }: { onSuccess: (summary: BookingSummary) => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  // Set after mount so the prerendered HTML and the first client render agree
  // (see the same note in BookingModal).
  const [today, setToday] = useState("");

  const {
    register, handleSubmit, watch, setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: { addOns: [], discountEligible: false, altTime: "" },
  });

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
    // ?service=<id> preselects a service, so a service page or an ad can link here.
    const wanted = new URLSearchParams(window.location.search).get("service");
    if (wanted && SERVICE_OPTIONS.some((o) => o.id === wanted)) setValue("serviceId", wanted);
  }, [setValue]);

  const [role, serviceId, preferredTime, altTime, contactPreference, propertyType, foundation, occupancy, utilitiesOn, access, attending] =
    watch(["role", "serviceId", "preferredTime", "altTime", "contactPreference", "propertyType", "foundation", "occupancy", "utilitiesOn", "access", "attending"]);
  const option = SERVICE_OPTIONS.find((o) => o.id === serviceId);
  const showAgent = role === "Buyer" || role === "Seller";
  let step = 0;
  const next = () => ++step;

  const onSubmit = async (v: BookingFormValues) => {
    if (!option) return;
    setStatus("sending");
    setServerError("");
    try {
      await sendBooking(
        {
          // The API wants "" for anything unanswered, never null.
          ...Object.fromEntries(Object.entries(v).map(([k, val]) => [k, val ?? ""])),
          addOns: Array.isArray(v.addOns) ? v.addOns : [],
          serviceId: undefined,
          agentName: showAgent ? v.agentName : "",
          agentPhone: showAgent ? v.agentPhone : "",
          agentEmail: showAgent ? v.agentEmail : "",
        },
        option,
      );
      trackBookingSubmitted(option.value);
      const slot = TIME_SLOTS.find((t) => t.value === v.preferredTime);
      onSuccess({
        firstName: v.name.trim().split(/\s+/)[0] ?? "",
        phone: v.phone,
        email: v.email,
        inspection: option.label,
        requested: `${friendlyDate(v.preferredDate)} · ${slot?.sub ?? ""}`,
        property: `${v.addressStreet}, ${v.addressCity}`,
      });
    } catch (err) {
      setServerError((err as Error).message);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6" data-testid="book-form">
      <FormSection step={next()} title="About you" description="So we know who to call and how you'd like to hear from us.">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full name" htmlFor="b-name" required error={errors.name?.message}>
            <TextInput id="b-name" autoComplete="name" invalid={!!errors.name} {...register("name")} />
          </Field>
          <Field label="Phone" htmlFor="b-phone" required error={errors.phone?.message}>
            <TextInput id="b-phone" type="tel" inputMode="tel" autoComplete="tel" invalid={!!errors.phone} {...register("phone")} />
          </Field>
        </div>
        <Field label="Email" htmlFor="b-email" required error={errors.email?.message}>
          <TextInput id="b-email" type="email" autoComplete="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <ChoiceGroup name="role" legend="I am the…" required options={ROLES} register={register("role")} value={role} error={errors.role?.message} />
        <ChoiceGroup name="contactPreference" legend="Best way to reach you" options={CONTACT_PREFERENCES} register={register("contactPreference")} value={contactPreference} />
      </FormSection>

      <FormSection step={next()} title="The property" description="Size, age and what's underneath decide how long the inspection takes — and the quote.">
        <div className="grid sm:grid-cols-[minmax(0,1fr)_140px] gap-5">
          <Field label="Street address" htmlFor="b-street" required error={errors.addressStreet?.message}>
            <TextInput id="b-street" autoComplete="address-line1" placeholder="123 Main St" invalid={!!errors.addressStreet} {...register("addressStreet")} />
          </Field>
          <Field label="Unit" htmlFor="b-unit">
            <TextInput id="b-unit" autoComplete="address-line2" placeholder="Apt 4" {...register("addressUnit")} />
          </Field>
        </div>
        <div className="grid sm:grid-cols-[minmax(0,1fr)_160px] gap-5">
          <Field label="City" htmlFor="b-city" required error={errors.addressCity?.message}>
            <SelectInput id="b-city" invalid={!!errors.addressCity} {...register("addressCity")}>
              <option value="">Choose a city…</option>
              {cities.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
              <option value="Other">Other / not listed</option>
            </SelectInput>
          </Field>
          <Field label="ZIP code" htmlFor="b-zip" required error={errors.addressZip?.message}>
            <TextInput id="b-zip" inputMode="numeric" autoComplete="postal-code" maxLength={10} invalid={!!errors.addressZip} {...register("addressZip")} />
          </Field>
        </div>
        <ChoiceGroup name="propertyType" legend="Property type" required options={PROPERTY_TYPES} register={register("propertyType")} value={propertyType} error={errors.propertyType?.message} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <Field label="Square feet" htmlFor="b-sqft" className="col-span-2 sm:col-span-1">
            <SelectInput id="b-sqft" {...register("squareFeet")}>
              <option value="">Choose…</option>
              {SQUARE_FEET.map((s) => <option key={s}>{s}</option>)}
            </SelectInput>
          </Field>
          <Field label="Year built" htmlFor="b-year" error={errors.yearBuilt?.message} className="col-span-2 sm:col-span-1">
            <TextInput id="b-year" inputMode="numeric" maxLength={4} placeholder="e.g. 1925" invalid={!!errors.yearBuilt} {...register("yearBuilt")} />
          </Field>
          <Field label="Bedrooms" htmlFor="b-beds">
            <SelectInput id="b-beds" {...register("bedrooms")}>
              <option value="">—</option>
              {BEDROOMS.map((b) => <option key={b}>{b}</option>)}
            </SelectInput>
          </Field>
          <Field label="Bathrooms" htmlFor="b-baths">
            <SelectInput id="b-baths" {...register("bathrooms")}>
              <option value="">—</option>
              {BATHROOMS.map((b) => <option key={b}>{b}</option>)}
            </SelectInput>
          </Field>
        </div>
        <ChoiceGroup name="foundation" legend="What's under the house?" options={FOUNDATIONS} register={register("foundation")} value={foundation} columns="sm:grid-cols-4" />
        <div className="grid sm:grid-cols-2 gap-5">
          <ChoiceGroup name="occupancy" legend="Occupied or vacant?" options={OCCUPANCY} register={register("occupancy")} value={occupancy} columns="sm:grid-cols-2" />
          <ChoiceGroup name="utilitiesOn" legend="Water, gas and power on?" options={UTILITIES} register={register("utilitiesOn")} value={utilitiesOn} columns="grid-cols-3" />
        </div>
      </FormSection>

      <FormSection step={next()} title="The inspection" description="Adding a service to the same visit costs less than a second trip.">
        <Field label="Inspection needed" htmlFor="b-service" required error={errors.serviceId?.message}>
          <SelectInput id="b-service" invalid={!!errors.serviceId} {...register("serviceId")}>
            <option value="">Choose an inspection…</option>
            {SERVICE_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </SelectInput>
        </Field>
        {option && <p className="-mt-2 text-sm text-gray-600 bg-primary/5 border border-primary/10 rounded-lg px-3.5 py-2.5">{option.priceNote}</p>}
        <div>
          <p className="block text-sm font-semibold text-gray-800 mb-1.5">Add to the same visit <span className="font-normal text-gray-500">(optional)</span></p>
          <div className="grid sm:grid-cols-3 gap-2">
            {ADD_ONS.filter((a) => a.service !== option?.value).map((a) => (
              <label key={a.label} className="flex items-start gap-2.5 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 cursor-pointer hover:border-gray-300 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <input type="checkbox" value={a.label} className="mt-0.5 accent-primary" {...register("addOns")} />
                <span className="font-medium">{a.label}</span>
              </label>
            ))}
          </div>
        </div>
        <Field label="Anything you're worried about?" htmlFor="b-concerns" hint="A musty smell, a past leak, cracks, an old roof, an unpermitted addition…">
          <TextArea id="b-concerns" rows={3} {...register("concerns")} />
        </Field>
      </FormSection>

      <FormSection step={next()} title="When" description="Same-day and next-day slots are often open. Give a second choice if you can.">
        <div className="grid sm:grid-cols-[220px_minmax(0,1fr)] gap-5 items-start">
          <Field label="Preferred date" htmlFor="b-date" required error={errors.preferredDate?.message}>
            <TextInput id="b-date" type="date" min={today || undefined} invalid={!!errors.preferredDate} {...register("preferredDate")} />
          </Field>
          <ChoiceGroup name="preferredTime" legend="Preferred time" required options={TIME_SLOTS} register={register("preferredTime")} value={preferredTime} error={errors.preferredTime?.message} columns="sm:grid-cols-4" />
        </div>
        <div className="grid sm:grid-cols-[220px_minmax(0,1fr)] gap-5 items-start">
          <Field label="Second choice" htmlFor="b-alt">
            <TextInput id="b-alt" type="date" min={today || undefined} {...register("altDate")} />
          </Field>
          <ChoiceGroup name="altTime" legend="Second-choice time" options={TIME_SLOTS} register={register("altTime")} value={altTime} columns="sm:grid-cols-4" />
        </div>
        <Field label="Contingency or closing deadline" htmlFor="b-deadline" hint="Tell us the date the report must be in hand — deadlines get priority." className="sm:max-w-[220px]">
          <TextInput id="b-deadline" type="date" min={today || undefined} {...register("deadline")} />
        </Field>
      </FormSection>

      <FormSection step={next()} title="Access on the day" description="We need the attic, crawl space, electrical panel and water heater reachable.">
        <ChoiceGroup name="access" legend="How will we get in?" options={ACCESS} register={register("access")} value={access} />
        <ChoiceGroup name="attending" legend="Will you be there?" options={ATTENDING} register={register("attending")} value={attending} />
      </FormSection>

      {showAgent && (
        <FormSection step={next()} title="Your real estate agent" description="Optional. We'll coordinate access and send the report to them too if you'd like.">
          <div className="grid sm:grid-cols-3 gap-5">
            <Field label="Agent name" htmlFor="b-agent">
              <TextInput id="b-agent" {...register("agentName")} />
            </Field>
            <Field label="Agent phone" htmlFor="b-agent-phone">
              <TextInput id="b-agent-phone" type="tel" inputMode="tel" {...register("agentPhone")} />
            </Field>
            <Field label="Agent email" htmlFor="b-agent-email" error={errors.agentEmail?.message}>
              <TextInput id="b-agent-email" type="email" invalid={!!errors.agentEmail} {...register("agentEmail")} />
            </Field>
          </div>
        </FormSection>
      )}

      <FormSection step={next()} title="Anything else">
        <Field label="How did you hear about us?" htmlFor="b-heard" className="sm:max-w-sm">
          <SelectInput id="b-heard" {...register("heardFrom")}>
            <option value="">Choose…</option>
            {HEARD_FROM.map((h) => <option key={h}>{h}</option>)}
          </SelectInput>
        </Field>
        <Field label="Notes" htmlFor="b-notes">
          <TextArea id="b-notes" rows={3} placeholder="Gate code, parking, pets, anything else we should know." {...register("notes")} />
        </Field>
        <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" className="mt-0.5 w-4 h-4 accent-primary" {...register("discountEligible")} />
          <span>I'm a veteran, active military, first responder, teacher or healthcare worker ({discount.percent}% off).</span>
        </label>
        <div className="border-t pt-5">
          <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" className="mt-0.5 w-4 h-4 accent-primary" aria-invalid={!!errors.agreed || undefined} {...register("agreed")} />
            <span>
              I understand this is a request, not a confirmed appointment — you'll call to confirm the time and quote.
              <span className="text-secondary ml-0.5" aria-hidden="true">*</span>
            </span>
          </label>
          {errors.agreed && <p className="text-xs font-medium text-red-600 mt-1.5" role="alert">{errors.agreed.message}</p>}
        </div>

        {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label>Company<input tabIndex={-1} autoComplete="off" {...register("company")} /></label>
        </div>

        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {serverError || "Something went wrong."} Please try again, or call{" "}
            <a href={site.phoneHref} className="underline font-bold">{site.phoneDisplay}</a>.
          </p>
        )}
        {Object.keys(errors).length > 0 && status !== "error" && (
          <p role="alert" className="text-sm font-medium text-red-700">Please fix the highlighted fields above.</p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full h-14 inline-flex items-center justify-center gap-2 rounded-lg bg-secondary text-white text-lg font-bold hover:bg-secondary/90 disabled:opacity-60 transition-colors"
          data-testid="button-book-submit"
        >
          {status === "sending" ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <>Send booking request <ChevronRight className="w-5 h-5" /></>}
        </button>
        <p className="text-xs text-gray-500 text-center">No deposit. No charge to cancel with 24 hours' notice.</p>
      </FormSection>
    </form>
  );
}
