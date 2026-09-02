import React from "react";
import { blogPosts } from "../data/projects";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Insights | Pro Painting Construction",
  description:
    "Stay updated with the latest news, industry trends, and insights from Pro Painting Construction. Read our articles on painting, renovation, and construction in New York.",
  alternates: {
    canonical: "/news",
  },
};

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {" "}
      {/* <-- fixed: use className */}
      <section className="relative h-[48vh] md:h-[70vh]">
        {/* Image goes here, fill makes it behave like a background */}
        <Image
          src="/assets/office-building.jpg"
          alt="A modern office building in New York, representing the latest in construction news and trends."
          fill
          className="object-cover object-center"
          priority
        />

        {/* Overlay on top of the image */}
        <div
          className="absolute inset-0 opacity-100"
          style={{ backgroundColor: "rgba(15, 36, 56, 0.6)" }}
        />

        {/* Text content centered on top of everything */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight uppercase">
              News
            </h1>
            <p className="text-gray-200">Home/news</p>
          </div>
        </div>
      </section>
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Link href={`/news/${post.slug}`} key={index} className="group">
                <div className="overflow-hidden rounded-lg shadow-lg transition-smooth duration-300 hover:scale-105">
                  {/* Image wrapper */}
                  <div className="relative inset-0 w-full h-64 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="absolute  w-full h-full object-cover "
                    />
                    <div className="absolute top-4 left-4 rounded-md bg-yellow-600 px-3 py-1 text-xs font-semibold uppercase text-white">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-medium text-gray-800 hover:text-yellow-600 transition-smooth duration-300 cursor-pointer">
                      {post.title}
                    </h3>
                    <div className="mb-4 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <p className="mb-6 text-gray-600">{post.description}</p>
                    <Button className="bg-yellow-600 text-white hover:bg-yellow-700">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
