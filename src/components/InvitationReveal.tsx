import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence, type Variants } from 'framer-motion';
import { CEREMONY_DATA } from '../data/ceremony';
import { CornerOrnament, HangingToran, OrnamentalDivider } from './FloralDecoration';
import { BrotherMessage } from './BrotherMessage';
import { EventDetails } from './EventDetails';
import { VenueSection } from './VenueSection';
import { BlessingShower } from './BlessingShower';
import { ScrollReveal } from './ScrollReveal';
import { Heart, ChevronDown } from 'lucide-react';

interface InvitationRevealProps {
  className?: string;
}

/**
 * Reusable staggered section wrapper — smooth scroll reveals on mobile
 */
const SectionWrap: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
}> = ({ children, className = 'mb-6 sm:mb-12', direction = 'up', delay = 0 }) => (
  <ScrollReveal direction={direction} delay={delay} className={className}>
    {children}
  </ScrollReveal>
);

/* Visual separator between sections */
const SectionSeparator: React.FC = () => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="h-px my-4 sm:my-6 mx-auto max-w-xs origin-center"
    style={{
      background:
        'linear-gradient(90deg, transparent 0%, #B08D57 30%, #E8D6B8 50%, #B08D57 70%, transparent 100%)',
    }}
  />
);

export const InvitationReveal: React.FC<InvitationRevealProps> = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cardEntrance: Variants = {
    hidden: { opacity: 0, y: 35, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const inCardItem: Variants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(2px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className={`relative w-full max-w-4xl mx-auto px-3 sm:px-6 pt-16 sm:pt-20 pb-20 ${className}`}>

      {/* Hanging Toran Garland — slides down on entry */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none"
      >
        <HangingToran className="mb-4 sm:mb-6" />
      </motion.div>

      {/* ── SCREEN 1: Main Royal Invitation Proclamation ────────────────── */}
      <motion.article
        id="invitation"
        variants={prefersReducedMotion ? {} : cardEntrance}
        initial="hidden"
        animate="visible"
        className="royal-card-frame bg-gradient-to-b from-[#FFFDFB] via-[#FFF9F3] to-[#FFFDFB] relative mb-6 sm:mb-12 border-[#B08D57]/35 shadow-lg"
      >
        <CornerOrnament position="top-left" size={44} />
        <CornerOrnament position="top-right" size={44} />
        <CornerOrnament position="bottom-left" size={44} />
        <CornerOrnament position="bottom-right" size={44} />
        <div className="royal-inner-border" />

        <div className="relative z-10 text-center max-w-2xl mx-auto py-2 sm:py-4 px-2 sm:px-4">
          {/* Auspicious invocation */}
          <motion.div variants={inCardItem} className="mb-2 text-center">
            <div className="flex flex-col items-center gap-0.5 mb-2">
              {(CEREMONY_DATA.auspiciousInvocations || [CEREMONY_DATA.auspiciousInvocation]).map((text, idx) => (
                <span
                  key={idx}
                  className="font-serif tracking-widest text-[11px] sm:text-xs font-bold text-[#B08D57] uppercase leading-tight"
                >
                  {text}
                </span>
              ))}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3DDE2]/75 border border-[#B08D57]/30 text-[11px] sm:text-xs font-semibold text-[#81532F] shadow-xs">
              <span>A Sacred Namakarana Celebration</span>
            </div>
          </motion.div>

          {/* Sacred Diya / Lotus Emblem */}
          <motion.div variants={inCardItem} className="my-3 flex justify-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-[#FFF5E6] to-[#F3DDE2] border border-[#B08D57]/40 flex items-center justify-center shadow-md p-3">
              <div className="absolute inset-0 rounded-full bg-[#B08D57]/10 animate-ping opacity-25" />
              <svg viewBox="0 0 40 40" className="w-full h-full text-[#81532F]" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Diya Base */}
                <path d="M8 24 C8 32 32 32 32 24 C32 25 28 29 20 29 C12 29 8 25 8 24 Z" fill="#B08D57" />
                <path d="M6 24 C8 33 32 33 34 24 Z" fill="url(#diyaGold)" stroke="#81532F" strokeWidth="1" />
                {/* Diya Flame */}
                <path d="M20 7 C22 13 25 16 25 19 C25 22 22.5 24 20 24 C17.5 24 15 22 15 19 C15 16 18 13 20 7 Z" fill="#F49D37" />
                <path d="M20 12 C21 15 22.5 17 22.5 19 C22.5 20.5 21.5 21.5 20 21.5 C18.5 21.5 17.5 20.5 17.5 19 C17.5 17 19 15 20 12 Z" fill="#FFEC51" />
                <defs>
                  <linearGradient id="diyaGold" x1="6" y1="24" x2="34" y2="33" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C9A76F" />
                    <stop offset="0.5" stopColor="#B08D57" />
                    <stop offset="1" stopColor="#81532F" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Baby Title */}
          <motion.h2
            variants={inCardItem}
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#81532F] tracking-tight mt-1 mb-1 gold-gradient-text"
          >
            {CEREMONY_DATA.babyTitle}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={inCardItem}
            className="font-serif italic text-base sm:text-2xl text-[#B08D57] font-semibold mb-2"
          >
            {CEREMONY_DATA.subtitle}
          </motion.p>

          <motion.div variants={inCardItem}>
            <OrnamentalDivider className="my-2" />
          </motion.div>

          {/* Invitation Note in luxury parchment box */}
          <motion.div
            variants={inCardItem}
            className="my-4 sm:my-6 p-4 sm:p-7 rounded-2xl bg-white/85 border border-[#B08D57]/30 shadow-xs relative text-center"
          >
            <div className="font-serif text-base sm:text-xl text-[#6F5A48] leading-relaxed space-y-3">
              <p>
                With hearts overflowing with joy and gratitude to the Almighty. We,{' '}
                <strong className="font-bold text-[#81532F]">
                  Smt. Amruta Ravikumar Habib &amp; Shri Ravikumar V Habib
                </strong>
                , the happiest parents, cordially invite you to celebrate the auspicious Namakarana Ceremony of our precious little daughter, the greatest blessing of our lives.
              </p>
              <p>
                Your presence, love, and blessings will make this cherished moment even more special as we celebrate the beautiful beginning of her journey.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#81532F]">
              <Heart className="w-3.5 h-3.5 text-[#C58F9C] fill-current" />
              <span>With Love &amp; Blessings, The Habib Family</span>
              <Heart className="w-3.5 h-3.5 text-[#C58F9C] fill-current" />
            </div>
          </motion.div>

          {/* Blessing Button inside first card */}
          <motion.div variants={inCardItem} className="flex justify-center mt-4">
            <BlessingShower />
          </motion.div>

          {/* Prominent Scroll to Explore prompt */}
          <motion.div
            variants={inCardItem}
            className="mt-6 pt-3.5 border-t border-[#B08D57]/20 flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => {
              document.getElementById('brother')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#F3DDE2]/90 via-[#FFF9F3] to-[#F3DDE2]/90 border border-[#B08D57]/40 shadow-xs hover:shadow-md transition-all group-hover:scale-105 active:scale-95">
              <span className="text-xs sm:text-sm font-serif font-bold text-[#81532F]">
                Scroll down for Brother's Wish, Date &amp; Venue
              </span>
              <ChevronDown className="w-4 h-4 text-[#81532F] animate-bounce" />
            </div>
            <p className="text-[11px] text-[#8E7A69] mt-1.5 flex items-center gap-1 font-serif italic">
              <span>🌸</span>
              <span>Tap above or scroll to explore more details</span>
              <span>🌸</span>
            </p>
          </motion.div>
        </div>
      </motion.article>

      <SectionSeparator />

      {/* ── SCREEN 2: Elder Brother ─────────────────────────────────────── */}
      <SectionWrap direction="left">
        <BrotherMessage />
      </SectionWrap>

      <SectionSeparator />

      {/* ── SCREEN 3: Ceremony Date & Countdown ─────────────────────────── */}
      <SectionWrap direction="right">
        <EventDetails />
      </SectionWrap>

      <SectionSeparator />

      {/* ── SCREEN 4: Venue & Directions ─────────────────────────────────── */}
      <SectionWrap direction="right">
        <VenueSection />
      </SectionWrap>

      {/* Floating Blessing Action Button & Cat GIF */}
      <BlessingShower variant="floating" />

      {/* Floating Bottom Scroll Hint Pill — auto-hides once user scrolls */}
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
          >
            <button
              type="button"
              onClick={() => {
                document.getElementById('brother')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 py-2 px-4 rounded-full bg-[#81532F]/95 hover:bg-[#81532F] text-white shadow-xl border border-[#B08D57]/60 backdrop-blur-md active:scale-95 transition-transform"
              aria-label="Scroll down to explore ceremony details"
            >
              <span className="text-xs font-semibold tracking-wide">
                Scroll down to explore
              </span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#F3DDE2]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
