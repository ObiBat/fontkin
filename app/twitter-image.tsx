import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Typographica - Professional Font Pairing Lab";
export const size = {
  width: 1200,
  height: 600,
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
        {/* Logo Mark */}
        <div
          style={{
            width: "100px",
            height: "100px",
            background: "#FAFAF9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#0F0F0F",
              fontFamily: "Arial Black, sans-serif",
            }}
          >
            T
          </span>
        </div>

        {/* Brand Name */}
        <span
          style={{
            fontSize: "64px",
            fontWeight: 900,
            color: "#FAFAF9",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontFamily: "Arial Black, sans-serif",
            marginBottom: "20px",
          }}
        >
          Typographica
        </span>

        {/* Tagline */}
        <div
          style={{
            fontSize: "24px",
            color: "#A0A0A0",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Professional Font Pairing Lab
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
