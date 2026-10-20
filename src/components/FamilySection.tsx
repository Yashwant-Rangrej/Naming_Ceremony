import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CEREMONY_DATA } from '../data/ceremony';
import { Users, Heart } from 'lucide-react';
import { OrnamentalDivider } from './FloralDecoration';

export const FamilySection: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { family } = CEREMONY_DATA;
  const prefersReduced = useReducedMotion();

  const hasParents = family.parents && family.parents.length > 0;
  const hasGrandparents = family.grandparents && family.grandparents.length > 0;
  const hasOtherMembers = family.otherMembers && family.otherMembers.length > 0;
  const hasAnyFamilyDetails = hasParents || hasGrandparents || hasOtherMembers;

  /* Stagger parent variants */
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
  };

  const up = prefersReduced
    ? {}
    : {
        hidden: { opacity: 0, y: 26, scale: 0.97 },
        visible: {
          opacity: 1, y: 0, scale: 1,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <section id="family" className={`scroll-mt-24 ${className}`} aria-labelledby="family-heading">
      <div className="royal-card-frame">
        <div className="royal-inner-border" />

        <motion.div
          className="text-center relative z-10 max-w-2xl mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.span variants={up} className="text-xs font-semibold tracking-widest uppercase text-[#B08D57] block mb-1">
            A Warm Welcome to All
          </motion.span>

          <motion.h3 variants={up} id="family-heading" className="text-3xl sm:text-4xl font-serif text-[#81532F] font-bold mb-2">
            Family Invitation
          </motion.h3>

          <motion.p variants={up} className="text-sm text-[#6F5A48] max-w-md mx-auto mb-4">
            Together with our extended family, we extend a warm welcome to all to shower your blessings and share in our joy.
          </motion.p>

          <motion.div variants={up}>
            <OrnamentalDivider className="my-2" />
          </motion.div>

          {hasAnyFamilyDetails ? (
            <motion.div variants={stagger} className="space-y-6 my-8">
              {/* Grandparents */}
              {hasGrandparents && (
                <motion.div
                  variants={up}
                  whileHover={prefersReduced ? {} : { y: -3, transition: { duration: 0.2 } }}
                  className="p-4 rounded-xl bg-white/70 border border-[#B08D57]/20"
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
                  className="p-5 rounded-xl bg-[#FBF2F4]/70 border border-[#B08D57]/30"
                >
                  <span className="text-xs uppercase tracking-wider text-[#B08D57] font-semibold block mb-2">
                    Cordially Invited By Proud Parents
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {family.parents.map((name, i) => (
                      <span key={i} className="font-serif text-xl sm:text-2xl font-bold text-[#81532F]">
                        {name}
                        {i < family.parents.length - 1 && <span className="text-[#B08D57] ml-3">&</span>}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Other Members */}
              {hasOtherMembers && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {family.otherMembers.map((group, idx) => (
                    <motion.div
                      key={idx}
                      variants={up}
                      whileHover={prefersReduced ? {} : { scale: 1.02, transition: { duration: 0.2 } }}
                      className="p-4 rounded-xl bg-white/70 border border-[#B08D57]/20 text-center cursor-default"
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
            /* Neutral placeholder */
            <motion.div
              variants={up}
              className="my-8 p-6 rounded-2xl bg-white/60 border border-[#B08D57]/25 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#F3DDE2] mx-auto flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-[#81532F]" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-[#81532F] mb-1">The Habib Family</h4>
              <p className="text-sm text-[#6F5A48] max-w-sm mx-auto">{family.placeholderNotice}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#8E7A69] bg-[#FFFAF5] px-3.5 py-1.5 rounded-full border border-[#B08D57]/20">
                <Heart className="w-3.5 h-3.5 text-[#C58F9C] fill-current" />
                <span>A warm welcome to all with open arms and joyful hearts</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
