"use client";

import React from "react";
import { api } from "~/trpc/react";

const StudyPage = ({
  params,
}: {
  params: {
    articleId: string;
  };
}) => {
  const articleId = parseInt(params.articleId, 10);
  const { data: findArticle } = api.article.getArticleById.useQuery({
    id: articleId,
  });

  return (
    <section className="flex w-full items-center justify-center pt-32">
      <div className="max-w-screen-lg px-8 py-16">
        <div className="mb-12 w-full">
          <div className="flex h-[380px] w-full items-center justify-center bg-gray-300">
            <p className="text-4xl">1520X760</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <p className="uppercase tracking-widest text-gray-500">
              {findArticle?.category} CATEGORY
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              {findArticle?.heading}
            </h1>
            <p className="text-xl text-red-600">Heading</p>
          </div>

          <div className="flex flex-col justify-between space-y-4 text-left md:flex-row md:space-x-8 md:space-y-0">
            <div className="flex-1 space-y-2">
              <p className="font-bold text-red-600">CONDITION</p>
              <p>{findArticle?.condition}</p>
            </div>
            <div className="flex-1 space-y-2">
              <p className="font-bold text-red-600">PRESSURE USED</p>
              <p>{findArticle?.pressureUsed}</p>
            </div>
            <div className="flex-1 space-y-2">
              <p className="font-bold text-red-600"># OF TREATMENT SESSIONS</p>
              <p>{findArticle?.numberOfTreatments}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Outcome</h2>
            <p className="leading-relaxed text-gray-700">
              {findArticle?.outcomes}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Study Details</h2>
            <p className="leading-relaxed text-gray-700">
              Study Date: {findArticle?.publishedDate}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Introduction</h2>
            <p className="leading-relaxed text-gray-700">
              {findArticle?.introduction}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Results</h2>
            <p className="leading-relaxed text-gray-700">
              {findArticle?.results}
            </p>
          </div>

          <div className="my-12 flex h-[380px] w-full items-center justify-center bg-gray-300">
            <p className="text-4xl">1520X760</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Conclusion</h2>
            <p className="leading-relaxed text-gray-700">
              {findArticle?.conclusion}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">FAQs</h2>
            <p className="leading-relaxed text-gray-700">{findArticle?.faqs}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Conflicts of Interest</h2>
            <p className="leading-relaxed text-gray-700">
              {findArticle?.conflictsOfInterest}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Funding</h2>
            <p className="leading-relaxed text-gray-700">
              {findArticle?.funding}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyPage;
