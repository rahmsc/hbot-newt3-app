import Image from "next/image"

export function TrendingHeader() {
  return (
    <div className="relative h-[200px] sm:h-[350px] w-full overflow-hidden">
      <Image src="/images/banners/trending-banner.png" alt="Trending Header" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/40 sm:bg-black/20" /> {/* Darker overlay on mobile */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="max-w-8xl font-['Raleway'] text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider text-white">
          THE LATEST WELLNESS NEWS AND TRENDING TOPICS
        </h1>
        <p className="mt-2 sm:mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-white/90">
          What the industry is doing differently to maximise health and wellness.
        </p>
      </div>
    </div>
  )
}

