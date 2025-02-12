"use client";

import { useEffect, useState } from "react";
import { createClient } from "~/utils/supabase/client";
import { useDebounce } from "~/hooks/use-debounce";

interface Study {
  id: number;
  heading: string;
  summary: string;
  authors: string;
  condition_name: string;
  image_url: string;
  pressure_used: string;
  number_of_treatments: number;
  published_date: string;
  outcome_rating: string;
}

export function useStudySearch(searchTerm: string) {
  const [studies, setStudies] = useState<Study[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const supabase = createClient();

  useEffect(() => {
    async function performSearch() {
      if (!debouncedSearch.trim()) {
        setStudies([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("studies")
          .select("*")
          .or(
            `heading.ilike.%${debouncedSearch}%,` +
              `authors.ilike.%${debouncedSearch}%,` +
              `summary.ilike.%${debouncedSearch}%`,
          )
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;

        setStudies(data || []);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to perform search");
      } finally {
        setIsLoading(false);
      }
    }

    void performSearch();
  }, [debouncedSearch, supabase]);

  return { studies, isLoading, error };
}
