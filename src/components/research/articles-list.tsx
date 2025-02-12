import { sendGAEvent } from "@next/third-parties/google";
import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { ConditionIdArticlesProps } from "~/utils/supabase/articles/getArticlesByCondition";

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

  // Custom imageUrl function
  const getImageUrl = (articleId: number) => {
    return `https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/${articleId}.png`;
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 p-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/research/${article.id}`}
            onMouseEnter={() => onArticleHover(article)}
            onClick={() =>
              sendGAEvent("event", "articleClicked", {
                value: `Research Article ${article.id}`,
              })
            }
          >
            <div className="group relative h-[180px] w-full overflow-hidden rounded-xl border border-gray-200 transition-shadow hover:shadow-md">
              {/* Background Image */}
              <Image
                src={getImageUrl(article.id) || "/placeholder.svg"}
                alt={article.heading}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                {/* Top Section */}
                <div className="space-y-1">
                  {/* Author and Date */}
                  <div className="flex items-center gap-2 font-mono text-xs text-gray-200">
                    <span>{article.authors}</span>
                    <span>•</span>
                    <span>
                      {new Date(article.published_date).toLocaleDateString(
                        "en-US",
                        {
                          month: "numeric",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="line-clamp-2 font-serif text-lg font-medium leading-tight text-white">
                    {article.heading}
                  </h3>
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2 text-gray-200">
                    {article.condition_name && (
                      <span>{article.condition_name}</span>
                    )}
                    {article.number_of_treatments && (
                      <>
                        <span>•</span>
                        <span>{article.number_of_treatments} Sessions</span>
                      </>
                    )}
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 transition-colors hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add bookmark functionality here
                    }}
                  >
                    <BookmarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
