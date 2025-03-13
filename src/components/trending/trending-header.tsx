import Image from "next/image"

export function TrendingHeader() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full">
        <Image 
          src="/images/banners/trending-banner.png" 
          alt="Trending Header" 
          width={1920}
          height={500}
          className="w-full h-auto"
          priority 
        />
        <div className="absolute inset-0 bg-black/40 sm:bg-black/20" /> {/* Darker overlay on mobile */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <h1 className="font-['Raleway'] text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-widest text-white font-bold">
              THE LATEST WELLNESS NEWS AND TRENDING TOPICS
            </h1>
            <p className="mt-3 sm:mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 tracking-wider">
              What the industry is doing differently to maximise health and wellness.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

