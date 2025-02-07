import { useEffect, useState } from "react";

import { useAuth } from "~/contexts/AuthContext"; // Adjust this import path as needed
import { createClient } from "~/utils/supabase/client"; // Adjust this import based on your Supabase client setup

export function useBookmark(articleId: string) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    if (user) {
      void checkBookmarkStatus();
    }
  }, [user, articleId]);

  const checkBookmarkStatus = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("saved_articles")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error checking bookmark status:", error);
    } else {
      setIsBookmarked(data.saved_articles.includes(articleId));
    }
  };

  const toggleBookmark = async () => {
    if (!user) return false;

    const { data: currentProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("saved_articles")
      .eq("id", user.id)
      .single();

    if (fetchError) {
      console.error("Error fetching current profile:", fetchError);
      return false;
    }

    let updatedSavedArticles: string[] = [];
    if (isBookmarked) {
      updatedSavedArticles = currentProfile.saved_articles.filter(
        (id: string) => id !== articleId,
      );
    } else {
      updatedSavedArticles = [...currentProfile.saved_articles, articleId];
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ saved_articles: updatedSavedArticles })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating bookmarks:", updateError);
      return false;
    }

    setIsBookmarked(!isBookmarked);
    return true;
  };

  return { isBookmarked, toggleBookmark };
}
