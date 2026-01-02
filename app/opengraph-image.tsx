import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Typographica - Professional Font Pairing Lab";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          padding: "60px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "#FAFAF9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "24px",
            }}
          >
            <span
              style={{
                fontSize: "56px",
                fontWeight: 900,
                color: "#0F0F0F",
                fontFamily: "Arial Black, sans-serif",
              }}
            >
              T
            </span>
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 900,
              color: "#FAFAF9",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontFamily: "Arial Black, sans-serif",
            }}
          >
            Typographica
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#A0A0A0",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: "60px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Professional Font Pairing Lab
        </div>

        {/* Sample Typography Preview */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "30px 50px",
              border: "1px solid #333",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "36px",
                color: "#FAFAF9",
                fontFamily: "Georgia, serif",
                fontWeight: 400,
                marginBottom: "8px",
              }}
            >
              Playfair
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#666",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              + Inter
            </span>
          </div>
          <div
            style={{
              padding: "30px 50px",
              border: "1px solid #333",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "36px",
                color: "#FAFAF9",
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              Space
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#666",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              + Lora
            </span>
          </div>
          <div
            style={{
              padding: "30px 50px",
              border: "1px solid #333",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "36px",
                color: "#FAFAF9",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                marginBottom: "8px",
              }}
            >
              Fraunces
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#666",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              + DM Sans
            </span>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "16px",
            color: "#666",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          typographica.design
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
