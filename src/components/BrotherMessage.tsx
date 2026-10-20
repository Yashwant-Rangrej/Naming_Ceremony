import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CEREMONY_DATA } from '../data/ceremony';
import { Heart } from 'lucide-react';
import { CornerOrnament, OrnamentalDivider } from './FloralDecoration';

export const BrotherMessage: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { elderBrother } = CEREMONY_DATA;
  const prefersReduced = useReducedMotion();

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.13, delayChildren: 0.05 },
    },
  };

  const item = prefersReduced
    ? {}
    : {
        hidden: { opacity: 0, y: 20, filter: 'blur(2px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <section id="brother" className={`scroll-mt-24 ${className}`} aria-labelledby="brother-heading">
      <div className="royal-card-frame bg-gradient-to-b from-[#FFFDFB] via-[#FBF2F4] to-[#FFFDFB] relative overflow-hidden">
        <CornerOrnament position="top-left" size={40} />
        <CornerOrnament position="top-right" size={40} />
        <CornerOrnament position="bottom-left" size={40} />
        <CornerOrnament position="bottom-right" size={40} />
        <div className="royal-inner-border" />

        {/* Soft blush radial glow — purely decorative depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(243,221,226,0.55) 0%, transparent 65%)',
          }}
        />

        <motion.div
          className="relative z-10 max-w-xl mx-auto text-center px-4 py-2"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Tag */}
          <motion.div variants={item} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3DDE2]/70 border border-[#B08D57]/30 text-xs text-[#81532F] font-medium mb-3">
            <Heart className="w-3.5 h-3.5 text-[#C58F9C] fill-current" />
            <span>Pure Sibling Love</span>
          </motion.div>

          {/* Sub-heading */}
          <motion.h3
            variants={item}
            id="brother-heading"
            className="text-xl sm:text-2xl font-serif text-[#81532F] font-semibold mb-2"
          >
            {elderBrother.roleLabel}
          </motion.h3>

          <motion.div variants={item}>
            <OrnamentalDivider className="my-2" />
          </motion.div>

          {/* Big Name — pops in */}
          <motion.div
            variants={item}
            className="my-4"
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <h4 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#81532F] tracking-wide leading-tight">
              {elderBrother.name}
            </h4>
            <span className="text-xs uppercase tracking-widest text-[#B08D57] font-medium mt-1 block">
              Proud Elder Brother
            </span>
          </motion.div>

          {/* Quote block — slides up last */}
          <motion.div
            variants={item}
            className="relative mt-5 px-6 py-5 rounded-2xl bg-white/70 border border-[#B08D57]/20 shadow-sm"
            whileHover={prefersReduced ? {} : { scale: 1.01, transition: { duration: 0.25 } }}
          >
            <span className="font-serif text-4xl text-[#B08D57]/40 leading-none select-none absolute top-2 left-3">
              "
            </span>
            <p className="font-serif italic text-lg sm:text-xl text-[#6F5A48] leading-relaxed relative z-10 px-3">
              {elderBrother.message}
            </p>
            <span className="font-serif text-4xl text-[#B08D57]/40 leading-none select-none absolute bottom-1 right-3">
              "
            </span>
          </motion.div>

          <motion.p variants={item} className="text-xs text-[#8E7A69] mt-5">
            Looking forward to welcoming you with joy and an eager smile!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
