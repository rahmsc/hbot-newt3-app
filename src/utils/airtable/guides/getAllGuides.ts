import Airtable from "airtable";

import type { GuidePageProp } from "~/types/guide";

export async function getAllGuides(): Promise<GuidePageProp[]> {
  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Guides")
      .select({
        view: "Grid view",
        maxRecords: 10,
      })
      .all((err, records) => {
        if (err) {
          console.error("Error fetching guides:", err);
          reject(new Error(String(err)));
          return;
        }

        const guidePosts =
          records?.map((record) => ({
            id: record.id,
            fields: record.fields as unknown as GuidePageProp["fields"],
          })) ?? [];

        // console.log("Fetched guides:", guidePosts);

        resolve(guidePosts);
      });
  });
}
