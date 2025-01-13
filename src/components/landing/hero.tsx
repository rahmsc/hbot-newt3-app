"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";

import { EmailPopup } from "./email-popup";
import VideoPlayer from "./video-player";

export default function Hero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleGuideButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleEmailSubmit = async (email: string) => {
    try {
      const response = await fetch("/api/submit-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        // You can add a success message or additional logic here
      } else {
        console.error("Failed to send email");
        // You can add error handling logic here
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }

    // Close the popup after submission
    setIsPopupOpen(false);
  };

  const benefits = [
    "From struggling to stand out to fully booked appointments",
    "Attracting high-value clients seeking advanced treatments",
    "Becoming the local authority in innovative wellness solutions",
  ];

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 text-center">
      <div className="container mx-auto px-4">
        <motion.h1
          className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Unlock <span className="text-blue-600">$23,500+ Monthly Revenue</span>{" "}
          <br />
          with Cutting-Edge Oxygen Therapy
        </motion.h1>
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-xl text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover How One Wellness Center Tapped into an Untreated Market{" "}
          <br />
          And Became the Go-To for Advanced Wellness And Recovery Solutions
        </motion.p>
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-2xl shadow-2xl">
            <VideoPlayer publicId={"vidBloodAutoReg"} />
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-center space-y-8">
          <ul className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.li
                key={benefit}
                className="flex items-start rounded-lg bg-white p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Check className="mr-4 h-6 w-6 flex-shrink-0 text-blue-500" />
                <span className="text-lg text-gray-700">{benefit}</span>
              </motion.li>
            ))}
          </ul>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="mt-8 h-16 px-8 text-xl font-semibold"
              size="lg"
              onClick={handleGuideButtonClick}
            >
              Start Your FREE Implementation Guide
            </Button>
          </motion.div>
        </div>
      </div>
      <EmailPopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        onSubmit={handleEmailSubmit}
      />
    </section>
  );
}
