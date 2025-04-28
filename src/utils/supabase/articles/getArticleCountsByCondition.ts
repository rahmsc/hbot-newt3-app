import { createClient } from "~/utils/supabase/client";

export async function getArticleCountsByCondition(): Promise<
  Record<number, number>
> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("studies")
    .select("condition_id")
    .not("condition_id", "is", null); // Ensure we only get rows with valid condition_ids

  if (error) {
    console.error("Error fetching article counts:", error);
    throw new Error(`Failed to fetch article counts: ${error.message}`);
  }

  // Group articles by condition_id and count them
  const counts = data.reduce((acc: Record<number, number>, article) => {
    const conditionId = article.condition_id;
    if (conditionId) {
      // Add null check
      acc[conditionId] = (acc[conditionId] ?? 0) + 1;
    }
    return acc;
  }, {});

  return counts;
}
