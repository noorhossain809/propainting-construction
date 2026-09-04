"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { useGetAllProjectsQuery } from "@/redux/api/constructionProjectApi";

type Review = {
  key: string;
  name: string;
  role: string;
  text: string;
  rating: number;
};

// Deterministic avatar background colour from the person's name.
const AVATAR_COLORS = [
  "bg-amber-500",
  "bg-sky-500",
  "bg-rose-400",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-orange-500",
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < r
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { data: projects } = useGetAllProjectsQuery();
  const swiperRef = useRef<SwiperType | null>(null);

  const reviews: Review[] = (projects ?? [])
    .filter((p) => p.testimonial?.text && p.testimonial?.author)
    .map((p) => {
      const [name, ...rest] = p.testimonial!.author.split(",");
      return {
        key: p._id,
        name: name.trim(),
        role: rest.join(",").trim() || "Client",
        text: p.testimonial!.text.trim(),
        rating: p.testimonial!.rating ?? 5,
      };
    });

  if (reviews.length === 0) return null;

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white py-20">
      {/* Scoped styling for the active (centre) card + pagination */}
      <style>{`
        .enova-testimonials .swiper-slide { padding: 24px 8px; }
        .enova-testimonials .t-card {
          background: transparent;
          box-shadow: none;
          transform: scale(0.94);
          transition: transform .35s ease, box-shadow .35s ease, background .35s ease;
        }
        .enova-testimonials .swiper-slide-active .t-card {
          background: #fff;
          box-shadow: 0 25px 50px -12px rgba(11, 38, 83, 0.18);
          transform: scale(1);
        }
        .enova-testimonials .swiper-pagination {
          position: static;
          margin-top: 28px;
        }
        .enova-testimonials .swiper-pagination-bullet {
          width: 10px; height: 10px; background: #cbd5e1; opacity: 1;
          transition: all .3s ease;
        }
        .enova-testimonials .swiper-pagination-bullet-active {
          background: #fff;
          border: 2px solid #2563eb;
          width: 12px; height: 12px;
        }
      `}</style>

      <div className="mx-auto max-w-screen-xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-500">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold text-[#0B2653] md:text-5xl">
            What Our <span className="text-amber-500">Clients Say</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Real feedback from homeowners and businesses across New York City who
            trusted us with their spaces.
          </p>
        </div>

        <div className="enova-testimonials relative px-4 md:px-16">
          {/* Arrows */}
          <button
            aria-label="Previous testimonial"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-amber-400 hover:text-amber-500 md:flex"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-amber-400 hover:text-amber-500 md:flex"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            onSwiper={(s) => (swiperRef.current = s)}
            centeredSlides
            loop={reviews.length > 2}
            spaceBetween={24}
            slidesPerView={1}
            speed={600}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: reviews.length >= 3 ? 3 : reviews.length },
            }}
          >
            {reviews.map((r, i) => (
              <SwiperSlide key={r.key}>
                <article className="t-card mx-auto flex max-w-md flex-col items-center rounded-2xl px-8 py-10 text-center">
                  {/* Avatar */}
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white ${
                      AVATAR_COLORS[i % AVATAR_COLORS.length]
                    }`}
                  >
                    {initials(r.name)}
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#0B2653]">
                    {r.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {r.role}
                  </p>

                  <p className="mt-5 leading-relaxed text-muted-foreground">
                    {r.text}
                  </p>

                  <div className="mt-6">
                    <Stars rating={r.rating} />
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
