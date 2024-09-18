import { type ArticleByIdFieldsItemProps } from "~/utils/airtable/getArticleById";
import RichText from "../rich-text";
import FaqAccordion, { FaqItem } from "./faq-accordion";
import ParallaxImage from "../parralex-image";
import AccordionTemplate from "../accordion-template";

function ArticleContent({
  foundArticle,
}: {
  foundArticle: ArticleByIdFieldsItemProps;
}) {
  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  const parseFaqArray = (faqString: string): FaqItem[] => {
    try {
      return JSON.parse(faqString) as FaqItem[];
    } catch (error) {
      console.error("Error parsing FAQ array:", error);
      return [];
    }
  };

  const faqArray =
    typeof foundArticle.fields.faqArray === "string"
      ? parseFaqArray(foundArticle.fields.faqArray)
      : [];
  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <p className="uppercase tracking-widest text-gray-500">
          {foundArticle.fields.category} CATEGORY
        </p>
        <h1 className="text-4xl font-bold leading-tight">
          {foundArticle.fields.heading}
        </h1>
      </div>
      <div className="my-12 flex items-center justify-center">
        <ParallaxImage
          src={`${imageUrl}${foundArticle.fields.id}.png`}
          alt={foundArticle.fields.heading}
        />
      </div>

      <div className="flex flex-col justify-between space-y-4 text-left md:flex-row md:space-x-8 md:space-y-0">
        <div className="flex-1 space-y-2">
          <p className="font-bold text-red-600">CONDITION</p>
          <p>{foundArticle.fields.condition}</p>
        </div>
        <div className="flex-1 space-y-2">
          <p className="font-bold text-red-600">PRESSURE USED</p>
          <p>{foundArticle.fields.pressureUsed}</p>
        </div>
        <div className="flex-1 space-y-2">
          <p className="font-bold text-red-600"># OF SESSIONS</p>
          <p>{foundArticle.fields.numberOfTreatments}</p>
        </div>
        <div className="flex-1 space-y-2">
          <p className="font-bold text-red-600">PUBLISHED DATE</p>
          <p>{foundArticle.fields.publishedDate}</p>
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
                  content={foundArticle.fields.outcomes}
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
                  content={foundArticle.fields.introduction}
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
                  content={foundArticle.fields.results}
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
                  content={foundArticle.fields.conclusion || ""}
                  className="leading-relaxed text-gray-700"
                />
              }
            />
          </div>

          <div className="space-y-4">
            <AccordionTemplate
              trigger={
                <h2 className="text-3xl font-semibold">
                  Conflicts of Interest
                </h2>
              }
              content={
                <RichText
                  content={foundArticle.fields.conflictsOfInterest}
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
                  content={foundArticle.fields.funding}
                  className="leading-relaxed text-gray-700"
                />
              }
            />
          </div>
        </div>

        <div className="mt-8 lg:mt-0 lg:w-1/3">
          <div className="top-24 space-y-4">
            <h2 className="mb-4 text-3xl font-semibold">FAQs</h2>
            {faqArray.length > 0 ? (
              <FaqAccordion faqData={faqArray} />
            ) : (
              <p className="text-gray-700">
                No FAQs available for this article.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleContent;
