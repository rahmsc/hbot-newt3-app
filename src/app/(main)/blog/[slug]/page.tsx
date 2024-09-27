import Airtable from "airtable";
import { notFound } from "next/navigation";
import { RichTextDisplay } from "~/components/rich-text-display";

export interface BlogPost {
  id: string;
  fields: {
    "Content Idea": string;
    "Enriched Blog": string;
  };
}

async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
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
            fields: record.fields as BlogPost["fields"],
          });
        } else {
          resolve(null);
        }
      });
  });
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

  return (
    <section className="flex w-full flex-col items-center justify-center pt-32">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          {post.fields["Content Idea"]}
        </h1>
        <RichTextDisplay data={post} />
      </div>
    </section>
  );
}
