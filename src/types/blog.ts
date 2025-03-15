// Types for structured rich content stored as JSONB
export interface RichContent {
  content: Array<{
    type: string;
    content?: RichContent['content'];
    text?: string;
    attrs?: Record<string, unknown>;
  }>;
  type?: string;
}

// Types for FAQ content structure
export interface FaqItem {
  question: string;
  answer: RichContent;
}

// Types for Supabase blogs/guides data structure based on the blogs table schema
export interface BlogDbEntry {
  blog_id: number;
  conclusion: RichContent | null;
  faqs: FaqItem[] | null;
  created_at: string | null;
  updated_at: string | null;
  publish_date: string;
  summary: RichContent;
  introduction: RichContent | null;
  body: RichContent | null;
  category: "Blog" | "Guide"; // Only these two values are allowed
  url_slug: string | null;
  author: string;
  title: string;
}

// Types for Supabase blog_summaries table
export interface BlogSummaryDbEntry {
  blog_id: number | null;
  publish_date: string | null;
  summary: RichContent | null;
  category: "blog" | "guide" | null;
  author: string | null;
  title: string | null;
}

export interface BlogFaq {
  question: string;
  answer: RichContent;
}