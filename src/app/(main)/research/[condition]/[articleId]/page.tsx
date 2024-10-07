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
  const article = foundArticles[0];

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  const title = article.fields.heading;
  const authors = article.fields.authors;
  const condition = article.fields.condition;
  const summary = article.fields.introduction;
  const articleId = article.fields.id;

  return {
    title: `${title} | HBOT Research`,
    description:
      summary ||
      `Research on Hyperbaric Oxygen Therapy (HBOT) for ${condition}. Study by ${authors}.`,
    keywords: [
      "HBOT",
      "Hyperbaric Oxygen Therapy",
      condition,
      "Medical Research",
      ...authors.split(", "),
    ],
    authors: authors.split(", ").map((author) => ({ name: author })),
    openGraph: {
      title: `HBOT Study: ${title}`,
      description:
        summary ||
        `Explore this research on Hyperbaric Oxygen Therapy for ${condition}. Conducted by ${authors}.`,
      type: "article",
      url: `https://www.hyperbarichq.com/research/${article.fields.conditionTag}/${params.articleId}`,
      images: [
        {
          url: `https://d144dqt8e4woe2.cloudfront.net/research-articles/${articleId}.png`,
          width: 1200,
          height: 630,
          alt: `HBOT Research: ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `HBOT Research: ${title}`,
      description:
        summary ||
        `Study on HBOT for ${condition} by ${authors}. Read the full research on HBOT-HQ.`,
      images: [
        `https://d144dqt8e4woe2.cloudfront.net/research-articles/${articleId}.png`,
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
    author: foundArticle.fields.authors.split(", ").map((author: string) => ({
      "@type": "Person",
      name: author,
    })),
    datePublished: foundArticle.fields.publishedDate,
    description: foundArticle.fields.introduction,
    url: `https://www.hyperbarichq.com/research/${foundArticle.fields.conditionTag}/${articleId}`,
    keywords: [
      "HBOT",
      "Hyperbaric Oxygen Therapy",
      foundArticle.fields.condition,
    ],
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
