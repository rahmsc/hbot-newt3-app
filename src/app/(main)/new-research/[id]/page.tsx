import { Suspense } from "react";
import ArticleContent from "~/components/new-research/article-content";
import CallToAction from "~/components/sections/call-to-action";
import Spinner from "~/components/spinner";
import getArticleById from "~/utils/supabase/getArticleById";

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
  const foundArticle = await getArticleById(Number(id));

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
