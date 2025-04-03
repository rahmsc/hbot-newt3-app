"use client";

import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ChatWindow from "~/components/chat/chat-window";
import { SpecialistContactForm } from "~/components/contact/specialist-contact-form";

export function CTASubscriptionSection() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

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
          className="mx-auto max-w-4xl space-y-8 text-center sm:space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Raleway'] text-2xl tracking-[0.2em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
            GET STARTED WITH HBOT
          </h2>
          <div className="space-y-6 sm:space-y-8">
            <motion.p
              className="text-xl font-light text-gray-200 sm:text-2xl md:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              How To Get Started With HBOT In Your Home Or Clinic Fast
            </motion.p>
            <motion.p
              className="text-lg font-medium text-gray-100 sm:text-xl md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              NEED HBOT AND NEED IT NOW? HBOT HQ HAS GOT YOU COVERED.
            </motion.p>
            <motion.p
              className="text-base italic text-gray-300 sm:text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              The Best Chambers At The Best Prices. Guaranteed.
            </motion.p>
          </div>
          <motion.div
            className="flex flex-col items-center gap-4 px-4 pt-6 sm:pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <button
              type="button"
              onClick={() => setIsContactFormOpen(true)}
              className="group inline-flex w-full touch-none items-center justify-center gap-2 rounded-full bg-[#2B5741] px-6 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-emerald-500 hover:shadow-lg active:scale-95 sm:w-auto sm:gap-3 sm:px-8 sm:text-lg"
            >
              <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="whitespace-nowrap">Speak To A Specialist</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 sm:h-6 sm:w-6" />
            </button>
            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              className="group inline-flex w-full touch-none items-center justify-center gap-2 rounded-full border-2 border-[#2B5741] bg-white px-6 py-4 text-base font-semibold text-[#2B5741] transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-lg active:scale-95 sm:w-auto sm:gap-3 sm:px-8 sm:text-lg"
            >
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="whitespace-nowrap">Chat with AI Assistant</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 sm:h-6 sm:w-6" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>

      <SpecialistContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </section>
  );
}
