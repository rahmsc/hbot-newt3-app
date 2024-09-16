import "~/styles/globals.css";

import { type Metadata } from "next";
import localFont from "next/font/local";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/navbar";
import Footer from "~/components/sections/footer";
import { Toaster } from "~/components/ui/toaster";

const editorsNote = localFont({
  src: [
    {
      path: "../../public/fonts/editors_note/EditorsNote-Regular-iF664322be6e849.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-Italic-iF664322be57316.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-Bold-iF664322be38357.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-BoldItalic-iF664322be3e863.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-Light-iF664322be5b734.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-LightItalic-iF664322be6092b.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-Medium-iF664322be6500a.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-MediumItalic-iF664322be6a12d.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-Semibold-iF664322be731c3.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-SemiboldItalic-iF664322be785e3.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-Thin-iF664322be7fa2e.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-ThinItalic-iF664322be84b79.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-Extralight-iF664322be43be3.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-ExtralightItalic-iF664322be48dd8.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-Hairline-iF664322be4e4fb.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/editors_note/EditorsNote-HairlineItalic-iF664322be52ef6.otf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-editors-note",
});

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
    <html lang="en" className={editorsNote.variable}>
      <body className="font-sans">
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
