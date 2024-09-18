import Airtable from "airtable";

export interface ArticleItemProps {
  id: string;
  fields: {
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
    faqsArray: string;
  };
}

export default async function getAirtableArticleData(): Promise<
  ArticleItemProps[]
> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Latest Research")
      .select({
        view: "Grid view",
        maxRecords: 1,
      })
      .all((err, records) => {
        if (err) {
          console.error("Error fetching data:", err);
          reject(new Error(String(err)));
          return;
        }

        const articles =
          records?.map((record) => ({
            id: record.id,
            fields: record.fields as ArticleItemProps["fields"],
          })) ?? [];

        resolve(articles);
      });
  });
}
