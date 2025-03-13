"use client"

import { useRef } from "react"
import Image from "next/image"

interface ParallaxHeaderProps {
  title: string
  imageUrl: string
  subtitle?: string
  progress: number
}

export default function ParallaxHeader({ title, imageUrl, subtitle, progress }: ParallaxHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)

  // Constants
  const initialZoom = 1.2 // Initial zoom level

  // Calculate image zoom and title opacity
  const imageZoom = initialZoom - progress * (initialZoom - 1)
  const titleOpacity = progress < 0.2 ? 1 : 1 - (progress - 0.2) / (0.55 - 0.2)

  return (
    <div ref={headerRef} className="fixed top-0 left-0 w-full h-screen overflow-hidden z-0">
      <div className="absolute inset-0">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="transition-transform duration-300 ease-out object-cover"
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
        {subtitle && <p className="text-center text-xl text-white tracking-widest">{subtitle}</p>}
      </div>
    </div>
  )
}

