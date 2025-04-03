"use client";

import type { ConditionIdArticlesProps } from "~/utils/supabase/articles/getArticlesByCondition";
import { ArticleItem } from "./article-item";
import { Button } from "../ui/button";

export interface ArticlesListProps {
  articles: ConditionIdArticlesProps[];
  isLoading: boolean;
  onArticleHover: (article: ConditionIdArticlesProps | null) => void;
  onSearchSuggestionClick?: (term: string, conditionId?: number) => void;
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
      <div className="flex flex-col items-center p-8 text-center md:pt-20">
        <div className="mb-6 max-w-[700px] space-y-4">
          {/* Top badge */}
          <div className="mx-auto w-fit rounded-full bg-black px-5 py-1.5 text-xs font-medium text-white shadow-sm">
            Evidence based research, <em>instantly</em>
          </div>

          {/* Main heading - more compact */}
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            The world&apos;s best resource on{" "}
            <span className="inline italic text-primary md:block">
              Hyperbaric Oxygen Therapy
            </span>
          </h1>

          {/* Description - more compact */}
          <p className="mx-auto max-w-[550px] text-center text-sm text-muted-foreground md:text-base">
            Discover evidence-based HBOT treatments through our comprehensive
            research framework. Browse by condition type to find the scientific
            papers and protocols you need.
          </p>
        </div>

        {/* Example tags as buttons */}
        <div className="overflow-x-auto pb-4">
          <div className="flex min-w-max items-center gap-2 px-2">
            <span className="text-sm">Try:</span>
            {[
              { name: "Aging", conditionId: 12 },
              { name: "Autism", conditionId: 8 },
              { name: "Alzheimer's Disease", conditionId: 3 },
            ].map((suggestion) => (
              <Button
                key={suggestion.name}
                variant="ghost"
                className="whitespace-nowrap rounded-full bg-green-100 px-3 py-1 text-sm text-gray-900 hover:bg-green-200"
                onClick={() => {
                  onSearchSuggestionClick?.(
                    suggestion.name,
                    suggestion.conditionId,
                  );
                }}
              >
                {suggestion.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-2 sm:space-y-4">
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
