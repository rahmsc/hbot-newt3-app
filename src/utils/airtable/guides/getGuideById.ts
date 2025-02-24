import Airtable from "airtable";

import type { GuidePageProp } from "~/types/guide";

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getGuideById(slugOrId: string | undefined): Promise<GuidePageProp | null> {
  try {
    if (!slugOrId) {
      console.error('No slug or ID provided');
      return null;
    }

    if (!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || !process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID) {
      throw new Error("Missing Airtable credentials. Please check your .env.local file");
    }

    const base = new Airtable({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
    }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

    console.log('Fetching guides to match:', slugOrId);

    // Get all records
    const records = await base("Guides")
      .select({
        view: "Grid view",
      })
      .all();

    console.log('Total guides found:', records.length);

    // Try to find a match
    const matchingRecord = records.find(record => {
      // Try matching by ID Blog first
      if (record.fields["ID Blog"]?.toString() === slugOrId) {
        return true;
      }
      
      // Then try matching by slug
      const title = record.fields["Guide Title"] as string;
      if (title) {
        const recordSlug = createSlug(title);
        console.log('Comparing slugs:', { recordSlug, requestedSlug: slugOrId });
        return recordSlug === slugOrId;
      }
      
      return false;
    });

    if (!matchingRecord) {
      console.log('No matching guide found for:', slugOrId);
      return null;
    }

    console.log('Found matching guide:', matchingRecord.fields["Guide Title"]);

    return {
      id: matchingRecord.id,
      fields: matchingRecord.fields as unknown as GuidePageProp["fields"],
      // slug: createSlug(matchingRecord.fields["Guide Title"] as string)
    };
  } catch (error) {
    console.error("Error in getGuideById:", error);
    return null;
  }
}
