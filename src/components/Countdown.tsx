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
      <div className={`p-5 sm:p-6 rounded-2xl bg-[#F3DDE2]/70 border border-[#B08D57]/40 text-center ${className}`}>
        <div className="flex items-center justify-center gap-2 text-[#81532F] mb-1">
          <CheckCircle2 className="w-5 h-5 text-[#B08D57]" />
          <h4 className="text-lg sm:text-xl font-serif font-bold">The Auspicious Ceremony Has Begun</h4>
        </div>
        <p className="text-xs sm:text-sm text-[#6F5A48]">
          May the almighty shower our little princess with boundless health, joy, and prosperity.
        </p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Mins', value: minutes },
    { label: 'Secs', value: seconds },
  ];

  return (
    <div className={`flex flex-col items-center w-full ${className}`}>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3DDE2]/70 border border-[#B08D57]/30 text-[10px] sm:text-xs uppercase tracking-widest text-[#81532F] font-semibold mb-3 shadow-xs">
        <span>Countdown to Auspicious Muhurtham</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3.5 max-w-sm sm:max-w-md w-full">
        {timeUnits.map((unit, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center py-2.5 px-1 sm:py-3.5 sm:px-3 rounded-xl bg-white/90 border border-[#B08D57]/35 shadow-xs relative overflow-hidden group hover:border-[#B08D57] transition-all"
          >
            {/* Top gold accent line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#B08D57] to-transparent opacity-80" />
            
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#81532F] tabular-nums leading-none tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[11px] text-[#8E7A69] uppercase tracking-wider mt-1 font-semibold">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
