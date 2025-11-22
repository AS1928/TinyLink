import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = {
  width: 192,
  height: 192,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
          position: 'relative',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          style={{
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
          }}
        >
          {/* Link chain icon */}
          <g fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
            {/* Left circle */}
            <circle cx="40" cy="70" r="18" />
            {/* Right circle */}
            <circle cx="100" cy="70" r="18" />
            {/* Top connecting line */}
            <path d="M 58 50 Q 70 30 82 50" />
            {/* Bottom connecting line */}
            <path d="M 58 90 Q 70 110 82 90" />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    },
  );
}
