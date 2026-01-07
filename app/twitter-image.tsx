import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Fontkin - Professional Font Pairing Lab";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default async function Image() {
  // Fetch Anton font from Google Fonts
  const antonFont = await fetch(
    "https://fonts.gstatic.com/s/anton/v27/1Ptgg87LROyAm0K0.ttf"
  ).then((res) => res.arrayBuffer());

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
        {/* Wordmark Logo - matches UI exactly */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <span
            style={{
              fontSize: "120px",
              color: "#FAFAF9",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontFamily: "Anton",
            }}
          >
            Fontkin
          </span>

          {/* Minimal tagline */}
          <span
            style={{
              fontSize: "18px",
              color: "#666666",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Font Pairing Lab
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Anton",
          data: antonFont,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
