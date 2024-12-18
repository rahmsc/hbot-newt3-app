import { Suspense } from "react";
import getArticlesByCondition from "~/utils/airtable/getArticlesByCondition";
import ArticleListClient from "./article-list";
import Spinner from "~/components/spinner";

function ArticlesLoading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner size={75} className="text-orange-500" />
    </div>
  );
}

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
    <Suspense fallback={<ArticlesLoading />}>
      <ArticleListClient
        articles={filteredArticles}
        conditionTag={conditionTag}
      />
    </Suspense>
  );
}
