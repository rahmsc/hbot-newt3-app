"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function ParallaxImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const handleScroll = () => {
              if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const scrollPosition = window.scrollY;
                const elementPosition = rect.top + scrollPosition;
                setScrollY(scrollPosition - elementPosition);
              }
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
          }
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative mx-auto h-[360px] w-[1560px] overflow-hidden"
    >
      <div
        className="absolute inset-0 transform"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          src={src}
          alt={alt}
          width={1560}
          height={760}
          className="object-cover"
        />
      </div>
    </div>
  );
}
