import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Our Painting & Construction Services in New York | Pro Painting Construction",
  description:
    "Explore our wide range of expert services in New York City, including residential & commercial painting, full-scale remodeling, waterproofing, and more. Contact us for a free quote.",
  alternates: {
    canonical: "/service",
  },
};

import ServicesPageClient from "../component/client-component/ServicesPageClient";
import { services } from "../data/projects";

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Pro Painting Construction",
    image:
      "https://propaintconstruction.com/propainting_construction_web_logo.png",
    url: "https://propaintconstruction.com/services",
    telephone: "+1-917-539-8168",
    address: {
      "@type": "PostalAddress",
      streetAddress: "4017 Avenue D",
      addressLocality: "Brooklyn",
      addressRegion: "NY",
      postalCode: "11203",
      addressCountry: "US",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Painting and Construction Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          areaServed: {
            "@type": "City",
            name: "New York",
          },
        },
      })),
    },
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPageClient />
    </div>
  );
}
