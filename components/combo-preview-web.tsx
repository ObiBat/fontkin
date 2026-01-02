import { ResolvedFontCombo } from "@/lib/types";
import { fontIdToVariable } from "@/lib/fonts";

interface ComboPreviewWebProps {
  combo: ResolvedFontCombo;
}

export function ComboPreviewWeb({ combo }: ComboPreviewWebProps) {
  const { hierarchy } = combo;

  const getStyle = (fontId: string, weight: number) => ({
    fontFamily: fontIdToVariable[fontId],
    fontWeight: weight,
  });

  return (
    <div className="border rounded-xl overflow-hidden bg-card">
      {/* Mock browser chrome */}
      <div className="bg-muted border-b px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-background/50 rounded px-3 py-1 text-xs text-muted-foreground max-w-md mx-auto text-center">
            app.example.com
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 space-y-8">
        {/* Hero section */}
        <section className="text-center space-y-4">
          <div
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
            style={getStyle(hierarchy.caption.fontId, 600)}
          >
            Dashboard
          </div>
          <h3
            className="text-2xl md:text-3xl tracking-tight"
            style={getStyle(hierarchy.h1.fontId, hierarchy.h1.weight)}
          >
            Welcome back, Alex
          </h3>
          <p
            className="text-muted-foreground max-w-md mx-auto"
            style={getStyle(hierarchy.body.fontId, hierarchy.body.weight)}
          >
            Your project has 12 pending tasks and 3 notifications.
          </p>
        </section>

        {/* Cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Users", value: "12,847", change: "+12%" },
            { label: "Revenue", value: "$48,290", change: "+8.2%" },
            { label: "Active Projects", value: "23", change: "+3" },
          ].map((stat, i) => (
            <div key={i} className="border rounded-lg p-4 bg-muted/30">
              <div
                className="text-xs text-muted-foreground uppercase tracking-wider"
                style={getStyle(hierarchy.caption.fontId, 500)}
              >
                {stat.label}
              </div>
              <div
                className="text-2xl mt-1"
                style={getStyle(hierarchy.h2.fontId, hierarchy.h2.weight)}
              >
                {stat.value}
              </div>
              <div
                className="text-xs text-green-600 mt-1"
                style={getStyle(hierarchy.caption.fontId, 500)}
              >
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center gap-3">
          <button
            className="px-4 py-2 bg-foreground text-background rounded-md text-sm font-medium"
            style={getStyle(hierarchy.body.fontId, 500)}
          >
            View Analytics
          </button>
          <button
            className="px-4 py-2 border rounded-md text-sm font-medium"
            style={getStyle(hierarchy.body.fontId, 500)}
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
