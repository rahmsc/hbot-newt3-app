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
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">
            The Best In Hyperbaric Research
          </h1>
          <p className="text-lg text-muted-foreground">
            We use a weighted analysis system with carefully selected categories
            to evaluate peer reviewed research
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedConditions.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearFilter}
              className="h-9 w-9"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          )}
          <FilterDialog
            categoriesWithConditions={categories}
            onConditionsSelect={handleConditionsSelect}
            selectedConditions={selectedConditions}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {articles.length > 0 ? (
            <>
              <div>
                <FeaturedArticleCard
                  id={articles[0]?.id ?? 0}
                  heading={articles[0]?.heading ?? ""}
                  conditionId={articles[0]?.conditionId ?? 0}
                  summary={articles[0]?.summary ?? ""}
                  pressure_used={articles[0]?.pressure_used ?? ""}
                  number_of_treatments={articles[0]?.number_of_treatments ?? 0}
                  outcome_rating={articles[0]?.outcome_rating ?? ""}
                />
              </div>
              <div className="space-y-4">
                {articles.slice(1, 4).map((article) => (
                  <ArticleCard
                    key={article.id}
                    id={article.id ?? 0}
                    heading={article.heading ?? ""}
                    conditionId={article.conditionId ?? 0}
                    summary={article.summary ?? ""}
                    pressure_used={article.pressure_used ?? ""}
                    number_of_treatments={article.number_of_treatments ?? 0}
                    outcome_rating={article.outcome_rating ?? ""}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="col-span-2 flex h-40 items-center justify-center">
              <p className="text-muted-foreground">No articles found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
