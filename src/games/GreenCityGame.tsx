// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CITY_ITEMS } from '../data/gameData';
import type { CityItem } from '../types';
import { GameComplete, Mascot } from '../components/GameUI';
import { useProgress } from '../hooks/useProgress';
import { useSound } from '../hooks/useSound';

interface PlacedItem extends CityItem {
  placedId: string;
  x: number;
  y: number;
}

const GRID_SIZE = 5;
const TARGET_SCORE = 80;

export default function GreenCityGame() {
  const navigate = useNavigate();
  const { completeGame } = useProgress();
  const { play } = useSound();

  const [placed, setPlaced] = useState<PlacedItem[]>([]);
  const [selected, setSelected] = useState<CityItem | null>(null);
  const [ecoScore, setEcoScore] = useState(0);
  const [ecoCoins, setEcoCoins] = useState(0);
  const [finished, setFinished] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);

  const handleSelectItem = useCallback((item: CityItem) => {
    setSelected(prev => prev?.id === item.id ? null : item);
    play('click');
  }, [play]);

  const handleGridClick = useCallback((row: number, col: number) => {
    if (!selected) return;
    const existingIdx = placed.findIndex(p => p.x === col && p.y === row);
    if (existingIdx >= 0) {
      // Remove
      const removing = placed[existingIdx];
      setPlaced(prev => prev.filter((_, i) => i !== existingIdx));
      setEcoScore(prev => Math.max(0, prev - removing.ecoScore));
      setEcoCoins(prev => Math.max(0, prev - removing.ecoScore));
    } else {
      // Place
      const newPlaced: PlacedItem = { ...selected, placedId: `${selected.id}-${Date.now()}`, x: col, y: row };
      setPlaced(prev => [...prev, newPlaced]);
      setEcoScore(prev => prev + selected.ecoScore);
      setEcoCoins(prev => prev + selected.ecoScore);
      play('drop');
      setTooltip(selected.description);
      setTimeout(() => setTooltip(null), 2000);
    }
  }, [selected, placed, play]);

  const handleFinish = useCallback(() => {
    completeGame('greencity', ecoScore, ecoCoins);
    play('win');
    setFinished(true);
  }, [ecoScore, ecoCoins, completeGame, play]);

  const handleRestart = () => {
    setPlaced([]);
    setSelected(null);
    setEcoScore(0);
    setEcoCoins(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-green-100 flex items-center justify-center p-4">
        <GameComplete
          score={ecoScore}
          total={TARGET_SCORE}
          ecoCoins={ecoCoins}
          onPlay={handleRestart}
          onHome={() => navigate('/')}
          message={ecoScore >= TARGET_SCORE ? "You built an amazing Green City! 🏙️🌿" : "Great city! Keep adding eco items! 🌱"}
        />
      </div>
    );
  }

  const categoryColors: Record<CityItem['category'], string> = {
    energy: 'from-yellow-400 to-amber-500',
    nature: 'from-green-400 to-emerald-500',
    transport: 'from-blue-400 to-cyan-500',
    building: 'from-purple-400 to-violet-500',
  };

  const scorePercent = Math.min((ecoScore / TARGET_SCORE) * 100, 100);
  const scoreColor = scorePercent < 30 ? 'bg-red-400' : scorePercent < 60 ? 'bg-yellow-400' : 'bg-green-500';

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-green-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate('/games')} className="bg-white rounded-2xl px-4 py-2 shadow font-bold text-gray-600">← Back</button>
          <h1 className="font-display text-2xl text-teal-700">🏙️ Green City</h1>
          <div className="flex gap-2">
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl px-3 py-1">
              <span className="font-bold text-yellow-700">🪙 {ecoCoins}</span>
            </div>
          </div>
        </div>

        {/* Eco Score bar */}
        <div className="bg-white/80 rounded-2xl p-3 mb-4 shadow">
          <div className="flex justify-between text-sm font-bold text-gray-600 mb-1">
            <span>🌿 Eco Score: {ecoScore}</span>
            <span>Goal: {TARGET_SCORE}</span>
          </div>
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              animate={{ width: `${scorePercent}%` }}
              transition={{ duration: 0.4 }}
              className={`h-full ${scoreColor} rounded-full`}
            />
          </div>
          {ecoScore >= TARGET_SCORE && (
            <p className="text-green-600 font-bold text-center mt-1 text-sm">🎉 Goal reached! Amazing city!</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Grid */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-sky-200 to-blue-200 rounded-3xl p-3 shadow-xl border-4 border-blue-300">
              <div
                className="grid gap-1"
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
              >
                {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
                  const row = Math.floor(i / GRID_SIZE);
                  const col = i % GRID_SIZE;
                  const placedItem = placed.find(p => p.x === col && p.y === row);
                  return (
                    <motion.div
                      key={i}
                      onClick={() => handleGridClick(row, col)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`aspect-square rounded-xl flex items-center justify-center cursor-pointer text-2xl sm:text-3xl transition-all ${
                        placedItem
                          ? 'bg-green-100 border-2 border-green-400 shadow-md'
                          : selected
                          ? 'bg-white/60 border-2 border-dashed border-blue-400 hover:bg-white/80'
                          : 'bg-white/40 border-2 border-white/60'
                      }`}
                    >
                      {placedItem ? (
                        <motion.span
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                        >
                          {placedItem.emoji}
                        </motion.span>
                      ) : selected ? (
                        <span className="text-blue-300 text-xl">+</span>
                      ) : null}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-3 bg-green-100 border-2 border-green-400 rounded-2xl px-4 py-2 text-center text-sm font-semibold text-green-700"
                >
                  💡 {tooltip}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Item palette */}
          <div className="space-y-3">
            <div className="flex justify-center">
              <Mascot mood="happy" size="sm" message={selected ? `Place the ${selected.name}!` : 'Select an item to place!'} />
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
              {CITY_ITEMS.map(item => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectItem(item)}
                  className={`bg-gradient-to-br ${categoryColors[item.category]} text-white rounded-2xl p-2 text-center shadow transition-all ${
                    selected?.id === item.id ? 'ring-4 ring-white ring-offset-2 scale-105' : ''
                  }`}
                >
                  <div className="text-3xl">{item.emoji}</div>
                  <div className="text-xs font-bold mt-1 leading-tight">{item.name}</div>
                  <div className="text-xs text-white/80">+{item.ecoScore}🌿</div>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleFinish}
              disabled={placed.length < 5}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-600 text-white font-display text-lg rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {placed.length < 5 ? `Add ${5 - placed.length} more items!` : '🏁 Finish City!'}
            </motion.button>

            <button
              onClick={() => { setPlaced([]); setEcoScore(0); setEcoCoins(0); }}
              className="w-full py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              🗑️ Clear grid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
