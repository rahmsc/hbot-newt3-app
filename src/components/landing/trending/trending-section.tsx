import { getTrendingArticles } from "~/utils/supabase/getTrendingArticles";
import { TrendingSectionClient } from "./trending-section-client";

export default async function TrendingSection() {
  const articles = await getTrendingArticles();
  return <TrendingSectionClient initialArticles={articles} />;
}
