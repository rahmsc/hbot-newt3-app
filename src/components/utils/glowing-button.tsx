"use client";

import { motion } from "framer-motion";
import type React from "react";
import { cn } from "~/lib/utils";

interface GlowingButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function GlowingButton({
  text,
  onClick,
  className = "",
}: GlowingButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative overflow-hidden rounded-full px-4 py-2 font-mono text-base sm:text-sm text-white",
        className
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div className="animate-glow-pulse absolute inset-0 bg-[#2B5741]/40 opacity-75 blur-[4px]" />

      {/* Glass effect button */}
      <div className="relative z-10 rounded-full border border-emerald-500/20 bg-[#2B5741]/30 px-4 py-2 backdrop-blur-[2px]">
        {text}
      </div>

      {/* Inner glow */}
      <div className="absolute inset-0 rounded-full bg-[#2B5741]/10 blur-[2px]" />
    </motion.button>
  );
}
