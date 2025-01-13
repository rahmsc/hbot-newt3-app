"use client";

import Image from "next/image";
import Link from "next/link";

import RichText from "~/components/rich-text";
import { Button } from "~/components/ui/button";
import type { BlogPost } from "~/types/blog";

interface ArticleListProps {
  articles: BlogPost[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ArticleList({
  articles,
  currentPage,
  totalPages,
  onPageChange,
}: ArticleListProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/trending/${article.fields["URL Slug"]}`}
            className="group block"
          >
            <div className="flex gap-6">
              <div className="relative aspect-[4/3] w-48 flex-none overflow-hidden rounded-lg">
                <Image
                  src={`https://d144dqt8e4woe2.cloudfront.net/blogs/header/${article.fields["ID Blog"]}.png`}
                  alt={article.fields["Content Idea"]}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-sm text-blue-600">Blog || </span>
                <span className="text-sm">
                  {article.fields.Date.toLocaleDateString()}
                </span>
                <h3 className="mt-2 text-xl font-bold">
                  {article.fields["Content Idea"]}
                </h3>
                <div className="mt-2 text-gray-600">
                  <RichText
                    content={article.fields.Introduction.slice(0, 250)}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-center gap-2">
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
