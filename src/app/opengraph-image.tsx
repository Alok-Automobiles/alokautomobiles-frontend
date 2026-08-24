import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0b08",
          color: "#efe7d2",
          padding: 72,
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* amber corner glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 680,
            height: 680,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(230,161,10,0.65) 0%, rgba(230,161,10,0) 60%)",
            filter: "blur(40px)",
          }}
        />

        {/* meta bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(239,231,210,0.65)",
            fontFamily: "monospace",
          }}
        >
          <span>Alok Automobiles</span>
          <span style={{ color: "#e6a10a" }}>VARANASI / UP / INDIA</span>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.92 }}>
          <span style={{ fontSize: 156, letterSpacing: -4, fontWeight: 300 }}>Keep the</span>
          <span
            style={{
              fontSize: 156,
              letterSpacing: -4,
              fontWeight: 300,
              fontStyle: "italic",
              color: "#e6a10a",
            }}
          >
            wheels turning.
          </span>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            fontSize: 22,
            color: "rgba(239,231,210,0.82)",
          }}
        >
          <span>Trucks. Four-Wheelers. Engine Oils. Since 2005.</span>
          <span
            style={{
              fontSize: 18,
              letterSpacing: 4,
              fontFamily: "monospace",
              textTransform: "uppercase",
              background: "#e6a10a",
              color: "#0c0b08",
              padding: "8px 16px",
            }}
          >
            alokautomobiles.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
