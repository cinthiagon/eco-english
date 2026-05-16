// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WASTE_ITEMS, BIN_COLORS } from '../data/gameData';
import type { WasteItem, BinType } from '../types';
import { GameComplete, Mascot } from '../components/GameUI';
import { useProgress } from '../hooks/useProgress';
import { useSound } from '../hooks/useSound';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function RecyclingGame() {
  const navigate = useNavigate();
  const { completeGame } = useProgress();
  const { play } = useSound();

  const [items, setItems] = useState<WasteItem[]>(() => shuffle(WASTE_ITEMS).slice(0, 8));
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; text: string; fact: string }>({ show: false, correct: false, text: '', fact: '' });
  const [finished, setFinished] = useState(false);
  const [ecoCoins, setEcoCoins] = useState(0);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [correctBin, setCorrectBin] = useState<string | null>(null);
  const dragItem = useRef<WasteItem | null>(null);

  const handleDragStart = useCallback((item: WasteItem) => {
    setDraggingId(item.id);
    dragItem.current = item;
    play('click');
  }, [play]);

  const handleDrop = useCallback((binType: BinType) => {
    if (!dragItem.current) return;
    const item = dragItem.current;
    const correct = item.binType === binType;
    const newScore = correct ? score + 1 : score;
    const newTotal = total + 1;
    const coins = correct ? 10 : 0;
    setScore(newScore);
    setTotal(newTotal);
    setEcoCoins(prev => prev + coins);
    setCorrectBin(correct ? binType : null);
    setFeedback({
      show: true,
      correct,
      text: correct ? `Great Job! 🎉 ${item.name} goes in ${BIN_COLORS[binType].label}!` : `Oops! ${item.name} goes in ${BIN_COLORS[item.binType].label} bin!`,
      fact: item.funFact,
    });
    play(correct ? 'correct' : 'wrong');
    setDraggingId(null);
    dragItem.current = null;

    // Remove item from list
    setItems(prev => prev.filter(i => i.id !== item.id));

    // Check if done after feedback
    setTimeout(() => {
      setFeedback(prev => ({ ...prev, show: false }));
      setCorrectBin(null);
      if (items.length <= 1) {
        // Last item
        setTimeout(() => {
          const finalScore = newScore;
          completeGame('recycling', finalScore, ecoCoins + coins);
          play('win');
          setFinished(true);
        }, 400);
      }
    }, 2000);
  }, [score, total, items, ecoCoins, completeGame, play]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const handleRestart = () => {
    setItems(shuffle(WASTE_ITEMS).slice(0, 8));
    setScore(0);
    setTotal(0);
    setEcoCoins(0);
    setFinished(false);
    setFeedback({ show: false, correct: false, text: '', fact: '' });
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <GameComplete
          score={score}
          total={total}
          ecoCoins={ecoCoins}
          onPlay={handleRestart}
          onHome={() => navigate('/')}
          message="You sorted all the recycling! 🌍"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/games')} className="bg-white rounded-2xl px-4 py-2 shadow font-bold text-gray-600 hover:bg-gray-50">← Back</button>
          <h1 className="font-display text-3xl text-green-700">♻️ Recycling Game</h1>
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl px-3 py-1">
            <span className="font-bold text-yellow-700">🪙 {ecoCoins}</span>
          </div>
        </div>

        {/* Mascot hint */}
        <div className="flex justify-center mb-6">
          <Mascot mood="thinking" size="sm" message="Drag each item to the correct bin! 🗑️" />
        </div>

        {/* Score */}
        <div className="text-center mb-4">
          <span className="bg-white rounded-2xl px-4 py-2 shadow font-bold text-green-700">
            ✅ {score} correct | {items.length} items left
          </span>
        </div>

        {/* Bins */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {(Object.keys(BIN_COLORS) as BinType[]).map(binType => {
            const bin = BIN_COLORS[binType];
            return (
              <motion.div
                key={binType}
                animate={correctBin === binType ? { scale: [1, 1.1, 1] } : {}}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(binType)}
                className={`${bin.bg} border-4 ${bin.border} rounded-3xl p-3 text-center cursor-pointer min-h-[120px] flex flex-col items-center justify-center transition-all hover:scale-105 ${
                  draggingId ? 'ring-4 ring-offset-2 ring-current' : ''
                }`}
              >
                <div className="text-4xl mb-2">🗑️</div>
                <div className="text-xs font-bold text-gray-700">{bin.emoji}</div>
                <div className="text-xs font-bold text-gray-700">{bin.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Items */}
        <div className="grid grid-cols-4 gap-3">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, y: -50 }}
                layout
                draggable
                onDragStart={() => handleDragStart(item)}
                onDragEnd={() => { setDraggingId(null); dragItem.current = null; }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`bg-white border-3 border-gray-200 rounded-2xl p-3 text-center cursor-grab active:cursor-grabbing shadow-md select-none ${
                  draggingId === item.id ? 'opacity-50 scale-95' : ''
                }`}
              >
                <div className="text-4xl mb-1">{item.emoji}</div>
                <div className="text-xs font-bold text-gray-600">{item.name}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Feedback overlay */}
        <AnimatePresence>
          {feedback.show && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 rounded-3xl p-4 max-w-sm w-full text-center shadow-2xl border-4 ${
                feedback.correct ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
              }`}
            >
              <p className={`font-bold text-lg ${feedback.correct ? 'text-green-700' : 'text-red-700'}`}>{feedback.text}</p>
              <p className="text-sm text-gray-600 mt-1">{feedback.fact}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile touch version */}
        <p className="text-center text-sm text-gray-500 mt-4">💡 Tip: Drag items to bins, or tap an item then tap a bin!</p>
      </div>
    </div>
  );
}
