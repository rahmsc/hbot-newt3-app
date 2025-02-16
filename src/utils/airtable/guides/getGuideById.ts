import Airtable from "airtable";

import type { GuidePageProp } from "~/types/guide";

export async function getGuideById(id: string): Promise<GuidePageProp | null> {
  try {
    const base = new Airtable({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
    }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID ?? "");

    const records = await base("Guides")
      .select({
        filterByFormula: `{ID Blog} = '${id}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (!records || records.length === 0) {
      console.log("No guide found with ID:", id);
      return null;
    }

    const record = records[0];
    return {
      id: record?.id ?? "",
      fields: record?.fields as unknown as GuidePageProp["fields"],
    };
  } catch (error) {
    console.error("Error fetching guide:", error);
    return null;
  }
}
