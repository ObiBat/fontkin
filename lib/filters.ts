import { ResolvedFontCombo, FilterState, Timelessness, VibeTag, UsageContext } from "@/lib/types";

export const defaultFilterState: FilterState = {
  typographyRoles: [],
  vibeTags: [],
  timelessness: [],
  usageContexts: [],
  googleFontsOnly: false,
  searchQuery: "",
};

// Filter options for the UI
export const filterOptions = {
  timelessness: [
    { value: "timeless" as Timelessness, label: "Timeless" },
    { value: "modern_classic" as Timelessness, label: "Modern Classic" },
    { value: "trending" as Timelessness, label: "Trending" },
  ],
  vibeTags: [
    { value: "luxury" as VibeTag, label: "Luxury" },
    { value: "calm" as VibeTag, label: "Calm" },
    { value: "tech" as VibeTag, label: "Tech" },
    { value: "stoic" as VibeTag, label: "Stoic" },
    { value: "minimal" as VibeTag, label: "Minimal" },
    { value: "playful" as VibeTag, label: "Playful" },
    { value: "editorial" as VibeTag, label: "Editorial" },
    { value: "masculine" as VibeTag, label: "Masculine" },
    { value: "elegant" as VibeTag, label: "Elegant" },
    { value: "modern" as VibeTag, label: "Modern" },
    { value: "warm" as VibeTag, label: "Warm" },
    { value: "bold" as VibeTag, label: "Bold" },
  ],
  usageContexts: [
    { value: "saas-ui" as UsageContext, label: "SaaS UI" },
    { value: "branding" as UsageContext, label: "Branding" },
    { value: "editorial" as UsageContext, label: "Editorial" },
    { value: "portfolio" as UsageContext, label: "Portfolio" },
    { value: "landing-page" as UsageContext, label: "Landing Page" },
    { value: "dashboard" as UsageContext, label: "Dashboard" },
    { value: "blog" as UsageContext, label: "Blog" },
    { value: "ecommerce" as UsageContext, label: "E-commerce" },
    { value: "corporate" as UsageContext, label: "Corporate" },
  ],
};

export function filterCombos(
  combos: ResolvedFontCombo[],
  filters: FilterState
): ResolvedFontCombo[] {
  return combos.filter((combo) => {
    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = [
        combo.name,
        combo.description,
        combo.primaryFont.name,
        combo.secondaryFont.name,
        ...combo.vibeTags,
        ...combo.usageContexts,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Timelessness filter
    if (filters.timelessness.length > 0) {
      if (!filters.timelessness.includes(combo.timelessness)) {
        return false;
      }
    }

    // Vibe tags filter (OR logic - match any)
    if (filters.vibeTags.length > 0) {
      const hasMatchingVibe = filters.vibeTags.some((vibe) =>
        combo.vibeTags.includes(vibe)
      );
      if (!hasMatchingVibe) {
        return false;
      }
    }

    // Usage contexts filter (OR logic - match any)
    if (filters.usageContexts.length > 0) {
      const hasMatchingContext = filters.usageContexts.some((context) =>
        combo.usageContexts.includes(context)
      );
      if (!hasMatchingContext) {
        return false;
      }
    }

    // Google Fonts only filter
    if (filters.googleFontsOnly) {
      if (
        combo.primaryFont.source !== "google" ||
        combo.secondaryFont.source !== "google"
      ) {
        return false;
      }
    }

    return true;
  });
}
