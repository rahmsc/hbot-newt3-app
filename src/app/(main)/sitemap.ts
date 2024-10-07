import type { MetadataRoute } from "next";

import getArticlesByCondition from "~/utils/airtable/getArticlesByCondition";
import { getAllGuides } from "~/utils/airtable/guides/getAllGuides";
import { getBlogPosts } from "~/utils/airtable/blogs/getBlogPosts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.hyperbarichq.com";
  let sitemapEntries: MetadataRoute.Sitemap = [];

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

    const staticSitemap: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "daily" : "weekly",
      priority: route === "" ? 1 : 0.8,
    }));

    sitemapEntries = [...staticSitemap];

    // Research articles
    const articles = await getArticlesByCondition();
    const conditionTags = [
      ...new Set(articles.map((article) => article.fields.conditionTag)),
    ];

    const researchSitemap: MetadataRoute.Sitemap = conditionTags.flatMap(
      (tag) => {
        const conditionUrl = `${baseUrl}/research/${tag}`;
        const articleUrls = articles
          .filter((article) => article.fields.conditionTag === tag)
          .map((article) => ({
            url: `${baseUrl}/research/${tag}/${article.fields.id}`,
            lastModified: new Date(article.fields.publishedDate),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          }));

        return [
          {
            url: conditionUrl,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
          ...articleUrls,
        ];
      },
    );

    sitemapEntries = [...sitemapEntries, ...researchSitemap];

    // Guides
    const allGuides = await getAllGuides();
    const approvedGuides = allGuides.filter((guide) => guide.fields.Approved);

    const guidesSitemap: MetadataRoute.Sitemap = approvedGuides.flatMap(
      (guide) => [
        {
          url: `${baseUrl}/guides/provider/${guide.id}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        },
        {
          url: `${baseUrl}/guides/user/${guide.id}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        },
      ],
    );

    sitemapEntries = [...sitemapEntries, ...guidesSitemap];

    // Blog posts
    const allBlogs = await getBlogPosts();
    const blogSitemap: MetadataRoute.Sitemap = allBlogs.map((post) => ({
      url: `${baseUrl}/blog/${post.fields["URL Slug"]}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    sitemapEntries = [...sitemapEntries, ...blogSitemap];

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
