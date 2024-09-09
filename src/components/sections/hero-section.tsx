"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import placeHolder from "../../../public/placeholder.png";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="container mx-auto flex flex-col items-center px-4 py-12 md:flex-row md:py-24">
        <div
          className={`flex-1 transition-all duration-1000 ease-out md:pr-8 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
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

          <ArrowTopRightIcon className="h-48 w-48 text-gray-500 opacity-60 hover:text-gray-600" />
        </div>

        <div
          className={`mt-8 flex-1 transition-all delay-300 duration-1000 ease-out md:mt-0 md:pl-8 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 skew-y-12 transform bg-red-400" />
            <Image
              src={placeHolder}
              alt="Creative Studio"
              width={800}
              height={600}
              className="relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
