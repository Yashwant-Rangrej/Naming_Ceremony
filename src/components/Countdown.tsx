import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { CEREMONY_DATA } from '../data/ceremony';
import { CheckCircle2 } from 'lucide-react';

export const Countdown: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { days, hours, minutes, seconds, isCompleted } = useCountdown(
    CEREMONY_DATA.event.isoDateTime
  );

  if (isCompleted) {
    return (
      <div className={`p-6 rounded-2xl bg-[#F3DDE2]/60 border border-[#B08D57]/40 text-center ${className}`}>
        <div className="flex items-center justify-center gap-2 text-[#81532F] mb-1">
          <CheckCircle2 className="w-5 h-5 text-[#B08D57]" />
          <h4 className="text-xl font-serif font-semibold">The Auspicious Ceremony Has Begun</h4>
        </div>
        <p className="text-sm text-[#6F5A48]">
          May the almighty shower our little princess with boundless health, joy, and prosperity.
        </p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
        <span className="text-[10px]">✦</span>
        <span>Countdown to Auspicious Muhurtham</span>
        <span className="text-[10px]">✦</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md w-full">
        {timeUnits.map((unit, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white/80 border border-[#B08D57]/30 shadow-sm relative overflow-hidden group hover:border-[#B08D57] transition-colors"
          >
            {/* Top gold accent line */}
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#B08D57] to-transparent opacity-60" />
            
            <span className="font-serif text-2xl sm:text-4xl font-bold text-[#81532F] tabular-nums leading-none">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-[#8E7A69] uppercase tracking-wider mt-1.5 font-medium">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#8E7A69] mt-2.5">
        Time calculated in India Standard Time ({CEREMONY_DATA.event.timezone})
      </p>
    </div>
  );
};
