import Airtable from "airtable";
import PopularPosts from "~/components/guides/popular-guides";
import UserGuideCarousel from "~/components/guides/user-guide-carousel";
import type { Metadata } from "next";

export interface GuideProp {
  id: string;
  fields: {
    "Guide Title": string;
    Guide: string;
    Hook: string;
    Approved: boolean;
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
        maxRecords: 10, // Limit to 10 records
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
    title: "HBOT Home User Guides | HBOT-HQ",
    description: `Explore our collection of ${guideCount} home user guides for Hyperbaric Oxygen Therapy (HBOT). Learn about ${topGuides}, and more.`,
    keywords: [
      "HBOT",
      "Hyperbaric Oxygen Therapy",
      "Home User Guides",
      "DIY HBOT",
      "HBOT Instructions",
    ],
    openGraph: {
      title: "HBOT Home User Guides",
      description: `Access ${guideCount} comprehensive guides for home HBOT use. Expert advice on ${topGuides}, and other HBOT topics.`,
      type: "website",
      url: "https://www.hyperbarichq.com/guides/user",
      images: [
        {
          url: "https://hbot-hq.com/images/hbot-guides-og.jpg",
          width: 1200,
          height: 630,
          alt: "HBOT Home User Guides",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "HBOT Home User Guides | HBOT-HQ",
      description: `Discover ${guideCount} expert guides for home HBOT use. Learn about ${topGuides}, and more.`,
      images: ["https://hbot-hq.com/images/hbot-guides-twitter.jpg"],
    },
  };
}

export default async function UserGuides() {
  const allGuides = await getAirtableData();
  const approvedGuides = allGuides.filter((guide) => guide.fields.Approved);

  return (
    <section className="flex w-full flex-col items-center justify-center space-y-12 pt-32">
      <h1 className="text-center text-3xl font-bold">Home User Guides</h1>
      <div className="mx-auto mb-8 hidden w-full max-w-lg md:block">
        <UserGuideCarousel guides={approvedGuides} />
      </div>
      <PopularPosts guides={approvedGuides} />
    </section>
  );
}
