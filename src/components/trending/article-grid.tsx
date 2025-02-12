import Image from "next/image";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import type { TrendingArticle } from "~/utils/supabase/articles/getTrendingArticles";

interface ArticleGridProps {
  articles: TrendingArticle[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link key={article.link} href={article.link} className="group block">
          <article className="relative h-[300px] overflow-hidden rounded-2xl bg-white sm:h-[350px] sm:rounded-[2rem] md:h-[400px]">
            {/* Image */}
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <div className="mb-4 flex gap-2">
                <Badge
                  variant="secondary"
                  className={`backdrop-blur-sm ${
                    article.category.main.toLowerCase() === "blog"
                      ? "bg-emerald-700"
                      : article.category.main.toLowerCase() === "guide"
                        ? "bg-orange-700"
                        : "bg-white/20"
                  }`}
                >
                  {article.category.main}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/50 backdrop-blur-sm"
                >
                  {article.category.sub}
                </Badge>
              </div>

              <h2 className="mb-2 text-xl font-bold sm:text-2xl">
                {article.title}
              </h2>

              <p className="line-clamp-2 text-sm text-gray-200">
                {article.description}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
