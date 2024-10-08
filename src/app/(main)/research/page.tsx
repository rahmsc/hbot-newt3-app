import { Suspense } from "react";
import getConditionListData, {
  type FilteredArticleItemProps,
} from "~/utils/airtable/getConditionListData";
import ResearchClient from "../../../components/article/research-client";
import Spinner from "~/components/spinner";
import {
  type ConditionWithCount,
  getConditionsWithCounts,
} from "~/utils/airtable/getConditionsWithCount";
import type { Metadata } from "next";
import Script from "next/script";

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

export async function generateMetadata(): Promise<Metadata> {
  const conditionsWithCounts = await getConditionsWithCounts();
  const totalArticles = conditionsWithCounts.reduce(
    (sum, condition) => sum + condition.articleCount,
    0,
  );
  const topConditions = conditionsWithCounts
    .sort((a, b) => b.articleCount - a.articleCount)
    .slice(0, 5)
    .map((c) => c.condition)
    .join(", ");

  return {
    title: "HBOT Research Articles | Conditions and Categories",
    description: `Explore our comprehensive collection of ${totalArticles} Hyperbaric Oxygen Therapy research articles across various conditions including ${topConditions}, and more.`,
    keywords: [
      "HBOT",
      "Hyperbaric Oxygen Therapy",
      "Research",
      "Medical Conditions",
      ...topConditions.split(", "),
    ],
    openGraph: {
      title: "HBOT-HQ Research Articles",
      description: `Access ${totalArticles} HBOT research articles on conditions like ${topConditions}. Evidence-based information on Hyperbaric Oxygen Therapy.`,
      type: "website",
      url: "https://www.hyperbarichq.com/research",
      images: [
        {
          url: "https://www.hyperbarichq.com/images/research-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "HBOT Research Articles",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "HBOT Research Articles | HBOT-HQ",
      description: `Discover ${totalArticles} HBOT research articles on ${topConditions}, and more. Evidence-based Hyperbaric Oxygen Therapy information.`,
      images: [
        "https://www.hyperbarichq.com/images/research-twitter-image.jpg",
      ],
    },
  };
}

export default async function ResearchPage() {
  const conditionListData: FilteredArticleItemProps[] =
    await getConditionListData();

  const conditionsWithCounts: ConditionWithCount[] =
    await getConditionsWithCounts();

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

  const totalArticles = conditionsWithCounts.reduce(
    (sum, condition) => sum + condition.articleCount,
    0,
  );

  const topConditions = conditionsWithCounts
    .sort((a, b) => b.articleCount - a.articleCount)
    .slice(0, 5);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.hyperbarichq.com/research/#webpage",
    url: "https://www.hyperbarichq.com/research/",
    name: "HBOT Research Articles | Conditions and Categories",
    isPartOf: {
      "@id": "https://www.hyperbarichq.com/#website",
    },
    description: `Explore our comprehensive collection of ${totalArticles} Hyperbaric Oxygen Therapy research articles across various conditions.`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": "https://www.hyperbarichq.com/",
            name: "Home",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": "https://www.hyperbarichq.com/research/",
            name: "Research",
          },
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalArticles,
      itemListElement: topConditions.map((condition, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "MedicalCondition",
          name: condition.condition,
          url: `https://www.hyperbarichq.com/research/${condition.conditionTag}`,
          associatedAnatomy: {
            "@type": "AnatomicalStructure",
            name: condition.category,
          },
        },
      })),
    },
  };

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <section className="flex w-full flex-col items-center justify-center pt-32">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-4xl font-bold">Research Articles</h1>
          <Suspense fallback={<ResearchLoading />}>
            <ResearchClient conditionsWithCounts={conditionsWithCounts} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
