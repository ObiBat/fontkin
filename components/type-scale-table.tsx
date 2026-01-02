import { ResolvedFontCombo, TypeScaleEntry } from "@/lib/types";
import { fontIdToVariable } from "@/lib/fonts";
import { fonts } from "@/lib/data/fonts";

interface TypeScaleTableProps {
  combo: ResolvedFontCombo;
}

export function TypeScaleTable({ combo }: TypeScaleTableProps) {
  const { hierarchy } = combo;

  const entries: { level: string; entry: TypeScaleEntry; sample: string }[] = [
    { level: "H1", entry: hierarchy.h1, sample: "Heading One" },
    { level: "H2", entry: hierarchy.h2, sample: "Heading Two" },
    { level: "H3", entry: hierarchy.h3, sample: "Heading Three" },
    { level: "Body", entry: hierarchy.body, sample: "Body text sample" },
    { level: "Caption", entry: hierarchy.caption, sample: "Caption text" },
  ];

  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="bg-muted/50 px-6 py-4 border-b">
        <h3 className="font-semibold">Recommended Type Scale</h3>
      </div>
      <div className="divide-y">
        {entries.map(({ level, entry, sample }) => {
          const font = fonts.find((f) => f.id === entry.fontId);
          return (
            <div
              key={level}
              className="px-6 py-4 flex flex-col md:flex-row md:items-center gap-4"
            >
              {/* Level badge */}
              <div className="w-16 shrink-0">
                <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
                  {level}
                </span>
              </div>

              {/* Sample text */}
              <div
                className="flex-1"
                style={{
                  fontFamily: fontIdToVariable[entry.fontId],
                  fontWeight: entry.weight,
                  fontSize: entry.size,
                  lineHeight: entry.lineHeight,
                  letterSpacing: entry.letterSpacing,
                }}
              >
                {sample}
              </div>

              {/* Specs */}
              <div className="text-xs text-muted-foreground space-y-1 md:text-right shrink-0">
                <div>{font?.name}</div>
                <div className="font-mono">
                  {entry.weight} · {entry.size} · {entry.lineHeight}
                  {entry.letterSpacing && ` · ${entry.letterSpacing}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
