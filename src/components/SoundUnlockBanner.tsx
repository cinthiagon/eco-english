// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { unlockAudioContext } from '../hooks/useSound';

/**
 * iOS Safari will not play any audio until the user taps something AND
 * the AudioContext is created inside that gesture. This banner prompts
 * the first tap and calls unlockAudioContext() in the handler.
 */
export default function SoundUnlockBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on touch devices (iOS/Android)
    const isTouch = navigator.maxTouchPoints > 0;
    if (!isTouch) return;
    // Slight delay so it doesn't flash on load
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const handleTap = () => {
    unlockAudioContext();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={handleTap}
          onTouchEnd={handleTap}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-green-600 text-white font-bold text-sm rounded-full px-5 py-3 shadow-xl active:scale-95 transition-transform"
          aria-label="Tap to enable sounds"
        >
          <span className="text-xl">🔊</span>
          Tap to enable sounds!
        </motion.button>
      )}
    </AnimatePresence>
  );
}
