"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "~/utils/supabase/client";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useToast } from "~/hooks/use-toast";
import { Badge } from "~/components/ui/badge";
import type { BlogDbEntry } from "~/types/blog";
import { useTrendingBookmark } from "~/hooks/use-trending-bookmark";

interface SavedTrendingItemProps {
  item: BlogDbEntry;
  userId: string;
}

function SavedTrendingItem({ item, userId }: SavedTrendingItemProps) {
  const category = item.category.toLowerCase();
  const { isBookmarked, isLoading, toggleBookmark } = useTrendingBookmark(
    item.blog_id,
    userId,
  );

  return (
    <Card className="flex overflow-hidden border-none bg-white shadow-md">
      <div className="relative w-1/3">
        <Image
          src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/${item.blog_id}_1.png`}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Badge
              className={`font-mono text-xs uppercase tracking-wider text-white ${
                category === "blog"
                  ? "bg-[#2B5741] hover:bg-emerald-800"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
              variant="secondary"
            >
              {item.category}
            </Badge>
            <p className="text-xs text-gray-500">
              {new Date(item.publish_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
          <p className="mt-2 text-xs text-gray-500">By {item.author}</p>
        </div>
        <div className="mt-4 flex gap-2">
          <Link href={`/${category}/${item.url_slug}`}>
            <Button
              variant="default"
              className="bg-[#2B5741] hover:bg-emerald-800"
            >
              Read More
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-[#2B5741] text-[#2B5741] hover:bg-emerald-50"
            onClick={() => void toggleBookmark()}
            disabled={isLoading}
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface SavedTrendingProps {
  userId: string;
}

export function SavedTrending({ userId }: SavedTrendingProps) {
  const [savedItems, setSavedItems] = useState<BlogDbEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        // First, get the user's saved trending IDs
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("saved_trending")
          .eq("id", userId)
          .single();

        if (profileError) throw profileError;

        const savedIds = profileData.saved_trending || [];

        if (savedIds.length === 0) {
          setIsLoading(false);
          return;
        }

        // Then fetch the actual items
        const { data: items, error: itemsError } = await supabase
          .from("blogs")
          .select("*")
          .in("blog_id", savedIds);

        if (itemsError) throw itemsError;

        setSavedItems(items || []);
      } catch (error) {
        console.error("Error fetching saved trending items:", error);
        toast({
          title: "Error",
          description: "Failed to load saved items",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    void fetchSavedItems();
  }, [userId, supabase, toast]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  if (savedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-center">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          No saved trending content
        </h3>
        <p className="mb-6 text-sm text-gray-500">
          Blogs and guides you save will appear here
        </p>
        <Link href="/trending">
          <Button
            variant="default"
            className="bg-[#2B5741] hover:bg-emerald-800"
          >
            Browse Trending
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {savedItems.map((item) => (
        <SavedTrendingItem key={item.blog_id} item={item} userId={userId} />
      ))}
    </div>
  );
}
