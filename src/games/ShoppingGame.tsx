// Projeto desenvolvido por Cinthia Gonçalez — Cruzeiro do Sul Virtual / Universidade Positivo
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SHOPPING_ITEMS } from '../data/gameData';
import type { ShoppingItem } from '../types';
import { GameComplete, Mascot } from '../components/GameUI';
import { useProgress } from '../hooks/useProgress';
import { useSound } from '../hooks/useSound';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function ShoppingGame() {
  const navigate = useNavigate();
  const { completeGame } = useProgress();
  const { play } = useSound();

  const [items] = useState<ShoppingItem[]>(() => shuffle(SHOPPING_ITEMS));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [ecoCoins, setEcoCoins] = useState(0);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; item: ShoppingItem | null }>({ show: false, correct: false, item: null });
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);

  const handleChoice = useCallback((chose: 'eco' | 'not') => {
    const item = items[current];
    const correct = (chose === 'eco') === item.isEcoFriendly;
    const newScore = correct ? score + 1 : score;
    const newStreak = correct ? streak + 1 : 0;
    const coins = correct ? (10 + newStreak * 2) : 0;
    setScore(newScore);
    setStreak(newStreak);
    setEcoCoins(prev => prev + coins);
    setFeedback({ show: true, correct, item });
    play(correct ? 'correct' : 'wrong');

    setTimeout(() => {
      setFeedback({ show: false, correct: false, item: null });
      if (current >= items.length - 1) {
        completeGame('shopping', newScore, ecoCoins + coins);
        play('win');
        setFinished(true);
      } else {
        setCurrent(prev => prev + 1);
      }
    }, 2200);
  }, [current, items, score, streak, ecoCoins, completeGame, play]);

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setEcoCoins(0);
    setStreak(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-100 flex items-center justify-center p-4">
        <GameComplete
          score={score}
          total={items.length}
          ecoCoins={ecoCoins}
          onPlay={handleRestart}
          onHome={() => navigate('/')}
          message="You're an Eco Shopping Expert! 🌱"
        />
      </div>
    );
  }

  const item = items[current];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/games')} className="bg-white rounded-2xl px-4 py-2 shadow font-bold text-gray-600 hover:bg-gray-50">← Back</button>
          <h1 className="font-display text-2xl text-blue-700">🛒 Eco Shopping</h1>
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl px-3 py-1">
            <span className="font-bold text-yellow-700">🪙 {ecoCoins}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              animate={{ width: `${((current) / items.length) * 100}%` }}
              className="h-full bg-blue-500 rounded-full"
            />
          </div>
          <span className="text-sm font-bold text-gray-600">{current}/{items.length}</span>
          {streak >= 2 && (
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="bg-orange-100 border-2 border-orange-400 rounded-full px-2 py-1 text-xs font-bold text-orange-700"
            >
              🔥 {streak}x Streak!
            </motion.span>
          )}
        </div>

        {/* Mascot */}
        <div className="flex justify-center mb-6">
          <Mascot
            mood="thinking"
            size="sm"
            message="Is this product eco-friendly? 🌍"
          />
        </div>

        {/* Item card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-8 text-center shadow-xl border-3 border-blue-200 mb-6"
          >
            <div className="text-8xl mb-4">{item.emoji}</div>
            <h2 className="font-display text-3xl text-gray-800 mb-2">{item.name}</h2>
            <p className="text-gray-500 text-sm">{item.category}</p>
          </motion.div>
        </AnimatePresence>

        {/* Choice buttons */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleChoice('eco')}
            disabled={feedback.show}
            className="bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-3xl p-6 shadow-xl font-display text-xl disabled:opacity-50"
          >
            <div className="text-5xl mb-2">✅</div>
            <div>Eco-Friendly!</div>
            <div className="text-sm text-white/80 font-normal mt-1">Good choice!</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleChoice('not')}
            disabled={feedback.show}
            className="bg-gradient-to-br from-red-400 to-rose-600 text-white rounded-3xl p-6 shadow-xl font-display text-xl disabled:opacity-50"
          >
            <div className="text-5xl mb-2">❌</div>
            <div>Not Eco!</div>
            <div className="text-sm text-white/80 font-normal mt-1">Bad for Earth!</div>
          </motion.button>
        </div>

        {/* Feedback overlay */}
        <AnimatePresence>
          {feedback.show && feedback.item && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              className={`fixed inset-x-4 bottom-8 z-40 rounded-3xl p-5 shadow-2xl border-4 ${
                feedback.correct ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-4xl">{feedback.correct ? '🎉' : '💡'}</div>
                <div>
                  <p className={`font-bold text-lg ${feedback.correct ? 'text-green-700' : 'text-red-700'}`}>
                    {feedback.correct ? 'Correct! Great job!' : 'Not quite right!'}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{feedback.item.explanation}</p>
                  {feedback.correct && streak >= 2 && (
                    <p className="text-orange-600 font-bold text-sm mt-1">🔥 {streak}x streak bonus!</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
