"use client";

import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "~/contexts/auth-context";
import { useArticleBookmark } from "~/hooks/use-article-bookmark";
import { Button } from "~/components/ui/button";
import type { RandomArticleItemProps } from "~/utils/supabase/articles/getLatestArticles";

export function ArticleCard({
  id,
  heading,
  summary,
  pressure_used,
  number_of_treatments,
  authors = "Unknown Author",
  published_date,
  conditionName,
}: RandomArticleItemProps) {
  const { user } = useAuth();
  const { isBookmarked, isLoading, toggleBookmark } = useArticleBookmark(
    id,
    user?.id,
  );

  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  const showCondition =
    conditionName && conditionName.toLowerCase() !== "unknown";
  const showTreatments = number_of_treatments && number_of_treatments > 0;

  const processedAuthors = authors
    ? authors
        .split(/[,]/)
        .filter((author) => author.trim())
        .slice(0, 1)
        .map((author) => author.trim())
        .join(", ") + (authors.split(/[,]/).length > 3 ? " et al." : "")
    : "Unknown Author";

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    void toggleBookmark();
  };

  return (
    <Link href={`/research/${id}`}>
      <div className="group relative h-[325px] w-full overflow-hidden rounded-[2rem]">
        {/* Background Image */}
        <Image
          src={`${imageUrl}${id}.png`}
          alt={heading}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

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
              className={`overflow-hidden rounded-full p-2 text-white backdrop-blur-sm transition-all ${
                isBookmarked 
                  ? "bg-emerald-700/20 ring-2 ring-emerald-700 hover:bg-emerald-700/30" 
                  : "hover:bg-white/20"
              }`}
              onClick={handleBookmarkClick}
              disabled={isLoading}
            >
              <BookmarkIcon
                className={`h-6 w-6 transition-colors ${
                  isBookmarked 
                    ? "fill-white text-emerald-700" 
                    : "text-white"
                }`}
              />
            </Button>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            <h3 className="font-['Raleway'] text-2xl font-normal leading-tight text-white drop-shadow-md">
              {heading}
            </h3>

            {showCondition && (
              <div className="flex flex-col items-center justify-between overflow-hidden rounded-full bg-white/10 p-2 backdrop-blur-sm">
                <div className="font-['Roboto'] text-sm tracking-widest text-white">
                  {conditionName}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
