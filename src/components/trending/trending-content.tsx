"use client";

import { useState } from "react";
import { TrendingCard } from "~/components/trending/trending-card";
import type { BlogDbEntry } from "~/types/blog";
import { Button } from "~/components/ui/button";
import { Pagination } from "~/components/ui/pagination";

interface TrendingContentProps {
  featuredPosts: BlogDbEntry[];
  listPosts: BlogDbEntry[];
}

const ITEMS_PER_PAGE = 9;

export function TrendingContent({
  featuredPosts = [],
  listPosts = [],
}: TrendingContentProps) {
  const [filter, setFilter] = useState<"all" | "blogs" | "guides" | "latest">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);

  const filteredListPosts = listPosts.filter((article) => {
    if (filter === "all") return true;
    if (filter === "blogs") return article.category === "Blog";
    if (filter === "guides") return article.category === "Guide";
    if (filter === "latest") {
      return listPosts
        .sort(
          (a, b) =>
            new Date(b.publish_date).getTime() -
            new Date(a.publish_date).getTime(),
        )
        .slice(0, 9)
        .includes(article);
    }
    return true;
  });

  const totalPages = Math.ceil(filteredListPosts.length / ITEMS_PER_PAGE);
  const currentItems = filteredListPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="w-full bg-[#FAF7F4]">
      <div className="relative">
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <div className="space-y-2">
              <h2 className="font-['Raleway'] text-4xl font-normal tracking-[0.3em] text-gray-700">
                TRENDING
              </h2>
              <h4 className="text-sm text-gray-500">
                The latest and most popular articles on hyperbaric therapy
              </h4>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={filter === "blogs" ? "default" : "outline"}
                onClick={() => setFilter("blogs")}
                className="rounded-full border-emerald-600 text-sm font-medium hover:bg-emerald-600 hover:text-white"
              >
                Blogs
              </Button>
              <Button
                variant={filter === "guides" ? "default" : "outline"}
                onClick={() => setFilter("guides")}
                className="rounded-full border-emerald-600 text-sm font-medium hover:bg-emerald-600 hover:text-white"
              >
                Guides
              </Button>
              <Button
                variant={filter === "latest" ? "default" : "outline"}
                onClick={() => setFilter("latest")}
                className="rounded-full bg-emerald-600 text-sm font-medium text-white hover:bg-[#2B5741]"
              >
                Latest
              </Button>
            </div>
          </div>
        </div>
        <div
          className="mt-4 h-16 w-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-14%20at%209.32.55%E2%80%AFam-4aZ6R6pbsPorITL7yCautSxd26WQop.png")',
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <div className="grid gap-6 md:grid-cols-4 md:grid-rows-2">
              {featuredPosts[0] && (
                <div className="md:col-span-2 md:row-span-2">
                  <TrendingCard article={featuredPosts[0]} size="large" />
                </div>
              )}
              <div className="md:col-span-2 md:grid md:grid-cols-2 md:gap-6">
                {featuredPosts.slice(1, 4).map(
                  (post, index) =>
                    post && (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <div key={index}>
                        <TrendingCard article={post} size="small" />
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>
        )}

        {currentItems.length > 0 && (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentItems.map(
                (post, index) =>
                  post && (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <div key={index}>
                      <TrendingCard article={post} size="medium" />
                    </div>
                  ),
              )}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
