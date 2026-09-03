// app/component/home/HeroBanner.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Pagination,
  Navigation,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useGetAllHeroSlidesQuery } from "@/redux/api/heroSlideApi";
import { Loader } from "@/components/ui/Loader";

// Defaults applied to slides that don't specify their own badge/buttons.
const DEFAULT_BADGE = "PRO PAINTING CONSTRUCTION";
const DEFAULT_PRIMARY = { text: "Get Started", link: "/contact" };
const DEFAULT_SECONDARY = { text: "View Projects", link: "/our-work" };

// Extract a YouTube video id from watch/share/embed URLs (null if not YouTube).
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

// Normalized slide shape shared by live (API) and static (fallback) data.
type HeroView = {
  key: string;
  kind: "video" | "image";
  src: string;
  title: string;
  subtitle?: string;
  badge: string;
  primaryText: string;
  primaryLink: string;
  secondaryText: string;
  secondaryLink: string;
};

type Slide =
  | {
      kind: "video";
      mp4: string;
      webm?: string;
      poster?: string;
      title: string;
      subtitle?: string;
    }
  | {
      kind: "image";
      src: string;
      title: string;
      subtitle?: string;
    };

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

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

const slides: Slide[] = [
  {
    kind: "video",
    mp4: "/videos/construction.mp4",
    title: "Expert Painting & Construction Services in New York, USA",
    subtitle:
      "From residential buildings to commercial complexes, we build with trust and quality.",
  },
  {
    kind: "video",
    mp4: "/videos/painting.mp4",
    title: "Professional Painting for Homes & Offices",
    subtitle:
      "Transform your space with our premium painting services and skilled professionals.",
  },
  {
    kind: "video",
    mp4: "/videos/steam-cleaning.mp4",
    title: "Professional Steam Cleaning Services",
    subtitle:
      "Deep-cleaning carpets, upholstery, and tiles with eco-friendly steam technology.",
  },
  {
    kind: "image",
    src: "/assets/construct-planning.jpg",
    title: "Your Vision, Our Blueprint",
    subtitle: "Meticulous planning and on-time project delivery guaranteed.",
  },
];

// Static fallback slides mapped into the normalized view shape.
const fallbackViews: HeroView[] = slides.map((s, i) => ({
  key: `static-${i}`,
  kind: s.kind,
  src: s.kind === "video" ? s.mp4 : s.src,
  title: s.title,
  subtitle: s.subtitle,
  badge: DEFAULT_BADGE,
  primaryText: DEFAULT_PRIMARY.text,
  primaryLink: DEFAULT_PRIMARY.link,
  secondaryText: DEFAULT_SECONDARY.text,
  secondaryLink: DEFAULT_SECONDARY.link,
}));

export default function HeroBanner() {
  const { data: liveSlides, isLoading } = useGetAllHeroSlidesQuery();

  // Show the loader while the DB responds — never flash static slides first.
  if (isLoading) {
    return (
      <section className="relative grid h-[75vh] place-items-center bg-[#0B2653] md:h-[90vh]">
        <Loader size="lg" label="Loading" />
      </section>
    );
  }

  // Prefer live API slides (active, ordered); fall back to the static list.
  const views: HeroView[] =
    liveSlides && liveSlides.length > 0
      ? [...liveSlides]
          .filter((s) => s.isActive !== false)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((s) => ({
            key: s._id,
            kind: s.mediaType === "video" ? "video" : "image",
            src:
              s.mediaType === "video"
                ? s.videoUrl ?? ""
                : s.backgroundImage?.url ?? "",
            title: s.title,
            subtitle: s.subtitle,
            badge: s.badgeText || DEFAULT_BADGE,
            primaryText: s.primaryButtonText || DEFAULT_PRIMARY.text,
            primaryLink: s.primaryButtonLink || DEFAULT_PRIMARY.link,
            secondaryText: s.secondaryButtonText || DEFAULT_SECONDARY.text,
            secondaryLink: s.secondaryButtonLink || DEFAULT_SECONDARY.link,
          }))
      : fallbackViews;

  return (
    <section className="relative mx-auto max-h-screen overflow-hidden">
      <div
        className="custom-prev absolute left-6 top-1/2 z-20 -translate-y-1/2 cursor-pointer"
        aria-hidden="true"
      >
        <button
          aria-label="Previous slide"
          className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/35 bg-black/30 backdrop-blur-sm transition hover:scale-105"
        >
          {/* left arrow */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        className="custom-next absolute right-6 top-1/2 z-20 -translate-y-1/2 cursor-pointer"
        aria-hidden="true"
      >
        <button
          aria-label="Next slide"
          className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/35 bg-black/30 backdrop-blur-sm transition hover:scale-105"
        >
          {/* right arrow */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation, Keyboard]}
        slidesPerView={1}
        loop
        effect="fade"
        speed={900}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        // Link Swiper navigation to our custom DOM elements by selector
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        keyboard={{ enabled: true }}
        className="relative"
      >
        {views.map((s, idx) => (
          <SwiperSlide key={s.key}>
            <div className="relative h-[75vh] md:h-[90vh]">
              {/* Background (video or image) */}
              {s.kind === "video" ? (
                (() => {
                  const ytId = getYouTubeId(s.src);
                  // YouTube URLs can't play in <video>; embed them full-bleed.
                  return ytId ? (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <iframe
                        className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2"
                        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&playsinline=1&rel=0&modestbranding=1&showinfo=0`}
                        title={s.title}
                        allow="autoplay; encrypted-media"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  ) : (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src={s.src} type="video/mp4" />
                    </video>
                  );
                })()
              ) : (
                <Image
                  src={s.src}
                  alt={s.title}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                />
              )}

              {/* Overlays */}
              <div className="absolute inset-0" />
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(15, 36, 56, 0.6)" }}
              />

              {/* Content */}
              <div className="relative z-10 grid h-full place-items-center px-6 py-24 text-center text-white md:px-12 lg:px-20">
                <div className="max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                    className=""
                  >
                    <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-yellow-400">
                      {s.badge}
                    </p>
                  </motion.div>
                  <motion.h1
                    className="text-2xl font-bold leading-tight md:text-4xl lg:text-6xl"
                    variants={headingVariants}
                    initial="hidden"
                    animate="visible"
                    key={s.title} // ensures new animation on slide change
                  >
                    {s.title}
                  </motion.h1>

                  <motion.p
                    className="mx-auto px-8 mt-6 max-w-3xl text-sm md:text-base text-white/85 lg:text-lg"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                  >
                    {s.subtitle?.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        variants={child}
                        className="inline-block mr-1" // spacing between words
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                    className="mt-10 flex items-center justify-center gap-4"
                  >
                    <Button asChild size="lg" className="rounded-full px-6">
                      <Link href={s.primaryLink}>{s.primaryText}</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="rounded-full border border-white/30 bg-white/15 text-white hover:bg-white/25"
                    >
                      <Link href={s.secondaryLink}>{s.secondaryText}</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
