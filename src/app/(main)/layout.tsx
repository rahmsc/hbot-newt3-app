import "~/styles/globals.css";
import "~/styles/embla.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter, Raleway, Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";

import Hotjar from "~/components/hotjar";
import { MainNav } from "~/components/new-landing/header/main-nav";
import { TopNav } from "~/components/new-landing/header/top-nav";
import Footer from "~/components/sections/footer";
import { Toaster } from "~/components/ui/toaster";
import { AuthProvider } from "~/contexts/AuthContext";
import { TRPCReactProvider } from "~/trpc/react";
// import QuizPopup from "~/components/quiz-popup";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <Script id="structured-data" type="application/ld+json" />
      </head>
      <body
        className={`font-sans ${workSans.variable} ${raleway.variable} w-full overflow-x-hidden`}
      >
        <TRPCReactProvider>
          <AuthProvider>
            <TopNav />
            <MainNav />
            <main className="flex min-h-screen w-full flex-col items-center justify-between">
              {children}
            </main>
            <Footer />
            <Toaster />
            {/* <QuizPopup /> */}
          </AuthProvider>
        </TRPCReactProvider>
        <GoogleAnalytics gaId={"G-KZMJT45KDX"} />
        <Hotjar />
      </body>
    </html>
  );
}
