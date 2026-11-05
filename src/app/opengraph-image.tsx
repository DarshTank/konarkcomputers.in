import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Konark Computers – Computer & Laptop Repair in Rajkot";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#1a1a2e",
          color: "#f5f0e8",
          fontFamily: "sans-serif",
          position: "relative",
          border: "12px solid #d4a574",
        }}
      >
        {/* Subtle Background Accent */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,165,116,0.15) 0%, rgba(26,26,46,0) 70%)",
          }}
        />

        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "14px",
                backgroundColor: "#d4a574",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                fontWeight: "bold",
                color: "#1a1a2e",
              }}
            >
              KC
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "#f5f0e8",
                  letterSpacing: "1px",
                }}
              >
                Konark Computers
              </span>
              <span
                style={{
                  fontSize: "16px",
                  color: "#d4a574",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Rajkot, Gujarat • Est. 1999
              </span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(212, 165, 116, 0.15)",
              border: "1px solid #d4a574",
              borderRadius: "30px",
              padding: "10px 24px",
              fontSize: "18px",
              color: "#d4a574",
              fontWeight: 600,
            }}
          >
            27+ Years Trusted Service
          </div>
        </div>

        {/* Center Main Message */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "58px",
              fontWeight: 800,
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Computer &amp; Laptop Repair in Rajkot
          </h1>
          <p
            style={{
              fontSize: "26px",
              color: "#e8bc8e",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Chip-Level Diagnostics • Original Parts • Screen &amp; Battery Replacement
          </p>
        </div>

        {/* Footer Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(245, 240, 232, 0.15)",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "30px", fontSize: "20px", color: "#f5f0e8" }}>
            <span>📍 234-Vitt Bhavan, Gondal Road, Rajkot</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#d4a574",
            }}
          >
            📞 +91 942 642 9416
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
