"use client";

import { motion, Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useGetAllProjectsQuery } from "@/redux/api/constructionProjectApi";

type Review = {
  key: string;
  text: string;
  author: string;
  rating: number;
  project: string;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
  },
};

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1" aria-label={`${r} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < r ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { data: projects } = useGetAllProjectsQuery();

  const reviews: Review[] = (projects ?? [])
    .filter((p) => p.testimonial?.text && p.testimonial?.author)
    .map((p) => ({
      key: p._id,
      text: p.testimonial!.text.trim(),
      author: p.testimonial!.author,
      rating: p.testimonial!.rating ?? 5,
      project: p.title,
    }));

  // Don't render the section if there are no reviews yet.
  if (reviews.length === 0) return null;

  return (
    <section id="testimonials" className="relative overflow-hidden bg-sky-50 py-20">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          className="text-center"
        >
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
        </motion.div>

        {/* Cards */}
        <div className="mt-14 flex flex-wrap justify-center gap-8">
          {reviews.map((r) => (
            <motion.article
              key={r.key}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative flex w-full max-w-md flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <Quote className="h-9 w-9 shrink-0 text-amber-400/80" />
              <p className="mt-4 flex-1 leading-relaxed text-slate-700">
                “{r.text}”
              </p>
              <div className="mt-6 border-t border-slate-100 pt-5">
                <Stars rating={r.rating} />
                <p className="mt-3 font-bold text-[#0B2653]">{r.author}</p>
                <p className="text-sm text-muted-foreground">{r.project}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
