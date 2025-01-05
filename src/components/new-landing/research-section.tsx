"use client";

import { useState, useEffect } from "react";
import { ArticleCard } from "./components/article-card";
import { FeaturedArticleCard } from "./components/feature-article-card";
import { FilterDialog } from "./components/filter-dialog";
import getRandomArticles, {
  type RandomArticleItemProps,
} from "~/utils/supabase/getRandomArticles";
import { Button } from "~/components/ui/button";
import { XIcon } from "lucide-react";
import {
  type CategoryWithConditions,
  getCategoryWithConditions,
} from "~/utils/supabase/getCategoryWithConditions";

export default function ResearchDashboard() {
  const [selectedConditions, setSelectedConditions] = useState<number[]>([]);
  const [articles, setArticles] = useState<RandomArticleItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryWithConditions[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategoryWithConditions();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    void fetchCategories();
  }, []);

  const fetchArticles = async (conditionIds?: number[]) => {
    setIsLoading(true);
    try {
      const fetchedArticles = await getRandomArticles(
        4,
        conditionIds?.length ? conditionIds.map(String).join(",") : undefined,
      );
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConditionsSelect = (conditionIds: number[]) => {
    setSelectedConditions(conditionIds);
    void fetchArticles(conditionIds);
  };

  const handleClearFilter = () => {
    setSelectedConditions([]);
    void fetchArticles();
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    void fetchArticles();
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="space-y-4 md:max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              The Best In Hyperbaric Research
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              We use a weighted analysis system with carefully selected
              categories to evaluate peer reviewed research
            </p>
          </div>
          <div className="flex items-center gap-3">
            {selectedConditions.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearFilter}
                className="h-10 w-10 rounded-full border border-gray-200 hover:bg-gray-100"
              >
                <XIcon className="h-4 w-4 text-gray-600" />
              </Button>
            )}
            <FilterDialog
              categoriesWithConditions={categories}
              onConditionsSelect={handleConditionsSelect}
              selectedConditions={selectedConditions}
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex h-96 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
              <p className="text-sm text-gray-500">Loading articles...</p>
            </div>
          </div>
        ) : (
          // Articles Grid
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {articles.length > 0 ? (
              <>
                <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md">
                  <FeaturedArticleCard
                    id={articles[0]?.id ?? 0}
                    heading={articles[0]?.heading ?? ""}
                    conditionId={articles[0]?.conditionId ?? 0}
                    summary={articles[0]?.summary ?? ""}
                    pressure_used={articles[0]?.pressure_used ?? ""}
                    number_of_treatments={
                      articles[0]?.number_of_treatments ?? 0
                    }
                    outcome_rating={articles[0]?.outcome_rating ?? ""}
                  />
                </div>
                <div className="flex flex-col justify-between space-y-6">
                  {articles.slice(1, 4).map((article) => (
                    <div
                      key={article.id}
                      className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition duration-200 hover:shadow-md"
                    >
                      <ArticleCard
                        id={article.id ?? 0}
                        heading={article.heading ?? ""}
                        conditionId={article.conditionId ?? 0}
                        summary={article.summary ?? ""}
                        pressure_used={article.pressure_used ?? ""}
                        number_of_treatments={article.number_of_treatments ?? 0}
                        outcome_rating={article.outcome_rating ?? ""}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              // Empty State
              <div className="col-span-2 flex h-96 items-center justify-center rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
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
