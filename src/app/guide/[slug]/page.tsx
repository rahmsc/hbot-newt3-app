"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { notFound, useRouter } from "next/navigation"
import ParallaxHeader from "~/components/blog/ParallaxHeader"
import { getGuideById } from "~/utils/airtable/guides/getGuideById"
import type { GuidePageProp } from "~/types/guide"
import RichText from "~/components/utils/rich-text"

type PageProps = {
  params: {
    slug: string
  }
}

export default function GuidePage({ params }: PageProps) {
  const router = useRouter()
  const [guide, setGuide] = useState<GuidePageProp | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const fetchGuide = async () => {
      const fetchedGuide = await getGuideById(params.slug)
      
      if (!fetchedGuide) {
        notFound()
        return
      }

      setGuide(fetchedGuide)
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
        title={guide.fields["Guide Title"]}
        subtitle={guide.fields["Guide Heading"]}
        imageUrl={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/guides/header/${guide.fields["ID Blog"]}.png`}
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
                content={guide.fields["Guide Introduction"]} 
                className="prose prose-sm sm:prose-base mx-auto max-w-none"
              />
            </div>

            <div className="mb-6 sm:mb-10 overflow-hidden rounded-lg shadow-lg">
              <div className="relative aspect-[16/9]">
                <Image
                  src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/guides/image2/${guide.fields["ID Blog"]}.png`}
                  alt={guide.fields["Guide Title"]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                  priority
                />
              </div>
            </div>

            <div className="mb-6 sm:mb-10">
              <RichText 
                content={guide.fields["Guide Body"]} 
                className="prose prose-sm sm:prose-base mx-auto max-w-none"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

