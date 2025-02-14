import type { TrendingArticleProps } from "./trending-card"
import { TrendingCard } from "./trending-card"

interface FeaturedArticlesProps {
  articles: TrendingArticleProps[]
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  if (!articles.length) return null

  const [mainArticle, ...sideArticles] = articles

  return (
    <section className="container mx-auto max-w-7xl px-2 py-4">
      <hr className="mb-8 border-t border-gray-700" />
 <h2 className="font-['Raleway'] text-2xl font-normal tracking-[0.3em] text-gray-700 pb-8">
          FEATURED ARTICLES
        </h2>
      <div className="grid gap-2 md:grid-cols-3">
        {/* Main featured article */}
        {mainArticle && (
          <div className="md:col-span-2">
            <div className="aspect-[16/9]">
              <TrendingCard article={mainArticle} size="large" />
            </div>
          </div>
        )}

        {/* Side articles */}
        <div className="grid grid-rows-3 gap-1">
          {sideArticles.slice(0, 3).map(
            (article, index) =>
              article && (
                <div key={index} className="h-full">
                  <TrendingCard article={article} size="featured-side" />
                </div>
              ),
          )}
        </div>
      </div>
    </section>
  )
}

