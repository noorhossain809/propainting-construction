"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  motion,
  AnimatePresence,
  Variants,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/app/data/projects";
import { useGetAllProjectsQuery } from "@/redux/api/constructionProjectApi";

// Types and Constants
type Category = string;

// Preset category tabs — mirrors the admin form's category options.
const PRESET_CATEGORIES: { label: string; value: string }[] = [
  { label: "All Projects", value: "all" },
  { label: "Interior", value: "interior" },
  { label: "Painting", value: "painting" },
  { label: "Water Proofing", value: "water-proofing" },
  { label: "Wall Paper Hanging", value: "wall-paper-hanging" },
  { label: "Roofing", value: "roofing" },
  { label: "Steam Cleaning", value: "steam-cleaning" },
  { label: "Exterior", value: "exterior" },
  { label: "Commercial", value: "commercial" },
  { label: "Office", value: "office" },
  { label: "Building", value: "building" },
];

// Turn a category slug into a readable label (for custom "Others" values).
const humanizeCategory = (value: string) =>
  value
    .split(/[-_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// Normalized card shape shared by live (API) and static (fallback) data.
type PortfolioCard = {
  key: string;
  href: string;
  title: string;
  category: string;
  image: string;
  alt: string;
};

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.04,
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.32, ease: [0.33, 1, 0.68, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.996 },
  visible: {
    opacity: 1,
    y: [6, 0],
    scale: 1,
    transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 6, transition: { duration: 0.26 } },
};

// `projects` is the static dataset, kept as a graceful fallback whenever the
// live backend has no data yet or the request fails.
export default function PortfolioClient({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState<Category>("all");

  const { data: liveProjects, isLoading, isError } = useGetAllProjectsQuery();

  // Prefer live API data; fall back to the committed static list.
  const cards: PortfolioCard[] = useMemo(() => {
    if (liveProjects && liveProjects.length > 0) {
      return liveProjects.map((p) => ({
        key: p._id,
        href: `/our-work/${p._id}`,
        title: p.title,
        category: p.category,
        image: p.mainImage?.url ?? "",
        alt: p.mainImage?.alt || p.title,
      }));
    }
    return projects.map((p) => ({
      key: p.id,
      href: `/our-work/${p.id}`,
      title: p.title,
      category: p.category,
      image: p.image,
      alt: p.alt,
    }));
  }, [liveProjects, projects]);

  // Tabs = preset categories + any custom ("Others") categories found in data.
  const categories = useMemo(() => {
    const presetValues = new Set(PRESET_CATEGORIES.map((c) => c.value));
    const custom = [...new Set(cards.map((c) => c.category))]
      .filter((v) => v && !presetValues.has(v))
      .map((v) => ({ label: humanizeCategory(v), value: v }));
    return [...PRESET_CATEGORIES, ...custom];
  }, [cards]);

  const filtered = useMemo(() => {
    if (activeTab === "all") return cards;
    return cards.filter((c) => c.category === activeTab);
  }, [activeTab, cards]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as Category)}
        className="w-full"
      >
        <div className=" -mx-4 mb-8 border-b bg-muted/40 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
          <div className="container mx-auto max-w-7xl px-4">
            <TabsList className="w-full justify-start gap-1 overflow-x-auto rounded-none bg-transparent p-0">
              {categories.map((c) => (
                <TabsTrigger
                  key={c.value}
                  value={c.value}
                  className="p-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-black font-semibold uppercase"
                >
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {/* Loading state while the live portfolio is being fetched */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-xl border bg-card"
              >
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-20 rounded bg-muted" />
                  <div className="h-4 w-3/4 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show the grid once loading finishes (live data, or static fallback) */}
        {!isLoading && (
          <>
            {isError && (
              <p className="mb-6 text-sm text-muted-foreground">
                Showing our featured projects. Live updates are temporarily
                unavailable.
              </p>
            )}

            {filtered.length === 0 ? (
              <p className="py-16 text-center text-muted-foreground">
                No projects found in this category yet.
              </p>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                  {filtered.map((p) => (
                    <motion.div key={p.key} variants={itemVariants}>
                      <Link href={p.href}>
                        <motion.article
                          layout
                          whileHover={{
                            translateY: -6,
                            boxShadow: "0 12px 30px rgba(8,15,35,0.12)",
                          }}
                          className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow h-full"
                        >
                          <div className="relative aspect-[4/3]">
                            <Image
                              src={p.image}
                              alt={p.alt}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-4">
                            <Badge variant="secondary" className="capitalize">
                              {p.category}
                            </Badge>
                            <h3 className="mt-2 text-base font-semibold leading-tight line-clamp-2">
                              {p.title}
                            </h3>
                          </div>
                        </motion.article>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </>
        )}
      </Tabs>
    </div>
  );
}
