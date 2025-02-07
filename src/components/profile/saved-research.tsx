"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { createClient } from "~/utils/supabase/client";

interface SavedResearchProps {
  userId: string;
}

export function SavedResearch({ userId }: SavedResearchProps) {
  const [savedResearch, setSavedResearch] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchSavedResearch = async () => {
      const { data, error } = await supabase
        .from("saved_research")
        .select("*, research(*)")
        .eq("user_id", userId);

      if (!error && data) {
        setSavedResearch(data);
      }
    };

    void fetchSavedResearch();
  }, [userId, supabase]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {savedResearch.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden border-none bg-white shadow-md"
        >
          <CardContent className="p-0">
            <div className="relative h-48 w-full">
              <Image
                src={item.research.image_url || "/placeholder.jpg"}
                alt={item.research.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.research.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {item.research.description}
              </p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="default"
                  className="bg-emerald-700 hover:bg-emerald-800"
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                >
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
