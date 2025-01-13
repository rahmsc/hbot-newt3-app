import { ChambersGrid } from "~/components/new-landing/components/chambers/chambers-grid";
import { ResearchCategories } from "~/components/new-landing/components/chambers/research-categories";
import { TrustedPartners } from "~/components/new-landing/components/chambers/trusted-partners";
import { WhyWorkSection } from "~/components/new-landing/components/chambers/why-work-with-us";
// import { BenefitsSection } from "~/components/chambers/ui/benefits-section";
// import { ResearchSection } from "~/components/chambers/ui/research-section";
// import { NewsletterSignup } from "~/components/chambers/ui/newsletter-signup";

export default function ChambersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-3xl font-bold">Chamber range</h1>
        <ChambersGrid />
        <WhyWorkSection />
        <TrustedPartners />
        <ResearchCategories />
        {/* <BenefitsSection />
        <ResearchSection />
        <NewsletterSignup /> */}
      </div>
    </main>
  );
}
