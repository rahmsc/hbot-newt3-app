"use client"

import { useEffect, useState } from "react"
import { cn } from "~/lib/utils"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time - adjust as needed
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={cn(
        "fixed min-h-screen inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#FAF7F4] to-[#F5F0EC] transition-opacity duration-500 md:hidden",
        isLoading ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="mx-auto max-w-[90vw] px-4 text-center sm:max-w-[80vw]">
        <div className="relative mb-6">
          {/* Animated loading circle */}
          <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 sm:h-16 sm:w-16">
            <div className="absolute h-full w-full animate-spin rounded-full border-2 border-transparent border-t-gray-400" />
            <div className="absolute h-full w-full animate-ping rounded-full border border-gray-300 opacity-20" />
          </div>
          
          {/* Logo/text container */}
          <h1 className="relative animate-pulse font-['Raleway'] text-2xl font-light tracking-[0.4em] text-gray-700 sm:text-3xl">
            HYPERBARIC
            <span className="block text-base tracking-[0.2em] text-gray-500 sm:text-lg">HQ</span>
          </h1>
        </div>
        
        <p className="mx-auto max-w-[280px] text-lg font-light leading-relaxed text-gray-500 sm:max-w-xs sm:text-sm">
          Experience the best in Hyperbaric Oxygen
          <span className="block">research and news</span>
        </p>
      </div>
    </div>
  )
}

