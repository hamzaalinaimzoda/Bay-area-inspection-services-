import { homeFaqs } from "@/data/home-faqs";

/**
 * Homepage FAQ — rendered open, not as an accordion.
 *
 * This was a Radix accordion, which mounts its panel contents only once a
 * panel is opened. Every answer was therefore absent from the prerendered
 * HTML: the questions shipped, the answers did not. Two problems followed.
 * Google's FAQPage guidance expects the answer text to be present on the page
 * that carries the markup, and `homeFaqSchema` was asserting seven answers the
 * document never contained. More costly day to day, answer engines quote what
 * they can read, and these seven answers are the most quotable copy on the
 * site — plain, factual, already in question form — so none of it was
 * reachable.
 *
 * Rendering them open is what fixes that rather than a `forceMount` on the
 * panels: content behind `hidden` is in the HTML but still weighted as hidden,
 * and nothing here is long enough to need collapsing. Two columns keep the
 * section about as tall as the accordion was.
 */
export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white scroll-mt-20" data-testid="section-faq">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <dl className="grid gap-8 md:grid-cols-2 md:gap-x-12">
          {homeFaqs.map((faq) => (
            <div key={faq.question} className="min-w-0">
              <dt className="font-semibold text-gray-900 text-lg mb-2">{faq.question}</dt>
              <dd className="text-gray-600 text-base leading-relaxed">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
