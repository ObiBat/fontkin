"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";
import { FilterState, SortOption } from "@/lib/types";

const STORAGE_KEY = "fontkin-preferences";

type Theme = "light" | "dark" | "system";

interface UserPreferences {
  theme: Theme;
  sortBy: SortOption;
  showFavoritesFirst: boolean;
  customSampleText: {
    headline: string;
    subhead: string;
    body: string;
  } | null;
  savedFilters: Partial<FilterState> | null;
}

const defaultPreferences: UserPreferences = {
  theme: "system",
  sortBy: "name-asc",
  showFavoritesFirst: false,
  customSampleText: null,
  savedFilters: null,
};

interface UsePreferencesReturn {
  preferences: UserPreferences;
  setTheme: (theme: Theme) => void;
  setSortBy: (sortBy: SortOption) => void;
  setShowFavoritesFirst: (show: boolean) => void;
  setCustomSampleText: (text: UserPreferences["customSampleText"]) => void;
  saveFilters: (filters: Partial<FilterState>) => void;
  clearSavedFilters: () => void;
  resetPreferences: () => void;
}

/**
 * Hook for managing user preferences
 * Persists theme, sort order, and other settings
 */
export function usePreferences(): UsePreferencesReturn {
  const [preferences, setPreferences, resetPreferences] =
    useLocalStorage<UserPreferences>(STORAGE_KEY, defaultPreferences);

  const setTheme = useCallback(
    (theme: Theme) => {
      setPreferences((prev) => ({ ...prev, theme }));
    },
    [setPreferences]
  );

  const setSortBy = useCallback(
    (sortBy: SortOption) => {
      setPreferences((prev) => ({ ...prev, sortBy }));
    },
    [setPreferences]
  );

  const setShowFavoritesFirst = useCallback(
    (showFavoritesFirst: boolean) => {
      setPreferences((prev) => ({ ...prev, showFavoritesFirst }));
    },
    [setPreferences]
  );

  const setCustomSampleText = useCallback(
    (customSampleText: UserPreferences["customSampleText"]) => {
      setPreferences((prev) => ({ ...prev, customSampleText }));
    },
    [setPreferences]
  );

  const saveFilters = useCallback(
    (savedFilters: Partial<FilterState>) => {
      setPreferences((prev) => ({ ...prev, savedFilters }));
    },
    [setPreferences]
  );

  const clearSavedFilters = useCallback(() => {
    setPreferences((prev) => ({ ...prev, savedFilters: null }));
  }, [setPreferences]);

  return {
    preferences,
    setTheme,
    setSortBy,
    setShowFavoritesFirst,
    setCustomSampleText,
    saveFilters,
    clearSavedFilters,
    resetPreferences,
  };
}
