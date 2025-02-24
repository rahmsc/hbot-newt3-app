"use client"

import { ChevronDown, X, Search } from "lucide-react"
import * as React from "react"
import { cn } from "~/lib/utils"
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area"
import type { CategoryWithConditions } from "~/utils/supabase/articles/getCategoryWithConditions"

interface FilterNavProps {
  categoriesWithConditions: CategoryWithConditions[]
  onConditionsSelect: (conditionIds: number[]) => void
  selectedConditions: number[]
  isLatestView?: boolean
}

export function FilterNav({
  categoriesWithConditions,
  onConditionsSelect,
  selectedConditions,
  isLatestView = true,
}: FilterNavProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null)
  const [localSelectedCondition, setLocalSelectedCondition] = React.useState<number | null>(
    selectedConditions[0] ?? null,
  )

  // Group categories and conditions
  const categories = React.useMemo(() => {
    return categoriesWithConditions.reduce(
      (acc, item) => {
        if (!acc.some((category) => category.id === item.category_id)) {
          acc.push({
            id: item.category_id,
            name: item.category_name,
            conditions: categoriesWithConditions
              .filter((c) => c.category_id === item.category_id)
              .map((c) => ({
                id: c.condition_id,
                name: c.condition_name,
              })),
          })
        }
        return acc
      },
      [] as Array<{
        id: number
        name: string
        conditions: Array<{ id: number; name: string }>
      }>,
    )
  }, [categoriesWithConditions])

  const handleCategoryClick = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      // If clicking the same category, close it and clear condition
      setSelectedCategory(null)
      setLocalSelectedCondition(null)
      onConditionsSelect([])
    } else {
      // If clicking a new category, select it and clear previous condition
      setSelectedCategory(categoryId)
      setLocalSelectedCondition(null)
      onConditionsSelect([])
    }
  }

  const handleConditionClick = (conditionId: number) => {
    const newCondition = localSelectedCondition === conditionId ? null : conditionId
    setLocalSelectedCondition(newCondition)
    onConditionsSelect(newCondition ? [newCondition] : [])
  }

  const clearFilters = () => {
    setLocalSelectedCondition(null)
    onConditionsSelect([])
    setSelectedCategory(null)
  }

  const selectedCategoryConditions = React.useMemo(() => {
    return selectedCategory ? (categories.find((category) => category.id === selectedCategory)?.conditions ?? []) : []
  }, [categories, selectedCategory])

  // Sync local state with props
  React.useEffect(() => {
    if (selectedConditions.length === 0) {
      setLocalSelectedCondition(null)
    } else if (selectedConditions[0] !== localSelectedCondition) {
      // Ensure we only set the value if it exists
      const firstCondition = selectedConditions[0]
      setLocalSelectedCondition(firstCondition ?? null)
    }
  }, [selectedConditions, localSelectedCondition])

  return (
    <div className="sticky top-0 z-45 w-full bg-[#FAF7F4]">
      {/* Categories Row */}
      <div className="mx-auto w-full px-6 sm:px-12 lg:px-16">
        <div className="flex items-center gap-4 py-2">
          <div className="shrink-0 text-sm text-gray-500">Filter by:</div>
          <ScrollArea className="w-full">
            <div className="flex items-center space-x-3">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={cn(
                    "group flex items-center gap-1.5 whitespace-nowrap rounded-full border px-6 py-1.5 text-sm font-medium transition-all hover:bg-gray-100",
                    selectedCategory === category.id
                      ? "border-emerald-600 bg-emerald-50 text-[#2B5741]"
                      : "border-gray-300 bg-transparent text-gray-600",
                  )}
                >
                  {category.name}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      selectedCategory === category.id && "rotate-180",
                    )}
                  />
                </button>
              ))}
              {localSelectedCondition && (
                <button
                  type="button"
                  className="ml-2 flex items-center whitespace-nowrap rounded-full border border-gray-300 px-6 py-1.5 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100"
                  onClick={clearFilters}
                >
                  Clear
                  <X className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>
      </div>

      {/* Conditions Row */}
      <div className={cn("border-t border-gray-200", !selectedCategory && "hidden")}>
        <div className="mx-auto w-full px-6 sm:px-12 lg:px-16">
          <ScrollArea className="w-full py-1">
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex h-8 w-8 items-center justify-center">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              {selectedCategoryConditions.map((condition) => (
                <button
                  type="button"
                  key={condition.id}
                  onClick={() => handleConditionClick(condition.id)}
                  className={cn(
                    "flex items-center whitespace-nowrap rounded-full border px-6 py-1 text-sm font-medium transition-all hover:bg-gray-100",
                    localSelectedCondition === condition.id
                      ? "border-emerald-300 bg-emerald-50 text-[#2B5741]"
                      : "border-gray-300 bg-transparent text-gray-600 hover:border-gray-400",
                  )}
                >
                  {condition.name}
                </button>
              ))}
              {selectedCategoryConditions.length === 0 && (
                <div className="text-sm text-gray-500">No conditions available for this category.</div>
              )}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

