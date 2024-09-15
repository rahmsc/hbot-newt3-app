import { cache } from "react";
import { api } from "~/trpc/server";
import RichText from "../rich-text";
import FaqAccordion from "./faq-accordion";
import ParallaxImage from "../parralex-image";
import AccordionTemplate from "../accordion-template";

export interface ArticleItemProps {
  id: number;
  category: string;
  heading: string;
  condition: string;
  conditionTag: string;
  pressureUsed: string;
  numberOfTreatments: string;
  outcomes: string;
  studyLink: string;
  publishedDate: string;
  authors: string;
  introduction: string;
  results: string;
  conclusion: string;
  faqs: string;
  conflictsOfInterest: string;
  funding: string;
  keywords: string;
  faqsArray: { question: string; answer: string }[];
}

const getArticleData = cache(
  async (articleId: number): Promise<ArticleItemProps | null> => {
    const data = await api.article.getArticleById({ id: articleId });
    if (data) {
      // Ensure faqsArray is of the correct type
      data.faqsArray = (
        data.faqsArray as { question: string; answer: string }[]
      ).map((item) => ({
        question: String(item.question),
        answer: String(item.answer),
      }));
    }
    return data as ArticleItemProps | null;
  },
);

async function ArticleContent({ articleId }: { articleId: number }) {
  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  const findArticle = await getArticleData(articleId);

  if (!findArticle) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <p className="uppercase tracking-widest text-gray-500">
            {findArticle?.category} CATEGORY
          </p>
          <h1 className="text-4xl font-bold leading-tight">
            {findArticle?.heading}
          </h1>
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
            <p className="font-bold text-red-600"># OF SESSIONS</p>
            <p>{findArticle?.numberOfTreatments}</p>
          </div>
          <div className="flex-1 space-y-2">
            <p className="font-bold text-red-600"># OF SESSIONS</p>
            <p> {findArticle?.publishedDate}</p>
          </div>
        </div>

        <div className="space-y-4">
          <AccordionTemplate
            trigger={
              <h2 className="text-center text-3xl font-semibold">Outcome</h2>
            }
            content={
              <RichText
                content={findArticle?.outcomes}
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
                content={findArticle?.introduction}
                className="leading-relaxed text-gray-700"
              />
            }
          />
        </div>
        <div className="my-12 flex items-center justify-center">
          <ParallaxImage
            src={`${imageUrl}${articleId}.png`}
            alt={`${findArticle.heading}`}
          />
        </div>

        <div className="space-y-4">
          <AccordionTemplate
            trigger={<h2 className="text-3xl font-semibold">Results</h2>}
            content={
              <RichText
                content={findArticle?.results}
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
                content={findArticle?.conclusion || ""}
                className="leading-relaxed text-gray-700"
              />
            }
          />
        </div>

        <div className="space-y-4">
          <AccordionTemplate
            trigger={
              <h2 className="text-3xl font-semibold">Conflicts of Interest</h2>
            }
            content={
              <RichText
                content={findArticle?.conflictsOfInterest}
                className="leading-relaxed text-gray-700"
              />
            }
          />
        </div>

        <div className="space-y-4">
          <AccordionTemplate
            trigger={<h2 className="text-3xl font-semibold">Funding</h2>}
            content={
              <RichText
                content={findArticle?.funding}
                className="leading-relaxed text-gray-700"
              />
            }
          />
        </div>

        <div className="space-y-4">
          <h2 className="flex justify-center text-2xl font-semibold">FAQs</h2>
          {Array.isArray(findArticle.faqsArray) &&
          findArticle.faqsArray.length > 0 ? (
            <FaqAccordion faqData={findArticle.faqsArray} />
          ) : (
            <p className="leading-relaxed text-gray-700">
              No FAQs available for this article.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleContent;
