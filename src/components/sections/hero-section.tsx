"use client";

import React from "react";
import Image from "next/image";
import logoImage from "../../../public/logo/logo_resized.png";
import { motion } from "framer-motion";

import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const HeroSection = () => {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex h-[400px] items-center justify-center pt-16"
      >
        <div className="relative h-full w-full max-w-[50%]">
          <Image
            src={logoImage}
            alt="Logo Image"
            fill
            className="object-contain"
            sizes="50vw"
            priority
          />
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="container mx-auto flex flex-col items-center px-4 py-12 md:flex-row md:py-24">
          <div className="flex-1 md:pr-8">
            <h1 className="mb-6 text-2xl font-bold capitalize md:text-6xl">
              LEARN <br />
              AND FIND THE <br />
              RIGHT <br />
              CHAMBER FOR <br />
              YOUR NEEDS
              <br />
            </h1>
            <p className="mb-8 text-lg text-gray-700">
              Simplify hyperbaric oxygen therapy with access to the <br />
              latest research, protocols and personalised guidance. <br />
              Sustainable over time.
            </p>
          </div>

          <div className="mt-8 flex-1 md:mt-0 md:pl-8">
            <div className="relative">
              <div
                className="absolute inset-0 transform bg-orange-500 bg-opacity-80"
                style={{
                  transform: "rotate(-8deg)",
                }}
              />
              <Image
                src={
                  "https://hbothq-bucket.s3.ap-southeast-2.amazonaws.com/chambers/gallery/5.png"
                }
                alt="Creative Studio"
                width={800}
                height={600}
                className="relative z-10"
                style={{
                  transform: "rotate(8deg)",
                }}
              />
            </div>
          </div>
        </div>
      </motion.section>
      <ArrowTopRightIcon className="h-48 w-48 pb-4 pr-4 text-gray-500 opacity-60 hover:text-orange-500" />
    </div>
  );
};

export default HeroSection;
