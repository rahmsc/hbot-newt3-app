"use client";

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

export default function ResearchDashboard() {
  const [selectedConditions, setSelectedConditions] = useState<number[]>([]);
  const [articles, setArticles] = useState<RandomArticleItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryWithConditions[]>([]);
  const [conditionNames, setConditionNames] = useState<Record<number, string>>({});
  const [isLatestView, setIsLatestView] = useState(true);

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
      if (!conditionIds?.length) {
        const latestArticles = await getLatestArticles(6);
        setArticles(latestArticles);
        setIsLatestView(true);
      } else {
        const filteredArticles = await getLatestArticles(
          6,
          conditionIds.map(String).join(",")
        );
        setArticles(filteredArticles);
        setIsLatestView(false);
      }
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
      <div className="py-4 pl-16">
        <h2 className="font-['Raleway'] text-2xl font-normal tracking-[0.3em] text-gray-700">
          {isLatestView ? "LATEST RESEARCH" : "FILTERED RESEARCH"}
        </h2>
        <h4 className="text-sm text-gray-500">
          {isLatestView 
            ? "The latest research and studies on hyperbaric therapy"
            : "Filtered research based on selected conditions"
          }
        </h4>
      </div>

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
        ) : articles.length === 0 ? (
          <div className="flex h-96 flex-col items-center justify-center space-y-2">
            <p className="text-lg font-medium text-gray-900">
              No articles found
            </p>
            <p className="text-sm text-gray-500">
              Try selecting a different condition or check back later for new research
            </p>
          </div>
        ) : (
          <div className="mb-12">
            <div className="grid grid-cols-10">
              {articles.length > 0 && articles[0] && (
                <div className="col-span-5">
                  <div className="h-[600px] rounded-[2rem] border border-gray-100 bg-white shadow-sm transition duration-200 hover:shadow-md">
                    <FeaturedArticleCard
                      id={articles[0].id ?? 0}
                      heading={articles[0].heading ?? ""}
                      summary={articles[0].summary ?? ""}
                      pressure_used={articles[0].pressure_used ?? ""}
                      number_of_treatments={articles[0].number_of_treatments ?? 0}
                      published_date={new Date(articles[0].published_date ?? "")}
                      outcome_rating={articles[0].outcome_rating ?? ""}
                      conditionName={
                        conditionNames[articles[0]?.conditionId ?? 0] ?? "Unknown"
                      }
                      authors={articles[0].authors}
                      peer_reviewed={articles[0].peer_reviewed}
                      public_data={articles[0].public_data}
                      funded={articles[0].funded}
                    />
                  </div>
                </div>
              )}

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
          </div>
        )}
      </div>
    </section>
  );
}
