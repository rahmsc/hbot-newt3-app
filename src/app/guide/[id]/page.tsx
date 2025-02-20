"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"

import RichText from "~/components/utils/rich-text"
import { getGuideById } from "~/utils/airtable/guides/getGuideById"
import type { GuidePageProp } from "~/types/guide"
import GuideParallaxHeader from "~/components/guide/guide-parallax-header"

type PageProps = {
  params: {
    id: string
  }
}

export default function GuidePage({ params }: PageProps) {
  const [guide, setGuide] = useState<GuidePageProp | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const fetchGuide = async () => {
      const fetchedGuide = await getGuideById(params.id)
      if (fetchedGuide) {
        setGuide(fetchedGuide)
      } else {
        notFound()
      }
    }
    fetchGuide()
  }, [params.id])

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

  const navbarHeight = 64 // Adjust this to match your navbar height
  const imageHeight = windowHeight * 1.25
  const contentStartPosition = imageHeight - windowHeight + navbarHeight
  const contentScrollRange = windowHeight * 0.5
  const contentProgress = Math.max(0, Math.min((scrollY - contentStartPosition) / contentScrollRange, 1))

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 w-full h-full bg-gray-200 z-[-1]" />
      <GuideParallaxHeader
        imageUrl={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/guides/header/${guide.fields["ID Blog"]}.png`}
      />
      <div
        className="relative z-10 mx-auto"
        style={{
          marginTop: `${windowHeight}px`, // Add margin-top equal to viewport height
        }}
      >
        <article className="bg-white rounded-t-3xl shadow-xl max-w-4xl mx-auto">
          <div className="px-6 py-16">
            <h1 className="text-4xl font-bold mb-8">{guide.fields["Guide Title"]}</h1>
            {guide.fields["Guide Heading"] && (
              <h2 className="text-2xl font-semibold mb-6">{guide.fields["Guide Heading"]}</h2>
            )}
            <div className="mb-10 text-lg">
              <RichText content={guide.fields["Guide Introduction"]} className="leading-relaxed" />
            </div>

            <div className="mb-10 overflow-hidden rounded-lg shadow-lg">
              <Image
                src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/guides/image2/${guide.fields["ID Blog"]}.png`}
                alt={guide.fields["Guide Title"]}
                width={1000}
                height={1000}
                className="w-full object-cover"
              />
            </div>

            <div className="mb-10 text-lg">
              <RichText content={guide.fields["Guide Body"]} className="leading-relaxed" />
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

