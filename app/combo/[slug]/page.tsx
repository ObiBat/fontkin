import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getComboBySlug, getAllResolvedCombos } from "@/lib/data/combos";
import { BackButton } from "@/components/back-button";
import { getSampleForCombo } from "@/lib/samples";
import { fontIdToVariable } from "@/lib/fonts";
import { fonts } from "@/lib/data/fonts";
import { ExportBlock } from "@/components/export-block";
import { CopyButton } from "@/components/copy-button";
import { ComboSpecimen, LivePreviews } from "@/components/combo-specimen";
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
    title: `${combo.name} | Fontkin`,
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
    <div className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <div className="border-b">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-4">
          <Suspense fallback={<span className="text-sm text-body">Back</span>}>
            <BackButton />
          </Suspense>
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

          {/* Large type specimen - Client component for custom text support */}
          <ComboSpecimen
            hierarchy={hierarchy}
            sample={sample}
            comboName={combo.name}
            description={combo.description}
            usageContexts={combo.usageContexts}
          />
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

          <LivePreviews hierarchy={hierarchy} sample={sample} />
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
