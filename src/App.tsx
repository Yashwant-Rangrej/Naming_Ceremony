import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { InvitationReveal } from './components/InvitationReveal';
import { PetalsCanvas } from './components/PetalsCanvas';
import { Navbar } from './components/Navbar';
import { AmbientBackground } from './components/AmbientBackground';

export function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    // Smooth scroll to invitation start
    setTimeout(() => {
      const el = document.getElementById('invitation');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  const handleReopenWelcome = () => {
    setIsInvitationOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // If user presses Escape on desktop and invitation is open, optionally allow viewing welcome
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Home' && isInvitationOpen) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isInvitationOpen]);

  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-[#F3DDE2] selection:text-[#81532F]">
      {/* Ambient drifting background orbs — fixed-position depth layer */}
      <AmbientBackground />

      {/* Gentle Floating Petals Canvas */}
      <PetalsCanvas density={26} />

      {/* Screen 1: Full-Screen Magical Welcome */}
      <WelcomeScreen
        isOpen={isInvitationOpen}
        onOpenInvitation={handleOpenInvitation}
      />

      {/* Header Navigation (Active when invitation is opened) */}
      {isInvitationOpen && (
        <Navbar onReopenWelcome={handleReopenWelcome} />
      )}

      {/* Screen 2-8: Animated Invitation Journey */}
      {isInvitationOpen && (
        <div className="w-full flex flex-col items-center justify-center">
          <InvitationReveal />
        </div>
      )}
    </main>
  );
}

export default App;
