import { ResearchContent } from "~/components/research/research-content";
import { getArticleCountsByCondition } from "~/utils/supabase/articles/getArticleCountsByCondition";
import getArticlesByCondition from "~/utils/supabase/articles/getArticlesByCondition";
import { getCategoryWithConditions } from "~/utils/supabase/articles/getCategoryWithConditions";

interface GroupedCategory {
  categoryId: number;
  categoryName: string;
  conditions: {
    id: number;
    name: string;
    articleCount?: number;
  }[];
}

interface Props {
  searchParams: { 
    selectedCategory?: string;
    condition?: string;
  };
}

export const dynamic = 'force-dynamic'

export default async function ResearchPage({ searchParams }: Props) {
  try {
    const categoriesAndConditions = await getCategoryWithConditions();
    const articleCounts = await getArticleCountsByCondition();

    const selectedCategoryId = searchParams.selectedCategory
      ? Number.parseInt(searchParams.selectedCategory)
      : undefined;
    
    const selectedConditionId = searchParams.condition
      ? Number.parseInt(searchParams.condition)
      : undefined;

    if (!Array.isArray(categoriesAndConditions)) {
      throw new Error(
        "Categories and conditions data is not in expected format",
      );
    }

    const groupedCategories: GroupedCategory[] = categoriesAndConditions.reduce(
      (acc: GroupedCategory[], curr) => {
        if (
          !curr.category_id ||
          !curr.category_name ||
          !curr.condition_id ||
          !curr.condition_name
        ) {
          console.warn("Missing required fields in category/condition:", curr);
          return acc;
        }

        const existingCategory = acc.find(
          (category) => category.categoryId === curr.category_id,
        );

        if (existingCategory) {
          if (
            !existingCategory.conditions.some(
              (cond) => cond.id === curr.condition_id,
            )
          ) {
            existingCategory.conditions.push({
              id: curr.condition_id,
              name: curr.condition_name,
              articleCount: articleCounts[curr.condition_id] ?? 0,
            });
          }
          return acc;
        }

        acc.push({
          categoryId: curr.category_id,
          categoryName: curr.category_name,
          conditions: [
            {
              id: curr.condition_id,
              name: curr.condition_name,
              articleCount: articleCounts[curr.condition_id] ?? 0,
            },
          ],
        });
        return acc;
      },
      [],
    );

    if (!groupedCategories.length) {
      console.warn("No categories were processed");
      return (
        <div className="flex h-96 items-center justify-center text-gray-500">
          No research categories available.
        </div>
      );
    }

    // Update initial articles fetch to use the condition from URL if available
    const initialConditionId = selectedConditionId ?? 
      (selectedCategoryId ? groupedCategories.find(cat => cat.categoryId === selectedCategoryId)?.conditions[0]?.id : null) ?? 
      groupedCategories[0]?.conditions[0]?.id ?? 
      null;

    const initialArticles = initialConditionId
      ? await getArticlesByCondition(initialConditionId)
      : [];

    return (
      <div className="w-full">
        <ResearchContent
          categories={groupedCategories}
          initialSelectedCategory={selectedCategoryId}
          initialSelectedCondition={selectedConditionId}
          initialSidebarOpen={false}
        />
      </div>
    );
  } catch (error) {
    console.error("Detailed error in ResearchPage:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return (
      <div className="flex h-96 items-center justify-center text-gray-500">
        An error occurred while loading the research data. Please try again
        later.
      </div>
    );
  }
}
