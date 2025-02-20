import { createClient } from "@supabase/supabase-js";
import { ChambersGrid } from "~/components/chambers/chambers-grid";
import { ResearchCategories } from "~/components/chambers/research-categories";
import { TrustedPartners } from "~/components/chambers/trusted-partners";
import { WhyWorkSection } from "~/components/chambers/why-work-with-us";

export const revalidate = 3600; // Revalidate every hour

export default async function ChambersPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );

  const { data: chambers, error } = await supabase
    .from("chamber_products")
    .select("*")
    .order('id');

  if (error) {
    console.error("Error fetching chambers:", error);
    return <div>Error loading chambers</div>;
  }

  // Log the number of chambers for debugging
  console.log(`Fetched ${chambers?.length} chambers`);

  // Add error boundary for empty data
  if (!chambers || chambers.length === 0) {
    return <div>No chambers found</div>;
  }

  return (
    <main className="min-h-screen bg-[#FAF7F4]">
      <div className="container mx-auto space-y-16 py-4">
        <ChambersGrid chambers={chambers} />
        <WhyWorkSection />
        <TrustedPartners />
        <ResearchCategories />
      </div>
    </main>
  );
}
