"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner() {
  // Create an array of 8 dots with different sizes
  const dots = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * Math.PI * 2) / 8 // Evenly space dots around the circle
    const size = 4 + (8 - i) * 2 // Size decreases as index increases

    return {
      x: Math.cos(angle) * 30, // 30 is the radius of the circle
      y: Math.sin(angle) * 30,
      size,
    }
  })

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#2B5741] to-[#2B5741]"
            style={{
              width: dot.size,
              height: dot.size,
              left: "50%",
              top: "50%",
              x: dot.x,
              y: dot.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

