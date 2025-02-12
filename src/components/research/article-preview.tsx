import { ExternalLink } from "lucide-react";

import type { ConditionIdArticlesProps } from "~/utils/supabase/articles/getArticlesByCondition";

import { FeatureArticleActions } from "./feature-article-actions";

interface ArticlePreviewProps {
  article: ConditionIdArticlesProps | null;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  if (!article) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Hover over an article to view details
      </div>
    );
  }

  const formattedDate = article.published_date
    ? new Date(article.published_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="flex h-full flex-col p-8">
      {/* Author and Date */}
      <div className="mb-6">
        <div className="flex items-center gap-4 font-mono text-sm text-gray-600">
          {article.authors && <span>{article.authors}</span>}
          <span>•</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-8 flex-grow">
        <h2 className="font-heading mb-4 font-['Raleway'] text-3xl leading-tight text-gray-900">
          {article.heading}
        </h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>{article.summary}</p>
        </div>
      </div>

      <FeatureArticleActions outcome_rating={article.outcome_rating} />

      {/* Metadata */}
      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-gray-200 py-8">
        <MetadataItem label="CONDITION" value={article.condition_name} />
        <MetadataItem
          label="ATA"
          value={article.pressure_used || "Not specified"}
        />
        <MetadataItem
          label="# OF SESSIONS"
          value={
            article.number_of_treatments
              ? article.number_of_treatments.toString()
              : "Not specified"
          }
        />
        <MetadataItem
          label="PEER REVIEWED"
          value={article.peer_reviewed ? "Yes" : "No"}
        />
        <MetadataItem
          label="PUBLIC DATA"
          value={article.public_data ? "Yes" : "No"}
        />
        <MetadataItem label="FUNDED" value={article.funded ? "Yes" : "N/A"} />
      </div>
    </div>
  );
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-orange-600">
        {label}
      </div>
      <div className="font-['Roboto'] text-sm font-medium text-gray-900">
        {value}
      </div>
    </div>
  );
}
