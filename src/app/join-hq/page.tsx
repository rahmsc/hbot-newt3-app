import ContactSection from "~/components/landing/sections/contact-section";
import { TestimonialCarousel } from "~/components/joinhq/testimonial-carousel";
import { FeatureSection } from "~/components/joinhq/feature-section";
import { HowItWorksSection } from "~/components/joinhq/how-it-works";
import { HeroSection } from "~/components/joinhq/hero-section";
import { JourneyVideos } from "~/components/joinhq/journey-videos";
import { SuccessSteps } from "~/components/joinhq/success-steps";
import { CTASection } from "~/components/joinhq/cta-section";

const JoinHQPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#f9f7f4]">
      <HeroSection />

      <main className="space-y-8">
        <FeatureSection />
        <HowItWorksSection />
        <JourneyVideos />
        <SuccessSteps />
        <TestimonialCarousel />
        <CTASection />
        <ContactSection />
      </main>
    </div>
  );
};

export default JoinHQPage;
