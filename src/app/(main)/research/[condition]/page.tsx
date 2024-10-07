import { Suspense } from "react";
import ConditionContent from "~/components/article/condition-content";
import Spinner from "~/components/spinner";
import getArticlesByCondition from "~/utils/airtable/getArticlesByCondition";
import type { Metadata } from "next";

function ArticlesLoading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner size={75} className="text-orange-500" />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { condition: string };
}): Promise<Metadata> {
  const conditionList = await getArticlesByCondition();
  const conditionItem = conditionList.find(
    (item) => item.fields.conditionTag === params.condition,
  );
  const conditionName = conditionItem?.fields.condition ?? params.condition;
  const articleCount = conditionList.filter(
    (item) => item.fields.conditionTag === params.condition,
  ).length;

  return {
    title: `HBOT for ${conditionName} | Research Articles`,
    description: `Explore ${articleCount} research articles on Hyperbaric Oxygen Therapy (HBOT) for ${conditionName}. Evidence-based information on HBOT treatment and outcomes.`,
    keywords: [
      "HBOT",
      "Hyperbaric Oxygen Therapy",
      conditionName,
      "Research",
      "Medical Treatment",
    ],
    openGraph: {
      title: `HBOT Research: ${conditionName} | HBOT-HQ`,
      description: `Access ${articleCount} HBOT research articles on ${conditionName}. Comprehensive information on Hyperbaric Oxygen Therapy for this condition.`,
      type: "website",
      url: `https://www.hyperbarichq.com/research/${params.condition}`,
      images: [
        {
          url: `https://hbot-hq.com/images/conditions/${params.condition}.jpg`,
          width: 1200,
          height: 630,
          alt: `HBOT Research for ${conditionName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `HBOT for ${conditionName} | Research Articles`,
      description: `Discover ${articleCount} HBOT research articles on ${conditionName}. Evidence-based Hyperbaric Oxygen Therapy information.`,
      images: [`https://hbot-hq.com/images/conditions/${params.condition}.jpg`],
    },
  };
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
        <h1 className="mb-8 text-3xl font-semibold uppercase">
          Articles on {conditionFromTag ?? params.condition}
        </h1>
        <Suspense fallback={<ArticlesLoading />}>
          <ConditionContent conditionTag={params.condition} />
        </Suspense>
      </div>
    </section>
  );
}
