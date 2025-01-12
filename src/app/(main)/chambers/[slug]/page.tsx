"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
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
      <div className="container mx-auto py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={chamber.image}
                alt={chamber.name}
                fill
                className="object-cover"
              />
              <Badge
                className="absolute right-4 top-4 bg-orange-400 text-white"
                variant="secondary"
              >
                {chamber.pressure}
              </Badge>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">{chamber.type}</p>
              <h1 className="text-4xl font-bold">{chamber.name}</h1>
              <p className="text-sm text-muted-foreground">
                Max Pressure: {chamber.pressure}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Brand: {chamber.brand}
              </p>
              <Badge variant="secondary" className="mt-2 bg-gray-200">
                {chamber.persons} Person
              </Badge>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">About This Chamber</h2>
              <p className="text-muted-foreground">{chamber.description}</p>
            </div>

            <Button
              size="lg"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Speak To An Expert
            </Button>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="specifications">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-inside list-disc space-y-2">
                    <li>Type: {chamber.type}</li>
                    <li>Maximum Pressure: {chamber.pressure}</li>
                    <li>Capacity: {chamber.persons} Person</li>
                    <li>Brand: {chamber.brand}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="features">
                <AccordionTrigger>Key Features</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-inside list-disc space-y-2">
                    <li>Professional grade chamber</li>
                    <li>Advanced safety features</li>
                    <li>Digital monitoring system</li>
                    <li>Comfortable seating</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">Similar Chambers</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {combinedChamberData
              .filter((c) => c.id !== chamber.id)
              .slice(0, 3)
              .map((relatedChamber) => (
                <div key={relatedChamber.id}>
                  {/* You can reuse your ChamberCard component here */}
                </div>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
