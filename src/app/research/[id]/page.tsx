"use client";

import { Suspense, useState, useEffect } from "react";

import ArticleContent from "~/components/research/article-content";
import Spinner from "~/components/utils/spinner";
import getArticleById from "~/utils/supabase/articles/getArticleById";
import type { ArticlesProps } from "~/utils/supabase/articles/getArticleById";

function ArticleLoading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Spinner />
    </div>
  );
}

type PageProps = {
  params: { id: string };
};

const StudyPage = ({ params }: PageProps) => {
  const { id } = params;
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [foundArticle, setFoundArticle] = useState<ArticlesProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id || Number.isNaN(Number(id))) {
        setError("Invalid article ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const article = await getArticleById(Number(id));
        if (!article) {
          setError("Article not found");
        } else {
          setFoundArticle(article);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Error loading article. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchArticle();
  }, [id]);

  if (isLoading) {
    return <ArticleLoading />;
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg text-gray-700">{error}</p>
      </div>
    );
  }

  if (!foundArticle) {
    return null;
  }

  const progress = Math.min(scrollY / (windowHeight * 0.8), 1);

  return (
    <div className="w-full">
      <ArticleContent foundArticle={foundArticle} progress={progress} />
    </div>
  );
};

export default StudyPage;
