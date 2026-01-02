"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./use-local-storage";

const STORAGE_KEY = "fontkin-favorites";

interface UseFavoritesReturn {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  favoritesCount: number;
}

/**
 * Hook for managing favorite font combos
 * Persists to localStorage
 */
export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites, clearFavorites] = useLocalStorage<string[]>(
    STORAGE_KEY,
    []
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const addFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      });
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => prev.filter((fav) => fav !== id));
    },
    [setFavorites]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      if (isFavorite(id)) {
        removeFavorite(id);
      } else {
        addFavorite(id);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const favoritesCount = useMemo(() => favorites.length, [favorites]);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    favoritesCount,
  };
}
