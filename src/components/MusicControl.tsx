import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { CEREMONY_DATA } from '../data/ceremony';

/**
 * Optional Background Music Component
 * Strictly respects user choice: never autoplays, requires explicit click.
 * Plays configured audio file if available, or a serene gentle synthesized tanpura ambient tone via Web Audio.
 */
export const MusicControl: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthNodesRef = useRef<{
    ctx: AudioContext;
    oscillators: OscillatorNode[];
    gain: GainNode;
  } | null>(null);

  const audioUrl = CEREMONY_DATA.music.audioUrl;

  const startSynthesizedMelody = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      // Gentle, low background volume
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);

      // Auspicious traditional Indian Sa-Pa meditative tanpura frequencies (C# base: 138.59 Hz, 207.65 Hz, 277.18 Hz)
      const frequencies = [138.59, 207.65, 277.18, 554.37];
      const oscillators = frequencies.map((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Gentle vibrato / beating
        const subGain = ctx.createGain();
        subGain.gain.value = 0.25;
        osc.connect(subGain);
        subGain.connect(masterGain);
        osc.start();
        return osc;
      });

      synthNodesRef.current = {
        ctx,
        oscillators,
        gain: masterGain,
      };
    } catch {
      // Graceful fallback
    }
  };

  const stopSynthesizedMelody = () => {
    if (synthNodesRef.current) {
      try {
        const { ctx, oscillators, gain } = synthNodesRef.current;
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          oscillators.forEach((osc) => osc.stop());
          ctx.close();
          synthNodesRef.current = null;
        }, 850);
      } catch {
        synthNodesRef.current = null;
      }
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynthesizedMelody();
      setIsPlaying(false);
    } else {
      if (audioUrl) {
        if (!audioRef.current) {
          const audio = new Audio(audioUrl);
          audio.loop = true;
          audio.volume = 0.4;
          audioRef.current = audio;
        }
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If file playback fails, fallback to synth tone
            startSynthesizedMelody();
            setIsPlaying(true);
          });
      } else {
        // Serene ambient tone
        startSynthesizedMelody();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynthesizedMelody();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleMusic}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
        isPlaying
          ? 'bg-[#B08D57] text-[#FFFAF5] border-[#B08D57] shadow-md scale-105'
          : 'bg-[#FFFAF5]/90 text-[#81532F] border-[#B08D57]/40 hover:border-[#B08D57] hover:bg-[#F3DDE2]/60'
      } ${className}`}
      aria-label={isPlaying ? "Pause background music" : "Play gentle auspicious music"}
      title={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-white animate-pulse" />
          <span className="hidden sm:inline">Playing Melody</span>
          <span className="flex gap-0.5 items-end h-3 ml-0.5">
            <span className="w-0.5 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-[#81532F]" />
          <span className="hidden sm:inline">Music</span>
          <Music className="w-3.5 h-3.5 sm:hidden" />
        </>
      )}
    </button>
  );
};
