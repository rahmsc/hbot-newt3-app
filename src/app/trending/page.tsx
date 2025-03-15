import { TrendingHeader } from "~/components/trending/trending-header"
import { FeaturedArticles } from "~/components/trending/featured-articles"
import { ArticleGrid } from "~/components/trending/article-grid"
import { getTrendingArticles } from "~/utils/supabase/trending/getTrendingArticles"
import type { BlogDbEntry } from "~/types/blog"

export default async function TrendingPage() {
  const articles = await getTrendingArticles()

  if (!articles.length) {
    return (
      <div className="flex h-[calc(100vh-127px)] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#2B5741]" />
          <p className="text-lg text-gray-600">Loading trending content...</p>
        </div>
      </div>
    )
  }

  // Filter out undefined values and ensure type safety
    const validArticles = articles.filter((article): article is BlogDbEntry => 
    article !== undefined
  )

  const [firstArticle, ...restArticles] = validArticles
  const featuredArticles = firstArticle 
    ? [firstArticle, ...restArticles.slice(0, 3)]
    : []
  const gridArticles = restArticles.slice(3)

  return (
    <main className="w-full">
      <TrendingHeader />
      <div className="container mx-auto max-w-7xl">
        {/* Featured Articles Section */}
        <section className="mt-2">
          {/* Mobile View */}
          <div className="block sm:hidden">
            <FeaturedArticles articles={featuredArticles} isMobile={true} />
          </div>

          {/* Desktop View */}
          <div className="hidden sm:block">
            <FeaturedArticles articles={featuredArticles} />
          </div>
        </section>

        {/* Grid Articles Section */}
        <section className="mt-12">
          {/* Mobile View */}
          <div className="block sm:hidden">
            <ArticleGrid articles={gridArticles} isMobile={true} />
          </div>

          {/* Desktop View */}
          <div className="hidden sm:block">
            <ArticleGrid articles={gridArticles} />
          </div>
        </section>
      </div>
    </main>
  )
}

export const dynamic = 'force-dynamic'

