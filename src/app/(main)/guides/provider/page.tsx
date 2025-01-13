import Airtable from "airtable";
import type { Metadata } from "next";
import Script from "next/script";

import GuidesListing from "~/components/guides/guide-listings";
import PopularPosts from "~/components/guides/popular-guides";
import PopularGuidesAlternative from "~/components/guides/popular-guides-alternative";
import ProviderGuideCarousel from "~/components/guides/provider-guide-carousel";

export interface GuideProp {
  id: string;
  fields: {
    "Guide Title": string;
    Guide: string;
    Approved: boolean;
    Hook: string;
  };
}

async function getAirtableData(): Promise<GuideProp[]> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Guides")
      .select({
        view: "Grid view",
        maxRecords: 10,
      })
      .all((err, records) => {
        if (err) {
          console.error("Error fetching data:", err);
          reject(new Error(String(err)));
          return;
        }

        const guidePosts =
          records?.map((record) => ({
            id: record.id,
            fields: record.fields as GuideProp["fields"],
          })) ?? [];

        resolve(guidePosts);
      });
  });
}

export async function generateMetadata(): Promise<Metadata> {
  const allGuides = await getAirtableData();
  const approvedGuides = allGuides.filter((guide) => guide.fields.Approved);

  const guideCount = approvedGuides.length;
  const topGuides = approvedGuides
    .slice(0, 3)
    .map((guide) => guide.fields["Guide Title"])
    .join(", ");

  return {
    title: "HBOT Wellness Provider Guides | HBOT-HQ",
    description: `Access ${guideCount} comprehensive guides for HBOT wellness providers. Expert advice on ${topGuides}, and more HBOT topics.`,
    keywords: [
      "HBOT",
      "Hyperbaric Oxygen Therapy",
      "Wellness Provider Guides",
      "HBOT Clinic",
      "HBOT Best Practices",
    ],
    openGraph: {
      title: "HBOT Wellness Provider Guides",
      description: `Discover ${guideCount} expert guides for HBOT wellness providers. Learn about ${topGuides}, and other essential HBOT topics.`,
      type: "website",
      url: "https://www.hyperbarichq.com/guides/provider",
      images: [
        {
          url: "https://www.hyperbarichq.com/images/hbot-provider-guides-og.jpg",
          width: 1200,
          height: 630,
          alt: "HBOT Wellness Provider Guides",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "HBOT Wellness Provider Guides | HBOT-HQ",
      description: `Access ${guideCount} comprehensive guides for HBOT wellness providers. Expert advice on ${topGuides}, and more.`,
      images: [
        "https://www.hyperbarichq.com/images/hbot-provider-guides-twitter.jpg",
      ],
    },
  };
}

export default async function ProviderGuides() {
  const allGuides = await getAirtableData();
  const approvedGuides = allGuides.filter((guide) => guide.fields.Approved);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.hyperbarichq.com/guides/provider/#webpage",
    url: "https://www.hyperbarichq.com/guides/provider/",
    name: "HBOT Wellness Provider Guides | HBOT-HQ",
    isPartOf: {
      "@id": "https://www.hyperbarichq.com/#website",
    },
    description: `Access ${approvedGuides.length} comprehensive guides for HBOT wellness providers. Expert advice on various HBOT topics.`,
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
            "@id": "https://www.hyperbarichq.com/guides/",
            name: "Guides",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@id": "https://www.hyperbarichq.com/guides/provider/",
            name: "Wellness Provider Guides",
          },
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: approvedGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "HowTo",
          name: guide.fields["Guide Title"],
          description: guide.fields.Hook,
          url: `https://www.hyperbarichq.com/guides/provider/${guide.id}`,
        },
      })),
    },
  };

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <section className="flex w-full flex-col items-center justify-center space-y-12 pt-32">
        <h1 className="text-center text-3xl font-bold">
          Wellness Provider Guides
        </h1>
        <div className="mx-auto mb-8 hidden w-full max-w-lg md:block">
          <ProviderGuideCarousel guides={approvedGuides} />
        </div>
        <div className="md:hidden">
          <PopularPosts guides={approvedGuides} />
        </div>
        <div className="hidden w-full max-w-4xl flex-col gap-8 px-4 md:flex md:flex-row">
          <GuidesListing guides={approvedGuides} />
          <div className="w-full md:w-1/3">
            <PopularGuidesAlternative guides={approvedGuides} />
          </div>
        </div>
      </section>
    </>
  );
}
