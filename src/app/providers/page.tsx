"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { MapIcon, ListIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"

import { ProviderHeader } from "~/components/providers/provider-header"
import { type FilterValues, ProviderFilters } from "~/components/providers/provider-filters"
import { ProviderList, providers } from "~/components/providers/provider-list"

const HyperbaricLocator = dynamic(() => import("~/components/map/hyperbaric-locator"), {
  ssr: false,
  loading: () => (
    <Card>
      <CardContent className="p-0">
        <div className="h-[400px] lg:h-[600px]">
          <Skeleton className="h-full w-full" />
        </div>
      </CardContent>
    </Card>
  ),
})

export default function ProvidersPage() {
  const [filteredProviders, setFilteredProviders] = useState(providers)
  const [view, setView] = useState<"map" | "list">("map")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleFilterChange = (filters: FilterValues) => {
    const filtered = providers.filter((provider) => {
      const chamberTypeMatch = filters.chambers.length === 0 || filters.chambers.includes(provider.type)
      const pressureMatch = filters.pressure.length === 0 || filters.pressure.includes(provider.pressure)
      return chamberTypeMatch && pressureMatch
    })
    setFilteredProviders(filtered)
    setIsFilterOpen(false) // Close filter sheet after applying
  }

  return (
    <>
      <ProviderHeader />
      <main>
        <div className="bg-[#FAF7F4]">
          <div className="container mx-auto space-y-8 py-8">
            {/* Mobile View Toggle */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-[#FAF7F4] p-4 md:hidden">
              <div className="flex rounded-lg border bg-white p-1">
                <Button
                  variant={view === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("map")}
                  className="flex-1"
                >
                  <MapIcon className="mr-2 h-4 w-4" />
                  Map
                </Button>
                <Button
                  variant={view === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("list")}
                  className="flex-1"
                >
                  <ListIcon className="mr-2 h-4 w-4" />
                  List
                </Button>
              </div>

              {/* Mobile Filters */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <ProviderFilters onFilterChange={handleFilterChange} />
                </SheetContent>
              </Sheet>
            </div>

            {/* Map Section */}
            <section className={view === "list" ? "hidden md:block" : "block"}>
              <div className="relative">
                <HyperbaricLocator />
                {/* Optional: Add a "View List" button overlay on the map for mobile */}
                <Button
                  variant="default"
                  size="sm"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 transform md:hidden"
                  onClick={() => setView("list")}
                >
                  View List
                </Button>
              </div>
            </section>

            {/* List Section */}
            <section className={`space-y-8 ${view === "map" ? "hidden md:block" : "block"}`}>
              <div className="flex items-center justify-between">
                <h2 className="font-['Raleway'] text-xl sm:text-3xl font-medium tracking-[0.2em] text-gray-900">
                  ALL PROVIDERS
                </h2>
              </div>
              <div className="grid gap-8 lg:grid-cols-[300px,1fr]">
                {/* Desktop Filters - Hidden on mobile */}
                <div className="hidden lg:block">
                  <ProviderFilters onFilterChange={handleFilterChange} />
                </div>
                <ProviderList providers={filteredProviders} />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

