"use client";

import { Bookmark } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "~/contexts/auth-context";
import { useArticleBookmark } from "~/hooks/use-article-bookmark";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { FeatureArticleActions } from "./feature-article-actions";

interface FeaturedArticleCardProps {
  id: number;
  heading: string;
  summary: string;
  pressure_used: string;
  number_of_treatments: number;
  authors?: string;
  published_date: Date;
  peer_reviewed?: boolean;
  public_data?: boolean;
  funded?: boolean;
  outcome_rating: string;
  conditionName: string;
  isMobile?: boolean;
}

export function MetadataItem({
  label,
  value,
  isMobile = false,
}: {
  label: string;
  value: string;
  isMobile?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between overflow-hidden rounded-full bg-white/10 backdrop-blur-sm",
        isMobile ? "p-1" : "p-2",
      )}
    >
      <div
        className={cn(
          "font-mono tracking-[0.2em] text-gray-300",
          isMobile ? "text-[10px]" : "text-xs",
        )}
      >
        {label}
      </div>
      <div
        className={cn(
          "font-['Roboto'] tracking-widest text-white",
          isMobile ? "text-xs" : "text-sm",
        )}
      >
        {value}
      </div>
    </div>
  );
}

export default function FeaturedArticleCard({
  id,
  heading,
  summary,
  pressure_used,
  number_of_treatments,
  authors = "John Doe, Kylie Smith",
  published_date,
  peer_reviewed = false,
  public_data = false,
  funded = false,
  outcome_rating,
  conditionName,
  isMobile = false,
}: FeaturedArticleCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { isBookmarked, isLoading, toggleBookmark } = useArticleBookmark(
    id,
    user?.id,
  );

  const imageUrl = `https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/${id}.png`;

  const truncatedSummary =
    summary?.length > (isMobile ? 80 : 120)
      ? `${summary.slice(0, isMobile ? 80 : 120)}...`
      : summary;

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-[2rem]",
        isMobile ? "h-[600px]" : "h-[650px]",
      )}
    >
      {/* Background Image */}
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={heading}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-between text-white",
          isMobile ? "p-6" : "p-12",
        )}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="font-mono text-sm uppercase tracking-wider text-white">
              {published_date
                ? published_date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBookmark}
              disabled={isLoading}
              className={cn(
                "overflow-hidden rounded-full p-2 text-white backdrop-blur-sm transition-all",
                isBookmarked
                  ? "bg-[#2B5741]/20 ring-2 ring-[#2B5741] hover:bg-[#2B5741]/30"
                  : "hover:bg-white/20",
              )}
            >
              <Bookmark
                className={cn(
                  "transition-colors",
                  isBookmarked ? "fill-white text-[#2B5741]" : "text-white",
                  isMobile ? "h-6 w-6" : "h-8 w-8",
                )}
              />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={cn(
            "grid",
            isMobile ? "grid-cols-1 gap-4 pb-24" : "grid-cols-3 gap-8",
          )}
        >
          {/* Left side */}
          <div className={cn("flex flex-col", !isMobile && "col-span-2")}>
            <h2
              className={cn(
                "mb-4 font-['Raleway'] font-normal leading-tight text-white drop-shadow-md",
                isMobile ? "text-xl" : "text-3xl",
              )}
            >
              {heading}
            </h2>
            <p
              className={cn(
                "mb-6 leading-relaxed text-gray-200 drop-shadow",
                isMobile ? "text-sm" : "text-md",
              )}
            >
              {truncatedSummary}
            </p>
            {!isMobile && (
              <FeatureArticleActions
                outcome_rating={outcome_rating}
                onClick={() => router.push(`/research/${id}`)}
              />
            )}
          </div>

          {/* Metadata */}
          <div className={cn("flex flex-col", isMobile && "mt-4")}>
            <div
              className={cn(
                "grid gap-2",
                isMobile ? "auto-rows-fr grid-cols-2" : "grid-cols-1",
              )}
            >
              {isMobile ? (
                <>
                  <MetadataItem
                    label="CONDITION"
                    value={conditionName}
                    isMobile
                  />
                  <MetadataItem
                    label="# OF SESSIONS"
                    value={number_of_treatments.toString()}
                    isMobile
                  />
                </>
              ) : (
                <>
                  <MetadataItem label="CONDITION" value={conditionName} />
                  <MetadataItem label="ATA" value={pressure_used} />
                  <MetadataItem
                    label="# OF SESSIONS"
                    value={number_of_treatments.toString()}
                  />
                  <MetadataItem
                    label="PEER REVIEWED"
                    value={peer_reviewed ? "Yes" : "No"}
                  />
                  <MetadataItem
                    label="PUBLIC DATA"
                    value={public_data ? "Yes" : "No"}
                  />
                  <MetadataItem label="FUNDED" value={funded ? "Yes" : "N/A"} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Action Button */}
        {isMobile && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
            <FeatureArticleActions
              outcome_rating={outcome_rating}
              onClick={() => router.push(`/research/${id}`)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
