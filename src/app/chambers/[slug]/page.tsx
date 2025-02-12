"use client";

import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { combinedChamberData } from "~/data/combinedChambersData";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ChamberProductPage({ params }: PageProps) {
  const chamber = combinedChamberData.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === params.slug,
  );

  if (!chamber) {
    return <div>Chamber not found</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100">
              <Image
                src={chamber.image}
                alt={chamber.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex gap-2">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                <Image
                  src={chamber.image}
                  alt={`${chamber.name} thumbnail 1`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                <Image
                  src={chamber.image}
                  alt={`${chamber.name} thumbnail 2`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header Info */}
            <div>
              <p className="text-lg text-gray-600">
                {chamber.type} | {chamber.pressure}
              </p>
              <h1 className="mt-2 text-6xl font-bold">{chamber.name}</h1>
            </div>

            {/* Badges */}
            <div className="flex gap-3">
              <span className="rounded-full bg-teal-800 px-4 py-2 text-sm text-white">
                {chamber.persons} Seater
              </span>
              <span className="rounded-full bg-black px-4 py-2 text-sm text-white">
                {chamber.pressure}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="flex-1 rounded-full bg-black text-lg font-medium text-white hover:bg-gray-800"
              >
                Speak To An Expert
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="aspect-square rounded-full p-0"
              >
                <Bookmark className="h-6 w-6" />
              </Button>
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About This Chamber</h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {chamber.description}
              </p>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-2">
              <Accordion type="single" collapsible>
                <AccordionItem value="features" className="border-t">
                  <AccordionTrigger className="text-xl font-bold">
                    Key Features
                  </AccordionTrigger>
                  <AccordionContent>Features content...</AccordionContent>
                </AccordionItem>

                <AccordionItem value="size" className="border-t">
                  <AccordionTrigger className="text-xl font-bold">
                    Size Guide
                  </AccordionTrigger>
                  <AccordionContent>Size guide content...</AccordionContent>
                </AccordionItem>

                <AccordionItem value="warranty" className="border-t">
                  <AccordionTrigger className="text-xl font-bold">
                    Warranty
                  </AccordionTrigger>
                  <AccordionContent>Warranty content...</AccordionContent>
                </AccordionItem>

                <AccordionItem value="certifications" className="border-t">
                  <AccordionTrigger className="text-xl font-bold">
                    Certifications
                  </AccordionTrigger>
                  <AccordionContent>Certifications content...</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="mx-auto max-w-5xl py-16">
          <h2 className="mb-8 text-center text-3xl font-bold">
            About The {chamber.name}
          </h2>

          <div className="space-y-4">
            <div className="border-b border-gray-200">
              <button
                type="button"
                className="flex w-full items-center justify-between py-6 text-left text-xl font-bold hover:opacity-70"
              >
                Benefits
                <span className="text-2xl">+</span>
              </button>
            </div>

            <div className="border-b border-gray-200">
              <button
                type="button"
                className="flex w-full items-center justify-between py-6 text-left text-xl font-bold hover:opacity-70"
              >
                Supporting Research
                <span className="text-2xl">+</span>
              </button>
            </div>

            <div className="border-b border-gray-200">
              <button
                type="button"
                className="flex w-full items-center justify-between py-6 text-left text-xl font-bold hover:opacity-70"
              >
                Inclusions
                <span className="text-2xl">+</span>
              </button>
            </div>

            <div className="border-b border-gray-200">
              <button
                type="button"
                className="flex w-full items-center justify-between py-6 text-left text-xl font-bold hover:opacity-70"
              >
                Who Is The {chamber.name} For?
                <span className="text-2xl">+</span>
              </button>
            </div>

            <p className="pt-4 text-center text-sm text-gray-500">
              For Hyperbaric HQ members, text your private concierge at any time
              with any question.
            </p>
          </div>
        </section>

        {/* Hyperbaric HQ Standard Section */}
        <section className="mx-auto max-w-5xl py-16 text-center">
          <h2 className="relative mb-8 text-5xl font-bold">
            The Hyperbaric HQ Standard
            <div className="absolute -bottom-2 left-1/2 h-1 w-48 -translate-x-1/2 bg-blue-500" />
          </h2>

          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600">
            The Hyperbaric HQ team works directly with leading brands and
            manufacturers from around the world to bring you the best in
            quality, safety and science based efficacy.
          </p>

          <div className="mt-12">
            <Link
              href="/about"
              className="inline-block rounded-full bg-black px-12 py-4 text-lg font-medium text-white transition-colors hover:bg-gray-800"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Members Also Viewed Section */}
        <section className="mx-auto max-w-7xl py-24">
          <h2 className="mb-16 text-center text-5xl font-bold">
            Members Also Viewed
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {combinedChamberData
              .filter((c) => c.id !== chamber.id)
              .slice(0, 3)
              .map((relatedChamber) => (
                <Link
                  key={relatedChamber.id}
                  href={`/chambers/${relatedChamber.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group block overflow-hidden rounded-2xl bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={relatedChamber.image}
                          alt={relatedChamber.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-[#E07B5C] px-4 py-2 text-sm font-medium text-white">
                          {relatedChamber.pressure}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 p-4">
                      <p className="text-lg font-medium text-gray-600">
                        {relatedChamber.type}
                      </p>
                      <h3 className="text-3xl font-bold">
                        {relatedChamber.name}
                      </h3>
                      <p className="text-lg">
                        Max Pressure: {relatedChamber.pressure}
                      </p>
                      <div className="pt-2">
                        <span className="block w-full rounded-full bg-black py-4 text-center text-lg font-medium text-white transition-colors group-hover:bg-gray-800">
                          Quick View
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Rest of your existing sections */}
      </div>
    </main>
  );
}
