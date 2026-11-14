import { useLocation } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/booking/BookingForm";
import { BookingSidebar } from "@/components/booking/BookingSidebar";
import { saveBookingSummary } from "@/lib/booking-summary";

/**
 * The full booking form, inside the normal site layout.
 *
 * The booking modal asks for the minimum needed to hold a slot. This page is
 * for people who would rather give everything up front — agents booking for a
 * client, buyers on a contingency clock, anyone who wants a firm confirmation
 * call instead of a round of questions.
 *
 * Ads send traffic to /schedule instead: the same form without the site's
 * navigation. Both finish on /booking-received.
 */
export default function BookPage() {
  const [, navigate] = useLocation();

  return (
    <Layout>
      <Seo
        title="Bay Area Home Inspection"
        description="Book your San Francisco or Bay Area home inspection online. Tell us about the property and your deadline; we call to confirm within the hour. Same-day reports."
        path="/book"
      />
      <PageHero
        eyebrow="Book Online"
        title="Book your Bay Area home inspection"
        subtitle="Tell us about the property and when you need it inspected. We'll call to confirm the time and give you a firm quote — usually within the hour."
        crumbs={[{ label: "Home", href: "/" }, { label: "Book an Inspection" }]}
      />

      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] items-start">
          <BookingForm
            onSuccess={(summary) => {
              saveBookingSummary(summary);
              navigate("/booking-received");
            }}
          />
          <BookingSidebar />
        </div>
      </section>

      <section className="py-12 md:py-16" aria-labelledby="booking-details-heading" data-testid="booking-details">
        <div className="container mx-auto px-4 max-w-4xl text-gray-600 leading-relaxed">
          <h2 id="booking-details-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Plan your Bay Area home inspection
          </h2>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">What the inspection includes</h3>
          <p className="mb-6">
            A full home inspection evaluates the roof, exterior, structure, foundation, electrical
            system, plumbing, heating and cooling equipment, and interior. This includes gutters,
            grading and drainage, accessible crawl spaces, windows, doors, stairs, and built-in
            appliances. Infrared thermal imaging is included on every full inspection, and moisture
            meters help determine whether a stain is active or historic. Findings are documented
            with photos and explained in plain English.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">How long it takes</h3>
          <p className="mb-6">
            A typical home inspection takes two to four hours. Join the walkthrough at the end if
            you can. You receive a same-day report with photos of the findings and clear next steps,
            emailed the same evening.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">How booking works</h3>
          <p className="mb-6">
            Choose your inspection service and share the property address, type, size, preferred
            date and time, and any deadline. The form also collects access instructions and agent
            details where relevant. After you submit the request, we call to confirm the time and
            give you a firm quote, usually within the hour during business hours. You can also
            call to book. Business hours are Monday through Saturday, 8 AM to 8 PM.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Cities served</h3>
          <p>
            We serve San Francisco, the Peninsula, South Bay, and East Bay. Service-area cities
            include Daly City, San Mateo, Redwood City, Palo Alto, Mountain View, Sunnyvale,
            San Jose, Campbell, Fremont, Newark, and Hayward.
          </p>
        </div>
      </section>
    </Layout>
  );
}
