import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CalendarCheck, ArrowRight } from "lucide-react";
import { Field, TextInput, SelectInput, TextArea, ChoiceGroup } from "@/components/booking/fields";
import { site } from "@/data/site";
import { cities } from "@/data/cities";
import { SERVICE_OPTIONS } from "@/data/service-options";
import { quickBookingSchema, type QuickBookingValues, TIME_SLOTS } from "@/data/booking-form";
import { sendBooking, sendBookingStarted } from "@/lib/send-booking";
import { friendlyDate, type BookingSummary } from "@/lib/booking-summary";
import { trackBookingSubmitted } from "@/lib/analytics";

/**
 * The short booking form: on the ad landing page /schedule, and in the booking
 * popup that every "Book" button on the site opens.
 *
 * Someone arriving from an ad has not decided yet, and the 25-question /book
 * form asked for crawl spaces and agent emails before they could hold a time.
 * This asks for eight things — who, where, what, when — and leaves the rest for
 * the confirmation call. It posts to the same /api/book, so the booking, the
 * owner's email with the confirm button and the customer's checklist email all
 * work the same.
 *
 * `twoStep` splits those eight across two screens for ad traffic. All eight are
 * still required — /api/book needs the address to visit and the date to put in
 * the calendar — but a stranger thirty seconds off a search result meets three
 * easy questions instead of a wall that opens with their home address.
 *
 * Step one is sent as soon as it is complete (sendBookingStarted): the owner
 * gets the name and number at once and can call back if step two never
 * arrives. The line under the Continue button tells the visitor so.
 */
