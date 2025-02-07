import { ChamberCarousel } from "~/components/chambers/chambers-carousel";
import { WhyWorkSection } from "~/components/chambers/why-work-with-us";
import { TrustedPartners } from "~/components/chambers/trusted-partners";
import { ResearchCategories } from "~/components/chambers/research-categories";
import { combinedChamberData } from "~/data/combinedChambersData";

export default function ChambersPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F4]">
      <div className="container mx-auto space-y-8 py-4">
        <div className="space-y-4">
          <h1 className="font-['Raleway'] text-4xl font-medium tracking-[0.3em] text-gray-900">
            CHAMBER RANGE
          </h1>
          <p className="text-xl font-light text-gray-600">
            Explore our curated selection of premium hyperbaric chambers
          </p>
        </div>
        <ChamberCarousel chambers={combinedChamberData} />
        <WhyWorkSection />
        <TrustedPartners />
        <ResearchCategories />
      </div>
    </main>
  );
}
