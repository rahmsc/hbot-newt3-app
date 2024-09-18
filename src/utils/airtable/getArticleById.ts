import Airtable from "airtable";

export interface ArticleByIdFields {
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
  faqArray: { question: string; answer: string }[];
}

export interface ArticleByIdFieldsItemProps {
  id: string;
  fields: ArticleByIdFields;
}

export default async function getArticleById(
  id?: string,
): Promise<ArticleByIdFieldsItemProps[]> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    let filterByFormula = "";

    if (id) {
      filterByFormula = `RECORD_ID() = '${id}'`;
    }

    base("Latest Research")
      .select({
        view: "Grid view",
        fields: [
          "id",
          "category",
          "condition",
          "conditionTag",
          "heading",
          "pressureUsed",
          "numberOfTreatments",
          "outcomes",
          "studyLink",
          "publishedDate",
          "authors",
          "introduction",
          "results",
          "conclusion",
          "faqs",
          "conflictsOfInterest",
          "funding",
          "keywords",
          "faqArray",
        ],
        filterByFormula: filterByFormula,
      })
      .firstPage((err, records) => {
        if (err) {
          console.error("Error fetching data:", err);
          reject(new Error(`Failed to fetch data: ${err}`));
          return;
        }

        const filteredArticlesByCondition: ArticleByIdFieldsItemProps[] =
          records?.map((record) => ({
            id: record.id,
            fields: {
              id: record.get("id") as number,
              category: record.get("category") as string,
              condition: record.get("condition") as string,
              conditionTag: record.get("conditionTag") as string,
              heading: record.get("heading") as string,
              pressureUsed: record.get("pressureUsed") as string,
              numberOfTreatments: record.get("numberOfTreatments") as string,
              outcomes: record.get("outcomes") as string,
              studyLink: record.get("studyLink") as string,
              publishedDate: record.get("publishedDate") as string,
              authors: record.get("authors") as string,
              introduction: record.get("introduction") as string,
              results: record.get("results") as string,
              conclusion: record.get("conclusion") as string,
              faqs: record.get("faqs") as string,
              conflictsOfInterest: record.get("conflictsOfInterest") as string,
              funding: record.get("funding") as string,
              keywords: record.get("keywords") as string,
              faqArray: record.get("faqArray") as unknown as {
                question: string;
                answer: string;
              }[],
            },
          })) ?? [];

        resolve(filteredArticlesByCondition);
      });
  });
}
