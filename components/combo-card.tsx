"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, GitCompare } from "lucide-react";
import { ResolvedFontCombo } from "@/lib/types";
import { fontIdToVariable } from "@/lib/fonts";
import { getSampleForCombo } from "@/lib/samples";
import { useFavorites, useComparison } from "@/contexts/app-state";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

interface ComboCardProps {
  combo: ResolvedFontCombo;
  variant?: "default" | "featured" | "compact";
  index?: number; // For staggered animations
}

// Premium animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const heartVariants = {
  initial: { scale: 1 },
  tap: { scale: 0.9 },
  favorite: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

export function ComboCard({ combo, variant = "default", index = 0 }: ComboCardProps) {
  const { hierarchy, primaryFont, secondaryFont } = combo;
  const sample = getSampleForCombo(combo.id);
  const { isFavorite, toggleFavoriteWithResult, favoritesCount } = useFavorites();
  const { isInCompare, toggleCompareWithResult, canAddMore, compareCount } = useComparison();
  const { showFavoriteAdded, showFavoriteRemoved, showCompareAdded, showCompareRemoved, showCompareFull, showMilestone } = useToast();

  const isFav = isFavorite(combo.id);
  const isComparing = isInCompare(combo.id);

  const headingStyle = {
    fontFamily: fontIdToVariable[hierarchy.h1.fontId],
    fontWeight: hierarchy.h1.weight,
    lineHeight: hierarchy.h1.lineHeight,
    letterSpacing: hierarchy.h1.letterSpacing,
  };

  const subheadStyle = {
    fontFamily: fontIdToVariable[hierarchy.h2.fontId],
    fontWeight: hierarchy.h2.weight,
    lineHeight: hierarchy.h2.lineHeight,
  };

  const bodyStyle = {
    fontFamily: fontIdToVariable[hierarchy.body.fontId],
    fontWeight: hierarchy.body.weight,
    lineHeight: hierarchy.body.lineHeight,
  };

  const captionStyle = {
    fontFamily: fontIdToVariable[hierarchy.caption.fontId],
    fontWeight: hierarchy.caption.weight,
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const result = toggleFavoriteWithResult(combo.id);
    if (result.added) {
      showFavoriteAdded(combo.name, result.count);
      if (result.count === 3) {
        setTimeout(() => showMilestone("favorites", result.count), 500);
      }
    } else {
      showFavoriteRemoved(combo.name);
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isComparing) {
      const result = toggleCompareWithResult(combo.id);
      if (result) {
        showCompareRemoved(combo.name);
      }
    } else if (canAddMore) {
      const result = toggleCompareWithResult(combo.id);
      if (result && result.added) {
        showCompareAdded(combo.name, result.count);
        if (result.count === 3) {
          setTimeout(() => showMilestone("compare", result.count), 500);
        }
      }
    } else {
      showCompareFull();
    }
  };

  // Action buttons component - Premium minimal style
  const ActionButtons = ({ className = "" }: { className?: string }) => (
    <div className={cn("flex items-center gap-0.5", className)}>
      <motion.button
        onClick={handleCompareClick}
        className={cn(
          "p-2.5 transition-all duration-200",
          isComparing
            ? "text-foreground"
            : "text-caption/60 hover:text-foreground",
          !isComparing && !canAddMore && "opacity-30 cursor-not-allowed"
        )}
        whileTap={{ scale: 0.92 }}
        title={isComparing ? "Remove from compare" : canAddMore ? "Add to compare" : "Compare limit reached"}
      >
        <GitCompare className="h-4 w-4" />
      </motion.button>
      <motion.button
        onClick={handleFavoriteClick}
        className="p-2.5 text-caption/60 hover:text-foreground transition-all duration-200"
        variants={heartVariants}
        initial="initial"
        whileTap="tap"
        animate={isFav ? "favorite" : "initial"}
        title={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all duration-200",
            isFav ? "fill-foreground text-foreground" : ""
          )}
        />
      </motion.button>
    </div>
  );

  if (variant === "featured") {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={index}
      >
        <Link href={`/combo/${combo.slug}`} className="group block">
          <motion.article
            className="relative overflow-hidden bg-card border border-border hover:border-foreground/30 transition-colors duration-300 rounded-2xl"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
          >
            {/* Action buttons */}
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <ActionButtons />
            </div>

            {/* Large specimen area */}
            <div className="p-8 md:p-12 lg:p-16 space-y-6">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-balance"
                style={headingStyle}
              >
                {sample.headline}
              </h2>
              <p
                className="text-xl md:text-2xl text-subhead max-w-xl"
                style={subheadStyle}
              >
                {sample.subhead}
              </p>
              <p
                className="text-base md:text-lg text-body max-w-2xl leading-relaxed"
                style={bodyStyle}
              >
                {sample.body}
              </p>
            </div>

            {/* Meta bar */}
            <div className="px-8 md:px-12 lg:px-16 py-5 border-t bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{combo.name}</span>
                <span className="text-caption">·</span>
                <span className="text-sm text-body" style={captionStyle}>
                  {primaryFont.name}
                  {primaryFont.id !== secondaryFont.id && ` + ${secondaryFont.name}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isFav && (
                  <Heart className="h-3.5 w-3.5 fill-foreground text-foreground" />
                )}
                <span className="text-xs px-2.5 py-1 rounded-full bg-foreground/5 text-caption">
                  {combo.timelessness === "timeless"
                    ? "Timeless"
                    : combo.timelessness === "modern_classic"
                      ? "Modern Classic"
                      : "Trending"}
                </span>
              </div>
            </div>

            {/* Hover indicator */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.article>
        </Link>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={index}
      >
        <Link href={`/combo/${combo.slug}`} className="group block">
          <motion.article
            className="p-5 border border-border hover:border-foreground/30 bg-card transition-colors duration-300 relative rounded-xl"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Action buttons */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ActionButtons />
            </div>

            <h3
              className="text-xl mb-2 tracking-tight pr-16"
              style={headingStyle}
            >
              {sample.headline}
            </h3>
            <p
              className="text-sm text-body line-clamp-2"
              style={bodyStyle}
            >
              {sample.subhead}
            </p>
            <div className="mt-4 pt-3 border-t flex items-center justify-between">
              <span className="text-xs font-medium text-subhead">{combo.name}</span>
              <div className="flex items-center gap-2">
                {isFav && (
                  <Heart className="h-3 w-3 fill-foreground text-foreground" />
                )}
                <span className="text-xs text-caption">
                  {primaryFont.classification} + {secondaryFont.classification}
                </span>
              </div>
            </div>
          </motion.article>
        </Link>
      </motion.div>
    );
  }

  // Default variant - Premium editorial card
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className="h-full"
    >
      <Link href={`/combo/${combo.slug}`} className="group block h-full">
        <motion.article
          className="h-full flex flex-col border border-border bg-card overflow-hidden relative rounded-xl sm:rounded-2xl"
          whileHover={{ y: -3 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Action buttons - visible on mobile, hover on desktop */}
          <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ActionButtons />
          </div>

          {/* Specimen area */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col">
            {/* Font classification - refined label */}
            <div className="flex items-center gap-3 mb-3 sm:mb-5">
              <span
                className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-caption"
                style={captionStyle}
              >
                {primaryFont.classification === secondaryFont.classification
                  ? primaryFont.classification
                  : `${primaryFont.classification} + ${secondaryFont.classification}`}
              </span>
            </div>

            {/* Headline */}
            <h3
              className="text-lg sm:text-xl md:text-[1.85rem] leading-[1.15] tracking-tight mb-2 sm:mb-4 text-balance pr-8 sm:pr-10"
              style={headingStyle}
            >
              {sample.headline}
            </h3>

            {/* Subhead - hidden on very small screens */}
            <p
              className="hidden sm:block text-[14px] md:text-[15px] text-subhead mb-3 md:mb-4 leading-relaxed"
              style={subheadStyle}
            >
              {sample.subhead}
            </p>

            {/* Body sample */}
            <p
              className="text-[12px] sm:text-[13px] text-body line-clamp-2 sm:line-clamp-3 flex-1 leading-relaxed"
              style={bodyStyle}
            >
              {sample.body}
            </p>
          </div>

          {/* Meta footer - refined */}
          <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-t">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-[11px] sm:text-[13px] font-medium tracking-tight truncate">{combo.name}</h4>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {isFav && (
                  <Heart className="h-3 w-3 fill-foreground text-foreground" />
                )}
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-caption hidden xs:inline">
                  {combo.timelessness.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom border accent on hover */}
          <motion.div
            className="h-px bg-foreground origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}

// Large editorial specimen for home page hero
export function ComboHeroCard({ combo }: { combo: ResolvedFontCombo }) {
  const { hierarchy, primaryFont, secondaryFont } = combo;
  const sample = getSampleForCombo(combo.id);
  const { isFavorite, toggleFavoriteWithResult } = useFavorites();
  const { showFavoriteAdded, showFavoriteRemoved, showMilestone } = useToast();

  const isFav = isFavorite(combo.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const result = toggleFavoriteWithResult(combo.id);
    if (result.added) {
      showFavoriteAdded(combo.name, result.count);
      if (result.count === 3) {
        setTimeout(() => showMilestone("favorites", result.count), 500);
      }
    } else {
      showFavoriteRemoved(combo.name);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/combo/${combo.slug}`} className="group block">
        <motion.article
          className="relative border border-border hover:border-foreground/30 transition-colors duration-500 overflow-hidden rounded-xl sm:rounded-2xl"
          whileHover={{ scale: 1.002 }}
          transition={{ duration: 0.4 }}
        >
          {/* Favorite button */}
          <motion.button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2.5 sm:p-3 rounded-full bg-background/80 backdrop-blur-sm text-caption hover:text-foreground hover:bg-background transition-colors"
            whileTap={{ scale: 0.9 }}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={cn(
                "h-4 w-4 sm:h-5 sm:w-5 transition-colors",
                isFav ? "fill-foreground text-foreground" : ""
              )}
            />
          </motion.button>

          <div className="grid md:grid-cols-2">
            {/* Left: Large type specimen */}
            <div className="p-6 sm:p-8 md:p-14 lg:p-20 bg-gradient-to-br from-muted/40 to-transparent">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[0.95] mb-4 sm:mb-6 md:mb-8 pr-10"
                style={{
                  fontFamily: fontIdToVariable[hierarchy.h1.fontId],
                  fontWeight: hierarchy.h1.weight,
                  letterSpacing: hierarchy.h1.letterSpacing,
                }}
              >
                {sample.headline}
              </h2>
              <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-subhead max-w-md"
                style={{
                  fontFamily: fontIdToVariable[hierarchy.h2.fontId],
                  fontWeight: hierarchy.h2.weight,
                  lineHeight: 1.4,
                }}
              >
                {sample.subhead}
              </p>
            </div>

            {/* Right: Body specimen + meta */}
            <div className="p-6 sm:p-8 md:p-14 lg:p-20 flex flex-col justify-between border-t md:border-t-0 md:border-l">
              <div>
                <p
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-body leading-relaxed mb-6 md:mb-8"
                  style={{
                    fontFamily: fontIdToVariable[hierarchy.body.fontId],
                    fontWeight: hierarchy.body.weight,
                    lineHeight: hierarchy.body.lineHeight,
                  }}
                >
                  {sample.body}
                </p>

                {sample.pullQuote && (
                  <blockquote className="border-l-2 border-foreground/20 pl-4 sm:pl-6 hidden sm:block">
                    <p
                      className="text-base md:text-lg italic text-subhead"
                      style={{
                        fontFamily: fontIdToVariable[hierarchy.h2.fontId],
                        fontWeight: 400,
                      }}
                    >
                      &ldquo;{sample.pullQuote}&rdquo;
                    </p>
                    <cite
                      className="text-xs sm:text-sm text-caption not-italic mt-2 block"
                      style={{
                        fontFamily: fontIdToVariable[hierarchy.caption.fontId],
                      }}
                    >
                      {sample.micro}
                    </cite>
                  </blockquote>
                )}
              </div>

              <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-medium mb-0.5 sm:mb-1 truncate">{combo.name}</h3>
                  <p className="text-xs sm:text-sm text-body truncate">
                    {primaryFont.name}
                    {primaryFont.id !== secondaryFont.id && ` + ${secondaryFont.name}`}
                  </p>
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-caption group-hover:text-foreground transition-colors shrink-0">
                  View Details →
                </span>
              </div>
            </div>
          </div>

          {/* Bottom hover line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}

// Skeleton loading card with premium shimmer
export function ComboCardSkeleton({ variant = "default" }: { variant?: "default" | "featured" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="p-5 border border-border bg-card rounded-xl">
        <div className="h-6 animate-shimmer rounded-lg w-3/4 mb-2" />
        <div className="h-4 animate-shimmer rounded-lg w-full mb-1" />
        <div className="h-4 animate-shimmer rounded-lg w-2/3" />
        <div className="mt-4 pt-3 border-t flex items-center justify-between">
          <div className="h-3 animate-shimmer rounded-lg w-24" />
          <div className="h-3 animate-shimmer rounded-lg w-16" />
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border bg-card rounded-2xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="h-3 animate-shimmer rounded-lg w-20 mb-6" />
        <div className="h-8 animate-shimmer rounded-lg w-3/4 mb-4" />
        <div className="h-5 animate-shimmer rounded-lg w-full mb-5" />
        <div className="space-y-2">
          <div className="h-4 animate-shimmer rounded-lg w-full" />
          <div className="h-4 animate-shimmer rounded-lg w-5/6" />
          <div className="h-4 animate-shimmer rounded-lg w-4/6" />
        </div>
      </div>
      <div className="px-6 md:px-8 py-4 border-t bg-muted/20">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 animate-shimmer rounded-lg w-32" />
          <div className="h-3 animate-shimmer rounded-lg w-16" />
        </div>
        <div className="flex gap-1.5">
          <div className="h-5 animate-shimmer rounded-full w-14" />
          <div className="h-5 animate-shimmer rounded-full w-12" />
          <div className="h-5 animate-shimmer rounded-full w-16" />
        </div>
      </div>
    </div>
  );
}
