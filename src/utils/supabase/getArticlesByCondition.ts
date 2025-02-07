import { createClient } from "./client";

export interface ConditionIdArticlesProps {
  id: number;
  condition_id: number;
  condition_name: string;
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
  if (!conditionId) return [];

  const supabase = createClient();
  console.log("Fetching articles for condition ID:", conditionId);

  // First get the condition name
  const { data: conditionData, error: conditionError } = await supabase
    .from("conditions")
    .select("condition_name")
    .eq("id", conditionId)
    .single();

  if (conditionError) {
    console.error("Error fetching condition:", conditionError);
    throw new Error(`Failed to fetch condition: ${conditionError.message}`);
  }

  // Then get the articles
  const { data: articles, error: articlesError } = await supabase
    .from("studies") // Make sure this matches your table name
    .select(
      `
      id,
      condition_id,
      heading,
      published_date,
      authors,
      pressure_used,
      number_of_treatments,
      peer_reviewed,
      public_data,
      funded,
      outcome_rating,
      summary
    `,
    )
    .eq("condition_id", conditionId)
    .order("published_date", { ascending: false });

  if (articlesError) {
    console.error("Error fetching articles:", articlesError);
    throw new Error(`Failed to fetch articles: ${articlesError.message}`);
  }

  // console.log("Raw articles data:", articles);

  if (!articles || articles.length === 0) {
    console.log("No articles found for condition:", conditionId);
    return [];
  }

  // Transform the data to include condition_name
  const transformedData = articles.map((article) => ({
    ...article,
    condition_name: conditionData.condition_name,
  })) as ConditionIdArticlesProps[];

  // console.log("Transformed articles:", transformedData);
  return transformedData;
}
