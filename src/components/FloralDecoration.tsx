import React from 'react';

/**
 * Traditional Indian Jasmine & Marigold Hanging Toran (Floral Garland)
 */
export const HangingToran: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`w-full overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 80"
        className="w-full h-auto text-antique-gold"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Main top golden string */}
        <line x1="0" y1="12" x2="1200" y2="12" stroke="#B08D57" strokeWidth="2" strokeDasharray="6 4" />
        
        {/* Mango leaves & Jasmine flower swags */}
        {Array.from({ length: 12 }).map((_, i) => {
          const cx = i * 100 + 50;
          return (
            <g key={i}>
              {/* Swag curve */}
              <path
                d={`M${cx - 50} 12 Q${cx} 48 ${cx + 50} 12`}
                stroke="#C58F9C"
                strokeWidth="1.5"
                fill="none"
                opacity="0.8"
              />
              
              {/* Hanging flower drop */}
              <line x1={cx} y1="36" x2={cx} y2="60" stroke="#B08D57" strokeWidth="1" />
              
              {/* Marigold / Jasmine buds */}
              <circle cx={cx} cy="42" r="3.5" fill="#E8D6B8" stroke="#B08D57" strokeWidth="0.8" />
              <circle cx={cx} cy="52" r="4" fill="#F3DDE2" stroke="#C58F9C" strokeWidth="0.8" />
              <circle cx={cx} cy="62" r="4.5" fill="#B08D57" />
              
              {/* Mango leaf motif */}
              <path
                d={`M${cx - 24} 12 C${cx - 20} 24 ${cx - 15} 32 ${cx - 15} 34 C${cx - 25} 30 ${cx - 28} 20 ${cx - 24} 12 Z`}
                fill="#81532F"
                opacity="0.35"
              />
              <path
                d={`M${cx + 24} 12 C${cx + 20} 24 ${cx + 15} 32 ${cx + 15} 34 C${cx + 25} 30 ${cx + 28} 20 ${cx + 24} 12 Z`}
                fill="#81532F"
                opacity="0.35"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Traditional Royal Corner Ornaments for card borders
 */
export const CornerOrnament: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
}> = ({ position, size = 48 }) => {
  const getRotation = () => {
    switch (position) {
      case 'top-left': return '';
      case 'top-right': return 'scale-x-[-1]';
      case 'bottom-left': return 'scale-y-[-1]';
      case 'bottom-right': return 'scale-x-[-1] scale-y-[-1]';
    }
  };

  return (
    <div
      className={`absolute pointer-events-none select-none ${getRotation()}`}
      style={{
        top: position.includes('top') ? '8px' : 'auto',
        bottom: position.includes('bottom') ? '8px' : 'auto',
        left: position.includes('left') ? '8px' : 'auto',
        right: position.includes('right') ? '8px' : 'auto',
        width: `${size}px`,
        height: `${size}px`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer border curve */}
        <path d="M4 44 L4 12 C4 7.578 7.578 4 12 4 L44 4" stroke="#B08D57" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 44 L10 16 C10 12.686 12.686 10 16 10 L44 10" stroke="#E8D6B8" strokeWidth="1" strokeLinecap="round" />
        {/* Floral flourish */}
        <circle cx="16" cy="16" r="3" fill="#F3DDE2" stroke="#B08D57" strokeWidth="1" />
        <path d="M16 16 C22 16 26 20 26 26 C20 26 16 22 16 16 Z" fill="#B08D57" opacity="0.6" />
        <circle cx="4" cy="4" r="2.5" fill="#B08D57" />
      </svg>
    </div>
  );
};

/**
 * Elegant Golden Lotus / Diya Ornamental Divider
 */
export const OrnamentalDivider: React.FC<{ title?: string; className?: string }> = ({
  title,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 w-full ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-[#B08D57] to-[#E8D6B8]" />
      
      <div className="flex items-center gap-2 text-[#B08D57]">
        {/* Left small diamond */}
        <span className="w-1.5 h-1.5 rotate-45 bg-[#B08D57]/70 inline-block" />
        
        {/* Lotus Center SVG */}
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2 C13.5 7 17 9 17 14 C17 17 14.5 19 12 19 C9.5 19 7 17 7 14 C7 9 10.5 2 12 2 Z"
            fill="#F3DDE2"
            stroke="#B08D57"
            strokeWidth="1.2"
          />
          <path
            d="M12 8 C9 10 4 12 4 15 C4 18 7 19 9.5 19"
            fill="none"
            stroke="#C58F9C"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M12 8 C15 10 20 12 20 15 C20 18 17 19 14.5 19"
            fill="none"
            stroke="#C58F9C"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="14" r="1.5" fill="#81532F" />
        </svg>

        {/* Right small diamond */}
        <span className="w-1.5 h-1.5 rotate-45 bg-[#B08D57]/70 inline-block" />
      </div>

      <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-l from-transparent via-[#B08D57] to-[#E8D6B8]" />
      
      {title && <span className="sr-only">{title}</span>}
    </div>
  );
};
