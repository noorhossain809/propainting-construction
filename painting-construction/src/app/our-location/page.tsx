// components/LocationsLicenses.tsx
import React from "react";

import { Mail, Phone } from "lucide-react";
import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Locations & Licenses | Pro Painting Construction",
  description:
    "Find the official location and license information for Pro Painting Construction, a fully insured contractor serving Brooklyn and the greater New York City area.",
  alternates: {
    canonical: "/our-location",
  },
};

const LocationPage = () => {
 const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Pro Painting Construction",
  image: "https://propaintconstruction.com/propainting_construction_web_logo.png", 
  url: "https://propaintconstruction.com/our-location",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4017 Avenue D",
    addressLocality: "Brooklyn",
    addressRegion: "NY",
    postalCode: "11203",
    addressCountry: "US",
  },
  telephone: "+1-917-539-8168",
  email: "mrh_nyc@yahoo.com",
  hasCredential: {
    "@type": "Text",
    "name": "NYC Home Improvement Contractor License",
    "text": "2105436-DCA"
  }
};
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />{" "}
      <section className="relative h-[48vh] md:h-[70vh]">
        {/* Image goes here, fill makes it behave like a background */}
        <Image
          src="/assets/office-building.jpg"
          alt="The entrance to the Pro Painting Construction office in Brooklyn."
          fill
          className="object-cover object-center"
          priority
        />

        {/* Overlay on top of the image */}
        <div
          className="absolute inset-0 opacity-100"
          style={{ backgroundColor: "rgba(15, 36, 56, 0.6)" }}
        />

        {/* Text content centered on top of everything */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight uppercase">
              Location
            </h1>
            <div className="absolute right-5 bottom-5">
              <p className="text-gray-200">Home/location</p>
            </div>
          </div>
        </div>
      </section>
      <section className=" max-w-7xl mx-auto py-12 px-4 gap-8 lg:gap-16">
        <h2 className="text-2xl font-bold text-[#0B2653] mb-8">
          Locations & Licenses
        </h2>
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <div className="grid grid-cols-2 space-y-4">
              <div>
                <h3 className="font-bold text-lg text-yellow-600 mb-2">
                  Location
                </h3>
                <p className="text-gray-600">4017, ave D, Brooklyn</p>
                <p className="text-gray-600">New York, 11203</p>
              </div>

              {/* Licenses */}
              <div>
                <h3 className="font-bold text-lg text-yellow-600 mb-2">
                  LICENSES
                </h3>
                <p className="text-gray-600">NYC #2105436-DCA</p>
                <p className="text-gray-600">
                  Fully insured for your protection
                </p>
              </div>

              {/* Las Vegas Location */}
              <div className="mt-4 md:mt-0 space-y-2">
                {" "}
                {/* Adjusted margin for alignment on small screens */}
                <h3 className="font-bold text-lg text-yellow-600 mb-2">
                  Contact
                </h3>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-orange-400" />
                  <span>+9175398168</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-orange-400" />
                  <span>mrh_nyc@yahoo.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <Image
              src="/assets/propainting-construction-location.png" // Make sure this path is correct
              alt="Modern office building reflecting the quality of Pro Painting Construction's work"
              width={500}
              height={400}
              className=""
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;
