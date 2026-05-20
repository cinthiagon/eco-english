// Projeto desenvolvido por Cinthia Gonçalez — Cruzeiro do Sul Virtual / Universidade Positivo
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface FeedbackPopupProps {
  show: boolean;
  correct: boolean;
  message: string;
  explanation?: string;
  onNext: () => void;
}

export function FeedbackPopup({ show, correct, message, explanation, onNext }: FeedbackPopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className={`relative z-10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl ${
              correct ? 'bg-green-50 border-4 border-green-400' : 'bg-red-50 border-4 border-red-400'
            }`}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5 }}
              className="text-6xl mb-4"
            >
              {correct ? '🎉' : '💪'}
            </motion.div>
            <h3 className={`font-display text-3xl mb-2 ${correct ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </h3>
            {explanation && (
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{explanation}</p>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className={`w-full py-3 px-6 rounded-2xl font-bold text-white text-lg shadow-lg ${
                correct ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {correct ? 'Keep Going! 🚀' : 'Try Again! 💪'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ScoreBadgeProps {
  coins: number;
  score: number;
  total: number;
}

export function ScoreBadge({ coins, score, total }: ScoreBadgeProps) {
  return (
    <div className="flex items-center gap-3 bg-white/80 rounded-2xl px-4 py-2 shadow border-2 border-yellow-300">
      <span className="text-2xl">🪙</span>
      <div>
        <div className="font-bold text-yellow-700">{coins} Eco Coins</div>
        <div className="text-xs text-gray-500">{score}/{total} correct</div>
      </div>
    </div>
  );
}

interface GameCompleteProps {
  score: number;
  total: number;
  ecoCoins: number;
  onPlay: () => void;
  onHome: () => void;
  message?: string;
}

export function GameComplete({ score, total, ecoCoins, onPlay, onHome, message }: GameCompleteProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 100;
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 text-center shadow-xl border-4 border-green-300 max-w-md mx-auto"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-6xl mb-4"
      >
        🏆
      </motion.div>
      <h2 className="font-display text-3xl text-green-700 mb-2">
        {pct >= 90 ? 'Amazing!' : pct >= 60 ? 'Great Job!' : 'Good Try!'}
      </h2>
      {message && <p className="text-gray-600 mb-4">{message}</p>}

      <div className="flex justify-center gap-1 mb-4 text-4xl">
        {[1, 2, 3].map(s => (
          <motion.span
            key={s}
            initial={{ scale: 0 }}
            animate={{ scale: s <= stars ? 1 : 0.5, opacity: s <= stars ? 1 : 0.3 }}
            transition={{ delay: s * 0.2 }}
          >⭐</motion.span>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <div className="bg-yellow-100 rounded-2xl px-4 py-3 border-2 border-yellow-400">
          <div className="text-2xl">🪙</div>
          <div className="font-bold text-yellow-700">+{ecoCoins}</div>
          <div className="text-xs text-gray-500">Eco Coins</div>
        </div>
        <div className="bg-blue-100 rounded-2xl px-4 py-3 border-2 border-blue-400">
          <div className="text-2xl">✅</div>
          <div className="font-bold text-blue-700">{score}/{total}</div>
          <div className="text-xs text-gray-500">Score</div>
        </div>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={onPlay}
          className="flex-1 py-3 px-6 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold shadow-lg"
        >🔄 Play Again</motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={onHome}
          className="flex-1 py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-bold shadow-lg"
        >🏠 Home</motion.button>
      </div>
    </motion.div>
  );
}

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
}

export function ProgressBar({ current, total, color = 'bg-green-500' }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5 }}
        className={`h-full ${color} rounded-full`}
      />
    </div>
  );
}

interface MascotProps {
  mood?: 'happy' | 'thinking' | 'excited' | 'idle';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  children?: ReactNode;
}

export function Mascot({ mood = 'idle', size = 'md', message, children }: MascotProps) {
  const sizes = { sm: 'text-5xl', md: 'text-7xl', lg: 'text-9xl', xl: 'text-[10rem]' };
  const face = mood === 'happy' ? '😄' : mood === 'thinking' ? '🤔' : mood === 'excited' ? '🥳' : '🦔';

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        animate={
          mood === 'excited'
            ? { y: [0, -20, 0], rotate: [0, -5, 5, 0] }
            : { y: [0, -10, 0] }
        }
        transition={{ repeat: Infinity, duration: mood === 'excited' ? 0.6 : 2, ease: 'easeInOut' }}
        className={sizes[size]}
        role="img"
        aria-label="Eco hedgehog mascot"
      >
        {face}
      </motion.div>
      {(message || children) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-2xl px-4 py-3 shadow-lg border-2 border-green-300 max-w-xs text-center"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-green-300 rotate-45" />
          {message && <p className="font-bold text-gray-700">{message}</p>}
          {children}
        </motion.div>
      )}
    </div>
  );
}
