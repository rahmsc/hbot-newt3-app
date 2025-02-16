import Airtable from "airtable";

import type { BlogPost } from "~/types/blog";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID ?? "");

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

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts()
  return posts.find((post) => post.fields["URL Slug"] === slug) || null
}