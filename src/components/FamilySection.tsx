import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { CEREMONY_DATA } from '../data/ceremony';
import { Users, Heart } from 'lucide-react';
import { CornerOrnament, OrnamentalDivider } from './FloralDecoration';

export const FamilySection: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { family } = CEREMONY_DATA;
  const prefersReduced = useReducedMotion();

  const hasParents = family.parents && family.parents.length > 0;
  const hasGrandparents = family.grandparents && family.grandparents.length > 0;
  const hasOtherMembers = family.otherMembers && family.otherMembers.length > 0;
  const hasAnyFamilyDetails = hasParents || hasGrandparents || hasOtherMembers;

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
  };

  const up: Variants = prefersReduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 24, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <section id="family" className={`scroll-mt-24 ${className}`} aria-labelledby="family-heading">
      <div className="royal-card-frame bg-gradient-to-b from-[#FFFDFB] via-[#FFF9F3] to-[#FFFDFB] relative overflow-hidden border-[#B08D57]/35 shadow-md">
        <CornerOrnament position="top-left" size={38} />
        <CornerOrnament position="top-right" size={38} />
        <CornerOrnament position="bottom-left" size={38} />
        <CornerOrnament position="bottom-right" size={38} />
        <div className="royal-inner-border" />

        <motion.div
          className="text-center relative z-10 max-w-2xl mx-auto px-2 sm:px-4 py-2"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <motion.div variants={up} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3DDE2]/70 border border-[#B08D57]/30 text-xs text-[#81532F] font-semibold mb-2 shadow-xs">
            <span className="uppercase tracking-widest text-[11px]">Heartfelt Invitation</span>
          </motion.div>

          <motion.h3 variants={up} id="family-heading" className="text-2xl sm:text-4xl font-serif text-[#81532F] font-bold mb-2">
            Family Invitation
          </motion.h3>

          <motion.p variants={up} className="text-xs sm:text-sm text-[#6F5A48] max-w-md mx-auto mb-3 sm:mb-4 leading-relaxed">
            Together with our extended family, we extend our warmest welcome to shower your blessings and share in our heartfelt joy.
          </motion.p>

          <motion.div variants={up}>
            <OrnamentalDivider className="my-2" />
          </motion.div>

          {hasAnyFamilyDetails ? (
            <motion.div variants={stagger} className="space-y-4 sm:space-y-6 my-6 sm:my-8">
              {/* Grandparents */}
              {hasGrandparents && (
                <motion.div
                  variants={up}
                  whileHover={prefersReduced ? {} : { y: -3, transition: { duration: 0.2 } }}
                  className="p-4 rounded-xl bg-white/80 border border-[#B08D57]/25 shadow-xs"
                >
                  <span className="text-xs uppercase tracking-wider text-[#B08D57] font-semibold block mb-2">
                    Grandparents' Blessings
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {family.grandparents.map((name, i) => (
                      <span key={i} className="font-serif text-lg font-semibold text-[#81532F]">
                        {name}
                        {i < family.grandparents.length - 1 && <span className="text-[#B08D57] ml-3">•</span>}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Parents */}
              {hasParents && (
                <motion.div
                  variants={up}
                  whileHover={prefersReduced ? {} : { y: -3, transition: { duration: 0.2 } }}
                  className="p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-[#FFFDFB] to-[#FBF2F4]/90 border border-[#B08D57]/35 shadow-sm text-center"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F3DDE2] mx-auto flex items-center justify-center mb-3 shadow-xs border border-[#B08D57]/20">
                    <Heart className="w-5 h-5 text-[#C58F9C] fill-current" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block mb-2">
                    Cordially Invited By Proud Parents
                  </span>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 my-2">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#81532F] gold-gradient-text">
                      {family.parents[0]}
                    </span>
                    <span className="text-base sm:text-xl font-serif text-[#B08D57] font-semibold">&amp;</span>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#81532F] gold-gradient-text">
                      {family.parents[1]}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6F5A48] mt-3 max-w-md mx-auto leading-relaxed">
                    With the blessings of our elders and almighty grace, we warmly welcome you to celebrate this precious milestone with our family.
                  </p>
                </motion.div>
              )}

              {/* Other Members */}
              {hasOtherMembers && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {family.otherMembers.map((group, idx) => (
                    <motion.div
                      key={idx}
                      variants={up}
                      whileHover={prefersReduced ? {} : { scale: 1.02, transition: { duration: 0.2 } }}
                      className="p-4 rounded-xl bg-white/80 border border-[#B08D57]/25 text-center cursor-default shadow-xs"
                    >
                      <span className="text-xs uppercase tracking-wider text-[#B08D57] font-semibold block mb-1">
                        {group.relationship}
                      </span>
                      <p className="font-serif text-base font-semibold text-[#81532F]">
                        {group.members.join(', ')}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            /* Elegant Family Card */
            <motion.div
              variants={up}
              className="my-5 sm:my-7 p-5 sm:p-7 rounded-2xl bg-white/85 border border-[#B08D57]/30 shadow-xs text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full bg-[#F3DDE2] mx-auto flex items-center justify-center mb-3 shadow-xs border border-[#B08D57]/20">
                <Users className="w-6 h-6 text-[#81532F]" />
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#81532F] mb-1.5 gold-gradient-text">
                The Habib Family
              </h4>
              <p className="text-xs sm:text-sm text-[#6F5A48] max-w-sm mx-auto leading-relaxed">
                {family.placeholderNotice}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#81532F] bg-[#FFFAF5] px-4 py-2 rounded-full border border-[#B08D57]/30 shadow-xs">
                <Heart className="w-3.5 h-3.5 text-[#C58F9C] fill-current" />
                <span className="font-medium">With open arms &amp; joyful hearts</span>
              </div>
            </motion.div>
          )}

          {/* Traditional blessing footer quote */}
          <motion.div variants={up} className="pt-3 border-t border-[#B08D57]/20 text-center">
            <p className="font-serif italic text-xs sm:text-sm text-[#8E7A69]">
              "May her auspicious name echo with laughter, grace, and eternal love."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
