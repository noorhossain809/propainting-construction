import AboutUs from "@/components/ui/AboutSection";
import ContactForm from "@/components/ui/contactForm";
import ContactSupport from "@/components/ui/ContactSupport";
import Image from "next/image";
import React from "react";

// 

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Pro Painting Construction | Our Story & Mission",
  description:
    "Learn about Pro Painting Construction, a leading painting and renovation company in New York. Discover our mission, values, and commitment to quality craftsmanship.",
  alternates: {
    canonical: "/about-us",
  },
};

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[48vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/assets/mobile-engineers_1098-15445.jpg"
          alt="The professional team of Pro Painting Construction discussing a project plan in New York."
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
                About Us
              </h1>
              <p className="text-muted">Home/about</p>
            </div>
          </div>
        </div>
      </section>
      <AboutUs />
      <div
        id="contact"
        className="py-10 bg-[url('/assets/contact-us-bg.png')] bg-cover bg-center bg-no-repeat bg-blue-100/80"
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
      </div>
    </div>
  );
};

export default AboutUsPage;
