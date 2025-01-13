"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import type { ConditionIdArticlesProps } from "~/utils/supabase/getArticlesByCondition";

import { Button } from "../ui/button";
import { ArticlePreview } from "./article-preview";
import { ArticlesList } from "./articles-list";
import { Sidebar } from "./sidebar";

interface GroupedCategory {
  categoryId: number;
  categoryName: string;
  conditions: {
    id: number;
    name: string;
  }[];
}

interface ResearchContentProps {
  categories: GroupedCategory[];
  initialSelectedCategory?: number;
}

export function ResearchContent({
  categories,
  initialSelectedCategory,
}: ResearchContentProps) {
  const [selectedConditionId, setSelectedConditionId] = useState<number | null>(
    initialSelectedCategory ?? null,
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
    <div className="relative flex h-[calc(100vh-127px)]">
      <Button
        variant="outline"
        size="icon"
        className={`absolute left-0 top-8 z-50 h-8 w-8 rounded-full border-2 border-black bg-white shadow-md transition-all duration-300 ${
          isSidebarOpen ? "left-[380px]" : "left-4"
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <div
        className="relative grid gap-8 transition-all duration-300"
        style={{
          gridTemplateColumns: isSidebarOpen ? "400px 1fr 1fr" : "0px 1fr 1fr",
        }}
      >
        <Sidebar
          categories={categories}
          isSidebarOpen={isSidebarOpen}
          selectedConditionId={selectedConditionId}
          openCategory={openCategory}
          onCategoryChange={setOpenCategory}
          onConditionSelect={setSelectedConditionId}
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Articles List */}
        <div className="h-full overflow-y-auto px-4">
          <ArticlesList
            selectedConditionId={selectedConditionId}
            onArticleHover={handleArticleHover}
          />
        </div>

        {/* Article Preview */}
        <div className="h-full overflow-y-auto rounded-lg border-2 border-black bg-white px-4">
          <ArticlePreview article={hoveredArticle} />
        </div>
      </div>
    </div>
  );
}
