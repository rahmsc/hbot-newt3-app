"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { MapIcon, ListIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"

import { ProviderHeader } from "~/components/providers/provider-header"
import { type FilterValues, ProviderFilters } from "~/components/providers/provider-filters"
import { ProviderList, providers } from "~/components/providers/provider-list"

const HyperbaricLocator = dynamic(() => import("~/components/map/hyperbaric-locator"), {
  ssr: false,
  loading: () => (
    <Card>
      <CardContent className="p-0">
        <div className="h-[calc(100vh-200px)] md:h-[600px]">
          <Skeleton className="h-full w-full" />
        </div>
      </CardContent>
    </Card>
  ),
})

export default function ProvidersPage() {
  const [filteredProviders, setFilteredProviders] = useState(providers)
  const [view, setView] = useState<"map" | "list">("map")

  const handleFilterChange = (filters: FilterValues) => {
    const filtered = providers.filter((provider) => {
      const chamberTypeMatch = filters.chambers.length === 0 || filters.chambers.includes(provider.type)
      const pressureMatch = filters.pressure.length === 0 || filters.pressure.includes(provider.pressure)
      return chamberTypeMatch && pressureMatch
    })
    setFilteredProviders(filtered)
  }

  return (
    <main className="min-h-screen bg-[#FAF7F4]">
      <ProviderHeader />
      
      {/* Mobile Navigation Bar - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 md:hidden">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant={view === "map" ? "default" : "ghost"}
            size="lg"
            onClick={() => setView("map")}
            className="flex-1"
          >
            <MapIcon className="mr-2 h-5 w-5" />
            Map
          </Button>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="lg"
            onClick={() => setView("list")}
            className="flex-1"
          >
            <ListIcon className="mr-2 h-5 w-5" />
            List
          </Button>
        </div>
      </div>

      <div className="container mx-auto pb-20 md:pb-8">
        {/* Map View */}
        <section 
          className={`transition-all duration-300 ${
            view === "list" ? "hidden md:block" : "block"
          }`}
        >
          <div className="relative mt-4">
            <HyperbaricLocator />
          </div>
        </section>

        {/* List View */}
        <section 
          className={`space-y-8 p-4 transition-all duration-300 ${
            view === "map" ? "hidden md:block" : "block"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-['Raleway'] text-xl sm:text-3xl font-medium tracking-[0.2em] text-gray-900">
              ALL PROVIDERS
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[300px,1fr]">
            {/* Desktop Filters Only */}
            <div className="hidden lg:block">
              <ProviderFilters onFilterChange={handleFilterChange} />
            </div>
            <ProviderList providers={filteredProviders} />
          </div>
        </section>
      </div>
    </main>
  )
}

