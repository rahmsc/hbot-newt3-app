"use client";

import { motion } from "framer-motion";
import type React from "react"; // Added import for React

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
      className={`relative overflow-hidden rounded-full px-4 py-2 font-mono text-sm text-white ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div className="animate-glow-pulse absolute inset-0 bg-emerald-700/40 opacity-75 blur-md" />

      {/* Glass effect button */}
      <div className="relative z-10 rounded-full border border-emerald-500/20 bg-emerald-700/30 px-4 py-2 backdrop-blur-sm">
        {text}
      </div>

      {/* Inner glow */}
      <div className="absolute inset-0 rounded-full bg-emerald-700/10 blur-sm" />
    </motion.button>
  );
}
