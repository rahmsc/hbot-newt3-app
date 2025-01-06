/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createClient } from "./client";

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

    const supabase = createClient();

    // Add logging to debug the connection and ID
    console.log("Fetching article with ID:", id);

    const { data, error } = await supabase
      .from("studies")
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
        funding,
        outcome
      `,
      )
      .eq("id", id)
      .single(); // Use single() instead of potentially getting an array

    if (error) {
      // Improve error logging
      console.error("Supabase error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      throw new Error(`Database error: ${error.message}`);
    }

    if (!data) {
      console.log("No data found for article ID:", id);
      return null;
    }

    // Log the raw data for debugging
    console.log("Raw data from database:", data);

    // Safely transform the data with null checks
    return {
      id: Number(data.id) || 0,
      conditionId: String(data.condition_id || ""),
      heading: data.heading ?? "",
      publishedDate: data.published_date ?? new Date(),
      studyLink: data.study_link ?? "",
      authors: data.authors ?? "",
      pressureUsed: data.pressure_used ?? "",
      numberOfTreatments: Number(data.number_of_treatments) || 0,
      peerReviewed: Boolean(data.peer_reviewed),
      publicData: Boolean(data.public_data),
      funded: Boolean(data.funded),
      outcomeRating: data.outcome_rating || "",
      summary: data.summary || "",
      introduction: data.introduction || "",
      outcomes: data.outcomes || "",
      results: data.results || "",
      conclusion: data.conclusion || "",
      conflictsOfInterest: data.conflicts_of_interest || "",
      funding: data.funding || "",
      outcome: data.outcome || "",
    };
  } catch (error) {
    // Improve error logging
    console.error("Detailed error in getArticleById:", {
      error,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
      articleId: id,
    });
    throw error;
  }
}
