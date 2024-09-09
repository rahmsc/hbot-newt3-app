import Image from "next/image";
import { type ArticleItemProps } from "~/data/article";

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

export default function ArticleRow({ article }: { article: ArticleItemProps }) {
  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  return (
    <div className="mx-2 flex max-w-7xl items-start space-x-6 border-b border-gray-400 py-8">
      <div className="w-1/6 flex-shrink-0">
        <h3 className="text-lg font-semibold">Article</h3>
        <p className="text-md text-gray-500">{article.publishedDate}</p>
      </div>
      <div className="w-4/6">
        <h2 className="mb-3 text-4xl font-bold">{article.heading}</h2>
        <p className="mb-3 text-lg text-gray-800">
          {article.introduction.slice(0, 250)}
          {article.introduction.length > 250 ? "..." : ""}
        </p>
        <p className="text-md italic text-gray-500">
          Authors: {article.authors}
        </p>
      </div>
      <div className="relative h-56 w-1/6 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={`${imageUrl}${article.id}.png`}
          alt={`Thumbnail for ${article.heading}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
      </div>
    </div>
  );
}
