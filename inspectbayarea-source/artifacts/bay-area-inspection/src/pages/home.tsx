import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { BuyBackGuarantee } from "@/components/sections/BuyBackGuarantee";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { homeFaqSchema } from "@/data/home-faqs";

const homeJsonLd = [homeFaqSchema];

export default function Home() {
  return (
    <Layout>
      <Seo
        title="San Francisco Home Inspection | Bay Area Inspection Services"
        description="Certified San Francisco home inspections by a former builder. Infrared imaging, same-day reports, and mold and moisture testing across the Bay Area."
        path="/"
        jsonLd={homeJsonLd}
      />
      <Hero />
      <section className="bg-white py-12 md:py-16" aria-labelledby="home-inspection-overview">
        <article className="container mx-auto max-w-4xl px-4 text-gray-700 leading-relaxed space-y-5">
          <h2 id="home-inspection-overview" className="text-2xl md:text-3xl font-bold text-gray-900">
            Home inspections across San Francisco and the Bay Area
          </h2>
          <p>
            Bay Area Inspection Services provides full home inspections in San Francisco, Daly City, the Peninsula, and the wider Bay Area. The lead inspector is a former remodeling contractor with more than five years of hands-on experience in kitchens and baths. That building background informs an inspection of the property’s visible systems and helps identify signs of water intrusion, dry rot, and structural concerns. The company focuses on inspection work rather than repairs or remodeling, so findings are presented as an assessment rather than a repair sales pitch.
          </p>
          <p>
            A typical inspection takes about two to four hours. The inspector evaluates the property using thermal imaging and moisture meters, and clients can join for a walkthrough at the end. Same-day scheduling and next-day appointments are offered when available; the company says it confirms appointments within the hour. After the visit, clients receive a digital report with high-resolution photos, condition summaries, and repair recommendations on the same day.
          </p>
          <p>
            Standard home inspections are one part of the service. The site also lists mold inspection, moisture and water-damage assessment, gas leak detection, and combined home-and-mold inspection services. Specialist mold and moisture testing is available when a property needs it. Infrared imaging is included with the full home inspection, and service details and pricing can be reviewed before scheduling.
          </p>
          <p>
            The local housing stock varies from older San Francisco Victorian and Edwardian homes to post-war houses, hillside properties, attached units, and newer construction across the region. The website offers service-area and city pages for communities including San Francisco, Daly City, Palo Alto, San Jose, Fremont, and Hayward. For a home outside the listed areas, visitors can call to confirm whether the trip can be accommodated.
          </p>
          <p>
            Bay Area Inspection Services lists InterNACHI certification and general liability and errors-and-omissions insurance. It reports more than 500 completed inspections and provides a sample inspection report so visitors can review the report format before booking. Online scheduling is available at any time; requests are followed by a call to confirm the time and quote. Customers can book online or call the business directly with questions.
          </p>
        </article>
      </section>
      <TrustBar />
      <BuyBackGuarantee />
      <Services />
      <Gallery />
      <WhyChooseUs />
      <About />
      <HowItWorks />
      <ServiceArea />
      <GoogleReviews />
      <FAQ />
      <Contact />
    </Layout>
  );
}
