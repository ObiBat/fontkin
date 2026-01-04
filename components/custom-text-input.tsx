"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Type, X, ChevronDown } from "lucide-react";
import { useCustomText } from "@/contexts/app-state";
import { CustomTextFields } from "@/contexts/app-state";
import { cn } from "@/lib/utils";

interface CustomTextInputProps {
  variant?: "inline" | "expanded";
  className?: string;
}

export function CustomTextInput({
  variant = "inline",
  className
}: CustomTextInputProps) {
  const { customText, setAllCustomText, clearCustomText, hasCustomText } = useCustomText();
  const [isExpanded, setIsExpanded] = useState(false);
  const [localValues, setLocalValues] = useState<CustomTextFields>(customText);

  // Sync local values with global state
  useEffect(() => {
    setLocalValues(customText);
  }, [customText]);

  const handleSubmit = () => {
    setAllCustomText(localValues);
    setIsExpanded(false);
  };

  const handleClear = () => {
    setLocalValues({ headline: "", subhead: "", body: "" });
    clearCustomText();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsExpanded(false);
      setLocalValues(customText);
    }
  };

  const updateField = (field: keyof CustomTextFields, value: string) => {
    setLocalValues(prev => ({ ...prev, [field]: value }));
  };

  const getPreviewText = () => {
    if (customText.headline) return customText.headline;
    if (customText.subhead) return customText.subhead;
    if (customText.body) return customText.body;
    return "";
  };

  if (variant === "expanded") {
    return (
      <div className={cn("w-full space-y-4", className)}>
        {/* Headline */}
        <div>
          <label className="text-xs uppercase tracking-wider text-caption mb-2 block">
            Headline
          </label>
          <input
            type="text"
            value={localValues.headline}
            onChange={(e) => updateField("headline", e.target.value)}
            onBlur={() => setAllCustomText(localValues)}
            placeholder="Your headline text..."
            maxLength={200}
            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm placeholder:text-caption/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all"
          />
        </div>

        {/* Subhead */}
        <div>
          <label className="text-xs uppercase tracking-wider text-caption mb-2 block">
            Subhead
          </label>
          <input
            type="text"
            value={localValues.subhead}
            onChange={(e) => updateField("subhead", e.target.value)}
            onBlur={() => setAllCustomText(localValues)}
            placeholder="Your subhead text..."
            maxLength={200}
            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm placeholder:text-caption/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all"
          />
        </div>

        {/* Body */}
        <div>
          <label className="text-xs uppercase tracking-wider text-caption mb-2 block">
            Body
          </label>
          <textarea
            value={localValues.body}
            onChange={(e) => updateField("body", e.target.value)}
            onBlur={() => setAllCustomText(localValues)}
            placeholder="Your body text..."
            maxLength={200}
            rows={3}
            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm placeholder:text-caption/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all resize-none"
          />
        </div>

        {hasCustomText && (
          <button
            onClick={handleClear}
            className="text-xs text-caption hover:text-foreground transition-colors"
          >
            Clear all custom text
          </button>
        )}
      </div>
    );
  }

  // Inline variant - collapsible dropdown
  return (
    <div className={cn("relative", className)}>
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 border rounded-xl text-sm transition-colors",
          hasCustomText
            ? "bg-foreground/5 border-foreground/20 text-foreground"
            : "border-border text-caption hover:border-foreground/20 hover:text-foreground"
        )}
        whileTap={{ scale: 0.98 }}
      >
        <Type className="h-4 w-4" />
        <span className="hidden sm:inline max-w-[120px] truncate">
          {hasCustomText ? getPreviewText() : "Try your text"}
        </span>
        <ChevronDown className={cn(
          "h-3 w-3 transition-transform",
          isExpanded && "rotate-180"
        )} />
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => {
                setIsExpanded(false);
                setLocalValues(customText);
              }}
            />
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed sm:absolute top-auto sm:top-full bottom-0 sm:bottom-auto left-0 sm:left-auto right-0 mt-0 sm:mt-2 w-full sm:w-[420px] bg-background border-t sm:border rounded-t-2xl sm:rounded-xl shadow-xl z-50 overflow-hidden"
              onKeyDown={handleKeyDown}
            >
              <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-caption">
                    Preview your text
                  </p>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="sm:hidden p-1 text-caption"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Headline input */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-caption/70 mb-1.5 block">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={localValues.headline}
                    onChange={(e) => updateField("headline", e.target.value)}
                    placeholder="Your headline..."
                    maxLength={200}
                    className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-lg text-base placeholder:text-caption/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all"
                  />
                </div>

                {/* Subhead input */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-caption/70 mb-1.5 block">
                    Subhead
                  </label>
                  <input
                    type="text"
                    value={localValues.subhead}
                    onChange={(e) => updateField("subhead", e.target.value)}
                    placeholder="Your subhead..."
                    maxLength={200}
                    className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-lg text-base placeholder:text-caption/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all"
                  />
                </div>

                {/* Body input */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-caption/70 mb-1.5 block">
                    Body
                  </label>
                  <textarea
                    value={localValues.body}
                    onChange={(e) => updateField("body", e.target.value)}
                    placeholder="Your body text..."
                    maxLength={200}
                    rows={2}
                    className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-lg text-base placeholder:text-caption/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    {hasCustomText && (
                      <button
                        onClick={handleClear}
                        className="px-3 py-2 text-xs text-caption hover:text-foreground transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="px-5 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compact version for showing in card headers
export function CustomTextBadge() {
  const { customText, hasCustomText, clearCustomText } = useCustomText();

  if (!hasCustomText) return null;

  const displayText = customText.headline || customText.subhead || customText.body;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 px-2.5 py-1 bg-foreground/5 border border-foreground/10 rounded-full text-xs"
    >
      <Type className="h-3 w-3 text-caption" />
      <span className="text-caption max-w-[100px] truncate">{displayText}</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          clearCustomText();
        }}
        className="text-caption hover:text-foreground transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </motion.div>
  );
}
