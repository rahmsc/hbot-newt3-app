import Airtable from "airtable";

import GuidesListing from "~/components/guides/guide-listings";
import ProviderGuideCarousel from "~/components/guides/provider-guide-carousel";
import PopularPosts from "~/components/guides/popular-guides";
import PopularGuidesAlternative from "~/components/guides/popular-guides-alternative";

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

export default async function ProviderGuides() {
  const allGuides = await getAirtableData();
  const approvedGuides = allGuides.filter((guide) => guide.fields.Approved);

  return (
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
  );
}
