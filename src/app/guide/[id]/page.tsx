import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";

import RichText from "~/components/utils/rich-text";
import { getGuideById } from "~/utils/airtable/guides/getGuideById";

export interface GuidePageProp {
  id: string;
  fields: {
    "Guide Title": string;
    Guide: string;
    "ID Blog": number;
    "Guide Heading": string;
    "Guide Introduction": string;
    "Guide Body": string;
  };
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const guide = await getGuideById(id);

  if (!guide) {
    return {
      title: "Guide Not Found",
      description: "The requested guide could not be found.",
    };
  }

  return {
    title: `${guide.fields["Guide Title"]} | HBOT-HQ Provider Guide`,
    description: guide.fields["Guide Introduction"].substring(0, 160),
    openGraph: {
      title: guide.fields["Guide Title"],
      description: guide.fields["Guide Introduction"].substring(0, 160),
      type: "article",
      url: `https://www.hyperbarichq.com/guides/provider/${id}`,
      images: [
        {
          url: `https://d144dqt8e4woe2.cloudfront.net/guides/header/${guide.fields["ID Blog"]}.png`,
          width: 1000,
          height: 500,
          alt: guide.fields["Guide Title"],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.fields["Guide Title"],
      description: guide.fields["Guide Introduction"].substring(0, 160),
      images: [
        `https://d144dqt8e4woe2.cloudfront.net/guides/header/${guide.fields["ID Blog"]}.png`,
      ],
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { id } = await params;
  const guide = await getGuideById(id);

  if (!guide) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.fields["Guide Title"],
    image: `https://d144dqt8e4woe2.cloudfront.net/guides/header/${guide.fields["ID Blog"]}.png`,
    description: guide.fields["Guide Introduction"].substring(0, 160),
    articleBody: guide.fields["Guide Body"],
    publisher: {
      "@type": "Organization",
      name: "HBOT-HQ",
      logo: {
        "@type": "ImageObject",
        url: "https://hbot-hq.com/logo.png",
      },
    },
  };

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            {guide.fields["Guide Title"]}
          </h1>
        </header>

        <div className="mb-10 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/guides/header/${guide.fields["ID Blog"]}.png`}
            alt={guide.fields["Guide Title"]}
            width={1000}
            height={500}
            className="w-full object-cover"
          />
        </div>

        <div className="mb-10 text-lg">
          <RichText
            content={guide.fields["Guide Introduction"]}
            className="leading-relaxed"
          />
        </div>

        <div className="mb-10 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/guides/image2/${guide.fields["ID Blog"]}.png`}
            alt={guide.fields["Guide Title"]}
            width={1000}
            height={500}
            className="w-full object-cover"
          />
        </div>

        <div className="mb-10 text-lg">
          <RichText
            content={guide.fields["Guide Body"]}
            className="leading-relaxed"
          />
        </div>
      </article>
    </>
  );
}
