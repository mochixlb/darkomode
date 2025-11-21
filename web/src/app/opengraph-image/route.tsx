import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Darko Mode - Dark mode for every website";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export async function GET() {
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
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.03em",
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              textAlign: "center",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Darko Mode
          </h1>
          <p
            style={{
              fontSize: "36px",
              fontWeight: 400,
              color: "#a1a1aa",
              margin: 0,
              letterSpacing: "-0.01em",
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              textAlign: "center",
            }}
          >
            Dark mode for every website
          </p>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
