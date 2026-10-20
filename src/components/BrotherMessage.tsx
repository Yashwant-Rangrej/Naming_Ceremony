import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { CEREMONY_DATA } from '../data/ceremony';
import { Heart } from 'lucide-react';
import { CornerOrnament, OrnamentalDivider } from './FloralDecoration';

export const BrotherMessage: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { elderBrother } = CEREMONY_DATA;
  const prefersReduced = useReducedMotion();

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const item: Variants = prefersReduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 18, filter: 'blur(2px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <section id="brother" className={`scroll-mt-24 ${className}`} aria-labelledby="brother-heading">
      <div className="royal-card-frame bg-gradient-to-b from-[#FFFDFB] via-[#FDF3F5] to-[#FFFDFB] relative overflow-hidden border-[#B08D57]/35 shadow-md">
        <CornerOrnament position="top-left" size={38} />
        <CornerOrnament position="top-right" size={38} />
        <CornerOrnament position="bottom-left" size={38} />
        <CornerOrnament position="bottom-right" size={38} />
        <div className="royal-inner-border" />

        {/* Soft blush radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 10%, rgba(243,221,226,0.65) 0%, transparent 70%)',
          }}
        />

        <motion.div
          className="relative z-10 max-w-xl mx-auto text-center px-2 sm:px-4 py-2"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {/* Tag */}
          <motion.div variants={item} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3DDE2]/80 border border-[#B08D57]/35 text-xs text-[#81532F] font-semibold mb-2.5 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-[#C58F9C] fill-current animate-pulse" />
            <span>Pure Sibling Love</span>
          </motion.div>

          {/* Sub-heading */}
          <motion.h3
            variants={item}
            id="brother-heading"
            className="text-lg sm:text-2xl font-serif text-[#81532F] font-semibold mb-1"
          >
            {elderBrother.roleLabel}
          </motion.h3>

          <motion.div variants={item}>
            <OrnamentalDivider className="my-2" />
          </motion.div>

          {/* Big Name */}
          <motion.div
            variants={item}
            className="my-3 sm:my-4"
          >
            <div className="inline-block relative">
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#81532F] tracking-wide leading-tight gold-gradient-text">
                {elderBrother.name}
              </h4>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="h-px w-6 bg-[#B08D57]/40" />
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
                  Proud Elder Brother
                </span>
                <span className="h-px w-6 bg-[#B08D57]/40" />
              </div>
            </div>
          </motion.div>

          {/* Quote block */}
          <motion.div
            variants={item}
            className="relative mt-4 px-5 sm:px-8 py-5 rounded-2xl bg-white/85 border border-[#B08D57]/30 shadow-sm backdrop-blur-xs"
            whileHover={prefersReduced ? {} : { scale: 1.01, transition: { duration: 0.25 } }}
          >
            <span className="font-serif text-4xl sm:text-5xl text-[#B08D57]/35 leading-none select-none absolute top-2 left-3">
              “
            </span>
            <p className="font-serif italic text-base sm:text-xl text-[#6F5A48] leading-relaxed relative z-10 px-2 sm:px-4">
              {elderBrother.message}
            </p>
            <span className="font-serif text-4xl sm:text-5xl text-[#B08D57]/35 leading-none select-none absolute bottom-1 right-3">
              ”
            </span>
          </motion.div>

          <motion.p variants={item} className="text-xs sm:text-sm text-[#8E7A69] mt-4 flex items-center justify-center gap-1.5 font-medium">
            <span>🌸</span>
            <span>Looking forward to welcoming you with joy and an eager smile!</span>
            <span>🌸</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
