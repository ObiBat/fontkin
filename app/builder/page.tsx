"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Copy, Check, RotateCcw, SlidersHorizontal, Code, Palette, Bot, Link2 } from "lucide-react";
import { fonts } from "@/lib/data/fonts";
import { fontIdToVariable } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type HierarchyLevel = "h1" | "h2" | "h3" | "body" | "caption";

interface TypeSettings {
  fontId: string;
  weight: number;
  size: number;
  lineHeight: number;
  letterSpacing: number;
}

interface CustomHierarchy {
  h1: TypeSettings;
  h2: TypeSettings;
  h3: TypeSettings;
  body: TypeSettings;
  caption: TypeSettings;
}

const defaultHierarchy: CustomHierarchy = {
  h1: { fontId: "playfair-display", weight: 700, size: 48, lineHeight: 1.1, letterSpacing: -0.02 },
  h2: { fontId: "playfair-display", weight: 600, size: 32, lineHeight: 1.2, letterSpacing: -0.01 },
  h3: { fontId: "playfair-display", weight: 600, size: 24, lineHeight: 1.3, letterSpacing: 0 },
  body: { fontId: "inter", weight: 400, size: 16, lineHeight: 1.7, letterSpacing: 0 },
  caption: { fontId: "inter", weight: 400, size: 14, lineHeight: 1.5, letterSpacing: 0 },
};

const levelLabels: Record<HierarchyLevel, string> = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  body: "Body",
  caption: "Caption",
};

const sampleTexts: Record<HierarchyLevel, string> = {
  h1: "The Art of Typography",
  h2: "Finding the perfect pairing",
  h3: "Balance and harmony in design",
  body: "Great typography is invisible. It seamlessly guides readers through content without calling attention to itself. The best font pairings create visual harmony while maintaining clear hierarchy.",
  caption: "Custom combination • Built with Fontkin",
};

// Organize fonts by category
const fontsByCategory = (() => {
  const categories: Record<string, typeof fonts> = {};
  fonts.forEach((font) => {
    const category = font.category || "Other";
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(font);
  });
  return categories;
})();

type ExportTab = "css" | "tailwind" | "google" | "ai";

