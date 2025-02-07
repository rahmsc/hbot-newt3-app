"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "~/utils/supabase/client";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

interface SavedArticlesProps {
  userId: string;
}

export function SavedArticles({ userId }: SavedArticlesProps) {
  const [savedArticles, setSavedArticles] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchSavedArticles = async () => {
      const { data, error } = await supabase
        .from("saved_articles")
        .select("*, articles(*)")
        .eq("user_id", userId);

      if (!error && data) {
        setSavedArticles(data);
      }
    };

    void fetchSavedArticles();
  }, [userId, supabase]);

  return (
    <div className="grid grid-cols-1 gap-6">
      {savedArticles.map((item) => (
        <Card
          key={item.id}
          className="flex overflow-hidden border-none bg-white shadow-md"
        >
          <div className="relative h-48 w-1/3">
            <Image
              src={item.articles.image_url || "/placeholder.jpg"}
              alt={item.articles.title}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {item.articles.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                {item.articles.excerpt}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                variant="default"
                className="bg-emerald-700 hover:bg-emerald-800"
              >
                Read More
              </Button>
              <Button
                variant="outline"
                className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
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
