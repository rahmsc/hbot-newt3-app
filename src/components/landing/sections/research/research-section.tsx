"use client";

import { useCallback, useEffect, useState } from "react";

import { FilterNav } from "~/components/landing/sections/research/filter-nav";
import { ArticleCard } from "~/components/research/article-card";
import FeaturedArticleCard from "~/components/research/feature-article-card";
import {
  type CategoryWithConditions,
  getCategoryWithConditions,
} from "~/utils/supabase/getCategoryWithConditions";
import { getConditionData } from "~/utils/supabase/getConditionData";
import getLatestArticles, {
  type RandomArticleItemProps,
} from "~/utils/supabase/getLatestArticles";

export default function ResearchDashboard() {
  const [selectedConditions, setSelectedConditions] = useState<number[]>([]);
  const [articles, setArticles] = useState<RandomArticleItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryWithConditions[]>([]);
  const [conditionNames, setConditionNames] = useState<Record<number, string>>(
    {},
  );

  const fetchCategories = useCallback(async () => {
    try {
      const categoriesData = await getCategoryWithConditions();
      if (categoriesData) {
        setCategories(categoriesData);
        // console.log("Categories fetched:", categoriesData);
      } else {
        setError("Failed to fetch categories. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories. Please try again later.");
    }
  }, []);

  const fetchArticles = useCallback(async (conditionIds?: number[]) => {
    setIsLoading(true);
    setError(null);
    try {
      // console.log("Fetching articles with condition IDs:", conditionIds);
      const fetchedArticles = await getLatestArticles(
        6,
        conditionIds?.length ? conditionIds.map(String).join(",") : undefined,
      );
      // console.log("Fetched articles:", fetchedArticles);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
      setError("Failed to fetch articles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleConditionsSelect = useCallback(
    (conditionIds: number[]) => {
      // console.log("Selected condition IDs:", conditionIds);
      setSelectedConditions(conditionIds);
      void fetchArticles(conditionIds);
    },
    [fetchArticles],
  );

  const fetchConditionName = useCallback(async (conditionId: number) => {
    try {
      const name = await getConditionData(conditionId);
      setConditionNames((prev) => ({ ...prev, [conditionId]: name }));
    } catch (error) {
      console.error("Error fetching condition name:", error);
    }
  }, []);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    void fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    if (articles.length > 0) {
      for (const article of articles) {
        if (article.conditionId && !conditionNames[article.conditionId]) {
          void fetchConditionName(article.conditionId);
        }
      }
    }
  }, [articles, conditionNames, fetchConditionName]);

  return (
    <section className="w-full">
      {/* <div className="h-px w-full bg-gray-600" />     */}
      <div className="py-4 pl-16">
        <h2 className="font-['Raleway'] text-2xl font-normal tracking-[0.3em] text-gray-700">
          LATEST RESEARCH
        </h2>
      </div>
      {/* <div className="h-[2px] w-full bg-gray-600" /> / */}
      <FilterNav
        categoriesWithConditions={categories}
        onConditionsSelect={handleConditionsSelect}
        selectedConditions={selectedConditions}
      />

      <div className="mx-auto max-w-[1400px] px-8 py-2">
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-lg font-medium text-gray-900">
              Loading articles...
            </p>
          </div>
        ) : error ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-lg font-medium text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-10">
            {articles.length > 0 ? (
              <>
                <div className="col-span-5">
                  <div className="h-[600px] rounded-[2rem] border border-gray-100 bg-white shadow-sm transition duration-200 hover:shadow-md">
                    <FeaturedArticleCard
                      {...articles[0]}
                      conditionName={
                        conditionNames[articles[0]?.conditionId ?? 0] ??
                        "Unknown"
                      }
                    />
                  </div>
                </div>

                <div className="col-span-5 flex h-[600px] flex-col gap-2">
                  <div className="grid flex-1 grid-cols-2 grid-rows-2">
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
                            conditionNames[article.conditionId ?? 0] ??
                            "Unknown"
                          }
                          summary={article.summary ?? ""}
                          pressure_used={article.pressure_used ?? ""}
                          number_of_treatments={
                            article.number_of_treatments ?? 0
                          }
                          outcome_rating={article.outcome_rating ?? ""}
                          published_date={
                            new Date(article.published_date ?? "")
                          }
                          authors={article.authors ?? ""}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="col-span-10 flex h-96 items-center justify-center rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-900">
                    No articles found
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Try adjusting your filters or check back later for new
                    research.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
