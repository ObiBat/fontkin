"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ResolvedFontCombo } from "@/lib/types";
import { ComboCard } from "@/components/combo-card";
import { fontIdToVariable } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  number: string;
  title: string;
  description: string;
  href: string;
  combos: ResolvedFontCombo[];
}

interface UseCaseCarouselProps {
  categories: Category[];
}

export function UseCaseCarousel({ categories }: UseCaseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 2 categories at a time on desktop, 1 on mobile
  const itemsPerView = 2;
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const goToPrev = () => {
    if (canGoPrev) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const visibleCategories = categories.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <div className="absolute -top-16 right-0 flex items-center gap-2">
        <span className="text-xs text-caption mr-4">
          {currentIndex + 1}-{Math.min(currentIndex + itemsPerView, categories.length)} of {categories.length}
        </span>
        <button
          onClick={goToPrev}
          disabled={!canGoPrev}
          className={cn(
            "w-10 h-10 rounded-full border flex items-center justify-center transition-all",
            canGoPrev
              ? "border-foreground text-foreground hover:bg-foreground hover:text-background"
              : "border-border text-caption/30 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goToNext}
          disabled={!canGoNext}
          className={cn(
            "w-10 h-10 rounded-full border flex items-center justify-center transition-all",
            canGoNext
              ? "border-foreground text-foreground hover:bg-foreground hover:text-background"
              : "border-border text-caption/30 cursor-not-allowed"
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Carousel Content */}
      <div className="overflow-visible -mx-4 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 gap-6 lg:gap-10"
          >
            {visibleCategories.map((category) => (
              <div key={category.id} className="group">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b">
                  <span
                    className="text-4xl lg:text-5xl text-caption/30"
                    style={{ fontFamily: fontIdToVariable["anton"] }}
                  >
                    {category.number}
                  </span>
                  <div className="flex-1">
                    <h3
                      className="text-lg uppercase tracking-wider mb-1"
                      style={{ fontFamily: fontIdToVariable["space-grotesk"], fontWeight: 600 }}
                    >
                      {category.title}
                    </h3>
                    <p className="text-xs text-caption">{category.description}</p>
                  </div>
                  <Link
                    href={category.href}
                    className="text-[10px] uppercase tracking-wider text-caption hover:text-foreground transition-colors"
                  >
                    View All →
                  </Link>
                </div>
                <div className="space-y-4 py-2">
                  {category.combos.slice(0, 2).map((combo) => (
                    <ComboCard key={combo.id} combo={combo} variant="compact" />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-8 bg-foreground"
                : "w-1.5 bg-border hover:bg-caption"
            )}
          />
        ))}
      </div>
    </div>
  );
}
