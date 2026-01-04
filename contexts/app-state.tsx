"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from "react";

// Storage keys
const FAVORITES_KEY = "fontkin-favorites";
const COMPARE_KEY = "fontkin-compare";
const CUSTOM_TEXT_KEY = "fontkin-custom-text";
const MAX_COMPARE_ITEMS = 3;

// Custom text structure
export interface CustomTextFields {
  headline: string;
  subhead: string;
  body: string;
}

const EMPTY_CUSTOM_TEXT: CustomTextFields = {
  headline: "",
  subhead: "",
  body: "",
};

interface AppStateContextValue {
  // Favorites
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => { added: boolean; count: number };
  addFavorite: (id: string) => number;
  removeFavorite: (id: string) => number;
  clearFavorites: () => void;
  favoritesCount: number;

  // Compare
  compareIds: string[];
  isInCompare: (id: string) => boolean;
  toggleCompare: (id: string) => { added: boolean; count: number } | null;
  addToCompare: (id: string) => { success: boolean; count: number };
  removeFromCompare: (id: string) => number;
  clearCompare: () => void;
  compareCount: number;
  canAddMore: boolean;

  // Custom text preview
  customText: CustomTextFields;
  setCustomText: (field: keyof CustomTextFields, text: string) => void;
  setAllCustomText: (texts: Partial<CustomTextFields>) => void;
  clearCustomText: () => void;
  hasCustomText: boolean;

