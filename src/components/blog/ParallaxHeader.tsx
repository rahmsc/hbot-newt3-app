"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface ParallaxHeaderProps {
  title: string
  imageUrl: string
  subtitle?: string
}

export default function ParallaxHeader({ title, imageUrl, subtitle }: ParallaxHeaderProps) {
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

  // Constants
  const parallaxRange = windowHeight // Parallax effect completes over one full viewport height
  const initialZoom = 1.2 // Initial zoom level (110%)

  // Calculate progress
  const progress = Math.min(scrollY / parallaxRange, 1)

  // Calculate image zoom and title opacity
  const imageZoom = initialZoom - progress * (initialZoom - 1)

  const titleOpacity = progress < 0.2 ? 1 : 1 - (progress - 0.2) / (0.55 - 0.2)

  return (
    <div ref={headerRef} className="fixed top-0 left-0 w-full h-screen overflow-hidden z-0">
      <div className="absolute inset-0">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${imageZoom})`,
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ease-out"
        style={{
          opacity: titleOpacity,
        }}
      >
        <h1 className="text-center text-4xl font-bold text-white sm:text-5xl mb-4">{title}</h1>
        {subtitle && <p className="text-center text-xl text-white">{subtitle}</p>}
      </div>
    </div>
  )
}

