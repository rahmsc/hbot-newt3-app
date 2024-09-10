import Image from "next/image";
import Link from "next/link";
import Airtable from "airtable";

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
            fields: record.fields as BlogPost["fields"],
          })) ?? [];

        resolve(blogPosts);
      });
  });
}

export default async function BlogPage() {
  const blogPosts = await getAirtableData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="overflow-hidden rounded-lg border shadow-lg"
          >
            <Image
              src={`/images/${post.fields["URL Slug"]}.jpg`}
              alt={post.fields["Content Idea"]}
              width={400}
              height={200}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold">
                {post.fields["Content Idea"]}
              </h2>
              <p className="mb-4 text-gray-600">{post.fields.Description}</p>
              <Link
                href={`/blog/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
