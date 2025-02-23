import Airtable from "airtable"

import type { BlogPost } from "~/types/blog"

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      throw new Error("Missing Airtable credentials")
    }

    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
      endpointUrl: 'https://api.airtable.com', // Explicitly set endpoint
      requestTimeout: 30000, // 30 second timeout
    }).base(process.env.AIRTABLE_BASE_ID)

    const records = await base("Blogs")
      .select({
        view: "Grid view",
        maxRecords: 10,
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields as unknown as BlogPost["fields"],
    }))
  } catch (error) {
    console.error("Error in getBlogPosts:", error)
    return [] // Return empty array instead of throwing
  }
}

