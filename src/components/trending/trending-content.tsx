"use client";

import { useState } from "react";

import type { TrendingArticle } from "~/utils/supabase/articles/getTrendingArticles";

import { ArticleGrid } from "./article-grid";
import { ArticleList } from "./article-list";
import { HeaderArticle } from "./header-article";

interface TrendingContentProps {
  headerPost?: TrendingArticle;
  featuredPosts: TrendingArticle[];
  listPosts: TrendingArticle[];
}

const ITEMS_PER_PAGE = 10;

export function TrendingContent({
  headerPost,
  featuredPosts = [],
  listPosts = [],
}: TrendingContentProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(listPosts.length / ITEMS_PER_PAGE);

  // Get current page items
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = listPosts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!headerPost && featuredPosts.length === 0 && listPosts.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center text-gray-500">
        No articles available.
      </div>
    );
  }

  return (
    <main className="w-full">
      {headerPost && <HeaderArticle post={headerPost} />}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 py-4 font-['Raleway'] text-2xl uppercase tracking-[0.2em]">
              Featured Articles
            </h2>
            <ArticleGrid articles={featuredPosts} />
          </div>
        )}
        {listPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">Latest Articles</h2>
            <ArticleList
              articles={currentItems}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </main>
  );
}
