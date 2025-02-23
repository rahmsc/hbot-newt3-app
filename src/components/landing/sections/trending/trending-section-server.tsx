import { getBlogPosts } from "~/utils/airtable/blogs/getBlogPosts";
import { getAllGuides } from "~/utils/airtable/guides/getAllGuides";
import { TrendingSectionClient } from "./trending-section-client";
import type { TrendingArticleProps } from "~/components/trending/trending-card";

export async function TrendingSectionServer() {
  try {
    const [blogPosts, guides] = await Promise.all([
      getBlogPosts().catch(() => []),
      getAllGuides().catch(() => []),
    ]);

    if (!blogPosts.length && !guides.length) {
      throw new Error("No content available");
    }

    const blogArticles = blogPosts
      .filter((post) => post.fields["Content Idea"] && post.fields.Introduction)
      .map((post) => ({
        category: { main: "Blog", sub: "Article" },
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

    const guideArticles = guides
      .filter(
        (guide) =>
          guide.fields["Guide Title"] && guide.fields["Guide Introduction"],
      )
      .map((guide) => ({
        category: { main: "Guide", sub: "Resource" },
        title: guide.fields["Guide Title"],
        description: guide.fields["Guide Introduction"],
        image: guide.fields["ID Blog"]
          ? `https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/guides/${guide.fields["ID Blog"]}.png`
          : "/placeholder.svg",
        link: `/guides/${guide.id}`,
        date: guide.fields.Date
          ? new Date(guide.fields.Date).toISOString()
          : new Date().toISOString(),
        type: "guide" as const,
      }));

    const articles: TrendingArticleProps[] = [
      ...blogArticles,
      ...guideArticles,
    ];

    return <TrendingSectionClient initialArticles={articles} />;
  } catch (error) {
    console.error("Error fetching content:", error);
    // Return a minimal set of articles or empty state
    return <TrendingSectionClient initialArticles={[]} />;
  }
}
