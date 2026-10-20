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
    // Start with an auspicious base count like 108
    const saved = localStorage.getItem('naming_ceremony_blessings');
    return saved ? parseInt(saved, 10) : 108;
  });
  const [justBlessed, setJustBlessed] = useState(false);

  const triggerShower = () => {
    // Auspicious ceremony colors: blush pink, antique gold, champagne, rose
    const colors = ['#F3DDE2', '#C58F9C', '#B08D57', '#E8D6B8', '#FFFFFF'];

    // Left cannon
    confetti({
      particleCount: 30,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.7 },
      colors,
      shapes: ['circle'],
      scalar: 1.2,
      ticks: 200,
    });

    // Right cannon
    confetti({
      particleCount: 30,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.7 },
      colors,
      shapes: ['circle'],
      scalar: 1.2,
      ticks: 200,
    });

    // Center gentle burst
    confetti({
      particleCount: 40,
      angle: 90,
      spread: 90,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes: ['circle'],
      scalar: 1.4,
      ticks: 240,
    });

    const newCount = blessingCount + 1;
    setBlessingCount(newCount);
    localStorage.setItem('naming_ceremony_blessings', newCount.toString());

    setJustBlessed(true);
    setTimeout(() => setJustBlessed(false), 2000);
  };

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none ${className}`}>
        {/* Animated Cat GIF positioned above the button */}
        <div className="relative pr-6 -mb-1 pointer-events-auto cursor-pointer" onClick={triggerShower}>
          <img
            src="/cat.gif"
            alt="Auspicious Cat"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain select-none drop-shadow-md hover:scale-110 active:scale-95 transition-transform duration-200"
            draggable={false}
          />
        </div>

        <button
          onClick={triggerShower}
          className="pointer-events-auto flex items-center gap-2 px-4 py-3 bg-[#FFFAF5] text-[#81532F] border border-[#B08D57]/40 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group active:scale-95"
          aria-label="Shower flower blessings on the baby girl"
          title="Shower flower blessings"
        >
          <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#F3DDE2] text-[#81532F] group-hover:bg-[#B08D57] group-hover:text-white transition-colors">
            <Heart className="w-4 h-4 fill-current animate-pulse" />
          </span>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#81532F]">
              Shower Blessings
            </span>
            <span className="text-[11px] text-[#B08D57]">
              {blessingCount} blessings received
            </span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={triggerShower}
        className="btn-primary group relative overflow-hidden"
        aria-label="Shower flower petals to bless the baby girl"
      >
        <Heart className="w-4 h-4 fill-current text-[#FFFAF5] transition-transform group-hover:scale-110" />
        <span>{justBlessed ? 'Blessings Bestowed! 🌸' : 'Shower Blessings'}</span>
      </button>

      <p className="text-xs text-[#8E7A69] flex items-center gap-1.5 font-medium mt-1">
        <Heart className="w-3.5 h-3.5 text-[#C58F9C] fill-current" />
        <span>{blessingCount} heartfelt blessings showered by guests</span>
      </p>
    </div>
  );
};
