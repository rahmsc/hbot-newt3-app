import { cn } from "~/lib/utils"

interface CarouselIndicatorProps {
  total: number
  current: number
  className?: string
}

export function CarouselIndicator({ total, current, className }: CarouselIndicatorProps) {
  return (
    <div className={cn("flex justify-center gap-2 mt-4 pb-4", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 bg-gray-300 transition-all duration-300",
            index === current 
              ? "w-8 rounded-full bg-[#2B5741]" 
              : "w-2 rounded-full"
          )}
        />
      ))}
    </div>
  )
}