"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArticlesList } from "./articles-list";
import { ArticlePreview } from "./article-preview";
import { Button } from "~/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import type { ConditionIdArticlesProps } from "~/utils/supabase/getArticlesByCondition";

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
  const [hoveredArticle, setHoveredArticle] =
    useState<ConditionIdArticlesProps | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleArticleHover = (article: ConditionIdArticlesProps | null) => {
    setHoveredArticle(article);
  };

  return (
    <div className="flex flex-col gap-16">
      <div
        className="relative grid gap-8 transition-all duration-300"
        style={{
          gridTemplateColumns: isSidebarOpen ? "400px 1fr 1fr" : "0px 1fr 1fr",
        }}
      >
        {/* Sidebar Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-4 top-32 z-50 h-8 w-8 rounded-full border-2 border-black bg-white shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>

        {/* Sidebar Content */}
        <div
          className={`sticky top-32 overflow-hidden transition-all duration-300 ${
            isSidebarOpen ? "w-[400px]" : "w-0"
          }`}
        >
          <Accordion
            type="single"
            collapsible
            value={openCategory}
            onValueChange={setOpenCategory}
            className="w-full divide-y divide-black"
          >
            {categories.map((category) => (
              <AccordionItem
                key={category.categoryId}
                value={category.categoryId.toString()}
                className="border-2 border-black first:rounded-t-md last:rounded-b-md [&:not(:first-child)]:-mt-[2px]"
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex w-full items-center justify-between py-2">
                    <span className="text-base font-medium text-gray-900">
                      {category.categoryName}
                    </span>
                    <span className="rounded-full border-2 border-black bg-white px-2 py-1 text-sm font-medium">
                      {category.conditions.length}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col divide-y divide-gray-200">
                    {category.conditions.map((condition) => (
                      <Button
                        key={condition.id}
                        variant="ghost"
                        className={`w-full justify-start rounded-none px-4 py-3 text-left text-sm hover:bg-gray-50 ${
                          condition.id === selectedConditionId
                            ? "bg-gray-100 font-medium text-gray-900"
                            : "text-gray-600"
                        }`}
                        onClick={() => setSelectedConditionId(condition.id)}
                      >
                        {condition.name}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <ArticlesList
          selectedConditionId={selectedConditionId}
          onArticleHover={handleArticleHover}
        />
        <div className="sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border-2 border-black bg-white shadow-sm">
          <ArticlePreview article={hoveredArticle} />
        </div>
      </div>
    </div>
  );
}
