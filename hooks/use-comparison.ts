"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./use-local-storage";

const STORAGE_KEY = "fontkin-compare";
const MAX_COMPARE_ITEMS = 3;

interface UseComparisonReturn {
  compareIds: string[];
  isInCompare: (id: string) => boolean;
  toggleCompare: (id: string) => void;
  addToCompare: (id: string) => boolean; // Returns false if already at max
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  compareCount: number;
  canAddMore: boolean;
}

/**
 * Hook for managing font combo comparison list
 * Maximum of 3 items for side-by-side comparison
 */
export function useComparison(): UseComparisonReturn {
  const [compareIds, setCompareIds, clearCompare] = useLocalStorage<string[]>(
    STORAGE_KEY,
    []
  );

  const isInCompare = useCallback(
    (id: string) => compareIds.includes(id),
    [compareIds]
  );

  const canAddMore = useMemo(
    () => compareIds.length < MAX_COMPARE_ITEMS,
    [compareIds]
  );

  const addToCompare = useCallback(
    (id: string): boolean => {
      if (compareIds.includes(id)) return true; // Already added
      if (compareIds.length >= MAX_COMPARE_ITEMS) return false; // At max

      setCompareIds((prev) => [...prev, id]);
      return true;
    },
    [compareIds, setCompareIds]
  );

  const removeFromCompare = useCallback(
    (id: string) => {
      setCompareIds((prev) => prev.filter((item) => item !== id));
    },
    [setCompareIds]
  );

  const toggleCompare = useCallback(
    (id: string) => {
      if (isInCompare(id)) {
        removeFromCompare(id);
      } else {
        addToCompare(id);
      }
    },
    [isInCompare, addToCompare, removeFromCompare]
  );

  const compareCount = useMemo(() => compareIds.length, [compareIds]);

  return {
    compareIds,
    isInCompare,
    toggleCompare,
    addToCompare,
    removeFromCompare,
    clearCompare,
    compareCount,
    canAddMore,
  };
}
