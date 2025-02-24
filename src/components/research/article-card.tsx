"use client"

import type React from "react"

import { BookmarkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "~/contexts/auth-context"
import { useArticleBookmark } from "~/hooks/use-article-bookmark"
import { Button } from "~/components/ui/button"
import GlowingButton from "~/components/utils/glowing-button"
import type { RandomArticleItemProps } from "~/utils/supabase/articles/getLatestArticles"
import { cn } from "~/lib/utils"

interface ArticleCardProps extends RandomArticleItemProps {
  isMobile?: boolean
  className?: string
}

export function ArticleCard({
  id,
  heading,
  summary,
  pressure_used,
  number_of_treatments,
  authors = "Unknown Author",
  published_date,
  conditionName,
  isMobile = false,
  className,
}: ArticleCardProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { isBookmarked, isLoading, toggleBookmark } = useArticleBookmark(id, user?.id)

  const imageUrl = "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/"

  const showCondition = conditionName && conditionName.toLowerCase() !== "unknown"
  const showTreatments = number_of_treatments && number_of_treatments > 0

  const processedAuthors = authors
    ? authors
        .split(/[,]/)
        .filter((author) => author.trim())
        .slice(0, 1)
        .map((author) => author.trim())
        .join(", ") + (authors.split(/[,]/).length > 3 ? " et al." : "")
    : "Unknown Author"

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    void toggleBookmark()
  }

  const ImageComponent = () => {
    const commonProps = {
      src: `${imageUrl}${id}.png`,
      alt: heading ?? "Article thumbnail",
      className: "object-cover transition-transform duration-300 group-hover:scale-105",
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    }

    return isMobile ? (
      <Image {...commonProps} alt={heading ?? "Article thumbnail"} width={500} height={300} priority={false} />
    ) : (
      <Image {...commonProps} alt={heading ?? "Article thumbnail"} fill />
    )
  }

  return (
    <Link href={`/research/${id}`}>
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-[2rem]",
          "h-[320px]", // Restored fixed height
          className,
        )}
      >
        {/* Background Image */}
        <ImageComponent />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
          {/* Top Section */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="font-mono text-sm uppercase tracking-wider text-white">
                {published_date
                  ? new Date(published_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })
                  : "N/A"}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "overflow-hidden rounded-full p-2 text-white backdrop-blur-sm transition-all",
                isBookmarked
                  ? "bg-[#2B5741]/20 ring-2 ring-[#2B5741] hover:bg-[#2B5741]/30"
                  : "hover:bg-white/20",
              )}
              onClick={handleBookmarkClick}
              disabled={isLoading}
            >
              <BookmarkIcon
                className={cn("h-6 w-6 transition-colors", isBookmarked ? "fill-white text-[#2B5741]" : "text-white")}
              />
            </Button>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            <h3 className="font-['Raleway'] text-2xl font-normal leading-tight text-white drop-shadow-md">{heading}</h3>
            <div className="flex justify-center">
              <GlowingButton text="Read More" onClick={() => router.push(`/research/${id}`)} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

