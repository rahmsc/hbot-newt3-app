import Link from "next/link";
import { articleDatabase, type ArticleItemProps } from "../../../data/article";

const ConditionPage = ({
  params,
}: {
  params: {
    condition: string;
  };
}) => {
  const filteredArticles: Array<ArticleItemProps> = articleDatabase.filter(
    (article) => article.condition === params.condition,
  );

  return (
    <section className="flex w-full flex-row items-center justify-center pt-32">
      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-8 text-3xl font-semibold uppercase">
          Articles on {params.condition}
        </h2>
        <div className="grid grid-cols-1 gap-8 pt-16 md:grid-cols-3">
          {filteredArticles.map((article) => (
            <div key={article.id} className="flex flex-col items-center">
              <Link href={`/research/${params.condition}/${article.id}`}>
                <div className="relative h-72 w-72 overflow-hidden rounded-lg border bg-gray-300" />
                <div className="p-4 text-center">
                  <h4 className="mb-2 text-xl font-semibold">
                    {article.heading}
                  </h4>
                  <p className="text-gray-600">{article.authors}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConditionPage;
