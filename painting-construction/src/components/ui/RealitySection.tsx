"use client";

import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";
import { motion } from "framer-motion";

const sentence = ` At Pro Painting Construction, we don't just build structures; we bring your vision to life. Serving the greater New York area, we are committed to turning your ambitious ideas into tangible realities with unmatched quality and precision.`;

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

export function RealitySection() {
  return (
    <section className="relative w-full h-[50vh] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/assets/tower-crane.jpg"
        alt="A large tower crane against the New York City skyline at sunset"
        fill
        priority
        className="object-cover object-center"
      />
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-white max-w-4xl px-8 text-center">
        <motion.h2
          className="text-2xl md:text-5xl lg:text-6xl font-bold leading-none mb-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          aria-label="Fast forward to tomorrow our vision is your reality."
        >
          {["Fast forward to tomorrow", "our vision is your reality."].map(
            (line, i) => {
              const lineDelay = i * 0.18;
              return (
                <motion.div
                  key={i}
                  className="overflow-hidden"
                  variants={{ hidden: {}, visible: {} }}
                >
                  <motion.span
                    className="block"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                      delay: lineDelay,
                    }}
                  >
                    {line.split(" ").map((word, wi) => (
                      <motion.span
                        key={wi}
                        className="inline-block mr-3"
                        initial={{ y: 18, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.45,
                          ease: "easeOut",
                          delay: lineDelay + wi * 0.04,
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>
                  {/* Remove the <br /> completely */}
                </motion.div>
              );
            }
          )}
        </motion.h2>

        <motion.p
          className="text-sm md:text-lg text-neutral-200 max-w-2xl mb-8"
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
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/contact">
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-sm bg-amber-500 lg:px-6 px-3 py-6 font-bold text-black text-base hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
            >
              <span
                className="pointer-events-none absolute inset-0 left-0 w-0 bg-[#0B2653] transition-[width] duration-400 ease-out group-hover:w-full"
                aria-hidden="true"
              />
              <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 group-hover:text-white uppercase">
                Discover More
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
