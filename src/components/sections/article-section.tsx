"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { api } from "~/trpc/react";
import Spinner from "../spinner";

interface ArticleItemPreviewProps {
  id: number;
  heading: string;
  conditionTag: string;
}

export default function ArticleSection() {
  const [randomArticles, setRandomArticles] = useState<
    ArticleItemPreviewProps[]
  >([]);
  const { data: articles, isLoading } = api.article.getArticles.useQuery();
  const imgUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  useEffect(() => {
    if (articles && articles.length > 0) {
      const random = getRandomArticles(articles, 6);
      setRandomArticles(random);
    }
  }, [articles]);

  const getRandomArticles = (arr: ArticleItemPreviewProps[], n: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <Spinner size={100} className="text-orange-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-8 text-3xl font-semibold uppercase">
        What&rsquo;s New
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {randomArticles.map((article) => (
          <Link
            key={article.id}
            href={`/research/${article.conditionTag}/${article.id}`}
            className="group"
          >
            <div className="flex flex-col items-center">
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={`${imgUrl}${article.id}.png`}
                  alt={article.heading}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-center text-lg font-semibold transition-colors duration-300 group-hover:text-orange-500">
                {article.heading}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
