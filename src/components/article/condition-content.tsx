import Link from "next/link";
import { api } from "~/trpc/server";
import { cache } from "react";
import Image from "next/image";

const getArticlesByCondition = cache(async (conditionTag: string) => {
  return await api.article.getArticlesByCondition({ conditionTag });
});

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
    <div className="grid grid-cols-1 gap-8 pt-16 md:grid-cols-3">
      {filteredArticles.map((article) => (
        <div key={article.id} className="flex flex-col items-center">
          <Link href={`/research/${conditionTag}/${article.id}`}>
            <div className="relative h-72 w-72 overflow-hidden rounded-lg border bg-gray-300">
              <Image
                src="/placeholder.svg"
                alt={article.heading}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4 text-center">
              <h4 className="mb-2 text-xl font-semibold">{article.heading}</h4>
              <p className="text-gray-600">{article.authors}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
