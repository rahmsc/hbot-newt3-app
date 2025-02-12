"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "~/utils/supabase/client";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useToast } from "~/hooks/use-toast";

interface SavedArticlesProps {
  userId: string;
}

interface Study {
  id: number;
  heading: string;
  summary: string;
  image_url: string;
  authors: string;
  published_date: string;
  pressure_used: string;
  outcome_rating: string;
  number_of_treatments: number;
  peer_reviewed: boolean;
  public_data: boolean;
  funded: boolean;
}

export function SavedArticles({ userId }: SavedArticlesProps) {
  const [savedStudies, setSavedStudies] = useState<Study[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const { toast } = useToast();

  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  useEffect(() => {
    const fetchSavedStudies = async () => {
      try {
        // First, get the user's saved article IDs
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("saved_articles")
          .eq("id", userId)
          .single();

        if (profileError) throw profileError;

        const savedStudyIds = profileData.saved_articles || [];

        if (savedStudyIds.length === 0) {
          setIsLoading(false);
          return;
        }

        // Then fetch the actual studies
        const { data: studies, error: studiesError } = await supabase
          .from("studies")
          .select(
            `
            id,
            heading,
            summary,
            image_url,
            authors,
            published_date,
            pressure_used,
            outcome_rating,
            number_of_treatments,
            peer_reviewed,
            public_data,
            funded
          `,
          )
          .in("id", savedStudyIds);

        if (studiesError) throw studiesError;

        setSavedStudies(studies || []);
      } catch (error) {
        console.error("Error fetching saved studies:", error);
        toast({
          title: "Error",
          description: "Failed to load saved studies",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    void fetchSavedStudies();
  }, [userId, supabase, toast]);

  const removeStudy = async (studyId: number) => {
    try {
      // Get current saved articles
      const { data: profile, error: fetchError } = await supabase
        .from("profiles")
        .select("saved_articles")
        .eq("id", userId)
        .single();

      if (fetchError) throw fetchError;

      // Remove the study ID from the array
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const updatedStudies = (profile.saved_articles ?? []).filter(
        (id: number) => id !== studyId,
      );

      // Update the profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ saved_articles: updatedStudies })
        .eq("id", userId);

      if (updateError) throw updateError;

      // Update local state
      setSavedStudies((prev) => prev.filter((study) => study.id !== studyId));

      toast({
        title: "Success",
        description: "Study removed from saved items",
      });
    } catch (error) {
      console.error("Error removing study:", error);
      toast({
        title: "Error",
        description: "Failed to remove study",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  if (savedStudies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-center">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          No saved studies
        </h3>
        <p className="mb-6 text-sm text-gray-500">
          Studies you save will appear here
        </p>
        <Link href="/research">
          <Button
            variant="default"
            className="bg-emerald-700 hover:bg-emerald-800"
          >
            Browse Studies
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {savedStudies.map((study) => (
        <Card
          key={study.id}
          className="flex overflow-hidden border-none bg-white shadow-md"
        >
          <div className="relative w-1/3">
            <Image
              src={`${imageUrl}${study.id}.png`}
              alt={study.heading}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardContent className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {study.heading}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                {study.summary}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">
                  {study.pressure_used} ATA
                </span>
                <span className="text-xs text-gray-500">
                  {study.number_of_treatments} treatments
                </span>
                <span className="text-xs text-gray-500">
                  {study.outcome_rating}
                </span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Link href={`/research/${study.id}`}>
                <Button
                  variant="default"
                  className="bg-emerald-700 hover:bg-emerald-800"
                >
                  Read More
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                onClick={() => void removeStudy(study.id)}
              >
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
