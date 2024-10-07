import type { Metadata } from "next";
import ContactForm from "~/components/contact/contact-form";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact HBOT-HQ | Get Your Free HBOT Chamber Guide",
  description:
    "Contact HBOT-HQ for expert guidance on Hyperbaric Oxygen Therapy chambers. Download our free comprehensive guide to make an informed decision for your home or clinic.",
  openGraph: {
    title: "Contact HBOT-HQ | Free HBOT Chamber Guide",
    description:
      "Get expert advice and a free comprehensive guide on HBOT chambers for your home or clinic. Make an informed decision with HBOT-HQ.",
    url: "https://www.hyperbarichq.com/contact",
    type: "website",
    images: [
      {
        url: "https://hbot-hq.com/images/contact-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HBOT-HQ Contact and Free Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact HBOT-HQ | Free HBOT Chamber Guide",
    description:
      "Get expert advice and a free guide on HBOT chambers. Make an informed decision for your home or clinic with HBOT-HQ.",
    images: ["https://hbot-hq.com/images/contact-twitter-image.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "HBOT-HQ Contact Page",
  description:
    "Contact HBOT-HQ for expert guidance on Hyperbaric Oxygen Therapy chambers and get a free comprehensive guide.",
  url: "https://www.hyperbarichq.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "HBOT-HQ",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@hyperbarichq.com",
    },
  },
  offers: {
    "@type": "Offer",
    name: "Free HBOT Chamber Buyer's Guide",
    description:
      "Comprehensive guide to help you make an informed decision about HBOT chambers for your home or clinic.",
    price: "0",
    priceCurrency: "AUD",
  },
};

export default function ContactPage() {
  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="min-h-screen pt-20 md:pt-36">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
