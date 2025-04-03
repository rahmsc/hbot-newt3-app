"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GuideParallaxHeader from "~/components/guide/guide-parallax-header";
import type { BlogDbEntry, RichContent } from "~/types/blog";
import RichText from "~/components/utils/rich-text";
import { getGuideBySlug } from "~/utils/supabase/guides/getAllGuides";
import Spinner from "~/components/utils/spinner";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function GuidePage({ params }: PageProps) {
  const router = useRouter();
  const [guide, setGuide] = useState<BlogDbEntry | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const fetchGuide = async () => {
      const fetchedGuide = await getGuideBySlug(params.slug);
      if (fetchedGuide) {
        setGuide(fetchedGuide);
      } else {
        console.log("not found", fetchedGuide);
      }
    };
    fetchGuide();
  }, [params.slug]);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    const handleScroll = () => setScrollY(window.scrollY);

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!guide) {
    return <Spinner />;
  }

  const progress = Math.min(scrollY / (windowHeight * 1.5), 1);

  return (
    <div className="relative min-h-screen">
      <GuideParallaxHeader
        title={guide.title}
        imageUrl={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/${guide.blog_id}_1.png`}
        progress={progress}
        guideId={guide.blog_id}
      />
      <div
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translateY(${(1 - progress) * 100}vh)`,
        }}
      >
        <article className="rounded-t-3xl bg-white shadow-xl">
          <div className="px-6 py-16">
            <div className="mb-6 sm:mb-10">
              <RichText
                content={guide.introduction as unknown as RichContent}
                className="prose prose-sm mx-auto max-w-none sm:prose-base"
              />
            </div>

            <div className="mb-6 overflow-hidden rounded-lg shadow-lg sm:mb-10">
              <div className="relative aspect-[16/9]">
                <Image
                  src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/${guide.blog_id}_2.png`}
                  alt={guide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                  priority
                />
              </div>
            </div>

            <div className="mb-6 sm:mb-10">
              <RichText
                content={guide.body as unknown as RichContent}
                className="prose prose-sm mx-auto max-w-none sm:prose-base"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
