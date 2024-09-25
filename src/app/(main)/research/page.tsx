// app/research/page.tsx
import { Suspense } from "react";
import getConditionListData, {
  type FilteredArticleItemProps,
} from "~/utils/airtable/getConditionListData";
import ResearchClient from "../../../components/article/research-client";
import Spinner from "~/components/spinner";

function ResearchLoading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner size={75} className="text-orange-500" />
    </div>
  );
}

interface UniqueCondition {
  condition: string;
  category: string;
  conditionTag: string;
}

export default async function ResearchPage() {
  const conditionListData: FilteredArticleItemProps[] =
    await getConditionListData();

  const conditionList: UniqueCondition[] = conditionListData
    .filter(
      (item) =>
        item.fields.condition &&
        item.fields.category &&
        item.fields.conditionTag,
    )
    .map((item) => ({
      condition: item.fields.condition,
      category: item.fields.category,
      conditionTag: item.fields.conditionTag,
    }));

  const uniqueConditionsMap = new Map<string, UniqueCondition>();

  for (const item of conditionList) {
    if (!uniqueConditionsMap.has(item.condition)) {
      uniqueConditionsMap.set(item.condition, {
        condition: item.condition,
        category: item.category,
        conditionTag: item.conditionTag,
      });
    }
  }

  // Convert the Map to an array of UniqueCondition objects
  const uniqueConditions = Array.from(uniqueConditionsMap.values());

  return (
    <section className="flex w-full flex-col items-center justify-center pt-32">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Research Articles</h1>
        <Suspense fallback={<ResearchLoading />}>
          <ResearchClient uniqueConditions={uniqueConditions} />
        </Suspense>
      </div>
    </section>
  );
}
