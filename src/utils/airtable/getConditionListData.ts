import Airtable from "airtable";

export interface FilteredArticleItemProps {
  id: string;
  fields: {
    category: string;
    condition: string;
    conditionTag: string;
  };
}

export default async function getConditionListData(): Promise<
  FilteredArticleItemProps[]
> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Latest Research")
      .select({
        view: "Grid view",
        // maxRecords: 2,
        fields: ["id", "category", "condition", "conditionTag"], // Specify the fields you want to retrieve
      })
      .all((err, records) => {
        if (err) {
          console.error("Error fetching data:", err);
          reject(new Error(String(err)));
          return;
        }

        const filteredGuidePosts =
          records?.map((record) => ({
            id: record.id,
            fields: {
              category: record.get("category") as string,
              condition: record.get("condition") as string,
              conditionTag: record.get("conditionTag") as string,
            },
          })) ?? [];

        resolve(filteredGuidePosts);
      });
  });
}
