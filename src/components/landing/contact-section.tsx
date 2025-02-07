"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const ContactSection = () => {
  const imageUrl =
    "https://d144dqt8e4woe2.cloudfront.net/chambers/gallery/6.png";

  return (
    <section className="relative w-full py-24">
      <div className="absolute inset-0">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Hyperbaric chamber"
          fill
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-8">
        <div className="flex flex-col items-center justify-center md:flex-row md:items-stretch md:justify-between">
          <div className="mb-8 max-w-xl text-center md:mb-0 md:text-left">
            <h2 className="mb-6 font-['Raleway'] text-4xl font-bold tracking-[0.3em] text-white sm:text-5xl">
              LET&rsquo;S TALK HBOT
            </h2>
            <p className="text-xl text-gray-200">
              Discover how our cutting-edge hyperbaric oxygen therapy solutions
              can transform your health and wellness journey.
            </p>
          </div>

          <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm md:ml-8">
            <CardHeader>
              <CardTitle className="font-['Raleway'] text-sm font-medium uppercase tracking-[0.2em] text-gray-900">
                Expert Consultation
              </CardTitle>
              <CardDescription className="mt-2 text-3xl font-bold text-gray-900">
                Explore Hyperbaric Solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-lg text-gray-600">
                Book a consultation with our experts to learn how our advanced
                hyperbaric oxygen therapy can address a wide range of medical
                conditions and enhance your overall well-being.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  asChild
                  className="rounded-full bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800"
                >
                  <a
                    href="https://calendly.com/your-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Consultation
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-gray-900 px-6 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100"
                >
                  <Link href="/contact">Request Information</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
