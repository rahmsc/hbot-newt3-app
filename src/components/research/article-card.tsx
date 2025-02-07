import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { RandomArticleItemProps } from "~/utils/supabase/getLatestArticles";

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
  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  const formattedDate = published_date
    ? new Date(published_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "January 28, 2024";

  const showCondition =
    conditionName && conditionName.toLowerCase() !== "unknown";
  const showTreatments = number_of_treatments && number_of_treatments > 0;

  const processedAuthors = authors
    ? authors
        .split(/[,]/)
        .filter((author) => author.trim())
        .slice(0, 2)
        .map((author) => author.trim())
        .join(", ") + (authors.split(/[,]/).length > 3 ? " et al." : "")
    : "Unknown Author";

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
            <div className="inline-flex items-center rounded-full bg-black/30 px-2 py-1 backdrop-blur-sm">
              <span className="font-['Space_Mono'] text-xs uppercase tracking-wider text-white">
                {processedAuthors}
              </span>
              <span className="text-white">•</span>
              <span className="font-['Space_Mono'] text-xs uppercase tracking-wider text-white">
                {formattedDate}
              </span>
            </div>
            <button
              type="button"
              className="rounded-full p-2 text-gray-400 transition-colors hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                // Add bookmark functionality here
              }}
            >
              <BookmarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            {/* Title */}
            <h3 className="mt-2 font-['Raleway'] text-2xl font-normal leading-tight text-white drop-shadow-md">
              {heading}
            </h3>

            {/* Condition and Sessions */}
            {showCondition && (
              <div className="flex w-full items-center justify-between gap-4 rounded-full px-6 py-1.5">
                <span className="font-['Space_Mono'] text-xs uppercase tracking-wider text-white backdrop-blur-sm">
                  {conditionName}
                </span>
                {number_of_treatments === 0
                  ? null
                  : number_of_treatments &&
                    number_of_treatments > 0 && (
                      <>
                        <span className="text-white/50">•</span>
                        <span className="font-['Space_Mono'] text-xs uppercase tracking-wider text-white backdrop-blur-sm">
                          {number_of_treatments}{" "}
                          {number_of_treatments === 1 ? "Session" : "Sessions"}
                        </span>
                      </>
                    )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
