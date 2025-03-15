
import { TrendingSectionClient } from "./trending-section-client";
import type { BlogDbEntry } from "~/types/blog";
import { getTrendingArticles } from "~/utils/supabase/trending/getTrendingArticles";

export async function TrendingSectionServer() {
  try {
    const articles: BlogDbEntry[] = await getTrendingArticles();
    return <TrendingSectionClient initialArticles={articles} />;
  } catch (error) {
    console.error("Error fetching content:", error);
    // Return a minimal set of articles or empty state
    return <TrendingSectionClient initialArticles={[]} />;
  }
}
