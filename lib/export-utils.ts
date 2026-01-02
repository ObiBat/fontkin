import { ResolvedFontCombo, TypeScaleEntry, FontFamily } from "@/lib/types";
import { fonts } from "@/lib/data/fonts";

// Get unique fonts used in a combo
function getUniqueFonts(combo: ResolvedFontCombo): FontFamily[] {
  const fontIds = new Set<string>();
  const hierarchy = combo.hierarchy;

  Object.values(hierarchy).forEach((entry: TypeScaleEntry) => {
    fontIds.add(entry.fontId);
  });

  return Array.from(fontIds)
    .map((id) => fonts.find((f) => f.id === id))
    .filter((f): f is FontFamily => f !== undefined);
}

// Get unique weights for a font in a combo
function getFontWeights(combo: ResolvedFontCombo, fontId: string): number[] {
  const weights = new Set<number>();
  Object.values(combo.hierarchy).forEach((entry: TypeScaleEntry) => {
    if (entry.fontId === fontId) {
      weights.add(entry.weight);
    }
  });
  return Array.from(weights).sort((a, b) => a - b);
}

// Generate Google Fonts link
export function generateGoogleFontsLink(combo: ResolvedFontCombo): string {
  const usedFonts = getUniqueFonts(combo);
  const googleFonts = usedFonts.filter((f) => f.source === "google" && f.googleFontId);

  if (googleFonts.length === 0) return "";

  const families = googleFonts.map((font) => {
    const weights = getFontWeights(combo, font.id);
    return `family=${font.googleFontId}:wght@${weights.join(";")}`;
  });

  return `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${families.join("&")}&display=swap" rel="stylesheet">`;
}

// Generate CSS custom properties
export function generateCSSVariables(combo: ResolvedFontCombo): string {
  const usedFonts = getUniqueFonts(combo);

  let css = `:root {\n`;

  // Font family variables
  usedFonts.forEach((font) => {
    const varName = font.id.replace(/-/g, "-");
    css += `  --font-${varName}: "${font.name}", ${font.classification === "serif" ? "serif" : font.classification === "mono" ? "monospace" : "sans-serif"};\n`;
  });

  css += `\n`;

  // Type scale variables
  const { h1, h2, h3, body, caption } = combo.hierarchy;
  const entries = [
    ["h1", h1],
    ["h2", h2],
    ["h3", h3],
    ["body", body],
    ["caption", caption],
  ] as const;

  entries.forEach(([name, entry]) => {
    const font = fonts.find((f) => f.id === entry.fontId);
    if (font) {
      css += `  --${name}-font: var(--font-${font.id.replace(/-/g, "-")});\n`;
      css += `  --${name}-size: ${entry.size};\n`;
      css += `  --${name}-weight: ${entry.weight};\n`;
      css += `  --${name}-line-height: ${entry.lineHeight};\n`;
      if (entry.letterSpacing) {
        css += `  --${name}-letter-spacing: ${entry.letterSpacing};\n`;
      }
      css += `\n`;
    }
  });

  css += `}`;

  return css;
}

// Generate CSS classes
export function generateCSSClasses(combo: ResolvedFontCombo): string {
  const { h1, h2, h3, body, caption } = combo.hierarchy;

  const entries = [
    ["h1", h1],
    ["h2", h2],
    ["h3", h3],
    [".body-text", body],
    [".caption", caption],
  ] as const;

  let css = "";

  entries.forEach(([selector, entry]) => {
    const font = fonts.find((f) => f.id === entry.fontId);
    if (font) {
      css += `${selector} {\n`;
      css += `  font-family: "${font.name}", ${font.classification === "serif" ? "serif" : font.classification === "mono" ? "monospace" : "sans-serif"};\n`;
      css += `  font-size: ${entry.size};\n`;
      css += `  font-weight: ${entry.weight};\n`;
      css += `  line-height: ${entry.lineHeight};\n`;
      if (entry.letterSpacing) {
        css += `  letter-spacing: ${entry.letterSpacing};\n`;
      }
      css += `}\n\n`;
    }
  });

  return css.trim();
}

