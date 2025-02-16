"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"

import type { ArticlesProps } from "~/utils/supabase/articles/getArticleById"

import AccordionTemplate from "../utils/accordion-template"
import ParallaxHeader from "../blog/ParallaxHeader"
import RichText from "../utils/rich-text"

function ArticleContent({ foundArticle }: { foundArticle: ArticlesProps }) {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

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

  const imageUrl = "https://d144dqt8e4woe2.cloudfront.net/research-articles/"
  const progress = Math.min(scrollY / (windowHeight * 1.5), 1) // Increased scroll range

  return (
    <div className="relative min-h-screen">
      <ParallaxHeader
        title={foundArticle.heading}
        imageUrl={`${imageUrl}${foundArticle.id}.png`}
        subtitle={foundArticle.conditionId}
      />
      <div
        className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translateY(${(1 - progress) * 150}vh)`, // Increased initial offset
        }}
      >
        <div className="bg-white rounded-t-3xl shadow-xl">
          <div className="px-6 py-12 sm:px-12">
            <div className="flex flex-col justify-between space-y-4 text-left md:flex-row md:space-x-8 md:space-y-0">
              <div className="flex-1 space-y-2">
                <p className="font-bold text-red-600">CONDITION</p>
                <p>{foundArticle.conditionId}</p>
              </div>
              <div className="flex-1 space-y-2">
                <p className="font-bold text-red-600">PRESSURE USED</p>
                <p>{foundArticle.pressureUsed}</p>
              </div>
              <div className="flex-1 space-y-2">
                <p className="font-bold text-red-600"># OF SESSIONS</p>
                <p>{foundArticle.numberOfTreatments}</p>
              </div>
              <div className="flex-1 space-y-2">
                <p className="font-bold text-red-600">PUBLISHED DATE</p>
                <p>
                  {foundArticle.publishedDate && !Number.isNaN(new Date(foundArticle.publishedDate).getTime())
                    ? format(new Date(foundArticle.publishedDate), "MM/dd/yyyy")
                    : "Date not available"}
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col lg:flex-row lg:space-x-8">
              <div className="space-y-8 lg:w-2/3">
                <div className="space-y-4">
                  <AccordionTemplate
                    trigger={<h2 className="text-center text-3xl font-semibold">Outcome</h2>}
                    content={<RichText content={foundArticle.summary} className="leading-relaxed text-gray-700" />}
                    defaultOpen={true} // Set Outcome to be open by default
                  />
                </div>

                <div className="space-y-4">
                  <AccordionTemplate
                    trigger={<h2 className="text-3xl font-semibold">Introduction</h2>}
                    content={<RichText content={foundArticle.introduction} className="leading-relaxed text-gray-700" />}
                  />
                </div>

                <div className="space-y-4">
                  <AccordionTemplate
                    trigger={<h2 className="text-3xl font-semibold">Results</h2>}
                    content={<RichText content={foundArticle.results} className="leading-relaxed text-gray-700" />}
                  />
                </div>

                <div className="space-y-4">
                  <AccordionTemplate
                    trigger={<h2 className="text-3xl font-semibold">Conclusion</h2>}
                    content={
                      <RichText content={foundArticle.conclusion || ""} className="leading-relaxed text-gray-700" />
                    }
                  />
                </div>
              </div>

              <div className="mt-8 lg:mt-0 lg:w-1/3">
                <div className="top-24 space-y-4">
                  <h2 className="mb-4 text-3xl font-semibold">FAQs</h2>
                  <p className="text-gray-700">No FAQs available for this article.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleContent

