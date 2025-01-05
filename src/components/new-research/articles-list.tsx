"use client";

import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import getArticlesByCondition, {
  type ConditionIdArticlesProps,
} from "~/utils/supabase/getArticlesByCondition";
import Image from "next/image";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface ArticlesListProps {
  selectedConditionId: number | null;
}

export function ArticlesList({ selectedConditionId }: ArticlesListProps) {
  const [articles, setArticles] = useState<ConditionIdArticlesProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  useEffect(() => {
    async function fetchArticles() {
      if (!selectedConditionId) {
        setArticles([]);
        return;
      }

      setIsLoading(true);

      try {
        const data = await getArticlesByCondition(selectedConditionId);
        console.log("Fetched articles:", data);
        setArticles(data || []);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchArticles();
  }, [selectedConditionId]);

  const filteredArticles = articles.filter(
    (article) =>
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.heading.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-8">
      <section className="mx-auto max-w-3xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white">
            <span className="font-medium tracking-wide">
              Evidence based research,
            </span>
            <span className="italic tracking-wide">instantly</span>
          </div>
        </div>
        <h1 className="mb-6 text-5xl font-bold">
          The world&apos;s best resource on{" "}
          <span className="italic">Hyperbaric Oxygen Therapy</span>
        </h1>
        <p className="mb-8 text-lg text-gray-700">
          Discover evidence-based HBOT treatments through our comprehensive
          research framework.
          <br />
          Browse by condition type to find the scientific papers and protocols
          you need.
        </p>
        <div className="relative mx-auto mb-6 max-w-xl">
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              type="search"
              placeholder="Search HQ"
              className="border-none bg-transparent focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="rounded-full bg-black p-2" type="button">
              <span className="text-white">→</span>
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <span className="text-sm text-gray-600">Try:</span>
            {["Aging", "Autism", "Alzheimer's"].map((term) => (
              <button
                type="button"
                key={term}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm"
                onClick={() => setSearchQuery(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl">
        {isLoading ? (
          <div className="py-10 text-center text-gray-500">
            Loading articles...
          </div>
        ) : filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/new-research/${article.id}`}
              className="group"
              onClick={() =>
                sendGAEvent("event", "buttonClicked", {
                  value: `Research Article ${article.id}`,
                })
              }
            >
              <article className="mb-4 grid grid-cols-[1fr,300px] gap-6 rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    {article.heading}
                  </h2>
                  <div className="text-sm text-gray-600">
                    <p>{article.summary}</p>
                    <p className="mt-2 italic">Authors: {article.authors}</p>
                  </div>
                </div>
                <div className="relative h-[200px] overflow-hidden rounded-lg">
                  <Image
                    src={`${imageUrl}${article.id > 100 ? article.id % 100 : article.id}.png`}
                    alt={article.heading}
                    className="h-full w-full object-cover"
                    width={300}
                    height={200}
                    priority
                  />
                </div>
              </article>
            </Link>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            {selectedConditionId
              ? "No articles found for this condition."
              : "Select a condition to view articles."}
          </div>
        )}
      </div>
    </div>
  );
}
