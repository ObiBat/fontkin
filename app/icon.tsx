import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
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
          borderRadius: "4px",
        }}
      >
        <span
          style={{
            fontSize: "24px",
            fontWeight: 900,
            color: "#FAFAF9",
            fontFamily: "Arial Black, sans-serif",
          }}
        >
          T
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
