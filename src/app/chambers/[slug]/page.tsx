import { Bookmark, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {  } from "next/navigation"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"
import { getChamberData } from "~/utils/supabase/chambers/getChamberData"
import { HBOTInquiryForm } from "~/components/chambers/hbot-inquiry-form"
import { RelatedChambersCarousel } from "~/components/chambers/related-chambers-carousel"
import type { ChamberProps } from "~/types/chambers"
import { createClient } from "~/utils/supabase/server"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ChamberProductPage({ params }: PageProps) {
  const chamber = await getChamberData(params.slug)

  const imageUrl = "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/products/"

  if (!chamber) {
   console.log("not found", chamber)
  }

  const features = chamber?.features ? chamber.features.split(",").map((f: string) => f.trim()) : []

  return (
    <div className="w-full bg-[#F8F7F5]">
      {/* Hero section with product image and info */}
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Image Section */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-white">
              <Image
                src={`${imageUrl}${chamber?.id}.png`}
                alt={chamber?.name ?? ""}
                fill
                className="object-cover transition-all duration-500 hover:scale-[1.02]"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-10">
            {/* Header Info */}
            <div>
              <p className="font-mono text-sm uppercase tracking-wider text-gray-500">
                {chamber?.type} • {chamber?.ata} 
              </p>
              <h1 className="font-sans mt-3 text-4xl font-light tracking-tight sm:text-5xl">
                {chamber?.name}
              </h1>
            </div>

            {/* Badges */}
            <div className="flex gap-3">
              <span className="rounded-full bg-[#E5E7E1] px-5 py-2 text-sm font-medium text-[#2B5741]">
                {chamber?.capacity}
              </span>
              <span className="rounded-full bg-[#E7E1EA] px-5 py-2 text-sm font-medium text-[#5D4A66]">
                {chamber?.ata}
              </span>
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-gray-600">{chamber?.info}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <HBOTInquiryForm />
              <Button
                size="lg"
                variant="outline"
                className="aspect-square rounded-full border-[#2B5741] border-opacity-20 p-0 text-[#2B5741] hover:bg-[#F0F4F1] hover:border-opacity-100 transition-colors"
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="font-sans text-3xl font-light tracking-tight">
              Key Features
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-[#2B5741] opacity-30" />
          </div>

          <div className="relative">
            {/* Background design element */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -right-64 -top-32 h-96 w-96 rounded-full bg-[#F0F4F1] opacity-40" />
              <div className="absolute -left-64 bottom-0 h-80 w-80 rounded-full bg-[#F0F4F1] opacity-30" />
            </div>
            
            {/* Features list */}
            <div className="grid gap-8 md:grid-cols-2">
              {features.length > 0 && features.map((feature, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="flex items-start gap-5 rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-[#2B5741] hover:border-opacity-20"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2B5741] border-opacity-10 bg-[#F0F4F1]">
                    <CheckCircle className="h-4 w-4 text-[#2B5741]" />
                  </div>
                  <div>
                    <p className="font-sans text-base text-gray-800">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specifications section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="font-sans text-3xl font-light tracking-tight">
              Specifications
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-[#2B5741] opacity-30" />
          </div>
          
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="size" className="border-t border-gray-200">
                <AccordionTrigger className="font-sans py-6 text-lg font-light tracking-tight">
                  Size Guide
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  <p>{chamber?.size_guide}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tech" className="border-t border-gray-200">
                <AccordionTrigger className="font-sans py-6 text-lg font-light tracking-tight">
                  Technical Specifications
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  <p>{chamber?.tech_dco}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="warranty" className="border-t border-gray-200">
                <AccordionTrigger className="font-sans py-6 text-lg font-light tracking-tight">
                  Warranty
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  <p>{chamber?.warranty}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="certifications" className="border-t border-gray-200">
                <AccordionTrigger className="font-sans py-6 text-lg font-light tracking-tight">
                  Certifications
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  <p>{chamber?.certification}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="inclusions" className="border-t border-gray-200">
                <AccordionTrigger className="font-sans py-6 text-lg font-light tracking-tight">
                  Inclusions
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  <p>{chamber?.inclusion}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Benefits & Use Cases */}
      <section className="mx-auto max-w-5xl px-6 py-24 sm:px-8 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="font-sans text-3xl font-light tracking-tight">
            Benefits & Applications
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-[#2B5741] opacity-30" />
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="font-sans text-xl font-medium tracking-tight">Benefits</h3>
            <p className="text-gray-600 leading-relaxed">{chamber?.benefits}</p>
          </div>
          
          <div className="space-y-6">
            <h3 className="font-sans text-xl font-medium tracking-tight">Who Is The {chamber?.name} For?</h3>
                <p className="text-gray-600 leading-relaxed">{chamber?.who_for}</p>
          </div>
        </div>
      </section>

      {/* Hyperbaric HQ Standard Section */}
      <section className="bg-[#F0F4F1] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
          <h2 className="font-sans text-3xl font-light tracking-tight mb-10">
            The Hyperbaric HQ Standard
          </h2>
          <div className="mx-auto mb-10 h-px w-16 bg-[#2B5741] opacity-30" />

          <p className="mx-auto text-lg leading-relaxed text-gray-600 mb-12">
            The Hyperbaric HQ team works directly with leading brands and manufacturers from around the world to bring
            you the best in quality, safety and science based efficacy.
          </p>

          <Link
            href="/join-hq"
            className="inline-block rounded-full bg-white px-10 py-4 text-sm font-medium text-[#2B5741] transition-colors hover:bg-[#2B5741] hover:text-white border border-[#2B5741]"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Related Products Carousel */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="font-sans text-3xl font-light tracking-tight">
            You Might Also Like
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-[#2B5741] opacity-30" />
        </div>
        

      </section>
    </div>
  )
}

/**
 * Fetches other chamber products excluding the current one
 * @param currentId - ID of the current chamber to exclude
 * @returns Array of chamber products
 */
async function getOtherChambers(currentId: string | number): Promise<ChamberProps[]> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from("chamber_products")
      .select("*")
      .neq("id", currentId)
      .order("id")
      .limit(10)
    
    if (error) {
      console.error("Error fetching other chambers:", error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error("Error in getOtherChambers:", error)
    return []
  }
}

