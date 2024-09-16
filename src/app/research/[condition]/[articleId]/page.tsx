import { Suspense } from "react";
import ArticleContent from "~/components/article/article-content";
import CallToAction from "~/components/sections/call-to-action";
import Spinner from "~/components/spinner";

function ArticleLoading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner size={100} className="text-orange-500" />
    </div>
  );
}

const StudyPage = ({
  params,
}: {
  params: {
    articleId: string;
  };
}) => {
  const articleId = parseInt(params.articleId, 10);

  return (
    <div className="w-full">
      <section className="flex w-full items-center justify-center pt-32">
        <div className="w-full max-w-screen-lg px-8 py-16">
          <Suspense fallback={<ArticleLoading />}>
            <ArticleContent articleId={articleId} />
          </Suspense>
        </div>
      </section>
      <CallToAction />
    </div>
  );
};

export default StudyPage;
