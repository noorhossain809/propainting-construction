// app/components/TeamSection.tsx

import ContactForm from "@/components/ui/contactForm";
import ContactSupport from "@/components/ui/ContactSupport";
import Image from "next/image";
import TeamGridClient from "../component/client-component/TeamGridClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Expert Team | Pro Painting Construction",
  description:
    "Meet the dedicated team of professionals at Pro Painting Construction. Our experienced engineers and managers are committed to delivering excellence in New York.",

  alternates: {
    canonical: "/our-team",
  },
  };

type TeamMember = {
  name: string;
  role: string;
  image: string;
  alt: string;
};

const team: TeamMember[] = [
  {
    name: "Jhon Castellon",
    role: "ENGINEERING OFFICER",
    image: "/assets/our-team/team1.jpg",
    alt: "Photo of Jhon Castellon, Engineering Officer at Pro Painting Construction",
  },
  {
    name: "Fiorella Ibáñez",
    role: "MARKETING MANAGER",
    image: "/assets/our-team/team2.jpg",
    alt: "Photo of Fiorella Ibáñez, Marketing Manager at Pro Painting Construction",
  },
  {
    name: "Zosé Corpio",
    role: "TECHNOLOGY OFFICER",
    image: "/assets/our-team/team3.jpg",
    alt: "Photo of Zosé Corpio, Technology Officer at Pro Painting Construction",
  },
  {
    name: "Kyle Frederick",
    role: "FIELD OFFICER",
    image: "/assets/our-team/team4.jpg",
    alt: "Photo of Kyle Frederick, Field Officer at Pro Painting Construction",
  },
];

export default function TeamSection() {
    const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Our Expert Team at Pro Painting Construction",
    "url": "https://propaintconstruction.com/our-team",
    "description": "Meet the dedicated professionals who lead Pro Painting Construction.",
    "publisher": {
      "@type": "Organization",
      "name": "Pro Painting Construction",
      "logo": {
        "@type": "ImageObject",
        "url": "https://propaintconstruction.com/propainting_construction_web_logo.png"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": team.map((member, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Person",
          "name": member.name,
          "jobTitle": member.role,
          "image": `https://propaintconstruction.com${member.image}`,
          "worksFor": {
            "@type": "Organization",
            "name": "Pro Painting Construction"
          }
        }
      }))
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative h-[48vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/assets/shot-of-a-group-of-builders-having-a-meeting-at-a-construction-site.jpg"
          alt="The Pro Painting Construction leadership team meeting at a New York City job site."
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 opacity-90"
          style={{ backgroundColor: "rgba(15, 36, 56, 0.35)" }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto max-w-7xl px-4">
            <div className=" text-white text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight uppercase">
                Our Team
              </h1>
              <p className="text-muted">It takes two flints to make a fire.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative py-16">
        <div className="container mx-auto text-center">
          {/* Heading */}
          <p className="text-yellow-500 font-semibold uppercase tracking-wide">
            Leadership Team
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#0a2850]">
            Expert Dedicated <span className="text-yellow-500">Team</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Our strength lies in our experienced and dedicated team. From
            project managers to skilled craftspeople, every member of Pro
            Painting & Construction is committed to upholding the highest
            standards of quality and service for our clients in New York.
          </p>

          {/* Team Grid — live API data with static fallback */}
          <TeamGridClient
            fallback={team.map((member, idx) => ({
              key: String(idx),
              ...member,
            }))}
          />
        </div>
      </div>

      <div
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
      </div>
    </div>
  );
}