  // Hydration state
  isHydrated: boolean;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [customText, setCustomTextState] = useState<CustomTextFields>(EMPTY_CUSTOM_TEXT);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedFavorites = window.localStorage.getItem(FAVORITES_KEY);
      const storedCompare = window.localStorage.getItem(COMPARE_KEY);
      const storedCustomText = window.localStorage.getItem(CUSTOM_TEXT_KEY);

      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
      if (storedCompare) {
        setCompareIds(JSON.parse(storedCompare));
      }
      if (storedCustomText) {
        try {
          const parsed = JSON.parse(storedCustomText);
          // Handle both old string format and new object format
          if (typeof parsed === 'string') {
            setCustomTextState({ headline: parsed, subhead: "", body: parsed });
          } else {
            setCustomTextState({ ...EMPTY_CUSTOM_TEXT, ...parsed });
          }
        } catch {
          // Old format was just a string
          setCustomTextState({ headline: storedCustomText, subhead: "", body: storedCustomText });
        }
      }
    } catch (error) {
      console.warn("Error reading from localStorage:", error);
    }
    setIsHydrated(true);
  }, []);

  // Persist favorites to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.warn("Error saving favorites:", error);
    }
  }, [favorites, isHydrated]);

  // Persist compare to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(COMPARE_KEY, JSON.stringify(compareIds));
    } catch (error) {
      console.warn("Error saving compare:", error);
    }
  }, [compareIds, isHydrated]);

  // Persist custom text to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const hasAnyText = customText.headline || customText.subhead || customText.body;
      if (hasAnyText) {
        window.localStorage.setItem(CUSTOM_TEXT_KEY, JSON.stringify(customText));
      } else {
        window.localStorage.removeItem(CUSTOM_TEXT_KEY);
      }
    } catch (error) {
      console.warn("Error saving custom text:", error);
    }
  }, [customText, isHydrated]);

  // === CUSTOM TEXT ===
  const setCustomText = useCallback((field: keyof CustomTextFields, text: string) => {
    setCustomTextState(prev => ({
      ...prev,
      [field]: text.slice(0, 200) // Limit to 200 chars per field
    }));
  }, []);

  const setAllCustomText = useCallback((texts: Partial<CustomTextFields>) => {
    setCustomTextState(prev => ({
      ...prev,
      headline: texts.headline?.slice(0, 200) ?? prev.headline,
      subhead: texts.subhead?.slice(0, 200) ?? prev.subhead,
      body: texts.body?.slice(0, 200) ?? prev.body,
    }));
  }, []);

  const clearCustomText = useCallback(() => {
    setCustomTextState(EMPTY_CUSTOM_TEXT);
  }, []);

  const hasCustomText = !!(customText.headline.trim() || customText.subhead.trim() || customText.body.trim());

  // === FAVORITES ===
  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const addFavorite = useCallback((id: string): number => {
    // Compute new count synchronously before setState
    const willAdd = !favorites.includes(id);
    const newCount = willAdd ? favorites.length + 1 : favorites.length;

    if (willAdd) {
      setFavorites((prev) => [...prev, id]);
    }
    return newCount;
  }, [favorites]);

  const removeFavorite = useCallback((id: string): number => {
    // Compute new count synchronously before setState
    const willRemove = favorites.includes(id);
    const newCount = willRemove ? favorites.length - 1 : favorites.length;

    if (willRemove) {
      setFavorites((prev) => prev.filter((fav) => fav !== id));
    }
    return newCount;
  }, [favorites]);

  const toggleFavorite = useCallback(
    (id: string): { added: boolean; count: number } => {
      const wasInFavorites = favorites.includes(id);
      if (wasInFavorites) {
        const newCount = favorites.length - 1;
        setFavorites((prev) => prev.filter((fav) => fav !== id));
        return { added: false, count: newCount };
      } else {
        const newCount = favorites.length + 1;
        setFavorites((prev) => [...prev, id]);
        return { added: true, count: newCount };
      }
    },
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const favoritesCount = favorites.length;

  // === COMPARE ===
  const isInCompare = useCallback(
    (id: string) => compareIds.includes(id),
    [compareIds]
  );

  const canAddMore = compareIds.length < MAX_COMPARE_ITEMS;

  const addToCompare = useCallback(
    (id: string): { success: boolean; count: number } => {
      // Already in compare
      if (compareIds.includes(id)) {
        return { success: true, count: compareIds.length };
      }
      // At max capacity
      if (compareIds.length >= MAX_COMPARE_ITEMS) {
        return { success: false, count: compareIds.length };
      }

      // Compute new count synchronously
      const newCount = compareIds.length + 1;
      setCompareIds((prev) => [...prev, id]);
      return { success: true, count: newCount };
    },
    [compareIds]
  );

  const removeFromCompare = useCallback((id: string): number => {
    // Compute new count synchronously
    const willRemove = compareIds.includes(id);
    const newCount = willRemove ? compareIds.length - 1 : compareIds.length;

    if (willRemove) {
      setCompareIds((prev) => prev.filter((item) => item !== id));
    }
    return newCount;
  }, [compareIds]);

  const toggleCompare = useCallback(
    (id: string): { added: boolean; count: number } | null => {
      const wasInCompare = compareIds.includes(id);
      if (wasInCompare) {
        const newCount = compareIds.length - 1;
        setCompareIds((prev) => prev.filter((item) => item !== id));
        return { added: false, count: newCount };
      } else {
        // Check if at max
        if (compareIds.length >= MAX_COMPARE_ITEMS) {
          return null; // Couldn't add (at max)
        }
        const newCount = compareIds.length + 1;
        setCompareIds((prev) => [...prev, id]);
        return { added: true, count: newCount };
      }
    },
    [compareIds]
  );

  const clearCompare = useCallback(() => {
    setCompareIds([]);
  }, []);

  const compareCount = compareIds.length;

  const value = useMemo(
    () => ({
      // Favorites
      favorites,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
      favoritesCount,

      // Compare
      compareIds,
      isInCompare,
      toggleCompare,
      addToCompare,
      removeFromCompare,
      clearCompare,
      compareCount,
      canAddMore,

      // Custom text
      customText,
      setCustomText,
      setAllCustomText,
      clearCustomText,
      hasCustomText,

      // Hydration
      isHydrated,
    }),
    [
      favorites,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
      favoritesCount,
      compareIds,
      isInCompare,
      toggleCompare,
      addToCompare,
      removeFromCompare,
      clearCompare,
      compareCount,
      canAddMore,
      customText,
      setCustomText,
      setAllCustomText,
      clearCustomText,
      hasCustomText,
      isHydrated,
    ]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}

// Convenience hooks that mirror the old API
export function useFavorites() {
  const {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    favoritesCount,
  } = useAppState();

  return {
    favorites,
    isFavorite,
    toggleFavorite: (id: string) => {
      toggleFavorite(id);
    },
    addFavorite,
    removeFavorite,
    clearFavorites,
    favoritesCount,
    // New: get result with added status
    toggleFavoriteWithResult: toggleFavorite,
  };
}

export function useComparison() {
  const {
    compareIds,
    isInCompare,
    toggleCompare,
    addToCompare,
    removeFromCompare,
    clearCompare,
    compareCount,
    canAddMore,
  } = useAppState();

  return {
    compareIds,
    isInCompare,
    toggleCompare: (id: string) => {
      toggleCompare(id);
    },
    addToCompare: (id: string) => addToCompare(id).success,
    removeFromCompare,
    clearCompare,
    compareCount,
    canAddMore,
    // New: get result with added status
    toggleCompareWithResult: toggleCompare,
  };
}

export function useCustomText() {
  const { customText, setCustomText, setAllCustomText, clearCustomText, hasCustomText } = useAppState();
  return { customText, setCustomText, setAllCustomText, clearCustomText, hasCustomText };
}
