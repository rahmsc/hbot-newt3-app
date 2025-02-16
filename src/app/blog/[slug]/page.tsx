"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"

import RichText from "~/components/utils/rich-text"
import ParallaxHeader from "~/components/blog/ParallaxHeader"
import { getBlogPostBySlug } from "~/utils/airtable/blogs/getBlogPosts"
import type { BlogPost } from "~/types/blog"

type PageProps = {
  params: {
    slug: string
  }
}



export default function BlogPostPage({ params }: PageProps) {
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
    return <div>Loading...</div> // or any loading indicator you prefer
  }

  const progress = Math.min(scrollY / (windowHeight * 1.5), 1)

  return (
    <div className="relative min-h-screen">
      <ParallaxHeader
        title={post.fields["Content Idea"]}
        imageUrl={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/header/${post.fields["ID Blog"]}.png`}
      />
      <div
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translateY(${(1 - progress) * 150}vh)`,
        }}
      >
        <article className="bg-white rounded-t-3xl shadow-xl">
          <div className="px-6 py-16">
            <div className="mb-10 text-lg">
              <RichText content={post.fields.Introduction} className="leading-relaxed" />
            </div>

            <div className="mb-10 overflow-hidden rounded-lg shadow-lg">
              <Image
                src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/bodyimage1/${post.fields["ID Blog"]}.png`}
                alt={post.fields["Content Idea"]}
                width={1000}
                height={500}
                className="w-full object-cover"
              />
            </div>

            <div className="mb-10 text-lg">
              <RichText content={post.fields["Enriched Blog"]} className="leading-relaxed" />
            </div>

            <div className="mb-10 overflow-hidden rounded-lg shadow-lg">
              <Image
                src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/bodyimage2/${post.fields["ID Blog"]}.png`}
                alt={post.fields["Content Idea"]}
                width={1000}
                height={500}
                className="w-full object-cover"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

