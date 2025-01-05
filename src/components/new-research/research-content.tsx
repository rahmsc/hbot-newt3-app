"use client";

import { useState, useEffect } from "react";
import { ArticlesList } from "./articles-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { conditions } from "~/data/researchDataDemo";
import getArticlesByCondition, {
  type ConditionIdArticlesProps,
} from "~/utils/supabase/getArticlesByCondition";

export interface ResearchContentProps {
  categories: {
    categoryId: number;
    categoryName: string;
    conditions: {
      id: number;
      name: string;
    }[];
  }[];
}

export default function ResearchContent({ categories }: ResearchContentProps) {
  const [selectedConditionId, setSelectedConditionId] = useState<number | null>(
    null,
  );
  const [openCategory, setOpenCategory] = useState<string | undefined>(
    undefined,
  );
  const [articles, setArticles] = useState<ConditionIdArticlesProps[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Only fetch if we have a valid condition ID
        if (selectedConditionId !== null) {
          const fetchedArticles =
            await getArticlesByCondition(selectedConditionId);
          setArticles(fetchedArticles);
        } else {
          // Reset articles when no condition is selected
          setArticles([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]); // Reset articles on error
      }
    };

    void fetchArticles();
  }, [selectedConditionId]);

  return (
    <div className="flex flex-col gap-16">
      <div className="grid gap-8 md:grid-cols-[400px,1fr]">
        <div className="sticky top-32">
          <Accordion
            type="single"
            collapsible
            value={openCategory}
            onValueChange={setOpenCategory}
            className="mx-auto w-full max-w-3xl"
          >
            {categories.map((category) => (
              <AccordionItem
                key={category.categoryId}
                value={category.categoryId.toString()}
              >
                <AccordionTrigger className="text-xl hover:no-underline">
                  <div className="flex w-full items-center justify-between pr-4">
                    <span>{category.categoryName}</span>
                    <span className="text-sm text-gray-500">
                      {category.conditions.length}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 p-2">
                    {category.conditions.map((condition) => (
                      <Button
                        key={condition.id}
                        variant="ghost"
                        className={`w-full justify-start rounded-lg p-2 text-left transition-all duration-200 hover:bg-slate-100 ${
                          condition.id === selectedConditionId
                            ? "bg-slate-100 text-lg font-bold"
                            : "text-base font-normal"
                        }`}
                        onClick={() => setSelectedConditionId(condition.id)}
                      >
                        {condition.name}
                      </Button>
                    ))}
                    {(() => {
                      const matchingArticlesCount = category.conditions.filter(
                        (condition, i) =>
                          condition.id === articles[i]?.condition_id,
                      ).length;
                      return null;
                    })()}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <ArticlesList selectedConditionId={selectedConditionId} />
      </div>
    </div>
  );
}
