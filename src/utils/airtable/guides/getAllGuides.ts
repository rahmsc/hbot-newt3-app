import Airtable from "airtable";

import type { GuidePageProp } from "~/app/(main)/guides/user/[id]/page";

export async function getAllGuides(): Promise<GuidePageProp[]> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Guides")
      .select({
        view: "Grid view",
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
            fields: record.fields as GuidePageProp["fields"],
          })) ?? [];

        const fullGuidePosts = guidePosts.map((post) => ({
          ...post,
          fields: {
            ...post.fields,
            "ID Blog": 0, // Default value, adjust as needed
            "Guide Heading": "", // Default value, adjust as needed
            "Guide Introduction": "", // Default value, adjust as needed
            "Guide Body": "", // Default value, adjust as needed
          },
        }));

        resolve(fullGuidePosts);
      });
  });
}
