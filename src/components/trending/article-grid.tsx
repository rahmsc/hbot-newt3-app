"use client"

import { TrendingCard, type TrendingArticleProps } from "./trending-card"
import { GridPagination } from "./grid-pagination"
import { useState } from "react"

interface ArticleGridProps {
  articles: TrendingArticleProps[]
  isMobile?: boolean
}

export function ArticleGrid({ articles, isMobile }: ArticleGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  
  const ITEMS_PER_PAGE = 9
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <section className="w-full">
      <div className="space-y-6">
        <div className="px-4">
          <hr className="mb-4 sm:mb-8 border-t border-gray-700" />
          <h2 className="font-['Raleway'] text-xl sm:text-2xl font-normal tracking-[0.2em] sm:tracking-[0.3em] text-gray-700 pb-4 sm:pb-8 text-center sm:text-left">
            MORE ARTICLES
          </h2>
        </div>

        {/* Mobile Stacked View */}
        <div className="flex flex-col gap-4 px-4 sm:hidden">
          {currentArticles.map((article, index) => (
            <div
              key={article?.link ?? index}
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
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentArticles.map((article, index) => (
              <div key={article?.link ?? index} className="h-[280px]">
                <TrendingCard article={article} size="small" />
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
  )
}

