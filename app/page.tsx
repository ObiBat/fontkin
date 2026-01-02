import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  getAllResolvedCombos,
  getCombosByTimelessness,
  getCombosByContext,
} from "@/lib/data/combos";
import { ComboCard, ComboHeroCard } from "@/components/combo-card";
import { UseCaseCarousel } from "@/components/use-case-carousel";
import { fontIdToVariable } from "@/lib/fonts";

export default function HomePage() {
  const allCombos = getAllResolvedCombos();
  const timelessCombos = getCombosByTimelessness("timeless");
  const trendingCombos = getCombosByTimelessness("trending");

  // Helper to prioritize specific combos at the front
  const prioritizeCombos = (combos: typeof allCombos, priorityIds: string[]) => {
    const prioritized = priorityIds
      .map(id => combos.find(c => c.id === id))
      .filter(Boolean) as typeof allCombos;
    const rest = combos.filter(c => !priorityIds.includes(c.id));
    return [...prioritized, ...rest];
  };

  // All use case categories for carousel - featuring new avant-garde pairings
  const useCaseCategories = [
    {
      id: "editorial",
      number: "01",
      title: "Editorial & Publishing",
      description: "Long-form reading experiences",
      href: "/explore?context=editorial",
      combos: prioritizeCombos(getCombosByContext("editorial"), ["cabinet-grotesk-spectral", "space-grotesk-playfair"]),
    },
    {
      id: "saas-ui",
      number: "02",
      title: "Product & Interface",
      description: "SaaS, apps & dashboards",
      href: "/explore?context=saas-ui",
      combos: prioritizeCombos(getCombosByContext("saas-ui"), ["plus-jakarta-libre-baskerville", "sora-fira-code"]),
    },
    {
      id: "branding",
      number: "03",
      title: "Branding & Identity",
      description: "Logos, marketing & brand assets",
      href: "/explore?context=branding",
      combos: prioritizeCombos(getCombosByContext("branding"), ["general-sans-cormorant", "jost-instrument-serif"]),
    },
    {
      id: "portfolio",
      number: "04",
      title: "Portfolio & Creative",
      description: "Personal sites & showcases",
      href: "/explore?context=portfolio",
      combos: prioritizeCombos(getCombosByContext("portfolio"), ["outfit-eb-garamond", "sora-fraunces"]),
    },
    {
      id: "landing-page",
      number: "05",
      title: "Landing Pages",
      description: "Marketing & conversion focused",
      href: "/explore?context=landing-page",
      combos: prioritizeCombos(getCombosByContext("landing-page"), ["figtree-literata", "space-grotesk-playfair"]),
    },
    {
      id: "ecommerce",
      number: "06",
      title: "E-Commerce",
      description: "Online stores & marketplaces",
      href: "/explore?context=ecommerce",
      combos: prioritizeCombos(getCombosByContext("ecommerce"), ["general-sans-cormorant", "sora-fraunces"]),
    },
  ].filter(cat => cat.combos.length > 0);

  // Featured combo for hero
  const featuredCombo = allCombos.find((c) => c.id === "cabinet-grotesk-spectral") || allCombos[0];

  return (
    <div className="scroll-smooth">
      {/* Hero Section - Full Viewport */}
      <section className="snap-start min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-1 flex items-center max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-20 py-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            {/* Left - Content */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-caption mb-8 animate-fade-in">
                The Professional Font Pairing Lab
              </p>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.85] mb-8"
                style={{ fontFamily: fontIdToVariable["anton"] }}
              >
                <span className="block overflow-hidden">
                  <span className="block animate-slide-up [animation-duration:0.7s]">TYPOGRAPHY</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block text-caption/50 text-[0.65em] tracking-[0.15em] animate-slide-up [animation-duration:0.7s] delay-100">THAT SPEAKS</span>
                </span>
                <span className="block overflow-hidden mt-1">
                  <span className="block animate-slide-up [animation-duration:0.7s] delay-200">
                    <span className="bg-foreground text-background px-4 py-1 inline-block animate-clip-reveal delay-400">VOLUMES</span>
                  </span>
                </span>
              </h1>
              <p
                className="text-base md:text-lg text-body max-w-md leading-[1.7] mb-10 animate-slide-up delay-300"
                style={{ fontFamily: fontIdToVariable["space-grotesk"] }}
              >
                Curated font combinations for designers who understand that typography
                is not decoration. It&apos;s the voice of your design.
              </p>
              <div className="flex items-center gap-6 animate-slide-up delay-200">
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.12em] bg-foreground text-background px-6 py-3.5 hover:opacity-90 transition-opacity rounded-full"
                >
                  Explore {allCombos.length} Pairings
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/builder"
                  className="text-[12px] uppercase tracking-[0.12em] text-caption hover:text-foreground transition-colors hover-underline"
                >
                  Build Custom
                </Link>
              </div>
            </div>

            {/* Right - Preview Cards */}
            <div className="hidden lg:block relative">
              <div className="space-y-4">
                {trendingCombos.slice(0, 3).map((combo, i) => (
                  <Link
                    key={combo.id}
                    href={`/combo/${combo.slug}`}
                    className="block p-6 bg-card border rounded-2xl hover:border-foreground/20 transition-all duration-300 animate-slide-up group"
                    style={{ animationDelay: `${300 + i * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase tracking-wider text-caption">
                        {combo.vibeTags[0]}
                      </span>
                      <ArrowRight className="h-3 w-3 text-caption group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p
                      className="text-2xl md:text-3xl leading-tight mb-2"
                      style={{ fontFamily: fontIdToVariable[combo.hierarchy.h1.fontId] }}
                    >
                      {combo.name.split(" + ")[0]}
                    </p>
                    <p
                      className="text-sm text-body"
                      style={{ fontFamily: fontIdToVariable[combo.hierarchy.body.fontId] }}
                    >
                      Paired with {combo.secondaryFont.name}
                    </p>
                  </Link>
                ))}
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-foreground/[0.02] to-transparent rounded-full blur-3xl" />
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="pb-8 flex justify-center">
          <ChevronDown className="h-5 w-5 text-caption/50 animate-bounce" />
        </div>
      </section>

      {/* Featured Section - Full Viewport */}
      <section className="snap-start min-h-[calc(100vh-4rem)] flex flex-col border-t">
        <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-20 py-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-caption">
              Featured Pairing
            </span>
            <Link
              href="/explore"
              className="text-[11px] uppercase tracking-[0.15em] text-caption hover:text-foreground flex items-center gap-2 transition-colors hover-underline"
            >
              Explore All
            </Link>
          </div>
          <div className="flex-1 flex items-center">
            <div className="w-full">
              <ComboHeroCard combo={featuredCombo} />
            </div>
          </div>
        </div>
      </section>

      {/* Timeless Collections - Full Viewport */}
      <section className="snap-start min-h-[calc(100vh-5rem)] flex flex-col border-t">
        <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-20 py-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-caption block mb-3">
                Curated Collections
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide"
                style={{ fontFamily: fontIdToVariable["anton"] }}
              >
                Timeless Pairings
              </h2>
              <p className="text-body mt-4 max-w-2xl">
                Proven combinations built on typefaces with decades of heritage.
              </p>
            </div>
            <Link
              href="/explore?timelessness=timeless"
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors hidden md:flex items-center gap-2"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex-1 flex items-center">
            <div className="grid md:grid-cols-3 gap-6 w-full">
              {timelessCombos.slice(0, 3).map((combo) => (
                <ComboCard key={combo.id} combo={combo} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section - Full Viewport */}
      <section className="snap-start min-h-[calc(100vh-5rem)] flex flex-col border-t bg-muted/30">
        <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-20 py-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-caption block mb-3">
                What&apos;s Current
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide"
                style={{ fontFamily: fontIdToVariable["anton"] }}
              >
                Trending Now
              </h2>
              <p className="text-body mt-4 max-w-2xl">
                Contemporary pairings gaining momentum in current design.
              </p>
            </div>
            <Link
              href="/explore?timelessness=trending"
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors hidden md:flex items-center gap-2"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex-1 flex items-center">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {trendingCombos.slice(0, 4).map((combo) => (
                <ComboCard key={combo.id} combo={combo} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases - Full Viewport Carousel */}
      <section className="snap-start min-h-[calc(100vh-5rem)] flex flex-col border-t">
        <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-20 py-12">
          {/* Section Header */}
          <div className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-caption block mb-3">
              By Use Case
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide"
              style={{ fontFamily: fontIdToVariable["anton"] }}
            >
              Built for Purpose
            </h2>
          </div>

          {/* Carousel */}
          <div className="flex-1">
            <UseCaseCarousel categories={useCaseCategories} />
          </div>
        </div>
      </section>

      {/* CTA Section - Full Viewport */}
      <section className="snap-start min-h-[calc(100vh-4rem)] flex flex-col bg-foreground text-background">
        <div className="flex-1 flex items-center max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.25em] text-background/50 mb-8">
              Ready to begin?
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-[4.5rem] uppercase tracking-wide mb-10 leading-[0.9]"
              style={{ fontFamily: fontIdToVariable["anton"] }}
            >
              Find the perfect
              <br />
              typographic voice
            </h2>
            <p className="text-lg md:text-xl text-background/60 mb-14 max-w-md leading-[1.7]">
              Browse all {allCombos.length} curated combinations with powerful filters
              for vibe, use case, and typography style.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-3 text-[13px] uppercase tracking-[0.12em] bg-background text-foreground px-8 py-4 hover:opacity-90 transition-opacity rounded-full"
              >
                Explore All Combinations
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/builder"
                className="inline-flex items-center justify-center gap-3 text-[13px] uppercase tracking-[0.12em] border border-background/30 px-8 py-4 hover:border-background/60 transition-colors rounded-full"
              >
                Build Custom Combo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
