"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ChamberCard } from "~/components/chambers/chambers-card";
import { ChamberQuickView } from "~/components/chambers/chambers-quick-view";
import { WhyWorkSection } from "~/components/chambers/why-work-with-us";
import ContactSection from "~/components/landing/contact-section";
import EmailInputForm from "~/components/landing/email-input-form";
import { wellnessProducts } from "~/components/landing/marketplace-section";
import type { SortOption } from "~/components/market/filter-tabs";
import { FilterTabs } from "~/components/market/filter-tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Pagination } from "~/components/ui/pagination";
import { WellnessProductCard } from "~/components/wellness/wellness-product-card";
import { combinedChamberData } from "~/data/combinedChambersData";
import { marketplaceProducts } from "~/data/marketplaceData";
import type { chambersDataProp } from "~/data/rebrandData";
import { chamberData } from "~/data/rebrandData";

const ITEMS_PER_PAGE = 9; // 3 rows of 3 items

const MarketPage = () => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedChamber, setSelectedChamber] =
    useState<chambersDataProp | null>(null);
  const [currentView, setCurrentView] = useState<"home" | "marketplace">(
    "home",
  );
  const [filteredProducts, setFilteredProducts] = useState(marketplaceProducts);
  const [currentPage, setCurrentPage] = useState(1);

  // Products carousel
  const [productsEmblaRef, productsEmblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  });

  // Chambers carousel
  const [chambersEmblaRef, chambersEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  // Convert chamber data to match MarketplaceProduct format
  const convertedChamberData = chamberData.map((chamber) => ({
    id: chamber.id.toString(),
    name: chamber.name,
    category: "Chambers" as const,
    price: 15999.99, // You might want to add prices to chamberData
    description: chamber.description,
    image: chamber.image,
    orderCount: 0, // You might want to track this separately
    featured: false,
    inStock: true,
    tags: [
      chamber.type,
      chamber.brand,
      `${chamber.pressure}`,
      `${chamber.persons} Person`,
    ],
    publisher: chamber.brand,
    productUrl: `/market/chambers/${chamber.id}`,
  }));

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleTabChange = (tab: string) => {
    if (tab === "Home") {
      setCurrentView("home");
    } else {
      setCurrentView("marketplace");
      setCurrentPage(1); // Reset to first page when changing tabs

      switch (tab) {
        case "All Products":
          setFilteredProducts([
            ...marketplaceProducts,
            ...convertedChamberData,
          ]);
          break;
        case "Most Ordered":
          setFilteredProducts(
            [...marketplaceProducts, ...convertedChamberData].sort(
              (a, b) => b.orderCount - a.orderCount,
            ),
          );
          break;
        case "Chambers":
          setFilteredProducts(convertedChamberData);
          break;
        case "Supplements":
          setFilteredProducts(
            marketplaceProducts.filter((p) => p.category === "Supplements"),
          );
          break;
        case "Guides":
          setFilteredProducts(
            marketplaceProducts.filter((p) => p.category === "Guides"),
          );
          break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full">
        <Image
          src="/wellness-product-images/wellness-page-header.png"
          alt="Wellness Market Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative z-10 mx-auto flex h-full flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="mb-2 font-['Raleway'] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              WELLNESS MARKET
            </h1>
            <p className="text-lg text-white sm:text-xl">
              Find the very best our industry has to offer.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <FilterTabs onTabChange={handleTabChange} />

      {currentView === "home" ? (
        // Home view with carousels
        <>
          {/* Products Grid with Carousel */}
          <section className="py-16">
            <div className="container relative mx-auto">
              <div className="overflow-hidden" ref={productsEmblaRef}>
                <div className="flex gap-8">
                  {marketplaceProducts
                    .filter((product) => product.featured)
                    .map((product) => (
                      <div
                        className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%]"
                        key={product.id}
                      >
                        <WellnessProductCard
                          title={product.name}
                          description={product.description}
                          price={product.price}
                          image={product.image}
                          publisher={product.publisher}
                          productUrl={product.productUrl}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Products Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute -left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-background shadow-md"
                onClick={() => productsEmblaApi?.scrollPrev()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-background shadow-md"
                onClick={() => productsEmblaApi?.scrollNext()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Chambers Section */}
          <section className="bg-muted py-16">
            <div className="container mx-auto">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-['Raleway'] text-2xl font-semibold sm:text-3xl">
                  Chambers
                </h2>
                <Link href="/chambers">
                  <Button variant="default" className="gap-2">
                    View all
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <div className="overflow-hidden" ref={chambersEmblaRef}>
                  <div className="flex">
                    {combinedChamberData.map((chamber) => (
                      <div
                        key={chamber.id}
                        className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                      >
                        <ChamberCard
                          {...chamber}
                          onQuickView={() => {
                            setSelectedChamber(chamber);
                            setIsQuickViewOpen(true);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chambers Navigation Buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 rounded-full"
                  onClick={() => chambersEmblaApi?.scrollPrev()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full"
                  onClick={() => chambersEmblaApi?.scrollNext()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </>
      ) : (
        // Marketplace view with grid layout and pagination
        <section className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {getCurrentPageItems().map((product) => (
                <WellnessProductCard
                  key={product.id}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  publisher={product.publisher}
                  productUrl={product.productUrl}
                />
              ))}
            </div>

            {/* Only show pagination if there's more than one page */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    // Scroll to top of grid when changing pages
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Consultation Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <Card>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Text Content */}
                <div className="flex flex-1 flex-col justify-center p-8">
                  <h2 className="mb-4 font-['Raleway'] text-2xl font-bold sm:text-3xl">
                    Not Sure Where To Start?
                  </h2>
                  <p className="mb-6 text-muted-foreground">
                    Speak To Our Expert Consultants One-On-One.
                  </p>
                  <Button className="w-full md:w-auto">
                    Book Consultation
                  </Button>
                </div>

                {/* Image */}
                <div className="relative aspect-[4/3] md:w-1/2">
                  <Image
                    src="/wellness-product-images/pete-wellness.png"
                    alt="Hyperbaric Chamber Consultation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <WhyWorkSection />

      {/* Buyer's Guide */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="mb-8 font-['Raleway'] text-2xl font-bold sm:text-3xl">
            Buyer&apos;s Guide
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Guide Card 1 */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src="/images/guide-1.jpg"
                    alt="Wellness Centres are LOVING HBOT"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-medium">
                    Wellness Centres are LOVING HBOT
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Wellness centres getting an ROI shocking rate in new and old
                    clients at record high levels.
                  </p>
                  <Button variant="link" className="p-0">
                    See More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Guide Card 2 */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src="/wellness-product-images/pete-wellness.png"
                    alt="Home Hyperbaric Set Ups"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-medium">
                    Home Hyperbaric Set Ups
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    The easiest home hyperbaric setups we've seen that are ready
                    to be used in minutes!
                  </p>
                  <Button variant="link" className="p-0">
                    See More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Guide Card 3 */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src="/images/guide-3.jpg"
                    alt="Home Hyperbaric Set Ups"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-medium">
                    Home Hyperbaric Set Ups
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    The easiest home hyperbaric setups we&apos;ve seen that are
                    ready to be used in minutes!
                  </p>
                  <Button variant="link" className="p-0">
                    See More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto">
          <h2 className="mb-8 text-center font-['Raleway'] text-3xl font-bold sm:text-4xl">
            FAQs | Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="rounded-lg bg-background px-6 py-4 text-left hover:no-underline">
                  How does HBOT Work?
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-2">
                  HBOT works by increasing the amount of oxygen your blood can
                  carry. An increase in blood oxygen temporarily restores normal
                  levels of blood gases and tissue function to promote healing
                  and fight infection.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="rounded-lg bg-background px-6 py-4 text-left hover:no-underline">
                  Do I need my Doctor&apos;s clearance?
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-2">
                  While HBOT is generally safe, it's always recommended to
                  consult with your doctor before starting any new treatment,
                  especially if you have any pre-existing medical conditions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="rounded-lg bg-background px-6 py-4 text-left hover:no-underline">
                  Is HBOT Safe for kids?
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-2">
                  HBOT can be safe for children when administered under proper
                  medical supervision. However, it's crucial to consult with a
                  pediatrician or specialist before considering HBOT for a
                  child.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="rounded-lg bg-background px-6 py-4 text-left hover:no-underline">
                  Do I need a protocol?
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-2">
                  Yes, a treatment protocol is essential for HBOT. The number of
                  sessions, duration, and pressure levels will be determined
                  based on your specific condition and health status.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="rounded-lg bg-background px-6 py-4 text-left hover:no-underline">
                  How often can I do HBOT?
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-2">
                  The frequency of HBOT sessions can vary depending on your
                  condition and treatment plan. Typically, treatments are
                  administered daily for acute conditions and may be less
                  frequent for chronic conditions. Always follow your healthcare
                  provider's recommendations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <EmailInputForm />
      <ContactSection />

      {/* Chamber Quick View Modal */}
      {selectedChamber && (
        <ChamberQuickView
          isOpen={isQuickViewOpen}
          onClose={() => {
            setIsQuickViewOpen(false);
            setSelectedChamber(null);
          }}
          chamber={selectedChamber}
        />
      )}
    </div>
  );
};

export default MarketPage;
