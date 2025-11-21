import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Darko Mode - Dark mode for every website';
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

export async function GET() {
  try {
    // Read the owl image from public folder
    const owlImagePath = join(process.cwd(), 'public', 'owl.webp');
    const owlImageBuffer = await readFile(owlImagePath);
    const owlImageBase64 = `data:image/webp;base64,${owlImageBuffer.toString('base64')}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
            padding: '80px',
          }}
        >
          {/* Owl Image */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '48px',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={owlImageBase64}
              alt=""
              width="280"
              height="280"
              style={{
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Darko Mode Text */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '80px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-0.03em',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                textAlign: 'center',
                lineHeight: 1.1,
                marginBottom: '20px',
              }}
            >
              Darko Mode
            </h1>
            <p
              style={{
                fontSize: '36px',
                fontWeight: 400,
                color: '#a1a1aa',
                margin: 0,
                letterSpacing: '-0.01em',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                textAlign: 'center',
              }}
            >
              Dark mode for every website
            </p>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    // Fallback: return a simple text-based OG image if image loading fails
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
            padding: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '80px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-0.03em',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                textAlign: 'center',
                lineHeight: 1.1,
                marginBottom: '20px',
              }}
            >
              Darko Mode
            </h1>
            <p
              style={{
                fontSize: '36px',
                fontWeight: 400,
                color: '#a1a1aa',
                margin: 0,
                letterSpacing: '-0.01em',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                textAlign: 'center',
              }}
            >
              Dark mode for every website
            </p>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}

