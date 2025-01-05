import { createClient } from "./client";

export interface ConditionIdArticlesProps {
  id: number;
  condition_id: number;
  heading: string;
  published_date: Date;
  authors: string;
  pressure_used: string;
  number_of_treatments: number;
  peer_reviewed: boolean;
  public_data: boolean;
  funded: boolean;
  outcome_rating: string;
  summary: string;
}

export default async function getArticlesByCondition(
  conditionId: number | null,
): Promise<ConditionIdArticlesProps[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("studies")
    .select(
      "id, condition_id, heading, published_date, authors, pressure_used, number_of_treatments, peer_reviewed, public_data, funded, outcome_rating, summary",
    )
    .eq("condition_id", conditionId);

  if (error) {
    console.error("Error fetching data:", error);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }

  return data as ConditionIdArticlesProps[];
}
