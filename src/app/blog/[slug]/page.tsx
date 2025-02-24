"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, notFound } from "next/navigation"
import RichText from "~/components/utils/rich-text"
import ParallaxHeader from "~/components/blog/ParallaxHeader"
import { getBlogPostBySlug } from "~/utils/airtable/blogs/getBlogPosts"
import type { BlogPost } from "~/types/blog"
import Spinner from "~/components/utils/spinner"


type PageProps = {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getBlogPostBySlug(params.slug)
      if (fetchedPost) {
        setPost(fetchedPost)
      } else {
        notFound()
      }
    }
    fetchPost()
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

  if (!post) {
    return <div>Loading...</div>
  }

  const progress = Math.min(scrollY / (windowHeight * 1.5), 1)

  return (
    <div className="relative min-h-screen">
      <ParallaxHeader
        title={post.fields["Content Idea"]}
        imageUrl={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/header/${post.fields["ID Blog"]}.png`}
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
                content={post.fields.Introduction} 
                className="leading-relaxed prose prose-sm sm:prose-base mx-auto"
              />
            </div>

            <div className="mb-6 sm:mb-10 overflow-hidden rounded-lg shadow-lg">
              <div className="relative aspect-[16/9]">
                <Image
                  src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/bodyimage1/${post.fields["ID Blog"]}.png`}
                  alt={post.fields["Content Idea"]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                  priority
                />
              </div>
            </div>

            <div className="mb-6 sm:mb-10">
              <RichText 
                content={post.fields["Enriched Blog"]} 
                className="leading-relaxed prose prose-sm sm:prose-base mx-auto"
              />
            </div>

            <div className="mb-6 sm:mb-10 overflow-hidden rounded-lg shadow-lg">
              <div className="relative aspect-[16/9]">
                <Image
                  src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/bodyimage2/${post.fields["ID Blog"]}.png`}
                  alt={post.fields["Content Idea"]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

