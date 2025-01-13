import Airtable from "airtable";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogPost {
  id: string;
  fields: {
    "Content Idea": string;
    Description: string;
    "URL Slug": string;
    "ID Blog": number;
    Approved: boolean;
  };
}

async function getAirtableData(): Promise<BlogPost[]> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Blogs")
      .select({
        view: "Grid view",
        maxRecords: 3, // Limit to 3 records
        filterByFormula: "{Approved} = 1",
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
            fields: record.fields as BlogPost["fields"],
          })) ?? [];

        resolve(blogPosts);
      });
  });
}

const BlogSection = async () => {
  const blogPosts = await getAirtableData();

  return (
    <section className="relative w-full">
      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-8 text-3xl font-semibold uppercase">Blog Section</h2>

        <div className="grid grid-cols-1 gap-8 pt-16 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.fields["URL Slug"]}`} key={post.id}>
              <div key={post.id} className="flex flex-col items-center">
                <div className="relative aspect-square w-3/4 overflow-hidden rounded-lg border">
                  <Image
                    src={`https://d144dqt8e4woe2.cloudfront.net/blogs/header/${post.fields["ID Blog"]}.png`}
                    alt={post.fields["Content Idea"]}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 75vw, (max-width: 1200px) 37.5vw, 25vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="mb-2 text-xl font-semibold">
                    {post.fields["Content Idea"]}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
