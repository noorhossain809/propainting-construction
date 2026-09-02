import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { services } from "@/app/data/projects";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import ContactSupport from "@/components/ui/ContactSupport";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

// Normalized detail shape shared by live (API) and static (fallback) sources.
type ServiceDetail = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  heading: string;
  paragraphs: string[];
};

// Fetch a single service from the live backend by its Mongo _id.
async function fetchLiveService(id: string): Promise<ServiceDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const s = json?.data;
    if (!s?._id) return null;
    return {
      id: s._id,
      title: s.title,
      description: s.subtitle || s.shortDescription || "",
      image: s.contentImage?.url || s.heroImage?.url || "",
      alt: s.contentImage?.alt || s.heroImage?.alt || s.title,
      heading: s.contentTitle || s.title,
      paragraphs: String(s.contentDescription || "")
        .split(/\n+/)
        .map((p: string) => p.trim())
        .filter(Boolean),
    };
  } catch {
    return null;
  }
}

// Fall back to the committed static dataset (kept for offline/empty backend).
function fromStatic(id: string): ServiceDetail | null {
  const s = services.find((p) => p.id === id);
  if (!s) return null;
  return {
    id: s.id ?? id,
    title: s.title,
    description: s.description ?? "",
    image: s.image,
    alt: s.alt,
    heading: s.details.heading,
    paragraphs: [s.details.p1, s.details.p2].filter(Boolean),
  };
}

async function loadService(id: string): Promise<ServiceDetail | null> {
  return (await fetchLiveService(id)) ?? fromStatic(id);
}

// Prefix relative asset paths with the site domain; leave absolute URLs intact.
function toAbsolute(src: string): string {
  return src.startsWith("http")
    ? src
    : `https://propaintconstruction.com${src}`;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const service = await loadService(params.id);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.title} | Pro Painting Construction`,
    description: service.description,
    alternates: {
      canonical: `/service/${service.id}`,
    },
  };
}

const ServiceDetailsPage = async (props: Props) => {
  const params = await props.params;
  const { id } = params;

  const service = await loadService(id);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.description,
    image: toAbsolute(service.image),
    url: `https://propaintconstruction.com/service/${service.id}`,
    provider: {
      "@type": "ProfessionalService",
      name: "Pro Painting Construction",
      url: "https://propaintconstruction.com",
      logo: "https://propaintconstruction.com/propainting_construction_web_logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4017 Avenue D",
        addressLocality: "Brooklyn",
        addressRegion: "NY",
        postalCode: "11203",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "City",
      name: "New York",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="/assets/construction-business-concept.jpg"
          fill
          alt={service?.alt}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 opacity-100"
          style={{ backgroundColor: "rgba(15, 36, 56, 0.6)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex flex-col justify-center items-center text-white text-center">
              <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
                {service?.title}
              </h1>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-8">
                {service?.description}
              </p>
              <Link href="/service">
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: hero image with big rounded corners */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[21/10]">
              <Image
                src={service.image}
                alt={`${service.alt}`}
                fill
                sizes="100vw"
                className="object-cover rounded-2xl"
                priority
              />
            </div>
            {/* Copy blocks */}
            <div className="mt-8 md:mt-10 space-y-6 text-muted-foreground leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B2653]">
                {service.heading}
              </h2>
              {service.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Right: facts card */}
          <ContactSupport />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
