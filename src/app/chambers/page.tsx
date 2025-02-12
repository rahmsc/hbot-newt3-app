import { ChambersGrid } from "~/components/chambers/chambers-grid";
import { ResearchCategories } from "~/components/chambers/research-categories";
import { TrustedPartners } from "~/components/chambers/trusted-partners";
import { WhyWorkSection } from "~/components/chambers/why-work-with-us";
import { combinedChamberData } from "~/data/combinedChambersData";

export default function ChambersPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F4]">
      <div className="container mx-auto space-y-16 py-4">
        <ChambersGrid chambers={combinedChamberData} />
        <WhyWorkSection />
        <TrustedPartners />
        <ResearchCategories />
      </div>
    </main>
  );
}
