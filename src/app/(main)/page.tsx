import { HydrateClient } from "~/trpc/server";
import ArticleSection from "~/components/sections/article-section";
import BlogSection from "~/components/sections/blog-section";
import ContactSection from "~/components/sections/contact-section";
import EmailInputForm from "~/components/sections/email-input-form";
import HeroSection from "~/components/sections/hero-section";
import LinkSection from "~/components/sections/link-section";
import ImageSection from "~/components/sections/image-section";
import type { Metadata } from "next";
import Script from "next/script";
import getRandomArticles from "~/utils/supabase/getRandomArticles";
import getArticleById from "~/utils/supabase/getArticleById";
import getConditionListData from "~/utils/supabase/getConditionWithCategoryData";
import getArticlesByCondition from "~/utils/supabase/getArticlesByCondition";

export const metadata: Metadata = {
  title: "Welcome to HyperbaricHQ | Hyperbaric Oxygen Therapy Research",
  description:
    "Discover cutting-edge Hyperbaric Oxygen Therapy research, articles, and community support at HyperbaricHQ.",
  openGraph: {
    title: "HyperbaricHQ: Your Hub for Hyperbaric Oxygen Therapy",
    description:
      "Explore the latest in HBOT research, connect with experts, and join our thriving community.",
    images: [
      {
        url: "https://www.hyperbarichq.com/images/home-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HyperbaricHQ Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HyperbaricHQ: Your Hub for Hyperbaric Oxygen Therapy",
    description:
      "Explore the latest in HBOT research, connect with experts, and join our thriving community.",
    images: ["https://www.hyperbarichq.com/images/home-twitter-image.jpg"],
  },
};

export default async function Home(): Promise<JSX.Element> {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.hyperbarichq.com/#website",
        url: "https://www.hyperbarichq.com/",
        name: "HyperbaricHQ",
        description: "Your Hub for Hyperbaric Oxygen Therapy",
        publisher: {
          "@id": "https://www.hyperbarichq.com/#organization",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": "https://www.hyperbarichq.com/#organization",
        name: "HyperbaricHQ",
        url: "https://www.hyperbarichq.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://www.hyperbarichq.com/logo.png",
          contentUrl: "https://www.hyperbarichq.com/logo.png",
          width: 512,
          height: 512,
          caption: "HyperbaricHQ Logo",
        },
        sameAs: [
          "https://www.facebook.com/hyperbarichq",
          "https://twitter.com/hyperbarichq",
          "https://www.linkedin.com/company/hyperbarichq",
          "https://www.youtube.com/channel/hyperbarichq",
        ],
      },
    ],
  };

  const conditionListData = await getArticlesByCondition(45);
  // const conditionListData = await getConditionListData();
  console.log(conditionListData);

  return (
    <HydrateClient>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <main className="flex w-full flex-row items-center justify-center pt-32">
        <div>
          <HeroSection />
          {/* <LinkSection />
          <ArticleSection />
          <ImageSection />
          <BlogSection />
          <EmailInputForm />
          <ContactSection /> */}
        </div>
      </main>
    </HydrateClient>
  );
}
