// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { useState, useCallback, useEffect } from 'react';

export type SoundEffect = 'correct' | 'wrong' | 'win' | 'click' | 'coin' | 'drop';

// ─── WAV Generator ────────────────────────────────────────────────────────────
const SAMPLE_RATE = 22050;

function buildWav(notes: [number, number][]): string {
  // Calculate total samples needed
  let totalSamples = 0;
  notes.forEach(([, dur]) => { totalSamples += Math.ceil(SAMPLE_RATE * dur); });

  const buffer = new ArrayBuffer(44 + totalSamples * 2);
  const view   = new DataView(buffer);

  // WAV header
  const str = (off: number, s: string) => { for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i)); };
  str(0, 'RIFF');
  view.setUint32(4,  36 + totalSamples * 2, true);
  str(8, 'WAVE');
  str(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20,  1, true); // PCM
  view.setUint16(22,  1, true); // mono
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, SAMPLE_RATE * 2, true);
  view.setUint16(32,  2, true);
  view.setUint16(34, 16, true);
  str(36, 'data');
  view.setUint32(40, totalSamples * 2, true);

  // PCM samples — each note in sequence with a small fade
  let offset = 44;
  notes.forEach(([freq, dur]) => {
    const n = Math.ceil(SAMPLE_RATE * dur);
    for (let i = 0; i < n; i++) {
      const t        = i / SAMPLE_RATE;
      const attack   = Math.min(1, t / 0.008);
      const decay    = Math.max(0, 1 - t / dur);
      const envelope = attack * decay;
      const sample   = Math.sin(2 * Math.PI * freq * t) * envelope * 0.45 * 32767;
      view.setInt16(offset, Math.round(sample), true);
      offset += 2;
    }
  });

  // Convert to base64 data URI
  const bytes  = new Uint8Array(buffer);
  let binary   = '';
  // Process in chunks to avoid stack overflow on large buffers
  const CHUNK  = 8192;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return 'data:audio/wav;base64,' + btoa(binary);
}

// ─── Sound definitions ────────────────────────────────────────────────────────
const SOUND_NOTES: Record<SoundEffect, [number, number][]> = {
  correct: [[523, 0.1], [659, 0.1], [784, 0.15]],
  wrong:   [[300, 0.12], [220, 0.18]],
  win:     [[523, 0.09], [659, 0.09], [784, 0.09], [1047, 0.28]],
  click:   [[700, 0.06]],
  coin:    [[880, 0.06], [1108, 0.1]],
  drop:    [[420, 0.06], [520, 0.09]],
};

// ─── Module-level state ───────────────────────────────────────────────────────
type AudioPool = Record<SoundEffect, HTMLAudioElement>;

let pool: AudioPool | null = null;
let unlocked = false;
const pendingCallbacks: (() => void)[] = [];

function getPool(): AudioPool {
  if (!pool) {
    const entries = Object.entries(SOUND_NOTES).map(([key, notes]) => {
      const uri = buildWav(notes);
      const el  = new Audio(uri);
      el.preload = 'none';  // don't auto-load; we'll trigger on unlock
      return [key, el];
    });
    pool = Object.fromEntries(entries) as AudioPool;
  }
  return pool;
}

/**
 * Must be called synchronously inside a user-gesture handler.
 * Plays a silent frame on every Audio element to satisfy iOS autoplay policy.
 */
export function unlockAudio(): void {
  if (unlocked) return;
  const p = getPool();
  let pending = Object.keys(p).length;
  const done = () => { if (--pending === 0) { unlocked = true; pendingCallbacks.forEach(cb => cb()); pendingCallbacks.length = 0; } };
  (Object.values(p) as HTMLAudioElement[]).forEach(el => {
    const pr = el.play();
    if (pr) {
      pr.then(() => { el.pause(); el.currentTime = 0; done(); }).catch(done);
    } else {
      el.pause(); el.currentTime = 0; done();
    }
  });
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useSound() {
  const [enabled, setEnabled]   = useState(() => localStorage.getItem('eco_sound') !== 'off');
  const [isUnlocked, setUnlocked] = useState(unlocked);

  useEffect(() => {
    if (unlocked) { setUnlocked(true); return; }
    const cb = () => setUnlocked(true);
    pendingCallbacks.push(cb);
    return () => { const i = pendingCallbacks.indexOf(cb); if (i >= 0) pendingCallbacks.splice(i, 1); };
  }, []);

  const play = useCallback((effect: SoundEffect) => {
    if (!enabled || !unlocked) return;
    try {
      const el = getPool()[effect];
      el.currentTime = 0;
      el.play().catch(() => {});
    } catch { /* ignore */ }
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      localStorage.setItem('eco_sound', next ? 'on' : 'off');
      return next;
    });
  }, []);

  return { play, enabled, toggle, isUnlocked };
}
