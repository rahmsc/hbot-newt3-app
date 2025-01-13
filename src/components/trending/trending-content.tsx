"use client";

import type { BlogPost } from "~/types/blog";

import { ArticleGrid } from "./article-grid";
import { ArticleList } from "./article-list";
import { HeaderArticle } from "./header-article";

interface TrendingContentProps {
  headerPost: BlogPost;
  featuredPost: BlogPost;
  gridPosts: BlogPost[];
  listPosts: BlogPost[];
}

export function TrendingContent({
  headerPost,
  featuredPost,
  gridPosts,
  listPosts,
}: TrendingContentProps) {
  return (
    <main>
      {headerPost && <HeaderArticle post={headerPost} />}
      {featuredPost && (
        <ArticleGrid featured={featuredPost} articles={gridPosts} />
      )}
      <ArticleList
        articles={listPosts}
        currentPage={1}
        totalPages={Math.ceil(listPosts.length / 10)}
        onPageChange={(page) => console.log(`Navigate to page ${page}`)}
      />
    </main>
  );
}
