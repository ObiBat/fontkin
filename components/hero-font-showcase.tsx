"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ResolvedFontCombo } from "@/lib/types";
import { fontIdToVariable } from "@/lib/fonts";

interface HeroFontShowcaseProps {
  combos: ResolvedFontCombo[];
}

// Smooth spring config for natural motion
const smoothSpring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 30,
  mass: 1,
};

// Ultra smooth easing
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroFontShowcase({ combos }: HeroFontShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const progress = useMotionValue(0);

  // Animated progress for smooth indicator
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % combos.length);
  }, [combos.length]);

  // Smooth progress animation
  useEffect(() => {
    if (isHovered) {
      progress.stop();
      return;
    }

    // Reset and animate progress
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: 5,
      ease: "linear",
      onComplete: goToNext,
    });

    return () => controls.stop();
  }, [currentIndex, isHovered, progress, goToNext]);

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
  const words = currentPhrase.split(" ");

  return (
    <div
      className="relative h-full min-h-[420px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main showcase area */}
      <div className="flex-1 relative overflow-hidden rounded-3xl">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentCombo.id}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="absolute inset-0"
          >
            <Link
              href={`/combo/${currentCombo.slug}`}
              className="block h-full p-8 md:p-10 bg-card border border-border/50 rounded-3xl hover:border-foreground/20 transition-colors duration-500 group"
            >
              {/* Vibe tag */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: smoothEase }}
                className="flex items-center justify-between mb-8"
              >
                <motion.span
                  className="text-[10px] uppercase tracking-[0.2em] text-caption px-3 py-1.5 bg-muted/80 rounded-full backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={smoothSpring}
                >
                  {currentCombo.vibeTags[0]}
                </motion.span>
                <motion.div
                  whileHover={{ x: 2, y: -2 }}
                  transition={smoothSpring}
                >
                  <ArrowUpRight className="h-4 w-4 text-caption group-hover:text-foreground transition-colors duration-300" />
                </motion.div>
              </motion.div>

              {/* Large heading showcase - word by word animation */}
              <div className="mb-6 overflow-hidden">
                <motion.p
                  className="text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tight flex flex-wrap gap-x-[0.25em]"
                  style={{ fontFamily: headingFont }}
                >
                  {words.map((word, i) => (
                    <span key={`${currentCombo.id}-${i}`} className="overflow-hidden inline-block">
                      <motion.span
                        className="inline-block"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 0.2 + i * 0.08,
                          duration: 0.7,
                          ease: smoothEase,
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </motion.p>
              </div>

              {/* Body text showcase */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: smoothEase }}
                className="text-base md:text-lg text-body leading-relaxed mb-8 max-w-md"
                style={{ fontFamily: bodyFont }}
              >
                {currentCombo.description.split('.')[0]}.
              </motion.p>

              {/* Font names */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6, ease: smoothEase }}
                className="flex items-center gap-3 text-xs text-caption"
              >
                <motion.span
                  className="px-3 py-1.5 bg-foreground/5 rounded-md border border-foreground/5"
                  style={{ fontFamily: headingFont }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.08)" }}
                  transition={smoothSpring}
                >
                  {currentCombo.primaryFont.name}
                </motion.span>
                <motion.span
                  className="text-caption/30"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  +
                </motion.span>
                <motion.span
                  className="px-3 py-1.5 bg-foreground/5 rounded-md border border-foreground/5"
                  style={{ fontFamily: bodyFont }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.08)" }}
                  transition={smoothSpring}
                >
                  {currentCombo.secondaryFont.name}
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicators - smoother */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {combos.map((combo, index) => (
          <motion.button
            key={combo.id}
            onClick={() => setCurrentIndex(index)}
            className="group relative py-2"
            aria-label={`View ${combo.name}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={smoothSpring}
          >
            <div className="relative h-[3px] w-10 bg-foreground/10 rounded-full overflow-hidden">
              {index === currentIndex ? (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-foreground rounded-full"
                  style={{ width: progressWidth }}
                />
              ) : index < currentIndex ? (
                <motion.div
                  className="absolute inset-0 bg-foreground/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : null}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Decorative elements with subtle animation */}
      <motion.div
        className="absolute -z-10 top-1/3 right-0 w-[300px] h-[300px] bg-gradient-to-br from-foreground/[0.02] to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -z-10 bottom-1/4 left-1/4 w-[200px] h-[200px] bg-gradient-to-tr from-foreground/[0.015] to-transparent rounded-full blur-2xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}
