import { format } from "date-fns";
import Link from "next/link";

import type { ConditionIdArticlesProps } from "~/utils/supabase/getArticlesByCondition";

interface ArticlePreviewProps {
  article: ConditionIdArticlesProps | null;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  if (!article) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-gray-500">Select an article to view details</p>
      </div>
    );
  }

  return (
    <div className="h-full space-y-6 p-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">{article.heading}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{article.authors}</span>
          <span>•</span>
          <span>{format(new Date(article.published_date), "yyyy")}</span>
          <span>•</span>
          <span>{article.number_of_treatments} Treatments</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Open in:</span>
          <button
            type="button"
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
          >
            <span className="sr-only">Open graph</span>
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              {/* Add your graph icon SVG path here */}
            </svg>
          </button>
          <button
            type="button"
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
          >
            <span className="sr-only">Google Scholar</span>
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              {/* Add your Google Scholar icon SVG path here */}
            </svg>
          </button>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="text-gray-700">{article.summary}</p>
      </div>

      <div className="flex gap-4 pt-6">
        <Link href={`/new-research/${article.id}`}>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
          >
            <span>View Paper</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
