import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

interface BlessingShowerProps {
  className?: string;
  variant?: 'floating' | 'button';
}

/**
 * Pushpavrishti (Shower Blessings) interactive component
 * Allows guests to bestow auspicious flower petal blessings upon the baby girl
 */
export const BlessingShower: React.FC<BlessingShowerProps> = ({
  className = "",
  variant = "button",
}) => {
  const [blessingCount, setBlessingCount] = useState<number>(() => {
    const saved = localStorage.getItem('naming_ceremony_blessings');
    return saved ? parseInt(saved, 10) : 108;
  });
  const [justBlessed, setJustBlessed] = useState(false);

  const triggerShower = () => {
    // Auspicious ceremony colors: blush pink, antique gold, champagne, rose
    const colors = ['#F3DDE2', '#C58F9C', '#B08D57', '#E8D6B8', '#FFFFFF', '#F9D5E5'];

    // Left cannon
    confetti({
      particleCount: 28,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.75 },
      colors,
      shapes: ['circle'],
      scalar: 1.2,
      ticks: 200,
    });

    // Right cannon
    confetti({
      particleCount: 28,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.75 },
      colors,
      shapes: ['circle'],
      scalar: 1.2,
      ticks: 200,
    });

    // Center burst
    confetti({
      particleCount: 35,
      angle: 90,
      spread: 85,
      origin: { x: 0.5, y: 0.5 },
      colors,
      shapes: ['circle'],
      scalar: 1.4,
      ticks: 220,
    });

    const newCount = blessingCount + 1;
    setBlessingCount(newCount);
    localStorage.setItem('naming_ceremony_blessings', newCount.toString());

    setJustBlessed(true);
    setTimeout(() => setJustBlessed(false), 2000);
  };

  if (variant === 'floating') {
    return (
      <aside 
        aria-label="Floating blessing shower controls" 
        className={`fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-none select-none ${className}`}
      >
        {/* Playful Cat GIF resting atop the button */}
        <div
          className="relative pr-2 -mb-1 pointer-events-auto cursor-pointer group"
          onClick={triggerShower}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerShower(); }}
          aria-label="Tap cat to shower flower petals"
          title="Tap to shower flower petals!"
        >
          <img
            src="/cat.gif"
            alt="Auspicious Cat"
            className="w-11 h-11 sm:w-14 sm:h-14 object-contain select-none drop-shadow-md group-hover:scale-110 active:scale-90 transition-transform duration-200"
            draggable={false}
          />
        </div>

        {/* Floating Action Button — compact on mobile so it doesn't block page text */}
        <button
          type="button"
          onClick={triggerShower}
          className="pointer-events-auto flex items-center gap-2 py-2 px-3 sm:py-2.5 sm:px-4 bg-[#FFFAF5]/95 backdrop-blur-md text-[#81532F] border border-[#B08D57]/40 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
          aria-label="Shower flower blessings on the baby girl"
          title="Shower flower blessings"
        >
          <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F3DDE2] text-[#81532F] group-hover:bg-[#B08D57] group-hover:text-white transition-colors shrink-0 shadow-xs">
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ${justBlessed ? 'scale-125 text-red-500' : 'animate-pulse'}`} />
          </span>
          <div className="flex flex-col text-left pr-0.5">
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#81532F] leading-tight flex items-center gap-1">
              <span>Blessings</span>
              {justBlessed && <span className="text-[10px]">🌸</span>}
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#B08D57] font-semibold leading-none mt-0.5">
              {blessingCount} given
            </span>
          </div>
        </button>
      </aside>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={triggerShower}
        className="btn-primary group relative overflow-hidden py-3 px-7 text-base shadow-md active:scale-95 transition-transform"
        aria-label="Shower flower petals to bless the baby girl"
      >
        <Heart className={`w-4 h-4 fill-current text-[#FFFAF5] transition-transform ${justBlessed ? 'scale-125' : 'group-hover:scale-110'}`} />
        <span>{justBlessed ? 'Blessings Bestowed! 🌸' : 'Shower Flower Blessings'}</span>
      </button>

      <p className="text-xs text-[#8E7A69] flex items-center gap-1.5 font-medium mt-1">
        <Heart className="w-3.5 h-3.5 text-[#C58F9C] fill-current" />
        <span>{blessingCount} heartfelt blessings showered by guests</span>
      </p>
    </div>
  );
};
