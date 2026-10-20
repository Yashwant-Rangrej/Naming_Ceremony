import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFFAF5]/95 backdrop-blur-md shadow-xs border-b border-[#B08D57]/25 py-2'
          : 'bg-[#FFFAF5]/85 backdrop-blur-xs py-2.5 sm:py-3 border-b border-[#B08D57]/15'
      }`}
      role="banner"
    >
      {/* Golden Reading Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#B08D57] via-[#E8D6B8] to-[#B08D57] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 flex items-center justify-center">
        {/* Brand / Title Header (clean and elegant, no nav links or extra buttons) */}
        <a
          href="#invitation"
          className="flex items-center gap-2 group text-decoration-none"
          aria-label="A Little Princess Naming Ceremony"
        >
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F3DDE2] border border-[#B08D57]/40 flex items-center justify-center text-[#81532F] font-serif font-bold text-xs sm:text-sm shadow-xs group-hover:scale-105 transition-transform">
            🌸
          </span>
          <div className="flex items-center gap-2 text-center">
            <span className="font-serif font-bold text-base sm:text-lg text-[#81532F] leading-tight gold-gradient-text">
              A Little Princess
            </span>
            <span className="text-[#B08D57] text-xs font-serif hidden sm:inline">•</span>
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#B08D57] font-semibold hidden sm:inline">
              Naming Ceremony
            </span>
          </div>
        </a>
      </div>
    </header>
  );
};
