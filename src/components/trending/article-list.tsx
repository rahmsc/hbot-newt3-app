"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import RichText from "~/components/utils/rich-text";
import type { BlogPost } from "~/types/blog";
import type { TrendingArticle } from "~/utils/supabase/getTrendingArticles";

interface ArticleListProps {
  articles: (BlogPost | TrendingArticle)[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Type guard to check if article is a BlogPost
function isBlogPost(article: BlogPost | TrendingArticle): article is BlogPost {
  return "fields" in article;
}

// Helper function to safely get category
function getCategory(article: BlogPost): string {
  return article.fields?.Category ?? "Blog";
}

// Helper function to safely check category
function checkCategory(category: string | undefined, value: string): boolean {
  return category?.toLowerCase() === value;
}

export function ArticleList({
  articles,
  currentPage,
  totalPages,
  onPageChange,
}: ArticleListProps) {
  return (
    <div className="py-8 sm:py-12 md:py-16">
      <h2 className="mb-6 font-['Raleway'] text-2xl font-medium tracking-wider text-gray-900 sm:mb-8 sm:text-3xl">
        More Articles
      </h2>
      <div className="space-y-6 sm:space-y-8 md:space-y-12">
        {articles.map((article) => (
          <Link
            key={isBlogPost(article) ? article.id : article.article_id}
            href={
              isBlogPost(article)
                ? `/trending/${article.fields?.["URL Slug"] ?? ""}`
                : `/research/${article.article_id}`
            }
            className="group block"
          >
            <article className="relative overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg sm:rounded-[2rem]">
              <div className="flex flex-col sm:flex-row">
                <div className="relative aspect-[16/9] sm:aspect-[4/3] sm:w-1/3">
                  <Image
                    src={
                      isBlogPost(article)
                        ? `https://d144dqt8e4woe2.cloudfront.net/blogs/header/${article.fields["ID Blog"]}.png`
                        : `https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/${article.article_id}.png`
                    }
                    alt={
                      isBlogPost(article)
                        ? (article.fields["Content Idea"] ?? "")
                        : (article.heading ?? "")
                    }
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
                  <div>
                    <div className="flex items-center gap-2 font-['Space_Mono'] text-xs uppercase tracking-wider">
                      {isBlogPost(article) ? (
                        <Badge
                          variant="secondary"
                          className={`backdrop-blur-sm ${
                            checkCategory(article.fields?.Category, "blog")
                              ? "bg-emerald-700"
                              : checkCategory(article.fields?.Category, "guide")
                                ? "bg-orange-700"
                                : "bg-white/20"
                          }`}
                        >
                          {getCategory(article)}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-emerald-700">
                          Research
                        </Badge>
                      )}
                      <span className="text-gray-500">
                        {isBlogPost(article)
                          ? new Date(article.fields.Date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              },
                            )
                          : article.published_date
                            ? new Date(
                                article.published_date,
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })
                            : ""}
                      </span>
                    </div>
                    <h3 className="mt-2 font-['Raleway'] text-xl font-medium text-gray-900 sm:text-2xl">
                      {isBlogPost(article)
                        ? article.fields["Content Idea"]
                        : article.heading}
                    </h3>
                    <div className="mt-2 text-sm text-gray-600 sm:text-base">
                      {isBlogPost(article) ? (
                        <RichText
                          content={article.fields.Introduction.slice(0, 100)}
                        />
                      ) : (
                        <p>{article.summary?.slice(0, 100)}...</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="font-medium text-orange-500 transition-colors group-hover:text-orange-600">
                      Read more →
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-2 sm:mt-12">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
