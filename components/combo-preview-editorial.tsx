import { ResolvedFontCombo } from "@/lib/types";
import { fontIdToVariable } from "@/lib/fonts";

interface ComboPreviewEditorialProps {
  combo: ResolvedFontCombo;
}

export function ComboPreviewEditorial({ combo }: ComboPreviewEditorialProps) {
  const { hierarchy } = combo;

  const getStyle = (fontId: string, weight: number, extra?: React.CSSProperties) => ({
    fontFamily: fontIdToVariable[fontId],
    fontWeight: weight,
    ...extra,
  });

  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      {/* Article header */}
      <div className="p-6 md:p-10 lg:p-12 border-b bg-gradient-to-b from-muted/20 to-transparent">
        {/* Meta */}
        <div
          className="text-xs uppercase tracking-wider text-muted-foreground mb-4"
          style={getStyle(hierarchy.caption.fontId, 500)}
        >
          Design &middot; 8 min read
        </div>

        {/* Title */}
        <h2
          className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4 max-w-3xl"
          style={getStyle(hierarchy.h1.fontId, hierarchy.h1.weight, {
            lineHeight: hierarchy.h1.lineHeight,
            letterSpacing: hierarchy.h1.letterSpacing,
          })}
        >
          The Subtle Art of Typography in Modern Interfaces
        </h2>

        {/* Deck / Subtitle */}
        <p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl"
          style={getStyle(hierarchy.h2.fontId, hierarchy.h2.weight, {
            lineHeight: 1.4,
          })}
        >
          How thoughtful type choices shape user experience and define brand identity in the digital age.
        </p>
      </div>

      {/* Article body */}
      <article className="p-6 md:p-10 lg:p-12 space-y-6 max-w-3xl">
        <p
          className="text-base md:text-lg text-muted-foreground/90"
          style={getStyle(hierarchy.body.fontId, hierarchy.body.weight, {
            lineHeight: hierarchy.body.lineHeight,
          })}
        >
          Typography is the backbone of digital design. Every word, every letter, carries weight beyond its semantic meaning. The choices we make—the fonts, the sizes, the spacing—all contribute to an invisible architecture that guides users through content.
        </p>

        {/* Pull quote */}
        <blockquote className="border-l-2 border-foreground/20 pl-6 py-2 my-8">
          <p
            className="text-xl md:text-2xl italic"
            style={getStyle(hierarchy.h2.fontId, hierarchy.h2.weight, {
              lineHeight: 1.4,
            })}
          >
            &ldquo;Typography is what language looks like.&rdquo;
          </p>
          <cite
            className="text-sm text-muted-foreground not-italic mt-2 block"
            style={getStyle(hierarchy.caption.fontId, 400)}
          >
            — Ellen Lupton
          </cite>
        </blockquote>

        {/* Section heading */}
        <h3
          className="text-xl md:text-2xl mt-8 mb-4"
          style={getStyle(hierarchy.h3.fontId, hierarchy.h3.weight, {
            lineHeight: hierarchy.h3.lineHeight,
          })}
        >
          The Hierarchy of Information
        </h3>

        <p
          className="text-base md:text-lg text-muted-foreground/90"
          style={getStyle(hierarchy.body.fontId, hierarchy.body.weight, {
            lineHeight: hierarchy.body.lineHeight,
          })}
        >
          Visual hierarchy in typography is not merely about making headings larger than body text. It is about creating a rhythm, a dance between prominence and subtlety that guides the eye through complex information with clarity and purpose.
        </p>

        {/* Caption */}
        <p
          className="text-sm text-muted-foreground"
          style={getStyle(hierarchy.caption.fontId, hierarchy.caption.weight, {
            lineHeight: hierarchy.caption.lineHeight,
          })}
        >
          Published January 2025 &middot; Updated for clarity
        </p>
      </article>
    </div>
  );
}
