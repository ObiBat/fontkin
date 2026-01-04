"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { ResolvedFontCombo } from "@/lib/types";
import { fontIdToVariable } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface HeroTypographyTheaterProps {
  combos: ResolvedFontCombo[];
  totalCombos: number;
}

const WORDS = [
  { text: "Design", subtext: "is thinking made visual" },
  { text: "Create", subtext: "with intention and purpose" },
  { text: "Express", subtext: "ideas through type" },
  { text: "Elevate", subtext: "every visual experience" },
  { text: "Inspire", subtext: "through beautiful typography" },
];

export function HeroTypographyTheater({ combos, totalCombos }: HeroTypographyTheaterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const currentCombo = combos[currentIndex];
  const currentWord = WORDS[wordIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % combos.length);
    setWordIndex((prev) => (prev + 1) % WORDS.length);
  }, [combos.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const headingFont = fontIdToVariable[currentCombo.hierarchy.h1.fontId];
  const bodyFont = fontIdToVariable[currentCombo.hierarchy.body.fontId];

  return (
    <section className="relative min-h-[calc(100svh-56px)] md:min-h-[calc(100svh-64px)] flex flex-col overflow-hidden bg-background">
      {/* Background gradient pulse */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, currentColor 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, currentColor 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, currentColor 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, currentColor 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Main content */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 pt-20 md:pt-28 relative z-10"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Typography stage */}
        <div className="text-center max-w-6xl mx-auto">
          {/* Main word */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentIndex}-${wordIndex}`}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <h1
                className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.85] tracking-tight select-none"
                style={{
                  fontFamily: headingFont,
                  fontWeight: currentCombo.hierarchy.h1.weight,
                }}
              >
                {currentWord.text}
              </h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl text-body mt-4 md:mt-6"
                style={{ fontFamily: bodyFont }}
              >
                {currentWord.subtext}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Play/Pause button - between typography and bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 md:mt-16"
          >
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-3 rounded-full border border-foreground/20 hover:border-foreground/40 transition-all hover:bg-foreground/5"
            >
              {isPaused ? (
                <Play className="h-4 w-4 text-body" />
              ) : (
                <Pause className="h-4 w-4 text-body" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom controls - font name and dots */}
      <div className="relative z-10 w-full flex justify-center pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Current font pairing name */}
          <p className="text-[11px] uppercase tracking-[0.15em] text-caption">
            {currentCombo.primaryFont.name}
            {currentCombo.primaryFont.id !== currentCombo.secondaryFont.id &&
              ` + ${currentCombo.secondaryFont.name}`
            }
          </p>

          {/* Combo indicator dots */}
          <div className="mt-4 flex items-center gap-3">
            {combos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setWordIndex(idx % WORDS.length);
                }}
                className={cn(
                  "rounded-full transition-all duration-500",
                  idx === currentIndex
                    ? "w-8 h-1.5 bg-foreground"
                    : "w-1.5 h-1.5 bg-foreground/30 hover:bg-foreground/50"
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA section */}
      <div className="relative z-10 pb-12 md:pb-16">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-foreground/10">
            {/* Left - tagline */}
            <p className="text-sm text-caption text-center sm:text-left">
              {totalCombos} curated font pairings for designers who care about typography
            </p>

            {/* Right - CTAs */}
            <div className="flex items-center gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider bg-foreground text-background px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Explore All
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/builder"
                className="text-xs uppercase tracking-wider text-caption hover:text-foreground transition-colors"
              >
                Build Custom
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-6 md:top-8 left-6 md:left-8 w-12 md:w-16 h-12 md:h-16 border-l border-t border-foreground/5" />
      <div className="absolute top-6 md:top-8 right-6 md:right-8 w-12 md:w-16 h-12 md:h-16 border-r border-t border-foreground/5" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-foreground/5 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-foreground/5 hidden md:block" />
    </section>
  );
}
