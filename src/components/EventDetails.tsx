import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, CalendarPlus } from 'lucide-react';
import { CEREMONY_DATA } from '../data/ceremony';
import { Countdown } from './Countdown';
import { handleSmartAddToCalendar } from '../utils/calendar';
import { OrnamentalDivider } from './FloralDecoration';

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
      primary: '12:00 PM',
      shortPrimary: '12:00 PM',
      sub: '',
      shortSub: '',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section id="ceremony" className={`scroll-mt-24 ${className}`} aria-labelledby="ceremony-heading">
      <div className="royal-card-frame">
        <div className="royal-inner-border" />

        <div className="text-center relative z-10 max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#B08D57] block mb-1">
            Auspicious Muhurtham
          </span>
          <h3 id="ceremony-heading" className="text-2xl sm:text-4xl font-serif text-[#81532F] font-bold mb-2">
            Ceremony Date &amp; Time
          </h3>
          <p className="text-xs sm:text-sm text-[#6F5A48] max-w-md mx-auto mb-4 sm:mb-6">
            Join our hands in prayer as we bestow a name filled with grace and blessings upon our little daughter.
          </p>

          <OrnamentalDivider className="my-2 sm:my-3" />

          {/* Date & Muhurtham cards — side by side in a single row */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 my-5 sm:my-8 max-w-lg mx-auto">
            {cards.map(({ icon: Icon, label, shortLabel, primary, shortPrimary, sub, shortSub }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={prefersReduced ? {} : cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-20px' }}
                whileHover={prefersReduced ? {} : { y: -4, transition: { duration: 0.22 } }}
                className="flex flex-col items-center justify-between p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FFFAF5] border border-[#B08D57]/30 shadow-sm cursor-default text-center min-w-0"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#F3DDE2] flex items-center justify-center mb-1.5 sm:mb-3 shrink-0">
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-[#81532F]" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#8E7A69] font-medium leading-tight truncate w-full">
                  <span className="sm:hidden">{shortLabel}</span>
                  <span className="hidden sm:inline">{label}</span>
                </span>
                {label === 'Muhurtham' ? (
                  <div className="flex items-baseline justify-center mt-1 leading-tight w-full">
                    <span className="font-serif text-xl sm:text-3xl font-bold text-[#81532F] [font-variant-numeric:lining-nums]">
                      12:00
                    </span>
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#81532F]/75 ml-1">
                      PM
                    </span>
                  </div>
                ) : (
                  <span className="font-serif text-base sm:text-2xl font-bold text-[#81532F] mt-1 leading-tight truncate w-full">
                    <span className="sm:hidden">{shortPrimary || primary}</span>
                    <span className="hidden sm:inline">{primary}</span>
                  </span>
                )}
                {sub || shortSub ? (
                  <span className="text-[11px] sm:text-sm font-semibold text-[#B08D57] mt-0.5 sm:mt-1 leading-tight truncate w-full">
                    <span className="sm:hidden">{shortSub || sub}</span>
                    <span className="hidden sm:inline">{sub}</span>
                  </span>
                ) : (
                  <span className="text-[11px] sm:text-sm select-none opacity-0 mt-0.5 sm:mt-1 leading-tight" aria-hidden="true">
                    &nbsp;
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Live Countdown */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="my-8 pt-4 border-t border-[#B08D57]/20"
          >
            <Countdown />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3.5 mt-8 pt-4 border-t border-[#B08D57]/20"
          >
            <button
              type="button"
              onClick={handleSmartAddToCalendar}
              className="btn-primary"
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
