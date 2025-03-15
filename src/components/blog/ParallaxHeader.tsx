"use client"

import Image from "next/image"

interface ParallaxHeaderProps {
  title: string
  imageUrl: string
  progress: number
}

export default function ParallaxHeader({ title, imageUrl, progress }: ParallaxHeaderProps) {
  return (
    <div className="fixed inset-0 h-[100vh] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${progress * -20}%)`,
          opacity: 1 - progress * 0.5,
        }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <h1 
          className="text-4xl md:text-6xl font-bold text-white text-center max-w-4xl px-4"
          style={{
            transform: `translateY(${progress * -50}px)`,
            opacity: 1 - progress,
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  )
}

