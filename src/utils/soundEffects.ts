/**
 * Synthesizes an authentic party popper / confetti blaster sound effect
 * using the Web Audio API.
 * Features a sharp explosive crack transient, compressed-air punch, and rushing air whoosh.
 * Clean, realistic, and non-musical (no cartoonish sweeps).
 */
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

export function playBlasterSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Master volume node
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.75, now);
    master.connect(ctx.destination);

    // 1. SHARP INITIAL CRACK / POP (Acoustic rupture snap)
    const snapLen = Math.floor(ctx.sampleRate * 0.035); // 35ms
    const snapBuf = ctx.createBuffer(1, snapLen, ctx.sampleRate);
    const snapData = snapBuf.getChannelData(0);
    for (let i = 0; i < snapLen; i++) {
      // Extremely sharp impulse spike with rapid exponential falloff
      snapData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / snapLen, 6);
    }
    const snapSource = ctx.createBufferSource();
    snapSource.buffer = snapBuf;

    const snapFilter = ctx.createBiquadFilter();
    snapFilter.type = 'highpass';
    snapFilter.frequency.setValueAtTime(1400, now);

    const snapGain = ctx.createGain();
    snapGain.gain.setValueAtTime(0.9, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    snapSource.connect(snapFilter);
    snapFilter.connect(snapGain);
    snapGain.connect(master);
    snapSource.start(now);

    // 2. COMPRESSED AIR CANNON THUMP (Deep acoustic pressure punch)
    const thump = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(160, now);
    thump.frequency.exponentialRampToValueAtTime(35, now + 0.075);

    thumpGain.gain.setValueAtTime(1.0, now);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    thump.connect(thumpGain);
    thumpGain.connect(master);
    thump.start(now);
    thump.stop(now + 0.085);

    // 3. AIR BLAST & CONFETTI EXPANSION ("PSHHH" air rush)
    const blastLen = Math.floor(ctx.sampleRate * 0.28); // 280ms
    const blastBuf = ctx.createBuffer(1, blastLen, ctx.sampleRate);
    const blastData = blastBuf.getChannelData(0);
    for (let i = 0; i < blastLen; i++) {
      const envelope = Math.exp(-i / (ctx.sampleRate * 0.065));
      blastData[i] = (Math.random() * 2 - 1) * envelope;
    }
    const blastSource = ctx.createBufferSource();
    blastSource.buffer = blastBuf;

    const blastFilter = ctx.createBiquadFilter();
    blastFilter.type = 'lowpass';
    blastFilter.frequency.setValueAtTime(4200, now);
    blastFilter.frequency.exponentialRampToValueAtTime(500, now + 0.24);
    blastFilter.Q.setValueAtTime(1.2, now);

    const blastGain = ctx.createGain();
    blastGain.gain.setValueAtTime(0.7, now + 0.005);
    blastGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

    blastSource.connect(blastFilter);
    blastFilter.connect(blastGain);
    blastGain.connect(master);
    blastSource.start(now + 0.003);
  } catch {
    // Ignore audio error if user has disabled audio
  }
}
