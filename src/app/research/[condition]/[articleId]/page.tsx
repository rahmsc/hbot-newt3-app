import { Suspense } from "react";
import ArticleContent from "~/components/article/article-content";
import CallToAction from "~/components/sections/call-to-action";
import Spinner from "~/components/spinner";
import getArticleById from "~/utils/airtable/getArticleById";

function ArticleLoading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner size={100} className="text-orange-500" />
    </div>
  );
}

const StudyPage = async ({
  params,
}: {
  params: {
    articleId: string;
  };
}) => {
  const { articleId } = params;
  const foundArticles = await getArticleById(articleId);
  const foundArticle = foundArticles[0]; // Get the first (and presumably only) article

  if (!foundArticle) {
    return <div>Article not found</div>;
  }

  return (
    <div className="w-full">
      <section className="flex w-full items-center justify-center pt-32">
        <div className="w-full max-w-screen-lg px-8 py-16">
          <Suspense fallback={<ArticleLoading />}>
            <ArticleContent foundArticle={foundArticle} />
          </Suspense>
        </div>
      </section>
      <CallToAction />
    </div>
  );
};

export default StudyPage;
