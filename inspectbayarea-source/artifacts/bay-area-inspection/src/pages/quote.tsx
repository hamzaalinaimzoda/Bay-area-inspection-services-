import { useState } from "react";
import { Link } from "wouter";
import { Phone, ShieldCheck, Clock, Camera, Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { trackAdsConversion, trackQuoteSubmitted } from "@/lib/analytics";

/**
 * Ad landing page.
 *
 * Built because the campaign produced 55 clicks and zero form submissions in the
 * week to Sep 1. The site's contact form asks for eight fields — including a
 * street address, a city and a validated ZIP — before someone who clicked an ad
 * to ask a price can send anything. This page asks for two.
 *
 * Deliberately rendered without Layout: no navbar, no footer, no blog links, no
 * city directory. A landing page has exactly one job, and every additional link
 * is a way to leave without converting. The only navigation offered is the logo
 * back to the homepage and the phone number, which is the path this audience
 * actually prefers.
 *
 * The address is collected on the callback instead. It was never needed to start
 * a conversation — it was needed to finish a booking, and those are different
 * moments.
 */

const TRUST = [
  { icon: ShieldCheck, text: "InterNACHI Certified — inspected by a former builder" },
  { icon: Camera, text: "Infrared thermal imaging included, not an add-on" },
  { icon: Clock, text: "Same-day report, photos of every finding" },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Quote() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [service, setService] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();

    if (!name || phone.length < 7) {
      setError("Please enter your name and a phone number we can reach you on.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service,
          message: String(form.get("message") ?? "").trim(),
          sourcePath: typeof window !== "undefined" ? window.location.pathname : "/quote",
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? "Request failed");

      // Only after a genuinely successful save — a conversion fired on intent
      // rather than completion teaches Smart Bidding to buy abandonment.
      trackQuoteSubmitted(service || "other");
      trackAdsConversion(service || "other");
      setStatus("sent");
    } catch {
      setError("Something went wrong. Please call us directly and we'll sort it out.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-primary text-white">
      <Seo
        title="Get a Home Inspection Quote — San Francisco & Bay Area"
        description="Tell us your name and number and get a firm quote for a Bay Area home inspection. InterNACHI certified, thermal imaging included, same-day report."
        path="/quote"
      />

      {/* Minimal header. The logo is the only way off this page by design. */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
            <img src="/images/logo.webp" alt="" width={32} height={37} className="h-8 w-auto" />
            <span className="font-bold text-sm sm:text-base">{site.name}</span>
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 text-secondary-on-dark font-bold text-sm sm:text-base hover:underline"
            data-testid="link-quote-header-call"
          >
            <Phone className="w-4 h-4" />
            {site.phoneDisplay}
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-3xl py-10 sm:py-14">
        {status === "sent" ? (
          <div className="bg-white text-gray-900 rounded-2xl p-8 sm:p-10 text-center shadow-2xl">
            <span className="inline-flex w-14 h-14 rounded-full bg-green-100 items-center justify-center mb-5">
              <Check className="w-7 h-7 text-green-700" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">Got it — you're on the list.</h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              You'll get a call back shortly, usually within the hour. If you'd rather not wait,
              call now and you'll get straight through.
            </p>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-secondary text-white font-bold rounded-lg px-6 h-12 hover:opacity-90 transition-opacity"
              data-testid="link-quote-success-call"
            >
              <Phone className="w-4 h-4" />
              {site.phoneDisplay}
            </a>
          </div>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              What will your inspection cost?
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-8 max-w-xl">
              Leave your name and number and you'll get one firm number for your property — not a
              range that shifts later, and not a twenty-minute phone call to find out.
            </p>

            <form
              onSubmit={onSubmit}
              className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl"
              noValidate
            >
              <div className="grid gap-5">
                <div>
                  <label htmlFor="q-name" className="block text-sm font-bold mb-2">
                    Your name
                  </label>
                  <input
                    id="q-name"
                    name="name"
                    autoComplete="name"
                    required
                    className="w-full h-12 rounded-lg border border-gray-300 px-4 text-base focus:outline-none focus:ring-2 focus:ring-secondary"
                    data-testid="input-quote-name"
                  />
                </div>

                <div>
                  <label htmlFor="q-phone" className="block text-sm font-bold mb-2">
                    Phone number
                  </label>
                  <input
                    id="q-phone"
                    name="phone"
                    // type="tel" brings up the numeric keypad on mobile, which is
                    // where almost all of this traffic lands.
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    className="w-full h-12 rounded-lg border border-gray-300 px-4 text-base focus:outline-none focus:ring-2 focus:ring-secondary"
                    data-testid="input-quote-phone"
                  />
                </div>

                <div>
                  <label htmlFor="q-service" className="block text-sm font-bold mb-2">
                    What do you need? <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <select
                    id="q-service"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full h-12 rounded-lg border border-gray-300 bg-white px-4 text-base focus:outline-none focus:ring-2 focus:ring-secondary"
                    data-testid="select-quote-service"
                  >
                    <option value="">Not sure yet</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.shortName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="q-message" className="block text-sm font-bold mb-2">
                    Anything we should know? <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <textarea
                    id="q-message"
                    name="message"
                    rows={3}
                    placeholder="Address, closing date, or what's worrying you about the property."
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-secondary"
                    data-testid="input-quote-message"
                  />
                </div>

                {status === "error" && error && (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full h-14 rounded-lg bg-secondary text-white font-bold text-lg hover:opacity-90 disabled:opacity-60 transition-opacity"
                  data-testid="button-quote-submit"
                >
                  {status === "sending" ? "Sending…" : "Get my quote"}
                </button>

                <p className="text-xs text-gray-600 text-center leading-relaxed">
                  No obligation. We'll call you back — usually within the hour.
                </p>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-300 text-sm mb-3">Would rather just talk?</p>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-white/25 rounded-lg px-6 h-12 font-bold hover:bg-white/10 transition-colors"
                data-testid="link-quote-call"
              >
                <Phone className="w-4 h-4" />
                {site.phoneDisplay}
              </a>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {TRUST.map((t) => (
                <li key={t.text} className="flex items-start gap-3">
                  <t.icon className="w-5 h-5 text-secondary-on-dark flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-200 leading-relaxed">{t.text}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}
