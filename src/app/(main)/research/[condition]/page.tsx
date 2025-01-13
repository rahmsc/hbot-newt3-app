import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

import ConditionContent from "~/components/article/condition-content";
import Spinner from "~/components/spinner";
import getArticlesByCondition from "~/utils/supabase/getArticlesByCondition";

function ArticlesLoading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner size={75} className="text-orange-500" />
    </div>
  );
}

type PageProps = {
  params: Promise<{ condition: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { condition } = await params;
  const conditionList = await getArticlesByCondition(params.condition);
  const conditionItem = conditionList.find(
    (item) => item.fields.conditionTag === condition,
  );
  const conditionName = conditionItem?.fields.condition ?? condition;
  const articleCount = conditionList.filter(
    (item) => item.fields.conditionTag === condition,
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
      url: `https://www.hyperbarichq.com/research/${condition}`,
      images: [
        {
          url: `https://www.hyperbarichq.com/images/conditions/${condition}.jpg`,
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
      images: [
        `https://www.hyperbarichq.com/images/conditions/${condition}.jpg`,
      ],
    },
  };
}

export default async function ConditionPage({ params }: PageProps) {
  const { condition } = await params;
  const conditionList = await getArticlesByCondition();
  const conditionItem = conditionList.find(
    (item) => item.fields.conditionTag === condition,
  );
  const conditionName = conditionItem?.fields.condition ?? condition;
  const articleCount = conditionList.filter(
    (item) => item.fields.conditionTag === condition,
  ).length;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://www.hyperbarichq.com/research/${condition}/#webpage`,
    url: `https://www.hyperbarichq.com/research/${condition}/`,
    name: `HBOT for ${conditionName} | Research Articles`,
    isPartOf: {
      "@id": "https://www.hyperbarichq.com/#website",
    },
    description: `Explore ${articleCount} research articles on Hyperbaric Oxygen Therapy (HBOT) for ${conditionName}. Evidence-based information on HBOT treatment and outcomes.`,
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
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@id": `https://www.hyperbarichq.com/research/${condition}/`,
            name: `${conditionName}`,
          },
        },
      ],
    },
    mainEntity: {
      "@type": "MedicalCondition",
      name: conditionName,
      associatedAnatomy: {
        "@type": "AnatomicalStructure",
        name: conditionItem?.fields.category ?? "Various",
      },
      possibleTreatment: {
        "@type": "MedicalTherapy",
        name: "Hyperbaric Oxygen Therapy",
        description:
          "A medical treatment involving breathing pure oxygen in a pressurized environment.",
      },
    },
    about: {
      "@type": "MedicalScholarlyArticle",
      headline: `HBOT Research for ${conditionName}`,
      description: `Collection of ${articleCount} research articles on Hyperbaric Oxygen Therapy for ${conditionName}`,
      author: {
        "@type": "Organization",
        name: "HBOT-HQ",
      },
    },
  };

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <section className="flex w-full flex-row items-center justify-center pt-32">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-semibold uppercase">
            Articles on {conditionName}
          </h1>
          <Suspense fallback={<ArticlesLoading />}>
            <ConditionContent conditionTag={condition} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
