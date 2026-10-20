import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CEREMONY_DATA } from '../data/ceremony';
import { OrnamentalDivider } from './FloralDecoration';
import { Heart } from 'lucide-react';

export const ClosingSection: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { closing } = CEREMONY_DATA;
  const prefersReduced = useReducedMotion();

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
  };

  const item = prefersReduced
    ? {}
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
      };

  const heartPulse = prefersReduced
    ? {}
    : {
        scale: [1, 1.18, 1],
        transition: { repeat: Infinity, repeatType: 'loop' as const, duration: 1.5, ease: 'easeInOut' },
      };

  return (
    <footer className={`mt-16 text-center ${className}`} role="contentinfo">
      <div className="royal-card-frame bg-gradient-to-b from-[#FFFDFB] via-[#FBF2F4] to-[#FFFDFB] max-w-2xl mx-auto py-10 px-6 sm:px-12 overflow-hidden relative">
        <div className="royal-inner-border" />

        {/* Radial warm glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(243,221,226,0.45) 0%, transparent 70%)' }}
        />

        <motion.div
          className="relative z-10"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Pulsing Heart */}
          <motion.div
            animate={heartPulse}
            className="w-10 h-10 rounded-full bg-[#F3DDE2] mx-auto flex items-center justify-center mb-4"
          >
            <Heart className="w-5 h-5 text-[#C58F9C] fill-current" />
          </motion.div>

          <motion.h3 variants={item} className="font-serif text-2xl sm:text-3xl font-bold text-[#81532F] mb-2">
            {closing.title}
          </motion.h3>

          <motion.div variants={item}>
            <OrnamentalDivider className="my-3" />
          </motion.div>

          <motion.p
            variants={item}
            className="font-serif italic text-lg sm:text-xl text-[#6F5A48] max-w-lg mx-auto leading-relaxed my-4"
          >
            "{closing.message}"
          </motion.p>

          <motion.div variants={item} className="mt-6 pt-4 border-t border-[#B08D57]/20">
            <p className="font-serif text-lg font-bold text-[#81532F] whitespace-pre-line leading-relaxed">
              {closing.signature}
            </p>
            <p className="text-xs text-[#8E7A69] mt-2 flex items-center justify-center gap-1.5">
              <span>Bengaluru, India • 25 October 2026</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="py-6 text-xs text-[#8E7A69]/80"
      >
        <p>Auspicious Namakarana Digital Invitation</p>
      </motion.div>
    </footer>
  );
};
