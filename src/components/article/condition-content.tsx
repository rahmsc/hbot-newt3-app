import Link from "next/link";

import { api } from "~/trpc/server";
import { cache } from "react";

import ArticleRow from "./article-preview";

const getArticlesByCondition = cache(async (conditionTag: string) => {
  return await api.article.getArticlesByCondition({ conditionTag });
});

export default async function ConditionContent({
  conditionTag,
}: {
  conditionTag: string;
}) {
  const filteredArticles = await getArticlesByCondition(conditionTag);

  if (!filteredArticles || filteredArticles.length === 0) {
    return <div>No articles found for this condition.</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      {filteredArticles.map((article) => (
        <Link
          key={article.id}
          href={`/research/${conditionTag}/${article.id}`}
          className="group"
        >
          <ArticleRow article={article} />
        </Link>
      ))}
    </div>
  );
}
