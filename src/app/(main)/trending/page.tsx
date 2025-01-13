import { TrendingContent } from "~/components/trending/trending-content";
import { getBlogPosts } from "~/utils/airtable/blogs/getBlogPosts";

export default async function TrendingPage() {
  const allBlogPosts = await getBlogPosts();
  const approvedBlogPosts = allBlogPosts.filter((post) => post.fields.Approved);

  const headerPost = approvedBlogPosts[0];
  const featuredPost = approvedBlogPosts[1];
  const gridPosts = approvedBlogPosts.slice(2, 5);
  const listPosts = approvedBlogPosts.slice(5);

  if (!headerPost || !featuredPost) {
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
      featuredPost={featuredPost}
      gridPosts={gridPosts}
      listPosts={listPosts}
    />
  );
}
