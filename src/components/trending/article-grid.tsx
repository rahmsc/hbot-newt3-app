"use client"

import { TrendingCard, type TrendingArticleProps } from "./trending-card"
import { GridPagination } from "./grid-pagination"
import { useState, useEffect } from "react"

interface ArticleGridProps {
  articles: TrendingArticleProps[]
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  // Determine items per page based on screen size
  const ITEMS_PER_PAGE = isMobile ? 6 : 9

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Only create placeholder slots for desktop view
  const displayArticles = isMobile
    ? currentArticles
    : Array(ITEMS_PER_PAGE)
        .fill(null)
        .map((_, index) => currentArticles[index] ?? null)

  return (
    <section className="container mx-auto max-w-7xl px-4 py-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <hr className="mb-4 sm:mb-8 border-t border-gray-700" />
        <h2 className="font-['Raleway'] text-xl sm:text-2xl font-normal tracking-[0.2em] sm:tracking-[0.3em] text-gray-700 pb-4 sm:pb-8">
          MORE ARTICLES
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayArticles.map((article, index) => (
            <div key={article?.link ?? index} className="h-[250px] sm:h-[280px]">
              {article ? (
                <TrendingCard article={article} size="small" />
              ) : (
                !isMobile && <div className="h-full w-full rounded-[2rem] bg-gray-100" />
              )}
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-4 sm:mt-8 flex justify-center">
            <GridPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </section>
  )
}

