"use client";

import { useState, useEffect } from "react";
import { createClient } from "~/utils/supabase/client";
import { useToast } from "~/hooks/use-toast";

export function useTrendingBookmark(itemId: number, userId?: string) {
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
          .select("saved_trending")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          throw error;
        }

        setIsBookmarked(
          Array.isArray(data?.saved_trending) &&
            data.saved_trending.includes(itemId),
        );
      } catch (error) {
        console.error("Error checking trending bookmark status:", error);
      } finally {
        setIsLoading(false);
      }
    }

    void checkBookmarkStatus();
  }, [itemId, userId, supabase]);

  const toggleBookmark = async () => {
    if (!userId) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to bookmark content",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Get current saved trending items
      const { data: profileData, error: fetchError } = await supabase
        .from("profiles")
        .select("saved_trending")
        .eq("id", userId)
        .single();

      if (fetchError) {
        console.error("Error fetching profile data:", fetchError);
        throw fetchError;
      }

      // Get current saved items or initialize empty array
      const currentSavedItems: number[] = Array.isArray(
        profileData?.saved_trending,
      )
        ? profileData.saved_trending
        : [];

      // Update saved items
      const newSavedItems = isBookmarked
        ? currentSavedItems.filter((id) => id !== itemId)
        : [...currentSavedItems, itemId];

      // Update the profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          saved_trending: newSavedItems,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        throw updateError;
      }

      setIsBookmarked(!isBookmarked);
      toast({
        title: isBookmarked ? "Bookmark removed" : "Content bookmarked",
        description: isBookmarked
          ? "Item removed from your saved trending content"
          : "Item saved to your profile",
      });
    } catch (error) {
      console.error("Error toggling trending bookmark:", error);
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
