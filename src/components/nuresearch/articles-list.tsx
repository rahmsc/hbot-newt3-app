"use client";

import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import getArticlesByCondition, {
  type ConditionIdArticlesProps,
} from "~/utils/supabase/getArticlesByCondition";

interface ArticlesListProps {
  selectedConditionId: number | null;
  onArticleHover: (article: ConditionIdArticlesProps) => void;
}

export function ArticlesList({
  selectedConditionId,
  onArticleHover,
}: ArticlesListProps) {
  const [articles, setArticles] = useState<ConditionIdArticlesProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prevConditionId, setPrevConditionId] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchArticles() {
      // Don't show loading state if we're just reselecting the same condition
      if (selectedConditionId === prevConditionId) return;

      setIsLoading(true);

      try {
        const data = await getArticlesByCondition(selectedConditionId);
        if (isMounted) {
          setArticles(data || []);
          // Set the first article as the default preview when articles load
          if (data && data.length > 0) {
            onArticleHover(data[0]);
          }
          setPrevConditionId(selectedConditionId);
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        if (isMounted) {
          setArticles([]);
        }
      } finally {
        if (isMounted) {
          // Add a small delay before removing loading state to prevent flicker
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }
      }
    }

    if (selectedConditionId) {
      void fetchArticles();
    } else {
      setArticles([]);
      setPrevConditionId(null);
    }

    return () => {
      isMounted = false;
    };
  }, [selectedConditionId, onArticleHover, prevConditionId]);

  const content = (
    <div className="divide-y divide-gray-200">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/new-research/${article.id}`}
          onMouseEnter={() => onArticleHover(article)}
          onClick={() =>
            sendGAEvent("event", "articleClicked", {
              value: `Research Article ${article.id}`,
            })
          }
          className="block py-6 transition-colors hover:bg-gray-50"
        >
          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              {article.heading}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{article.authors}</span>
              <span>•</span>
              <span>{new Date(article.published_date).getFullYear()}</span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );

  if (!selectedConditionId) {
    return (
      <div className="py-10 text-center text-gray-500">
        Select a condition to view articles.
      </div>
    );
  }

  return (
    <div className="relative min-h-[200px]">
      {/* Loading Overlay */}
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center bg-white/80 transition-opacity duration-300 ${
          isLoading ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
          <span className="text-sm text-gray-600">Loading articles...</span>
        </div>
      </div>

      {/* Content */}
      <div
        className={`transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}
      >
        {articles.length > 0 ? (
          content
        ) : (
          <div className="py-10 text-center text-gray-500">
            No articles found for this condition.
          </div>
        )}
      </div>
    </div>
  );
}
