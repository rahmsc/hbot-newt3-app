import { ExternalLink } from "lucide-react"
import Image from "next/image"
import type { ConditionIdArticlesProps } from "~/utils/supabase/articles/getArticlesByCondition"
import { FeatureArticleActions } from "./feature-article-actions"
import { Badge } from "~/components/ui/badge"

interface ArticlePreviewProps {
  article: ConditionIdArticlesProps | null
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  if (!article) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500 ">Hover over an article to view details</div>
    )
  }
  const formattedDate = article.published_date
    ? new Date(article.published_date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : ""

  return (
    <div className="flex h-full flex-col bg-white p-8">
      {/* Article Image */}
      <div className="mb-6 relative h-48 w-full overflow-hidden rounded-xl">
        <Image src={"/images/products/1.png"} alt={article.heading ?? ""} fill className="object-cover" />
      </div>

      {/* Author and Date */}
      <div className="mb-4">
        <div className="flex items-center gap-4 font-mono text-sm text-gray-600">
          {article.authors && <span>{article.authors}</span>}
          <span>•</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-6 flex-grow">
        <h2 className="font-['Raleway'] text-3xl font-bold leading-tight text-gray-900 mb-4">{article.heading}</h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>{article.summary}</p>
        </div>
      </div>

      {/* Metadata */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <MetadataItem label="CONDITION" value={article.condition_name} />
        <MetadataItem label="ATA" value={article.pressure_used || "Not specified"} />
        <MetadataItem
          label="# OF SESSIONS"
          value={article.number_of_treatments ? article.number_of_treatments.toString() : "Not specified"}
        />
        <MetadataItem label="PEER REVIEWED" value={article.peer_reviewed ? "Yes" : "No"} />
        <MetadataItem label="PUBLIC DATA" value={article.public_data ? "Yes" : "No"} />
        <MetadataItem label="FUNDED" value={article.funded ? "Yes" : "N/A"} />
      </div>
      <div className="mb-6">

      {/* Feature Article Actions */}
      <div className="flex justify-start">

      <FeatureArticleActions outcome_rating={article.outcome_rating} />
      </div>
      </div>
    </div>
  )
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-emerald-600">{label}</div>
      <Badge variant="outline" className="font-['Roboto'] text-sm font-medium text-gray-900">
        {value}
      </Badge>
    </div>
  )
}

