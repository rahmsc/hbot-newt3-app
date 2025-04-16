"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";
import { FilterNav } from "~/components/landing/sections/research/filter-nav";
import { ArticleCard } from "~/components/research/article-card";
import FeaturedArticleCard from "~/components/research/feature-article-card";
import {
  type CategoryWithConditions,
  getCategoryWithConditions,
} from "~/utils/supabase/articles/getCategoryWithConditions";
import { getConditionData } from "~/utils/supabase/articles/getConditionData";
import getLatestArticles, {
  type RandomArticleItemProps,
} from "~/utils/supabase/articles/getLatestArticles";
// import { cn } from "~/lib/utils"
import { CarouselIndicator } from "~/components/utils/carousel-indicator";
// import LoadingSpinner from "~/components/utils/spinner"

export default function ResearchDashboard() {
  // Define options before using it
  const options: EmblaOptionsType = {
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [isLatestView, setIsLatestView] = useState(true);
  const [categories, setCategories] = useState<CategoryWithConditions[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<number[]>([]);
  const [articles, setArticles] = useState<RandomArticleItemProps[]>([]);
  const [conditionNames, setConditionNames] = useState<Record<number, string>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleConditionsSelect = useCallback((conditions: number[]) => {
    setSelectedConditions(conditions);
    setIsLatestView(conditions.length === 0);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategoryWithConditions();
        if (!categoriesData || categoriesData.length === 0) {
          setError("No categories found");
          return;
        }
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      }
    };

    void fetchCategories();
  }, []);

  useEffect(() => {
    const fetchConditionNames = async () => {
      try {
        const names: Record<number, string> = {};
        for (const article of articles) {
          if (article.conditionId && !names[article.conditionId]) {
            const conditionName = await getConditionData(article.conditionId);
            names[article.conditionId] = conditionName;
          }
        }
        setConditionNames(names);
      } catch (error) {
        console.error("Error fetching condition names:", error);
      }
    };

    void fetchConditionNames();
  }, [articles]);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let fetchedArticles: RandomArticleItemProps[];
        if (selectedConditions.length > 0) {
          fetchedArticles = await getLatestArticles(
            5,
            selectedConditions[0]?.toString() ?? "",
          );
        } else {
          fetchedArticles = await getLatestArticles(5);
        }
        setArticles(fetchedArticles);
        setCurrentSlide(0);
        if (emblaApi) {
          emblaApi.scrollTo(0);
        }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (e: any) {
        setError(e.message || "An error occurred while fetching articles.");
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchArticles();
  }, [selectedConditions, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="w-full">
      <div className="px-2 pb-1 pt-4 sm:px-16">
        <h2 className="text-center font-['Raleway'] text-xl font-normal tracking-[0.5em] text-gray-700 sm:text-left sm:text-2xl md:tracking-[0.3em]">
          {isLatestView ? "LATEST RESEARCH" : "FILTERED RESEARCH"}
        </h2>
        <h4 className="text-center text-sm text-gray-500 sm:text-left">
          {isLatestView
            ? "The latest research and studies on hyperbaric therapy"
            : "Filtered research based on selected conditions"}
        </h4>
      </div>

      <FilterNav
        categoriesWithConditions={categories}
        onConditionsSelect={handleConditionsSelect}
        selectedConditions={selectedConditions}
        isLatestView={isLatestView}
      />

      <div className="mx-auto max-w-[1400px] px-4 py-2 sm:px-4">
        {error ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-lg font-medium text-red-600">{error}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="flex h-96 flex-col items-center justify-center space-y-2">
            <p className="text-lg font-medium text-gray-900">
              No articles found
            </p>
            <p className="text-sm text-gray-500">
              Try selecting a different condition or check back later for new
              research
            </p>
          </div>
        ) : (
          <div className="mb-12">
            {/* Desktop Layout */}
            <div className="hidden grid-cols-10 md:grid">
              {articles.length > 0 && articles[0] && (
                <div className="col-span-5">
                  <div className="h-[600px] rounded-[2rem] border border-gray-100 bg-white shadow-sm transition duration-200 hover:shadow-md">
                    <FeaturedArticleCard
                      id={articles[0].id ?? 0}
                      heading={articles[0].heading ?? ""}
                      summary={articles[0].summary ?? ""}
                      pressure_used={articles[0].pressure_used ?? ""}
                      number_of_treatments={
                        articles[0].number_of_treatments ?? 0
                      }
                      published_date={
                        new Date(articles[0].published_date ?? "")
                      }
                      outcome_rating={articles[0].outcome_rating ?? ""}
                      conditionName={
                        conditionNames[articles[0]?.conditionId ?? 0] ??
                        "Unknown"
                      }
                      authors={articles[0].authors}
                      peer_reviewed={articles[0].peer_reviewed}
                      public_data={articles[0].public_data}
                      funded={articles[0].funded}
                    />
                  </div>
                </div>
              )}

              <div className="col-span-5 flex h-[600px] flex-col">
                <div className="grid flex-1 grid-cols-2 grid-rows-2 py-2">
                  {articles.slice(1, 5).map((article) => (
                    <div
                      key={article.id}
                      className="rounded-[2rem] border border-gray-100 bg-white shadow-sm transition duration-200 hover:shadow-md"
                    >
                      <ArticleCard
                        id={article.id ?? 0}
                        heading={article.heading ?? ""}
                        conditionId={article.conditionId ?? 0}
                        conditionName={
                          conditionNames[article.conditionId ?? 0] ?? "Unknown"
                        }
                        summary={article.summary ?? ""}
                        pressure_used={article.pressure_used ?? ""}
                        number_of_treatments={article.number_of_treatments ?? 0}
                        outcome_rating={article.outcome_rating ?? ""}
                        published_date={new Date(article.published_date ?? "")}
                        authors={article.authors ?? ""}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Layout with Embla Carousel */}
            <div className="md:hidden">
              <div className="relative pt-2">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {articles.map((article) => (
                      <div
                        key={article.id}
                        className="min-w-[90vw] flex-none px-1 sm:min-w-[50%] lg:min-w-[33.333%]"
                      >
                        <div className="w-full overflow-hidden rounded-[2rem] bg-white shadow-sm transition duration-200 hover:shadow-md">
                          <FeaturedArticleCard
                            id={article.id ?? 0}
                            heading={article.heading ?? ""}
                            summary={article.summary ?? ""}
                            pressure_used={article.pressure_used ?? ""}
                            number_of_treatments={
                              article.number_of_treatments ?? 0
                            }
                            published_date={
                              new Date(article.published_date ?? "")
                            }
                            outcome_rating={article.outcome_rating ?? ""}
                            conditionName={
                              conditionNames[article.conditionId ?? 0] ??
                              "Unknown"
                            }
                            authors={article.authors}
                            peer_reviewed={article.peer_reviewed}
                            public_data={article.public_data}
                            funded={article.funded}
                            isMobile={true}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Carousel Indicator */}
                <div className="md:hidden">
                  <CarouselIndicator
                    total={articles.length}
                    current={currentSlide}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
