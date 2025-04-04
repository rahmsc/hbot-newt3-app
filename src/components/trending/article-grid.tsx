"use client";

import { TrendingCard } from "./trending-card";
import { GridPagination } from "./grid-pagination";
import { useState } from "react";
import type { BlogDbEntry } from "~/types/blog";

interface ArticleGridProps {
  articles: BlogDbEntry[];
  isMobile?: boolean;
}

export function ArticleGrid({ articles, isMobile }: ArticleGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = articles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="px-4">
          <hr className="mb-4 border-t border-gray-700 sm:mb-8" />
          <h2 className="pb-4 text-center font-['Raleway'] text-xl font-normal tracking-[0.2em] text-gray-700 sm:pb-8 sm:text-left sm:text-2xl sm:tracking-[0.3em]">
            MORE ARTICLES
          </h2>
        </div>

        {/* Mobile Stacked View */}
        <div className="flex flex-col gap-4 px-4 sm:hidden">
          {currentArticles.map((article, index) => (
            <div
              key={article?.url_slug ?? index}
              className="relative h-[250px] overflow-hidden rounded-2xl shadow-lg transition duration-200 hover:shadow-md"
            >
              <TrendingCard article={article} size="small" />
            </div>
          ))}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <GridPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        {/* Desktop Grid View */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentArticles.map((article, index) => (
              <div
                key={
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  index
                }
                className="h-[280px]"
              >
                {article && <TrendingCard article={article} size="small" />}
                {!article && (
                  <div className="h-full w-full rounded-[2rem] bg-gray-100" />
                )}
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <GridPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
