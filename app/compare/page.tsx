"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, ArrowLeft, GitCompare } from "lucide-react";
import { getAllResolvedCombos } from "@/lib/data/combos";
import { useComparison } from "@/contexts/app-state";
import { fontIdToVariable } from "@/lib/fonts";
import { getSampleForCombo } from "@/lib/samples";
import { ResolvedFontCombo } from "@/lib/types";

export default function ComparePage() {
  const allCombos = useMemo(() => getAllResolvedCombos(), []);
  const { compareIds, removeFromCompare, clearCompare } = useComparison();

  const selectedCombos = useMemo(() => {
    return compareIds
      .map((id) => allCombos.find((c) => c.id === id))
      .filter((c): c is ResolvedFontCombo => c !== undefined);
  }, [compareIds, allCombos]);

  if (selectedCombos.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm text-caption hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </Link>

          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
              <GitCompare className="h-8 w-8 text-caption" />
            </div>
            <h1 className="text-2xl font-medium mb-4">No combos to compare</h1>
            <p className="text-body mb-8 max-w-md mx-auto">
              Add font combinations to compare by clicking the compare icon on any card in the explore page.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm rounded-md hover:bg-foreground/90 transition-colors"
            >
              Explore Combinations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-8">
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
              <h1 className="text-lg font-medium">
                Comparing {selectedCombos.length} combinations
              </h1>
            </div>
            {selectedCombos.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-sm text-caption hover:text-foreground transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${Math.min(selectedCombos.length, 3)}, 1fr)`,
          }}
        >
          {selectedCombos.map((combo, index) => (
            <CompareColumn
              key={combo.id}
              combo={combo}
              index={index}
              onRemove={() => removeFromCompare(combo.id)}
            />
          ))}
        </div>
      </div>

      {/* Type Scale Comparison */}
      <div className="border-t">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-12">
          <h2 className="text-xl font-medium mb-8">Type Scale Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 pr-4 font-medium text-caption">Level</th>
                  {selectedCombos.map((combo) => (
                    <th key={combo.id} className="text-left py-3 px-4 font-medium">
                      {combo.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(["h1", "h2", "h3", "body", "caption"] as const).map((level) => (
                  <tr key={level} className="border-b">
                    <td className="py-3 pr-4 font-mono text-caption uppercase">{level}</td>
                    {selectedCombos.map((combo) => {
                      const entry = combo.hierarchy[level];
                      const font = combo.primaryFont.id === entry.fontId
                        ? combo.primaryFont
                        : combo.secondaryFont;
                      return (
                        <td key={combo.id} className="py-3 px-4">
                          <div className="space-y-1">
                            <p className="text-body">{font.name}</p>
                            <p className="text-caption font-mono">
                              {entry.weight} · {entry.size} · {entry.lineHeight}
                            </p>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareColumn({
  combo,
  index,
  onRemove,
}: {
  combo: ResolvedFontCombo;
  index: number;
  onRemove: () => void;
}) {
  const sample = getSampleForCombo(combo.id);
  const { hierarchy, primaryFont, secondaryFont } = combo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="border border-border rounded-lg overflow-hidden bg-card"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b bg-muted/30 flex items-center justify-between">
        <div>
          <Link
            href={`/combo/${combo.slug}`}
            className="font-medium hover:underline underline-offset-4"
          >
            {combo.name}
          </Link>
          <p className="text-sm text-caption mt-0.5">
            {primaryFont.name} + {secondaryFont.name}
          </p>
        </div>
        <button
          onClick={onRemove}
          className="p-2 rounded-full text-caption hover:text-foreground hover:bg-muted transition-colors"
          title="Remove from comparison"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Specimen */}
      <div className="p-6 space-y-4">
        <h3
          className="text-2xl tracking-tight"
          style={{
            fontFamily: fontIdToVariable[hierarchy.h1.fontId],
            fontWeight: hierarchy.h1.weight,
            lineHeight: hierarchy.h1.lineHeight,
            letterSpacing: hierarchy.h1.letterSpacing,
          }}
        >
          {sample.headline}
        </h3>
        <p
          className="text-base text-subhead"
          style={{
            fontFamily: fontIdToVariable[hierarchy.h2.fontId],
            fontWeight: hierarchy.h2.weight,
            lineHeight: hierarchy.h2.lineHeight,
          }}
        >
          {sample.subhead}
        </p>
        <p
          className="text-sm text-body"
          style={{
            fontFamily: fontIdToVariable[hierarchy.body.fontId],
            fontWeight: hierarchy.body.weight,
            lineHeight: hierarchy.body.lineHeight,
          }}
        >
          {sample.body}
        </p>
      </div>

      {/* Meta */}
      <div className="px-6 py-4 border-t bg-muted/20">
        <div className="flex flex-wrap gap-1.5">
          {combo.vibeTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-foreground/5 text-body capitalize"
            >
              {tag}
            </span>
          ))}
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground/5 text-caption">
            {combo.timelessness.replace("_", " ")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
