import type { BlogDbEntry } from "~/types/blog"
import { createClient } from "~/utils/supabase/client"

/**
 * Fetches a list of guides from Supabase
 * @returns Array of guides
 */
export async function getAllGuides(): Promise<BlogDbEntry[]> {
  try {
    const supabase =  createClient()
    
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("category", "Guide")
      .order("publish_date", { ascending: false })
      .limit(10)
    
    if (error) {
      console.error("Error fetching guides:", error)
      return []
    }
    
    return (data as BlogDbEntry[])
  } catch (error) {
    console.error("Error in getAllGuides:", error)
    return []
  }
} 

export async function getGuideBySlug(slug: string): Promise<BlogDbEntry | null> {
  try {
    if (!slug) {
      console.error("No slug provided")
      return null
    }

    const supabase = createClient()
    
    const { data: blogData, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("category", "Guide")
      .eq("url_slug", slug)
      .single()
    
    if (error || !blogData) {
      console.error("Error fetching blog post by slug:", error)
      return null
    }
    
    const typedData = blogData as BlogDbEntry
    
    // Transform to match the expected BlogPost type structure
    return typedData
  } catch (error) {
    console.error("Error in getBlogPostBySlug:", error)
    return null
  }
}