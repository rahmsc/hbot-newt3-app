import Airtable from "airtable";

export interface RandomArticleItemProps {
  id: string;
  fields: {
    id: number;
    heading: string;
    conditionTag: string;
  };
}

export default async function getRandomArticles(
  count = 6,
): Promise<RandomArticleItemProps[]> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Latest Research")
      .select({
        view: "Grid view",
        fields: ["id", "heading", "conditionTag"],
      })
      .all((err, records) => {
        if (err) {
          console.error("Error fetching data:", err);
          reject(new Error(String(err)));
          return;
        }

        const articles: RandomArticleItemProps[] =
          records?.map((record) => ({
            id: record.id,
            fields: {
              id: record.get("id") as number,
              heading: record.get("heading") as string,
              conditionTag: record.get("conditionTag") as string,
            },
          })) ?? [];

        // Shuffle the array
        const shuffled = articles.sort(() => 0.5 - Math.random());

        // Get the first 'count' elements
        const randomArticles = shuffled.slice(0, count);

        resolve(randomArticles);
      });
  });
}
