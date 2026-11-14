import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  eyebrow?: string;
}

export function PageHero({ title, subtitle, crumbs, eyebrow }: PageHeroProps) {
  return (
    <section className="relative bg-primary text-white overflow-hidden" data-testid="page-hero">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />
      <div className="container mx-auto px-4 max-w-7xl relative z-10 py-8 md:py-20">
        {crumbs && crumbs.length > 0 && (
          <nav className="flex items-center flex-wrap gap-1 text-sm text-gray-300 mb-3 md:mb-5" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                {c.href ? (
                  <Link href={c.href} className="hover:text-secondary-on-dark hover:bg-primary transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="w-4 h-4 text-gray-500" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          // Keep the accent's solid-navy contrast even where the decorative
          // white pattern crosses behind the small text.
          <p className="text-secondary-on-dark bg-primary w-fit font-semibold uppercase tracking-wide text-xs md:text-sm mb-2 md:mb-3">{eyebrow}</p>
        )}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">{title}</h1>
        {subtitle && (
          <p className="text-base md:text-xl text-gray-200 mt-3 md:mt-5 max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
