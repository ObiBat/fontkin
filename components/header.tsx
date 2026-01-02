"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, GitCompare, X, Wand2, Coffee } from "lucide-react";
import { fontIdToVariable } from "@/lib/fonts";
import { useFavorites, useComparison } from "@/contexts/app-state";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { favoritesCount } = useFavorites();
  const { compareCount, clearCompare } = useComparison();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <nav className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="h-14 md:h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg md:text-xl uppercase tracking-wide hover:opacity-70 transition-opacity"
              style={{ fontFamily: fontIdToVariable["anton"] }}
            >
              Fontkin
            </Link>
            <div className="flex items-center gap-8 md:gap-10">
              <Link
                href="/explore"
                className={cn(
                  "text-[13px] uppercase tracking-[0.08em] transition-colors hover-underline",
                  isActive("/explore") ? "text-foreground" : "text-caption hover:text-foreground"
                )}
              >
                Explore
              </Link>
              <Link
                href="/builder"
                className={cn(
                  "text-[13px] uppercase tracking-[0.08em] transition-colors flex items-center gap-2 hover-underline",
                  isActive("/builder") ? "text-foreground" : "text-caption hover:text-foreground"
                )}
              >
                <Wand2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Builder</span>
              </Link>
              <Link
                href="/favorites"
                className={cn(
                  "text-[13px] uppercase tracking-[0.08em] transition-colors flex items-center gap-2 relative",
                  isActive("/favorites") ? "text-foreground" : "text-caption hover:text-foreground"
                )}
              >
                <motion.div
                  animate={favoritesCount > 0 ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  key={favoritesCount}
                >
                  <Heart className={cn("h-3.5 w-3.5", favoritesCount > 0 && "fill-foreground text-foreground")} />
                </motion.div>
                <span className="hidden sm:inline">Favorites</span>
                <AnimatePresence mode="popLayout">
                  {favoritesCount > 0 && (
                    <motion.span
                      key="favorites-badge"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-medium bg-foreground text-background px-1 rounded-full"
                    >
                      {favoritesCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              <Link
                href="/compare"
                className={cn(
                  "text-[13px] uppercase tracking-[0.08em] transition-colors flex items-center gap-2 relative",
                  isActive("/compare") ? "text-foreground" : "text-caption hover:text-foreground"
                )}
              >
                <motion.div
                  animate={compareCount > 0 ? { rotate: [0, -8, 8, 0] } : {}}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  key={compareCount}
                >
                  <GitCompare className={cn("h-3.5 w-3.5", compareCount > 0 && "text-foreground")} />
                </motion.div>
                <span className="hidden sm:inline">Compare</span>
                <AnimatePresence mode="popLayout">
                  {compareCount > 0 && (
                    <motion.span
                      key="compare-badge"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-medium bg-foreground text-background px-1 rounded-full"
                    >
                      {compareCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              <a
                href="https://buymeacoffee.com/obicreative"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-foreground text-background rounded-full text-[11px] uppercase tracking-wider hover:opacity-80 transition-opacity"
              >
                <Coffee className="h-3 w-3" />
                <span>Donate</span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Floating compare bar - Premium style */}
      <AnimatePresence>
        {compareCount > 0 && pathname !== "/compare" && (
          <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="pointer-events-auto"
            >
              <div className="flex items-center gap-6 px-8 py-4 bg-foreground text-background shadow-2xl border border-foreground rounded-full">
                <span className="text-[13px] uppercase tracking-[0.1em]">
                  {compareCount} {compareCount === 1 ? "combo" : "combos"} selected
                </span>
                <div className="w-px h-4 bg-background/20" />
                <Link
                  href="/compare"
                  className="text-[13px] uppercase tracking-[0.1em] hover:opacity-70 transition-opacity"
                >
                  Compare Now →
                </Link>
                <button
                  onClick={clearCompare}
                  className="p-1 hover:opacity-70 transition-opacity"
                  title="Clear selection"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
