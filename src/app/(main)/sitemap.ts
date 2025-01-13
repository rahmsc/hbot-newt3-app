import type { MetadataRoute } from "next";

import { getBlogPosts } from "~/utils/airtable/blogs/getBlogPosts";
import getArticlesByCondition from "~/utils/airtable/getArticlesByCondition";
import { getAllGuides } from "~/utils/airtable/guides/getAllGuides";

function safeDate(dateString: string | number | Date): string {
  if (dateString instanceof Date) {
    return dateString.toISOString();
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    console.error(`Invalid date: ${dateString}. Using current date.`);
    return new Date().toISOString();
  }

  return date.toISOString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.hyperbarichq.com";
  const sitemapEntries: MetadataRoute.Sitemap = [];

  try {
    console.log("Starting sitemap generation...");

    // Static routes
    const staticRoutes = [
      "",
      "/guides/user",
      "/guides/provider",
      "/research",
      "/chambers",
      "/contact",
      "/blog",
    ];

    sitemapEntries.push(
      ...staticRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        // changeFrequency: (route === "" ? "daily" : "weekly") as const,
        priority: route === "" ? 1 : 0.8,
      })),
    );

    // Research articles
    const articles = await getArticlesByCondition();
    const conditionTags = [
      ...new Set(articles.map((article) => article.fields.conditionTag)),
    ];

    for (const tag of conditionTags) {
      sitemapEntries.push({
        url: `${baseUrl}/research/${tag}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });

      const tagArticles = articles.filter(
        (article) => article.fields.conditionTag === tag,
      );

      for (const article of tagArticles) {
        sitemapEntries.push({
          url: `${baseUrl}/research/${tag}/${article.fields.id}`,
          lastModified: safeDate(article.fields.publishedDate),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        });
      }
    }

    // Guides
    const allGuides = await getAllGuides();
    const approvedGuides = allGuides.filter((guide) => guide.fields.Approved);

    for (const guide of approvedGuides) {
      sitemapEntries.push(
        {
          url: `${baseUrl}/guides/provider/${guide.id}`,
          lastModified: new Date().toISOString(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        },
        {
          url: `${baseUrl}/guides/user/${guide.id}`,
          lastModified: new Date().toISOString(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        },
      );
    }

    // Blog posts
    const allBlogs = await getBlogPosts();
    for (const post of allBlogs) {
      sitemapEntries.push({
        url: `${baseUrl}/blog/${post.fields["URL Slug"]}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }

    console.log(
      `Sitemap generation complete. Total entries: ${sitemapEntries.length}`,
    );

    if (sitemapEntries.length > 50000) {
      console.warn(
        "Sitemap exceeds 50,000 URLs. Consider splitting into multiple sitemaps.",
      );
    }

    return sitemapEntries;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return sitemapEntries; // Return whatever we've generated so far
  }
}
