"use client";

import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "~/lib/utils";

import type { ConditionIdArticlesProps } from "~/utils/supabase/articles/getArticlesByCondition";
import getArticlesByCondition from "~/utils/supabase/articles/getArticlesByCondition";

import { Button } from "../ui/button";
import { ArticlePreview } from "./article-preview";
import { ArticlesList } from "./articles-list";
import { Sidebar } from "./sidebar";
import { Badge } from "../ui/badge";

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
  categories,
  initialSelectedCategory,
}: ResearchContentProps) {
  const [updatedCategories, setCategories] = useState(categories);
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

  // Find the selected condition name
  const selectedCondition = categories
    .flatMap(category => category.conditions)
    .find(condition => condition.id === selectedConditionId);

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
        {/* Collapsed state header */}
        <div className={cn(
          "absolute left-0 top-0 z-50 flex h-[72px] items-center gap-3 px-4 transition-all duration-300",
          isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>

          {selectedCondition && (
            <Badge 
              variant="outline" 
              className="gap-1 border-emerald-700 text-emerald-700"
            >
              {selectedCondition.name}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedConditionId(0);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>

        <div className="grid h-full grid-cols-2 gap-4 p-4">
          {/* Articles Column */}
          <div className="flex h-full flex-col overflow-hidden">
            {/* Conditional Spacer */}
            {!isSidebarOpen && <div className="h-[28px] shrink-0" />}
            
            {/* Articles List Container */}
            <div className={cn(
              "flex-1 overflow-hidden rounded-lg shadow-sm",
              isSidebarOpen ? "h-full" : "h-[calc(100%-72px)]"
            )}>
              <div className="h-full overflow-auto">
                <ArticlesList
                  articles={articles}
                  isLoading={isLoading}
                  onArticleHover={handleArticleHover}
                />
              </div>
            </div>
          </div>

          {/* Article Preview - Full Height */}
          <div className="h-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <ArticlePreview article={hoveredArticle} />
          </div>
        </div>
      </div>
    </div>
  );
}
