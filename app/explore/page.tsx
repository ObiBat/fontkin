"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Grid3X3, LayoutGrid } from "lucide-react";
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

  const allCombos = useMemo(() => getAllResolvedCombos(), []);

  const filteredCombos = useMemo(
    () => filterCombos(allCombos, filters),
    [allCombos, filters]
  );

  return (
    <PageTransition>
      <div className="h-[calc(100vh-5rem)] flex flex-col">
        {/* Compact Header */}
        <div className="border-b shrink-0">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-6 md:py-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl uppercase tracking-wide"
                  style={{ fontFamily: fontIdToVariable["anton"] }}
                >
                  Explore
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm text-body mt-1"
                >
                  {filteredCombos.length} of {allCombos.length} combinations
                </motion.p>
              </div>
              {/* Grid size toggle - premium animated */}
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

        {/* Main content - fills remaining viewport */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-6">
            <div className="h-full flex flex-col lg:flex-row gap-8">
              {/* Filters - sticky sidebar */}
              <div className="lg:w-64 shrink-0 lg:h-full lg:overflow-y-auto lg:pr-4 scrollbar-thin">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  resultCount={filteredCombos.length}
                />
              </div>

              {/* Grid - scrollable */}
              <div className="flex-1 overflow-y-auto scrollbar-thin pb-6">
                {filteredCombos.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full flex items-center justify-center"
                  >
                    <div className="text-center py-20 px-8 border border-dashed">
                      <p className="text-body mb-4">
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
                    "grid gap-6",
                    gridSize === "default"
                      ? "md:grid-cols-2 xl:grid-cols-3"
                      : "md:grid-cols-3 xl:grid-cols-4"
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
