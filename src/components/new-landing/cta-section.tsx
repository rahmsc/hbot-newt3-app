import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            How To Get Started With HBOT In Your Home Or Clinic Fast
          </h2>
          <div className="mb-8 space-y-2">
            <p className="text-lg font-medium italic text-gray-900 sm:text-xl">
              NEED HBOT AND NEED IT NOW? HBOT HQ HAS GOT YOU COVERED.
            </p>
            <p className="text-lg font-medium italic text-gray-900 sm:text-xl">
              The Best Chambers At The Best Prices. Guaranteed.
            </p>
          </div>
          <a
            href="tel:1234567890"
            className="group inline-flex items-center gap-2 rounded-full bg-gray-200 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-300"
          >
            Call This Number To Speak To A Specialist Right Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
