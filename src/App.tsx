import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { InvitationReveal } from './components/InvitationReveal';
import { PetalsCanvas } from './components/PetalsCanvas';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';

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

  useEffect(() => {
    // If user presses Home or Escape, allow scrolling to top
    const handleKey = (e: KeyboardEvent) => {
      if ((e.key === 'Home' || e.key === 'Escape') && isInvitationOpen) {
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

      {/* Header Bar */}
      {isInvitationOpen && <Navbar />}

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
