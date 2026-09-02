// src/app/news/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Mail, Search, MessageCircle } from "lucide-react";
import { blogPosts } from "@/app/data/projects";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ContactSupport from "@/components/ui/ContactSupport";
import Markdown from 'react-markdown'

/**
 * Use an explicit record type for params to avoid `any` while remaining flexible.
 * This prevents ESLint from complaining and is safe for Next's route params.
 */
interface Props  {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const {slug} = params; 
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Pro Painting Construction Blog`,
    description: post.description,
  };
}


export default async function NewsPostPage(props: Props) {
  const params = await props.params;
  const rawSlug = params?.slug;
  console.log(params.slug);    // e.g., "123"

  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  if (!slug) {
    notFound();
  }

  const currentPost = blogPosts.find((p) => p.slug === slug);

  if (!currentPost) {
    notFound();
  }

  const post = currentPost as (typeof blogPosts)[number];

  const formattedDate =
    post?.date ? new Date(post.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `https://www.yourwebsite.com${post.image}`,
    author: {
      "@type": "Organization",
      name: "Pro Painting Construction",
    },
    publisher: {
      "@type": "Organization",
      name: "Pro Painting Construction",
      logo: {
        "@type": "ImageObject",
        url: "https://www.yourwebsite.com/logo.png",
      },
    },
    datePublished: formattedDate,
  };

  const latestPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <section className="relative h-[48vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/assets/working-with-blueprint.jpg"
          alt="before-after"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 opacity-100"
          style={{ backgroundColor: "rgba(15, 36, 56, 0.6)" }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto max-w-7xl px-4">
            <div className=" text-white text-center">
              <h2 className="text-4xl md:text-7xl font-bold mb-4 leading-tight uppercase">
                News Details
              </h2>
              <p className="text-muted">Home/news</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          <main className="lg:col-span-2">
            {/* <article className="prose prose-lg max-w-none prose-p:text-gray-600 prose-headings:text-gray-800">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#0B2653] mb-4">
                {post.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {post.description}
              </p>

              <p className="text-muted-foreground leading-relaxed">
                {post.content?.substring(0, 500)}...
              </p>

              <figure className="my-8">
                <Image
                  src={post.image}
                  alt={post.alt ?? post.title}
                  width={800}
                  height={450}
                  className="rounded-lg"
                />
                <figcaption className="text-center text-sm text-gray-500 mt-2">
                  Team construction engineers working at construction site with blueprint on table
                </figcaption>
              </figure>

              <p className="text-muted-foreground leading-relaxed">
                {post.content?.substring(500)}
              </p>
            </article> */}

            <article className="prose prose-lg max-w-none prose-p:text-gray-600 prose-headings:text-gray-800 markdown">

  <h3 className="text-2xl md:text-3xl font-semibold text-[#0B2653] mb-4">
    {post.title}
  </h3>
                <figure className="my-8">
    <Image
      src={post.image}
      alt={post.alt ?? post.title}
      width={1000}
      height={150}
      className="rounded-lg w-full lg:h-[500px]"
    />
    <figcaption className="text-center text-sm text-gray-500 mt-2">
      Team construction engineers working at construction site with blueprint on table
    </figcaption>
  </figure>
  <p className="text-muted-foreground leading-relaxed">{post.description}</p>

  <Markdown>
    {post.content}
  </Markdown>

  
</article>

            <div className="mt-12 flex flex-wrap gap-2">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800">
                <Facebook className="h-4 w-4 mr-2" /> Facebook
              </Button>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800">
                <Twitter className="h-4 w-4 mr-2" /> Twitter
              </Button>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800">
                <Mail className="h-4 w-4 mr-2" /> Email
              </Button>
            </div>
          </main>

          <div className="mt-12 lg:mt-0">
            <aside className="space-y-8">
              <div className="relative w-full max-w-sm">
                <Input placeholder="Search..." className="pr-12" />
                <Button
                  size="icon"
                  className="absolute top-0 right-0 h-full rounded-l-none bg-yellow-600 hover:bg-yellow-700"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <ContactSupport />

              <div>
                <h3 className="text-2xl font-bold mb-4 border-b pb-2">
                  Latest Post
                </h3>
                <div className="space-y-4">
                  {latestPosts.map((lp) => (
                    <Link
                      href={`/news/${lp.slug}`}
                      key={lp.slug}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={lp.image}
                          alt={lp.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold leading-tight group-hover:text-yellow-600 transition-colors">
                          {lp.title}
                        </h4>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <span>{lp.date}</span>
                          <span className="mx-2">·</span>
                          <MessageCircle className="h-3 w-3 mr-1" />
                          <span>No Comments</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
