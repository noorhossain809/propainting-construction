"use client";

import Image from "next/image";
import React from "react";
import { useGetContactInfoQuery } from "@/redux/api/contactInfoApi";

// Committed fallback contact info — used when the backend is empty/unreachable.
const FALLBACK_CONTACT = {
  phoneOne: "+1 (917) 539-8168",
  phoneTwo: "+1 (212) 380-3751",
  email: "mrh_nyc@yahoo.com",
};

// Build a `tel:` href from a display phone number.
const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

const ContactSupport = () => {
  const { data } = useGetContactInfoQuery();
  const info = data ?? FALLBACK_CONTACT;

  return (
    <div className="relative text-white rounded-2xl overflow-hidden w-full max-w-sm">
      <div className="absolute inset-0 bg-[#0B2653]"></div>
      <div
        className="relative py-4 bg-[url(/assets/service-sidebar-cta-bg.png)] bg-top-right bg-no-repeat container mx-auto px-6 flex flex-col items-center text-center"
        aria-labelledby="support-heading"
        role="region"
      >
        <div className="flex flex-col items-center text-center gap-4 mb-60">
          {/* phone icon */}
          <svg
            className="h-8 w-8 text-amber-400"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.63A2 2 0 0 1 4.09 2h3a2 2 0 0 1 2 1.72c.12 1.1.38 2.18.76 3.2a2 2 0 0 1-.45 2.11L8.91 10.91a16 16 0 0 0 6 6l1.88-1.88a2 2 0 0 1 2.11-.45c1.02.38 2.1.64 3.2.76A2 2 0 0 1 22 16.92z"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div>
            <p className="text-sm text-slate-300">Call Support Center 24/7</p>
            <a
              id="support-heading"
              href={telHref(info.phoneOne)}
              className="mt-2 block text-lg sm:text-xl font-semibold tracking-tight text-white no-underline hover:underline"
            >
               {info.phoneOne}
            </a>
            {info.phoneTwo && (
            <a
              href={telHref(info.phoneTwo)}
               className="mt-2 block text-lg sm:text-xl font-semibold tracking-tight text-white no-underline hover:underline"
            >
               {info.phoneTwo}
            </a>
            )}
          </div>

          {/* mail icon */}
          <svg
            className="mt-1 h-7 w-7 text-amber-400"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7.5v9A2.5 2.5 0 0 0 5.5 19h13A2.5 2.5 0 0 0 21 16.5v-9A2.5 2.5 0 0 0 18.5 5h-13A2.5 2.5 0 0 0 3 7.5z"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 7.5L12 13 3 7.5"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div>
            <p className="text-sm text-slate-300">Write To Us</p>
            <a
              href={`mailto:${info.email}`}
              className="mt-2 block text-base sm:text-lg font-semibold text-white hover:underline"
            >
              {info.email}
            </a>
          </div>
        </div>

        {/* Agent image anchored bottom, overlaps card */}
        <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 w-full max-w-sm">
          <Image
            src="/assets/support-agent.png"
            alt="Support agent"
            width={420}
            height={420}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
