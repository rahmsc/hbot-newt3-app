import React from "react";
import Image from "next/image";
import Airtable from "airtable";

import logoImage from "../../../public/logo/LOGO.png";

interface BlogPost {
  id: string;
  fields: {
    "Content Idea": string;
    Description: string;
    "URL Slug": string;
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
        maxRecords: 3, // Limit to 10 records
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
            <div key={post.id} className="flex flex-col items-center">
              <div className="relative h-72 w-72 overflow-hidden rounded-lg border">
                <Image
                  src={logoImage}
                  alt={post.fields["Content Idea"]}
                  className="absolute inset-0"
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="mb-2 text-xl font-semibold">
                  {post.fields["Content Idea"]}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
