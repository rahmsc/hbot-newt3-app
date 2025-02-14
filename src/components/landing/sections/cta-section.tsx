"use client"

import { ArrowRight, Phone, MessageSquare } from 'lucide-react'
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
// import ChatWindow from "~/components/chat/chat-window" // Make sure this import path is correct

export function CTASubscriptionSection() {
  // const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/chambers/1.png"
          alt="HBOT Chamber Background"
          fill
          className="object-cover brightness-[0.2]" // Darkened further for better contrast
          quality={100}
          priority
        />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          className="mx-auto max-w-4xl space-y-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Raleway'] text-4xl tracking-[0.2em] text-white sm:text-5xl lg:text-6xl">
            GET STARTED WITH HBOT
          </h2>
          <div className="space-y-8">
            <motion.p
              className="text-2xl font-light text-gray-200 sm:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              How To Get Started With HBOT In Your Home Or Clinic Fast
            </motion.p>
            <motion.p
              className="text-xl font-medium text-gray-100 sm:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              NEED HBOT AND NEED IT NOW? HBOT HQ HAS GOT YOU COVERED.
            </motion.p>
            <motion.p
              className="text-lg italic text-gray-300 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              The Best Chambers At The Best Prices. Guaranteed.
            </motion.p>
          </div>
          <motion.div
            className="flex flex-col items-center gap-4 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a
              href="tel:1234567890"
              className="group inline-flex w-auto items-center gap-3 rounded-full bg-emerald-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-emerald-500 hover:shadow-lg"
            >
              <Phone className="h-6 w-6" />
              Speak To A Specialist Right Now
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </a>
            {/* <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              className="group inline-flex w-auto items-center gap-3 rounded-full border-2 border-emerald-700 bg-white px-8 py-4 text-lg font-semibold text-emerald-700 transition-all hover:scale-105 hover:bg-gray-100  hover:shadow-lg"
            >
              <MessageSquare className="h-6 w-6" />
              Chat with AI Assistant
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </button> */}
          </motion.div>
        </motion.div>
      </div>

      {/* {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />} */}
    </section>
  )
}