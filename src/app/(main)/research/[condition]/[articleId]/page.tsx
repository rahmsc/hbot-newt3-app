import { Suspense } from "react";
import ArticleContent from "~/components/article/article-content";
import CallToAction from "~/components/sections/call-to-action";
import Spinner from "~/components/spinner";
import getArticleById from "~/utils/airtable/getArticleById";
import type { Metadata } from "next";
import Script from "next/script";

function ArticleLoading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner size={100} className="text-orange-500" />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { articleId: string };
}): Promise<Metadata> {
  const foundArticles = await getArticleById(params.articleId);
  const foundArticle = foundArticles[0];

  if (!foundArticle) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${foundArticle.fields.heading} | HBOT-HQ Research`,
    description:
      foundArticle.fields.introduction ||
      "Read about this Hyperbaric Oxygen Therapy research study on HBOT-HQ.",
    keywords: [
      "HBOT",
      "Hyperbaric Oxygen Therapy",
      "Research",
      "Medical Study",
      foundArticle.fields.condition,
      ...(foundArticle.fields.keywords || []),
    ],
    authors: [{ name: foundArticle.fields.authors }],
    openGraph: {
      title: foundArticle.fields.heading,
      description: foundArticle.fields.introduction,
      type: "article",
      url: `https://www.hyperbarichq.com/research/${foundArticle.fields.conditionTag}/${foundArticle.id}`,
      images: [
        {
          url: `https://d144dqt8e4woe2.cloudfront.net/research-articles/${foundArticle.fields.id}.png`,
          width: 1200,
          height: 630,
          alt: foundArticle.fields.heading,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: foundArticle.fields.heading,
      description: foundArticle.fields.introduction,
      images: [
        `https://d144dqt8e4woe2.cloudfront.net/research-articles/${foundArticle.fields.id}.png`,
      ],
    },
  };
}

const StudyPage = async ({
  params,
}: {
  params: {
    articleId: string;
  };
}) => {
  const { articleId } = params;
  const foundArticles = await getArticleById(articleId);
  const foundArticle = foundArticles[0]; // Get the first (and presumably only) article

  if (!foundArticle) {
    return <div>Article not found</div>;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalScholarlyArticle",
    headline: foundArticle.fields.heading,
    datePublished: foundArticle.fields.publishedDate,
    dateModified: foundArticle.fields.publishedDate,
    author: {
      "@type": "Person",
      name: foundArticle.fields.authors,
    },
    publisher: {
      "@type": "Organization",
      name: "HBOT-HQ",
      logo: {
        "@type": "ImageObject",
        url: "https://www.hyperbarichq.com/logo.png",
      },
    },
    description: foundArticle.fields.introduction,
    url: `https://www.hyperbarichq.com/research/${foundArticle.fields.conditionTag}/${foundArticle.id}`,
    image: `https://d144dqt8e4woe2.cloudfront.net/research-articles/${foundArticle.fields.id}.png`,
    medicalCondition: {
      "@type": "MedicalCondition",
      name: foundArticle.fields.condition,
    },
    keywords: foundArticle.fields.keywords,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.hyperbarichq.com/research/${foundArticle.fields.conditionTag}/${foundArticle.id}`,
    },
  };

  return (
    <div className="w-full">
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <section className="flex w-full items-center justify-center pt-32">
        <div className="w-full max-w-screen-lg px-8 py-16">
          <Suspense fallback={<ArticleLoading />}>
            <ArticleContent foundArticle={foundArticle} />
          </Suspense>
        </div>
      </section>
      <CallToAction />
    </div>
  );
};

export default StudyPage;
