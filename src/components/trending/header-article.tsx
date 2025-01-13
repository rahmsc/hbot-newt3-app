"use client";

import Image from "next/image";
import Link from "next/link";

import RichText from "~/components/rich-text";
import type { BlogPost } from "~/types/blog";

interface HeaderArticleProps {
  post: BlogPost;
}

export function HeaderArticle({ post }: HeaderArticleProps) {
  return (
    <Link href={`/trending/${post.fields["URL Slug"]}`}>
      <div className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-x-0 h-full w-full">
          <Image
            src={`https://d144dqt8e4woe2.cloudfront.net/blogs/header/${post.fields["ID Blog"]}.png`}
            alt={post.fields["Content Idea"]}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        </div>

        <div className="container relative mx-auto h-full">
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12">
            <div className="max-w-3xl">
              <span className="mb-4 inline-block rounded-full bg-white px-3 py-1 text-sm font-medium text-black">
                Trending
              </span>
              <h1 className="mb-4 text-3xl font-bold text-white sm:text-5xl">
                {post.fields["Content Idea"]}
              </h1>
              <div className="text-lg">
                <div className="[&_a]:text-white [&_p]:text-white [&_span]:text-white">
                  <RichText content={post.fields.Introduction.slice(0, 200)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
