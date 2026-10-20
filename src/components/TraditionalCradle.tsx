import React, { useState } from 'react';

interface TraditionalCradleProps {
  className?: string;
  size?: number;
}

/**
 * An intricately designed traditional Indian baby cradle (Palna / Thottil)
 * decorated with auspicious marigold garlands, golden chains, brass bells, and silk cushions.
 */
export const TraditionalCradle: React.FC<TraditionalCradleProps> = ({
  className = "",
  size = 280,
}) => {
  const [isTapped, setIsTapped] = useState(false);

  const handleCradleTap = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 1400);
  };

  return (
    <div
      onClick={handleCradleTap}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group active:scale-95 transition-transform duration-200 ${className}`}
      style={{ width: size, height: size * 1.05 }}
      role="img"
      aria-label="Traditional Indian baby cradle adorned with fresh flowers, golden chains, and brass bells - Tap to gently rock"
      title="Tap the cradle to gently rock"
    >
      {/* Gentle background radiant glow */}
      <div 
        className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none ${isTapped ? 'opacity-80 scale-110' : 'opacity-40'}`}
        style={{
          background: 'radial-gradient(circle, #F3DDE2 0%, #E8D6B8 50%, transparent 70%)',
        }}
      />

      {/* Cradle SVG with gentle swing animation */}
      <svg
        viewBox="0 0 320 340"
        className={`w-full h-full filter drop-shadow-md transition-all duration-300 ${
          isTapped ? 'animate-cradle-fast' : 'animate-cradle'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A76F" />
            <stop offset="50%" stopColor="#B08D57" />
            <stop offset="100%" stopColor="#81532F" />
          </linearGradient>
          <linearGradient id="cushionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F3DDE2" />
            <stop offset="100%" stopColor="#E8D6B8" />
          </linearGradient>
          <linearGradient id="silkDrape" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBF2F4" />
            <stop offset="50%" stopColor="#F3DDE2" />
            <stop offset="100%" stopColor="#C58F9C" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Top Suspender Hook / Rosette */}
        <g id="top-mount">
          <circle cx="160" cy="18" r="10" fill="url(#goldGradient)" />
          <circle cx="160" cy="18" r="5" fill="#FFFAF5" />
          <path d="M150 18 Q160 8 170 18" stroke="#81532F" strokeWidth="2" fill="none" />
          <circle cx="160" cy="26" r="3" fill="#B08D57" />
        </g>

        {/* Golden Hanging Chains */}
        <g id="chains" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round">
          {/* Left Main Chain */}
          <line x1="160" y1="28" x2="80" y2="120" strokeDasharray="3 3" />
          {/* Right Main Chain */}
          <line x1="160" y1="28" x2="240" y2="120" strokeDasharray="3 3" />

          {/* Golden chain links */}
          <circle cx="120" cy="74" r="3" fill="#B08D57" />
          <circle cx="200" cy="74" r="3" fill="#B08D57" />
          <circle cx="95" cy="102" r="3" fill="#B08D57" />
          <circle cx="225" cy="102" r="3" fill="#B08D57" />
        </g>

        {/* Auspicious Toran Swag across chains */}
        <g id="chain-garland">
          <path
            d="M80 120 Q160 145 240 120"
            stroke="#C58F9C"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="none"
          />
          {/* Jasmine drops */}
          {[100, 130, 160, 190, 220].map((cx, idx) => (
            <g key={idx}>
              <line x1={cx} y1={122 + Math.sin(idx) * 6} x2={cx} y2={138 + Math.sin(idx) * 6} stroke="#B08D57" strokeWidth="1" />
              <circle cx={cx} cy={140 + Math.sin(idx) * 6} r="3" fill="#FFFAF5" stroke="#B08D57" strokeWidth="0.8" />
              <circle cx={cx} cy={147 + Math.sin(idx) * 6} r="2.5" fill="#E8D6B8" />
            </g>
          ))}
        </g>

        {/* Hanging Brass Bells */}
        <g id="bells">
          {/* Left Bell */}
          <g transform="translate(80, 120)">
            <path d="M-6 8 L6 8 L4 0 L-4 0 Z" fill="url(#goldGradient)" stroke="#81532F" strokeWidth="0.8" />
            <circle cx="0" cy="10" r="2" fill="#81532F" />
          </g>
          {/* Right Bell */}
          <g transform="translate(240, 120)">
            <path d="M-6 8 L6 8 L4 0 L-4 0 Z" fill="url(#goldGradient)" stroke="#81532F" strokeWidth="0.8" />
            <circle cx="0" cy="10" r="2" fill="#81532F" />
          </g>
        </g>

        {/* Top Canopy Arch / Royal Frame */}
        <g id="canopy-arch">
          <path
            d="M60 160 C60 115, 260 115, 260 160"
            stroke="url(#goldGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M70 160 C70 125, 250 125, 250 160"
            stroke="#E8D6B8"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Crown finial */}
          <path
            d="M160 108 L165 118 L155 118 Z"
            fill="url(#goldGradient)"
          />
          <circle cx="160" cy="105" r="3" fill="#B08D57" />
        </g>

        {/* Royal Cradle Body */}
        <g id="cradle-basket">
          {/* Cradle back wall */}
          <ellipse cx="160" cy="195" rx="90" ry="25" fill="#E8D6B8" opacity="0.6" />

          {/* Soft Silk Bedding / Cushion */}
          <ellipse cx="160" cy="202" rx="84" ry="22" fill="url(#cushionGradient)" />
          
          {/* Royal Baby Pillow */}
          <path
            d="M100 196 C100 190 135 190 145 196 C145 202 110 206 100 196 Z"
            fill="#FFFFFF"
            stroke="#F3DDE2"
            strokeWidth="1.5"
          />
          <circle cx="122" cy="197" r="2" fill="#C58F9C" opacity="0.5" />

          {/* Silk draped blanket in blush */}
          <path
            d="M125 198 C145 194 200 194 220 202 C210 215 145 215 125 198 Z"
            fill="url(#silkDrape)"
            opacity="0.9"
          />

          {/* Cradle Front Railing & Wooden/Gold Slats */}
          <path
            d="M60 190 C60 250, 260 250, 260 190 C260 215 220 255 160 255 C100 255 60 215 60 190 Z"
            fill="url(#goldGradient)"
            opacity="0.95"
          />

          {/* Front carved rim */}
          <path
            d="M55 190 C65 240, 255 240, 265 190"
            stroke="#81532F"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M58 193 C68 236, 252 236, 262 193"
            stroke="#E8D6B8"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Decorative floral motifs on cradle front */}
          <g id="cradle-decorations">
            {[90, 125, 160, 195, 230].map((cx, idx) => {
              const cy = 208 + (Math.abs(160 - cx) > 40 ? -4 : 8);
              return (
                <g key={idx} transform={`translate(${cx}, ${cy})`}>
                  <circle cx="0" cy="0" r="5" fill="#FFFAF5" stroke="#B08D57" strokeWidth="1" />
                  <circle cx="0" cy="0" r="2.5" fill="#C58F9C" />
                </g>
              );
            })}
          </g>

          {/* Hanging Little Gold Jhumka / Bell under the cradle center */}
          <g transform="translate(160, 255)">
            <line x1="0" y1="0" x2="0" y2="12" stroke="#B08D57" strokeWidth="1.5" />
            <circle cx="0" cy="14" r="4.5" fill="url(#goldGradient)" stroke="#81532F" strokeWidth="0.8" />
            <circle cx="0" cy="20" r="1.5" fill="#B08D57" />
          </g>
        </g>
      </svg>
    </div>
  );
};
