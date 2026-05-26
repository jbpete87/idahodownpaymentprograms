import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Idaho Down Payment Assistance Finder - Find programs you qualify for";
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
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
          }}
        />
        
        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            position: "relative",
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 140,
              height: 140,
              borderRadius: 32,
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              marginBottom: 40,
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
            }}
          >
            <span style={{ fontSize: 80 }}>🏠</span>
          </div>

          {/* Main title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <h1
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: "white",
                textAlign: "center",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Idaho Down Payment
            </h1>
            <h1
              style={{
                fontSize: 64,
                fontWeight: 800,
                background: "linear-gradient(90deg, #10B981 0%, #34d399 100%)",
                backgroundClip: "text",
                color: "transparent",
                textAlign: "center",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Assistance Finder
            </h1>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 28,
              color: "#94a3b8",
              textAlign: "center",
              marginTop: 32,
              maxWidth: 800,
            }}
          >
            Find programs you qualify for • IHFA up to 8% • $500 minimum out-of-pocket
          </p>

          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 40,
              padding: "16px 32px",
              background: "rgba(16, 185, 129, 0.15)",
              borderRadius: 100,
              border: "1px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            <span style={{ fontSize: 24 }}>✓</span>
            <span style={{ fontSize: 22, color: "#10B981", fontWeight: 600 }}>
              Free Eligibility Quiz • No SSN Required
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 18, color: "#64748b" }}>
            idahodownpaymentprograms.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

