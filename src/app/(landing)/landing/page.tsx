import Hero from "~/components/landing/hero";
import HowWeHelpSection from "~/components/landing/how-we-help";
import HowWeWorkSection from "~/components/landing/how-we-work";
import JourneySection from "~/components/landing/journey";
import WhoWeAre from "~/components/landing/who-we-are";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      {/* <main> */}
      <Hero />
      <JourneySection />
      <HowWeHelpSection />
      <HowWeWorkSection />
      <WhoWeAre />
      {/* </main> */}
    </div>
  );
}
