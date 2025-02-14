import Image from "next/image"

export function TrendingHeader() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <Image
        src="/images/banners/trending-banner.png"
        alt="Trending Header"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="max-w-8xl font-['Raleway'] text-4xl tracking-wider text-white sm:text-5xl md:text-6xl">
          THE LATEST WELLNESS NEWS AND TRENDING TOPICS
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
          What the industry is doing differently to maximise health and wellness.
        </p>
      </div>
    </div>
  )
}

