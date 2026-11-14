import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { useSubmitContact } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, CalendarCheck, CheckCircle } from "lucide-react";
import { useState } from "react";
import { SERVICE_OPTIONS, notesWithJobType } from "@/data/service-options";
import { discountNote } from "@/data/policies";
import { cityOptions as cities } from "@/data/city-options";
import { site } from "@/data/site";
import { trackAdsConversion, trackContactSubmitted } from "@/lib/analytics";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  // Must stay in step with the enum in openapi.yaml — the API rejects anything
  // outside it.
  service: z.enum([
    "full-home-inspection",
    "mold-inspection",
    "gas-leak-detection",
    "moisture-water-damage",
    "home-mold-bundle",
    "other"
  ] as const),
  addressStreet: z.string().min(1, "Street address is required"),
  addressCity: z.string().min(1, "Please select a city"),
  addressZip: z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * Service rows are shared with the booking modal (see data/service-options.ts),
 * so the two forms cannot fall out of step.
 */

export function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  const [submitted, setSubmitted] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState("full-home-inspection");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "full-home-inspection",
      addressStreet: "",
      addressCity: "",
      addressZip: "",
      message: "",
    },
  });

  const selectedOption = SERVICE_OPTIONS.find((o) => o.id === selectedOptionId);

  function onSubmit(data: FormValues) {
    const address = `${data.addressStreet}, ${data.addressCity}, CA ${data.addressZip}`;
    const message = notesWithJobType(selectedOption, data.message);
    submitContact.mutate(
      {
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: data.service,
          address,
          message,
        },
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            // Inside the res.success branch deliberately: the mutation can
            // resolve with success:false, and firing a conversion on that
            // would teach Smart Bidding to buy failed submissions.
            const trackedService = selectedOption?.conversionKey ?? data.service;
            trackContactSubmitted(trackedService);
            trackAdsConversion(trackedService);
            setSubmitted(true);
            form.reset();
            setSelectedOptionId("full-home-inspection");
          } else {
            toast({
              title: "Submission Failed",
              description: res.message || "Please try again later.",
              variant: "destructive",
            });
          }
        },
        onError: () => {
          toast({
            title: "Error",
            description: "An unexpected error occurred. Please call us directly.",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white scroll-mt-20" data-testid="section-contact">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready for Peace of Mind?</h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Same-day appointments available across the Bay Area. Tell us about the property and you'll have a firm quote, usually within the hour.
            </p>

            <div className="space-y-7">
              <a
                href={site.phoneHref}
                className="flex items-center gap-6 group"
                data-testid="link-contact-phone-huge"
              >
                <div className="bg-secondary p-4 rounded-2xl group-hover:scale-110 transition-transform flex-shrink-0">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 font-semibold mb-1">Call for Immediate Service</p>
                  <p className="text-3xl md:text-4xl font-bold text-white group-hover:text-secondary transition-colors">
                    {site.phoneDisplay}
                  </p>
                </div>
              </a>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openBookingModal"))}
                className="flex items-center gap-6 group w-full text-left"
              >
                <div className="bg-primary border border-white/20 p-4 rounded-2xl group-hover:bg-secondary/20 transition-colors flex-shrink-0">
                  <CalendarCheck className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-gray-400 font-semibold mb-1">Or Book Online 24/7</p>
                  <p className="text-xl text-white group-hover:text-secondary transition-colors font-bold">Schedule your inspection →</p>
                </div>
              </button>

              <div className="flex items-center gap-6">
                <div className="bg-white/10 p-4 rounded-2xl flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 font-semibold mb-1">Email Us</p>
                  <p className="text-xl text-white">Use the form below</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-white/10 p-4 rounded-2xl flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  {/* A mobile service-area business, so this is the area served
                      rather than a storefront address — nobody visits us. */}
                  <p className="text-gray-400 font-semibold mb-1">Serving</p>
                  <p className="text-xl text-white">San Francisco</p>
                  <p className="text-sm text-gray-400">and the wider Bay Area</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-white/10 p-4 rounded-2xl flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 font-semibold mb-1">Business Hours</p>
                  <p className="text-xl text-white">Monday – Saturday: 8 AM – 8 PM</p>
                  <p className="text-sm text-gray-400">Online booking available 24/7</p>
                </div>
              </div>
            </div>

            {/* Prices are not published (owner's decision, 2026-09-24), so this
                explains how the quote works instead. gray-500 on the dark panel
                only reached 3.67:1; gray-300 clears 4.5:1. */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-gray-400 font-semibold mb-3 text-sm uppercase tracking-wide">How quotes work</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Price depends on the property's size, age and access, so we quote each one
                individually. Send us the address and you'll have a firm number before we book —
                usually within the hour — and it's the number you pay.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white text-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
                <p className="text-gray-600 mb-6">We'll be in touch within the hour. For immediate service, call us directly.</p>
                <a href={site.phoneHref} className="text-secondary font-bold text-xl hover:underline">{site.phoneDisplay}</a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Get Your Free Quote</h3>
                  <p className="text-gray-500 text-sm">Fill out the form — we'll respond within the hour.</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-contact">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Smith" {...field} className="bg-gray-50 border-gray-200" data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Phone *</FormLabel>
                            <FormControl>
                              <Input placeholder="(408) 555-0100" {...field} className="bg-gray-50 border-gray-200" data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Email *</FormLabel>
                          <FormControl>
                            <Input placeholder="jane@example.com" {...field} className="bg-gray-50 border-gray-200" data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Service Needed *</FormLabel>
                          {/* A native select rather than the Radix one. Radix
                              renders its options only on the client, so the
                              server HTML and the hydrated DOM disagreed and
                              React threw a hydration error (#418) on every page
                              carrying this form. A native select also gives the
                              proper picker on mobile. Options come from the
                              service data so they cannot drift. */}
                          <FormControl>
                            <select
                              aria-label="Service needed"
                              value={selectedOptionId}
                              onChange={(e) => {
                                const id = e.target.value;
                                setSelectedOptionId(id);
                                const opt = SERVICE_OPTIONS.find((o) => o.id === id);
                                field.onChange(opt?.value ?? "");
                              }}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                              className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="">Select a service</option>
                              {SERVICE_OPTIONS.map((o) => (
                                <option key={o.id} value={o.id}>{o.label}</option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                          {/* This card sits inside the white form panel, so it
                              keeps dark-on-light colours. */}
                          {selectedOption && (
                            <div className="mt-1.5 flex items-start gap-2 bg-primary/5 border border-primary/10 rounded-lg px-3 py-2">
                              <p className="text-xs text-gray-600 leading-snug">{selectedOption.priceNote}</p>
                            </div>
                          )}
                        </FormItem>
                      )}
                    />

                    {/* Split into street / city / ZIP rather than one free-text
                        line, so a submission can never arrive without knowing
                        which city it's in. City is a picker over the real
                        service area rather than free text. */}
                    <FormField
                      control={form.control}
                      name="addressStreet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Property Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} className="bg-gray-50 border-gray-200" data-testid="input-address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-4">
                      <FormField
                        control={form.control}
                        name="addressCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="sr-only">City</FormLabel>
                            <FormControl>
                              <select
                                aria-label="City"
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                data-testid="input-address-city"
                              >
                                <option value="">City…</option>
                                {cities.map((c) => (
                                  <option key={c.slug} value={c.name}>{c.name}</option>
                                ))}
                                <option value="Other">Other / not listed</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="addressZip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="sr-only">ZIP code</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="ZIP code"
                                inputMode="numeric"
                                {...field}
                                className="bg-gray-50 border-gray-200"
                                data-testid="input-address-zip"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Any specific concerns? (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g. musty smell in basement, visible mold near window..."
                              className="resize-none bg-gray-50 border-gray-200"
                              {...field}
                              rows={3}
                              data-testid="input-message"
                            />
                          </FormControl>
                          <p className="text-xs text-gray-600">{discountNote}</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold text-lg h-12 mt-2"
                      disabled={submitContact.isPending}
                      data-testid="button-submit-contact"
                    >
                      {submitContact.isPending ? "Submitting…" : "Get My Free Quote →"}
                    </Button>

                    <p className="text-center text-xs text-gray-500">We respond within 1 hour · No spam · No deposit required</p>
                  </form>
                </Form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