export default function BuilderPage() {
  const [hierarchy, setHierarchy] = useState<CustomHierarchy>(defaultHierarchy);
  const [comboName, setComboName] = useState("My Custom Combo");
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<HierarchyLevel>("h1");
  const [activeExportTab, setActiveExportTab] = useState<ExportTab>("css");

  const updateLevel = useCallback((level: HierarchyLevel, updates: Partial<TypeSettings>) => {
    setHierarchy((prev) => ({
      ...prev,
      [level]: { ...prev[level], ...updates },
    }));
  }, []);

  const resetToDefaults = () => {
    setHierarchy(defaultHierarchy);
    setComboName("My Custom Combo");
  };

  // Get unique fonts used in hierarchy
  const getUniqueFonts = useCallback((h: CustomHierarchy) => {
    const fontIds = new Set<string>();
    Object.values(h).forEach((settings) => {
      fontIds.add(settings.fontId);
    });
    return Array.from(fontIds).map((id) => fonts.find((f) => f.id === id)!).filter(Boolean);
  }, []);

  // Generate Google Fonts URL - reads directly from current hierarchy
  const getGoogleFontsUrl = useCallback((h: CustomHierarchy, name: string) => {
    const uniqueFonts = getUniqueFonts(h);
    const fontParams = uniqueFonts.map((font) => {
      // Get all weights used for this font
      const weightsUsed = new Set<number>();
      Object.values(h).forEach((settings) => {
        if (settings.fontId === font.id) {
          weightsUsed.add(settings.weight);
        }
      });
      const weights = Array.from(weightsUsed).sort((a, b) => a - b);
      const fontName = font.name.replace(/ /g, "+");
      return `family=${fontName}:wght@${weights.join(";")}`;
    });

    return `<!-- ${name} - Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${fontParams.join("&")}&display=swap" rel="stylesheet">`;
  }, [getUniqueFonts]);

  // Generate CSS - reads directly from current hierarchy
  const getCSSExport = useCallback((h: CustomHierarchy, name: string) => {
    const lines: string[] = [];

    // CSS Custom Properties
    lines.push(`/* ${name} - CSS Variables */`);
    lines.push(`:root {`);

    const uniqueFonts = getUniqueFonts(h);
    uniqueFonts.forEach((font, i) => {
      const fallback = font.classification === "serif" ? "serif" : "sans-serif";
      lines.push(`  --font-${i === 0 ? 'heading' : 'body'}: "${font.name}", ${fallback};`);
    });

    Object.entries(h).forEach(([level, settings]) => {
      lines.push(`  --${level}-size: ${settings.size}px;`);
      lines.push(`  --${level}-weight: ${settings.weight};`);
      lines.push(`  --${level}-line-height: ${settings.lineHeight};`);
      if (settings.letterSpacing !== 0) {
        lines.push(`  --${level}-letter-spacing: ${settings.letterSpacing}em;`);
      }
    });
    lines.push(`}`);
    lines.push(``);

    // Class definitions
    lines.push(`/* Typography Classes */`);
    Object.entries(h).forEach(([level, settings]) => {
      const font = fonts.find((f) => f.id === settings.fontId);
      const fallback = font?.classification === "serif" ? "serif" : "sans-serif";
      lines.push(`.${level} {`);
      lines.push(`  font-family: "${font?.name}", ${fallback};`);
      lines.push(`  font-size: ${settings.size}px;`);
      lines.push(`  font-weight: ${settings.weight};`);
      lines.push(`  line-height: ${settings.lineHeight};`);
      if (settings.letterSpacing !== 0) {
        lines.push(`  letter-spacing: ${settings.letterSpacing}em;`);
      }
      lines.push(`}`);
      lines.push(``);
    });

    return lines.join("\n");
  }, [getUniqueFonts]);

  // Generate Tailwind config - reads directly from current hierarchy
  const getTailwindExport = useCallback((h: CustomHierarchy, name: string) => {
    const uniqueFonts = getUniqueFonts(h);

    const fontFamily: Record<string, string[]> = {};
    uniqueFonts.forEach((font, i) => {
      const key = i === 0 ? "heading" : "body";
      const fallback = font.classification === "serif" ? "serif" : "sans-serif";
      fontFamily[key] = [`"${font.name}"`, fallback];
    });

    const fontSize: Record<string, [string, { lineHeight: string; letterSpacing?: string; fontWeight: string }]> = {};
    Object.entries(h).forEach(([level, settings]) => {
      fontSize[level] = [
        `${settings.size}px`,
        {
          lineHeight: String(settings.lineHeight),
          fontWeight: String(settings.weight),
          ...(settings.letterSpacing !== 0 && { letterSpacing: `${settings.letterSpacing}em` }),
        },
      ];
    });

    const config = {
      theme: {
        extend: {
          fontFamily,
          fontSize,
        },
      },
    };

    return `// ${name} - Tailwind CSS Config
// Add to your tailwind.config.js

module.exports = ${JSON.stringify(config, null, 2)}

// Usage examples:
// <h1 className="font-heading text-h1">Headline</h1>
// <p className="font-body text-body">Paragraph text</p>`;
  }, [getUniqueFonts]);

  // Generate AI prompt - reads directly from current hierarchy
  const getAIPromptExport = useCallback((h: CustomHierarchy, name: string) => {
    const uniqueFonts = getUniqueFonts(h);

    let prompt = `# Typography System: "${name}"

## Fonts Used
`;

    uniqueFonts.forEach((font, i) => {
      const role = i === 0 ? "Primary (Headings)" : "Secondary (Body)";
      prompt += `
### ${font.name} - ${role}
- Classification: ${font.classification}
- Category: ${font.category}
${font.description ? `- Description: ${font.description}` : ""}
`;
    });

    prompt += `
## Complete Type Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
`;

    Object.entries(h).forEach(([level, settings]) => {
      const font = fonts.find((f) => f.id === settings.fontId);
      const spacing = settings.letterSpacing !== 0 ? `${settings.letterSpacing}em` : "normal";
      prompt += `| ${level.toUpperCase()} | ${font?.name} | ${settings.size}px | ${settings.weight} | ${settings.lineHeight} | ${spacing} |\n`;
    });

    prompt += `
## Design Guidelines

1. **Hierarchy**: Use size and weight contrast to establish clear visual hierarchy
2. **Consistency**: Apply these exact values across all UI components
3. **Readability**: Body text optimized for comfortable reading at ${h.body.size}px
4. **Responsive**: Scale proportionally for different screen sizes

## Implementation Notes

- All fonts available via Google Fonts
- Line heights are unitless ratios for flexibility
- Letter spacing in em units for proportional scaling
`;

    return prompt;
  }, [getUniqueFonts]);

  // Get current export content based on active tab
  const getCurrentExport = useCallback(() => {
    switch (activeExportTab) {
      case "css":
        return getCSSExport(hierarchy, comboName);
      case "tailwind":
        return getTailwindExport(hierarchy, comboName);
      case "google":
        return getGoogleFontsUrl(hierarchy, comboName);
      case "ai":
        return getAIPromptExport(hierarchy, comboName);
      default:
        return "";
    }
  }, [activeExportTab, hierarchy, comboName, getCSSExport, getTailwindExport, getGoogleFontsUrl, getAIPromptExport]);

  const copyToClipboard = async () => {
    const text = getCurrentExport();
    await navigator.clipboard.writeText(text);
    setCopiedFormat(activeExportTab);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const currentSettings = hierarchy[activeLevel];

  const exportTabs: { id: ExportTab; label: string; icon: React.ReactNode }[] = [
    { id: "css", label: "CSS", icon: <Code className="h-4 w-4" /> },
    { id: "tailwind", label: "Tailwind", icon: <Palette className="h-4 w-4" /> },
    { id: "google", label: "Google Fonts", icon: <Link2 className="h-4 w-4" /> },
    { id: "ai", label: "AI Prompt", icon: <Bot className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 text-sm text-caption hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-caption" />
                <h1 className="text-lg font-medium">Custom Combo Builder</h1>
              </div>
            </div>
            <button
              onClick={resetToDefaults}
              className="text-sm text-caption hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Combo Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-body">Combo Name</label>
              <input
                type="text"
                value={comboName}
                onChange={(e) => setComboName(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="My Custom Combo"
              />
            </div>

            {/* Level Tabs */}
            <div className="border rounded-lg overflow-hidden">
              <div className="flex border-b bg-muted/30 overflow-x-auto">
                {(Object.keys(levelLabels) as HierarchyLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setActiveLevel(level)}
                    className={cn(
                      "flex-1 min-w-[60px] px-3 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                      activeLevel === level
                        ? "bg-background text-foreground"
                        : "text-caption hover:text-foreground"
                    )}
                  >
                    {level.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Level Settings */}
              <div className="p-6 space-y-5">
                <h3 className="text-sm font-medium">{levelLabels[activeLevel]} Settings</h3>

                {/* Font Selection */}
                <div className="space-y-2">
                  <label className="text-xs text-caption uppercase tracking-wide">Font Family</label>
                  <select
                    value={currentSettings.fontId}
                    onChange={(e) => updateLevel(activeLevel, { fontId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  >
                    {Object.entries(fontsByCategory).map(([category, categoryFonts]) => (
                      <optgroup key={category} label={category}>
                        {categoryFonts.map((font) => (
                          <option key={font.id} value={font.id}>
                            {font.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Weight Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-xs text-caption uppercase tracking-wide">Weight</label>
                    <span className="text-xs font-mono text-body">{currentSettings.weight}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="900"
                    step="100"
                    value={currentSettings.weight}
                    onChange={(e) => updateLevel(activeLevel, { weight: parseInt(e.target.value) })}
                    className="w-full accent-foreground"
                  />
                </div>

                {/* Size Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-xs text-caption uppercase tracking-wide">Size</label>
                    <span className="text-xs font-mono text-body">{currentSettings.size}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="96"
                    step="1"
                    value={currentSettings.size}
                    onChange={(e) => updateLevel(activeLevel, { size: parseInt(e.target.value) })}
                    className="w-full accent-foreground"
                  />
                </div>

                {/* Line Height Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-xs text-caption uppercase tracking-wide">Line Height</label>
                    <span className="text-xs font-mono text-body">{currentSettings.lineHeight.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="2.5"
                    step="0.05"
                    value={currentSettings.lineHeight}
                    onChange={(e) => updateLevel(activeLevel, { lineHeight: parseFloat(e.target.value) })}
                    className="w-full accent-foreground"
                  />
                </div>

                {/* Letter Spacing Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-xs text-caption uppercase tracking-wide">Letter Spacing</label>
                    <span className="text-xs font-mono text-body">{currentSettings.letterSpacing.toFixed(3)}em</span>
                  </div>
                  <input
                    type="range"
                    min="-0.05"
                    max="0.1"
                    step="0.005"
                    value={currentSettings.letterSpacing}
                    onChange={(e) => updateLevel(activeLevel, { letterSpacing: parseFloat(e.target.value) })}
                    className="w-full accent-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Export Panel */}
            <div className="border rounded-lg overflow-hidden">
              <div className="flex border-b bg-muted/30 overflow-x-auto">
                {exportTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveExportTab(tab.id)}
                    className={cn(
                      "flex-1 min-w-[80px] px-3 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap",
                      activeExportTab === tab.id
                        ? "bg-background text-foreground"
                        : "text-caption hover:text-foreground"
                    )}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="relative">
                <pre className="p-4 text-xs font-mono overflow-x-auto max-h-[300px] overflow-y-auto bg-muted/20">
                  <code>{getCurrentExport()}</code>
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors"
                >
                  {copiedFormat === activeExportTab ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded-xl overflow-hidden bg-card"
            >
              <div className="px-6 py-4 border-b bg-muted/30">
                <h2 className="text-sm font-medium">Live Preview</h2>
                <p className="text-xs text-caption mt-0.5">{comboName}</p>
              </div>

              <div className="p-8 space-y-6">
                <AnimatePresence mode="wait">
                  {(Object.keys(hierarchy) as HierarchyLevel[]).map((level) => {
                    const settings = hierarchy[level];
                    const font = fonts.find((f) => f.id === settings.fontId);
                    const fontFamily = fontIdToVariable[settings.fontId] || `"${font?.name}", sans-serif`;

                    return (
                      <motion.div
                        key={`${level}-${settings.fontId}-${settings.weight}-${settings.size}`}
                        initial={{ opacity: 0.8 }}
                        animate={{
                          opacity: activeLevel === level ? 1 : 0.5,
                          scale: activeLevel === level ? 1 : 0.98,
                        }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                          "transition-all cursor-pointer rounded-lg p-3 -mx-3",
                          activeLevel === level ? "bg-muted/30" : "hover:bg-muted/20"
                        )}
                        onClick={() => setActiveLevel(level)}
                      >
                        <p
                          style={{
                            fontFamily,
                            fontWeight: settings.weight,
                            fontSize: `${settings.size}px`,
                            lineHeight: settings.lineHeight,
                            letterSpacing: `${settings.letterSpacing}em`,
                          }}
                          className={cn(
                            level === "body" && "text-body",
                            level === "caption" && "text-caption"
                          )}
                        >
                          {sampleTexts[level]}
                        </p>
                        <p className="text-[10px] text-caption mt-2 font-mono">
                          {level.toUpperCase()} • {font?.name} • {settings.weight} • {settings.size}px • LH {settings.lineHeight.toFixed(2)}
                        </p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Fonts Used Summary */}
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <h3 className="text-xs font-medium mb-3">Fonts Used</h3>
              <div className="space-y-2">
                {getUniqueFonts(hierarchy).map((font) => {
                  const levelsUsing = Object.entries(hierarchy)
                    .filter(([, s]) => s.fontId === font.id)
                    .map(([l]) => l.toUpperCase());
                  return (
                    <div key={font.id} className="flex items-center justify-between text-xs">
                      <span className="font-medium">{font.name}</span>
                      <span className="text-caption">{levelsUsing.join(", ")}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Settings Summary */}
            <div className="mt-4 p-4 border border-dashed rounded-lg">
              <h3 className="text-xs font-medium mb-3">All Settings</h3>
              <div className="space-y-1 text-[11px] font-mono text-caption">
                {Object.entries(hierarchy).map(([level, settings]) => {
                  const font = fonts.find((f) => f.id === settings.fontId);
                  return (
                    <div key={level} className="flex justify-between">
                      <span className="uppercase">{level}</span>
                      <span>{font?.name?.split(" ")[0]} {settings.weight} {settings.size}px</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
