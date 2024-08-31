import React from "react";
import Image from "next/image";
import { blogContent } from "../../data/articlesDemo";
import { type ArticleItemProps } from "./article-section";

const blogPosts: ArticleItemProps[] = blogContent.map((post) => ({
  id: post.id,
  title: post.title,
  meta: post.meta,
  img: post.img,
}));

const BlogSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-8 text-3xl font-semibold uppercase">Blog Section</h2>

      <div className="grid grid-cols-1 gap-8 pt-16 md:grid-cols-3">
        {blogPosts.map((post) => (
          <div key={post.id} className="flex flex-col items-center">
            <div className="relative h-72 w-72 overflow-hidden rounded-lg border">
              <Image
                src={post.img}
                alt={post.title}
                className="absolute inset-0"
              />
            </div>
            <div className="p-4 text-center">
              <h4 className="mb-2 text-xl font-semibold">{post.title}</h4>
              <p className="text-gray-600">{post.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
