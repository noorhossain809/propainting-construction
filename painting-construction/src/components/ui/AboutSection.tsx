// app/components/AboutUs.tsx
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="relative py-16 bg-white">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pl-4">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug text-[#0a2850]">
            We&apos;re Building Everything Best <br />
            That You <span className="text-yellow-500">Needed!</span>
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Construction is a general term meaning the art and science to form
            objects systems organizations, and comes from Latin construction and
            Old French construction. To construct is the verb: the act of
            building, and the noun is construction.
          </p>

          <ul className="mt-6 space-y-3 text-gray-800">
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">✔</span> Deliver ultimate
              industrial services.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">✔</span> We are committed to
              serve you better.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">✔</span> Have world&apos;s best
              team.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">✔</span> No hidden extra charges
              needed.
            </li>
          </ul>

          <div className="mt-8 flex items-center gap-6">
            <Link href="/contact">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-none bg-amber-500 px-6 py-6 text-white text-base hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
              >
                {/* the black wipe */}
                <span
                  className="pointer-events-none absolute inset-0 left-0 w-0 bg-[#0a2850] transition-[width] duration-400 ease-out group-hover:w-full"
                  aria-hidden="true"
                />
                {/* label stays above the wipe */}
                <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 group-hover:text-white">
                  More About Us
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
            <div>
              <p className="font-signature text-lg">Jeramey</p>
              <span className="text-sm text-gray-500">CEO & Founder</span>
            </div>
          </div>
        </div>

        {/* Right Images */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="grid grid-cols-2 gap-4 relative">
            {/* Large Image */}
            <div className="col-span-1 row-span-2 relative md:w-64 w-[182px] h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/african-american-lady-safety-helmet-with-smartphone-building-level-near-building-construction.jpg"
                alt="construction worker"
                fill
                className="object-cover"
              />
            </div>

            {/* Top Small Image */}
            <div className="relative w-40 h-36 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/assets/architect-3309607.jpg"
                alt="worker ladder"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom Small Image */}
            <div className="relative w-40 h-36 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/assets/industry-3309608.jpg"
                alt="worker measuring"
                fill
                className="object-cover"
              />
            </div>

            {/* Play Button Centered */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-white md:p-12 p-8 rounded-full shadow-lg hover:bg-yellow-600 transition">
              <Image
                src="/assets/favicon.png"
                alt="worker measuring"
                fill
                className="object-cover w-8 h-8 md:p-3 p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