export function QuickBookingForm({
  onSuccess,
  initialServiceId,
  bare = false,
  twoStep = false,
}: {
  onSuccess: (summary: BookingSummary) => void;
  /** A SERVICE_OPTIONS id to preselect, from the page that opened the popup. Wins over ?service=. */
  initialServiceId?: string;
  /** No card frame or heading, for the popup, which has its own. */
  bare?: boolean;
  /** Ask who/what first and the scheduling details second. For ad landing pages. */
  twoStep?: boolean;
}) {
  const [sending, setSending] = useState(false);
  const [step, setStep] = useState(1);
  const [serverError, setServerError] = useState("");
  // Set after mount so the prerendered HTML and the first client render agree.
  const [today, setToday] = useState("");

  const {
    register, handleSubmit, watch, setValue, getValues, trigger,
    formState: { errors },
  } = useForm<QuickBookingValues>({ resolver: zodResolver(quickBookingSchema) });

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
    // ?service=<id> preselects the inspection, so an ad can link straight to it.
    const wanted = initialServiceId || new URLSearchParams(window.location.search).get("service");
    if (wanted && SERVICE_OPTIONS.some((o) => o.id === wanted)) setValue("serviceId", wanted);
  }, [setValue, initialServiceId]);

  const preferredTime = watch("preferredTime");

  // Only the step-one fields are validated before advancing; the rest are
  // checked by the resolver on submit as usual.
  const continueToDetails = async () => {
    if (!(await trigger(["name", "phone", "serviceId"]))) return;
    setStep(2);
    const v = getValues();
    const option = SERVICE_OPTIONS.find((o) => o.id === v.serviceId);
    // Not awaited: step two must not wait on, or fail with, this request.
    if (option) void sendBookingStarted({ name: v.name, phone: v.phone, company: v.company ?? "" }, option);
  };

  const onStep1 = !twoStep || step === 1;
  const onStep2 = !twoStep || step === 2;

  const onSubmit = async (v: QuickBookingValues) => {
    const option = SERVICE_OPTIONS.find((o) => o.id === v.serviceId);
    if (!option) return;
    setSending(true);
    setServerError("");
    try {
      await sendBooking(
        {
          name: v.name,
          phone: v.phone,
          email: v.email,
          addressStreet: v.addressStreet,
          addressCity: v.addressCity,
          preferredDate: v.preferredDate,
          preferredTime: v.preferredTime,
          notes: v.notes ?? "",
          company: v.company ?? "",
          form: "quick",
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
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={bare ? "grid gap-5 min-w-0" : "bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 grid gap-5 min-w-0"}
      data-testid="quick-book-form"
    >
      {!bare && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Schedule your inspection</h2>
          <p className="text-sm text-gray-600 mt-1">Takes about a minute. We'll call to confirm the time and price.</p>
          {twoStep && (
            <p className="text-xs font-semibold text-gray-500 mt-3 uppercase tracking-wide" data-testid="text-step-indicator">
              Step {step} of 2 · {step === 1 ? "Who to call" : "Where and when"}
            </p>
          )}
        </div>
      )}

      {/* Step one: who you are and what you want. Hidden rather than unmounted
          so react-hook-form keeps the values when you step back and forth. */}
      <div className={onStep1 ? "grid gap-5 min-w-0" : "hidden"}>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full name" htmlFor="q-name" required error={errors.name?.message}>
            <TextInput id="q-name" autoComplete="name" invalid={!!errors.name} {...register("name")} />
          </Field>
          <Field label="Phone" htmlFor="q-phone" required error={errors.phone?.message}>
            <TextInput id="q-phone" type="tel" inputMode="tel" autoComplete="tel" invalid={!!errors.phone} {...register("phone")} />
          </Field>
        </div>

        <Field label="Inspection" htmlFor="q-service" required error={errors.serviceId?.message}>
          <SelectInput id="q-service" invalid={!!errors.serviceId} {...register("serviceId")}>
            <option value="">Choose an inspection…</option>
            {SERVICE_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </SelectInput>
        </Field>
      </div>

      {/* Step two: where we are going and when. */}
      <div className={onStep2 ? "grid gap-5 min-w-0" : "hidden"}>
        <Field label="Email" htmlFor="q-email" required hint="Your confirmation and prep checklist go here." error={errors.email?.message}>
          <TextInput id="q-email" type="email" autoComplete="email" invalid={!!errors.email} {...register("email")} />
        </Field>

        <div className="grid sm:grid-cols-[minmax(0,1fr)_200px] gap-5">
          <Field label="Property address" htmlFor="q-street" required error={errors.addressStreet?.message}>
            <TextInput id="q-street" autoComplete="street-address" placeholder="123 Main St" invalid={!!errors.addressStreet} {...register("addressStreet")} />
          </Field>
          <Field label="City" htmlFor="q-city" required error={errors.addressCity?.message}>
            <SelectInput id="q-city" invalid={!!errors.addressCity} {...register("addressCity")}>
              <option value="">Choose…</option>
              {cities.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
              <option value="Other">Other / not listed</option>
            </SelectInput>
          </Field>
        </div>

        <Field label="Day" htmlFor="q-date" required error={errors.preferredDate?.message} className="sm:max-w-[240px]">
          <TextInput id="q-date" type="date" min={today || undefined} invalid={!!errors.preferredDate} {...register("preferredDate")} />
        </Field>
        <ChoiceGroup
          name="q-time"
          legend="Time"
          required
          options={TIME_SLOTS}
          register={register("preferredTime")}
          value={preferredTime}
          error={errors.preferredTime?.message}
          columns="sm:grid-cols-4"
        />

        <Field label="Anything we should know?" htmlFor="q-notes">
          <TextArea id="q-notes" rows={2} placeholder="Gate code, a closing deadline, a leak you're worried about…" {...register("notes")} />
        </Field>
      </div>

      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>Company<input tabIndex={-1} autoComplete="off" {...register("company")} /></label>
      </div>

      {serverError && (
        <p role="alert" className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {serverError} Please try again, or call{" "}
          <a href={site.phoneHref} className="underline font-bold">{site.phoneDisplay}</a>.
        </p>
      )}

      {/* The keys matter. Without them React reuses one <button> for both and
          only flips its type; continueToDetails finishes inside the click
          event, so the browser then ran the click's default action on a button
          that had just become type="submit" — every real tap on Continue
          submitted the empty second step and opened it covered in errors. */}
      {twoStep && step === 1 ? (
        <button
          key="continue"
          type="button"
          onClick={continueToDetails}
          className="w-full h-14 inline-flex items-center justify-center gap-2 rounded-lg bg-secondary text-white text-lg font-bold hover:bg-secondary/90 transition-colors"
          data-testid="button-quick-book-continue"
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
      ) : (
        <button
          key="submit"
          type="submit"
          disabled={sending}
          className="w-full h-14 inline-flex items-center justify-center gap-2 rounded-lg bg-secondary text-white text-lg font-bold hover:bg-secondary/90 disabled:opacity-60 transition-colors"
          data-testid="button-quick-book-submit"
        >
          {sending ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <><CalendarCheck className="w-5 h-5" /> Schedule my inspection</>}
        </button>
      )}

      {twoStep && step === 2 && (
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 underline -mt-2"
          data-testid="button-quick-book-back"
        >
          Back
        </button>
      )}

      <p className="text-xs text-gray-500 text-center -mt-2">
        {twoStep && step === 1
          ? <>We'll call this number to confirm, even if you stop here. Prefer to talk? <a href={site.phoneHref} className="underline" data-testid="link-quick-book-call">{site.phoneDisplay}</a></>
          : "No deposit. No charge to cancel with 24 hours' notice."}
      </p>
    </form>
  );
}
