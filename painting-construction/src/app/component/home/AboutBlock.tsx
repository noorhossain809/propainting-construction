"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PhoneCall, CircleCheck } from "lucide-react";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useGetContactInfoQuery } from "@/redux/api/contactInfoApi";
import { Loader } from "@/components/ui/Loader";

// Committed fallback phone numbers — used when the backend is empty/unreachable.
const FALLBACK_PHONES = {
  phoneOne: "+1 (917) 539-8168",
  phoneTwo: "+1 (212) 380-3751" as string | undefined,
};

// Build a `tel:` href from a display phone number.
const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

// Variants for staggered fade-up effect
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] }, // cubic-bezier array
  },
};

export default function AboutBlock() {
  const { data, isLoading } = useGetContactInfoQuery();
  const phones = data ?? FALLBACK_PHONES;

  return (
    <section id="about" className="py-10 md:py-24">
      <div className="mx-auto max-w-screen-2xl px-4">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
        >
          <motion.div className="space-y-12" variants={itemVariants}>
            <h2 className="text-xl md:text-3xl font-bold text-[#0B2653] mb-6 ">
              Why Choose <span className="bg-yellow-500 p-1">Pro</span>
              Painting & Construction?
            </h2>
            <motion.div className="space-y-4" variants={itemVariants}>
              {[
                {
                  title: "Expert Craftsmanship",
                  text: "Our skilled professionals bring decades of experience to every project across New York City.",
                },
                {
                  title: "Quality Materials",
                  text: "We use only the finest materials and latest techniques for lasting results.",
                },
                {
                  title: "On-Time Delivery",
                  text: "We respect your schedule and complete projects on time for our clients throughout the New York area.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start space-x-4"
                  variants={itemVariants}
                >
                  {/* <div className="inline-flex h-6 md:w-6 w-9 items-center justify-center rounded-full bg-amber-500">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div> */}
                  <div>
                    <CircleCheck className="text-yellow-600/80" />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-construction-dark mb-2">
                      {item.title}
                    </h4>
                    <p className="md:text-base text-sm text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="lg:mt-16 mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
              variants={itemVariants}
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="group relative overflow-hidden rounded-md bg-amber-500 lg:px-6 px-3 lg:py-6 py-3 text-white text-base hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                >
                  <span
                    className="pointer-events-none absolute inset-0 left-0 w-0 bg-black transition-[width] duration-400 ease-out group-hover:w-full"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 group-hover:text-white">
                    Get Free Quote
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

              <div className="flex items-center gap-4">
                <div className="grid lg:h-12 h-10 lg:w-12 w-10  place-items-center rounded-full bg-amber-100">
                  <PhoneCall className="md:h-6 h-5 lg:w-6 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">
                    call support center 24x7
                  </div>
                    <div className="flex flex-col">
                      {isLoading ? (
                        <Loader size="sm" className="items-start" />
                      ) : (
                        <>
                      <a
                    href={telHref(phones.phoneOne)}
                    className="md:text-lg text-base font-semibold tracking-wide text-slate-900 hover:text-amber-600"
                  >
                    {phones.phoneOne}
                  </a>
                  {phones.phoneTwo && (
                  <a
              href={telHref(phones.phoneTwo)}
              className="md:text-lg text-base font-semibold tracking-wide text-slate-900 hover:text-amber-600"
            >
               {phones.phoneTwo}
            </a>
                  )}
                        </>
                      )}
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-6"
            variants={itemVariants}
          >
            {[
              {
                src: "/assets/painting-service-C5IAPIDk.jpg",
                alt: "Professional painters from Pro Painting Construction working on a residential project in New York",
              },
              {
                src: "/assets/renovation-before-after-B9xiNvR6.jpg",
                alt: "A stunning before-and-after view of a kitchen renovation in a New York City apartment",
              },
            ].map(
              (
                image,
                idx // 'src' এর পরিবর্তে 'image' ব্যবহার করা হয়েছে
              ) => (
                <motion.div
                  key={idx}
                  className="relative overflow-hidden rounded-lg shadow-card"
                  variants={itemVariants}
                >
                  <Image
                    src={image.src} // image.src ব্যবহার করুন
                    width={1000}
                    height={500}
                    alt={image.alt} // image.alt ব্যবহার করুন
                    className="w-full h-72 object-cover transform transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
