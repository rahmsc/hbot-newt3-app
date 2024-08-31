import React from "react";
import { articleDatabase } from "../../../../data/article";

const StudyPage = ({
  params,
}: {
  params: {
    articleId: string;
  };
}) => {
  const articleId = parseInt(params.articleId, 10);
  const findArticle = articleDatabase.find(
    (article) => article.id === articleId
  );

  return (
    <section className="flex justify-center items-center pt-32 w-full">
      <div className="max-w-screen-lg px-8 py-16">
        <div className="w-full mb-12">
          <div className="w-full h-[380px] bg-gray-300 flex justify-center items-center">
            <p className="text-4xl">1520X760</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center space-y-4">
            <p className="text-gray-500 uppercase tracking-widest">
              {findArticle?.category} CATEGORY
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              {findArticle?.heading}
            </h1>
            <p className="text-red-600 text-xl">Heading</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-8 text-left">
            <div className="flex-1 space-y-2">
              <p className="text-red-600 font-bold">CONDITION</p>
              <p>{findArticle?.condition}</p>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-red-600 font-bold">PRESSURE USED</p>
              <p>{findArticle?.pressureUsed}</p>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-red-600 font-bold"># OF TREATMENT SESSIONS</p>
              <p>{findArticle?.numberOfTreatment}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Outcome</h2>
            <p className="text-gray-700 leading-relaxed">
              {findArticle?.outcome}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Study Details</h2>
            <p className="text-gray-700 leading-relaxed">
              Study Date: {findArticle?.publishedDate}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              {findArticle?.introduction}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Results</h2>
            <p className="text-gray-700 leading-relaxed">
              {findArticle?.results}
            </p>
          </div>

          <div className="w-full h-[380px] bg-gray-300 flex justify-center items-center my-12">
            <p className="text-4xl">1520X760</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed">
              {findArticle?.conclusion}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">FAQs</h2>
            <p className="text-gray-700 leading-relaxed">{findArticle?.faqs}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Conflicts of Interest</h2>
            <p className="text-gray-700 leading-relaxed">
              {findArticle?.conflictsOfInterest}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Funding</h2>
            <p className="text-gray-700 leading-relaxed">
              {findArticle?.funding}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyPage;
