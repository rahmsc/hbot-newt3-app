import { ResearchContent } from "~/components/new-research/research-content";
import { getCategoryWithConditions } from "~/utils/supabase/getCategoryWithConditions";

interface GroupedCategory {
  categoryId: number;
  categoryName: string;
  conditions: {
    id: number;
    name: string;
  }[];
}

export default async function ResearchPage() {
  const categoriesAndConditions = await getCategoryWithConditions();

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
          },
        ],
      });
      return acc;
    },
    [],
  );

  return (
    <div className="container mx-auto px-4 pt-32">
      <ResearchContent categories={groupedCategories} />
    </div>
  );
}
