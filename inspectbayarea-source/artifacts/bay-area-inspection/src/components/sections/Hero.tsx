import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ShieldCheck, Star, CalendarCheck, BadgeCheck } from "lucide-react";
import heroImage from "@assets/generated_images/hero_inspection_underway.webp";
import heroImageSmall from "@assets/generated_images/hero_inspection_underway-480.webp";
import { site } from "@/data/site";

export function Hero() {
  const openBooking = () => window.dispatchEvent(new CustomEvent("openBookingModal"));

  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 lg:pt-44 lg:pb-28 overflow-hidden bg-primary text-white" data-testid="section-hero">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy column — intentionally un-animated: it holds the <h1>, which is
              the LCP element. Any entrance animation here delays first paint. */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6 text-sm font-medium">
              <ShieldCheck className="w-4 h-4 text-secondary-on-dark" />
              <span>Former Builder. InterNACHI Certified Inspector.</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 tracking-tight">
              San Francisco Home Inspections That Find the Damage{" "}
              <span className="text-secondary-on-dark">Other Inspectors Miss.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
              Full home inspections by a certified inspector who actually built homes — with specialist mold and moisture testing when you need it. Same-day appointments, same-day reports. Serving San Francisco, Daly City, the Peninsula &amp; the wider Bay Area.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={openBooking}
                className={cn(buttonVariants({ size: "lg" }), "bg-secondary hover:bg-secondary/90 text-white font-bold text-lg h-14 px-8 gap-2")}
                data-testid="button-hero-book"
              >
                <CalendarCheck className="w-5 h-5" />
                Book Inspection Online
              </button>
              <a
                href={site.phoneHref}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white text-white hover:bg-white/10 hover:text-white font-bold text-lg h-14 px-8 bg-transparent")}
                data-testid="button-hero-call"
              >
                Call {site.phoneDisplay} <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
              <a
                href={site.google.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline underline-offset-4"
              >
                <div className="flex text-yellow-400" aria-hidden="true">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm text-gray-200 font-medium">{site.google.rating} on Google</span>
              </a>
              <div className="w-px h-5 bg-white/20 hidden sm:block" />
              <span className="text-sm text-gray-200 font-medium">✓ 500+ Inspections Completed</span>
              <div className="w-px h-5 bg-white/20 hidden sm:block" />
              <span className="text-sm text-gray-200 font-medium">✓ Same-Day Availability</span>
            </div>

            {/* The face avatars that sat beside this line were AI-generated and
                implied real clients; removed with the fake testimonials. */}
            <p className="text-sm font-medium text-gray-300">
              Trusted by 500+ Bay Area homeowners &amp; real estate agents
            </p>
          </div>

          {/* Image column */}
          <div className="ba-scale-in ba-delay-1 relative max-w-md mx-auto lg:max-w-none w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/15">
              <img
                src={heroImage}
                srcSet={`${heroImageSmall} 480w, ${heroImage} 900w`}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Ladder and inspection equipment set up at the side of a Bay Area home"
                width={900}
                height={1125}
                fetchPriority="high"
                className="w-full h-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>

            {/* Floating rating card — the real Google rating. It previously
                quoted a testimonial from a client who did not exist. */}
            <a
              href={site.google.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ba-fade-up ba-delay-2 absolute -bottom-5 -left-3 sm:left-4 bg-white rounded-2xl shadow-xl p-4 max-w-[15rem] text-gray-900 hover:shadow-2xl transition-shadow"
              data-testid="link-hero-google-rating"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold tabular-nums">{site.google.rating}</span>
                <div className="flex text-yellow-400" aria-hidden="true">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </div>
              <p className="text-sm font-semibold leading-snug">
                {site.google.reviewCount} reviews on Google
              </p>
              <p className="text-xs text-gray-600 mt-1">Read what clients say →</p>
            </a>

            {/* Floating verified badge */}
            <div className="ba-fade-up ba-delay-3 absolute -top-4 -right-2 sm:right-4 bg-white rounded-full shadow-lg pl-2 pr-3 py-1.5 flex items-center gap-2 text-gray-900">
              <BadgeCheck className="w-5 h-5 text-secondary-on-dark" />
              <span className="text-xs font-bold">Same-Day Report</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
