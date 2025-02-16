import Airtable from "airtable";

import type { GuidePageProp } from "~/types/guide";

export async function getGuideById(id: string): Promise<GuidePageProp | null> {
  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Guides")
      .select({
        filterByFormula: `RECORD_ID() = '${id}'`,
        maxRecords: 1,
      })
      .firstPage((err, records) => {
        if (err) {
          console.error("Error fetching guide:", err);
          reject(new Error(String(err)));
          return;
        }
        if (!records || records.length === 0) {
          resolve(null);
          return;
        }
        const record = records[0];
        if (record) {
          resolve({
            id: record.id,
            fields: record.fields as unknown as GuidePageProp["fields"],
          });
        } else {
          resolve(null);
        }
      });
  });
}
