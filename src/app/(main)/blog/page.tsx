import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";

import RichText from "~/components/rich-text";
import { getBlogPosts } from "~/utils/airtable/blogs/getBlogPosts";

interface BlogPostFields {
  "ID Blog": string;
  "Content Idea": string;
  "Enriched Blog": string;
  Introduction: string;
  "URL Slug": string;
  Approved: boolean;
}

export interface BlogPost {
  id: string;
  fields: BlogPostFields;
}

export async function generateMetadata(): Promise<Metadata> {
  const allBlogPosts = await getBlogPosts();
  const approvedBlogPosts = allBlogPosts.filter((post) => post.fields.Approved);

  const postCount = approvedBlogPosts.length;
  const recentPosts = approvedBlogPosts
    .slice(0, 3)
    .map((post) => post.fields["Content Idea"])
    .join(", ");

  return {
    title: "HBOT-HQ Blog | Latest Hyperbaric Oxygen Therapy Insights",
    description: `Explore our collection of ${postCount} blog posts about Hyperbaric Oxygen Therapy (HBOT). Recent topics include ${recentPosts}, and more.`,
    openGraph: {
      title: "HBOT-HQ Blog: Latest HBOT Insights and Research",
      description: `Discover ${postCount} articles on Hyperbaric Oxygen Therapy. Recent posts cover ${recentPosts}, and other HBOT topics.`,
      type: "website",
      url: "https://www.hyperbarichq.com/blog",
      images: [
        {
          url: "https://hbot-hq.com/images/blog-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "HBOT-HQ Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "HBOT-HQ Blog | Latest Hyperbaric Oxygen Therapy Insights",
      description: `Read ${postCount} articles on HBOT. Recent topics: ${recentPosts}, and more.`,
      images: ["https://hbot-hq.com/images/blog-twitter-image.jpg"],
    },
  };
}

export default async function BlogPage() {
  const allBlogPosts = await getBlogPosts();
  const approvedBlogPosts = allBlogPosts.filter((post) => post.fields.Approved);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "HBOT-HQ Blog",
    description: "Latest insights and research on Hyperbaric Oxygen Therapy",
    url: "https://www.hyperbarichq.com/blog",
    blogPost: approvedBlogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.fields["Content Idea"],
      url: `https://www.hyperbarichq.com/blog/${post.fields["URL Slug"]}`,
      description: post.fields.Introduction.slice(0, 200),
      image: `https://d144dqt8e4woe2.cloudfront.net/blogs/header/${post.fields["ID Blog"]}.png`,
    })),
  };

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <section className="flex w-full flex-col items-center justify-center pt-32">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Latest Blog Posts</h1>
          <div className="space-y-8">
            {approvedBlogPosts.map((post) => (
              <Link href={`/blog/${post.fields["URL Slug"]}`} key={post.id}>
                <div className="flex flex-col overflow-hidden rounded-lg border shadow-lg sm:flex-row">
                  <div className="w-full sm:w-1/4 lg:w-1/5">
                    <Image
                      src={`https://d144dqt8e4woe2.cloudfront.net/blogs/header/${post.fields["ID Blog"]}.png`}
                      alt={post.fields["Content Idea"]}
                      width={400}
                      height={300}
                      className="h-48 w-full object-cover sm:h-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
                    <div>
                      <h2 className="mb-2 text-xl font-bold underline sm:text-2xl">
                        {post.fields["Content Idea"]}
                      </h2>
                      <div className="mb-4 text-gray-600">
                        <RichText
                          content={
                            post.fields.Introduction.slice(0, 200) +
                            (post.fields.Introduction.length > 350 ? "..." : "")
                          }
                        />
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.fields["URL Slug"]}`}
                      className="text-orange-500 hover:underline"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
