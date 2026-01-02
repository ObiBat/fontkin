// Font source types
export type FontSource = "google" | "adobe" | "custom";

// Font classification
export type FontClassification = "sans" | "serif" | "slab" | "display" | "mono";

// Timelessness categories
export type Timelessness = "timeless" | "modern_classic" | "trending";

// Style tags for filtering
export type StyleTag =
  | "geometric"
  | "humanist"
  | "grotesque"
  | "neo-grotesque"
  | "transitional"
  | "old-style"
  | "didone"
  | "contemporary"
  | "variable";

// Vibe tags for mood-based filtering
export type VibeTag =
  | "luxury"
  | "calm"
  | "tech"
  | "stoic"
  | "minimal"
  | "playful"
  | "editorial"
  | "masculine"
  | "feminine"
  | "warm"
  | "cool"
  | "bold"
  | "elegant"
  | "modern"
  | "classic"
  | "professional"
  | "readable"
  | "friendly"
  | "rounded"
  | "approachable"
  | "urban"
  | "impactful"
  | "condensed"
  | "stylish"
  | "retro"
  | "fun"
  | "industrial"
  | "striking"
  | "accessible"
  | "inclusive"
  | "clear"
  | "fashion"
  | "sophisticated"
  | "literary"
  | "neutral"
  | "clean"
  | "timeless";

// Usage context tags
export type UsageContext =
  | "saas-ui"
  | "branding"
  | "editorial"
  | "portfolio"
  | "landing-page"
  | "dashboard"
  | "blog"
  | "ecommerce"
  | "corporate";

// Typography role
export type TypographyRole =
  | "heading-serif"
  | "heading-sans"
  | "body-serif"
  | "body-sans"
  | "accent-mono"
  | "display";

// Font weight values
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

// Variable font axis configuration
export interface VariableFontAxis {
  min: number;
  max: number;
  default: number;
}

export interface VariableFontAxes {
  weight?: VariableFontAxis;
  width?: VariableFontAxis;
  slant?: VariableFontAxis;
  opticalSize?: VariableFontAxis;
}

/**
 * FontFamily - Represents a single typeface
 */
export interface FontFamily {
  id: string;
  name: string;
  source: FontSource;
  classification: FontClassification;
  styleTags: StyleTag[];
  vibeTags: VibeTag[];
  timelessScore: number; // 0-100
  trendingScore: number; // 0-100
  bestFor: TypographyRole[];
  availableWeights: FontWeight[];
  googleFontId?: string; // e.g., "Playfair+Display"
  sampleText?: string;
  description?: string;
  designer?: string;
  yearReleased?: number;
  // New metadata fields
  isVariable?: boolean;
  variableAxes?: VariableFontAxes;
  languageSupport?: string[]; // e.g., ["latin", "cyrillic", "greek"]
  category?: string; // e.g., "Timeless Serifs", "Modern Sans", "Display"
}

/**
 * TypeScaleEntry - Defines typography settings for a specific hierarchy level
 */
export interface TypeScaleEntry {
  fontId: string;
  weight: FontWeight;
  size: string; // e.g., "48px" or "3rem"
  lineHeight: number; // e.g., 1.1
  letterSpacing?: string; // e.g., "-0.02em"
}

// Standard hierarchy level names
export type HierarchyLevel =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body-large"
  | "body"
  | "body-small"
  | "caption"
  | "overline"
  | "label"
  | "micro";

/**
 * TypeHierarchy - Complete type scale for a combo
 * Supports both legacy fixed levels and flexible extended levels
 */
export interface TypeHierarchy {
  h1: TypeScaleEntry;
  h2: TypeScaleEntry;
  h3: TypeScaleEntry;
  body: TypeScaleEntry;
  caption: TypeScaleEntry;
  // Extended levels (optional)
  display?: TypeScaleEntry;
  h4?: TypeScaleEntry;
  h5?: TypeScaleEntry;
  h6?: TypeScaleEntry;
  "body-large"?: TypeScaleEntry;
  "body-small"?: TypeScaleEntry;
  overline?: TypeScaleEntry;
  label?: TypeScaleEntry;
  micro?: TypeScaleEntry;
}

// Scale presets
export type ScalePreset = "compact" | "balanced" | "expanded" | "editorial";

/**
 * FontCombo - A curated font pairing
 */
export interface FontCombo {
  id: string;
  name: string;
  slug: string;
  primaryFontId: string;
  secondaryFontId: string;
  tertiaryFontId?: string;
  usageContexts: UsageContext[];
  vibeTags: VibeTag[];
  timelessness: Timelessness;
  recommendedPalette?: string[]; // hex colors
  hierarchy: TypeHierarchy;
  description: string;
  aiPromptContext?: string; // Additional context for AI prompts
}

/**
 * Resolved combo with full font data
 */
export interface ResolvedFontCombo extends FontCombo {
  primaryFont: FontFamily;
  secondaryFont: FontFamily;
  tertiaryFont?: FontFamily;
}

// Sort options for explore page
export type SortOption = "name-asc" | "name-desc" | "newest" | "timeless" | "trending" | "popular";

/**
 * Filter state for the explore page
 */
export interface FilterState {
  typographyRoles: TypographyRole[];
  vibeTags: VibeTag[];
  timelessness: Timelessness[];
  usageContexts: UsageContext[];
  googleFontsOnly: boolean;
  searchQuery: string;
  // New filter options
  favoritesOnly?: boolean;
  sortBy?: SortOption;
}

/**
 * Export format types
 */
export type ExportFormat = "css" | "tailwind" | "google-link" | "ai-prompt" | "ai-system";

/**
 * User preferences stored in localStorage
 */
export interface UserPreferences {
  theme: "light" | "dark" | "system";
  defaultFilters: Partial<FilterState>;
  sampleTextMode: "curated" | "custom";
  customSampleText?: {
    headline?: string;
    subhead?: string;
    body?: string;
  };
}

/**
 * Custom combo created by user
 */
export interface CustomCombo {
  id: string;
  name: string;
  createdAt: number;
  primaryFontId: string;
  secondaryFontId: string;
  hierarchy: Partial<TypeHierarchy>;
}
