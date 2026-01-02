"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

const STORAGE_KEY = "fontkin-recent";
const MAX_RECENT_ITEMS = 10;

interface UseRecentReturn {
  recentIds: string[];
  addToRecent: (id: string) => void;
  clearRecent: () => void;
  isRecent: (id: string) => boolean;
}

/**
 * Hook for tracking recently viewed font combos
 * Maintains a maximum of 10 items, most recent first
 */
export function useRecent(): UseRecentReturn {
  const [recentIds, setRecentIds, clearRecent] = useLocalStorage<string[]>(
    STORAGE_KEY,
    []
  );

  const addToRecent = useCallback(
    (id: string) => {
      setRecentIds((prev) => {
        // Remove if already exists (will re-add at front)
        const filtered = prev.filter((item) => item !== id);
        // Add to front
        const updated = [id, ...filtered];
        // Limit to max items
        return updated.slice(0, MAX_RECENT_ITEMS);
      });
    },
    [setRecentIds]
  );

  const isRecent = useCallback(
    (id: string) => recentIds.includes(id),
    [recentIds]
  );

  return {
    recentIds,
    addToRecent,
    clearRecent,
    isRecent,
  };
}
