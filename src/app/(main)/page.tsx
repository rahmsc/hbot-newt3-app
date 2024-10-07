import { HydrateClient } from "~/trpc/server";
import ArticleSection from "~/components/sections/article-section";
import BlogSection from "~/components/sections/blog-section";
import ContactSection from "~/components/sections/contact-section";
import EmailInputForm from "~/components/sections/email-input-form";
import HeroSection from "~/components/sections/hero-section";
import LinkSection from "~/components/sections/link-section";
import ImageSection from "~/components/sections/image-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to HBOT-HQ | Hyperbaric Oxygen Therapy Research",
  description:
    "Discover cutting-edge Hyperbaric Oxygen Therapy research, articles, and community support at HBOT-HQ.",
  openGraph: {
    title: "HBOT-HQ: Your Hub for Hyperbaric Oxygen Therapy",
    description:
      "Explore the latest in HBOT research, connect with experts, and join our thriving community.",
    images: [
      {
        url: "https://hbot-hq.com/images/home-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HBOT-HQ Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HBOT-HQ: Your Hub for Hyperbaric Oxygen Therapy",
    description:
      "Explore the latest in HBOT research, connect with experts, and join our thriving community.",
    images: ["https://hbot-hq.com/images/home-twitter-image.jpg"],
  },
};

export default async function Home(): Promise<JSX.Element> {
  return (
    <HydrateClient>
      <main className="flex w-full flex-row items-center justify-center pt-32">
        <div>
          <HeroSection />
          <LinkSection />
          <ArticleSection />
          <ImageSection />
          <BlogSection />
          <EmailInputForm />
          <ContactSection />
        </div>
      </main>
    </HydrateClient>
  );
}
