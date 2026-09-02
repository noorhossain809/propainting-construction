"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/app/data/projects";
import { motion, Variants } from "framer-motion";
import { useGetAllProjectsQuery } from "@/redux/api/constructionProjectApi";

// Normalized card shape shared by live (API) and static (fallback) data.
type PortfolioCard = {
  key: string;
  href: string;
  image: string;
  alt: string;
  type: string;
  title: string;
  description: string;
};

const sentence = `See the dramatic transformations we’ve created for homeowners 
and businesses throughout the area.`;

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

const headingContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const headingChild: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
};

const Portfolio = () => {
  const words = ["Our", "Portfolio"];

  const { data: liveProjects, isLoading } = useGetAllProjectsQuery();

  // Prefer live API data; fall back to the committed static list.
  const cards: PortfolioCard[] = (
    liveProjects && liveProjects.length > 0
      ? liveProjects.map((p) => ({
          key: p._id,
          href: `/our-work/${p._id}`,
          image: p.mainImage?.url ?? "",
          alt: p.mainImage?.alt || p.title,
          type: p.projectType,
          title: p.title,
          description: p.description,
        }))
      : PROJECTS.map((p) => ({
          key: p.id,
          href: `/our-work/${p.id}`,
          image: p.image,
          alt: p.alt,
          type: p.type,
          title: p.title,
          description: p.description,
        }))
  ).slice(0, 6);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          className="text-center"
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-[#0B2653] mb-4"
              variants={headingContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={headingChild}
                  className={
                    word === "Portfolio"
                      ? "text-yellow-500 p-1 inline-block"
                      : "inline-block"
                  }
                >
                  {word}&nbsp;
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
          </div>
        </motion.div>

        {/* Featured Before/After */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          >
            <Card className="p-0 overflow-hidden shadow-construction border-1">
              {/* 1. Add flexbox and centering classes to this parent div */}
              <div className="relative h-[420px] flex flex-col items-center justify-center">
                <Image
                  src="/assets/before-after.jpg"
                  alt="Stunning before and after exterior transformation of a home in New York"
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-50" />
                {/* 2. Make this div relative for stacking context and remove bottom-0 */}
                <div className="relative text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Complete Home Transformation
                  </h3>
                  <p className="text-lg opacity-90">
                    From weathered exterior to stunning curb appeal
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card
                  key={i}
                  className="p-0 overflow-hidden border-0 shadow"
                >
                  <div className="h-48 animate-pulse bg-muted" />
                  <CardContent className="p-6 space-y-3">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  </CardContent>
                </Card>
              ))
            : cards.map((project) => (
                <Link href={project.href} key={project.key}>
                  <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                  >
                    <Card className="group p-0 overflow-hidden hover:shadow-sky-50 transition-all duration-300 border-0 shadow ">
                      <div className="relative h-48">
                        <Image
                          src={project.image}
                          alt={project.alt}
                          fill
                          className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          priority
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            {project.type}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-[#0B2653] mb-2">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/our-work">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-md bg-amber-500 lg:px-6 px-3 lg:py-6 py-3 text-white text-base hover:bg-amber-500"
              >
                <span className="pointer-events-none absolute inset-0 left-0 w-0 bg-[#0B2653] transition-[width] duration-400 ease-out group-hover:w-full" />
                <span className="relative z-10 flex items-center gap-1.5">
                  View Full Portfolio
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
