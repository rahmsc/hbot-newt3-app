import { Suspense } from "react";
import ConditionContent from "~/components/article/condition-content";

function ArticlesLoading() {
  return <div>Loading articles...</div>;
}

export default function ConditionPage({
  params,
}: {
  params: {
    condition: string;
  };
}) {
  return (
    <section className="flex w-full flex-row items-center justify-center pt-32">
      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-8 text-3xl font-semibold uppercase">
          Articles on {params.condition}
        </h2>
        <Suspense fallback={<ArticlesLoading />}>
          <ConditionContent condition={params.condition} />
        </Suspense>
      </div>
    </section>
  );
}
