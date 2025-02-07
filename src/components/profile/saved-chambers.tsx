"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "~/utils/supabase/client";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

interface SavedChambersProps {
  userId: string;
}

export function SavedChambers({ userId }: SavedChambersProps) {
  const [savedChambers, setSavedChambers] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchSavedChambers = async () => {
      const { data, error } = await supabase
        .from("saved_chambers")
        .select("*, chambers(*)")
        .eq("user_id", userId);

      if (!error && data) {
        setSavedChambers(data);
      }
    };

    void fetchSavedChambers();
  }, [userId, supabase]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {savedChambers.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden border-none bg-white shadow-md"
        >
          <CardContent className="p-0">
            <div className="relative h-48 w-full">
              <Badge className="absolute right-2 top-2 z-10 bg-emerald-700">
                SALE
              </Badge>
              <Image
                src={item.chambers.image_url || "/placeholder.jpg"}
                alt={item.chambers.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.chambers.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {item.chambers.description}
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
