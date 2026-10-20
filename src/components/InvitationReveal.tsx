import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CEREMONY_DATA } from '../data/ceremony';
import { CornerOrnament, HangingToran, OrnamentalDivider } from './FloralDecoration';
import { BrotherMessage } from './BrotherMessage';
import { EventDetails } from './EventDetails';
import { FamilySection } from './FamilySection';
import { VenueSection } from './VenueSection';
import { BlessingShower } from './BlessingShower';
import { TraditionalCradle } from './TraditionalCradle';
import { ScrollReveal } from './ScrollReveal';

interface InvitationRevealProps {
  className?: string;
}

/**
 * Reusable staggered section wrapper — each child slides up with a blur-to-clear
 * entrance, giving the page a living, breathing feeling on mobile scroll.
 */
const SectionWrap: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
}> = ({ children, className = 'mb-10 sm:mb-14', direction = 'up', delay = 0 }) => (
  <ScrollReveal direction={direction} delay={delay} className={className}>
    {children}
  </ScrollReveal>
);

export const InvitationReveal: React.FC<InvitationRevealProps> = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  const cardEntrance = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const inCardItem = {
    hidden: { opacity: 0, y: 22, filter: 'blur(2px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  /* Separator between sections — a visual "breath" that makes sections feel distinct */
  const SectionSeparator = () => (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="h-px my-2 mx-auto max-w-xs origin-center"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, #B08D57 30%, #E8D6B8 50%, #B08D57 70%, transparent 100%)',
      }}
    />
  );

  return (
    <div className={`relative w-full max-w-4xl mx-auto px-3 sm:px-6 pt-28 sm:pt-24 pb-20 ${className}`}>

      {/* Hanging Toran Garland — slides down on entry */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <HangingToran className="mb-6" />
      </motion.div>

      {/* ── SCREEN 2: Main Royal Invitation Card ───────────────────────── */}
      <motion.article
        id="invitation"
        variants={prefersReducedMotion ? {} : cardEntrance}
        initial="hidden"
        animate="visible"
        className="royal-card-frame relative mb-10 sm:mb-14"
      >
        <CornerOrnament position="top-left" size={56} />
        <CornerOrnament position="top-right" size={56} />
        <CornerOrnament position="bottom-left" size={56} />
        <CornerOrnament position="bottom-right" size={56} />
        <div className="royal-inner-border" />

        <div className="relative z-10 text-center max-w-2xl mx-auto py-4">
          {/* Auspicious invocation */}
          <motion.div variants={inCardItem} className="mb-3">
            <span className="font-serif tracking-widest text-xs sm:text-sm font-semibold text-[#B08D57] uppercase block mb-1">
              {CEREMONY_DATA.auspiciousInvocation}
            </span>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3DDE2]/70 border border-[#B08D57]/30 text-xs font-semibold text-[#81532F]">
              <span className="text-[#B08D57] text-[10px]">✦</span>
              <span>With Love and Blessings</span>
              <span className="text-[#B08D57] text-[10px]">✦</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={inCardItem}
            className="text-4xl sm:text-6xl font-serif font-bold text-[#81532F] tracking-tight mt-2 mb-1"
          >
            {CEREMONY_DATA.babyTitle}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={inCardItem}
            className="font-serif italic text-lg sm:text-2xl text-[#B08D57] font-medium mb-3"
          >
            {CEREMONY_DATA.subtitle}
          </motion.p>

          <motion.div variants={inCardItem}>
            <OrnamentalDivider className="my-3" />
          </motion.div>

          {/* Cradle — gentle scale pop */}
          <motion.div
            variants={inCardItem}
            className="my-4 flex justify-center"
          >
            <TraditionalCradle size={160} />
          </motion.div>

          {/* Introduction text */}
          <motion.div variants={inCardItem} className="my-6 px-4 sm:px-8">
            <p className="font-serif text-lg sm:text-xl text-[#6F5A48] leading-relaxed">
              {CEREMONY_DATA.invitationNote}
            </p>
          </motion.div>

          <motion.div variants={inCardItem} className="flex justify-center mt-6">
            <BlessingShower />
          </motion.div>
        </div>
      </motion.article>

      <SectionSeparator />

      {/* ── SCREEN 3: Elder Brother ─────────────────────────────────────── */}
      <SectionWrap direction="left">
        <BrotherMessage />
      </SectionWrap>

      <SectionSeparator />

      {/* ── SCREEN 5: Ceremony Date & Countdown ─────────────────────────── */}
      <SectionWrap direction="right">
        <EventDetails />
      </SectionWrap>

      {/* ── SCREEN 4: Venue ─────────────────────────────────────────────── */}
      <SectionWrap direction="right">
        <VenueSection />
      </SectionWrap>

      <SectionSeparator />

      {/* ── SCREEN 5: Family Invitation (Last Screen) ────────────────────── */}
      <SectionWrap direction="up" delay={0.05}>
        <FamilySection />
      </SectionWrap>

      {/* Floating Blessing Button */}
      <BlessingShower variant="floating" />
    </div>
  );
};
