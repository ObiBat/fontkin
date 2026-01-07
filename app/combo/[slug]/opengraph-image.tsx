import { ImageResponse } from "next/og";
import { getComboBySlug } from "@/lib/data/combos";

export const runtime = "edge";

export const alt = "Font Pairing Preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const combo = getComboBySlug(slug);

  // Fetch Anton font from Google Fonts
  const antonFont = await fetch(
    "https://fonts.gstatic.com/s/anton/v27/1Ptgg87LROyAm0K0.ttf"
  ).then((res) => res.arrayBuffer());

  const fonts = [
    {
      name: "Anton",
      data: antonFont,
      style: "normal" as const,
      weight: 400 as const,
    },
  ];

  if (!combo) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#0F0F0F",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "64px",
              color: "#FAFAF9",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontFamily: "Anton",
            }}
          >
            Fontkin
          </span>
          <span
            style={{
              fontSize: "24px",
              color: "#666666",
              marginTop: "24px",
            }}
          >
            Font Pairing Not Found
          </span>
        </div>
      ),
      { ...size, fonts }
    );
  }

  const { primaryFont, secondaryFont } = combo;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F0F0F",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 80px",
        }}
      >
        {/* Header - Fontkin branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          <span
            style={{
              fontSize: "28px",
              color: "#FAFAF9",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontFamily: "Anton",
            }}
          >
            Fontkin
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "#666666",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Font Pairing
          </span>
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 600,
              color: "#FAFAF9",
              marginBottom: "20px",
              lineHeight: 1,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {combo.name}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#888888",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {primaryFont.name}
            {primaryFont.id !== secondaryFont.id && ` + ${secondaryFont.name}`}
          </div>
        </div>

        {/* Footer Tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          {combo.vibeTags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "13px",
                padding: "8px 16px",
                background: "#1A1A1A",
                color: "#888888",
                borderRadius: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
