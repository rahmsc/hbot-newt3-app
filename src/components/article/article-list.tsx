"use client";

import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import ArticleRow from "./article-preview";
import type { FilteredArticleByConditionItemProps } from "~/utils/airtable/getArticlesByCondition";

interface ArticleListClientProps {
  articles: FilteredArticleByConditionItemProps[];
  conditionTag: string;
}

export default function ArticleListClient({
  articles,
  conditionTag,
}: ArticleListClientProps) {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/research/${conditionTag}/${article.id}`}
          className="group"
          onClick={() =>
            sendGAEvent("event", "buttonClicked", {
              value: `Research Article ${article.id}`,
            })
          }
        >
          <ArticleRow article={article} />
        </Link>
      ))}
    </div>
  );
}
