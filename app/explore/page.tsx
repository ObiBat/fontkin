"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, LayoutGrid, SlidersHorizontal, X } from "lucide-react";
import { getAllResolvedCombos } from "@/lib/data/combos";
import { FilterState } from "@/lib/types";
import { defaultFilterState, filterCombos } from "@/lib/filters";
import { FilterSidebar } from "@/components/filter-sidebar";
import { ComboCard } from "@/components/combo-card";
import { fontIdToVariable } from "@/lib/fonts";
import { PageTransition } from "@/components/page-transition";
import { cn } from "@/lib/utils";

export default function ExplorePage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [gridSize, setGridSize] = useState<"default" | "compact">("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const allCombos = useMemo(() => getAllResolvedCombos(), []);

  const filteredCombos = useMemo(
    () => filterCombos(allCombos, filters),
    [allCombos, filters]
  );

  // Count active filters
  const activeFilterCount = [
    filters.vibeTags.length,
    filters.usageContexts.length,
    filters.timelessness.length,
    filters.typographyRoles.length,
  ].reduce((a, b) => a + b, 0);

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-5rem)] lg:h-[calc(100vh-5rem)] flex flex-col">
        {/* Compact Header */}
        <div className="border-b shrink-0">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6 md:py-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide"
                  style={{ fontFamily: fontIdToVariable["anton"] }}
                >
                  Explore
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xs sm:text-sm text-body mt-0.5 sm:mt-1"
                >
                  {filteredCombos.length} of {allCombos.length} combinations
                </motion.p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Mobile filter button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 border rounded-xl text-sm"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-medium bg-foreground text-background rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </motion.button>
                {/* Grid size toggle */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-1 border rounded-xl p-1"
                >
                  <motion.button
                    onClick={() => setGridSize("default")}
                    className={cn(
                      "p-2 rounded-lg transition-all duration-300",
                      gridSize === "default" ? "bg-foreground text-background" : "text-caption hover:text-foreground"
                    )}
                    whileTap={{ scale: 0.95 }}
                    title="Default grid"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => setGridSize("compact")}
                    className={cn(
                      "p-2 rounded-lg transition-all duration-300",
                      gridSize === "compact" ? "bg-foreground text-background" : "text-caption hover:text-foreground"
                    )}
                    whileTap={{ scale: 0.95 }}
                    title="Compact grid"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters Modal */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background z-50 lg:hidden overflow-y-auto"
              >
                <div className="sticky top-0 bg-background border-b px-4 py-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <FilterSidebar
                    filters={filters}
                    onFiltersChange={setFilters}
                    resultCount={filteredCombos.length}
                  />
                </div>
                <div className="sticky bottom-0 bg-background border-t p-4">
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full py-3 bg-foreground text-background rounded-xl text-sm font-medium"
                  >
                    Show {filteredCombos.length} results
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="flex-1 lg:overflow-hidden">
          <div className="h-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
            <div className="h-full flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Filters - desktop sidebar */}
              <div className="hidden lg:block lg:w-64 shrink-0 lg:h-full lg:overflow-y-auto lg:pr-4 scrollbar-thin">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  resultCount={filteredCombos.length}
                />
              </div>

              {/* Grid - scrollable */}
              <div className="flex-1 lg:overflow-y-auto lg:overflow-x-visible scrollbar-thin pt-1 pb-6 lg:-mt-1">
                {filteredCombos.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full flex items-center justify-center"
                  >
                    <div className="text-center py-16 sm:py-20 px-6 sm:px-8 border border-dashed rounded-xl">
                      <p className="text-sm sm:text-base text-body mb-4">
                        No combinations match your filters.
                      </p>
                      <motion.button
                        onClick={() => setFilters(defaultFilterState)}
                        className="text-sm text-foreground hover-underline relative"
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Clear all filters →
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <div className={cn(
                    "grid gap-3 sm:gap-4 md:gap-6 px-0.5",
                    gridSize === "default"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                  )}>
                    {filteredCombos.map((combo, index) => (
                      <ComboCard
                        key={combo.id}
                        combo={combo}
                        variant={gridSize === "compact" ? "compact" : "default"}
                        index={index}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
