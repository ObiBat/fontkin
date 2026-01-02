"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowLeft, Trash2 } from "lucide-react";
import { getAllResolvedCombos } from "@/lib/data/combos";
import { useFavorites } from "@/contexts/app-state";
import { ComboCard } from "@/components/combo-card";
import { fontIdToVariable } from "@/lib/fonts";

export default function FavoritesPage() {
  const allCombos = useMemo(() => getAllResolvedCombos(), []);
  const { favorites, clearFavorites, favoritesCount } = useFavorites();

  const favoriteCombos = useMemo(() => {
    return favorites
      .map((id) => allCombos.find((c) => c.id === id))
      .filter((c) => c !== undefined);
  }, [favorites, allCombos]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm text-caption hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </Link>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-caption mb-6">
                Your Collection
              </p>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6"
                style={{ fontFamily: fontIdToVariable["playfair-display"], fontWeight: 500 }}
              >
                Favorites
              </h1>
              <p className="text-lg text-body max-w-2xl">
                {favoritesCount === 0
                  ? "Save your favorite font combinations for quick access."
                  : `You have ${favoritesCount} saved ${favoritesCount === 1 ? "combination" : "combinations"}.`}
              </p>
            </div>
            {favoritesCount > 0 && (
              <button
                onClick={clearFavorites}
                className="flex items-center gap-2 px-4 py-2 text-sm text-caption hover:text-foreground border border-border hover:border-foreground/30 rounded-md transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-12">
        {favoriteCombos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
              <Heart className="h-8 w-8 text-caption" />
            </div>
            <h2 className="text-xl font-medium mb-4">No favorites yet</h2>
            <p className="text-body mb-8 max-w-md mx-auto">
              Click the heart icon on any font combination to save it to your favorites.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm rounded-md hover:bg-foreground/90 transition-colors"
            >
              Explore Combinations
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {favoriteCombos.map((combo, index) => (
              <ComboCard key={combo!.id} combo={combo!} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
