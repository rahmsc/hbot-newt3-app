import "~/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

import { GoogleAnalytics } from "@next/third-parties/google";
import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/navbar";
import Footer from "~/components/sections/footer";
import { Toaster } from "~/components/ui/toaster";
import Script from "next/script";
import Hotjar from "~/components/hotjar";
// import QuizPopup from "~/components/quiz-popup";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const editorsNote = localFont({
  src: [
    {
      path: "../../../public/fonts/editors_note/EditorsNote-Regular-iF664322be6e849.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-Italic-iF664322be57316.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-Bold-iF664322be38357.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-BoldItalic-iF664322be3e863.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-Light-iF664322be5b734.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-LightItalic-iF664322be6092b.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-Medium-iF664322be6500a.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-MediumItalic-iF664322be6a12d.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-Semibold-iF664322be731c3.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-SemiboldItalic-iF664322be785e3.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-Thin-iF664322be7fa2e.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-ThinItalic-iF664322be84b79.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-Extralight-iF664322be43be3.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-ExtralightItalic-iF664322be48dd8.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-Hairline-iF664322be4e4fb.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/editors_note/EditorsNote-HairlineItalic-iF664322be52ef6.otf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-editors-note",
});

export const metadata: Metadata = {
  title: {
    default: "HBOT-HQ | Hyperbaric Oxygen Therapy Research and Knowledge",
    template: "%s | HBOT-HQ",
  },
  description:
    "HBOT-HQ is a platform for hyperbaric oxygen therapy research and knowledge, providing articles, guides, and community support.",
  keywords: [
    "Hyperbaric Oxygen Therapy",
    "HBOT",
    "Oxygen Therapy",
    "Medical Research",
    "Health",
    "Wellbeing",
  ],
  authors: [{ name: "HBOT-HQ Team" }],
  creator: "HBOT-HQ",
  publisher: "HBOT-HQ",
  icons: [
    { rel: "icon", url: "/logo/hbot_logo_svg.svg" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/logo/hbothq_final_logo.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/logo/hbothq_final_logo.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/logo/hbothq_final_logo.png",
    },
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://www.hyperbarichq.com",
    siteName: "HBOT-HQ",
    title: "HBOT-HQ: Hyperbaric Oxygen Therapy Research and Knowledge",
    description:
      "Comprehensive platform for Hyperbaric Oxygen Therapy research, articles, guides, and community support.",
    images: [
      {
        url: "https://www.hyperbarichq.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HBOT-HQ: Advancing Hyperbaric Oxygen Therapy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HBOT-HQ: Hyperbaric Oxygen Therapy Research and Knowledge",
    description:
      "Comprehensive platform for Hyperbaric Oxygen Therapy research, articles, guides, and community support.",
    images: ["https://www.hyperbarichq.com/twitter-image.jpg"],
    creator: "@hyperbarichq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.hyperbarichq.com/#website",
        url: "https://www.hyperbarichq.com/",
        name: "HBOT-HQ",
        description: "Hyperbaric Oxygen Therapy Research and Knowledge",
        publisher: {
          "@id": "https://www.hyperbarichq.com/#organization",
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://www.hyperbarichq.com/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "en-AU",
      },
      {
        "@type": "Organization",
        "@id": "https://www.hyperbarichq.com/#organization",
        name: "HBOT-HQ",
        url: "https://www.hyperbarichq.com/",
        logo: {
          "@type": "ImageObject",
          inLanguage: "en-AU",
          "@id": "https://www.hyperbarichq.com/#/schema/logo/image/",
          url: "https://www.hyperbarichq.com/logo/hbothq_final_logo.png",
          contentUrl: "https://www.hyperbarichq.com/logo/hbothq_final_logo.png",
          width: 512,
          height: 512,
          caption: "HBOT-HQ",
        },
        image: {
          "@id": "https://www.hyperbarichq.com/#/schema/logo/image/",
        },
        sameAs: [
          "https://www.facebook.com/hyperbarichq",
          "https://www.twitter.com/hyperbarichq",
          "https://www.linkedin.com/company/hyperbarichq",
          "https://www.youtube.com/channel/hyperbarichq",
        ],
      },
    ],
  };

  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify(structuredData)}
        </Script>
      </head>
      <body
        className={`font-sans ${inter.variable} ${editorsNote.variable} w-full overflow-x-hidden`}
      >
        <TRPCReactProvider>
          <Navbar />
          <main className="flex min-h-screen w-full flex-col items-center justify-between">
            {children}
          </main>
          <Footer />
          <Toaster />
          {/* <QuizPopup /> */}
        </TRPCReactProvider>
        <GoogleAnalytics gaId={"G-KZMJT45KDX"} />
        <Hotjar />
      </body>
    </html>
  );
}
