import { Suspense } from "react";
import ConditionContent from "~/components/article/condition-content";
import Spinner from "~/components/spinner";
import { conditions } from "~/data/researchDataDemo";

function ArticlesLoading() {
  return (
    <div>
      <Spinner size={75} className="text-orange-500" />
      <h3 className="flex items-center justify-center text-orange-500">
        Loading...
      </h3>
    </div>
  );
}

export default function ConditionPage({
  params,
}: {
  params: {
    condition: string;
  };
}) {
  const conditionFromTag = conditions.find(
    (item) => item.conditionTag === params.condition,
  )?.condition;
  return (
    <section className="flex w-full flex-row items-center justify-center pt-32">
      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-8 text-3xl font-semibold uppercase">
          Articles on {conditionFromTag}
        </h2>
        <Suspense fallback={<ArticlesLoading />}>
          <ConditionContent conditionTag={params.condition} />
        </Suspense>
      </div>
    </section>
  );
}
