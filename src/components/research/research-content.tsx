"use client"

import { Menu, X, Search } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import { Input } from "~/components/ui/input"
import { cn } from "~/lib/utils"

import type { ConditionIdArticlesProps } from "~/utils/supabase/articles/getArticlesByCondition"
import getArticlesByCondition from "~/utils/supabase/articles/getArticlesByCondition"

import { Button } from "../ui/button"
import { ArticlePreview } from "./article-preview"
import { ArticlesList } from "./articles-list"
import { Sidebar } from "./sidebar"
import { Badge } from "../ui/badge"

interface GroupedCategory {
  categoryId: number
  categoryName: string
  conditions: {
    id: number
    name: string
    articleCount?: number
  }[]
}

interface ResearchContentProps {
  categories: GroupedCategory[]
  initialSelectedCategory?: number | null
  initialSelectedCondition?: number | null
  initialSidebarOpen?: boolean
  isMobile?: boolean
}

export function ResearchContent({
  categories,
  initialSelectedCategory,
  initialSelectedCondition,
  initialSidebarOpen = true,
  isMobile = false,
}: ResearchContentProps) {
  const [updatedCategories, setCategories] = useState(categories)
  const [selectedConditionId, setSelectedConditionId] = useState<number | null>(null)
  const [openCategory, setOpenCategory] = useState<string | undefined>(undefined)
  const [hoveredArticle, setHoveredArticle] = useState<ConditionIdArticlesProps | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [articles, setArticles] = useState<ConditionIdArticlesProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState("")
  const [mobileSearchQuery, setMobileSearchQuery] = useState("")

  const fetchArticles = useCallback(
    async (conditionId: number) => {
      setIsLoading(true)
      setError(null)
      try {
        const fetchedArticles = await getArticlesByCondition(conditionId)

        if (fetchedArticles && fetchedArticles.length > 0) {
          setArticles(fetchedArticles)
          setHoveredArticle(fetchedArticles[0] ?? null)
        } else {
          setCategories((prevCategories) =>
            prevCategories
              .map((category) => ({
                ...category,
                conditions: category.conditions.filter((condition) => condition.id !== conditionId),
              }))
              .filter((category) => category.conditions.length > 0),
          )

          const firstAvailableCondition = categories
            .flatMap((cat) => cat.conditions)
            .find((cond) => cond.id !== conditionId)

          if (firstAvailableCondition) {
            setSelectedConditionId(firstAvailableCondition.id)
          }

          setArticles([])
          setHoveredArticle(null)
        }
      } catch (error) {
        console.error("Error fetching articles:", error)
        setError("Failed to fetch articles. Please try again.")
        setArticles([])
        setHoveredArticle(null)
      } finally {
        setIsLoading(false)
      }
    },
    [categories],
  )

  useEffect(() => {
    if (selectedConditionId !== null) {
      void fetchArticles(selectedConditionId)
    }
  }, [selectedConditionId, fetchArticles])

  const handleArticleHover = (article: ConditionIdArticlesProps | null) => {
    setHoveredArticle(article)
  }

  const selectedCondition = categories
    .flatMap((category) => category.conditions)
    .find((condition) => condition.id === selectedConditionId)

  const handleSearchSuggestion = (term: string) => {
    setIsSidebarOpen(true)
    setSidebarSearchQuery(term)
    setMobileSearchQuery(term)

    const matchingCondition = categories
      .flatMap((category) => category.conditions)
      .find((condition) => condition.name.toLowerCase() === term.toLowerCase())

    if (matchingCondition) {
      setSelectedConditionId(matchingCondition.id)

      const parentCategory = categories.find((category) =>
        category.conditions.some((condition) => condition.id === matchingCondition.id),
      )
      if (parentCategory) {
        setOpenCategory(parentCategory.categoryId.toString())
      }
    }
  }

  const handleConditionSelect = (id: number | null) => {
    setSelectedConditionId(id)
    if (id === null) {
      setIsSidebarOpen(true)
    }
    setIsMobileMenuOpen(false)
  }

  const handleMobileSearch = (value: string) => {
    setMobileSearchQuery(value)
    setSidebarSearchQuery(value)

    // Find matching condition as user types
    const matchingCondition = categories
      .flatMap((category) => category.conditions)
      .find((condition) => condition.name.toLowerCase().includes(value.toLowerCase()))

    if (matchingCondition) {
      setSelectedConditionId(matchingCondition.id)
      const parentCategory = categories.find((category) =>
        category.conditions.some((condition) => condition.id === matchingCondition.id),
      )
      if (parentCategory) {
        setOpenCategory(parentCategory.categoryId.toString())
      }
    }
  }

  return (
    <div className="relative flex h-[calc(100vh-127px)] overflow-hidden rounded-lg border border-gray-200 shadow-md">
      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute left-4 top-2 z-50 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <Sidebar
              categories={categories}
              isSidebarOpen={true}
              selectedConditionId={selectedConditionId}
              openCategory={openCategory}
              onCategoryChange={setOpenCategory}
              onConditionSelect={handleConditionSelect}
              onSidebarToggle={() => setIsMobileMenuOpen(false)}
              searchQuery={sidebarSearchQuery}
              onSearchChange={setSidebarSearchQuery}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          categories={categories}
          isSidebarOpen={isSidebarOpen}
          selectedConditionId={selectedConditionId}
          openCategory={openCategory}
          onCategoryChange={setOpenCategory}
          onConditionSelect={handleConditionSelect}
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          searchQuery={sidebarSearchQuery}
          onSearchChange={setSidebarSearchQuery}
        />
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Collapsed state header - Show on desktop when sidebar is closed */}
        <div
          className={cn(
            "absolute left-0 top-0 z-50 flex h-[48px] items-center gap-2 px-4 transition-all duration-300",
            isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </Button>

          {selectedCondition && (
            <Badge variant="outline" className="gap-1 border-emerald-700 text-emerald-700">
              {selectedCondition.name}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation()
                  handleConditionSelect(null)
                  setSidebarSearchQuery("")
                  setArticles([])
                  setHoveredArticle(null)
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>

        <div className="grid h-full md:grid-cols-2 gap-2 p-2">
          {/* Articles Column */}
          <div className="flex h-full flex-col overflow-hidden">
            {/* Spacer when header is visible */}
            {!isSidebarOpen && <div className="h-[24px] shrink-0" />}

            {/* Articles List Container */}
            <div className="flex-1 overflow-hidden rounded-lg shadow-sm">
              <div className="h-full overflow-auto">
                <ArticlesList
                  articles={articles}
                  isLoading={isLoading}
                  onArticleHover={handleArticleHover}
                  onSearchSuggestionClick={handleSearchSuggestion}
                />
              </div>
            </div>
          </div>

          {/* Article Preview - Hidden on mobile */}
          <div className={cn("h-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-sm",
            isMobile ? "hidden" : "block"
          )}>
            <ArticlePreview article={hoveredArticle} />
          </div>
        </div>
      </div>
    </div>
  )
}

