// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { useState, useCallback, useEffect, useRef } from 'react';

export type SoundEffect = 'correct' | 'wrong' | 'win' | 'click' | 'coin' | 'drop';

const frequencies: Record<SoundEffect, number[][]> = {
  correct: [[523, 0.1], [659, 0.1], [784, 0.15]],
  wrong:   [[300, 0.1], [250, 0.2]],
  win:     [[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.3]],
  click:   [[600, 0.05]],
  coin:    [[880, 0.05], [1108, 0.08]],
  drop:    [[400, 0.05], [500, 0.08]],
};

// Module-level state — shared across all hook instances
let ctx: AudioContext | null = null;
let audioUnlocked = false;
const unlockCallbacks: (() => void)[] = [];

/**
 * iOS Safari rule: AudioContext MUST be both created AND resumed
 * synchronously inside a direct user-gesture event handler.
 * Calling this from a touchend/click handler satisfies that requirement.
 */
export function unlockAudioContext(): void {
  if (audioUnlocked) return;
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    // Create the context INSIDE the gesture (critical for iOS)
    if (!ctx) ctx = new AC();

    // Resume synchronously within the gesture handler
    ctx.resume();

    // Play a zero-duration silent buffer — required to fully unlock iOS Safari
    const buf = ctx.createBuffer(1, 1, ctx.sampleRate);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);

    audioUnlocked = true;
    // Notify any listeners waiting for unlock
    unlockCallbacks.forEach(cb => cb());
    unlockCallbacks.length = 0;
  } catch { /* ignore */ }
}

function playNotes(effect: SoundEffect): void {
  if (!ctx) return;
  try {
    const notes = frequencies[effect];
    let time = ctx.currentTime;
    notes.forEach(([freq, dur]) => {
      const osc  = ctx!.createOscillator();
      const gain = ctx!.createGain();
      osc.connect(gain);
      gain.connect(ctx!.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
      osc.start(time);
      osc.stop(time + dur);
      time += dur * 0.8;
    });
  } catch { /* ignore */ }
}

export function useSound() {
  const [enabled, setEnabled] = useState(() => localStorage.getItem('eco_sound') !== 'off');
  const [unlocked, setUnlocked] = useState(audioUnlocked);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    if (audioUnlocked) { setUnlocked(true); return; }
    const cb = () => setUnlocked(true);
    unlockCallbacks.push(cb);
    return () => {
      const i = unlockCallbacks.indexOf(cb);
      if (i >= 0) unlockCallbacks.splice(i, 1);
    };
  }, []);

  const play = useCallback((effect: SoundEffect) => {
    if (!enabledRef.current || !audioUnlocked || !ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => playNotes(effect));
    } else {
      playNotes(effect);
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      localStorage.setItem('eco_sound', next ? 'on' : 'off');
      return next;
    });
  }, []);

  return { play, enabled, toggle, unlocked };
}
