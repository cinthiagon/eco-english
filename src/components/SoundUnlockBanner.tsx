// Projeto desenvolvido por Cinthia Gonçalez — Cruzeiro do Sul Virtual / Universidade Positivo
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { unlockAudio } from '../hooks/useSound';

export default function SoundUnlockBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = navigator.maxTouchPoints > 0;
    if (!isTouch) return;
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  const handleTap = () => {
    unlockAudio();   // must be called synchronously inside this gesture handler
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
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-green-600 text-white font-bold text-sm rounded-full px-5 py-3 shadow-xl active:scale-95 transition-transform"
        >
          <span className="text-xl">🔊</span>
          Tap to enable sounds!
        </motion.button>
      )}
    </AnimatePresence>
  );
}
