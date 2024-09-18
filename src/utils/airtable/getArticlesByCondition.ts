import Airtable from "airtable";

export interface ArticleFields {
  id: number;
  category: string;
  condition: string;
  conditionTag: string;
  heading: string;
  publishedDate: string;
  introduction: string;
  authors: string;
}

export interface FilteredArticleByConditionItemProps {
  id: string;
  fields: ArticleFields;
}

export default async function getArticlesByCondition(
  conditionTag?: string,
): Promise<FilteredArticleByConditionItemProps[]> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Latest Research")
      .select({
        view: "Grid view",
        fields: [
          "id",
          "category",
          "condition",
          "conditionTag",
          "heading",
          "publishedDate",
          "introduction",
          "authors",
        ],
        filterByFormula: conditionTag
          ? `{conditionTag} = '${conditionTag}'`
          : "",
      })
      .firstPage((err, records) => {
        if (err) {
          console.error("Error fetching data:", err);
          reject(new Error(`Failed to fetch data: ${err}`));
          return;
        }

        const filteredArticlesByCondition: FilteredArticleByConditionItemProps[] =
          records?.map((record) => ({
            id: record.id,
            fields: {
              id: record.get("id") as number,
              category: record.get("category") as string,
              condition: record.get("condition") as string,
              conditionTag: record.get("conditionTag") as string,
              heading: record.get("heading") as string,
              publishedDate: record.get("publishedDate") as string,
              introduction: record.get("introduction") as string,
              authors: record.get("authors") as string,
            },
          })) ?? [];

        resolve(filteredArticlesByCondition);
      });
  });
}
