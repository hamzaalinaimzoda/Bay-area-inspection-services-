import { Link } from "wouter";
import { Phone, CalendarCheck, Mail } from "lucide-react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { LANDING_LINKS } from "@/data/landing/slugs";
import { CertificationBadges } from "@/components/CertificationBadges";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 py-12 border-t border-slate-900" data-testid="footer">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.webp`}
                alt={`${site.name} logo`}
                width={104}
                height={120}
                loading="lazy"
                decoding="async"
                className="h-14 w-[calc(3.5rem*104/120)] shrink-0"
              />
              <h3 className="text-2xl font-bold text-white">{site.name}</h3>
            </div>
            <p className="mb-3 max-w-md text-sm leading-relaxed">
              Professional, unbiased home inspections by a former builder, with specialist mold and moisture testing available. We find the hidden water damage and structural issues that others miss — with same-day reports and honest, no-pressure assessments.
            </p>
            <p className="text-xs text-gray-400 mb-4">
              InterNACHI Certified · Fully Insured (GL + E&O) · Licensed CA LLC<br />
              Serving San Francisco, Daly City, South San Francisco, the Peninsula &amp; the entire Bay Area.
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("openBookingModal"))}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              <CalendarCheck className="w-4 h-4" />
              Book an Inspection
            </button>

            <CertificationBadges
              size={76}
              tone="dark"
              className="mt-7"
              caption={`Verify member ${site.nachiId} at InterNACHI.org`}
            />
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-secondary-on-dark transition-colors">
                    {s.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/condo-inspection" className="hover:text-secondary-on-dark transition-colors">
                  Condo Inspection
                </Link>
              </li>
              {LANDING_LINKS.map((l) => (
                <li key={l.slug}>
                  <Link href={`/${l.slug}`} className="hover:text-secondary-on-dark transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/book" className="hover:text-secondary-on-dark transition-colors">Book an Inspection</Link></li>
              <li><Link href="/pricing" className="hover:text-secondary-on-dark transition-colors">Get a Quote</Link></li>
              <li><Link href="/what-we-inspect" className="hover:text-secondary-on-dark transition-colors">What We Inspect</Link></li>
              <li><Link href="/sample-report" className="hover:text-secondary-on-dark transition-colors">Sample Report</Link></li>
              <li><Link href="/real-estate-agents" className="hover:text-secondary-on-dark transition-colors">For Real Estate Agents</Link></li>
              <li><Link href="/about" className="hover:text-secondary-on-dark transition-colors">About Us</Link></li>
              <li><Link href="/service-areas" className="hover:text-secondary-on-dark transition-colors">Service Areas</Link></li>
              <li><Link href="/blog" className="hover:text-secondary-on-dark transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-secondary-on-dark transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-2 text-xl font-bold text-white hover:text-secondary-on-dark transition-colors">
                  <Phone className="w-5 h-5 text-secondary-on-dark flex-shrink-0" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm hover:text-secondary-on-dark transition-colors break-all">
                  <Mail className="w-4 h-4 text-secondary-on-dark flex-shrink-0" />
                  {site.email}
                </a>
              </li>
              <li className="text-sm text-gray-400">
                {site.hours}<br />
                Online booking: 24/7
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; 2026 {site.legalName}. All rights reserved.</p>
          <p>San Francisco &amp; the Bay Area · California LLC #B20260264730</p>
        </div>
      </div>
    </footer>
  );
}
