import { Suspense } from "react";
import ConditionContent from "~/components/article/condition-content";
import Spinner from "~/components/spinner";
import getArticlesByCondition from "~/utils/airtable/getArticlesByCondition";

function ArticlesLoading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner size={75} className="text-orange-500" />
    </div>
  );
}

export default async function ConditionPage({
  params,
}: {
  params: {
    condition: string;
  };
}) {
  const conditionList = await getArticlesByCondition();
  const conditionFromTag = conditionList.find(
    (item) => item.fields.conditionTag === params.condition,
  )?.fields.condition;

  return (
    <section className="flex w-full flex-row items-center justify-center pt-32">
      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-8 text-3xl font-semibold uppercase">
          Articles on {conditionFromTag ?? params.condition}
        </h2>
        <Suspense fallback={<ArticlesLoading />}>
          <ConditionContent conditionTag={params.condition} />
        </Suspense>
      </div>
    </section>
  );
}
