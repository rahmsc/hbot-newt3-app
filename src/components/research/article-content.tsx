/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

import type { ArticlesProps } from "~/utils/supabase/articles/getArticleById";
import { getConditionWithCategory } from "~/utils/supabase/articles/getConditionWithCategory";

import AccordionTemplate from "../utils/accordion-template";
import ResearchParallaxHeader from "./research-parallax-header";
import RichText from "../utils/rich-text";
import { Button } from "../ui/button";
import { BookmarkIcon } from "lucide-react";
import { useArticleBookmark } from "~/hooks/use-article-bookmark";
import { useAuth } from "~/contexts/auth-context";
import type { RichContent } from "~/types/blog";

interface ArticleContentProps {
  foundArticle: ArticlesProps;
  progress: number;
}

function ArticleContent({ foundArticle, progress }: ArticleContentProps) {
  const [conditionInfo, setConditionInfo] = useState<{
    condition_name: string;
    category_name: string;
  } | null>(null);
  const { user } = useAuth();
  const { isBookmarked, isLoading, toggleBookmark } = useArticleBookmark(
    foundArticle.id,
    user?.id,
  );

  // Fetch condition information
  useEffect(() => {
    const fetchConditionInfo = async () => {
      if (foundArticle.conditionId) {
        try {
          const data = await getConditionWithCategory(
            Number(foundArticle.conditionId),
          );
          if (data) {
            setConditionInfo(data);
          }
        } catch (error) {
          console.error("Error fetching condition info:", error);
        }
      }
    };

    fetchConditionInfo();
  }, [foundArticle.conditionId]);

  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/research-articles/";

  // Calculate the content offset based on progress
  const contentOffset = Math.max(30, (1 - progress) * 100);

  return (
    <div className="relative min-h-screen">
      <ResearchParallaxHeader
        title={foundArticle.heading}
        imageUrl={`${imageUrl}${foundArticle.id}.png`}
        progress={progress}
      />

      {/* Content container with a more stable transform */}
      <div
        className="relative z-30 mx-auto max-w-5xl px-2 transition-transform duration-100 ease-out sm:px-6 lg:px-8"
        style={{
          transform: `translateY(${contentOffset}vh)`,
          opacity: progress > 0.1 ? 1 : 0, // Fade in content only after scrolling starts
        }}
      >
        <div className="rounded-2xl bg-white pb-6 shadow-xl sm:rounded-3xl sm:pb-12">
          <div className="px-3 py-6 sm:px-12 sm:py-12">
            <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-between sm:space-x-8 sm:space-y-0">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm font-bold text-red-600 sm:text-base">
                  CONDITION
                </p>
                <p className="text-sm sm:text-base">
                  {conditionInfo?.condition_name ?? foundArticle.conditionId}
                </p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm font-bold text-red-600 sm:text-base">
                  PRESSURE USED
                </p>
                <p className="text-sm sm:text-base">
                  {foundArticle.pressureUsed}
                </p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm font-bold text-red-600 sm:text-base">
                  # OF SESSIONS
                </p>
                <p className="text-sm sm:text-base">
                  {foundArticle.numberOfTreatments}
                </p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm font-bold text-red-600 sm:text-base">
                  PUBLISHED DATE
                </p>
                <p className="text-sm sm:text-base">
                  {foundArticle.publishedDate &&
                  !Number.isNaN(new Date(foundArticle.publishedDate).getTime())
                    ? format(new Date(foundArticle.publishedDate), "MM/dd/yyyy")
                    : "Date not available"}
                </p>
              </div>
              <div className="col-span-2 flex justify-center sm:col-span-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleBookmark}
                  disabled={isLoading}
                  className={`h-8 w-8 overflow-hidden rounded-full p-1.5 transition-all sm:h-10 sm:w-10 sm:p-2 ${
                    isBookmarked
                      ? "bg-[#2B5741]/20 ring-2 ring-[#2B5741] hover:bg-[#2B5741]/30"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <BookmarkIcon
                    className={`h-4 w-4 transition-colors sm:h-5 sm:w-5 ${
                      isBookmarked
                        ? "fill-[#2B5741] text-[#2B5741]"
                        : "text-gray-600"
                    }`}
                  />
                </Button>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:mt-12 lg:flex-row lg:space-x-8">
              <div className="space-y-6 sm:space-y-8 lg:w-2/3">
                <AccordionTemplate
                  trigger={
                    <h2 className="text-center text-2xl font-semibold sm:text-3xl">
                      Outcome
                    </h2>
                  }
                  content={
                    <RichText
                      content={foundArticle.summary as unknown as RichContent}
                      className="text-sm leading-relaxed text-gray-700 sm:text-base"
                    />
                  }
                  defaultOpen={true}
                />
                <AccordionTemplate
                  trigger={
                    <h2 className="text-2xl font-semibold sm:text-3xl">
                      Introduction
                    </h2>
                  }
                  content={
                    <RichText
                      content={
                        foundArticle.introduction as unknown as RichContent
                      }
                      className="text-sm leading-relaxed text-gray-700 sm:text-base"
                    />
                  }
                />
                <AccordionTemplate
                  trigger={
                    <h2 className="text-2xl font-semibold sm:text-3xl">
                      Results
                    </h2>
                  }
                  content={
                    <RichText
                      content={foundArticle.results as unknown as RichContent}
                      className="text-sm leading-relaxed text-gray-700 sm:text-base"
                    />
                  }
                />
                <AccordionTemplate
                  trigger={
                    <h2 className="text-2xl font-semibold sm:text-3xl">
                      Conclusion
                    </h2>
                  }
                  content={
                    <RichText
                      content={
                        foundArticle.conclusion as unknown as RichContent
                      }
                      className="text-sm leading-relaxed text-gray-700 sm:text-base"
                    />
                  }
                />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0 lg:w-1/3">
                <div className="space-y-4">
                  <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
                    FAQs
                  </h2>
                  <p className="text-sm text-gray-700 sm:text-base">
                    No FAQs available for this article.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleContent;
