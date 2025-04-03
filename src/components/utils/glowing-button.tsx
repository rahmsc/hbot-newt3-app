"use client";

import { motion } from "framer-motion";
import type React from "react";
import { cn } from "~/lib/utils";

interface GlowingButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function GlowingButton({
  text,
  onClick,
  className = "",
  icon,
}: GlowingButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative overflow-hidden rounded-full px-4 py-2 font-mono text-base text-white sm:text-sm",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 animate-glow-pulse bg-[#2B5741]/80 opacity-75 blur-[4px]" />

      {/* Glass effect button */}
      <div className="relative z-10 rounded-full border border-emerald-500/20 bg-[#2B5741] px-4 py-2 backdrop-blur-[2px]">
        {text}
        {icon && <span className="ml-2">{icon}</span>}
      </div>

      {/* Inner glow */}
      <div className="absolute inset-0 rounded-full bg-[#2B5741]/50 blur-[2px]" />
    </motion.button>
  );
}
