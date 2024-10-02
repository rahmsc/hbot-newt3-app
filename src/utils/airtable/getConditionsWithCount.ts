import Airtable from "airtable";

export interface ConditionWithCount {
  condition: string;
  category: string;
  conditionTag: string;
  articleCount: number;
}

export async function getConditionsWithCounts(): Promise<ConditionWithCount[]> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Latest Research")
      .select({
        view: "Grid view",
        fields: ["category", "condition", "conditionTag"],
      })
      .all((err, records) => {
        if (err) {
          console.error("Error fetching data:", err);
          reject(new Error(`Failed to fetch data: ${err}`));
          return;
        }

        const conditionCounts: Record<string, ConditionWithCount> = {};

        if (records) {
          for (const record of records) {
            const category = record.get("category") as string;
            const condition = record.get("condition") as string;
            const conditionTag = record.get("conditionTag") as string;

            if (!conditionCounts[conditionTag]) {
              conditionCounts[conditionTag] = {
                condition,
                category,
                conditionTag,
                articleCount: 0,
              };
            }

            conditionCounts[conditionTag].articleCount++;
          }
        }
        resolve(Object.values(conditionCounts));
      });
  });
}
