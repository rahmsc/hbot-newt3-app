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

        // Filter out articles with id > 99
        const filteredArticles = articles.filter(
          (article) => article.fields.id <= 99,
        );

        // Shuffle the filtered array
        const shuffled = filteredArticles.sort(() => 0.5 - Math.random());

        // Get the first 'count' elements, or all if there are fewer than 'count'
        const randomArticles = shuffled.slice(
          0,
          Math.min(count, shuffled.length),
        );

        resolve(randomArticles);
      });
  });
}
