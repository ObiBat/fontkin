"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FilterState, Timelessness, VibeTag, UsageContext } from "@/lib/types";
import { filterOptions } from "@/lib/filters";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultCount: number;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  resultCount,
}: FilterSidebarProps) {
  const toggleTimelessness = (value: Timelessness) => {
    const current = filters.timelessness;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, timelessness: updated });
  };

  const toggleVibe = (value: VibeTag) => {
    const current = filters.vibeTags;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, vibeTags: updated });
  };

  const toggleContext = (value: UsageContext) => {
    const current = filters.usageContexts;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, usageContexts: updated });
  };

  const toggleGoogleOnly = () => {
    onFiltersChange({ ...filters, googleFontsOnly: !filters.googleFontsOnly });
  };

  const clearFilters = () => {
    onFiltersChange({
      typographyRoles: [],
      vibeTags: [],
      timelessness: [],
      usageContexts: [],
      googleFontsOnly: false,
      searchQuery: "",
    });
  };

  const hasActiveFilters =
    filters.timelessness.length > 0 ||
    filters.vibeTags.length > 0 ||
    filters.usageContexts.length > 0 ||
    filters.googleFontsOnly ||
    filters.searchQuery;

  return (
    <aside className="w-64 shrink-0 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] uppercase tracking-[0.15em] text-caption">Filters</h2>
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={clearFilters}
              className="flex items-center gap-1 text-[11px] text-caption hover:text-foreground transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-3 w-3" />
              Clear
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Result count */}
      <motion.p
        key={resultCount}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        className="text-sm text-body"
      >
        {resultCount} {resultCount === 1 ? "combination" : "combinations"}
      </motion.p>

      {/* Search */}
      <div>
        <label htmlFor="search" className="text-[11px] uppercase tracking-[0.1em] text-caption mb-2 block">
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder="Font name, vibe..."
          value={filters.searchQuery}
          onChange={(e) =>
            onFiltersChange({ ...filters, searchQuery: e.target.value })
          }
          className="w-full px-4 py-2.5 text-sm border bg-background focus:outline-none focus:border-foreground transition-colors rounded-xl"
        />
      </div>

      {/* Time Period */}
      <FilterSection title="Time Period">
        <div className="flex flex-wrap gap-2">
          {filterOptions.timelessness.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              active={filters.timelessness.includes(option.value)}
              onClick={() => toggleTimelessness(option.value)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Usage Context */}
      <FilterSection title="Use Case">
        <div className="flex flex-wrap gap-2">
          {filterOptions.usageContexts.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              active={filters.usageContexts.includes(option.value)}
              onClick={() => toggleContext(option.value)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Vibe / Tone */}
      <FilterSection title="Vibe">
        <div className="flex flex-wrap gap-2">
          {filterOptions.vibeTags.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              active={filters.vibeTags.includes(option.value)}
              onClick={() => toggleVibe(option.value)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Source */}
      <FilterSection title="Source">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.googleFontsOnly}
              onChange={toggleGoogleOnly}
              className="peer sr-only"
            />
            <div className="w-4 h-4 border border-border peer-checked:bg-foreground peer-checked:border-foreground transition-all duration-200 rounded" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-background pointer-events-none"
              initial={false}
              animate={{ opacity: filters.googleFontsOnly ? 1 : 0, scale: filters.googleFontsOnly ? 1 : 0.5 }}
              transition={{ duration: 0.15 }}
            >
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          </div>
          <span className="text-sm text-body group-hover:text-foreground transition-colors">Google Fonts only</span>
        </label>
      </FilterSection>
    </aside>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-[11px] uppercase tracking-[0.1em] text-caption">{title}</h3>
      {children}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "px-3.5 py-1.5 text-[11px] tracking-wide border transition-all duration-300 rounded-lg",
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-transparent text-body border-border hover:border-foreground/50 hover:text-foreground"
      )}
      whileTap={{ scale: 0.95 }}
      animate={{
        backgroundColor: active ? "hsl(var(--foreground))" : "transparent",
      }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.button>
  );
}
