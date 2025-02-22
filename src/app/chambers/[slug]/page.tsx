import { Bookmark, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"
import { getChamberData } from "~/utils/supabase/chambers/getChamberData"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ChamberProductPage({ params }: PageProps) {
  const chamber = await getChamberData(params.slug)

  const imageUrl = "https://d144dqt8e4woe2.cloudfront.net/chambers/products/"

  if (!chamber) {
    notFound()
  }

  const features = chamber.features ? chamber.features.split(",").map((f: string) => f.trim()) : []

  return (
    <div className="w-full bg-[#FAF7F4]">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-md">
              <Image
                src={`${imageUrl}${chamber.id}.png`}
                alt={chamber.name ?? ""}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header Info */}
            <div>
              <p className="font-['Space_Mono'] text-sm uppercase tracking-wider text-gray-600">
                {chamber.type} | {chamber.ata} ATA
              </p>
              <h1 className="font-['Raleway'] mt-2 text-4xl font-bold tracking-wider sm:text-5xl md:text-6xl">
                {chamber.name}
              </h1>
            </div>

            {/* Badges */}
            <div className="flex gap-3">
              <span className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white">
                {chamber.capacity}
              </span>
              <span className="rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white">
                {chamber.ata} ATA
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="flex-1 rounded-full bg-emerald-700 text-lg font-medium text-white hover:bg-emerald-800"
              >
                Speak To An Expert
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="aspect-square rounded-full border-emerald-700 p-0 text-emerald-700 hover:bg-emerald-50"
              >
                <Bookmark className="h-6 w-6" />
              </Button>
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <h2 className="font-['Raleway'] text-2xl font-bold tracking-wider">About This Chamber</h2>
              <p className="text-lg leading-relaxed text-gray-600">{chamber.info}</p>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-2">
              <Accordion type="single" collapsible>
                <AccordionItem value="features" className="border-t">
                  <AccordionTrigger className="font-['Raleway'] text-xl font-bold tracking-wider">
                    Key Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {features.map((feature, index) => (
                        <div
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          key={index}
                          className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md"
                        >
                          <div className="rounded-full bg-emerald-100 p-2">
                            <CheckCircle className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-base font-medium text-gray-900">{feature}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="size" className="border-t">
                  <AccordionTrigger className="font-['Raleway'] text-xl font-bold tracking-wider">
                    Size Guide
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">{chamber.size_guide}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="warranty" className="border-t">
                  <AccordionTrigger className="font-['Raleway'] text-xl font-bold tracking-wider">
                    Warranty
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">{chamber.warranty}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="certifications" className="border-t">
                  <AccordionTrigger className="font-['Raleway'] text-xl font-bold tracking-wider">
                    Certifications
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">{chamber.certification}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mx-auto max-w-5xl py-16">
          <h2 className="mb-8 text-center font-['Raleway'] text-3xl font-bold tracking-wider">
            About The {chamber.name}
          </h2>

          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="benefits">
                <AccordionTrigger className="font-['Raleway'] py-6 text-xl font-bold tracking-wider">
                  Benefits
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">{chamber.benefits}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tech">
                <AccordionTrigger className="font-['Raleway'] py-6 text-xl font-bold tracking-wider">
                  Technical Specifications
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">{chamber.tech_dco}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="inclusions">
                <AccordionTrigger className="font-['Raleway'] py-6 text-xl font-bold tracking-wider">
                  Inclusions
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">{chamber.inclusion}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="who-for">
                <AccordionTrigger className="font-['Raleway'] py-6 text-xl font-bold tracking-wider">
                  Who Is The {chamber.name} For?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">{chamber.who_for}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Hyperbaric HQ Standard Section */}
        <section className="mx-auto max-w-5xl py-16 text-center">
          <h2 className="relative mb-12 font-['Raleway'] text-4xl font-bold tracking-wider sm:text-5xl">
            The Hyperbaric HQ Standard
            <div className="absolute -bottom-4 left-1/2 h-1 w-48 -translate-x-1/2 bg-emerald-700" />
          </h2>

          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600">
            The Hyperbaric HQ team works directly with leading brands and manufacturers from around the world to bring
            you the best in quality, safety and science based efficacy.
          </p>

          <div className="mt-12">
            <Link
              href="/join-hq"
              className="inline-block rounded-full bg-emerald-700 px-12 py-4 text-lg font-medium text-white transition-colors hover:bg-emerald-800"
            >
              Learn More
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

