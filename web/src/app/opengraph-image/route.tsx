import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Darko Mode - Dark mode for every website";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export async function GET(request: Request) {
  // Get the base URL from the request
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const owlImageUrl = `${baseUrl}/owl.webp`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          padding: "60px 80px",
          gap: "60px",
        }}
      >
        {/* Owl Image */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <img
            src={owlImageUrl}
            alt="Darko Mode Owl"
            width="280"
            height="280"
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        {/* Text Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 1,
            gap: "24px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.02em",
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              lineHeight: 1.1,
            }}
          >
            Darko Mode
          </h1>
          <p
            style={{
              fontSize: "32px",
              fontWeight: 400,
              color: "#e5e5e5",
              margin: 0,
              letterSpacing: "-0.01em",
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              lineHeight: 1.4,
              maxWidth: "600px",
            }}
          >
            Instantly toggle dark mode on any site. Adjust brightness, contrast,
            and filters to suit your eyes. Simple, fast, and free.
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
