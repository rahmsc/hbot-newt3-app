import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { BookmarkIcon } from "lucide-react";
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
    <Card className="overflow-hidden border-[1px] border-blue-200 shadow-[0_0_0_1px_rgba(59,130,246,0.1)] transition-shadow hover:shadow-[0_0_0_1px_rgba(59,130,246,0.2)]">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <Image
          src={`${imageUrl}${id}.png`}
          alt={heading}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-[1fr_auto] gap-8">
          <div className="space-y-4">
            <Badge className="rounded-full bg-black px-4 py-1 text-white hover:bg-black/90">
              Neurological
            </Badge>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{heading}</h2>
              <p className="text-muted-foreground">{summary}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="gap-2">
                <BookmarkIcon className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" className="gap-2">
                Read More
                <span className="text-lg">→</span>
              </Button>
            </div>
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
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="text-sm font-semibold text-red-600">
                  CONDITION
                </div>
                <div>Stroke</div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-semibold text-red-600">ATA</div>
                <div>{pressure_used}</div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-semibold text-red-600">
                  PUBLISHED DATE
                </div>
                <div>
                  {published_date
                    ? new Date(published_date).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-semibold text-red-600">
                  PEER REVIEWED
                </div>
                <div>{peer_reviewed ? "Yes" : "No"}</div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-semibold text-red-600">
                  PUBLIC DATA
                </div>
                <div>{public_data ? "Yes" : "No"}</div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-semibold text-red-600">FUNDED</div>
                <div>{funded ? "Yes" : "N/A"}</div>
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-semibold text-red-600">
                  # OF SESSIONS
                </div>
                <div className="font-semibold">{number_of_treatments}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
