"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomTextInput } from "@/components/custom-text-input";
import { useCustomText } from "@/contexts/app-state";
import { fontIdToVariable } from "@/lib/fonts";
import { TypeHierarchy } from "@/lib/types";
import { ComboSample } from "@/lib/samples";

interface ComboSpecimenProps {
  hierarchy: TypeHierarchy;
  sample: ComboSample;
  comboName: string;
  description: string;
  usageContexts: string[];
}

export function ComboSpecimen({
  hierarchy,
  sample,
  comboName,
  description,
  usageContexts
}: ComboSpecimenProps) {
  const { customText, hasCustomText } = useCustomText();

  // Use custom text if available, falling back to sample
  const displayHeadline = customText.headline || sample.headline;
  const displaySubhead = customText.subhead || sample.subhead;
  const displayBody = customText.body || sample.body;

  return (
    <>
      {/* Custom Text Input Bar */}
      <div className="px-6 md:px-12 lg:px-20 py-4 border-b bg-muted/20">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-caption">
            {hasCustomText ? "Previewing your text" : "Try your own text"}
          </p>
          <CustomTextInput variant="inline" />
        </div>
      </div>

      {/* Large type specimen */}
      <div className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="max-w-4xl">
          {/* Combo name */}
          <p className="text-sm text-body mb-8">{comboName}</p>

          {/* Giant headline specimen */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.9] mb-12"
            style={{
              fontFamily: fontIdToVariable[hierarchy.h1.fontId],
              fontWeight: hierarchy.h1.weight,
              letterSpacing: hierarchy.h1.letterSpacing,
            }}
          >
            {displayHeadline}
          </h1>

          {/* Subhead */}
          {displaySubhead && (
            <p
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-subhead max-w-3xl mb-16"
              style={{
                fontFamily: fontIdToVariable[hierarchy.h2.fontId],
                fontWeight: hierarchy.h2.weight,
                lineHeight: 1.3,
              }}
            >
              {displaySubhead}
            </p>
          )}

          {/* Body specimen */}
          <p
            className="text-base sm:text-lg md:text-xl text-body leading-relaxed max-w-xl"
            style={{
              fontFamily: fontIdToVariable[hierarchy.body.fontId],
              fontWeight: hierarchy.body.weight,
              lineHeight: hierarchy.body.lineHeight,
            }}
          >
            {displayBody}
          </p>
        </div>

        {/* Description sidebar - far right */}
        <div className="hidden lg:block absolute right-6 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 w-64 pl-8 border-l border-border/40">
          <p className="text-sm text-body mb-6 leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-2">
            {usageContexts.map((ctx) => (
              <span
                key={ctx}
                className="text-xs px-3 py-1.5 bg-muted text-body rounded capitalize"
              >
                {ctx.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Mobile description - shown below on smaller screens */}
      <div className="lg:hidden border-t">
        <div className="px-6 md:px-12 py-10 md:py-12">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.15em] text-caption mb-4">About this pairing</p>
            <p className="text-sm text-body mb-6 leading-relaxed">{description}</p>
            <div className="flex flex-wrap gap-2">
              {usageContexts.map((ctx) => (
                <span
                  key={ctx}
                  className="text-xs px-3 py-1.5 bg-muted text-body rounded capitalize"
                >
                  {ctx.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface LivePreviewsProps {
  hierarchy: TypeHierarchy;
  sample: ComboSample;
}

export function LivePreviews({ hierarchy, sample }: LivePreviewsProps) {
  const { customText, hasCustomText } = useCustomText();

  // Use custom text if available, falling back to sample
  const displayHeadline = customText.headline || sample.headline;
  const displaySubhead = customText.subhead || sample.subhead;
  const displayBody = customText.body || sample.body;

  return (
    <Tabs defaultValue="editorial" className="space-y-8">
      <TabsList className="bg-transparent border-b rounded-none w-full justify-start p-0 h-auto overflow-x-auto">
        <TabsTrigger
          value="editorial"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 sm:px-6 py-3 text-body data-[state=active]:text-foreground text-sm"
        >
          Editorial
        </TabsTrigger>
        <TabsTrigger
          value="interface"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 sm:px-6 py-3 text-body data-[state=active]:text-foreground text-sm"
        >
          Interface
        </TabsTrigger>
        <TabsTrigger
          value="hero"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 sm:px-6 py-3 text-body data-[state=active]:text-foreground text-sm"
        >
          Hero
        </TabsTrigger>
      </TabsList>

      <TabsContent value="editorial" className="mt-8">
        <div className="border bg-card p-6 sm:p-8 md:p-12 lg:p-16 max-w-4xl rounded-xl">
          <div
            className="text-xs uppercase tracking-[0.2em] text-caption mb-8"
            style={{ fontFamily: fontIdToVariable[hierarchy.caption.fontId] }}
          >
            Design Essay · 12 min read
          </div>
          <h3
            className="text-3xl sm:text-4xl md:text-5xl tracking-tight mb-6"
            style={{
              fontFamily: fontIdToVariable[hierarchy.h1.fontId],
              fontWeight: hierarchy.h1.weight,
              lineHeight: hierarchy.h1.lineHeight,
              letterSpacing: hierarchy.h1.letterSpacing,
            }}
          >
            {displayHeadline}
          </h3>
          {displaySubhead && (
            <p
              className="text-lg sm:text-xl text-subhead mb-10"
              style={{
                fontFamily: fontIdToVariable[hierarchy.h2.fontId],
                fontWeight: hierarchy.h2.weight,
                lineHeight: 1.4,
              }}
            >
              {displaySubhead}
            </p>
          )}
          <div className="space-y-6">
            <p
              className="text-base sm:text-lg text-body"
              style={{
                fontFamily: fontIdToVariable[hierarchy.body.fontId],
                fontWeight: hierarchy.body.weight,
                lineHeight: hierarchy.body.lineHeight,
              }}
            >
              {displayBody}
            </p>
            {!hasCustomText && sample.pullQuote && (
              <blockquote className="border-l-2 border-foreground/30 pl-6 sm:pl-8 my-10">
                <p
                  className="text-xl sm:text-2xl italic text-subhead"
                  style={{
                    fontFamily: fontIdToVariable[hierarchy.h2.fontId],
                    fontWeight: 400,
                    lineHeight: 1.4,
                  }}
                >
                  &ldquo;{sample.pullQuote}&rdquo;
                </p>
                <cite
                  className="text-sm text-caption not-italic mt-4 block"
                  style={{ fontFamily: fontIdToVariable[hierarchy.caption.fontId] }}
                >
                  {sample.micro}
                </cite>
              </blockquote>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="interface" className="mt-8">
        <div className="border bg-card overflow-hidden max-w-4xl rounded-xl">
          <div className="bg-muted/50 border-b px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-foreground/10" />
              <div className="w-3 h-3 rounded-full bg-foreground/10" />
              <div className="w-3 h-3 rounded-full bg-foreground/10" />
            </div>
          </div>
          <div className="p-6 sm:p-8 md:p-12">
            <div className="mb-10">
              <h3
                className="text-2xl sm:text-3xl tracking-tight mb-2"
                style={{
                  fontFamily: fontIdToVariable[hierarchy.h1.fontId],
                  fontWeight: hierarchy.h1.weight,
                }}
              >
                {customText.headline || "Dashboard Overview"}
              </h3>
              <p
                className="text-body"
                style={{
                  fontFamily: fontIdToVariable[hierarchy.body.fontId],
                  fontWeight: hierarchy.body.weight,
                }}
              >
                {customText.body || "Welcome back. Here's what's happening with your projects."}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {["Active Users", "Revenue", "Conversion"].map((label, i) => (
                <div key={label} className="border rounded-lg p-4 sm:p-5 bg-muted/30">
                  <p
                    className="text-xs text-caption uppercase tracking-wider mb-2"
                    style={{ fontFamily: fontIdToVariable[hierarchy.caption.fontId] }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-xl sm:text-2xl"
                    style={{
                      fontFamily: fontIdToVariable[hierarchy.h2.fontId],
                      fontWeight: hierarchy.h2.weight,
                    }}
                  >
                    {["12,847", "$48.2k", "3.2%"][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="hero" className="mt-8">
        <div className="border bg-gradient-to-br from-muted/40 to-transparent p-8 sm:p-12 md:p-20 lg:p-28 max-w-5xl rounded-xl">
          <h3
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-8"
            style={{
              fontFamily: fontIdToVariable[hierarchy.h1.fontId],
              fontWeight: hierarchy.h1.weight,
              letterSpacing: hierarchy.h1.letterSpacing,
            }}
          >
            {displayHeadline}
          </h3>
          {displaySubhead && (
            <p
              className="text-lg sm:text-xl md:text-2xl text-subhead max-w-2xl mb-10"
              style={{
                fontFamily: fontIdToVariable[hierarchy.h2.fontId],
                fontWeight: hierarchy.h2.weight,
                lineHeight: 1.4,
              }}
            >
              {displaySubhead}
            </p>
          )}
          <button
            className="px-6 sm:px-8 py-3 sm:py-4 bg-foreground text-background rounded text-sm font-medium"
            style={{ fontFamily: fontIdToVariable[hierarchy.body.fontId] }}
          >
            Get Started
          </button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
