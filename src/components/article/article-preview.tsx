import Image from "next/image";
import type { FilteredArticleByConditionItemProps } from "~/utils/airtable/getArticlesByCondition";

export default function ArticleRow({
  article,
}: {
  article: FilteredArticleByConditionItemProps;
}) {
  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  return (
    <div className="mx-2 flex max-w-7xl items-start space-x-6 border-b border-gray-400 py-8">
      <div className="w-1/6 flex-shrink-0">
        <h3 className="text-lg font-semibold">Article</h3>
        <p className="text-md text-gray-500">{article.fields.publishedDate}</p>
      </div>
      <div className="w-4/6">
        <h2 className="mb-3 text-4xl font-bold">{article.fields.heading}</h2>
        <p className="mb-3 text-lg text-gray-800">
          {article.fields.introduction.slice(0, 250)}
          {article.fields.introduction.length > 250 ? "..." : ""}
        </p>
        <p className="text-md italic text-gray-500">
          Authors: {article.fields.authors}
        </p>
      </div>
      <div className="relative h-56 w-1/6 flex-shrink-0 overflow-hidden rounded-lg">
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
