import { Suspense } from "react";

import Spinner from "~/components/utils/spinner";
import getArticlesByCondition from "~/utils/supabase/getArticlesByCondition";

import ArticleListClient from "./article-list";

function ArticlesLoading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner size={75} className="text-orange-500" />
    </div>
  );
}

export default async function ConditionContent({
  conditionId,
}: {
  conditionId: number;
}) {
  const filteredArticles = await getArticlesByCondition(conditionId);

  if (!filteredArticles || filteredArticles.length === 0) {
    return <div>No articles found for this condition.</div>;
  }

  return (
    <Suspense fallback={<ArticlesLoading />}>
      <ArticleListClient
        articles={filteredArticles}
        conditionTag={conditionTag}
      />
    </Suspense>
  );
}
