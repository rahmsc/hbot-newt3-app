import { TrendingContent } from "~/components/trending/trending-content";
import { getBlogPosts } from "~/utils/airtable/blogs/getBlogPosts";
import { getTrendingArticles } from "~/utils/supabase/articles/getTrendingArticles";

export default async function TrendingPage() {
  const allBlogPosts = await getBlogPosts();
  const approvedBlogPosts = allBlogPosts.filter((post) => post.fields.Approved);

  const articles = await getTrendingArticles();

  const [headerPost, ...restPosts] = articles;
  const featuredPosts = restPosts.slice(0, 6);
  const listPosts = restPosts.slice(6);

  if (!headerPost || !featuredPosts) {
    return (
      <div className="flex h-[calc(100vh-127px)] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-700" />
          <p className="text-lg text-gray-600">Loading trending content...</p>
        </div>
      </div>
    );
  }

  return (
    <TrendingContent
      headerPost={headerPost}
      featuredPosts={featuredPosts}
      listPosts={listPosts}
    />
  );
}
