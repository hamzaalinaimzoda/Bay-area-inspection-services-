import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Phone, CalendarCheck } from "lucide-react";
import { site } from "@/data/site";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export function CTASection({
  title = "Ready to book your inspection?",
  subtitle = "Same-day appointments and same-day reports. Get honest, documented answers from a certified inspector who actually built homes.",
}: CTASectionProps) {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-[#0f2438] text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openBookingModal"))}
            className={cn(buttonVariants({ size: "lg" }), "bg-secondary hover:bg-secondary/90 text-white font-bold text-lg h-14 px-8 gap-2")}
          >
            <CalendarCheck className="w-5 h-5" />
            Book Inspection Online
          </button>
          <a
            href={site.phoneHref}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white text-white hover:bg-white/10 hover:text-white font-bold text-lg h-14 px-8 bg-transparent gap-2")}
          >
            <Phone className="w-5 h-5" />
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
