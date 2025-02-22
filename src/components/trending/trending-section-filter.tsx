"use client"

import { Button } from "~/components/ui/button"

interface TrendingFilterProps {
  onFilterChange: (filter: "all" | "blogs" | "guides" | "latest") => void
}

export function TrendingFilter({ onFilterChange }: TrendingFilterProps) {
  return (
    <div className="flex w-full flex-wrap gap-2 sm:w-auto">
      <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => onFilterChange("all")}>
        All
      </Button>
      <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => onFilterChange("blogs")}>
        Blogs
      </Button>
      <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => onFilterChange("guides")}>
        Guides
      </Button>
      <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => onFilterChange("latest")}>
        Latest
      </Button>
    </div>
  )
}

