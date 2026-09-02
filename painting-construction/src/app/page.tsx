import { RealitySection } from "@/components/ui/RealitySection";
import AboutBlock from "./component/home/AboutBlock";
import Contact from "./component/home/Contact";
import HeroBanner from "./component/home/HeroBanner";
import Portfolio from "./component/home/Portfolio";
import ServicesSection from "./component/home/ServicesSection";
import { Metadata } from "next";
import { services } from "./data/projects";

export const metadata: Metadata = {
  title:
    "Pro Painting Construction | Top Painters & Contractors in New York, USA",
  description:
    "Your trusted partner for residential and commercial painting and construction services in New York City. We deliver quality craftsmanship on time. Get a free estimate today!",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Pro Painting Construction",
    image:
      "https://propaintconstruction.com/propainting_construction_web_logo.png",
    "@id": "https://propaintconstruction.com",
    url: "https://propaintconstruction.com",
    telephone: "+1-917-539-8168",
    email: "mrh_nyc@yahoo.com",
    serviceType: services.map((service) => service.title),
    address: {
      "@type": "PostalAddress",
      streetAddress: "4017 Avenue D",
      addressLocality: "Brooklyn",
      addressRegion: "NY",
      postalCode: "11203",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    areaServed: {
      "@type": "City",
      name: "New York",
    },
    // If you have social media pages, you can add them.
    // "sameAs": [
    //   "https://www.facebook.com/your-profile",
    //   "https://www.instagram.com/your-profile"
    // ]
  };
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroBanner />
      {/* rest of the page… */}
      <AboutBlock />
      <ServicesSection />
      <Portfolio />
      <RealitySection />
      <Contact />
    </main>
  );
}
