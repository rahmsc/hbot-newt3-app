"use client"

import type { TrendingArticleProps } from "./trending-card"
import { TrendingCard } from "./trending-card"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "~/components/ui/button"

interface FeaturedArticlesProps {
  articles: TrendingArticleProps[]
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })

  if (!articles.length) return null

  // Ensure mainArticle exists and filter out undefined articles
  const mainArticle = articles[0]
  if (!mainArticle) return null

  const sideArticles = articles.slice(1)
  const validSideArticles = sideArticles.filter(
    (article): article is TrendingArticleProps => article !== undefined && article !== null,
  )

  return (
    <section className="container mx-auto max-w-7xl px-2 py-4">
      <hr className="mb-4 sm:mb-8 border-t border-gray-700" />
      <h2 className="font-['Raleway'] text-xl sm:text-2xl font-normal tracking-[0.2em] sm:tracking-[0.3em] text-gray-700 pb-4 sm:pb-8">
        FEATURED ARTICLES
      </h2>

      {/* Mobile Carousel View */}
      <div className="block md:hidden">
        <div className="relative px-4">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {[mainArticle, ...validSideArticles].map((article, index) => (
                <div
                  key={article.link || index}
                  className="pl-4"
                  style={{
                    flex: "0 0 85%",
                    minWidth: 0,
                  }}
                >
                  <div className="h-[400px] sm:h-[450px]">
                    {" "}
                    {/* Increased height */}
                    <TrendingCard article={article} size="large" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid gap-4 md:grid-cols-3">
        {" "}
        {/* Increased gap */}
        <div className="md:col-span-2">
          <div className="h-[600px]">
            {" "}
            {/* Fixed height instead of aspect ratio */}
            <TrendingCard article={mainArticle} size="large" />
          </div>
        </div>
        <div className="grid grid-rows-3 gap-4">
          {" "}
          {/* Increased gap */}
          {validSideArticles.slice(0, 3).map((article, index) => (
            <div key={article.link || index} className="h-[190px]">
              {" "}
              {/* Fixed height for side articles */}
              <TrendingCard article={article} size="featured-side" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

