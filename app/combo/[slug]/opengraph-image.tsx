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

  if (!combo) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#0F0F0F",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FAFAF9",
            fontSize: 48,
          }}
        >
          Font Pairing Not Found
        </div>
      ),
      { ...size }
    );
  }

  const { primaryFont, secondaryFont } = combo;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAF9",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 80px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 900,
              color: "#0F0F0F",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Fontkin
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "#666",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
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
              fontSize: "72px",
              fontWeight: 600,
              color: "#0F0F0F",
              marginBottom: "16px",
              lineHeight: 1,
            }}
          >
            {combo.name}
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#666",
              marginBottom: "40px",
            }}
          >
            {primaryFont.name}
            {primaryFont.id !== secondaryFont.id && ` + ${secondaryFont.name}`}
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#888",
              maxWidth: "700px",
              lineHeight: 1.5,
            }}
          >
            {combo.description}
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
                fontSize: "14px",
                padding: "8px 16px",
                background: "#F0F0F0",
                color: "#666",
                borderRadius: "20px",
                textTransform: "capitalize",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
