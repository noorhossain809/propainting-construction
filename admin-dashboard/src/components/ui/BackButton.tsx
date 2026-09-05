"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Reusable "Back" button for admin add/edit pages. Links to the given list
 * page so navigation is predictable even when the page is opened directly.
 */
export default function BackButton({
  href,
  label = "Back",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-amber-300 hover:bg-slate-50 hover:text-amber-600"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
