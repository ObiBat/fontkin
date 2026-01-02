import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
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
        }}
      >
        <span
          style={{
            fontSize: "140px",
            fontWeight: 900,
            color: "#FAFAF9",
            fontFamily: "Arial Black, sans-serif",
          }}
        >
          F
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
