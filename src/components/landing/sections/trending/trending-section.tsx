import { getTrendingArticles } from "~/utils/supabase/trending/getTrendingArticles";
import { TrendingSectionClient } from "./trending-section-client";

export default async function TrendingSection() {
  const articles = await getTrendingArticles();
  
  if (!articles || articles.length === 0) {
    return (
      <section className="w-full bg-[#FAF7F4] pb-12">
        <div className="p-4 text-center">No trending articles available</div>
      </section>
    );
  }

  return <TrendingSectionClient initialArticles={articles} />;
}
