import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getComboBySlug, getAllResolvedCombos } from "@/lib/data/combos";
import { getSampleForCombo } from "@/lib/samples";
import { fontIdToVariable } from "@/lib/fonts";
import { fonts } from "@/lib/data/fonts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExportBlock } from "@/components/export-block";
import { CopyButton } from "@/components/copy-button";
import {
  generateGoogleFontsLink,
  generateCSSClasses,
  generateTailwindConfig,
  generateAISystemPrompt,
  generateAIUIPrompt,
} from "@/lib/export-utils";

interface ComboPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const combos = getAllResolvedCombos();
  return combos.map((combo) => ({ slug: combo.slug }));
}

export async function generateMetadata({ params }: ComboPageProps) {
  const { slug } = await params;
  const combo = getComboBySlug(slug);
  if (!combo) return { title: "Not Found" };
  return {
    title: `${combo.name} — Typographica`,
    description: combo.description,
  };
}

export default async function ComboPage({ params }: ComboPageProps) {
  const { slug } = await params;
  const combo = getComboBySlug(slug);

  if (!combo) notFound();

  const sample = getSampleForCombo(combo.id);
  const { hierarchy, primaryFont, secondaryFont } = combo;

  const googleFontsLink = generateGoogleFontsLink(combo);
  const cssClasses = generateCSSClasses(combo);
  const tailwindConfig = generateTailwindConfig(combo);
  const aiSystemPrompt = generateAISystemPrompt(combo);
  const aiUIPrompt = generateAIUIPrompt(combo);

  const getFont = (id: string) => fonts.find((f) => f.id === id);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="border-b">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm text-body hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </Link>
        </div>
      </div>

      {/* Hero Specimen */}
      <section className="border-b">
        <div className="max-w-[1600px] mx-auto">
          {/* Meta bar */}
          <div className="px-6 md:px-12 lg:px-20 py-6 border-b flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-caption">
                {combo.timelessness === "timeless"
                  ? "Timeless"
                  : combo.timelessness === "modern_classic"
                    ? "Modern Classic"
                    : "Trending"}
              </span>
              <span className="text-border">|</span>
              <span className="text-xs text-body">
                {primaryFont.classification}
                {primaryFont.id !== secondaryFont.id && ` + ${secondaryFont.classification}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {combo.vibeTags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 border rounded-full text-body capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Large type specimen */}
          <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24 lg:py-32">
            <div className="max-w-5xl">
              {/* Combo name */}
              <p className="text-sm text-body mb-8">{combo.name}</p>

              {/* Giant headline specimen */}
              <h1
                className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.9] mb-12"
                style={{
                  fontFamily: fontIdToVariable[hierarchy.h1.fontId],
                  fontWeight: hierarchy.h1.weight,
                  letterSpacing: hierarchy.h1.letterSpacing,
                }}
              >
                {sample.headline}
              </h1>

              {/* Subhead */}
              <p
                className="text-2xl md:text-3xl lg:text-4xl text-subhead max-w-3xl mb-16"
                style={{
                  fontFamily: fontIdToVariable[hierarchy.h2.fontId],
                  fontWeight: hierarchy.h2.weight,
                  lineHeight: 1.3,
                }}
              >
                {sample.subhead}
              </p>

              {/* Body specimen */}
              <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                <p
                  className="text-lg md:text-xl text-body leading-relaxed"
                  style={{
                    fontFamily: fontIdToVariable[hierarchy.body.fontId],
                    fontWeight: hierarchy.body.weight,
                    lineHeight: hierarchy.body.lineHeight,
                  }}
                >
                  {sample.body}
                </p>
                <div>
                  <p className="text-sm text-body mb-6">{combo.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {combo.usageContexts.map((ctx) => (
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
          </div>
        </div>
      </section>

      {/* Font Details */}
      <section className="border-b bg-muted/30">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-caption mb-12">
            Typefaces Used
          </h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            {/* Primary font */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs uppercase tracking-wider text-caption">Primary</span>
                <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded">
                  {primaryFont.classification}
                </span>
              </div>
              <h3
                className="text-4xl md:text-5xl mb-4"
                style={{
                  fontFamily: fontIdToVariable[primaryFont.id],
                  fontWeight: 600,
                }}
              >
                {primaryFont.name}
              </h3>
              <p className="text-body mb-6 leading-relaxed">
                {primaryFont.description}
              </p>
              <div className="text-sm text-caption space-y-1">
                {primaryFont.designer && <p>Designed by {primaryFont.designer}</p>}
                {primaryFont.yearReleased && <p>Released {primaryFont.yearReleased}</p>}
                <p>Available weights: {primaryFont.availableWeights.join(", ")}</p>
              </div>
            </div>

            {/* Secondary font */}
            {primaryFont.id !== secondaryFont.id && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs uppercase tracking-wider text-caption">Secondary</span>
                  <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded">
                    {secondaryFont.classification}
                  </span>
                </div>
                <h3
                  className="text-4xl md:text-5xl mb-4"
                  style={{
                    fontFamily: fontIdToVariable[secondaryFont.id],
                    fontWeight: 500,
                  }}
                >
                  {secondaryFont.name}
                </h3>
                <p className="text-body mb-6 leading-relaxed">
                  {secondaryFont.description}
                </p>
                <div className="text-sm text-caption space-y-1">
                  {secondaryFont.designer && <p>Designed by {secondaryFont.designer}</p>}
                  {secondaryFont.yearReleased && <p>Released {secondaryFont.yearReleased}</p>}
                  <p>Available weights: {secondaryFont.availableWeights.join(", ")}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Type Scale */}
      <section className="border-b">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-caption mb-12">
            Recommended Scale
          </h2>

          <div className="space-y-0">
            {[
              { level: "H1", entry: hierarchy.h1, sample: "Headline One" },
              { level: "H2", entry: hierarchy.h2, sample: "Headline Two" },
              { level: "H3", entry: hierarchy.h3, sample: "Headline Three" },
              { level: "Body", entry: hierarchy.body, sample: "Body text for paragraphs and long-form content." },
              { level: "Caption", entry: hierarchy.caption, sample: "Caption and metadata text" },
            ].map(({ level, entry, sample }) => {
              const font = getFont(entry.fontId);
              return (
                <div
                  key={level}
                  className="grid grid-cols-12 gap-4 py-8 border-t first:border-t-0 items-baseline"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="text-xs text-caption uppercase tracking-wider">
                      {level}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-7">
                    <p
                      style={{
                        fontFamily: fontIdToVariable[entry.fontId],
                        fontWeight: entry.weight,
                        fontSize: entry.size,
                        lineHeight: entry.lineHeight,
                        letterSpacing: entry.letterSpacing,
                      }}
                    >
                      {sample}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-4 text-right">
                    <p className="text-xs text-caption font-mono">
                      {font?.name} · {entry.weight} · {entry.size} · {entry.lineHeight}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Previews */}
      <section className="border-b bg-muted/20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-caption mb-12">
            In Context
          </h2>

          <Tabs defaultValue="editorial" className="space-y-8">
            <TabsList className="bg-transparent border-b rounded-none w-full justify-start p-0 h-auto">
              <TabsTrigger
                value="editorial"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3 text-body data-[state=active]:text-foreground"
              >
                Editorial
              </TabsTrigger>
              <TabsTrigger
                value="interface"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3 text-body data-[state=active]:text-foreground"
              >
                Interface
              </TabsTrigger>
              <TabsTrigger
                value="hero"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3 text-body data-[state=active]:text-foreground"
              >
                Hero
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editorial" className="mt-8">
              <div className="border bg-card p-8 md:p-12 lg:p-16 max-w-4xl">
                <div
                  className="text-xs uppercase tracking-[0.2em] text-caption mb-8"
                  style={{ fontFamily: fontIdToVariable[hierarchy.caption.fontId] }}
                >
                  Design Essay · 12 min read
                </div>
                <h3
                  className="text-4xl md:text-5xl tracking-tight mb-6"
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
                  className="text-xl text-subhead mb-10"
                  style={{
                    fontFamily: fontIdToVariable[hierarchy.h2.fontId],
                    fontWeight: hierarchy.h2.weight,
                    lineHeight: 1.4,
                  }}
                >
                  {sample.subhead}
                </p>
                <div className="space-y-6">
                  <p
                    className="text-lg text-body"
                    style={{
                      fontFamily: fontIdToVariable[hierarchy.body.fontId],
                      fontWeight: hierarchy.body.weight,
                      lineHeight: hierarchy.body.lineHeight,
                    }}
                  >
                    {sample.body}
                  </p>
                  {sample.pullQuote && (
                    <blockquote className="border-l-2 border-foreground/30 pl-8 my-10">
                      <p
                        className="text-2xl italic text-subhead"
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
                        — {sample.micro}
                      </cite>
                    </blockquote>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interface" className="mt-8">
              <div className="border bg-card overflow-hidden max-w-4xl">
                <div className="bg-muted/50 border-b px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-foreground/10" />
                    <div className="w-3 h-3 rounded-full bg-foreground/10" />
                    <div className="w-3 h-3 rounded-full bg-foreground/10" />
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="mb-10">
                    <h3
                      className="text-3xl tracking-tight mb-2"
                      style={{
                        fontFamily: fontIdToVariable[hierarchy.h1.fontId],
                        fontWeight: hierarchy.h1.weight,
                      }}
                    >
                      Dashboard Overview
                    </h3>
                    <p
                      className="text-body"
                      style={{
                        fontFamily: fontIdToVariable[hierarchy.body.fontId],
                        fontWeight: hierarchy.body.weight,
                      }}
                    >
                      Welcome back. Here&apos;s what&apos;s happening with your projects.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {["Active Users", "Revenue", "Conversion"].map((label, i) => (
                      <div key={label} className="border rounded-lg p-5 bg-muted/30">
                        <p
                          className="text-xs text-caption uppercase tracking-wider mb-2"
                          style={{ fontFamily: fontIdToVariable[hierarchy.caption.fontId] }}
                        >
                          {label}
                        </p>
                        <p
                          className="text-2xl"
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
              <div className="border bg-gradient-to-br from-muted/40 to-transparent p-12 md:p-20 lg:p-28 max-w-5xl">
                <h3
                  className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-8"
                  style={{
                    fontFamily: fontIdToVariable[hierarchy.h1.fontId],
                    fontWeight: hierarchy.h1.weight,
                    letterSpacing: hierarchy.h1.letterSpacing,
                  }}
                >
                  {sample.headline}
                </h3>
                <p
                  className="text-xl md:text-2xl text-subhead max-w-2xl mb-10"
                  style={{
                    fontFamily: fontIdToVariable[hierarchy.h2.fontId],
                    fontWeight: hierarchy.h2.weight,
                    lineHeight: 1.4,
                  }}
                >
                  {sample.subhead}
                </p>
                <button
                  className="px-8 py-4 bg-foreground text-background rounded text-sm font-medium"
                  style={{ fontFamily: fontIdToVariable[hierarchy.body.fontId] }}
                >
                  Get Started
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Developer Exports */}
      <section className="border-b">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-caption mb-12">
            Developer Exports
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {googleFontsLink && (
              <ExportBlock title="Google Fonts" code={googleFontsLink} language="html" />
            )}
            <ExportBlock title="CSS" code={cssClasses} language="css" />
            <div className="lg:col-span-2">
              <ExportBlock title="Tailwind Config" code={tailwindConfig} language="typescript" />
            </div>
          </div>
        </div>
      </section>

      {/* AI Exports */}
      <section className="bg-foreground text-background">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16">
          <div className="mb-12">
            <h2 className="text-xs uppercase tracking-[0.2em] text-background/60 mb-4">
              AI-Ready Exports
            </h2>
            <p className="text-background/80 max-w-2xl">
              Copy these structured prompts to brief AI tools on your typography system.
              Paste directly into ChatGPT, Claude, or any LLM.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-background/10 border border-background/20 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-background/20 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-background">System Description</h3>
                  <p className="text-xs text-background/60 mt-1">Explain this type system to an AI</p>
                </div>
                <CopyButton text={aiSystemPrompt} label="Copy" variant="ghost" className="text-background hover:text-background hover:bg-background/10" />
              </div>
              <pre className="p-6 text-sm text-background/80 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                {aiSystemPrompt}
              </pre>
            </div>

            <div className="bg-background/10 border border-background/20 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-background/20 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-background">UI Generation Prompt</h3>
                  <p className="text-xs text-background/60 mt-1">Use when asking AI to generate code</p>
                </div>
                <CopyButton text={aiUIPrompt} label="Copy" variant="ghost" className="text-background hover:text-background hover:bg-background/10" />
              </div>
              <pre className="p-6 text-sm text-background/80 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                {aiUIPrompt}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
