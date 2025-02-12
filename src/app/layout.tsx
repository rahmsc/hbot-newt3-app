import "~/styles/globals.css";
import "~/styles/embla.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Raleway, Roboto, Space_Mono } from "next/font/google";
import Script from "next/script";

import { MainNav } from "~/components/header/main-nav";
import { TopNav } from "~/components/header/top-nav";
import Footer from "~/components/landing/sections/footer";
import { Toaster } from "~/components/ui/toaster";
import Hotjar from "~/components/utils/hotjar";
import { AuthProvider } from "~/contexts/auth-context";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
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
        className={`${roboto.variable} ${raleway.variable} ${spaceMono.variable} w-full overflow-x-hidden font-body`}
      >
        <AuthProvider>
          <TopNav />
          <MainNav />
          <main className="flex min-h-screen w-full flex-col items-center justify-between pt-28">
            {children}
          </main>
          <Footer />
          <Toaster />
          <GoogleAnalytics gaId={"G-KZMJT45KDX"} />
          <Hotjar />
        </AuthProvider>
      </body>
    </html>
  );
}
