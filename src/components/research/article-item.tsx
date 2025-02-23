"use client"

import type React from "react"

import { sendGAEvent } from "@next/third-parties/google"
import { BookmarkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { useAuth } from "~/contexts/auth-context"
import { useArticleBookmark } from "~/hooks/use-article-bookmark"
import type { ConditionIdArticlesProps } from "~/utils/supabase/articles/getArticlesByCondition"

interface ArticleItemProps {
  article: ConditionIdArticlesProps
  onArticleHover: (article: ConditionIdArticlesProps | null) => void
}

export function ArticleItem({ article, onArticleHover }: ArticleItemProps) {
  const { user } = useAuth()
  const { isBookmarked, isLoading: isBookmarkLoading, toggleBookmark } = useArticleBookmark(article.id, user?.id)

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault()
    void toggleBookmark()
  }

  const getImageUrl = (articleId: number) => {
    return `https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/${articleId}.png`
  }

  const formatAuthors = (authors: string) => {
    if (!authors) return "Unknown Author"

    const authorsList = authors
      .split(/[,]/)
      .map((author) => author.trim())
      .filter(Boolean)

    if (authorsList.length <= 4) {
      return authorsList.join(", ")
    }

    return `${authorsList.slice(0, 4).join(", ")} et al.`
  }

  return (
    <Link
      href={`/research/${article.id}`}
      onMouseEnter={() => onArticleHover(article)}
      onClick={() =>
        sendGAEvent("event", "articleClicked", {
          value: `Research Article ${article.id}`,
        })
      }
      className="w-full px-2 sm:px-4"
    >
      <div className="group relative h-[220px] sm:h-[180px] w-full overflow-hidden rounded-xl border border-gray-200 transition-shadow hover:shadow-md">
        {/* Background Image */}
        <Image
          src={getImageUrl(article.id) || "/placeholder.png"}
          alt={article.heading}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 768px) 95vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4">
          {/* Top Section */}
          <div className="space-y-1">
            {/* Author and Date */}
            <div className="flex items-center gap-2 font-mono text-xs text-gray-200">
              <span>{formatAuthors(article.authors)}</span>
              <span>•</span>
              <span>
                {new Date(article.published_date).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h3 className="line-clamp-2 font-serif text-lg font-medium leading-tight text-white">{article.heading}</h3>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-gray-200">
              {article.condition_name && <span>{article.condition_name}</span>}
              {article.number_of_treatments && (
                <>
                  <span>•</span>
                  <span>{article.number_of_treatments} Sessions</span>
                </>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`overflow-hidden rounded-full p-1.5 sm:p-2 text-white backdrop-blur-sm transition-all ${
                isBookmarked ? "bg-emerald-700/20 ring-2 ring-emerald-700 hover:bg-emerald-700/30" : "hover:bg-white/20"
              }`}
              onClick={handleBookmarkClick}
              disabled={isBookmarkLoading}
            >
              <BookmarkIcon
                className={`h-4 w-4 transition-colors ${isBookmarked ? "fill-white text-emerald-700" : "text-white"}`}
              />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

