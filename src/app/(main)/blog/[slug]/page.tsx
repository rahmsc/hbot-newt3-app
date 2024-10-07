import Airtable from "airtable";
import Image from "next/image";
import { notFound } from "next/navigation";
import RichText from "~/components/rich-text";
import type { Metadata } from "next";
import Script from "next/script";

export interface BlogPagePost {
  id: string;
  fields: {
    "URL Slug": string;
    "ID Blog": number;
    "Content Idea": string;
    Introduction: string;
    Body: string;
    Conclusion: string;
  };
}

async function getBlogPostBySlug(slug: string): Promise<BlogPagePost | null> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Blogs")
      .select({
        filterByFormula: `{URL Slug} = '${slug}'`,
        maxRecords: 1,
      })
      .firstPage((err, records) => {
        if (err) {
          console.error("Error fetching blog post:", err);
          reject(new Error(String(err)));
          return;
        }
        if (!records || records.length === 0) {
          resolve(null);
          return;
        }
        const record = records[0];
        if (record) {
          resolve({
            id: record.id,
            fields: record.fields as BlogPagePost["fields"],
          });
        } else {
          resolve(null);
        }
      });
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.fields["Content Idea"]} | HBOT-HQ Blog`,
    description: post.fields.Introduction.slice(0, 160),
    openGraph: {
      title: post.fields["Content Idea"],
      description: post.fields.Introduction.slice(0, 160),
      type: "article",
      url: `https://www.hyperbarichq.com/blog/${post.fields["URL Slug"]}`,
      images: [
        {
          url: `https://d144dqt8e4woe2.cloudfront.net/blogs/header/${post.fields["ID Blog"]}.png`,
          width: 1000,
          height: 500,
          alt: post.fields["Content Idea"],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.fields["Content Idea"],
      description: post.fields.Introduction.slice(0, 160),
      images: [
        `https://d144dqt8e4woe2.cloudfront.net/blogs/header/${post.fields["ID Blog"]}.png`,
      ],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.fields["Content Idea"],
    image: `https://d144dqt8e4woe2.cloudfront.net/blogs/header/${post.fields["ID Blog"]}.png`,
    articleBody: `${post.fields.Introduction} ${post.fields.Body} ${post.fields.Conclusion}`,
    url: `https://www.hyperbarichq.com/blog/${post.fields["URL Slug"]}`,
    publisher: {
      "@type": "Organization",
      name: "HBOT-HQ",
      logo: {
        "@type": "ImageObject",
        url: "https://hbot-hq.com/logo.png",
      },
    },
  };

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <article className="mx-auto max-w-4xl px-4 py-16 pt-36 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            {post.fields["Content Idea"]}
          </h1>
        </header>

        <div className="mb-10 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={`https://d144dqt8e4woe2.cloudfront.net/blogs/header/${post.fields["ID Blog"]}.png`}
            alt={post.fields["Content Idea"]}
            width={1000}
            height={500}
            className="w-full object-cover"
          />
        </div>

        <div className="mb-10 text-lg">
          <RichText
            content={post.fields.Introduction}
            className="leading-relaxed"
          />
        </div>

        <div className="mb-10 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={`https://d144dqt8e4woe2.cloudfront.net/blogs/bodyimage1/${post.fields["ID Blog"]}.png`}
            alt={post.fields["Content Idea"]}
            width={1000}
            height={500}
            className="w-full object-cover"
          />
        </div>

        <div className="mb-10 text-lg">
          <RichText content={post.fields.Body} className="leading-relaxed" />
        </div>

        <div className="mb-10 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={`https://d144dqt8e4woe2.cloudfront.net/blogs/bodyimage2/${post.fields["ID Blog"]}.png`}
            alt={post.fields["Content Idea"]}
            width={1000}
            height={500}
            className="w-full object-cover"
          />
        </div>

        <div className="mb-10 text-lg">
          <RichText
            content={post.fields.Conclusion}
            className="leading-relaxed"
          />
        </div>
      </article>
    </>
  );
}
