import { ResearchContent } from "~/components/research/research-content";
import { getArticleCountsByCondition } from "~/utils/supabase/getArticleCountsByCondition";
import { getCategoryWithConditions } from "~/utils/supabase/getCategoryWithConditions";

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
  searchParams: { selectedCategory?: string };
}

export default async function ResearchPage({ searchParams }: Props) {
  const categoriesAndConditions = await getCategoryWithConditions();
  const articleCounts = await getArticleCountsByCondition();
  const selectedCategoryId = searchParams.selectedCategory
    ? Number.parseInt(searchParams.selectedCategory)
    : undefined;

  const groupedCategories: GroupedCategory[] = categoriesAndConditions.reduce(
    (acc: GroupedCategory[], curr) => {
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
            articleCount: articleCounts[curr.condition_id] || 0,
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
            articleCount: articleCounts[curr.condition_id] || 0,
          },
        ],
      });
      return acc;
    },
    [],
  );

  return (
    <div className="container">
      <ResearchContent
        categories={groupedCategories}
        initialSelectedCategory={selectedCategoryId}
      />
    </div>
  );
}
