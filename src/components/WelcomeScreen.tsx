import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
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

    // Auspicious blossom explosion when opening!
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F3DDE2', '#C58F9C', '#B08D57', '#E8D6B8', '#FFFFFF'],
    });

    setTimeout(() => {
      onOpenInvitation();
    }, 450);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      filter: 'blur(6px)',
      transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
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
          <div className="absolute top-0 inset-x-0 z-10 pointer-events-none">
            <HangingToran />
          </div>

          {/* Centered Royal Card */}
          <motion.div
            className="royal-card-frame w-full max-w-xl mx-auto my-auto text-center relative z-20 py-6 sm:py-10 px-4 sm:px-8 border-[#B08D57]/35 shadow-xl bg-gradient-to-b from-[#FFFFFF] via-[#FFFDFB] to-[#FFF9F3]"
            style={{
              boxShadow: '0 25px 60px -15px rgba(129, 83, 47, 0.2), 0 0 0 1px rgba(176, 141, 87, 0.3)',
            }}
          >
            {/* Corner Ornaments */}
            <CornerOrnament position="top-left" size={42} />
            <CornerOrnament position="top-right" size={42} />
            <CornerOrnament position="bottom-left" size={42} />
            <CornerOrnament position="bottom-right" size={42} />
            <div className="royal-inner-border" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Auspicious Invocation */}
              <motion.div variants={itemVariants} className="mb-1.5">
                <span className="font-serif tracking-widest text-xs sm:text-sm font-bold text-[#B08D57] uppercase">
                  {CEREMONY_DATA.auspiciousInvocation}
                </span>
              </motion.div>

              {/* Traditional Cradle Illustration */}
              <motion.div variants={itemVariants} className="my-1 sm:my-2">
                <TraditionalCradle size={195} />
                <span className="text-[10px] text-[#B08D57]/80 block font-medium -mt-2">
                  (Tap cradle to gently rock 🌸)
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.div variants={itemVariants} className="space-y-0.5 my-2">
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#81532F] tracking-tight gold-gradient-text leading-tight">
                  {CEREMONY_DATA.babyTitle}
                </h1>
                <p className="font-serif italic text-base sm:text-xl text-[#B08D57] font-semibold">
                  {CEREMONY_DATA.subtitle}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="w-full max-w-xs">
                <OrnamentalDivider className="my-2" />
              </motion.div>

              {/* Ceremony Subtext */}
              <motion.div variants={itemVariants} className="mb-4 max-w-md">
                <p className="text-xs sm:text-sm text-[#6F5A48] leading-relaxed">
                  With immense joy and the blessings of God and grandparents, Smt. Laxmibai Vishwanathsa Habib & Shri Vishwanathsa N Habib, along with our family, cordially invite you to celebrate the auspicious Namakarana ceremony of our beloved little angel.
                </p>
                <div className="inline-flex items-center justify-center gap-2 mt-2.5 px-3 py-1 rounded-full bg-[#F3DDE2]/70 border border-[#B08D57]/30 text-xs font-semibold text-[#81532F]">
                  <span>Sunday, 25 October 2026</span>
                  <span>•</span>
                  <span>Bengaluru, India</span>
                </div>
              </motion.div>

              {/* Prominent Invitation Button */}
              <motion.div variants={itemVariants} className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleOpen}
                  disabled={isOpening}
                  className="btn-primary group w-full sm:w-auto text-base sm:text-xl py-3.5 px-8 sm:px-10 shadow-lg relative overflow-hidden active:scale-95 transition-transform"
                  aria-label="Open your naming ceremony invitation"
                >
                  <MailOpen className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>{isOpening ? 'Unfolding Invitation...' : 'Open Your Invitation'}</span>
                </button>
              </motion.div>

              {/* Subtle hint */}
              <motion.p variants={itemVariants} className="text-[11px] text-[#8E7A69] mt-3 flex items-center gap-1 font-medium">
                <Heart className="w-3 h-3 text-[#C58F9C] fill-current" />
                <span>Tap above to unfold the sacred ceremony invitation</span>
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
