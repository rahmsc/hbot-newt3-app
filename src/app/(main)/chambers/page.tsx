import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import ChamberMasonryGrid from "~/components/chambers/chamber-masonry-grid";
import { sendGAEvent } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "HBOT Chambers | Home and Clinic Solutions | HBOT-HQ",
  description:
    "Explore various types of Hyperbaric Oxygen Therapy chambers for home and clinic use. Get expert guidance and access the latest HBOT research and solutions.",
  openGraph: {
    title: "HBOT Chambers for Home and Clinic | HBOT-HQ",
    description:
      "Discover the right Hyperbaric Oxygen Therapy chamber for your needs. Expert guidance and latest HBOT solutions available.",
    url: "https://www.hyperbarichq.com/chamber",
    type: "website",
    images: [
      {
        url: "https://hbot-hq.com/images/hbot-chambers-og.jpg",
        width: 1200,
        height: 630,
        alt: "HBOT Chambers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HBOT Chambers | Home and Clinic Solutions",
    description:
      "Find the perfect HBOT chamber for your home or clinic. Expert guidance and latest research available.",
    images: ["https://hbot-hq.com/images/hbot-chambers-twitter.jpg"],
  },
};

const Chambers = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "HBOT Chambers",
    description: "Hyperbaric Oxygen Therapy chambers for home and clinic use",
    url: "https://www.hyperbarichq.com/chamber",
    brand: {
      "@type": "Brand",
      name: "HBOT-HQ",
    },
    offers: {
      "@type": "AggregateOffer",
      offerCount: "Multiple",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <section className="flex w-full flex-col items-center justify-center pt-32">
        <div className="mx-auto w-full max-w-7xl p-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 font-editors-note text-3xl font-bold text-gray-900 sm:text-4xl">
              Considering HBOT For Your Home Or Clinic?
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              Navigating hyperbaric oxygen therapy can be overwhelming. We make
              it easy. Access specialist knowledge, the latest research, and
              reputable HBOT solutions – all in one place.
            </p>
            <h2 className="mb-8 text-2xl font-semibold text-gray-800">
              Get Your Free Guide To HBOT Chambers Below
            </h2>
            <Link
              href="/contact"
              // onClick={() =>
              //   sendGAEvent("event", "buttonClicked", {
              //     value: "Contact Us(Chamber Page)",
              //   })
              // }
              className="mb-5 inline-block rounded-full bg-orange-500 px-8 py-3 text-lg font-bold text-white transition duration-300 hover:bg-orange-600"
            >
              Contact Us
            </Link>
          </div>
          <div className="my-12 border-t border-gray-300" />
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="mt-2 text-4xl font-bold text-gray-900">
                Types of Chambers
              </h2>
            </div>

            <div className="flex justify-center">
              <ChamberMasonryGrid />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chambers;
