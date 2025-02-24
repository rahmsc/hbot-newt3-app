import Airtable from "airtable"
import type { BlogPost } from "~/types/blog"

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      throw new Error("Missing Airtable credentials")
    }

    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
      endpointUrl: 'https://api.airtable.com',
      requestTimeout: 30000,
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
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Add debug logging
    console.log('Environment variables:', {
      hasApiKey: !!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
      hasBaseId: !!process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID,
      apiKeyLength: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY?.length,
      baseIdLength: process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID?.length,
    })

    if (!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || !process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID) {
      throw new Error("Missing Airtable credentials. Please check your .env.local file")
    }

    const base = new Airtable({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
    }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID)

    // Query directly for the specific slug
    const records = await base("Blogs")
      .select({
        filterByFormula: `{URL Slug} = '${slug}'`,
        maxRecords: 1,
      })
      .all()

    // Debug logging that will show up server-side
    console.log('Input slug:', slug)
    console.log('Found record:', records[0]?.fields)

    if (records.length === 0) {
      return null
    }

    return {
      id: records[0]?.id ?? "",
      fields: records[0]?.fields as unknown as BlogPost["fields"],
    }
  } catch (error) {
    console.error("Error in getBlogPostBySlug:", error)
    return null
  }
}

