"use client";

import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";

export function CTASubscriptionSection() {
  return (
    <section className="relative w-full py-4">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/chambers/1.png"
          alt="HBOT Chamber Background"
          fill
          className="object-cover brightness-[0.25]" // Darkens the image to make text more readable
          quality={100}
          priority
        />
      </div>

      <div className="container relative mx-auto px-4 pt-24">
        <div className="mx-auto max-w-4xl space-y-12 text-center">
          <h2 className="font-['Raleway'] text-4xl font-medium tracking-[0.3em] text-white sm:text-5xl">
            GET STARTED WITH HBOT
          </h2>
          <div className="space-y-6">
            <p className="text-2xl font-light text-gray-200 sm:text-3xl">
              How To Get Started With HBOT In Your Home Or Clinic Fast
            </p>
            <p className="text-lg font-medium text-gray-100 sm:text-xl">
              NEED HBOT AND NEED IT NOW? HBOT HQ HAS GOT YOU COVERED.
            </p>
            <p className="text-lg italic text-gray-300 sm:text-xl">
              The Best Chambers At The Best Prices. Guaranteed.
            </p>
          </div>
          <div className="flex justify-center pb-12">
            <a
              href="tel:1234567890"
              className="group inline-flex items-center gap-3 rounded-full bg-emerald-700 px-8 py-4 text-base font-medium text-white transition-all hover:bg-emerald-600"
            >
              <Phone className="h-5 w-5" />
              Call To Speak To A Specialist Right Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