// Generate Tailwind config snippet
export function generateTailwindConfig(combo: ResolvedFontCombo): string {
  const usedFonts = getUniqueFonts(combo);

  const fontFamilies: Record<string, string[]> = {};

  usedFonts.forEach((font) => {
    const key = font.classification === "serif" ? "serif" : font.classification === "mono" ? "mono" : "sans";
    const fallback = font.classification === "serif" ? "serif" : font.classification === "mono" ? "monospace" : "sans-serif";
    fontFamilies[font.id.replace(/-/g, "")] = [`"${font.name}"`, fallback];
  });

  return `// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
${Object.entries(fontFamilies)
  .map(([key, value]) => `        ${key}: [${value.map((v) => `"${v}"`).join(", ")}],`)
  .join("\n")}
      },
      fontSize: {
        "h1": ["${combo.hierarchy.h1.size}", { lineHeight: "${combo.hierarchy.h1.lineHeight}", fontWeight: "${combo.hierarchy.h1.weight}" }],
        "h2": ["${combo.hierarchy.h2.size}", { lineHeight: "${combo.hierarchy.h2.lineHeight}", fontWeight: "${combo.hierarchy.h2.weight}" }],
        "h3": ["${combo.hierarchy.h3.size}", { lineHeight: "${combo.hierarchy.h3.lineHeight}", fontWeight: "${combo.hierarchy.h3.weight}" }],
        "body": ["${combo.hierarchy.body.size}", { lineHeight: "${combo.hierarchy.body.lineHeight}", fontWeight: "${combo.hierarchy.body.weight}" }],
        "caption": ["${combo.hierarchy.caption.size}", { lineHeight: "${combo.hierarchy.caption.lineHeight}", fontWeight: "${combo.hierarchy.caption.weight}" }],
      },
    },
  },
};

export default config;`;
}

// Generate AI-friendly typography system description
export function generateAISystemPrompt(combo: ResolvedFontCombo): string {
  const { h1, h2, h3, body, caption } = combo.hierarchy;

  const getFont = (id: string) => fonts.find((f) => f.id === id);

  const h1Font = getFont(h1.fontId);
  const bodyFont = getFont(body.fontId);

  return `Use this typographic system:

Headings:
  ${h1Font?.name}, ${h1.weight} weight
  Used for H1–H3
  ${h1Font?.description || ""}

Body:
  ${bodyFont?.name}, ${body.weight} weight
  Used for paragraphs and UI
  ${bodyFont?.description || ""}

Tone:
  ${combo.vibeTags.slice(0, 3).join(", ")}
  ${combo.description}

Use this scale:
  H1 — ${h1.size} / ${h1.lineHeight}${h1.letterSpacing ? ` / ${h1.letterSpacing}` : ""}
  H2 — ${h2.size} / ${h2.lineHeight}${h2.letterSpacing ? ` / ${h2.letterSpacing}` : ""}
  H3 — ${h3.size} / ${h3.lineHeight}${h3.letterSpacing ? ` / ${h3.letterSpacing}` : ""}
  Body — ${body.size} / ${body.lineHeight}
  Caption — ${caption.size} / ${caption.lineHeight}`;
}

// Generate AI prompt for generating UI
export function generateAIUIPrompt(combo: ResolvedFontCombo): string {
  const { h1, h2, h3, body, caption } = combo.hierarchy;
  const getFont = (id: string) => fonts.find((f) => f.id === id);

  const h1Font = getFont(h1.fontId);
  const h2Font = getFont(h2.fontId);
  const h3Font = getFont(h3.fontId);
  const bodyFont = getFont(body.fontId);
  const captionFont = getFont(caption.fontId);

  return `When generating UI or HTML, use this typography system:

H1 — ${h1Font?.name} — ${h1.weight} — ${h1.size} — line-height ${h1.lineHeight}${h1.letterSpacing ? ` — letter-spacing ${h1.letterSpacing}` : ""}
H2 — ${h2Font?.name} — ${h2.weight} — ${h2.size} — line-height ${h2.lineHeight}${h2.letterSpacing ? ` — letter-spacing ${h2.letterSpacing}` : ""}
H3 — ${h3Font?.name} — ${h3.weight} — ${h3.size} — line-height ${h3.lineHeight}${h3.letterSpacing ? ` — letter-spacing ${h3.letterSpacing}` : ""}
Body — ${bodyFont?.name} — ${body.weight} — ${body.size} — line-height ${body.lineHeight}
Caption — ${captionFont?.name} — ${caption.weight} — ${caption.size} — line-height ${caption.lineHeight}

Headings should feel ${combo.vibeTags.slice(0, 2).join(" and ")}.
Body text should feel readable and ${bodyFont?.classification === "serif" ? "refined" : "modern"}.

Do NOT mix additional fonts.
Maintain consistent hierarchy throughout.`;
}
