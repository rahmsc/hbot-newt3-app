"use client"

import { ArrowRight, Phone, MessageSquare } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import ChatWindow from "~/components/chat/chat-window"

export function CTASubscriptionSection() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-24">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/chambers/1.png"
          alt="HBOT Chamber Background"
          fill
          className="object-cover brightness-[0.2]"
          quality={100}
          priority
        />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          className="mx-auto max-w-4xl space-y-8 sm:space-y-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Raleway'] text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.2em] text-white">
            GET STARTED WITH HBOT
          </h2>
          <div className="space-y-6 sm:space-y-8">
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl font-light text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              How To Get Started With HBOT In Your Home Or Clinic Fast
            </motion.p>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl font-medium text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              NEED HBOT AND NEED IT NOW? HBOT HQ HAS GOT YOU COVERED.
            </motion.p>
            <motion.p
              className="text-base sm:text-lg md:text-xl italic text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              The Best Chambers At The Best Prices. Guaranteed.
            </motion.p>
          </div>
          <motion.div
            className="flex flex-col items-center gap-4 pt-6 sm:pt-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a
              href="tel:1234567890"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 sm:gap-3 rounded-full bg-[#2B5741] px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-emerald-500 hover:shadow-lg active:scale-95 touch-none"
            >
              <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="whitespace-nowrap">Speak To A Specialist</span>
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 sm:gap-3 rounded-full border-2 border-[#2B5741] bg-white px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold text-[#2B5741] transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-lg active:scale-95 touch-none"
            >
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="whitespace-nowrap">Chat with AI Assistant</span>
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>{isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}</AnimatePresence>
    </section>
  )
}

