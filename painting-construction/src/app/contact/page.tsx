// contact page section

import ContactForm from "@/components/ui/contactForm";
import ContactSupport from "@/components/ui/ContactSupport";
import ContactInfoCards from "../component/client-component/ContactInfoCards";
import Image from "next/image";
import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us for a Free Quote | Pro Painting Construction",
  description:
    "Get in touch with Pro Painting Construction in Brooklyn, New York. Call us, email, or fill out our form for a free, no-obligation estimate on your next project.",
  alternates: {
    canonical: "/contact",
  },
};

const ContactPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Pro Painting Construction",
    image: "https://propaintconstruction.com/propainting_construction_web_logo.png",
    url: "https://propaintconstruction.com/contact",
    telephone: "+1-917-539-8168",
    email: "mrh_nyc@yahoo.com",
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
  };
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative h-[48vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/assets/mobile-engineers_1098-15445.jpg"
          alt="A construction manager from Pro Painting Construction taking a call at a New York job site."
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(15, 36, 56, 0.35)" }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto max-w-7xl px-4">
            <div className=" text-white text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight uppercase">
                Contact Us
              </h1>
              <div className="absolute right-5 bottom-5">
                <p className="text-gray-200">Home/contact</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Decorative blueprint overlay (optional) */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/assets/blueprint-pattern.svg')] bg-[length:900px] bg-[right_-120px_top_-60px] bg-no-repeat opacity-[0.12]" />
      <div className="container mx-auto my-16">
        <ContactInfoCards />
      </div>

      <section
        id="contact"
        className="py-10 bg-[url('/assets/contact-us-bg.png')] bg-cover bg-center bg-no-repeat bg-sky-100"
      >
        <div className="max-w-7xl mx-auto px-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <ContactSupport />
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
