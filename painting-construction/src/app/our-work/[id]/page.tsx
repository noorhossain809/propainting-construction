import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/app/data/projects";
import {
  MapPin,
  ArrowLeft,
  Building2,
  Ruler,
  CalendarDays,
  Star,
  Quote,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ContactSupport from "@/components/ui/ContactSupport";
import Link from "next/link";

interface Props  {
  params: Promise<{ id: string }>;
};

// Normalized detail shape shared by live (API) and static (fallback) sources.
type ProjectDetail = {
  id: string;
  type: string;
  title: string;
  description: string;
  location?: string;
  category: string;
  completedDate?: string;
  gallery: string[];
  challenge?: string;
  solution?: string;
  results: string[];
  testimonial?: { text: string; author: string; rating: number };
};

// Fetch a single project from the live backend by its Mongo _id.
async function fetchLiveProject(id: string): Promise<ProjectDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/construction/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const p = json?.data;
    if (!p?._id) return null;
    return {
      id: p._id,
      type: p.projectType,
      title: p.title,
      description: p.description,
      location: p.location,
      category: p.category,
      completedDate: p.completedDate,
      gallery:
        Array.isArray(p.gallery) && p.gallery.length > 0
          ? p.gallery
          : p.mainImage?.url
          ? [p.mainImage.url]
          : [],
      challenge: p.challenge,
      solution: p.solution,
      results: Array.isArray(p.results) ? p.results : [],
      testimonial:
        p.testimonial?.text && p.testimonial?.author
          ? {
              text: p.testimonial.text,
              author: p.testimonial.author,
              rating: p.testimonial.rating ?? 5,
            }
          : undefined,
    };
  } catch {
    return null;
  }
}

// Fall back to the committed static dataset (kept for offline/empty backend).
function fromStatic(id: string): ProjectDetail | null {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return null;
  return {
    id: p.id,
    type: p.type,
    title: p.title,
    description: p.description,
    location: p.location,
    category: p.category,
    completedDate: p.completedDate,
    gallery: p.gallery,
    challenge: p.challenge,
    solution: p.solution,
    results: p.results,
    testimonial: p.testimonial,
  };
}

async function loadProject(id: string): Promise<ProjectDetail | null> {
  return (await fetchLiveProject(id)) ?? fromStatic(id);
}

// Render an ISO date (from the API) as a readable date; pass other strings through.
function formatDate(value?: string): string {
  if (!value) return "N/A";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Prefix relative asset paths with the site domain; leave absolute URLs intact.
function toAbsolute(src: string): string {
  return src.startsWith("http")
    ? src
    : `https://propaintconstruction.com${src}`;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const project = await loadProject(params?.id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Our Work | Pro Painting Construction`,
    description: project.description,
     alternates: {
      canonical: `/our-work/${project.id}`,
    },
  };
}

type Fact = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const PortfolioDetails = async(props: Props) => {
  const params = await props.params;
  const { id } = params;

  const project = await loadProject(id);

  const facts: Fact[] = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: project?.location || "N/A",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      label: "Sector",
      value: project?.category || "N/A",
    },
    {
      icon: <Ruler className="h-5 w-5" />,
      label: "Scope Of Work",
      value: "12000+",
    },
    {
      icon: <CalendarDays className="h-5 w-5" />,
      label: "Completion Date",
      value: formatDate(project?.completedDate),
    },
  ];

  if (!project) {
    notFound();
  }

   const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "url": `https://propaintconstruction.com/our-work/${project.id}`,
    "image": project.gallery.map(toAbsolute),
    "provider": {
        "@type": "Organization",
        "name": "Pro Painting Construction",
        "url": "https://propaintconstruction.com"
    },
    "locationCreated": {
        "@type": "Place",
        "name": project.location
    },
    "dateCreated": project.completedDate, // Assuming date is in ISO format e.g., "2025-10-07"
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
          src="/assets/before-after.jpg"
          fill
          alt={project?.title || ""}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col justify-center items-center text-white">
              <Badge className="mb-6 bg-primary/90 backdrop-blur text-primary-foreground px-4 py-2 text-sm font-medium">
                {project?.type}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {project?.title}
              </h1>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-8">
                {project?.description}
              </p>
              <Link href="/our-work">
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Portfolio
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
            <div className="relative w-full overflow-hidden rounded-[28px]">
              <Carousel
                opts={{ loop: true, align: "start" }}
                className="w-full"
              >
                {/* Make items edge-to-edge */}
                <CarouselContent className="-ml-0">
                  {project.gallery.map((img, index) => (
                    <CarouselItem key={index} className="pl-0">
                      {/* Panoramic aspect & fill image */}
                      <div className="relative aspect-[21/15]">
                        <Image
                          src={img}
                          alt={`${project.title} image ${index + 1}`}
                          fill
                          sizes="100vw"
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Circular arrows like the mockup */}
                <CarouselPrevious
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2
                   h-12 w-12 rounded-full bg-white/10 text-white
                   shadow-lg ring-1 ring-black/10
                   hover:bg-white hover:shadow-xl
                   focus-visible:ring-2 focus-visible:ring-primary
                   disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <CarouselNext
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2
                   h-12 w-12 rounded-full bg-white/10 text-white
                   shadow-lg ring-1 ring-black/10
                   hover:bg-white hover:shadow-xl
                   focus-visible:ring-2 focus-visible:ring-primary
                   disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </Carousel>
            </div>
            {/* Copy blocks */}
            <div className="mt-8 md:mt-12">
              {/* The Challenge Section */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  The Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* Our Solution Section */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  Our Solution
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Results Section */}
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  Results & Outcome
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {project.results.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>

              {/* Client Testimonial */}
              {project.testimonial?.text && project.testimonial?.author && (
                <div className="mt-10 rounded-2xl border border-amber-100 bg-amber-50/60 p-8">
                  <Quote className="h-9 w-9 text-amber-400" />
                  <p className="mt-4 text-lg italic leading-relaxed text-slate-700">
                    “{project.testimonial.text.trim()}”
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.round(project.testimonial!.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-[#0B2653]">
                      {project.testimonial.author}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: facts card */}
          <div className="space-y-4 flex flex-col justify-center items-center">
            <ContactSupport />
            <Card className="rounded-2xl bg-yellow-400/10 border border-muted/50 shadow-sm p-6  w-full max-w-sm md:p-7">
              <ul className="divide-y">
                {facts.map((f, i) => (
                  <li key={i} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-50 text-yellow-500">
                        {f.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {f.label}
                        </p>
                        <p className="mt-1 font-semibold text-foreground">
                          {f.value}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;
