import { ResolvedFontCombo } from "@/lib/types";
import { fontIdToVariable } from "@/lib/fonts";

interface ComboPreviewHeroProps {
  combo: ResolvedFontCombo;
}

export function ComboPreviewHero({ combo }: ComboPreviewHeroProps) {
  const { hierarchy } = combo;

  const getStyle = (fontId: string, weight: number, size?: string, lineHeight?: number, letterSpacing?: string) => ({
    fontFamily: fontIdToVariable[fontId],
    fontWeight: weight,
    fontSize: size,
    lineHeight: lineHeight,
    letterSpacing: letterSpacing,
  });

  return (
    <div className="border rounded-xl bg-gradient-to-br from-background to-muted/30 p-8 md:p-12 space-y-6">
      <h2
        style={getStyle(
          hierarchy.h1.fontId,
          hierarchy.h1.weight,
          "clamp(2.5rem, 5vw, 3.5rem)",
          hierarchy.h1.lineHeight,
          hierarchy.h1.letterSpacing
        )}
      >
        The Art of Typography
      </h2>

      <p
        className="text-muted-foreground"
        style={getStyle(
          hierarchy.h2.fontId,
          hierarchy.h2.weight,
          "clamp(1.25rem, 2.5vw, 1.5rem)",
          hierarchy.h2.lineHeight,
          hierarchy.h2.letterSpacing
        )}
      >
        Where form meets function in digital design
      </p>

      <div className="max-w-2xl">
        <p
          className="text-muted-foreground/90"
          style={getStyle(
            hierarchy.body.fontId,
            hierarchy.body.weight,
            hierarchy.body.size,
            hierarchy.body.lineHeight
          )}
        >
          Typography is the art and technique of arranging type to make written
          language legible, readable, and visually appealing. The arrangement
          of type involves selecting typefaces, point sizes, line lengths, and
          letter-spacing, creating hierarchy through contrast and whitespace.
        </p>
      </div>

      <button
        className="mt-4 px-6 py-3 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition-colors"
        style={{ fontFamily: fontIdToVariable[hierarchy.body.fontId] }}
      >
        Get Started
      </button>
    </div>
  );
}
