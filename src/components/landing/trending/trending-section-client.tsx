"use client";

import { useState } from "react";
import {
  TrendingCard,
  type TrendingArticleProps,
} from "~/components/trending/trending-card";
import { TrendingFilter } from "~/components/trending/trending-filter";

interface TrendingSectionClientProps {
  initialArticles: TrendingArticleProps[];
}

export function TrendingSectionClient({
  initialArticles,
}: TrendingSectionClientProps) {
  const [filter, setFilter] = useState<"all" | "blogs" | "guides" | "latest">(
    "all",
  );
  const [articles] = useState<TrendingArticleProps[]>(initialArticles);

  const filteredArticles = articles
    .filter((article) => {
      if (filter === "all") return true;
      if (filter === "blogs") return article.type === "blog";
      if (filter === "guides") return article.type === "guide";
      if (filter === "latest") {
        return articles
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, 5)
          .includes(article);
      }
      return true;
    })
    .slice(0, 5);

  return (
    <section className="w-full bg-[#FAF7F4]">
      <div className="h-px w-full bg-gray-600" />
      <div className="flex items-center justify-between px-16 py-2">
        <h2 className="font-['Raleway'] text-2xl font-normal tracking-[0.3em] text-gray-700">
          TRENDING
        </h2>
        <TrendingFilter onFilterChange={setFilter} />
      </div>
      {/* <div className="h-px w-full bg-gray-600" /> */}

      <div className="mx-auto max-w-[1400px] p-8">
        <div className="grid auto-rows-[280px] grid-cols-3 gap-4">
          {/* Large featured article - spans 2x2 */}
          {filteredArticles[0] && (
            <div className="col-span-2 row-span-2">
              <TrendingCard article={filteredArticles[0]} size="large" />
            </div>
          )}

          {/* Small article - top right */}
          {filteredArticles[1] && (
            <div className="col-span-1 row-span-1">
              <TrendingCard article={filteredArticles[1]} size="small" />
            </div>
          )}

          {/* Small article - middle right */}
          {filteredArticles[2] && (
            <div className="col-span-1 row-span-1">
              <TrendingCard article={filteredArticles[2]} size="small" />
            </div>
          )}

          {/* Small article - bottom left */}
          {filteredArticles[3] && (
            <div className="col-span-1 row-span-1">
              <TrendingCard article={filteredArticles[3]} size="small" />
            </div>
          )}

          {/* Medium article - bottom right, spans 2 columns */}
          {filteredArticles[4] && (
            <div className="col-span-2 row-span-1">
              <TrendingCard article={filteredArticles[4]} size="medium" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
