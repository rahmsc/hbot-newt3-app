import { getBlogPosts } from "~/utils/airtable/blogs/getBlogPosts";
import { getAllGuides } from "~/utils/airtable/guides/getAllGuides";

export interface TrendingArticle {
  category: {
    main: string;
    sub: string;
  };
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
  type: "blog" | "guide";
  article_id?: string;
  heading?: string;
  summary?: string;
  published_date?: string;
  pressureUsed?: string;
  numberOfTreatments?: number;
  conditionId?: string;
  id?: string;
  urlSlug?: string;
  contentIdea?: string;
  introduction?: string;
}

export async function getTrendingArticles(): Promise<TrendingArticle[]> {
  try {
    console.log('Starting getTrendingArticles fetch');
    
    // Fetch both blogs and guides
    const [blogPosts, guides] = await Promise.all([
      getBlogPosts().catch(() => []),
      getAllGuides().catch(() => []),
    ]);

    console.log('Fetched data:', { 
      blogPostsCount: blogPosts?.length ?? 0, 
      guidesCount: guides?.length ?? 0 
    });

    // If both fetches fail, return empty array instead of throwing
    if (!blogPosts?.length && !guides?.length) {
      return [];
    }

    // Map blog posts to TrendingArticle format
    const blogArticles = blogPosts
      .filter((post) => post.fields["Content Idea"] && post.fields.Introduction)
      .map((post) => ({
        category: {
          main: "Blog",
          sub: "Article",
        },
        title: post.fields["Content Idea"],
        description: post.fields.Introduction,
        image: post.fields["ID Blog"]
          ? `https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/${post.fields["ID Blog"]}.png`
          : "/placeholder.png",
        link: `/blog/${post.fields["URL Slug"]}`,
        date: post.fields.Date
          ? new Date(post.fields.Date).toISOString()
          : new Date().toISOString(),
        type: "blog" as const,
      }));

    console.log('Processed blog articles:', blogArticles.length);

    // Map guides to TrendingArticle format
    const guideArticles = guides
      .filter(
        (guide) =>
          guide.fields["Guide Title"] && guide.fields["Guide Introduction"],
      )
      .map((guide) => ({
        category: {
          main: "Guide",
          sub: "Resource",
        },
        title: guide.fields["Guide Title"],
        description: guide.fields["Guide Introduction"],
        image: "/placeholder.png",
        link: `/guide/${guide.fields["ID Blog"]}`,
        date: guide.fields.Date
          ? new Date(guide.fields.Date).toISOString()
          : new Date().toISOString(),
        type: "guide" as const,
      }));

    // Combine and sort articles
    const allArticles = [...blogArticles, ...guideArticles]
      .filter((article) => article.title && article.description)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6); // Get only the 6 most recent articles

    console.log('Final articles count:', allArticles.length);
    const result = allArticles;
    console.log('getTrendingArticles result:', result);
    return result;
  } catch (error) {
    console.error('getTrendingArticles error:', error);
    return []; // Return empty array instead of throwing
  }
}
