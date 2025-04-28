import { createClient } from "~/utils/supabase/server";
import type { BlogDbEntry } from "~/types/blog";

/**
 * Fetches trending articles from blog_summaries table in Supabase
 * @returns Array of trending articles formatted for UI components
 */
export async function getTrendingArticles(): Promise<BlogDbEntry[]> {
  try {
    const supabase = await createClient();

    // Only fetch from blog_summaries table
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("publish_date", { ascending: false });

    if (error) {
      console.error("Error fetching trending articles:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Transform database entries from blog_summaries to TrendingArticleProps
    return data as BlogDbEntry[];
  } catch (error) {
    console.error("Error in getTrendingArticles:", error);
    return [];
  }
}
