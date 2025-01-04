import { createClient } from "./server";

export interface RandomArticleItemProps {
  id: number;
  heading: string;
  conditionId: string;
}

export default async function getRandomArticles(
  count = 6,
): Promise<RandomArticleItemProps[]> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("studies")
      .select("id, heading, condition_id")
      .lte("id", 99)
      //   .order("random()") // Use Postgres random ordering
      .limit(count);

    if (error) {
      console.error("Error fetching data:", error);
      throw error;
    }

    if (!data) {
      return [];
    }

    return data.map((record) => ({
      id: record.id as number,
      heading: record.heading as string,
      conditionId: record.condition_id as string,
    }));
  } catch (error) {
    console.error("Error in getRandomArticles:", error);
    throw error;
  }
}
