// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { useState, useCallback, useRef } from 'react';

type SoundEffect = 'correct' | 'wrong' | 'win' | 'click' | 'coin' | 'drop';

const frequencies: Record<SoundEffect, number[][]> = {
  correct:  [[523, 0.1], [659, 0.1], [784, 0.15]],
  wrong:    [[300, 0.1], [250, 0.2]],
  win:      [[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.3]],
  click:    [[600, 0.05]],
  coin:     [[880, 0.05], [1108, 0.08]],
  drop:     [[400, 0.05], [500, 0.08]],
};

export function useSound() {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem('eco_sound') !== 'off';
  });
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback((effect: SoundEffect) => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const notes = frequencies[effect];
      let time = ctx.currentTime;
      notes.forEach(([freq, dur]) => {
        const osc = ctx.createOscillator();
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
    } catch { /* ignore audio errors */ }
  }, [enabled, getCtx]);

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      localStorage.setItem('eco_sound', next ? 'on' : 'off');
      return next;
    });
  }, []);

  return { play, enabled, toggle };
}
