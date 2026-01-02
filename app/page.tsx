import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  getAllResolvedCombos,
  getCombosByTimelessness,
  getCombosByContext,
} from "@/lib/data/combos";
import { ComboCard, ComboHeroCard } from "@/components/combo-card";
import { UseCaseCarousel } from "@/components/use-case-carousel";
import { HeroFontShowcase } from "@/components/hero-font-showcase";
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

  // Curated selection for hero showcase - mix of styles
  const showcaseCombos = [
    "cabinet-grotesk-spectral",
    "space-grotesk-playfair",
    "general-sans-cormorant",
    "sora-fraunces",
    "jost-instrument-serif",
    "outfit-eb-garamond",
  ].map(id => allCombos.find(c => c.id === id)).filter(Boolean) as typeof allCombos;

  return (
    <div className="scroll-smooth">
      {/* Hero Section - Full Viewport */}
      <section className="snap-start min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-1 flex items-center max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8 md:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center w-full">
            {/* Left - Content */}
            <div className="text-center lg:text-left">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-caption mb-6 md:mb-8 animate-fade-in">
                The Professional Font Pairing Lab
              </p>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.9] md:leading-[0.85] mb-6 md:mb-8"
                style={{ fontFamily: fontIdToVariable["anton"] }}
              >
                <span className="block overflow-hidden">
                  <span className="block animate-slide-up [animation-duration:0.7s]">TYPOGRAPHY</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block text-caption/50 text-[0.6em] sm:text-[0.65em] tracking-[0.1em] sm:tracking-[0.15em] animate-slide-up [animation-duration:0.7s] delay-100">THAT SPEAKS</span>
                </span>
                <span className="block overflow-hidden mt-1">
                  <span className="block animate-slide-up [animation-duration:0.7s] delay-200">
                    <span className="bg-foreground text-background px-3 sm:px-4 py-1 inline-block animate-clip-reveal delay-400">VOLUMES</span>
                  </span>
                </span>
              </h1>
              <p
                className="text-sm sm:text-base md:text-lg text-body max-w-md mx-auto lg:mx-0 leading-[1.6] md:leading-[1.7] mb-8 md:mb-10 animate-slide-up delay-300"
                style={{ fontFamily: fontIdToVariable["space-grotesk"] }}
              >
                Curated font combinations for designers who understand that typography
                is not decoration. It&apos;s the voice of your design.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 animate-slide-up delay-200">
                <Link
                  href="/explore"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-[12px] uppercase tracking-[0.12em] bg-foreground text-background px-6 py-4 sm:py-3.5 hover:opacity-90 transition-opacity rounded-full active:scale-[0.98]"
                >
                  Explore {allCombos.length} Pairings
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/builder"
                  className="text-[12px] uppercase tracking-[0.12em] text-caption hover:text-foreground transition-colors hover-underline py-2"
                >
                  Build Custom
                </Link>
              </div>
            </div>

            {/* Right - Animated Font Showcase */}
            <div className="hidden lg:block">
              <HeroFontShowcase combos={showcaseCombos} />
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="pb-6 md:pb-8 flex justify-center">
          <ChevronDown className="h-5 w-5 text-caption/50 animate-bounce" />
        </div>
      </section>

      {/* Featured Section - Full Viewport */}
      <section className="snap-start min-h-[calc(100vh-4rem)] flex flex-col border-t">
        <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8 md:py-10">
          <div className="flex items-center justify-between mb-4 md:mb-6">
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
        <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8 md:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-caption block mb-2 md:mb-3">
                Curated Collections
              </span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide"
                style={{ fontFamily: fontIdToVariable["anton"] }}
              >
                Timeless Pairings
              </h2>
              <p className="text-sm sm:text-base text-body mt-2 md:mt-4 max-w-2xl">
                Proven combinations built on typefaces with decades of heritage.
              </p>
            </div>
            <Link
              href="/explore?timelessness=timeless"
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors flex items-center gap-2 self-start sm:self-auto"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex-1 flex items-center">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
              {timelessCombos.slice(0, 3).map((combo) => (
                <ComboCard key={combo.id} combo={combo} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section - Full Viewport */}
      <section className="snap-start min-h-[calc(100vh-5rem)] flex flex-col border-t bg-muted/30">
        <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8 md:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-caption block mb-2 md:mb-3">
                What&apos;s Current
              </span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide"
                style={{ fontFamily: fontIdToVariable["anton"] }}
              >
                Trending Now
              </h2>
              <p className="text-sm sm:text-base text-body mt-2 md:mt-4 max-w-2xl">
                Contemporary pairings gaining momentum in current design.
              </p>
            </div>
            <Link
              href="/explore?timelessness=trending"
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors flex items-center gap-2 self-start sm:self-auto"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex-1 flex items-center">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full">
              {trendingCombos.slice(0, 4).map((combo) => (
                <ComboCard key={combo.id} combo={combo} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases - Full Viewport Carousel */}
      <section className="snap-start min-h-[calc(100vh-5rem)] flex flex-col border-t">
        <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8 md:py-12">
          {/* Section Header */}
          <div className="mb-8 md:mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-caption block mb-2 md:mb-3">
              By Use Case
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide"
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
        <div className="flex-1 flex items-center max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-20 py-10 md:py-12">
          <div className="max-w-3xl w-full">
            <p className="text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-background/50 mb-6 md:mb-8">
              Ready to begin?
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] uppercase tracking-wide mb-6 md:mb-10 leading-[0.95] md:leading-[0.9]"
              style={{ fontFamily: fontIdToVariable["anton"] }}
            >
              Find the perfect
              <br />
              typographic voice
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-background/60 mb-10 md:mb-14 max-w-md leading-[1.6] md:leading-[1.7]">
              Browse all {allCombos.length} curated combinations with powerful filters
              for vibe, use case, and typography style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-3 text-[12px] sm:text-[13px] uppercase tracking-[0.12em] bg-background text-foreground px-6 sm:px-8 py-4 hover:opacity-90 transition-opacity rounded-full active:scale-[0.98]"
              >
                Explore All Combinations
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/builder"
                className="inline-flex items-center justify-center gap-3 text-[12px] sm:text-[13px] uppercase tracking-[0.12em] border border-background/30 px-6 sm:px-8 py-4 hover:border-background/60 transition-colors rounded-full active:scale-[0.98]"
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
