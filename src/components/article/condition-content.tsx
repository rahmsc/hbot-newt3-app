import Link from "next/link";
import Image from "next/image";
import { api } from "~/trpc/server";
import { cache } from "react";
import ArticlePreview from "./article-preview";
import ArticleList from "./article-preview";
import ArticleRow from "./article-preview";

const getArticlesByCondition = cache(async (conditionTag: string) => {
  return await api.article.getArticlesByCondition({ conditionTag });
});

const imageUrl =
  "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

export default async function ConditionContent({
  conditionTag,
}: {
  conditionTag: string;
}) {
  const filteredArticles = await getArticlesByCondition(conditionTag);

  if (!filteredArticles || filteredArticles.length === 0) {
    return <div>No articles found for this condition.</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      {filteredArticles.map((article) => (
        <Link
          key={article.id}
          href={`/research/${conditionTag}/${article.id}`}
          className="group"
        >
          <ArticleRow article={article} />
        </Link>
      ))}
    </div>
  );
}

// Helper function to generate SVG shimmer effect
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
