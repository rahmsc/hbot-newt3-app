import { createClient } from "@supabase/supabase-js"
import { ChambersGrid } from "~/components/chambers/chambers-grid"
import { ResearchCategories } from "~/components/chambers/research-categories"
import { TrustedPartners } from "~/components/chambers/trusted-partners"
import { WhyWorkSection } from "~/components/chambers/why-work-with-us"

export const revalidate = 3600 // Revalidate every hour

export default async function ChambersPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  )

  const { data: chambers, error } = await supabase.from("chamber_products").select("*").order("id")

  if (error) {
    console.error("Error fetching chambers:", error)
    return <div>Error loading chambers</div>
  }

  if (!chambers || chambers.length === 0) {
    return <div>No chambers found</div>
  }

  return (
    <div className="w-full bg-[#FAF7F4]">
      <div className="container mx-auto pt-2">
        <div className="space-y-2 md:space-y-12 lg:space-y-16">
          <ChambersGrid chambers={chambers} />
          <WhyWorkSection />
          <TrustedPartners />
          <ResearchCategories />
        </div>
      </div>
    </div>
  )
}

