import { useState, useEffect, lazy, Suspense } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, CalendarCheck, ChevronDown, Building2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { NAV_LANDING_LINKS } from "@/data/landing/slugs";
import { trackBookingOpened } from "@/lib/analytics";

/**
 * Navbar renders on every page, so a static import here put the booking
 * form's dependencies — react-query, zod, the generated API client — in the
 * chunk every visitor downloads on first paint, regardless of whether they
 * ever open the modal. Rollup named that shared chunk after whichever module
 * happened to own it (in this case "Seo", since Seo.tsx is imported
 * everywhere too), so it looked like an innocuous ~1 KB component was
 * actually shipping ~290 KB. Lazy-loading means the booking chunk only
 * downloads once someone clicks "Book Now" or "Book an Inspection".
 */
const LazyBookingModal = lazy(() =>
  import("@/components/BookingModal").then((m) => ({ default: m.BookingModal })),
);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  // Once true, stays true — keeps the modal mounted through its own close
  // animation instead of unmounting (and losing state) the instant it shuts.
  const [bookingEverOpened, setBookingEverOpened] = useState(false);
  // Optional service row to preselect, passed as the event's detail — e.g. the
  // condo page opens the form with "Condo Inspection" already chosen. Cleared
  // on every plain open so a previous preselection never leaks into the next.
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleOpenBooking = (e: Event) => {
      const detail = (e as CustomEvent<{ serviceId?: string } | null>).detail;
      setBookingServiceId(detail?.serviceId);
      setBookingOpen(true);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("openBookingModal", handleOpenBooking);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("openBookingModal", handleOpenBooking);
    };
  }, []);

  // Tracked here rather than at each of the six buttons that can open the
  // modal, so every path — the custom event and the direct navbar clicks —
  // is counted exactly once. Also where the lazy modal chunk first mounts.
  useEffect(() => {
    if (bookingOpen) {
      trackBookingOpened();
      setBookingEverOpened(true);
    }
  }, [bookingOpen]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", dropdown: true },
    { name: "Get a Quote", href: "/pricing" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const closeAll = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-white/95 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
          {/* min-w-0 lets this shrink instead of forcing the row wider than the
              viewport; the wordmark is hidden on the narrowest phones, where the
              action buttons leave no room for it. */}
          <Link href="/" className="flex items-center gap-2.5 min-w-0" onClick={closeAll}>
            <img
              src={`${import.meta.env.BASE_URL}images/logo.webp`}
              alt={`${site.name} logo`}
              width={104}
              height={120}
              className="h-10 w-[calc(2.5rem*104/120)] md:h-12 md:w-[calc(3rem*104/120)] shrink-0"
            />
            <span className="hidden sm:block truncate font-bold text-lg md:text-xl text-primary tracking-tight leading-tight">
              {site.name}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* gap tightens at lg so seven items clear 1024–1279px without wrapping */}
            <div className="flex items-center gap-5 xl:gap-6">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.name}
                    className="relative flex items-center"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={(event) => {
                      if (!event.currentTarget.contains(document.activeElement)) setServicesOpen(false);
                    }}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        setServicesOpen(false);
                      }
                    }}
                  >
                    <Link
                      href={link.href}
                      onFocus={() => setServicesOpen(true)}
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors",
                        isActive(link.href) ? "text-primary" : "text-gray-700 hover:text-primary"
                      )}
                    >
                      {link.name}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle Services menu"
                      aria-expanded={servicesOpen}
                      aria-controls="desktop-services-menu"
                      onClick={() => setServicesOpen((isOpen) => !isOpen)}
                      className="ml-1 rounded p-1 text-gray-700 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      <ChevronDown aria-hidden="true" className="w-3.5 h-3.5" />
                    </button>
                    <div id="desktop-services-menu" hidden={!servicesOpen} className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72">
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2">
                          {services.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                              onClick={closeAll}
                            >
                              <s.icon className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-800 group-hover:text-primary">
                                {s.shortName}
                              </span>
                            </Link>
                          ))}
                          <Link
                            href="/condo-inspection"
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            onClick={closeAll}
                          >
                            <Building2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-800 group-hover:text-primary">
                              Condo Inspection
                            </span>
                          </Link>
                          {NAV_LANDING_LINKS.map((l) => (
                            <Link
                              key={l.slug}
                              href={`/${l.slug}`}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                              onClick={closeAll}
                            >
                              <l.icon className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-800 group-hover:text-primary">{l.label}</span>
                            </Link>
                          ))}
                          <Link
                            href="/what-we-inspect"
                            className="block px-3 py-2.5 mt-1 border-t border-gray-100 text-sm font-medium text-gray-800 hover:text-primary"
                            onClick={closeAll}
                          >
                            What we inspect — full checklist
                          </Link>
                          <Link
                            href="/services"
                            className="block px-3 py-2.5 text-sm font-semibold text-primary hover:text-secondary"
                            onClick={closeAll}
                          >
                            View all services →
                          </Link>
                        </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors whitespace-nowrap",
                      isActive(link.href) ? "text-primary" : "text-gray-700 hover:text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>

            <div className="flex items-center gap-2 border-l pl-6">
              <a
                href={site.phoneHref}
                className="hidden xl:flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors mr-2"
                data-testid="link-nav-phone"
              >
                <Phone className="w-4 h-4" />
                <span>{site.phoneDisplay}</span>
              </a>
              <button
                onClick={() => setBookingOpen(true)}
                className={cn(buttonVariants({ variant: "outline" }), "font-semibold border-primary text-primary hover:bg-primary/5 gap-1.5")}
                data-testid="button-nav-book"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Now
              </button>
              <a
                href={site.phoneHref}
                className={cn(buttonVariants(), "bg-secondary hover:bg-secondary/96 text-white font-semibold shadow-sm")}
                data-testid="button-nav-call"
              >
                Call Now
              </a>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => setBookingOpen(true)}
              className={cn(buttonVariants({ size: "sm", variant: "outline" }), "border-primary text-primary font-semibold gap-1")}
              data-testid="button-mobile-book"
            >
              <CalendarCheck className="w-4 h-4" />
              Book
            </button>
            <a
              href={site.phoneHref}
              className={cn(buttonVariants({ size: "sm" }), "bg-secondary hover:bg-secondary/96 text-white font-semibold")}
              data-testid="button-mobile-call"
            >
              <Phone className="w-4 h-4 mr-1.5" />
              Call Now
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-primary focus:outline-none"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              data-testid="button-mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg py-4 px-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-800 p-3 hover:bg-gray-50 rounded-md"
                onClick={closeAll}
              >
                {link.name}
              </Link>
            ))}
            <div className="pl-4 flex flex-col">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="flex items-center gap-2 text-sm text-gray-600 p-2.5 hover:bg-gray-50 rounded-md"
                  onClick={closeAll}
                >
                  <s.icon className="w-4 h-4 text-secondary" />
                  {s.shortName}
                </Link>
              ))}
              <Link
                href="/condo-inspection"
                className="flex items-center gap-2 text-sm text-gray-600 p-2.5 hover:bg-gray-50 rounded-md"
                onClick={closeAll}
              >
                <Building2 className="w-4 h-4 text-secondary" />
                Condo Inspection
              </Link>
              {NAV_LANDING_LINKS.map((l) => (
                <Link
                  key={l.slug}
                  href={`/${l.slug}`}
                  className="flex items-center gap-2 text-sm text-gray-600 p-2.5 hover:bg-gray-50 rounded-md"
                  onClick={closeAll}
                >
                  <l.icon className="w-4 h-4 text-secondary" />
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 mt-2 border-t flex flex-col gap-3">
              <button
                onClick={() => { setBookingOpen(true); closeAll(); }}
                className={cn(buttonVariants(), "w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 gap-2")}
              >
                <CalendarCheck className="w-4 h-4" />
                Book an Inspection
              </button>
              <a
                href={site.phoneHref}
                className="flex items-center justify-center gap-2 text-primary font-bold py-2"
              >
                <Phone className="w-5 h-5" />
                <span>{site.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Sticky Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t p-3 z-50 flex gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <a
          href={site.phoneHref}
          className={cn(buttonVariants(), "flex-1 bg-secondary hover:bg-secondary/96 text-white font-bold h-12 text-base")}
          data-testid="button-sticky-mobile-call"
        >
          <Phone className="w-4 h-4 mr-2" />
          Call Now
        </a>
        <button
          onClick={() => setBookingOpen(true)}
          className={cn(buttonVariants(), "flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-12 text-base gap-2")}
          data-testid="button-sticky-mobile-book"
        >
          <CalendarCheck className="w-4 h-4" />
          Book Now
        </button>
      </div>

      {bookingEverOpened && (
        <Suspense fallback={null}>
          <LazyBookingModal
            open={bookingOpen}
            initialServiceId={bookingServiceId}
            onClose={() => {
              setBookingOpen(false);
              setBookingServiceId(undefined);
            }}
          />
        </Suspense>
      )}
    </>
  );
}
