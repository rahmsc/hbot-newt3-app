"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ParallaxHeader from "~/components/blog/ParallaxHeader"
import type { BlogDbEntry, RichContent } from "~/types/blog"
import RichText from "~/components/utils/rich-text"
import { getGuideBySlug } from "~/utils/supabase/guides/getAllGuides"

type PageProps = {
  params: {
    slug: string
  }
}

export default function GuidePage({ params }: PageProps) {
  const router = useRouter()
  const [guide, setGuide] = useState<BlogDbEntry | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const fetchGuide = async () => {
      const fetchedGuide = await getGuideBySlug(params.slug)
      console.log("fetchedGuide||||||||||", fetchedGuide)
      if(fetchedGuide){
        setGuide(fetchedGuide)
      } else {
        console.log("not found", fetchedGuide)
      }
    }
    fetchGuide()
  }, [params.slug])

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }
    const handleScroll = () => setScrollY(window.scrollY)

    handleResize()
    handleScroll()

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!guide) {
    return <div>Loading...</div>
  }

  const progress = Math.min(scrollY / (windowHeight * 1.5), 1)

  return (
    <div className="relative min-h-screen">
      <ParallaxHeader
        title={guide.title}
        imageUrl={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/guides/header/${guide.blog_id}.png`}
        progress={progress}
      />
      <div
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translateY(${(1 - progress) * 150}vh)`,
        }}
      >
        <article className="bg-white rounded-t-3xl shadow-xl">
          <div className="px-6 py-16">
            <div className="mb-6 sm:mb-10">
              <RichText 
                content={guide.introduction as unknown as RichContent} 
                className="prose prose-sm sm:prose-base mx-auto max-w-none"
              />
            </div>

            <div className="mb-6 sm:mb-10 overflow-hidden rounded-lg shadow-lg">
              <div className="relative aspect-[16/9]">
                <Image
                  src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/guides/image2/${guide.blog_id}.png`}
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
                className="prose prose-sm sm:prose-base mx-auto max-w-none"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

