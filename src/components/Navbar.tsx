import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  onReopenWelcome?: () => void;
}

const NAV_ITEMS = [
  { id: 'invitation', label: 'Invitation', short: 'Invite' },
  { id: 'brother', label: 'Elder Brother', short: 'Brother' },
  { id: 'ceremony', label: 'Ceremony', short: 'Muhurtham' },
  { id: 'venue', label: 'Venue', short: 'Venue' },
  { id: 'family', label: 'Family', short: 'Family' },
];

export const Navbar: React.FC<NavbarProps> = ({ onReopenWelcome }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('invitation');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
      setScrolled(window.scrollY > 30);

      // Track active section for mobile & desktop navigation highlighting
      const scrollPos = window.scrollY + 140;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerShowerBlessings = () => {
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.2 },
      colors: ['#F3DDE2', '#C58F9C', '#B08D57', '#E8D6B8'],
    });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFFAF5]/95 backdrop-blur-md shadow-sm border-b border-[#B08D57]/20 py-2 sm:py-2.5'
          : 'bg-[#FFFAF5]/80 backdrop-blur-xs py-3 sm:py-4'
      }`}
      role="banner"
    >
      {/* Golden Reading Progress Bar at the very top */}
      <div
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#B08D57] via-[#E8D6B8] to-[#B08D57] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-3 sm:px-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#invitation"
          className="flex items-center gap-2 group text-decoration-none shrink-0"
          aria-label="Scroll to top of invitation"
        >
          <span className="w-8 h-8 rounded-full bg-[#F3DDE2] border border-[#B08D57]/40 flex items-center justify-center text-[#81532F] font-serif font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
            🌸
          </span>
          <div className="flex flex-col text-left">
            <span className="font-serif font-bold text-base sm:text-lg text-[#81532F] leading-tight">
              A Little Princess
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-medium hidden sm:inline">
              Naming Ceremony
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links — completely unchanged for laptop */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-[#6F5A48]" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition-colors py-1 ${
                activeSection === item.id
                  ? 'text-[#81532F] font-bold border-b-2 border-[#B08D57]'
                  : 'hover:text-[#81532F]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Shower Blessings Quick Button */}
          <button
            type="button"
            onClick={triggerShowerBlessings}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium bg-[#F3DDE2] text-[#81532F] border border-[#B08D57]/30 hover:bg-[#B08D57] hover:text-white transition-all shadow-xs"
            aria-label="Shower flower blessings"
            title="Shower flower blessings"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Blessings</span>
          </button>

          {/* Re-view welcome screen (desktop) */}
          {onReopenWelcome && (
            <button
              type="button"
              onClick={onReopenWelcome}
              className="hidden lg:inline-flex items-center text-[11px] text-[#8E7A69] hover:text-[#81532F] px-2.5 py-1 rounded-full border border-[#B08D57]/20 transition-colors"
              title="Return to the cover welcome screen"
            >
              <span>Cover</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Mobile Chapter Pills Bar — gives mobile users an app-like feel instead of scrolling a flat PDF */}
      <div className="md:hidden mt-2 pt-2 border-t border-[#B08D57]/15 px-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max pb-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#81532F] text-white border-[#81532F] shadow-xs'
                    : 'bg-white/80 text-[#6F5A48] border-[#B08D57]/25 hover:border-[#B08D57]/50'
                }`}
              >
                {item.short}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};
