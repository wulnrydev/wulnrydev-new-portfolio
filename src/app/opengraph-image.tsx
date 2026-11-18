import { ImageResponse } from "next/og";

export const alt = "wulnrydev — Full-Stack Developer";
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
          padding: "72px",
          background: "#0d0d0d",
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(140,110,255,0.28), transparent 55%), radial-gradient(circle at 85% 90%, rgba(80,200,255,0.16), transparent 55%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#4ade80",
            }}
          />
          <div style={{ fontSize: "26px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}>
            wulnrydev.com
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "112px",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            wulnrydev
          </div>
          <div style={{ fontSize: "34px", color: "rgba(255,255,255,0.6)", lineHeight: 1.35 }}>
            Full-Stack Developer
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", fontSize: "22px", color: "rgba(255,255,255,0.4)" }}>
          <div>Web apps</div>
          <div>·</div>
          <div>APIs</div>
          <div>·</div>
          <div>Discord bots</div>
          <div>·</div>
          <div>Interfaces</div>
        </div>
      </div>
    ),
    size
  );
}
