import { Bookmark, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  getChamberData,
  getAllChambers,
} from "~/utils/supabase/chambers/getChamberData";
import { HBOTInquiryForm } from "~/components/chambers/hbot-inquiry-form";
import { ChamberImageCarousel } from "~/components/chambers/chamber-image-carousel";
import { ChamberCarousel } from "~/components/chambers/chamber-carousel";
import { RelatedChambersCarousel } from "~/components/chambers/related-chambers-carousel";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ChamberProductPage({ params }: PageProps) {
  const chamber = await getChamberData(params.slug);
  const allChambers = await getAllChambers();
  const imageUrl =
    "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/";

  if (!chamber) {
    console.log("No chamber found");
  }

  const featureItems = chamber?.features
    ? chamber.features
        .split("\n\n")
        .filter((block) => block.trim() !== "")
        .map((block) => {
          const lines = block.split("\n").filter((line) => line.trim() !== "");
          return {
            title: lines[0]?.trim() || "",
            description: lines.slice(1).join("\n").trim() || "",
          };
        })
    : [];

  // Filter out related chambers (same type but not current chamber)
  const relatedChambers = chamber?.type
    ? allChambers
        .filter((c) => c.type === chamber.type && c.id !== chamber.id)
        .slice(0, 3)
    : [];

  return (
    <div className="w-full bg-[#F8F7F5]">
      {/* Hero section with product image and info */}
      <div className="mx-auto max-w-7xl px-6 py-12 pt-16 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Image Section */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-white">
              {chamber?.images && chamber.images.length > 0 ? (
                <ChamberImageCarousel
                  images={chamber.images}
                  baseUrl={imageUrl}
                  chamberName={chamber?.name ?? ""}
                />
              ) : (
                <Image
                  src={`${imageUrl}${chamber?.id}.png`}
                  alt={chamber?.name ?? ""}
                  fill
                  className="object-cover transition-all duration-500 hover:scale-[1.02]"
                  priority
                />
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-10">
            {/* Header Info */}
            <div>
              <p className="font-mono text-sm uppercase tracking-wider text-gray-500">
                {chamber?.type}
              </p>
              <h1 className="mt-3 font-sans text-4xl font-light tracking-tight sm:text-5xl">
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
              <p className="text-base leading-relaxed text-gray-600">
                {chamber?.info}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <HBOTInquiryForm />
              <Button
                size="lg"
                variant="outline"
                className="aspect-square rounded-full border-[#2B5741] border-opacity-20 p-0 text-[#2B5741] transition-colors hover:border-opacity-100 hover:bg-[#F0F4F1]"
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Accordion */}
      <Accordion type="multiple" className="w-full" defaultValue={[]}>
        {/* Key Features Section */}
        <div className="bg-white" id="features-section">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <AccordionItem value="features" className="border-b-0">
              <AccordionTrigger className="w-full py-8">
                <h2 className="w-full text-center font-sans text-3xl font-light tracking-wider">
                  Key Features
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pb-16">
                  <div className="relative">
                    {/* Background design elements */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                      <div className="absolute -right-32 -top-16 h-64 w-64 rounded-full bg-[#F0F4F1] opacity-40" />
                      <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#E5E7E1] opacity-20" />
                    </div>
                    {/* Introduction text */}
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                      <p className="text-lg leading-relaxed text-gray-600">
                        The {chamber?.name} is engineered with advanced features
                        designed to provide optimal therapeutic performance and
                        user comfort.
                      </p>
                    </div>

                    {/* Features grid with minimal cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                      {featureItems.length > 0 &&
                        featureItems.map((feature, index) => (
                          <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={index}
                            className={`group relative overflow-hidden rounded-xl border border-gray-400 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm ${
                              // Apply special positioning for the last item when it would be alone in a row
                              featureItems.length % 3 === 1 &&
                              index === featureItems.length - 1
                                ? "md:col-start-2 md:col-end-3"
                                : ""
                            } ${
                              // For 2-column layout, center the last item if it would be alone
                              featureItems.length % 2 === 1 &&
                              index === featureItems.length - 1
                                ? "sm:col-span-2 md:col-span-1"
                                : ""
                            }`}
                          >
                            {/* Feature icon */}
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4F1]">
                              <CheckCircle className="h-5 w-5 text-[#2B5741]" />
                            </div>

                            {/* Feature content */}
                            <div>
                              <h4 className="mb-2 font-sans text-base font-medium text-gray-800 group-hover:text-[#2B5741]">
                                {feature.title}
                              </h4>

                              {feature.description && (
                                <p className="text-sm leading-relaxed text-gray-500">
                                  {feature.description}
                                </p>
                              )}
                            </div>

                            {/* Bottom accent line - animated on hover */}
                            <div className="absolute bottom-0 left-0 h-px w-0 bg-[#2B5741]/30 transition-all duration-300 group-hover:w-full" />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-[#F8F7F5]" id="benefits-section">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <AccordionItem value="benefits" className="border-b-0 border-t-0">
              <AccordionTrigger className="w-full py-8">
                <h2 className="w-full text-center font-sans text-3xl font-light tracking-wider">
                  Benefits
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pb-16">
                  <div className="relative">
                    {/* Enhanced background design elements */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                      <div className="absolute -left-32 -top-16 h-64 w-64 rounded-full bg-[#F0F4F1] opacity-30" />
                      <div className="absolute bottom-0 right-0 h-48 w-48 translate-x-1/4 translate-y-1/4 rounded-full bg-[#E7E1EA] opacity-20" />
                    </div>

                    {/* Introduction text */}
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                      <p className="text-lg leading-relaxed text-gray-600">
                        The {chamber?.name} offers exceptional therapeutic
                        benefits and is designed for a wide range of users.
                      </p>
                    </div>

                    {/* Benefits cards with improved styling */}
                    <div className="grid gap-8 sm:grid-cols-2">
                      {/* Benefits Card */}
                      <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                        {/* Accent decoration */}
                        <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#E5E7E1] opacity-40 transition-transform duration-500 group-hover:scale-150" />

                        <div className="relative">
                          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0F4F1]">
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-7 w-7 text-[#2B5741]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </div>

                          <h4 className="mb-4 font-sans text-xl font-medium tracking-tight text-gray-800">
                            Key Benefits
                          </h4>

                          <div className="prose prose-sm text-gray-600">
                            {chamber?.benefits ? (
                              <ul className="space-y-2">
                                {chamber.benefits
                                  .split(/\n/)
                                  .filter((item) => item.trim() !== "")
                                  .map((item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <div className="mt-1 h-4 w-4 flex-shrink-0 text-[#2B5741]">
                                        <CheckCircle className="h-4 w-4" />
                                      </div>
                                      <span>{item.trim()}</span>
                                    </li>
                                  ))}
                              </ul>
                            ) : (
                              <p>Information not available</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Who Is It For Card */}
                      <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                        {/* Accent decoration */}
                        <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#E7E1EA] opacity-40 transition-transform duration-500 group-hover:scale-150" />

                        <div className="relative">
                          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F5FA]">
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-7 w-7 text-[#5D4A66]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </svg>
                          </div>

                          <h4 className="mb-4 font-sans text-xl font-medium tracking-tight text-gray-800">
                            Who Is The {chamber?.name} For?
                          </h4>

                          <div className="prose prose-sm text-gray-600">
                            {chamber?.who_for ? (
                              <ul className="space-y-2">
                                {chamber.who_for
                                  .split(/\n/)
                                  .filter((item) => item.trim() !== "")
                                  .map((item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <div className="mt-1 h-4 w-4 flex-shrink-0 text-[#5D4A66]">
                                        <CheckCircle className="h-4 w-4" />
                                      </div>
                                      <span>{item.trim()}</span>
                                    </li>
                                  ))}
                              </ul>
                            ) : (
                              <p>Information not available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="bg-[#F0F4F1]" id="specifications-section">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <AccordionItem value="specifications" className="border-t-0">
              <AccordionTrigger className="w-full py-8">
                <h2 className="w-full text-center font-sans text-3xl font-light tracking-wider">
                  Specifications
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pb-16">
                  <div className="relative">
                    {/* Background design elements */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                      <div className="absolute -right-32 -top-16 h-64 w-64 rounded-full bg-white opacity-70" />
                      <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-white opacity-50" />
                    </div>

                    {/* Introduction text */}
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                      <p className="text-lg leading-relaxed text-gray-600">
                        The {chamber?.name} meets strict manufacturing standards
                        and specifications to ensure safety, reliability and
                        effectiveness.
                      </p>
                    </div>

                    {/* Specifications accordion with enhanced styling */}
                    <div className="relative mx-auto max-w-4xl rounded-3xl border border-white/50 bg-white/30 p-1 backdrop-blur-sm">
                      <Accordion type="single" collapsible className="w-full">
                        {/* Size Guide */}
                        <AccordionItem
                          value="size"
                          className="mb-3 overflow-hidden rounded-2xl border-none bg-white/80 shadow-sm"
                        >
                          <AccordionTrigger className="group flex justify-between px-6 py-5 font-sans text-lg transition-all hover:no-underline data-[state=open]:border-b data-[state=open]:border-gray-100">
                            <div className="flex items-center">
                              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4F1]">
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-[#2B5741]"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    ry="2"
                                  />
                                  <line x1="9" y1="3" x2="9" y2="21" />
                                </svg>
                              </div>
                              <span className="font-medium text-gray-800">
                                Size Guide
                              </span>
                            </div>
                            <div className="text-[#2B5741] opacity-0 transition-opacity group-hover:opacity-100">
                              View details
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="border-t-0 px-8 pb-6 pt-4 text-gray-600">
                            <div className="rounded-xl bg-[#F8F7F5]/50 p-4">
                              <p>{chamber?.size_guide}</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Technical Specifications */}
                        <AccordionItem
                          value="tech"
                          className="mb-3 overflow-hidden rounded-2xl border-none bg-white/80 shadow-sm"
                        >
                          <AccordionTrigger className="group flex justify-between px-6 py-5 font-sans text-lg transition-all hover:no-underline data-[state=open]:border-b data-[state=open]:border-gray-100">
                            <div className="flex items-center">
                              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4F1]">
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-[#2B5741]"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                </svg>
                              </div>
                              <span className="font-medium text-gray-800">
                                Technical Specifications
                              </span>
                            </div>
                            <div className="text-[#2B5741] opacity-0 transition-opacity group-hover:opacity-100">
                              View details
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="border-t-0 px-8 pb-6 pt-4 text-gray-600">
                            <div className="rounded-xl bg-[#F8F7F5]/50 p-4">
                              <p>{chamber?.tech_dco}</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Warranty */}
                        <AccordionItem
                          value="warranty"
                          className="mb-3 overflow-hidden rounded-2xl border-none bg-white/80 shadow-sm"
                        >
                          <AccordionTrigger className="group flex justify-between px-6 py-5 font-sans text-lg transition-all hover:no-underline data-[state=open]:border-b data-[state=open]:border-gray-100">
                            <div className="flex items-center">
                              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4F1]">
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-[#2B5741]"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                              </div>
                              <span className="font-medium text-gray-800">
                                Warranty
                              </span>
                            </div>
                            <div className="text-[#2B5741] opacity-0 transition-opacity group-hover:opacity-100">
                              View details
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="border-t-0 px-8 pb-6 pt-4 text-gray-600">
                            <div className="rounded-xl bg-[#F8F7F5]/50 p-4">
                              <p>{chamber?.warranty}</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Certifications */}
                        <AccordionItem
                          value="certifications"
                          className="mb-3 overflow-hidden rounded-2xl border-none bg-white/80 shadow-sm"
                        >
                          <AccordionTrigger className="group flex justify-between px-6 py-5 font-sans text-lg transition-all hover:no-underline data-[state=open]:border-b data-[state=open]:border-gray-100">
                            <div className="flex items-center">
                              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4F1]">
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-[#2B5741]"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect
                                    x="3"
                                    y="11"
                                    width="18"
                                    height="11"
                                    rx="2"
                                    ry="2"
                                  />
                                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                              </div>
                              <span className="font-medium text-gray-800">
                                Certifications
                              </span>
                            </div>
                            <div className="text-[#2B5741] opacity-0 transition-opacity group-hover:opacity-100">
                              View details
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="border-t-0 px-8 pb-6 pt-4 text-gray-600">
                            <div className="rounded-xl bg-[#F8F7F5]/50 p-4">
                              {chamber?.certification ? (
                                <div className="grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2">
                                  {chamber.certification
                                    .split(/[,\n]/)
                                    .filter((cert) => cert.trim() !== "")
                                    .map((cert, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-2"
                                      >
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#2B5741]" />
                                        <span>{cert.trim()}</span>
                                      </div>
                                    ))}
                                </div>
                              ) : (
                                <p>No certification information available</p>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Inclusions */}
                        <AccordionItem
                          value="inclusions"
                          className="overflow-hidden rounded-2xl border-none bg-white/80 shadow-sm"
                        >
                          <AccordionTrigger className="group flex justify-between px-6 py-5 font-sans text-lg transition-all hover:no-underline data-[state=open]:border-b data-[state=open]:border-gray-100">
                            <div className="flex items-center">
                              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4F1]">
                                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-[#2B5741]"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                  <line x1="12" y1="22.08" x2="12" y2="12" />
                                </svg>
                              </div>
                              <span className="font-medium text-gray-800">
                                What&apos;s Included
                              </span>
                            </div>
                            <div className="text-[#2B5741] opacity-0 transition-opacity group-hover:opacity-100">
                              View details
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="border-t-0 px-8 pb-6 pt-4 text-gray-600">
                            <div className="rounded-xl bg-[#F8F7F5]/50 p-4">
                              {chamber?.inclusion ? (
                                <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                                  {chamber.inclusion
                                    .split(/\n/)
                                    .filter((item) => item.trim() !== "")
                                    .map((item, index) => (
                                      <div key={index} className="flex gap-3">
                                        <div className="mt-1.5 h-5 w-5 flex-shrink-0 text-[#2B5741]">
                                          <CheckCircle className="h-5 w-5" />
                                        </div>
                                        <span>{item.trim()}</span>
                                      </div>
                                    ))}
                                </div>
                              ) : (
                                <p>No inclusion information available</p>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Certification badges */}
                    <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-6">
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-white/70 p-4 shadow-sm backdrop-blur-sm">
                          <div className="h-full w-full rounded-full bg-[#F0F4F1] p-2">
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-full w-full text-[#2B5741]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="8" r="7" />
                              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                            </svg>
                          </div>
                        </div>
                        <span className="mt-2 text-xs font-medium text-gray-500">
                          Quality Assured
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-white/70 p-4 shadow-sm backdrop-blur-sm">
                          <div className="h-full w-full rounded-full bg-[#F0F4F1] p-2">
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-full w-full text-[#2B5741]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                              <path d="M9 12l2 2 4-4" />
                            </svg>
                          </div>
                        </div>
                        <span className="mt-2 text-xs font-medium text-gray-500">
                          Safety Certified
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-white/70 p-4 shadow-sm backdrop-blur-sm">
                          <div className="h-full w-full rounded-full bg-[#F0F4F1] p-2">
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-full w-full text-[#2B5741]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                          </div>
                        </div>
                        <span className="mt-2 text-xs font-medium text-gray-500">
                          Research Backed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
        </div>
      </Accordion>

      {/* Hyperbaric HQ Standard Section */}
      <section className="bg-[#F8F7F5] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
          <h2 className="mb-10 font-sans text-3xl font-light tracking-tight">
            The Hyperbaric HQ Standard
          </h2>
          <div className="mx-auto mb-10 h-px w-16 bg-[#2B5741] opacity-30" />

          <p className="mx-auto mb-12 text-lg leading-relaxed text-gray-600">
            The Hyperbaric HQ team works directly with leading brands and
            manufacturers from around the world to bring you the best in
            quality, safety and science based efficacy.
          </p>

          <Link
            href="/join-hq"
            className="inline-block rounded-full border border-[#2B5741] bg-white px-10 py-4 text-sm font-medium text-[#2B5741] transition-colors hover:bg-[#2B5741] hover:text-white"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Related Chambers Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="font-sans text-3xl font-light tracking-tight">
              Explore Similar Chambers
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-[#2B5741] opacity-30" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Discover other hyperbaric chambers that might meet your specific
              needs
            </p>
          </div>

          {relatedChambers.length > 0 ? (
            <div className="overflow-hidden rounded-3xl bg-[#F8F7F5]/70 p-6">
              <RelatedChambersCarousel
                chambers={relatedChambers}
                imageUrl={imageUrl}
              />
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-100 bg-[#F8F7F5] p-10 text-center">
              <p className="text-gray-500">
                No related chambers are currently available.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
