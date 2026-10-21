import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, CalendarPlus } from 'lucide-react';
import { CEREMONY_DATA } from '../data/ceremony';
import { Countdown } from './Countdown';
import { handleSmartAddToCalendar } from '../utils/calendar';
import { CornerOrnament, OrnamentalDivider } from './FloralDecoration';

export const EventDetails: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { event } = CEREMONY_DATA;
  const prefersReduced = useReducedMotion();

  const cards = [
    {
      icon: Calendar,
      label: 'The Auspicious Day',
      shortLabel: 'Day',
      primary: event.day,
      shortPrimary: event.day,
      sub: event.displayDate,
      shortSub: '25 Oct 2026',
    },
    {
      icon: Clock,
      label: 'Muhurtham',
      shortLabel: 'Muhurtham',
      primary: event.displayTime,
      shortPrimary: event.displayTime,
      sub: 'Auspicious Timing',
      shortSub: 'Auspicious',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.96 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section id="ceremony" className={`scroll-mt-24 ${className}`} aria-labelledby="ceremony-heading">
      <div className="royal-card-frame bg-gradient-to-b from-[#FFFDFB] via-[#FFFAF4] to-[#FFFDFB] relative overflow-hidden border-[#B08D57]/35 shadow-md">
        <CornerOrnament position="top-left" size={38} />
        <CornerOrnament position="top-right" size={38} />
        <CornerOrnament position="bottom-left" size={38} />
        <CornerOrnament position="bottom-right" size={38} />
        <div className="royal-inner-border" />

        <div className="text-center relative z-10 max-w-2xl mx-auto px-2 sm:px-4 py-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3DDE2]/70 border border-[#B08D57]/30 text-[10px] sm:text-xs uppercase tracking-widest text-[#81532F] font-semibold mb-2 shadow-xs">
            <span>Auspicious Muhurtham</span>
          </div>

          <h3 id="ceremony-heading" className="text-2xl sm:text-4xl font-serif text-[#81532F] font-bold mb-2">
            Ceremony Date &amp; Time
          </h3>
          <p className="text-xs sm:text-sm text-[#6F5A48] max-w-md mx-auto mb-3 sm:mb-5 leading-relaxed">
            Join our hands in prayer as we bestow a sacred name filled with grace and blessings upon our little daughter.
          </p>

          <OrnamentalDivider className="my-2" />

          {/* Date & Muhurtham cards — side by side in a single row */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-5 my-5 sm:my-7 max-w-md mx-auto">
            {cards.map(({ icon: Icon, label, shortLabel, primary, shortPrimary, sub, shortSub }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={prefersReduced ? {} : cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-20px' }}
                whileHover={prefersReduced ? {} : { y: -3, transition: { duration: 0.2 } }}
                className="flex flex-col items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 border border-[#B08D57]/35 shadow-xs cursor-default text-center min-w-0"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#F3DDE2] flex items-center justify-center mb-1.5 sm:mb-2 shrink-0 border border-[#B08D57]/20">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#81532F]" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#8E7A69] font-semibold leading-tight truncate w-full">
                  <span className="sm:hidden">{shortLabel}</span>
                  <span className="hidden sm:inline">{label}</span>
                </span>
                {label === 'Muhurtham' ? (
                  <div className="flex items-baseline justify-center mt-1 leading-tight w-full">
                    <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#81532F] [font-variant-numeric:lining-nums]">
                      11:45
                    </span>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#81532F]/80 ml-1">
                      AM
                    </span>
                  </div>
                ) : (
                  <span className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-[#81532F] mt-1 leading-tight truncate w-full">
                    <span className="sm:hidden">{shortPrimary || primary}</span>
                    <span className="hidden sm:inline">{primary}</span>
                  </span>
                )}
                <span className="text-[11px] sm:text-xs font-semibold text-[#B08D57] mt-0.5 sm:mt-1 leading-tight truncate w-full">
                  <span className="sm:hidden">{shortSub || sub}</span>
                  <span className="hidden sm:inline">{sub}</span>
                </span>
              </motion.div>
            ))}
          </div>

          {/* Live Countdown */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="my-5 sm:my-7 pt-4 border-t border-[#B08D57]/20"
          >
            <Countdown />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-5 pt-3 border-t border-[#B08D57]/20"
          >
            <button
              type="button"
              onClick={handleSmartAddToCalendar}
              className="btn-primary w-full sm:w-auto text-base py-3 px-6 shadow-md"
              aria-label="Add baby naming ceremony to calendar"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Add to Calendar</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
