"use client";

import type { ConditionIdArticlesProps } from "~/utils/supabase/articles/getArticlesByCondition";
import { ArticleItem } from "./article-item";

export interface ArticlesListProps {
  articles: ConditionIdArticlesProps[];
  isLoading: boolean;
  onArticleHover: (article: ConditionIdArticlesProps | null) => void;
}

export function ArticlesList({
  articles,
  isLoading,
  onArticleHover,
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
      <div className="flex h-full items-center justify-center">
        No articles found. Please select a condition.
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
