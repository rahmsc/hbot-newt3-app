"use client"

import { TrendingCard, type TrendingArticleProps } from "./trending-card"
import { GridPagination } from "./grid-pagination"
import { useState } from "react"

interface ArticleGridProps {
  articles: TrendingArticleProps[]
}

const ITEMS_PER_PAGE = 9

export function ArticleGrid({ articles }: ArticleGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Create array of specified length with empty slots for grid layout
  const displayArticles = Array(ITEMS_PER_PAGE)
    .fill(null)
    .map((_, index) => currentArticles[index] ?? null)

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <hr className="mb-8 border-t border-gray-700" />
        <h2 className="font-['Raleway'] text-2xl font-normal tracking-[0.3em] text-gray-700 pb-8">MORE ARTICLES</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayArticles.map((article, index) => (
            <div key={index} className="h-[280px]">
              {article && <TrendingCard article={article} size="small" />}
              {!article && <div className="h-full w-full rounded-[2rem] bg-gray-100" />}
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <GridPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </section>
  )
}

