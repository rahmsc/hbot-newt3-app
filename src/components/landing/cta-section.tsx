import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full bg-gray-50">
      <div className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <h2 className="font-heading text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            How To Get Started With HBOT In Your Home Or Clinic Fast
          </h2>
          <div className="space-y-4">
            <p className="font-sans text-lg text-gray-600 sm:text-xl">
              NEED HBOT AND NEED IT NOW? HBOT HQ HAS GOT YOU COVERED.
            </p>
            <p className="font-sans text-lg text-gray-600 sm:text-xl">
              The Best Chambers At The Best Prices. Guaranteed.
            </p>
          </div>
          <a
            href="tel:1234567890"
            className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-base font-medium text-white transition-colors hover:bg-gray-800"
          >
            Call This Number To Speak To A Specialist Right Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
