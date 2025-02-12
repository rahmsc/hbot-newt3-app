import { Suspense } from "react";

// import CallToAction from "~/components/landing/call-to-action";
import ArticleContent from "~/components/research/article-content";
import Spinner from "~/components/utils/spinner";
import getArticleById from "~/utils/supabase/articles/getArticleById";

function ArticleLoading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner size={100} className="text-orange-500" />
    </div>
  );
}

type PageProps = {
  params: { id: string };
};

const StudyPage = async ({ params }: PageProps) => {
  const { id } = params;

  if (!id || Number.isNaN(Number(id))) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg text-gray-700">Invalid article ID provided</p>
      </div>
    );
  }

  try {
    const foundArticle = await getArticleById(Number(id));

    if (!foundArticle) {
      return (
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-lg text-gray-700">Article not found</p>
        </div>
      );
    }

    return (
      <div className="w-full">
        <section className="flex w-full items-center justify-center">
          <div className="w-full max-w-screen-lg px-8 py-16">
            <Suspense fallback={<ArticleLoading />}>
              <ArticleContent foundArticle={foundArticle} />
            </Suspense>
          </div>
        </section>
        {/* <CallToAction /> */}
      </div>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg text-gray-700">
          Error loading article. Please try again later.
        </p>
      </div>
    );
  }
};

export default StudyPage;
