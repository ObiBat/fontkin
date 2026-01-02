"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function DonateButton({ variant = "nav" }: { variant?: "nav" | "footer" }) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === "footer") {
    return (
      <motion.a
        href="https://buymeacoffee.com/obicreative"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm uppercase tracking-wider transition-all group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-300"
        >
          {/* Heart shape */}
          <motion.path
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            fill={isHovered ? "#ef4444" : "none"}
            stroke={isHovered ? "#ef4444" : "currentColor"}
            initial={false}
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.svg>
        <span>Support This Project</span>
      </motion.a>
    );
  }

  // Nav variant with coffee animation
  return (
    <motion.a
      href="https://buymeacoffee.com/obicreative"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-foreground text-background rounded-full text-[11px] uppercase tracking-wider overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Coffee cup with animation */}
      <div className="relative w-4 h-4">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="relative z-10"
        >
          {/* Cup body */}
          <motion.path
            d="M17 8h1a4 4 0 1 1 0 8h-1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Coffee fill */}
          <motion.rect
            x="4"
            y="21"
            width="12"
            height="12"
            fill="#8B4513"
            initial={{ y: 21 }}
            animate={{ y: isHovered ? 9 : 21 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            clipPath="url(#cupClip)"
          />
          <defs>
            <clipPath id="cupClip">
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Steam lines */}
        <motion.div
          className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-[2px] h-2 bg-current rounded-full opacity-60"
              animate={isHovered ? {
                y: [0, -4, 0],
                opacity: [0.6, 0.2, 0.6],
                scaleY: [1, 1.5, 1],
              } : {}}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      <span>Donate</span>
    </motion.a>
  );
}
