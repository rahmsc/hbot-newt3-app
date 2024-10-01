import Link from "next/link";
import Image from "next/image";
import Spinner from "../spinner";
import getRandomArticles, {
  type RandomArticleItemProps,
} from "~/utils/airtable/getRandomArticles";

export default async function ArticleSection() {
  const imgUrl = "https://d144dqt8e4woe2.cloudfront.net/research-articles/";

  const randomArticles: RandomArticleItemProps[] = await getRandomArticles(6);

  if (!randomArticles) {
    return (
      <div className="py-16 text-center">
        <Spinner size={100} className="text-orange-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="mb-12 text-4xl font-semibold uppercase">
        What&rsquo;s New
      </h2>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {randomArticles.map((article) => (
          <Link
            key={article.fields.id}
            href={`/research/${article.fields.conditionTag}/${article.id}`}
            className="group"
          >
            <div className="flex flex-col items-center">
              <div className="relative h-56 w-full overflow-hidden rounded-lg shadow-md transition-shadow duration-300 group-hover:shadow-lg">
                <Image
                  src={`${imgUrl}${article.fields.id}.png`}
                  alt={article.fields.heading}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-6 text-center text-xl font-semibold transition-colors duration-300 group-hover:text-orange-500">
                {article.fields.heading}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
