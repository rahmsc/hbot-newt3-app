import { ChambersSection } from "~/components/landing/sections/chambers-section"
import ContactSection from "~/components/landing/sections/contact-section"
import { CTASubscriptionSection } from "~/components/landing/sections/cta-section"
import { LoadingScreen } from "~/components/utils/loading-screen"
import ProvidersSection from "~/components/landing/sections/providers-section"
import ResearchDashboard from "~/components/landing/sections/research/research-section"
import TrendingSection from "~/components/landing/sections/trending/trending-section"

export default async function Home(): Promise<JSX.Element> {
  return (
    <>
      <LoadingScreen />
      <main className="flex w-full flex-row items-center justify-center">
        <div className="w-full">
          <div className="">
            <ResearchDashboard />
            <ChambersSection />
            <TrendingSection />
            <ProvidersSection />
            <CTASubscriptionSection />
            <ContactSection />
          </div>
        </div>
      </main>
    </>
  )
}

export const dynamic = "force-dynamic"

