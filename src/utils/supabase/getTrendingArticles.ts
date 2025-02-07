import { getBlogPosts } from "~/utils/airtable/blogs/getBlogPosts";
import { getAllGuides } from "~/utils/airtable/guides/getAllGuides";

export interface TrendingArticle {
  category: {
    main: string;
    sub: string;
  };
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
  type: "blog" | "guide";
}

export async function getTrendingArticles(): Promise<TrendingArticle[]> {
  try {
    // Fetch both blogs and guides
    const [blogPosts, guides] = await Promise.all([
      getBlogPosts(),
      getAllGuides(),
    ]);

    // Map blog posts to TrendingArticle format
    const blogArticles = blogPosts
      .filter((post) => post.fields["Content Idea"] && post.fields.Introduction)
      .map((post) => ({
        category: {
          main: "Blog",
          sub: "Article",
        },
        title: post.fields["Content Idea"],
        description: post.fields.Introduction,
        image: post.fields["ID Blog"]
          ? `https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/${post.fields["ID Blog"]}.png`
          : "/placeholder.svg",
        link: `/blog/${post.fields["URL Slug"]}`,
        date: post.fields.Date
          ? new Date(post.fields.Date).toISOString()
          : new Date().toISOString(),
        type: "blog" as const,
      }));

    // Map guides to TrendingArticle format
    const guideArticles = guides
      .filter(
        (guide) =>
          guide.fields["Guide Title"] && guide.fields["Guide Introduction"],
      )
      .map((guide) => ({
        category: {
          main: "Guide",
          sub: "Resource",
        },
        title: guide.fields["Guide Title"],
        description: guide.fields["Guide Introduction"],
        image: guide.fields["ID Blog"]
          ? `https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/guides/${guide.fields["ID Blog"]}.png`
          : "/placeholder.svg",
        link: `/guide/${guide.fields["ID Blog"]}`,
        date: guide.fields.Date
          ? new Date(guide.fields.Date).toISOString()
          : new Date().toISOString(),
        type: "guide" as const,
      }));

    // Combine and sort articles
    const allArticles = [...blogArticles, ...guideArticles]
      .filter((article) => article.title && article.description)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6); // Get only the 6 most recent articles

    return allArticles;
  } catch (error) {
    console.error("Error fetching trending articles:", error);
    return [];
  }
}
