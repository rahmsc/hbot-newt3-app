import type { BlogDbEntry } from "~/types/blog"
import { createClient } from "~/utils/supabase/client"

/**
 * Fetches a list of blog posts from Supabase
 * @returns Array of blog posts
 */
export async function getBlogPosts(): Promise<BlogDbEntry[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("category", "blog")
      .order("publish_date", { ascending: false })
      .limit(10)
    
    if (error) {
      console.error("Error fetching blog posts:", error)
      return []
    }
    
    // Transform to match the expected BlogPost type structure
    return (data as BlogDbEntry[])
  } catch (error) {
    console.error("Error in getBlogPosts:", error)
    return []
  }
}

/**
 * Fetches a single blog post by its URL slug
 * @param slug - The URL slug of the blog post
 * @returns The blog post or null if not found
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogDbEntry | null> {
  try {
    if (!slug) {
      console.error("No slug provided")
      return null
    }

    const supabase = createClient()
    
    const { data: blogData, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("category", "Blog")
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