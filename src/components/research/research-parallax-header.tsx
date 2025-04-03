"use client";

import Image from "next/image";

interface ResearchParallaxHeaderProps {
  title: string;
  imageUrl: string;
  progress: number;
}

export default function ResearchParallaxHeader({
  title,
  imageUrl,
  progress,
}: ResearchParallaxHeaderProps) {
  return (
    <div className="fixed inset-0 h-screen w-full">
      <div className="absolute inset-0 z-10 bg-black/50" />
      <div className="absolute inset-0">
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
          className="max-w-4xl px-4 text-center text-4xl font-bold text-white md:text-6xl"
          style={{
            transform: `translateY(${progress * -50}px)`,
            opacity: 1 - progress,
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
