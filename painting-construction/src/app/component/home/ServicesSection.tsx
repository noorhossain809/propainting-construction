// app/component/home/ServicesSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { services } from "@/app/data/projects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, Variants } from "framer-motion";
import { useGetAllServicesQuery } from "@/redux/api/constructionServiceApi";

// Normalized card shape shared by live (API) and static (fallback) data.
type ServiceCardData = {
  key: string;
  id: string;
  title: string;
  image: string;
  alt: string;
  featured?: boolean;
  description?: string;
};

const headingContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const headingChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
};


const sentence = `We specialize in a wide range of painting & construction services,including residential, commercial, and industrial projects.`;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // controls delay between words
    },
  },
};

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ServicesSection() {
  const { data: liveServices, isLoading } = useGetAllServicesQuery();

  // Prefer live API data (active, ordered); fall back to the static list.
  const cards: ServiceCardData[] =
    liveServices && liveServices.length > 0
      ? [...liveServices]
          .filter((s) => s.isActive !== false)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((s) => ({
            key: s._id,
            id: s._id,
            title: s.title,
            image: s.heroImage?.url ?? "",
            alt: s.heroImage?.alt || s.title,
            featured: true,
            description: s.shortDescription,
          }))
      : services.map((s, idx) => ({
          key: s.id ?? String(idx),
          id: s.id ?? "#",
          title: s.title,
          image: s.image,
          alt: s.alt,
          featured: s.featured,
          description: s.description,
        }));

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-sky-50 py-16 md:py-24"
    >
      {/* Decorative blueprint overlay (optional) */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/assets/blueprint-pattern.svg')] bg-[length:900px] bg-[right_-120px_top_-60px] bg-no-repeat opacity-[0.12]" />

      <div className="relative mx-auto max-w-screen-2xl px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          className="text-center"
        >
          <motion.div
  className="mb-2 text-sm font-semibold tracking-[0.18em] text-amber-500"
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true, amount: 0.6 }}
>
  OUR SERVICES
</motion.div>
         <motion.h2
  className="text-2xl font-extrabold leading-tight text-[#0B2653] md:text-5xl"
  variants={headingContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.6 }}
>
  {"Our painting & construction services".split(" ").map((word, i) => (
    <motion.span key={i} variants={headingChild} className="inline-block mr-2">
      {word}
    </motion.span>
  ))}
</motion.h2>
          <motion.p
            className="md:text-xl text-base text-muted-foreground max-w-3xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            {sentence.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={child}
                className="inline-block mr-1" // spacing between words
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Cards */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full mt-10 px-4"
        >
          <CarouselContent>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
                    <div className="p-1">
                      <div className="h-[440px] w-full animate-pulse rounded-[28px] bg-muted" />
                    </div>
                  </CarouselItem>
                ))
              : cards.map(({ key, ...cardProps }) => (
                  <CarouselItem key={key} className="md:basis-1/2 lg:basis-1/4">
                    <div className="p-1">
                      <ServiceCard {...cardProps} />
                    </div>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious
            className="absolute left-6 lg:-left-10 z-10 lg:z-0 top-1/2 -translate-y-1/2
                   h-12 w-12 rounded-full backdrop-blur-sm text-gray-950
                   shadow-lg ring-1 ring-black/10
                   hover:bg-white hover:shadow-xl
                   focus-visible:ring-2 focus-visible:ring-primary
                   disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <CarouselNext
            className="absolute right-6 lg:-right-10 z-10 lg:z-0 top-1/2 -translate-y-1/2
                   h-12 w-12 rounded-full backdrop-blur-sm text-gray-950
                   shadow-lg ring-1 ring-black/10
                   hover:bg-white hover:shadow-xl
                   focus-visible:ring-2 focus-visible:ring-primary
                   disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </Carousel>

        {/* CTA */}
        <div className="mt-10 flex justify-center md:mt-14">
          <Link href="/service">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-md bg-amber-500 lg:px-6 px-3 py-3 lg:py-6 text-white text-base hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
              >
                {/* the black wipe */}
                <span
                  className="pointer-events-none absolute inset-0 left-0 w-0 bg-black transition-[width] duration-400 ease-out group-hover:w-full"
                  aria-hidden="true"
                />
                {/* label stays above the wipe */}
                <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 group-hover:text-white">
                  See More
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Card -------------------- */

function ServiceCard({
  title,
  image,
  id = "#",
  featured,
  description,
  alt,
}: Omit<ServiceCardData, "key">) {
  return (
    <Link
      href={`/service/${id}`}
      className="group relative block overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }} // cubic-bezier for TS
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={featured}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/0" />
      </motion.div>

      <div className="relative z-10 flex h-[440px] items-end p-6 md:p-7">
        <div className="w-full text-white">
          <div className="flex items-center gap-3">
            <h3
              className="
              text-xl font-semibold drop-shadow-sm md:text-2xl
              leading-tight
              transform transition-all duration-1000 ease-out
              group-hover:translate-y-[-4px] group-hover:opacity-100
              opacity-90
            "
            >
              {title}
            </h3>
          </div>

          {featured && description && (
            <div
              className="
                mt-3 max-w-[36ch] text-sm text-white/90 md:text-base
                overflow-hidden
                max-h-0 opacity-0 translate-y-4
                group-hover:max-h-[240px] group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-700 ease-out
              "
              aria-hidden={false}
            >
              <p className="leading-relaxed">{description}</p>

              <div className="mt-4 inline-flex items-center gap-2 text-amber-400">
                <span className="text-base font-semibold">View More</span>
                <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
