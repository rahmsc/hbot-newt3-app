"use client"

import { useState, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

import { type TrendingArticleProps, TrendingCard } from "~/components/trending/trending-card"
import { TrendingFilter } from "~/components/trending/trending-filter"
import { Button } from "~/components/ui/button"
import { CarouselIndicator } from "~/components/utils/carousel-indicator"

interface TrendingSectionClientProps {
  initialArticles: TrendingArticleProps[]
}

export function TrendingSectionClient({ initialArticles }: TrendingSectionClientProps) {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "blogs" | "guides" | "latest">("all")
  const [articles, setArticles] = useState<TrendingArticleProps[]>([])
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setIsClient(true)
    setArticles(initialArticles)
    setIsLoading(false)
  }, [initialArticles])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('select', () => {
      setCurrentSlide(emblaApi.selectedScrollSnap())
    })

    return () => {
      emblaApi.off('select')
    }
  }, [emblaApi])

  if (!isClient) {
    return (
      <section className="w-full bg-[#FAF7F4] pb-12">
        <div className="p-4 text-center">Loading trending content...</div>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className="w-full bg-[#FAF7F4] pb-12">
        <div className="p-4 text-center">Loading trending content...</div>
      </section>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <section className="w-full bg-[#FAF7F4] pb-12">
        <div className="p-4 text-center">No articles available</div>
      </section>
    )
  }

  const filteredArticles = articles
    .filter((article) => {
      if (filter === "all") return true
      if (filter === "blogs") return article.type === "blog"
      if (filter === "guides") return article.type === "guide"
      if (filter === "latest") {
        return articles
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)
          .includes(article)
      }
      return true
    })
    .slice(0, 5)

  console.log('Filtered articles:', filteredArticles); // Debug log

  console.log('TrendingSectionClient received articles:', initialArticles); // Debug log

  return (
    <section className="w-full bg-[#FAF7F4] pb-12">
      <div className="h-px w-full bg-gray-600" />
      <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-16">
        <div className="w-full space-y-2 sm:w-auto">
          <h2 className="font-['Raleway'] text-xl sm:text-2xl font-normal tracking-[0.5em] sm:tracking-[0.3em] text-gray-700 text-center sm:text-left">
            TRENDING
          </h2>
          <h4 className="text-sm text-gray-500 text-center sm:text-left">
            The latest and most popular articles on hyperbaric therapy
          </h4>
        </div>
        <div className="w-full sm:w-auto">
          <TrendingFilter onFilterChange={setFilter} />
        </div>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden">
        {filteredArticles.length > 0 ? (
          <div className="relative px-4">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {filteredArticles.map((article) => (
                  <div
                    key={article.link}
                    className="pl-4"
                    style={{
                      flex: "0 0 85%",
                      minWidth: 0,
                    }}
                  >
                    <div className="h-[380px]">
                      <TrendingCard
                        article={article}
                        size="small"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <CarouselIndicator 
              total={filteredArticles.length} 
              current={currentSlide} 
            />

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
        ) : (
          <div className="p-4 text-center">No articles available</div>
        )}
      </div>

      {/* Desktop View */}
      <div className="mx-auto hidden max-w-[1400px] p-8 sm:block">
        <div className="grid auto-rows-[280px] grid-cols-3 gap-4">
          {filteredArticles[0] && (
            <div className="col-span-2 row-span-2">
              <TrendingCard article={filteredArticles[0]} size="large" />
            </div>
          )}
          {filteredArticles[1] && (
            <div className="col-span-1 row-span-1">
              <TrendingCard article={filteredArticles[1]} size="small" />
            </div>
          )}
          {filteredArticles[2] && (
            <div className="col-span-1 row-span-1">
              <TrendingCard article={filteredArticles[2]} size="small" />
            </div>
          )}
          {filteredArticles[3] && (
            <div className="col-span-1 row-span-1">
              <TrendingCard article={filteredArticles[3]} size="small" />
            </div>
          )}
          {filteredArticles[4] && (
            <div className="col-span-2 row-span-1">
              <TrendingCard article={filteredArticles[4]} size="medium" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

