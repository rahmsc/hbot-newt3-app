"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface GuideParallaxHeaderProps {
  imageUrl: string
}

export default function GuideParallaxHeader({ imageUrl }: GuideParallaxHeaderProps) {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

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

  const imageHeight = windowHeight * 1.1 // 125% of viewport height
  const scrollRange = imageHeight - windowHeight
  const scrollProgress = Math.min(scrollY / scrollRange, 1)
  const blurAmount = Math.max(0, (scrollProgress - 0.5) * 20) // Delayed blur effect

  return (
    <div
      ref={headerRef}
      className="sticky top-8 left-0 w-full overflow-hidden z-0"
      style={{ height: `${imageHeight}px` }}
    >
      <div
        className="relative transition-all duration-300 ease-out"
        style={{
          width: "95%",
          margin: "0 auto",
          height: "100%",
          transform: `translateY(-${Math.min(scrollProgress, 0.75) * 25}%)`,
          filter: `blur(${blurAmount}px)`,
        }}
      >
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Guide header"
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-out"
        />
      </div>
    </div>
  )
}

