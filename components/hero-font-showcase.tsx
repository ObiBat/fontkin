"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ResolvedFontCombo } from "@/lib/types";
import { fontIdToVariable } from "@/lib/fonts";

interface HeroFontShowcaseProps {
  combos: ResolvedFontCombo[];
}

export function HeroFontShowcase({ combos }: HeroFontShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate every 4 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % combos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [combos.length, isHovered]);

  const currentCombo = combos[currentIndex];
  const headingFont = fontIdToVariable[currentCombo.hierarchy.h1.fontId];
  const bodyFont = fontIdToVariable[currentCombo.hierarchy.body.fontId];

  // Sample phrases that showcase typography well
  const showcasePhrases = [
    "Design with intention",
    "Words carry weight",
    "Typography speaks",
    "Form follows function",
    "Beauty in simplicity",
    "Craft every detail",
  ];

  const currentPhrase = showcasePhrases[currentIndex % showcasePhrases.length];

  return (
    <div
      className="relative h-full min-h-[400px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main showcase area */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCombo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Link
              href={`/combo/${currentCombo.slug}`}
              className="block h-full p-8 md:p-10 bg-card border rounded-3xl hover:border-foreground/20 transition-colors group"
            >
              {/* Vibe tag */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between mb-8"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-caption px-3 py-1 bg-muted rounded-full">
                  {currentCombo.vibeTags[0]}
                </span>
                <ArrowUpRight className="h-4 w-4 text-caption group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </motion.div>

              {/* Large heading showcase */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <p
                  className="text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight"
                  style={{ fontFamily: headingFont }}
                >
                  {currentPhrase}
                </p>
              </motion.div>

              {/* Body text showcase */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-body leading-relaxed mb-8 max-w-md"
                style={{ fontFamily: bodyFont }}
              >
                {currentCombo.description.split('.')[0]}.
              </motion.p>

              {/* Font names */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 text-xs text-caption"
              >
                <span
                  className="px-2 py-1 bg-foreground/5 rounded"
                  style={{ fontFamily: headingFont }}
                >
                  {currentCombo.primaryFont.name}
                </span>
                <span className="text-caption/40">+</span>
                <span
                  className="px-2 py-1 bg-foreground/5 rounded"
                  style={{ fontFamily: bodyFont }}
                >
                  {currentCombo.secondaryFont.name}
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {combos.map((combo, index) => (
          <button
            key={combo.id}
            onClick={() => setCurrentIndex(index)}
            className="group relative p-1"
            aria-label={`View ${combo.name}`}
          >
            <div className="relative h-1 w-8 bg-foreground/10 rounded-full overflow-hidden">
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-foreground rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: isHovered ? 999 : 4, ease: "linear" }}
                />
              )}
              {index < currentIndex && (
                <div className="absolute inset-0 bg-foreground/40 rounded-full" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute -z-10 top-1/3 right-0 w-[300px] h-[300px] bg-gradient-to-br from-foreground/[0.02] to-transparent rounded-full blur-3xl" />
      <div className="absolute -z-10 bottom-1/4 left-1/4 w-[200px] h-[200px] bg-gradient-to-tr from-foreground/[0.015] to-transparent rounded-full blur-2xl" />
    </div>
  );
}
