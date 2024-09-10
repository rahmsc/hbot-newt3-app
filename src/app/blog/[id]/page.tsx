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

async function getBlogPost(id: string): Promise<BlogPost | null> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Blogs").find(id, (err, record) => {
      if (err) {
        console.error("Error fetching blog post:", err);
        reject(new Error(String(err)));
        return;
      }
      if (!record) {
        resolve(null);
        return;
      }
      resolve({
        id: record.id,
        fields: record.fields as BlogPost["fields"],
      });
    });
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getBlogPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">{post.fields["Content Idea"]}</h1>
      <RichTextDisplay data={post} />
    </div>
  );
}
