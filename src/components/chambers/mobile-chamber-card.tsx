"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { ChamberProduct } from "~/types/database"
import GlowingButton from "../utils/glowing-button"

interface MobileChamberCardProps {
  chamber: ChamberProduct
  onQuickView: (chamber: ChamberProduct) => void
}

export function MobileChamberCard({ chamber, onQuickView }: MobileChamberCardProps) {
  const imageUrl = "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/products/"

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="relative h-[500px] overflow-hidden rounded-2xl shadow-lg"
    >
      <Image
        src={`${imageUrl}${chamber.id}.png`}
        alt={chamber.name ?? "Chamber"}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 85vw, (min-width: 768px) 50vw, 33vw"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
        <h3 className="mb-2 font-['Raleway'] text-2xl font-semibold uppercase tracking-wider text-white">
          {chamber.name}
        </h3>
        <p className="mb-4 flex flex-col gap-2 font-mono text-sm text-gray-200">
          <span>Type: {chamber.type}</span>
          <span>Max Pressure: {chamber.ata} ATA</span>
          <span>Capacity: {chamber.capacity}</span>
        </p>
        <GlowingButton text="More Info" onClick={() => onQuickView(chamber)} className="w-full" />
      </div>
    </motion.div>
  )
}

