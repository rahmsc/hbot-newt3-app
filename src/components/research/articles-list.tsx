"use client";

import type { ConditionIdArticlesProps } from "~/utils/supabase/articles/getArticlesByCondition";
import { ArticleItem } from "./article-item";
import { Button } from "../ui/button";

export interface ArticlesListProps {
  articles: ConditionIdArticlesProps[];
  isLoading: boolean;
  onArticleHover: (article: ConditionIdArticlesProps | null) => void;
  onSearchSuggestionClick?: (term: string) => void;
}

export function ArticlesList({
  articles,
  isLoading,
  onArticleHover,
  onSearchSuggestionClick,
}: ArticlesListProps) {
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading articles...
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex h-full flex-col items-center pt-20 p-8 text-center">
        <div className="max-w-[600px] space-y-6">
          {/* Top badge */}
          <div className="mx-auto w-fit rounded-full bg-black px-6 py-2 text-sm text-white">
            Evidence based research, <em>instantly</em>
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            The world&apos;s best resource on{" "}
            <span className="block italic">Hyperbaric Oxygen Therapy</span>
          </h1>
          
          {/* Description */}
          <p className="mx-auto max-w-[480px] text-gray-600">
            Discover evidence-based HBOT treatments through our comprehensive research framework.
            Browse by condition type to find the scientific papers and protocols you need.
          </p>

          {/* Example tags as buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-sm">Try:</span>
            {["Aging", "Autism", "Alzheimers"].map((tag) => (
              <Button
                key={tag}
                variant="ghost"
                className="rounded-full bg-green-100 px-3 py-1 text-sm text-gray-900 hover:bg-green-200"
                onClick={() => onSearchSuggestionClick?.(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          onArticleHover={onArticleHover}
        />
      ))}
    </div>
  );
}
