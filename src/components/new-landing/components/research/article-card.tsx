import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import type { RandomArticleItemProps } from "~/utils/supabase/getRandomArticles";

export function ArticleCard({
  id,
  heading,
  summary,
  outcome_rating,
}: RandomArticleItemProps) {
  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  return (
    <Link href={`/new-research/${id}`}>
      <Card className="group relative flex h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Removed grid, using flex instead */}
        <div className="relative w-[220px] shrink-0">
          <div className="absolute inset-0 bg-purple-100/20" />
          <Image
            src={`${imageUrl}${id}.png`}
            alt={heading}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="220px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <Badge
                variant="secondary"
                className="rounded-full bg-black px-4 py-1 text-sm font-medium text-white"
              >
                Immune Health
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-full p-0 hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  // Add save functionality here
                }}
              >
                <BookmarkIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="line-clamp-2 text-xl font-semibold tracking-tight text-gray-900">
                {heading}
              </h3>
              <p className="line-clamp-2 text-sm text-gray-600">{summary}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Badge
              variant="default"
              className={`rounded-full px-4 py-1 ${
                outcome_rating?.toLowerCase() === "positive"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {outcome_rating}
            </Badge>
            <Button
              variant="link"
              className="font-semibold text-black hover:no-underline"
            >
              Read More <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
