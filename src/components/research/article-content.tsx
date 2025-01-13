"use client";

import { format } from "date-fns";

import type { ArticlesProps } from "~/utils/supabase/getArticleById";

import AccordionTemplate from "../utils/accordion-template";
import FaqAccordion from "../article/faq-accordion";
import ParallaxImage from "../utils/parralex-image";
import RichText from "../utils/rich-text";

function ArticleContent({ foundArticle }: { foundArticle: ArticlesProps }) {
  const imageUrl = "https://d144dqt8e4woe2.cloudfront.net/research-articles/";

  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <p className="uppercase tracking-widest text-gray-500">
          {foundArticle.conditionId} CATEGORY
        </p>
        <h1 className="text-4xl font-bold leading-tight">
          {foundArticle.heading}
        </h1>
      </div>
      <div className="my-12 flex items-center justify-center">
        <ParallaxImage
          src={`${imageUrl}${foundArticle.id}.png`}
          alt={foundArticle.heading}
        />
      </div>

      <div className="flex flex-col justify-between space-y-4 text-left md:flex-row md:space-x-8 md:space-y-0">
        <div className="flex-1 space-y-2">
          <p className="font-bold text-red-600">CONDITION</p>
          <p>{foundArticle.conditionId}</p>
        </div>
        <div className="flex-1 space-y-2">
          <p className="font-bold text-red-600">PRESSURE USED</p>
          <p>{foundArticle.pressureUsed}</p>
        </div>
        <div className="flex-1 space-y-2">
          <p className="font-bold text-red-600"># OF SESSIONS</p>
          <p>{foundArticle.numberOfTreatments}</p>
        </div>
        <div className="flex-1 space-y-2">
          <p className="font-bold text-red-600">PUBLISHED DATE</p>
          <p>{format(new Date(foundArticle.publishedDate), "MM/dd/yyyy")}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="space-y-8 lg:w-2/3">
          <div className="space-y-4">
            <AccordionTemplate
              trigger={
                <h2 className="text-center text-3xl font-semibold">Outcome</h2>
              }
              content={
                <RichText
                  content={foundArticle.summary}
                  className="leading-relaxed text-gray-700"
                />
              }
            />
          </div>

          <div className="space-y-4">
            <AccordionTemplate
              trigger={<h2 className="text-3xl font-semibold">Introduction</h2>}
              content={
                <RichText
                  content={foundArticle.introduction}
                  className="leading-relaxed text-gray-700"
                />
              }
            />
          </div>

          <div className="space-y-4">
            <AccordionTemplate
              trigger={<h2 className="text-3xl font-semibold">Results</h2>}
              content={
                <RichText
                  content={foundArticle.results}
                  className="leading-relaxed text-gray-700"
                />
              }
            />
          </div>

          <div className="space-y-4">
            <AccordionTemplate
              trigger={<h2 className="text-3xl font-semibold">Conclusion</h2>}
              content={
                <RichText
                  content={foundArticle.conclusion || ""}
                  className="leading-relaxed text-gray-700"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8 lg:mt-0 lg:w-1/3">
          <div className="top-24 space-y-4">
            <h2 className="mb-4 text-3xl font-semibold">FAQs</h2>
            <p className="text-gray-700">No FAQs available for this article.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleContent;
