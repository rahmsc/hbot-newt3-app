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
        <main className="w-full bg-[#FAF7F4]">
          <div className="container mx-auto px-4 py-8"> 
            <div className="flex h-96 items-center justify-center">
              <div className="text-center">
                <p className="text-lg text-gray-600">
                  No research categories available.
                </p>
              </div>
            </div>
          </div>
        </main>
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
      <main className="w-full bg-[#FAF7F4]">
        <div className="container mx-auto py-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full space-y-2 sm:w-auto">
              <h1 className="font-['Raleway'] text-lg sm:text-4xl font-normal tracking-[0.5em] sm:tracking-[0.3em] text-gray-700 text-center sm:text-left">
                RESEARCH
              </h1>
              <p className="text-sm sm:text-xl text-gray-500 text-center sm:text-left">
                Explore our comprehensive collection of hyperbaric research.
              </p>
            </div>
          </div>

          <div className="mt-2">
            <ResearchContent
              categories={groupedCategories}
              initialSelectedCategory={selectedCategoryId}
              initialSelectedCondition={selectedConditionId}
              initialSidebarOpen={false}
            />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Detailed error in ResearchPage:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return (
      <main className="w-full bg-[#FAF7F4]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <p className="text-lg text-gray-600">
                An error occurred while loading the research data.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Please try again later.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
