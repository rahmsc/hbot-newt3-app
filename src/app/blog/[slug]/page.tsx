"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter,  } from "next/navigation"
import RichText from "~/components/utils/rich-text"
import ParallaxHeader from "~/components/blog/ParallaxHeader"
import { getBlogPostBySlug } from "~/utils/supabase/blogs/getBlogPosts"
import type { BlogDbEntry, RichContent } from "~/types/blog"
import Spinner from "~/components/utils/spinner"


type PageProps = {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogDbEntry | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getBlogPostBySlug(params.slug)
      if (fetchedPost) {
        setPost(fetchedPost)
      } else {
        console.log("not found", fetchedPost)
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
        title={post.title}
        imageUrl={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/${post.blog_id}_1.png`}
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
              {/* <RichText 
                content={post.introduction} 
                className="leading-relaxed prose prose-sm sm:prose-base mx-auto"
              /> */}
              <p>
                {post.introduction as unknown as string}
              </p>
            </div>

            <div className="mb-6 sm:mb-10 overflow-hidden rounded-lg shadow-lg">
              <div className="relative aspect-[16/9]">
                <Image
                  src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/${post.blog_id}_2.png`}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                  priority
                />
              </div>
            </div>

            <div className="mb-6 sm:mb-10">
              <RichText 
                content={post.body as unknown as RichContent} 
                className="leading-relaxed prose prose-sm sm:prose-base mx-auto"
              />
            </div>

            <div className="mb-6 sm:mb-10 overflow-hidden rounded-lg shadow-lg">
              <div className="relative aspect-[16/9]">
                <Image
                  src={`https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/blogs/${post.blog_id}_3.png`}
                  alt={post.title}
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

