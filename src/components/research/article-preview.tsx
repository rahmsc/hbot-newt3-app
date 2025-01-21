import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { ConditionIdArticlesProps } from "~/utils/supabase/getArticlesByCondition";

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

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{article.heading}</h2>
        <div className="flex flex-wrap gap-2">
          {article.outcome_rating && (
            <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-700">
              Outcome: {article.outcome_rating}
            </span>
          )}
          {article.peer_reviewed && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              Peer Reviewed
            </span>
          )}
          {article.public_data && (
            <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
              Public Data
            </span>
          )}
          {article.funded && (
            <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700">
              Funded Research
            </span>
          )}
        </div>
      </div>

      {/* Meta Information */}
      <div className="space-y-3 rounded-lg bg-gray-50 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Published Date</p>
            <p className="text-gray-900">
              {new Date(article.published_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Authors</p>
            <p className="text-gray-900">
              {article.authors || "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Treatments</p>
            <p className="text-gray-900">{article.number_of_treatments}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pressure Used</p>
            <p className="text-gray-900">
              {article.pressure_used || "Not specified"}
            </p>
          </div>
        </div>
      </div>

      {/* Study Link */}
      {article.study_link && (
        <a
          href={article.study_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900"
        >
          View Full Study
          <ExternalLink className="h-4 w-4" />
        </a>
      )}

      {/* Summary Section */}
      {article.summary && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Summary</h3>
          <p className="text-gray-700">{article.summary}</p>
        </div>
      )}
    </div>
  );
}
