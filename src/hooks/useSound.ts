// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { useState, useCallback, useRef, useEffect } from 'react';

type SoundEffect = 'correct' | 'wrong' | 'win' | 'click' | 'coin' | 'drop';

const frequencies: Record<SoundEffect, number[][]> = {
  correct: [[523, 0.1], [659, 0.1], [784, 0.15]],
  wrong:   [[300, 0.1], [250, 0.2]],
  win:     [[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.3]],
  click:   [[600, 0.05]],
  coin:    [[880, 0.05], [1108, 0.08]],
  drop:    [[400, 0.05], [500, 0.08]],
};

// Singleton AudioContext shared across all hook instances
let sharedCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!sharedCtx) {
    sharedCtx = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    )();
  }
  return sharedCtx;
}

// Resume the AudioContext on the first user interaction.
// Mobile browsers suspend it by default and require a gesture to unlock it.
function unlockAudio() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    // Play a silent buffer to fully unlock audio on iOS Safari
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
  } catch { /* ignore */ }
}

export function useSound() {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem('eco_sound') !== 'off';
  });
  const unlockedRef = useRef(false);

  // Attach a one-time listener to the first touch/click anywhere on the page.
  // This is the only reliable way to unlock audio on iOS and Android.
  useEffect(() => {
    if (unlockedRef.current) return;

    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      unlockAudio();
      window.removeEventListener('touchstart', unlock, true);
      window.removeEventListener('touchend',   unlock, true);
      window.removeEventListener('pointerdown', unlock, true);
      window.removeEventListener('click',       unlock, true);
    };

    window.addEventListener('touchstart',  unlock, { capture: true, passive: true });
    window.addEventListener('touchend',    unlock, { capture: true, passive: true });
    window.addEventListener('pointerdown', unlock, { capture: true, passive: true });
    window.addEventListener('click',       unlock, { capture: true, passive: true });

    return () => {
      window.removeEventListener('touchstart',  unlock, true);
      window.removeEventListener('touchend',    unlock, true);
      window.removeEventListener('pointerdown', unlock, true);
      window.removeEventListener('click',       unlock, true);
    };
  }, []);

  const play = useCallback((effect: SoundEffect) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();

      // Resume if suspended (Android Chrome sometimes suspends again)
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => playNotes(ctx, effect));
        return;
      }

      playNotes(ctx, effect);
    } catch { /* ignore audio errors */ }
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      localStorage.setItem('eco_sound', next ? 'on' : 'off');
      return next;
    });
  }, []);

  return { play, enabled, toggle };
}

function playNotes(ctx: AudioContext, effect: SoundEffect) {
  const notes = frequencies[effect];
  let time = ctx.currentTime;
  notes.forEach(([freq, dur]) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.start(time);
    osc.stop(time + dur);
    time += dur * 0.8;
  });
}
