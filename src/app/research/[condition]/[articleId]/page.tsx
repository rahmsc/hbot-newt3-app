import { Suspense } from "react";
import ArticleContent from "~/components/article/article-content";

function ArticleLoading() {
  return <div>Loading article...</div>;
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
    <section className="flex w-full items-center justify-center pt-32">
      <div className="max-w-screen-lg px-8 py-16">
        {/* <div className="mb-12 w-full">
        </div> */}

        <Suspense fallback={<ArticleLoading />}>
          <ArticleContent articleId={articleId} />
        </Suspense>
      </div>
    </section>
  );
};

export default StudyPage;
