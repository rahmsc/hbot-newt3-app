import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/navbar";
import Footer from "~/components/sections/footer";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "HBOT-HQ",
  description:
    "HBOT-HQ is a platform for hyperbaric oxygen therapy research and knowledge.",
  icons: [
    { rel: "icon", url: "/public/logo/hbot_logo_svg.svg" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/public/logo/hbothq_final_logo.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/public/logo/hbothq_final_logo.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/public/logo/hbothq_final_logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
