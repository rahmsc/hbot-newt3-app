"use client";

import { BookmarkIcon } from "lucide-react";
import Image from "next/image";

import type { RandomArticleItemProps } from "~/utils/supabase/getLatestArticles";

import { FeatureArticleActions } from "./feature-article-actions";

interface FeaturedArticleCardProps
  extends Omit<RandomArticleItemProps, "conditionId"> {
  conditionName: string;
}

export default function FeaturedArticleCard({
  id,
  heading,
  summary,
  pressure_used,
  number_of_treatments,
  authors = "John Doe, Kylie Smith",
  published_date,
  peer_reviewed,
  public_data,
  funded,
  outcome_rating,
  conditionName,
}: FeaturedArticleCardProps) {
  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  const truncatedSummary =
    summary?.length > 120 ? `${summary.slice(0, 120)}...` : summary;

  return (
    <div className="group relative h-[650px] w-full overflow-hidden rounded-[2rem]">
      {/* Background Image */}
      <Image
        src={`${imageUrl}${id}.png`}
        alt={heading}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            {/* {authors && (
              <span className="font-['Space_Mono'] text-xs uppercase tracking-wider text-gray-300">
                {authors
                  .split(/[,]/)
                  .filter((author) => author.trim())
                  .slice(0, 3)
                  .map((author) => author.trim())
                  .join(", ") +
                  (authors.split(/[,]/).length > 3 ? " et al." : "")}
              </span>
            )} */}
            {/* <span className="text-white">•</span> */}
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
            <span className="overflow-hidden rounded-full p-2 text-white backdrop-blur-sm">
              <BookmarkIcon className="h-8 w-8" />
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left side (2/3) */}
          <div className="col-span-2 flex flex-col">
            <h2 className="mb-4 font-['Raleway'] text-3xl font-normal leading-tight text-white drop-shadow-md">
              {heading}
            </h2>
            <p className="text-md mb-6 leading-relaxed text-gray-200 drop-shadow">
              {truncatedSummary}
            </p>

            <FeatureArticleActions outcome_rating={outcome_rating} />
          </div>

          {/* Metadata - Right side (1/3) */}
          <div className="flex flex-col space-y-2 uppercase">
            <MetadataItem label="CONDITION" value={conditionName} />
            <MetadataItem label="ATA" value={pressure_used} />
            {number_of_treatments && (
              <MetadataItem
                label="# OF SESSIONS"
                value={number_of_treatments.toString()}
              />
            )}
            <MetadataItem
              label="PEER REVIEWED"
              value={peer_reviewed ? "Yes" : "No"}
            />
            <MetadataItem
              label="PUBLIC DATA"
              value={public_data ? "Yes" : "No"}
            />
            <MetadataItem label="FUNDED" value={funded ? "Yes" : "N/A"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MetadataItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center justify-between overflow-hidden rounded-full bg-white/10 p-2 backdrop-blur-sm">
      <div className="font-mono text-xs tracking-[0.2em] text-gray-300">
        {label}
      </div>
      <div className="font-['Roboto'] text-sm tracking-widest text-white">
        {value}
      </div>
    </div>
  );
}
