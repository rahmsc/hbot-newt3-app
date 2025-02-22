import { TrendingHeader } from "~/components/trending/trending-header"
import { FeaturedArticles } from "~/components/trending/featured-articles"
import { ArticleGrid } from "~/components/trending/article-grid"
import { getTrendingArticles } from "~/utils/supabase/articles/getTrendingArticles"
import type { TrendingArticleProps } from "~/components/trending/trending-card"

export default async function TrendingPage() {
  const articles = await getTrendingArticles()

  if (!articles.length) {
    return (
      <div className="flex h-[calc(100vh-127px)] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-700" />
          <p className="text-lg text-gray-600">Loading trending content...</p>
        </div>
      </div>
    )
  }

  // Filter out undefined values and ensure type safety
  const validArticles = articles.filter((article): article is TrendingArticleProps => 
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
      <FeaturedArticles articles={featuredArticles} />
      <ArticleGrid articles={gridArticles} />
    </main>
  )
}

export const dynamic = 'force-dynamic'

