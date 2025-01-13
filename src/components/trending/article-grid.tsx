"use client";

import Image from "next/image";
import Link from "next/link";

import RichText from "~/components/utils/rich-text";
import type { BlogPost } from "~/types/blog";

interface ArticleGridProps {
  featured: BlogPost;
  articles: BlogPost[];
}

export function ArticleGrid({ featured, articles }: ArticleGridProps) {
  const formatDate = (dateString: string | Date) => {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;

    if (Number.isNaN(date.getTime())) {
      return "Invalid date";
    }

    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <hr className="my-8 w-full border-2 border-t border-gray-700" />
      <h2 className="mb-6 text-lg font-medium uppercase tracking-wider text-gray-500">
        READ
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {/* Featured Article */}
        <Link
          href={`/trending/${featured.fields["URL Slug"]}`}
          className="group"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={`https://d144dqt8e4woe2.cloudfront.net/blogs/header/${featured.fields["ID Blog"]}.png`}
              alt={featured.fields["Content Idea"]}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-4">
            <span className="text-sm text-blue-600">Blog || </span>
            <span className="text-sm">{formatDate(featured.fields.Date)}</span>
            <h3 className="mt-2 text-2xl font-bold">
              {featured.fields["Content Idea"]}
            </h3>
            <div className="mt-2 text-gray-600">
              <RichText content={featured.fields.Introduction.slice(0, 200)} />
            </div>
          </div>
        </Link>

        {/* Secondary Articles */}
        <div className="space-y-6">
          {articles.slice(0, 4).map((article) => (
            <Link
              key={article.id}
              href={`/trending/${article.fields["URL Slug"]}`}
              className="group flex gap-4"
            >
              <div className="relative h-36 w-36 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={`https://d144dqt8e4woe2.cloudfront.net/blogs/header/${article.fields["ID Blog"]}.png`}
                  alt={article.fields["Content Idea"]}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-blue-600">Blog || </span>
                  <span className="text-gray-500">
                    {formatDate(article.fields.Date)}
                  </span>
                </div>
                <h3 className="mt-1 line-clamp-2 text-xl font-bold">
                  {article.fields["Content Idea"]}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
