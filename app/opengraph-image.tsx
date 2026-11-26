import { ImageResponse } from "next/og";

export const alt = "Nguyen Tat Hien - Full-stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 78% 40%, #1d4ed8 0%, #0f172a 32%, #0b0b10 62%)",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: "#22d3ee" }}>HIENNGUYEN.IO.VN</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, color: "#ffffff" }}>Nguyen Tat Hien</div>
          <div style={{ fontSize: 40, marginTop: 12, color: "#93c5fd" }}>Full-stack Developer</div>
          <div style={{ fontSize: 28, marginTop: 28, color: "#94a3b8" }}>
            React / Next.js / Laravel / NestJS / Practical AI (RAG)
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#fbbf24" }}>Ho Chi Minh City, Vietnam</div>
      </div>
    ),
    size,
  );
}
