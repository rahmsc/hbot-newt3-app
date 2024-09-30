import Image from "next/image";
import type { FilteredArticleByConditionItemProps } from "~/utils/airtable/getArticlesByCondition";

export default function ArticleRow({
  article,
}: {
  article: FilteredArticleByConditionItemProps;
}) {
  const imageUrl = "https://d144dqt8e4woe2.cloudfront.net/research-articles/";

  return (
    <div className="mx-2 flex flex-col border-b border-gray-400 py-6 sm:py-8 md:flex-row md:items-start md:space-x-6">
      <div className="mb-4 w-full md:mb-0 md:w-1/6 md:flex-shrink-0">
        <h3 className="text-lg font-semibold">Article</h3>
        <p className="text-sm text-gray-500 md:text-base">
          {article.fields.publishedDate}
        </p>
      </div>
      <div className="mb-4 w-full md:mb-0 md:w-4/6">
        <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">
          {article.fields.heading}
        </h2>
        <p className="mb-3 text-base text-gray-800 sm:text-lg">
          {article.fields.introduction.slice(0, 250)}
          {article.fields.introduction.length > 250 ? "..." : ""}
        </p>
        <p className="text-sm italic text-gray-500 md:text-base">
          Authors: {article.fields.authors}
        </p>
      </div>
      <div className="relative h-48 w-full overflow-hidden rounded-lg sm:h-56 md:h-56 md:w-1/6 md:flex-shrink-0">
        <Image
          src={`${imageUrl}${article.fields.id}.png`}
          alt={`Thumbnail for ${article.fields.heading}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="/placeholder.svg"
        />
      </div>
    </div>
  );
}
