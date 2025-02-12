"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import type { ConditionIdArticlesProps } from "~/utils/supabase/articles/getArticlesByCondition";
import getArticlesByCondition from "~/utils/supabase/articles/getArticlesByCondition";

import { Button } from "../ui/button";
import { ArticlePreview } from "./article-preview";
import { ArticlesList } from "./articles-list";
import { Sidebar } from "./sidebar";

interface GroupedCategory {
  categoryId: number;
  categoryName: string;
  conditions: {
    id: number;
    name: string;
    articleCount?: number;
  }[];
}

interface ResearchContentProps {
  categories: GroupedCategory[];
  initialSelectedCategory?: number;
}

export function ResearchContent({
  categories: initialCategories,
  initialSelectedCategory,
}: ResearchContentProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedConditionId, setSelectedConditionId] = useState<number | null>(
    initialSelectedCategory ?? null,
  );
  const [openCategory, setOpenCategory] = useState<string | undefined>(
    categories[0]?.categoryId.toString(),
  );
  const [hoveredArticle, setHoveredArticle] =
    useState<ConditionIdArticlesProps | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [articles, setArticles] = useState<ConditionIdArticlesProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(
    async (conditionId: number) => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Fetching articles for condition:", conditionId);
        const fetchedArticles = await getArticlesByCondition(conditionId);
        console.log("Fetched articles:", fetchedArticles);

        if (fetchedArticles && fetchedArticles.length > 0) {
          setArticles(fetchedArticles);
          setHoveredArticle(fetchedArticles[0] ?? null);
        } else {
          console.log("No articles found for condition:", conditionId);
          setCategories((prevCategories) =>
            prevCategories
              .map((category) => ({
                ...category,
                conditions: category.conditions.filter(
                  (condition) => condition.id !== conditionId,
                ),
              }))
              .filter((category) => category.conditions.length > 0),
          );

          const firstAvailableCondition = categories
            .flatMap((cat) => cat.conditions)
            .find((cond) => cond.id !== conditionId);

          if (firstAvailableCondition) {
            setSelectedConditionId(firstAvailableCondition.id);
          }

          setArticles([]);
          setHoveredArticle(null);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles. Please try again.");
        setArticles([]);
        setHoveredArticle(null);
      } finally {
        setIsLoading(false);
      }
    },
    [categories],
  );

  useEffect(() => {
    console.log("Categories:", categories);
    console.log("Initial selected category:", initialSelectedCategory);

    if (selectedConditionId === null && categories.length > 0) {
      const firstCondition = categories[0]?.conditions[0];
      if (firstCondition) {
        console.log("Setting initial condition ID:", firstCondition.id);
        setSelectedConditionId(firstCondition.id);
      }
    } else if (selectedConditionId !== null) {
      console.log(
        "Fetching articles for selected condition:",
        selectedConditionId,
      );
      void fetchArticles(selectedConditionId);
    }
  }, [selectedConditionId, categories, fetchArticles, initialSelectedCategory]);

  const handleArticleHover = (article: ConditionIdArticlesProps | null) => {
    setHoveredArticle(article);
  };

  return (
    <div className="relative flex h-[calc(100vh-127px)] overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <Sidebar
        categories={categories}
        isSidebarOpen={isSidebarOpen}
        selectedConditionId={selectedConditionId}
        openCategory={openCategory}
        onCategoryChange={setOpenCategory}
        onConditionSelect={setSelectedConditionId}
        onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 overflow-hidden">
        <Button
          variant="outline"
          size="icon"
          className={`absolute left-0 top-4 z-50 h-8 w-8 rounded-full border-2 border-gray-900 bg-white shadow-md transition-all duration-300 ${
            isSidebarOpen ? "left-[300px]" : "left-0"
          }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>

        <div className="grid h-full grid-cols-2 gap-4 overflow-hidden rounded-lg p-4">
          {/* Articles List */}
          <div className="h-full overflow-y-auto rounded-lg shadow-sm">
            {error ? (
              <div className="p-4 text-red-500">{error}</div>
            ) : (
              <ArticlesList
                articles={articles}
                isLoading={isLoading}
                onArticleHover={handleArticleHover}
              />
            )}
          </div>

          {/* Article Preview */}
          <div className="h-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <ArticlePreview article={hoveredArticle} />
          </div>
        </div>
      </div>
    </div>
  );
}
