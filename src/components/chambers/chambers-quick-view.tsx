"use client"

import { useState } from "react"
import { Box, CheckCircle, Gauge, Users, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "~/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import GlowingButton from "../utils/glowing-button"
import { ExpertInquiryForm } from "~/components/chambers/expert-inquiry-form"

// Update the type to match your database schema
interface ChamberProduct {
  id: number
  name: string | null
  type: string | null
  info: string | null
  capacity: string | null
  ata: string | null
  features: string | null
  size_guide: string | null
  warranty: string | null
  certification: string | null
  benefits: string | null
  tech_dco: string | null
  inclusion: string | null
  who_for: string | null
}

interface ChamberQuickViewProps {
  isOpen: boolean
  onClose: () => void
  chamber: ChamberProduct | null
}

export function ChamberQuickView({ isOpen, onClose, chamber }: ChamberQuickViewProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false)

  const imageUrl = "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/products/";

  if (!chamber) return null

  const featuresList = chamber.features
    ? chamber.features.split(',').map(f => f.trim()).slice(0, 4) // Only show first 4 features
    : []

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl overflow-hidden rounded-xl bg-transparent p-0">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white/60"
        >
          <X className="h-6 w-6 text-black" />
        </button>
        <div className="relative h-[80vh] w-full overflow-hidden rounded-3xl">
          <Image
            src={`${imageUrl}${chamber.id}.png`}
            alt={chamber.name ?? "Chamber"}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-between p-8">
            <div className="space-y-6">
              <div>
                <h2 className="font-['Raleway'] text-4xl font-bold text-white">{chamber.name}</h2>
                <p className="mt-2 text-xl text-gray-300">{chamber.type}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <Users className="h-6 w-6 text-emerald-500" />
                  <p className="mt-2 text-sm text-gray-300">Capacity</p>
                  <p className="text-lg font-semibold text-white">{chamber.capacity}</p>
                </div>
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <Gauge className="h-6 w-6 text-emerald-500" />
                  <p className="mt-2 text-sm text-gray-300">Pressure</p>
                  <p className="text-lg font-semibold text-white">{chamber.ata}</p>
                </div>
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <Box className="h-6 w-6 text-emerald-500" />
                  <p className="mt-2 text-sm text-gray-300">Type</p>
                  <p className="text-lg font-semibold text-white">{chamber.type}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Key Features</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {featuresList.map((feature) => (
                    <li 
                      key={feature} 
                      className="flex items-center gap-3 rounded-lg bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      <div className="rounded-full bg-emerald-500/20 p-1.5">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <Link 
                href={`/chambers/${chamber.name?.toLowerCase().replace(/\s+/g, '-')}`}
                className="w-full"
              >
                <GlowingButton
                  text="View Full Details"
                  className="w-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

