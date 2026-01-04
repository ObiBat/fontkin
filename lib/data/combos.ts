import { FontCombo, ResolvedFontCombo } from "@/lib/types";
import { getFontById, fonts } from "./fonts";

export const combos: FontCombo[] = [
  // ============================================
  // === TIMELESS EDITORIAL ===
  // ============================================
  {
    id: "playfair-inter",
    name: "Playfair + Inter",
    slug: "playfair-inter",
    primaryFontId: "playfair-display",
    secondaryFontId: "inter",
    usageContexts: ["editorial", "blog", "landing-page"],
    vibeTags: ["elegant", "modern", "editorial", "professional"],
    timelessness: "modern_classic",
    description: "The quintessential editorial pairing. Playfair's high-contrast elegance meets Inter's clean legibility. Perfect for modern magazines and premium content.",
    aiPromptContext: "This pairing conveys sophisticated editorial design. Use Playfair for high-impact headlines and Inter for readable body content.",
    hierarchy: {
      h1: { fontId: "playfair-display", weight: 700, size: "48px", lineHeight: 1.1, letterSpacing: "-0.02em" },
      h2: { fontId: "playfair-display", weight: 600, size: "32px", lineHeight: 1.2, letterSpacing: "-0.01em" },
      h3: { fontId: "playfair-display", weight: 600, size: "24px", lineHeight: 1.3 },
      body: { fontId: "inter", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "inter", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },
  {
    id: "merriweather-open-sans",
    name: "Merriweather + Open Sans",
    slug: "merriweather-open-sans",
    primaryFontId: "merriweather",
    secondaryFontId: "open-sans",
    usageContexts: ["editorial", "blog", "corporate"],
    vibeTags: ["warm", "professional", "readable", "classic"],
    timelessness: "timeless",
    description: "A proven workhorse pairing. Merriweather's generous x-height and sturdy serifs excel at body text, while Open Sans provides clean, neutral support.",
    aiPromptContext: "Reliable editorial pairing optimized for long-form reading. Merriweather handles extended text; Open Sans for UI and navigation.",
    hierarchy: {
      h1: { fontId: "merriweather", weight: 700, size: "42px", lineHeight: 1.15 },
      h2: { fontId: "merriweather", weight: 700, size: "28px", lineHeight: 1.25 },
      h3: { fontId: "merriweather", weight: 700, size: "22px", lineHeight: 1.3 },
      body: { fontId: "merriweather", weight: 400, size: "17px", lineHeight: 1.8 },
      caption: { fontId: "open-sans", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },
  {
    id: "crimson-pro-work-sans",
    name: "Crimson Pro + Work Sans",
    slug: "crimson-pro-work-sans",
    primaryFontId: "crimson-pro",
    secondaryFontId: "work-sans",
    usageContexts: ["editorial", "blog", "landing-page"],
    vibeTags: ["elegant", "warm", "editorial", "modern"],
    timelessness: "modern_classic",
    description: "Old-style elegance meets geometric warmth. Crimson Pro's refined Garamond-inspired forms pair beautifully with Work Sans's friendly neutrality.",
    aiPromptContext: "Elegant editorial pairing. Crimson Pro for sophisticated headlines and body; Work Sans for interface elements.",
    hierarchy: {
      h1: { fontId: "crimson-pro", weight: 600, size: "48px", lineHeight: 1.1 },
      h2: { fontId: "crimson-pro", weight: 600, size: "32px", lineHeight: 1.2 },
      h3: { fontId: "crimson-pro", weight: 500, size: "24px", lineHeight: 1.3 },
      body: { fontId: "crimson-pro", weight: 400, size: "18px", lineHeight: 1.75 },
      caption: { fontId: "work-sans", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },

  // === MODERN SAAS / TECH ===
  {
    id: "space-grotesk-inter",
    name: "Space Grotesk + Inter",
    slug: "space-grotesk-inter",
    primaryFontId: "space-grotesk",
    secondaryFontId: "inter",
    usageContexts: ["saas-ui", "dashboard", "landing-page"],
    vibeTags: ["tech", "modern", "bold", "cool"],
    timelessness: "trending",
    description: "Tech-forward and confident. Space Grotesk's distinctive geometric character makes headlines pop, while Inter handles UI and body text with precision.",
    aiPromptContext: "Perfect for SaaS products and tech startups. Space Grotesk brings personality to headlines; Inter ensures interface clarity.",
    hierarchy: {
      h1: { fontId: "space-grotesk", weight: 700, size: "48px", lineHeight: 1.1, letterSpacing: "-0.03em" },
      h2: { fontId: "space-grotesk", weight: 600, size: "32px", lineHeight: 1.15, letterSpacing: "-0.02em" },
      h3: { fontId: "space-grotesk", weight: 500, size: "22px", lineHeight: 1.25 },
      body: { fontId: "inter", weight: 400, size: "16px", lineHeight: 1.65 },
      caption: { fontId: "inter", weight: 500, size: "13px", lineHeight: 1.5 },
    },
  },
  {
    id: "manrope-only",
    name: "Manrope",
    slug: "manrope",
    primaryFontId: "manrope",
    secondaryFontId: "manrope",
    usageContexts: ["saas-ui", "dashboard", "portfolio"],
    vibeTags: ["minimal", "modern", "professional", "cool"],
    timelessness: "modern_classic",
    description: "A single-family solution with character. Manrope's distinctive letterforms and wide weight range make it versatile enough to handle both headlines and body text.",
    aiPromptContext: "Minimalist single-font approach. Use weight contrast to create hierarchy. Manrope works across all sizes.",
    hierarchy: {
      h1: { fontId: "manrope", weight: 700, size: "48px", lineHeight: 1.1, letterSpacing: "-0.03em" },
      h2: { fontId: "manrope", weight: 600, size: "32px", lineHeight: 1.2, letterSpacing: "-0.02em" },
      h3: { fontId: "manrope", weight: 600, size: "22px", lineHeight: 1.3, letterSpacing: "-0.01em" },
      body: { fontId: "manrope", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "manrope", weight: 500, size: "13px", lineHeight: 1.5 },
    },
  },

  // === EDITORIAL / STORYTELLING ===
  {
    id: "instrument-serif-inter",
    name: "Instrument Serif + Inter",
    slug: "instrument-serif-inter",
    primaryFontId: "instrument-serif",
    secondaryFontId: "inter",
    usageContexts: ["editorial", "blog", "portfolio"],
    vibeTags: ["editorial", "elegant", "modern", "minimal"],
    timelessness: "trending",
    description: "The trending editorial combination. Instrument Serif's contemporary elegance is balanced by Inter's reliable body text. Currently very popular in design.",
    aiPromptContext: "Trending editorial pairing. Instrument Serif is contemporary and distinctive; Inter grounds it with readability.",
    hierarchy: {
      h1: { fontId: "instrument-serif", weight: 400, size: "52px", lineHeight: 1.1, letterSpacing: "-0.02em" },
      h2: { fontId: "instrument-serif", weight: 400, size: "36px", lineHeight: 1.2, letterSpacing: "-0.01em" },
      h3: { fontId: "instrument-serif", weight: 400, size: "24px", lineHeight: 1.3 },
      body: { fontId: "inter", weight: 400, size: "16px", lineHeight: 1.75 },
      caption: { fontId: "inter", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },
  {
    id: "lora-dm-sans",
    name: "Lora + DM Sans",
    slug: "lora-dm-sans",
    primaryFontId: "lora",
    secondaryFontId: "dm-sans",
    usageContexts: ["blog", "editorial", "landing-page"],
    vibeTags: ["warm", "calm", "editorial", "professional"],
    timelessness: "modern_classic",
    description: "Warm and inviting. Lora's brushed curves and DM Sans's soft geometry create a cozy, approachable editorial feel.",
    aiPromptContext: "Warm editorial pairing for blogs and content sites. Lora is soft and readable; DM Sans is friendly and modern.",
    hierarchy: {
      h1: { fontId: "lora", weight: 700, size: "42px", lineHeight: 1.15 },
      h2: { fontId: "lora", weight: 600, size: "28px", lineHeight: 1.25 },
      h3: { fontId: "lora", weight: 600, size: "22px", lineHeight: 1.3 },
      body: { fontId: "dm-sans", weight: 400, size: "16px", lineHeight: 1.75 },
      caption: { fontId: "dm-sans", weight: 400, size: "14px", lineHeight: 1.6 },
    },
  },
  {
    id: "source-serif-space-grotesk",
    name: "Source Serif + Space Grotesk",
    slug: "source-serif-space-grotesk",
    primaryFontId: "source-serif-4",
    secondaryFontId: "space-grotesk",
    usageContexts: ["editorial", "blog", "corporate"],
    vibeTags: ["professional", "modern", "editorial", "calm"],
    timelessness: "modern_classic",
    description: "Intellectual and modern. Source Serif's refined readability paired with Space Grotesk's tech-forward character creates a smart, contemporary editorial voice.",
    aiPromptContext: "Modern intellectual pairing. Source Serif is highly readable; Space Grotesk adds contemporary edge to UI elements.",
    hierarchy: {
      h1: { fontId: "source-serif-4", weight: 700, size: "46px", lineHeight: 1.1 },
      h2: { fontId: "source-serif-4", weight: 600, size: "30px", lineHeight: 1.2 },
      h3: { fontId: "space-grotesk", weight: 600, size: "20px", lineHeight: 1.3 },
      body: { fontId: "source-serif-4", weight: 400, size: "18px", lineHeight: 1.75 },
      caption: { fontId: "space-grotesk", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },

  // === BOLD / EXPRESSIVE ===
  {
    id: "fraunces-dm-sans",
    name: "Fraunces + DM Sans",
    slug: "fraunces-dm-sans",
    primaryFontId: "fraunces",
    secondaryFontId: "dm-sans",
    usageContexts: ["branding", "landing-page", "ecommerce"],
    vibeTags: ["playful", "warm", "bold", "modern"],
    timelessness: "trending",
    description: "Playful and confident. Fraunces's expressive personality makes an instant impression, balanced by DM Sans's friendly neutrality.",
    aiPromptContext: "Expressive brand pairing. Fraunces has distinctive 'wonky' character for personality; DM Sans provides clean supporting text.",
    hierarchy: {
      h1: { fontId: "fraunces", weight: 700, size: "52px", lineHeight: 1.05, letterSpacing: "-0.02em" },
      h2: { fontId: "fraunces", weight: 600, size: "34px", lineHeight: 1.15 },
      h3: { fontId: "dm-sans", weight: 600, size: "22px", lineHeight: 1.3 },
      body: { fontId: "dm-sans", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "dm-sans", weight: 500, size: "13px", lineHeight: 1.5 },
    },
  },

  // ============================================
  // === WITH MONO ACCENT ===
  // ============================================
  {
    id: "inter-jetbrains",
    name: "Inter + JetBrains Mono",
    slug: "inter-jetbrains-mono",
    primaryFontId: "inter",
    secondaryFontId: "inter",
    tertiaryFontId: "jetbrains-mono",
    usageContexts: ["saas-ui", "dashboard", "portfolio"],
    vibeTags: ["tech", "minimal", "modern", "professional"],
    timelessness: "modern_classic",
    description: "Developer-focused design system. Inter handles everything with JetBrains Mono for code snippets and technical accents.",
    aiPromptContext: "Technical product pairing. Inter for UI; JetBrains Mono for code blocks and technical data. Clean and developer-friendly.",
    hierarchy: {
      h1: { fontId: "inter", weight: 700, size: "44px", lineHeight: 1.15, letterSpacing: "-0.02em" },
      h2: { fontId: "inter", weight: 600, size: "28px", lineHeight: 1.2 },
      h3: { fontId: "inter", weight: 600, size: "20px", lineHeight: 1.3 },
      body: { fontId: "inter", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "jetbrains-mono", weight: 400, size: "13px", lineHeight: 1.5 },
    },
  },
  {
    id: "geist-mono-geist",
    name: "Geist Sans + Geist Mono",
    slug: "geist-mono-geist",
    primaryFontId: "geist-sans",
    secondaryFontId: "geist-sans",
    tertiaryFontId: "roboto-mono",
    usageContexts: ["saas-ui", "dashboard", "portfolio"],
    vibeTags: ["minimal", "tech", "modern", "professional"],
    timelessness: "trending",
    description: "Vercel's design system choice. Geist's clean neutrality with Roboto Mono for technical accents creates a polished developer experience.",
    aiPromptContext: "Premium developer product design. Geist for clean interfaces; monospace for code and data display.",
    hierarchy: {
      h1: { fontId: "geist-sans", weight: 700, size: "42px", lineHeight: 1.1, letterSpacing: "-0.02em" },
      h2: { fontId: "geist-sans", weight: 600, size: "28px", lineHeight: 1.2 },
      h3: { fontId: "geist-sans", weight: 500, size: "20px", lineHeight: 1.3 },
      body: { fontId: "geist-sans", weight: 400, size: "16px", lineHeight: 1.65 },
      caption: { fontId: "roboto-mono", weight: 400, size: "13px", lineHeight: 1.5 },
    },
  },

  // ============================================
  // === STARTUP FAVORITES ===
  // ============================================
  {
    id: "poppins-dm-sans",
    name: "Poppins + DM Sans",
    slug: "poppins-dm-sans",
    primaryFontId: "poppins",
    secondaryFontId: "dm-sans",
    usageContexts: ["saas-ui", "landing-page", "ecommerce"],
    vibeTags: ["modern", "bold", "tech", "professional"],
    timelessness: "trending",
    description: "Geometric boldness meets soft geometry. Poppins' circular forms command attention while DM Sans keeps body text comfortable.",
    aiPromptContext: "Bold startup pairing. Poppins for impactful headlines; DM Sans for friendly, readable body text.",
    hierarchy: {
      h1: { fontId: "poppins", weight: 700, size: "48px", lineHeight: 1.1, letterSpacing: "-0.02em" },
      h2: { fontId: "poppins", weight: 600, size: "32px", lineHeight: 1.15 },
      h3: { fontId: "poppins", weight: 600, size: "22px", lineHeight: 1.25 },
      body: { fontId: "dm-sans", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "dm-sans", weight: 500, size: "13px", lineHeight: 1.5 },
    },
  },
  {
    id: "montserrat-karla",
    name: "Montserrat + Karla",
    slug: "montserrat-karla",
    primaryFontId: "montserrat",
    secondaryFontId: "karla",
    usageContexts: ["branding", "landing-page", "ecommerce"],
    vibeTags: ["modern", "bold", "professional", "urban"],
    timelessness: "modern_classic",
    description: "Urban geometry meets quirky warmth. Montserrat's confidence in headlines balanced by Karla's friendly character in body text.",
    aiPromptContext: "Bold modern pairing. Montserrat for strong headlines; Karla for approachable body text.",
    hierarchy: {
      h1: { fontId: "montserrat", weight: 700, size: "48px", lineHeight: 1.1, letterSpacing: "-0.02em" },
      h2: { fontId: "montserrat", weight: 600, size: "32px", lineHeight: 1.15 },
      h3: { fontId: "montserrat", weight: 600, size: "22px", lineHeight: 1.25 },
      body: { fontId: "karla", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "karla", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },

  // ============================================
  // === BOLD & EXPRESSIVE / DISPLAY ===
  // ============================================
  {
    id: "anton-dm-sans",
    name: "Anton + DM Sans",
    slug: "anton-dm-sans",
    primaryFontId: "anton",
    secondaryFontId: "dm-sans",
    usageContexts: ["landing-page", "branding", "ecommerce"],
    vibeTags: ["bold", "impactful", "modern", "urban"],
    timelessness: "trending",
    description: "Bold and unapologetic. Anton's heavy condensed forms demand attention, balanced by DM Sans's friendly geometry.",
    aiPromptContext: "Maximum impact pairing. Anton for dramatic headlines; DM Sans for friendly, approachable body.",
    hierarchy: {
      h1: { fontId: "anton", weight: 400, size: "64px", lineHeight: 1.0 },
      h2: { fontId: "anton", weight: 400, size: "42px", lineHeight: 1.05 },
      h3: { fontId: "dm-sans", weight: 600, size: "22px", lineHeight: 1.25 },
      body: { fontId: "dm-sans", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "dm-sans", weight: 500, size: "13px", lineHeight: 1.5 },
    },
  },
  {
    id: "abril-fatface-lora",
    name: "Abril Fatface + Lora",
    slug: "abril-fatface-lora",
    primaryFontId: "abril-fatface",
    secondaryFontId: "lora",
    usageContexts: ["editorial", "landing-page", "portfolio"],
    vibeTags: ["elegant", "bold", "editorial", "stylish"],
    timelessness: "timeless",
    description: "Display elegance meets editorial warmth. Abril Fatface's Didone drama paired with Lora's comfortable reading experience.",
    aiPromptContext: "Elegant display pairing. Abril Fatface for dramatic headlines; Lora for warm, readable body text.",
    hierarchy: {
      h1: { fontId: "abril-fatface", weight: 400, size: "60px", lineHeight: 1.0 },
      h2: { fontId: "abril-fatface", weight: 400, size: "40px", lineHeight: 1.1 },
      h3: { fontId: "lora", weight: 600, size: "22px", lineHeight: 1.3 },
      body: { fontId: "lora", weight: 400, size: "17px", lineHeight: 1.75 },
      caption: { fontId: "lora", weight: 400, size: "14px", lineHeight: 1.6 },
    },
  },
  {
    id: "righteous-nunito",
    name: "Righteous + Nunito",
    slug: "righteous-nunito",
    primaryFontId: "righteous",
    secondaryFontId: "nunito",
    usageContexts: ["branding", "landing-page", "ecommerce"],
    vibeTags: ["playful", "bold", "retro", "fun"],
    timelessness: "trending",
    description: "Retro-futuristic fun. Righteous's space-age curves create playful headlines while Nunito maintains friendly readability.",
    aiPromptContext: "Fun, retro-modern pairing. Righteous for playful headlines; Nunito for rounded, approachable body.",
    hierarchy: {
      h1: { fontId: "righteous", weight: 400, size: "52px", lineHeight: 1.05 },
      h2: { fontId: "righteous", weight: 400, size: "34px", lineHeight: 1.1 },
      h3: { fontId: "nunito", weight: 700, size: "22px", lineHeight: 1.25 },
      body: { fontId: "nunito", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "nunito", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },
  {
    id: "big-shoulders-work-sans",
    name: "Big Shoulders + Work Sans",
    slug: "big-shoulders-work-sans",
    primaryFontId: "big-shoulders-display",
    secondaryFontId: "work-sans",
    usageContexts: ["branding", "landing-page", "portfolio"],
    vibeTags: ["bold", "industrial", "modern", "urban"],
    timelessness: "trending",
    description: "Industrial strength meets geometric warmth. Big Shoulders' Chicago-inspired boldness paired with Work Sans's friendly neutrality.",
    aiPromptContext: "Urban industrial pairing. Big Shoulders for bold display; Work Sans for approachable body text.",
    hierarchy: {
      h1: { fontId: "big-shoulders-display", weight: 800, size: "58px", lineHeight: 1.0 },
      h2: { fontId: "big-shoulders-display", weight: 700, size: "38px", lineHeight: 1.1 },
      h3: { fontId: "work-sans", weight: 600, size: "22px", lineHeight: 1.25 },
      body: { fontId: "work-sans", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "work-sans", weight: 500, size: "13px", lineHeight: 1.5 },
    },
  },

  // ============================================
  // === MINIMAL & CLEAN ===
  // ============================================
  {
    id: "dm-sans-only",
    name: "DM Sans",
    slug: "dm-sans",
    primaryFontId: "dm-sans",
    secondaryFontId: "dm-sans",
    usageContexts: ["saas-ui", "dashboard", "branding"],
    vibeTags: ["minimal", "modern", "friendly", "clean"],
    timelessness: "modern_classic",
    description: "Clean and versatile. DM Sans's friendly geometry handles every typographic need with consistent warmth and clarity.",
    aiPromptContext: "Minimal single-font system. DM Sans for all text with weight contrast for hierarchy.",
    hierarchy: {
      h1: { fontId: "dm-sans", weight: 700, size: "48px", lineHeight: 1.1, letterSpacing: "-0.02em" },
      h2: { fontId: "dm-sans", weight: 600, size: "32px", lineHeight: 1.15 },
      h3: { fontId: "dm-sans", weight: 600, size: "22px", lineHeight: 1.25 },
      body: { fontId: "dm-sans", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "dm-sans", weight: 500, size: "13px", lineHeight: 1.5 },
    },
  },
  {
    id: "inter-only",
    name: "Inter",
    slug: "inter",
    primaryFontId: "inter",
    secondaryFontId: "inter",
    usageContexts: ["saas-ui", "dashboard", "corporate"],
    vibeTags: ["minimal", "professional", "tech", "clean"],
    timelessness: "modern_classic",
    description: "The industry standard. Inter's comprehensive character set and optical sizing make it perfect for any digital interface.",
    aiPromptContext: "Professional single-font system. Inter handles all typography with precision and clarity.",
    hierarchy: {
      h1: { fontId: "inter", weight: 700, size: "46px", lineHeight: 1.1, letterSpacing: "-0.02em" },
      h2: { fontId: "inter", weight: 600, size: "30px", lineHeight: 1.15 },
      h3: { fontId: "inter", weight: 600, size: "22px", lineHeight: 1.25 },
      body: { fontId: "inter", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "inter", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },

  // ============================================
  // === ACCESSIBILITY-FOCUSED ===
  // ============================================
  {
    id: "lexend-atkinson",
    name: "Lexend + Atkinson Hyperlegible",
    slug: "lexend-atkinson",
    primaryFontId: "lexend",
    secondaryFontId: "atkinson-hyperlegible",
    usageContexts: ["corporate", "blog", "dashboard"],
    vibeTags: ["accessible", "readable", "inclusive", "clear"],
    timelessness: "trending",
    description: "Double accessibility power. Lexend's reading fluency for headlines paired with Atkinson's hyperlegibility for body text.",
    aiPromptContext: "Ultimate accessibility pairing. Both fonts optimized for reading ease and character distinction.",
    hierarchy: {
      h1: { fontId: "lexend", weight: 700, size: "44px", lineHeight: 1.15 },
      h2: { fontId: "lexend", weight: 600, size: "28px", lineHeight: 1.2 },
      h3: { fontId: "lexend", weight: 500, size: "22px", lineHeight: 1.3 },
      body: { fontId: "atkinson-hyperlegible", weight: 400, size: "17px", lineHeight: 1.75 },
      caption: { fontId: "atkinson-hyperlegible", weight: 400, size: "14px", lineHeight: 1.6 },
    },
  },

  // ============================================
  // === LUXURY / FASHION ===
  // ============================================
  {
    id: "libre-caslon-montserrat",
    name: "Libre Caslon Text + Montserrat",
    slug: "libre-caslon-montserrat",
    primaryFontId: "libre-caslon-text",
    secondaryFontId: "montserrat",
    usageContexts: ["branding", "editorial", "ecommerce"],
    vibeTags: ["classic", "elegant", "professional", "stylish"],
    timelessness: "timeless",
    description: "Classic meets contemporary. Libre Caslon's traditional elegance paired with Montserrat's modern confidence.",
    aiPromptContext: "Sophisticated brand pairing. Libre Caslon for classic headlines; Montserrat for modern body text.",
    hierarchy: {
      h1: { fontId: "libre-caslon-text", weight: 700, size: "48px", lineHeight: 1.1 },
      h2: { fontId: "libre-caslon-text", weight: 700, size: "32px", lineHeight: 1.2 },
      h3: { fontId: "montserrat", weight: 600, size: "22px", lineHeight: 1.25 },
      body: { fontId: "montserrat", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "montserrat", weight: 500, size: "12px", lineHeight: 1.5, letterSpacing: "0.03em" },
    },
  },
  {
    id: "bitter-poppins",
    name: "Bitter + Poppins",
    slug: "bitter-poppins",
    primaryFontId: "bitter",
    secondaryFontId: "poppins",
    usageContexts: ["blog", "editorial", "landing-page"],
    vibeTags: ["warm", "modern", "professional", "editorial"],
    timelessness: "modern_classic",
    description: "Slab meets geometric. Bitter's sturdy warmth for headlines paired with Poppins' circular precision for body text.",
    aiPromptContext: "Warm editorial pairing. Bitter for strong headlines; Poppins for clean, modern body.",
    hierarchy: {
      h1: { fontId: "bitter", weight: 700, size: "46px", lineHeight: 1.1 },
      h2: { fontId: "bitter", weight: 600, size: "30px", lineHeight: 1.2 },
      h3: { fontId: "bitter", weight: 500, size: "22px", lineHeight: 1.3 },
      body: { fontId: "poppins", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "poppins", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },
  {
    id: "literata-sora",
    name: "Literata + Sora",
    slug: "literata-sora",
    primaryFontId: "literata",
    secondaryFontId: "sora",
    usageContexts: ["editorial", "blog", "landing-page"],
    vibeTags: ["modern", "elegant", "readable", "tech"],
    timelessness: "trending",
    description: "Google Books serif meets geometric precision. Literata's variable optical sizing paired with Sora's contemporary clarity.",
    aiPromptContext: "Modern editorial pairing. Literata for optimized reading; Sora for tech-forward interfaces.",
    hierarchy: {
      h1: { fontId: "literata", weight: 700, size: "46px", lineHeight: 1.1 },
      h2: { fontId: "literata", weight: 600, size: "30px", lineHeight: 1.2 },
      h3: { fontId: "literata", weight: 500, size: "22px", lineHeight: 1.3 },
      body: { fontId: "literata", weight: 400, size: "17px", lineHeight: 1.75 },
      caption: { fontId: "sora", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },
  {
    id: "chivo-dm-sans",
    name: "Chivo + DM Sans",
    slug: "chivo-dm-sans",
    primaryFontId: "chivo",
    secondaryFontId: "dm-sans",
    usageContexts: ["branding", "saas-ui", "landing-page"],
    vibeTags: ["modern", "bold", "professional", "tech"],
    timelessness: "modern_classic",
    description: "Grotesque confidence meets friendly geometry. Chivo's strong presence paired with DM Sans's approachable warmth.",
    aiPromptContext: "Bold professional pairing. Chivo for confident headlines; DM Sans for friendly body text.",
    hierarchy: {
      h1: { fontId: "chivo", weight: 900, size: "48px", lineHeight: 1.05, letterSpacing: "-0.02em" },
      h2: { fontId: "chivo", weight: 700, size: "32px", lineHeight: 1.15 },
      h3: { fontId: "chivo", weight: 600, size: "22px", lineHeight: 1.25 },
      body: { fontId: "dm-sans", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "dm-sans", weight: 500, size: "13px", lineHeight: 1.5 },
    },
  },

  // ============================================
  // === AVANT-GARDE & EXPERIMENTAL ===
  // ============================================
  {
    id: "cabinet-grotesk-spectral",
    name: "Cabinet Grotesk + Spectral",
    slug: "cabinet-grotesk-spectral",
    primaryFontId: "cabinet-grotesk",
    secondaryFontId: "spectral",
    usageContexts: ["editorial", "portfolio", "landing-page"],
    vibeTags: ["bold", "editorial", "modern", "sophisticated"],
    timelessness: "trending",
    description: "Expressive grotesque meets refined serif. Cabinet Grotesk's optical sizing creates dramatic headlines while Spectral provides elegant reading.",
    aiPromptContext: "Bold editorial pairing for design-forward brands. Cabinet Grotesk for impactful display; Spectral for refined body text.",
    hierarchy: {
      h1: { fontId: "cabinet-grotesk", weight: 800, size: "60px", lineHeight: 0.95, letterSpacing: "-0.03em" },
      h2: { fontId: "cabinet-grotesk", weight: 700, size: "38px", lineHeight: 1.05 },
      h3: { fontId: "spectral", weight: 600, size: "24px", lineHeight: 1.25 },
      body: { fontId: "spectral", weight: 400, size: "17px", lineHeight: 1.75 },
      caption: { fontId: "spectral", weight: 400, size: "14px", lineHeight: 1.6 },
    },
  },
  {
    id: "general-sans-cormorant",
    name: "General Sans + Cormorant",
    slug: "general-sans-cormorant",
    primaryFontId: "general-sans",
    secondaryFontId: "cormorant-garamond",
    usageContexts: ["branding", "ecommerce", "portfolio"],
    vibeTags: ["luxury", "elegant", "minimal", "sophisticated"],
    timelessness: "modern_classic",
    description: "Swiss precision meets French elegance. General Sans's clean geometry paired with Cormorant's refined Garamond heritage for understated luxury.",
    aiPromptContext: "Refined luxury pairing. General Sans for modern headlines; Cormorant for elegant, aspirational body text.",
    hierarchy: {
      h1: { fontId: "general-sans", weight: 600, size: "52px", lineHeight: 1.0, letterSpacing: "-0.02em" },
      h2: { fontId: "general-sans", weight: 500, size: "34px", lineHeight: 1.1 },
      h3: { fontId: "cormorant-garamond", weight: 500, size: "26px", lineHeight: 1.25 },
      body: { fontId: "cormorant-garamond", weight: 400, size: "18px", lineHeight: 1.75 },
      caption: { fontId: "general-sans", weight: 400, size: "13px", lineHeight: 1.5, letterSpacing: "0.02em" },
    },
  },
  {
    id: "sora-fraunces",
    name: "Sora + Fraunces",
    slug: "sora-fraunces",
    primaryFontId: "sora",
    secondaryFontId: "fraunces",
    usageContexts: ["branding", "landing-page", "ecommerce"],
    vibeTags: ["playful", "tech", "warm", "bold"],
    timelessness: "trending",
    description: "Tech-forward geometry meets expressive serif. Sora's precision creates clean headlines while Fraunces adds personality and warmth to body text.",
    aiPromptContext: "Creative tech pairing with personality. Sora for geometric headlines; Fraunces for expressive, warm body text.",
    hierarchy: {
      h1: { fontId: "sora", weight: 700, size: "50px", lineHeight: 1.05, letterSpacing: "-0.02em" },
      h2: { fontId: "sora", weight: 600, size: "32px", lineHeight: 1.15 },
      h3: { fontId: "fraunces", weight: 600, size: "24px", lineHeight: 1.25 },
      body: { fontId: "fraunces", weight: 400, size: "17px", lineHeight: 1.75 },
      caption: { fontId: "sora", weight: 400, size: "13px", lineHeight: 1.5 },
    },
  },
  {
    id: "outfit-eb-garamond",
    name: "Outfit + EB Garamond",
    slug: "outfit-eb-garamond",
    primaryFontId: "outfit",
    secondaryFontId: "eb-garamond",
    usageContexts: ["editorial", "blog", "portfolio"],
    vibeTags: ["modern", "classic", "elegant", "editorial"],
    timelessness: "modern_classic",
    description: "Ultra-modern geometry meets Renaissance elegance. Outfit's clean precision paired with EB Garamond's timeless sophistication.",
    aiPromptContext: "Modern-classic fusion. Outfit for contemporary headlines; EB Garamond for literary, elegant body text.",
    hierarchy: {
      h1: { fontId: "outfit", weight: 700, size: "54px", lineHeight: 1.0, letterSpacing: "-0.02em" },
      h2: { fontId: "outfit", weight: 600, size: "36px", lineHeight: 1.1 },
      h3: { fontId: "eb-garamond", weight: 500, size: "24px", lineHeight: 1.3 },
      body: { fontId: "eb-garamond", weight: 400, size: "18px", lineHeight: 1.8 },
      caption: { fontId: "outfit", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },
  {
    id: "archivo-crimson-pro",
    name: "Archivo + Crimson Pro",
    slug: "archivo-crimson-pro",
    primaryFontId: "archivo",
    secondaryFontId: "crimson-pro",
    usageContexts: ["editorial", "blog", "corporate"],
    vibeTags: ["bold", "warm", "editorial", "professional"],
    timelessness: "modern_classic",
    description: "Strong grotesque meets warm old-style. Archivo's robust headlines paired with Crimson Pro's refined reading experience.",
    aiPromptContext: "Authoritative editorial pairing. Archivo for bold headlines; Crimson Pro for warm, elegant body text.",
    hierarchy: {
      h1: { fontId: "archivo", weight: 800, size: "48px", lineHeight: 1.05, letterSpacing: "-0.02em" },
      h2: { fontId: "archivo", weight: 700, size: "32px", lineHeight: 1.15 },
      h3: { fontId: "crimson-pro", weight: 600, size: "24px", lineHeight: 1.25 },
      body: { fontId: "crimson-pro", weight: 400, size: "18px", lineHeight: 1.75 },
      caption: { fontId: "archivo", weight: 500, size: "13px", lineHeight: 1.5 },
    },
  },
  {
    id: "jost-instrument-serif",
    name: "Jost + Instrument Serif",
    slug: "jost-instrument-serif",
    primaryFontId: "jost",
    secondaryFontId: "instrument-serif",
    usageContexts: ["branding", "portfolio", "landing-page"],
    vibeTags: ["elegant", "modern", "editorial", "minimal"],
    timelessness: "trending",
    description: "Futura-inspired geometry meets contemporary editorial. Jost's refined sans paired with Instrument Serif's trending elegance.",
    aiPromptContext: "Designer's pairing. Jost for elegant geometric headlines; Instrument Serif for contemporary editorial accent.",
    hierarchy: {
      h1: { fontId: "jost", weight: 600, size: "52px", lineHeight: 1.0, letterSpacing: "-0.01em" },
      h2: { fontId: "jost", weight: 500, size: "34px", lineHeight: 1.1 },
      h3: { fontId: "instrument-serif", weight: 400, size: "28px", lineHeight: 1.2 },
      body: { fontId: "jost", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "jost", weight: 400, size: "13px", lineHeight: 1.5, letterSpacing: "0.02em" },
    },
  },
  {
    id: "plus-jakarta-libre-baskerville",
    name: "Plus Jakarta Sans + Libre Baskerville",
    slug: "plus-jakarta-libre-baskerville",
    primaryFontId: "plus-jakarta-sans",
    secondaryFontId: "libre-baskerville",
    usageContexts: ["corporate", "saas-ui", "blog"],
    vibeTags: ["professional", "warm", "classic", "modern"],
    timelessness: "modern_classic",
    description: "Contemporary warmth meets classical authority. Plus Jakarta's friendly geometry paired with Baskerville's trusted elegance.",
    aiPromptContext: "Trust-building pairing for professional brands. Plus Jakarta for approachable headlines; Libre Baskerville for authoritative body.",
    hierarchy: {
      h1: { fontId: "plus-jakarta-sans", weight: 700, size: "48px", lineHeight: 1.1, letterSpacing: "-0.02em" },
      h2: { fontId: "plus-jakarta-sans", weight: 600, size: "32px", lineHeight: 1.15 },
      h3: { fontId: "libre-baskerville", weight: 700, size: "22px", lineHeight: 1.3 },
      body: { fontId: "libre-baskerville", weight: 400, size: "17px", lineHeight: 1.8 },
      caption: { fontId: "plus-jakarta-sans", weight: 500, size: "13px", lineHeight: 1.5 },
    },
  },
  {
    id: "space-grotesk-playfair",
    name: "Space Grotesk + Playfair Display",
    slug: "space-grotesk-playfair",
    primaryFontId: "space-grotesk",
    secondaryFontId: "playfair-display",
    usageContexts: ["editorial", "landing-page", "portfolio"],
    vibeTags: ["bold", "elegant", "editorial", "striking"],
    timelessness: "trending",
    description: "Tech-forward meets high-contrast elegance. Space Grotesk's distinctive character paired with Playfair's editorial drama.",
    aiPromptContext: "Bold contrast pairing. Space Grotesk for modern headlines; Playfair for dramatic, elegant accents.",
    hierarchy: {
      h1: { fontId: "space-grotesk", weight: 700, size: "52px", lineHeight: 1.0, letterSpacing: "-0.03em" },
      h2: { fontId: "playfair-display", weight: 600, size: "36px", lineHeight: 1.1 },
      h3: { fontId: "playfair-display", weight: 500, size: "26px", lineHeight: 1.25 },
      body: { fontId: "space-grotesk", weight: 400, size: "16px", lineHeight: 1.7 },
      caption: { fontId: "space-grotesk", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },
  {
    id: "figtree-literata",
    name: "Figtree + Literata",
    slug: "figtree-literata",
    primaryFontId: "figtree",
    secondaryFontId: "literata",
    usageContexts: ["blog", "editorial", "landing-page"],
    vibeTags: ["warm", "modern", "readable", "friendly"],
    timelessness: "trending",
    description: "Warm contemporary meets bookish elegance. Figtree's friendly geometry paired with Literata's optimized reading experience.",
    aiPromptContext: "Reader-friendly pairing. Figtree for warm headlines; Literata for extended comfortable reading.",
    hierarchy: {
      h1: { fontId: "figtree", weight: 700, size: "46px", lineHeight: 1.1, letterSpacing: "-0.02em" },
      h2: { fontId: "figtree", weight: 600, size: "30px", lineHeight: 1.15 },
      h3: { fontId: "literata", weight: 600, size: "22px", lineHeight: 1.3 },
      body: { fontId: "literata", weight: 400, size: "17px", lineHeight: 1.8 },
      caption: { fontId: "figtree", weight: 400, size: "14px", lineHeight: 1.5 },
    },
  },
  {
    id: "manrope-source-serif",
    name: "Manrope + Source Serif 4",
    slug: "manrope-source-serif",
    primaryFontId: "manrope",
    secondaryFontId: "source-serif-4",
    usageContexts: ["corporate", "blog", "editorial"],
    vibeTags: ["professional", "calm", "elegant", "readable"],
    timelessness: "modern_classic",
    description: "Distinctive sans meets refined serif. Manrope's unique character paired with Source Serif's exceptional legibility for sophisticated content.",
    aiPromptContext: "Professional editorial pairing. Manrope for distinctive headlines; Source Serif for extended reading comfort.",
    hierarchy: {
      h1: { fontId: "manrope", weight: 700, size: "48px", lineHeight: 1.05, letterSpacing: "-0.02em" },
      h2: { fontId: "manrope", weight: 600, size: "32px", lineHeight: 1.15 },
      h3: { fontId: "source-serif-4", weight: 600, size: "24px", lineHeight: 1.25 },
      body: { fontId: "source-serif-4", weight: 400, size: "17px", lineHeight: 1.75 },
      caption: { fontId: "manrope", weight: 500, size: "13px", lineHeight: 1.5 },
    },
  },
];

// Resolve a combo with full font data
export function resolveCombo(combo: FontCombo): ResolvedFontCombo {
  const primaryFont = getFontById(combo.primaryFontId);
  const secondaryFont = getFontById(combo.secondaryFontId);
  const tertiaryFont = combo.tertiaryFontId ? getFontById(combo.tertiaryFontId) : undefined;

  if (!primaryFont || !secondaryFont) {
    throw new Error(`Font not found for combo: ${combo.id}`);
  }

  return {
    ...combo,
    primaryFont,
    secondaryFont,
    tertiaryFont,
  };
}

// Get all resolved combos
export function getAllResolvedCombos(): ResolvedFontCombo[] {
  return combos.map(resolveCombo);
}

// Get combo by slug
export function getComboBySlug(slug: string): ResolvedFontCombo | undefined {
  const combo = combos.find((c) => c.slug === slug);
  return combo ? resolveCombo(combo) : undefined;
}

// Get combos by timelessness
export function getCombosByTimelessness(timelessness: FontCombo["timelessness"]): ResolvedFontCombo[] {
  return combos.filter((c) => c.timelessness === timelessness).map(resolveCombo);
}

// Get combos by usage context
export function getCombosByContext(context: FontCombo["usageContexts"][number]): ResolvedFontCombo[] {
  return combos.filter((c) => c.usageContexts.includes(context)).map(resolveCombo);
}

// Get combos by vibe tag
export function getCombosByVibe(vibe: FontCombo["vibeTags"][number]): ResolvedFontCombo[] {
  return combos.filter((c) => c.vibeTags.includes(vibe)).map(resolveCombo);
}
