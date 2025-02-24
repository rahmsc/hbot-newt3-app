"use client"

import type { TrendingArticleProps } from "./trending-card"
import { TrendingCard } from "./trending-card"
import useEmblaCarousel from "embla-carousel-react"
import { useState, useEffect } from "react"
import { CarouselIndicator } from "~/components/utils/carousel-indicator"

interface FeaturedArticlesProps {
  articles: TrendingArticleProps[]
  isMobile?: boolean
}

export function FeaturedArticles({ articles, isMobile }: FeaturedArticlesProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    slidesToScroll: 1,
    inViewThreshold: 0.7,
  })

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

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
      <div className="space-y-2">
        <div className="px-4">
          <hr className="mb-4 sm:mb-8 border-t border-gray-700" />
          <h2 className="font-['Raleway'] text-xl sm:text-2xl font-normal tracking-[0.2em] sm:tracking-[0.3em] text-gray-700 pb-4 sm:pb-8 text-center sm:text-left">
            FEATURED ARTICLES
          </h2>
        </div>

        {/* Mobile Carousel View */}
        <div className="block md:hidden">
          <div className="relative">
            <div className="overflow-visible" ref={emblaRef}>
              <div className="flex -ml-4">
                {[mainArticle, ...validSideArticles].map((article, index) => (
                  <div
                    key={article.link || index}
                    className="min-w-[85vw] flex-none pl-4"
                  >
                    <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-lg transition duration-200 hover:shadow-md">
                      <TrendingCard article={article} size="large" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <CarouselIndicator 
                total={articles.length} 
                current={currentSlide} 
              />
            </div>
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid gap-2 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="aspect-[16/9]">
              <TrendingCard article={mainArticle} size="large" />
            </div>
          </div>
          <div className="grid grid-rows-3 gap-1">
            {validSideArticles.slice(0, 3).map((article, index) => (
              <div key={article.link || index} className="h-full">
                <TrendingCard article={article} size="featured-side" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

