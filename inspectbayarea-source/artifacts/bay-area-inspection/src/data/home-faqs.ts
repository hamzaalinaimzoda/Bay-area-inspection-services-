/** Shared by the visible homepage accordion and its FAQPage structured data. */
export const homeFaqs = [
  {
    question: "Do you need a license to inspect in CA?",
    answer: "No state license is required for home inspectors in California. However, we are fully certified through InterNACHI, the industry's leading certification board, so we meet its national standards for training, inspection scope and reporting.",
  },
  {
    question: "What's in a mold inspection?",
    answer: "Our mold inspection includes a comprehensive visual assessment, and moisture mapping using thermal imaging and calibrated moisture meters to find the hidden moisture source feeding any growth. You get a detailed, photo-rich report the same day.",
  },
  {
    question: "How fast can you schedule?",
    answer: "We understand that real estate transactions move quickly. We offer flexible scheduling and can often accommodate same-day or next-day inspection requests. Call us to check our current availability.",
  },
  {
    question: "Why don't you do repairs?",
    answer: "We are an inspection-only company. This eliminates any conflict of interest. Our only goal is to provide you with an accurate, unbiased assessment of the property's condition, not to sell you expensive repair services.",
  },
  {
    question: "What areas do you serve?",
    answer: "San Francisco is our primary service area — every neighborhood, from the Richmond and Sunset to Noe Valley, the Mission, Pacific Heights and SOMA. We also cover Daly City, South San Francisco and 25 more cities across the Peninsula, South Bay and East Bay. See our Service Areas page for the full list.",
  },
  {
    question: "How much does it cost?",
    answer: "Pricing varies based on the type of inspection, property size, and age of the home. Call us or fill out the contact form and we'll provide a custom quote — usually within the hour.",
  },
  {
    question: "Are you certified and insured?",
    answer: "Yes, we are InterNACHI certified, and fully covered by both General Liability (GL) and Errors & Omissions (E&O) insurance for your complete protection.",
  },
];

export const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};
