import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { CEREMONY_DATA } from '../data/ceremony';
import { TraditionalCradle } from './TraditionalCradle';
import { CornerOrnament, HangingToran, OrnamentalDivider } from './FloralDecoration';

interface WelcomeScreenProps {
  onOpenInvitation: () => void;
  isOpen: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onOpenInvitation,
  isOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    onOpenInvitation();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      filter: 'blur(8px)',
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const cradleVariants = {
    hidden: { opacity: 0, scale: 0.88, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-[#FFFAF5] overflow-y-auto"
          role="region"
          aria-label="Welcome Invitation Screen"
        >
          {/* Hanging Toran Garland on top */}
          <div className="absolute top-0 inset-x-0 z-10">
            <HangingToran />
          </div>

          {/* Centered Royal Card */}
          <motion.div
            className="royal-card-frame w-full max-w-xl mx-auto my-auto text-center relative z-20 py-8 sm:py-12 px-6 sm:px-10"
            style={{
              boxShadow: '0 25px 60px -15px rgba(129, 83, 47, 0.2), 0 0 0 1px rgba(176, 141, 87, 0.3)',
            }}
          >
            {/* Corner Ornaments */}
            <CornerOrnament position="top-left" size={44} />
            <CornerOrnament position="top-right" size={44} />
            <CornerOrnament position="bottom-left" size={44} />
            <CornerOrnament position="bottom-right" size={44} />
            <div className="royal-inner-border" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Auspicious Invocation */}
              <motion.div variants={itemVariants} className="mb-2">
                <span className="font-serif tracking-widest text-xs sm:text-sm font-semibold text-[#B08D57] uppercase">
                  {CEREMONY_DATA.auspiciousInvocation}
                </span>
              </motion.div>

              {/* Traditional Cradle Illustration */}
              <motion.div variants={cradleVariants} className="my-2 sm:my-3">
                <TraditionalCradle size={210} />
              </motion.div>

              {/* Main Heading */}
              <motion.div variants={itemVariants} className="space-y-1 my-2">
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#81532F] tracking-tight">
                  {CEREMONY_DATA.babyTitle}
                </h1>
                <p className="font-serif italic text-base sm:text-lg text-[#B08D57] font-medium">
                  {CEREMONY_DATA.subtitle}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="w-full max-w-xs">
                <OrnamentalDivider className="my-3" />
              </motion.div>

              {/* Ceremony Subtext */}
              <motion.div variants={itemVariants} className="mb-5 max-w-md">
                <p className="text-xs sm:text-sm text-[#6F5A48] leading-relaxed">
                  Join Krishnendu Habib and family as we celebrate the auspicious Namakarana ceremony of our little angel.
                </p>
                <div className="flex items-center justify-center gap-2 mt-2 text-xs font-semibold text-[#81532F]">
                  <span>25 October 2026</span>
                  <span>•</span>
                  <span>Bengaluru, India</span>
                </div>
              </motion.div>

              {/* Prominent Invitation Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="button"
                  onClick={handleOpen}
                  disabled={isOpening}
                  className="btn-primary group text-lg sm:text-xl py-3.5 px-8 sm:px-10 shadow-lg relative overflow-hidden"
                  aria-label="Open your naming ceremony invitation"
                >
                  <MailOpen className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>{isOpening ? 'Unfolding Invitation...' : 'Open Your Invitation'}</span>
                </button>
              </motion.div>

              {/* Subtle hint */}
              <motion.p variants={itemVariants} className="text-[11px] text-[#8E7A69] mt-4">
                Click above to reveal the auspicious invitation
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
