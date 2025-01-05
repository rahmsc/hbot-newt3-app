import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { BookmarkIcon } from "lucide-react";
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
    <Card className="overflow-hidden">
      <div className="grid grid-cols-[120px_1fr] gap-4">
        <div className="relative h-full">
          <Image
            src={`${imageUrl}${id}.png`}
            alt={heading}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <Badge
              variant="secondary"
              className="bg-black text-white hover:bg-black/90"
            >
              Immune Health
            </Badge>
            <Button variant="outline" className="gap-2">
              <BookmarkIcon className="h-4 w-4" />
              Save
            </Button>
          </div>
          <h3 className="mt-2.5 text-lg font-semibold tracking-tight">
            {heading}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {summary}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <Badge
              variant="secondary"
              className={`${
                outcome_rating?.toLowerCase() === "negative"
                  ? "bg-red-100 text-red-700 hover:bg-red-100/80"
                  : "bg-green-100 text-green-700 hover:bg-green-100/80"
              }`}
            >
              {outcome_rating} Outcome
            </Badge>
            <Button variant="default" className="gap-2">
              Read More
              <span className="text-lg">→</span>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
