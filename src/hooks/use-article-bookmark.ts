"use client";

import { useState, useEffect } from "react";
import { createClient } from "~/utils/supabase/client";
import { useToast } from "~/hooks/use-toast";

export function useArticleBookmark(articleId: number, userId?: string) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    async function checkBookmarkStatus() {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("saved_articles")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          throw error;
        }

        setIsBookmarked(
          Array.isArray(data?.saved_articles) &&
            data.saved_articles.includes(articleId),
        );
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkBookmarkStatus();
  }, [articleId, userId, supabase]);

  const toggleBookmark = async () => {
    if (!userId) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to bookmark articles",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Get current saved articles
      const { data: profileData, error: fetchError } = await supabase
        .from("profiles")
        .select("saved_articles")
        .eq("id", userId)
        .single();

      if (fetchError) {
        console.error("Error fetching profile data:", fetchError);
        throw fetchError;
      }

      // Ensure saved_articles is an array
      const currentSavedArticles: number[] = Array.isArray(
        profileData?.saved_articles,
      )
        ? profileData.saved_articles
        : [];
      // Update saved articles - ensure we're working with numbers
      const newSavedArticles = isBookmarked
        ? currentSavedArticles.filter((id) => id !== articleId)
        : [...currentSavedArticles, articleId];

      // Update the profile with the array of integers
      const { data: updateData, error: updateError } = await supabase
        .from("profiles")
        .update({
          saved_articles: newSavedArticles,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating profile:", updateError);
        throw updateError;
      }

      setIsBookmarked(!isBookmarked);
      toast({
        title: isBookmarked ? "Bookmark removed" : "Article bookmarked",
        description: isBookmarked
          ? "Article removed from your saved items"
          : "Article saved to your profile",
      });
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isBookmarked, isLoading, toggleBookmark };
}
