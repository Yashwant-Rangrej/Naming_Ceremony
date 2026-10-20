import React from 'react';

/**
 * Purely decorative ambient blobs that drift slowly in the background.
 * They give the page a living, breathing quality on mobile scroll instead
 * of the flat "PDF" feel.
 *
 * All orbs are `pointer-events: none` and use `aria-hidden` so they
 * don't interfere with content or screen readers.
 */
export const AmbientBackground: React.FC = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
    style={{ isolation: 'isolate' }}
  >
    {/* Top-left blush cloud */}
    <div
      className="animate-orb absolute rounded-full"
      style={{
        width: 320,
        height: 320,
        top: '-60px',
        left: '-80px',
        background: 'radial-gradient(circle, rgba(243,221,226,0.45) 0%, transparent 70%)',
        animationDelay: '0s',
        animationDuration: '11s',
        filter: 'blur(1px)',
      }}
    />

    {/* Centre-right gold mist */}
    <div
      className="animate-orb-reverse absolute rounded-full"
      style={{
        width: 260,
        height: 260,
        top: '30%',
        right: '-60px',
        background: 'radial-gradient(circle, rgba(232,214,184,0.38) 0%, transparent 70%)',
        animationDelay: '-4s',
        animationDuration: '14s',
        filter: 'blur(1px)',
      }}
    />

    {/* Mid-left pink whisper */}
    <div
      className="animate-orb absolute rounded-full"
      style={{
        width: 200,
        height: 200,
        top: '55%',
        left: '-40px',
        background: 'radial-gradient(circle, rgba(197,143,156,0.22) 0%, transparent 70%)',
        animationDelay: '-7s',
        animationDuration: '13s',
        filter: 'blur(2px)',
      }}
    />

    {/* Bottom-centre warm ivory glow */}
    <div
      className="animate-orb-reverse absolute rounded-full"
      style={{
        width: 300,
        height: 300,
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(circle, rgba(176,141,87,0.14) 0%, transparent 70%)',
        animationDelay: '-2s',
        animationDuration: '10s',
        filter: 'blur(2px)',
      }}
    />

    {/* Small top-right twinkle dot cluster */}
    {[0, 60, 120, 180, 240].map((deg, i) => (
      <div
        key={i}
        className="animate-twinkle absolute rounded-full bg-[#B08D57]"
        style={{
          width: 4,
          height: 4,
          top: `${8 + i * 5}%`,
          right: `${6 + (i % 3) * 4}%`,
          animationDelay: `${i * 0.55}s`,
          opacity: 0.35,
        }}
      />
    ))}

    {/* Small left-side rose dot cluster */}
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className="animate-twinkle absolute rounded-full bg-[#C58F9C]"
        style={{
          width: 3,
          height: 3,
          top: `${35 + i * 8}%`,
          left: `${2 + (i % 2) * 3}%`,
          animationDelay: `${i * 0.7 + 0.3}s`,
          opacity: 0.3,
        }}
      />
    ))}
  </div>
);
