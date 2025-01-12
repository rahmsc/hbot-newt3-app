import { ChambersGrid } from "~/components/new-landing/components/chambers/chambers-grid";

// import { BenefitsSection } from "~/components/chambers/ui/benefits-section";
// import { ResearchSection } from "~/components/chambers/ui/research-section";
// import { NewsletterSignup } from "~/components/chambers/ui/newsletter-signup";

export default function ChambersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-3xl font-bold">Chamber range</h1>
        <ChambersGrid />
        {/* <BenefitsSection />
        <ResearchSection />
        <NewsletterSignup /> */}
      </div>
    </main>
  );
}
