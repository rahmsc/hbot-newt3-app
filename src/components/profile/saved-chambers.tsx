"use client";

import { useEffect, useState } from "react";
import { createClient } from "~/utils/supabase/client";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";

interface Chamber {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface SavedChambersProps {
  userId: string;
}

export function SavedChambers({ userId }: SavedChambersProps) {
  const [savedChambers, setSavedChambers] = useState<Chamber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchSavedChambers() {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("saved_chambers")
        .select(
          `
          chamber_id,
          chambers (
            id,
            name,
            description,
            price,
            image_url
          )
        `,
        )
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching saved chambers:", error);
        setError("Failed to load saved chambers. Please try again later.");
      } else {
        setSavedChambers(
          data.map((item) => item.chambers as unknown as Chamber),
        );
      }

      setIsLoading(false);
    }

    fetchSavedChambers();
  }, [userId, supabase]);

  const handleRemove = async (chamberId: string) => {
    const { error } = await supabase
      .from("saved_chambers")
      .delete()
      .eq("user_id", userId)
      .eq("chamber_id", chamberId);

    if (error) {
      console.error("Error removing saved chamber:", error);
      setError("Failed to remove chamber. Please try again.");
    } else {
      setSavedChambers(
        savedChambers.filter((chamber) => chamber.id !== chamberId),
      );
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (savedChambers.length === 0) {
    return (
      <div className="text-center text-gray-500">No saved chambers found.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {savedChambers.map((chamber) => (
        <Card key={chamber.id}>
          <CardHeader>
            <CardTitle>{chamber.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={chamber.image_url || "/placeholder.svg"}
              alt={chamber.name}
              className="mb-2 h-32 w-full object-cover"
            />
            <p className="line-clamp-2 text-sm text-gray-600">
              {chamber.description}
            </p>
            <p className="mt-2 font-semibold">${chamber.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/chambers/${chamber.id}`}>View Details</Link>
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleRemove(chamber.id)}
            >
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
