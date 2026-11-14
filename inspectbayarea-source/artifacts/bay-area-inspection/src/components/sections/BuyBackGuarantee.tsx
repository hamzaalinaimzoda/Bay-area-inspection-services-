import { Check, ExternalLink } from "lucide-react";
import { site } from "@/data/site";

/**
 * InterNACHI's "We'll Buy Your Home" Guarantee.
 *
 * Confirmed live 2026-09-24: the owner's InterNACHI ID appears on InterNACHI's
 * own public participant list (nachi.org/buyback-guarantees/inspectors),
 * dated the day they enrolled. Do not re-add this section, or restore it if
 * removed, without checking that list again first — advertising a guarantee
 * the inspector isn't currently enrolled in would put an unfunded promise on
 * the site.
 *
 * The terms quoted below are InterNACHI's own (nachi.org/buy.htm), not ours to
 * loosen or restate more generously. Full legal terms are linked rather than
 * reproduced, the same way the InterNACHI referral-protection terms are
 * handled on /real-estate-agents.
 */

const TERMS_URL = "https://www.nachi.org/buy-legal";
const PROGRAM_URL = "https://www.nachi.org/buy.htm";

const conditions = [
  "Covers your primary residence",
  "Full purchase price, backed by InterNACHI",
  "Applies to a defect within InterNACHI's Standards of Practice that we missed",
  "Honored up to 90 days after closing",
];

interface BuyBackGuaranteeProps {
  /** Compact variant for a sidebar or a narrower column. */
  compact?: boolean;
}

export function BuyBackGuarantee({ compact = false }: BuyBackGuaranteeProps) {
  if (compact) {
    return (
      <div className="bg-primary rounded-2xl p-6 text-white" data-testid="section-buyback-compact">
        <img
          src={`${import.meta.env.BASE_URL}images/badges/internachi-buyback-guarantee.webp`}
          alt="InterNACHI We'll Buy Your Home Guarantee"
          width={320}
          height={360}
          loading="lazy"
          decoding="async"
          className="h-20 w-auto mx-auto mb-4"
        />
        <h3 className="text-lg font-bold text-center mb-2">If we miss it, they buy it back</h3>
        <p className="text-sm text-white/75 leading-relaxed text-center mb-3">
          Full home inspections here are backed by InterNACHI's Buy-Back Guarantee — full purchase
          price if we miss a covered defect.
        </p>
        <a
          href={PROGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 text-sm font-semibold text-secondary-on-dark hover:underline underline-offset-4"
        >
          How the guarantee works
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-primary text-white" data-testid="section-buyback-guarantee">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          <div className="flex justify-center lg:col-span-1">
            <img
              src={`${import.meta.env.BASE_URL}images/badges/internachi-buyback-guarantee.webp`}
              alt="InterNACHI We'll Buy Your Home Guarantee — full purchase price, backed by InterNACHI"
              width={320}
              height={360}
              loading="lazy"
              decoding="async"
              className="h-56 w-auto"
            />
          </div>
          <div className="lg:col-span-2">
            <p className="text-secondary-on-dark font-semibold uppercase tracking-wide text-sm mb-3">
              InterNACHI Buy-Back Guarantee
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              If we miss it, InterNACHI buys your home back
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Every full home inspection is backed by the strongest guarantee in the industry. If our
              inspector misses a covered defect, InterNACHI will buy the home back from you — at the
              full purchase price.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {conditions.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-gray-200">
                  <Check className="w-5 h-5 text-secondary-on-dark mt-0.5 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Guarantee provided and administered by InterNACHI, not by {site.legalName}. Additional
              terms and conditions apply.
            </p>
            <a
              href={TERMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-secondary-on-dark hover:underline underline-offset-4"
              data-testid="link-buyback-terms"
            >
              Read the full guarantee terms on InterNACHI.org
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
