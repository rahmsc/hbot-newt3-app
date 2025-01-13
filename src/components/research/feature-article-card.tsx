import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import type { RandomArticleItemProps } from "~/utils/supabase/getRandomArticles";

export function FeaturedArticleCard({
  id,
  heading,
  summary,
  pressure_used,
  number_of_treatments,
  published_date,
  peer_reviewed,
  public_data,
  funded,
  outcome_rating,
}: RandomArticleItemProps) {
  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  return (
    <Card className="overflow-hidden">
      {/* Image Section */}
      <div className="relative h-[240px] w-full">
        <Image
          src={`${imageUrl}${id}.png`}
          alt={heading}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="space-y-6 p-8">
        {/* Category & Save Button */}
        <div className="flex items-center justify-between">
          <Badge className="rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white">
            Neurological
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0"
          >
            <BookmarkIcon className="h-4 w-4" />
            <span className="sr-only">Save article</span>
          </Button>
        </div>

        {/* Title & Summary */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {heading}
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">{summary}</p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-600">CONDITION</p>
            <p className="text-gray-900">Stroke</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-600">ATA</p>
            <p className="text-gray-900">{pressure_used}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-600"># OF SESSIONS</p>
            <p className="text-gray-900">{number_of_treatments}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-600">PUBLISHED DATE</p>
            <p className="text-gray-900">
              {published_date
                ? new Date(published_date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-600">PEER REVIEWED</p>
            <p className="text-gray-900">{peer_reviewed ? "Yes" : "No"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-600">PUBLIC DATA</p>
            <p className="text-gray-900">{public_data ? "Yes" : "No"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-600">FUNDED</p>
            <p className="text-gray-900">{funded ? "Yes" : "N/A"}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <BookmarkIcon className="h-4 w-4" />
              Save
            </Button>
            <Link href={`/new-research/${id}`}>
              <Button className="gap-2">
                Read More
                <span className="text-lg">→</span>
              </Button>
            </Link>
          </div>
          <Badge
            variant="secondary"
            className={`rounded-full px-6 py-1.5 ${
              outcome_rating?.toLowerCase() === "positive"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {outcome_rating}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
