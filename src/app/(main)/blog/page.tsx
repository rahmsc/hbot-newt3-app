import Image from "next/image";
import Link from "next/link";
import Airtable from "airtable";

import RichText from "~/components/rich-text";

interface BlogPostFields {
  "ID Blog": string;
  "Content Idea": string;
  "Enriched Blog": string;
  Description: string;
  "URL Slug": string;
}

export interface BlogPost {
  id: string;
  fields: BlogPostFields;
}

async function getAirtableData(): Promise<BlogPost[]> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Blogs")
      .select({
        view: "Grid view",
        maxRecords: 10, // Limit to 10 records
      })
      .all((err, records) => {
        if (err) {
          console.error("Error fetching data:", err);
          reject(new Error(String(err)));
          return;
        }

        const blogPosts =
          records?.map((record) => ({
            id: record.id,
            fields: record.fields as unknown as BlogPost["fields"],
          })) ?? [];

        resolve(blogPosts);
      });
  });
}

export default async function BlogPage() {
  const blogPosts = await getAirtableData();

  return (
    <section className="flex w-full flex-col items-center justify-center pt-32">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Latest Blog Posts</h1>
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.fields["URL Slug"]}`} key={post.id}>
              <div
                key={post.id}
                className="flex flex-col overflow-hidden rounded-lg border shadow-lg sm:flex-row"
              >
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
                          post.fields.Description.slice(0, 200) +
                          (post.fields.Description.length > 200 ? "..." : "")
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
  );
}
