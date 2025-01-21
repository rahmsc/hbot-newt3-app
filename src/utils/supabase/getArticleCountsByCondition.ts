import { createClient } from "./client";

export async function getArticleCountsByCondition(): Promise<
  Record<number, number>
> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("studies")
    .select("condition_id, id");

  if (error) {
    console.error("Error fetching article counts:", error);
    throw new Error(`Failed to fetch article counts: ${error.message}`);
  }

  // Group articles by condition_id and count them
  const counts = data.reduce((acc: Record<number, number>, article) => {
    const conditionId = article.condition_id;
    acc[conditionId] = (acc[conditionId] || 0) + 1;
    return acc;
  }, {});

  return counts;
}
