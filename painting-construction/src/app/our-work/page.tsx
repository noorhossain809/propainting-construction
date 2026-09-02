import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "../data/projects";
import PortfolioClient from "../component/client-component/PortfolioClient";

export const metadata: Metadata = {
  title: "Our Portfolio | Featured Projects by Pro Painting Construction",
  description:
    "Browse our portfolio of completed painting and construction projects in New York. See our work in residential, commercial, industrial, and educational sectors.",

  alternates: {
    canonical: "/our-work",
  },
};

export default function PortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Project Portfolio of Pro Painting Construction",
    url: "https://propaintconstruction.com/our-work",
    description:
      "A collection of featured painting and construction projects completed by Pro Painting Construction in New York.",
    publisher: {
      "@type": "Organization",
      name: "Pro Painting Construction",
      logo: {
        "@type": "ImageObject",
        url: "https://propaintconstruction.com/propainting_construction_web_logo.png",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PROJECTS.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          image: `https://propaintconstruction.com${project.image}`,
          url: "https://propaintconstruction.com/our-work",
        },
      })),
    },
  };
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section (Static Part) */}
      <section className="relative h-[48vh] md:h-[64vh] overflow-hidden">
        <Image
          src="/assets/before-after.jpg"
          alt="A collage of successful construction and painting projects in New York"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto max-w-7xl px-4">
            <div className=" text-white text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Our Featured Projects
              </h1>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-6">
                Explore a selection of our finest painting and construction work
                across New York City.
              </p>
              <Link href="/">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Part: Client Component */}
      <PortfolioClient projects={PROJECTS} />
    </div>
  );
}
