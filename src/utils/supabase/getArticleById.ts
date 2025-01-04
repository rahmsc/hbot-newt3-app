import { createClient } from "./server";

export interface ArticlesProps {
  id: number;
  conditionId: string;
  heading: string;
  publishedDate: Date;
  studyLink: string;
  authors: string;
  pressureUsed: string;
  numberOfTreatments: number;
  peerReviewed: boolean;
  publicData: boolean;
  funded: boolean;
  outcomeRating: string;
  summary: string;
  introduction: string;
  outcomes: string;
  results: string;
  conclusion: string;
  conflictsOfInterest: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  //   faqs: string;
  funding: string;
  outcome: string;
}

export default async function getArticleById(
  id?: number,
): Promise<ArticlesProps | null> {
  try {
    if (!id) {
      throw new Error("Article ID is required");
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("studies") // replace with your actual table name
      .select(
        `
        id,
        condition_id,
        heading,
        published_date,
        study_link,
        authors,
        pressure_used,
        number_of_treatments,
        peer_reviewed,
        public_data,
        funded,
        outcome_rating,
        summary,
        introduction,
        outcomes,
        results,
        conclusion,
        conflicts_of_interest,
        image_url,
        created_at,
        updated_at,
        funding,
        outcome
      `,
      )
      .eq("id", id);

    if (error) {
      console.error("Error fetching article:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      return null;
    }

    // Transform the first (and should be only) result
    return {
      id: Number(data?.[0]?.id),
      conditionId: String(data?.[0]?.condition_id),
      heading: data?.[0]?.heading as string,
      publishedDate: new Date(data?.[0]?.published_date as string),
      studyLink: data?.[0]?.study_link as string,
      authors: data?.[0]?.authors as string,
      pressureUsed: data?.[0]?.pressure_used as string,
      numberOfTreatments: data?.[0]?.number_of_treatments as number,
      peerReviewed: data?.[0]?.peer_reviewed as boolean,
      publicData: data?.[0]?.public_data as boolean,
      funded: data?.[0]?.funded as boolean,
      outcomeRating: data?.[0]?.outcome_rating as string,
      summary: data?.[0]?.summary as string,
      introduction: data?.[0]?.introduction as string,
      outcomes: data?.[0]?.outcomes as string,
      results: data?.[0]?.results as string,
      conclusion: data?.[0]?.conclusion as string,
      conflictsOfInterest: data?.[0]?.conflicts_of_interest as string,
      imageUrl: data?.[0]?.image_url as string,
      createdAt: new Date(data?.[0]?.created_at as string),
      updatedAt: new Date(data?.[0]?.updated_at as string),
      funding: data?.[0]?.funding as string,
      outcome: data?.[0]?.outcome as string,
    };
  } catch (error) {
    console.error("Error in getArticleById:", error);
    throw error;
  }
}
