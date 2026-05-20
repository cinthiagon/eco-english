// Projeto desenvolvido por Cinthia Gonçalez — Cruzeiro do Sul Virtual / Universidade Positivo
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CITY_ITEMS, BAD_CITY_ITEMS } from '../data/gameData';
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
const TARGET_SCORE = 60;

// Removed unused combined array

export default function GreenCityGame() {
  const navigate = useNavigate();
  const { completeGame } = useProgress();
  const { play } = useSound();

  const [placed, setPlaced] = useState<PlacedItem[]>([]);
  const [selected, setSelected] = useState<CityItem | null>(null);
  const [ecoScore, setEcoScore] = useState(0);
  const [ecoCoins, setEcoCoins] = useState(0);
  const [finished, setFinished] = useState(false);
  const [tooltip, setTooltip] = useState<{ text: string; bad: boolean } | null>(null);

  const handleSelectItem = useCallback((item: CityItem) => {
    setSelected(prev => prev?.id === item.id ? null : item);
    play('click');
  }, [play]);

  const handleGridClick = useCallback((row: number, col: number) => {
    if (!selected) return;
    const existingIdx = placed.findIndex(p => p.x === col && p.y === row);

    if (existingIdx >= 0) {
      // Remove existing item
      const removing = placed[existingIdx];
      setPlaced(prev => prev.filter((_, i) => i !== existingIdx));
      setEcoScore(prev => prev - removing.ecoScore);
      setEcoCoins(prev => Math.max(0, prev - Math.abs(removing.ecoScore)));
    } else {
      // Place new item
      const newPlaced: PlacedItem = {
        ...selected,
        placedId: `${selected.id}-${Date.now()}`,
        x: col,
        y: row,
      };
      setPlaced(prev => [...prev, newPlaced]);
      setEcoScore(prev => prev + selected.ecoScore);

      if (selected.isBad) {
        play('wrong');
        setEcoCoins(prev => Math.max(0, prev - Math.abs(selected.ecoScore)));
        setTooltip({ text: `⚠️ Bad choice! ${selected.description}`, bad: true });
      } else {
        play('drop');
        setEcoCoins(prev => prev + selected.ecoScore);
        setTooltip({ text: `✅ Great choice! ${selected.description}`, bad: false });
      }
      setTimeout(() => setTooltip(null), 2500);
    }
  }, [selected, placed, play]);

  const handleFinish = useCallback(() => {
    const finalScore = Math.max(0, ecoScore);
    completeGame('greencity', finalScore, Math.max(0, ecoCoins));
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
    const goodItems = placed.filter(p => !p.isBad).length;
    const badItems = placed.filter(p => p.isBad).length;
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-green-100 flex items-center justify-center p-4">
        <GameComplete
          score={Math.max(0, ecoScore)}
          total={TARGET_SCORE}
          ecoCoins={Math.max(0, ecoCoins)}
          onPlay={handleRestart}
          onHome={() => navigate('/')}
          message={
            badItems === 0
              ? `Perfect! ${goodItems} eco-friendly items — no pollution! 🌿`
              : `You placed ${goodItems} green items and ${badItems} polluting items. Try again with only green choices! ♻️`
          }
        />
      </div>
    );
  }

  const scoreColor = ecoScore < 0 ? 'bg-red-400' : ecoScore < TARGET_SCORE * 0.4 ? 'bg-yellow-400' : 'bg-green-500';
  const scorePercent = Math.max(0, Math.min((ecoScore / TARGET_SCORE) * 100, 100));

  const goodCategoryColors: Record<string, string> = {
    energy: 'from-yellow-400 to-amber-500',
    nature: 'from-green-400 to-emerald-500',
    transport: 'from-blue-400 to-cyan-500',
    building: 'from-purple-400 to-violet-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-green-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate('/games')} className="bg-white rounded-2xl px-4 py-2 shadow font-bold text-gray-600">← Back</button>
          <h1 className="font-display text-2xl text-teal-700">🏙️ Green City</h1>
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl px-3 py-1">
            <span className="font-bold text-yellow-700">🪙 {Math.max(0, ecoCoins)}</span>
          </div>
        </div>

        {/* Eco Score bar */}
        <div className="bg-white/80 rounded-2xl p-3 mb-4 shadow">
          <div className="flex justify-between text-sm font-bold text-gray-600 mb-1">
            <span className={ecoScore < 0 ? 'text-red-600' : 'text-green-700'}>
              🌿 Eco Score: {ecoScore}
            </span>
            <span>Goal: {TARGET_SCORE}</span>
          </div>
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              animate={{ width: `${scorePercent}%` }}
              transition={{ duration: 0.4 }}
              className={`h-full ${scoreColor} rounded-full`}
            />
          </div>
          {ecoScore < 0 && (
            <p className="text-red-600 font-bold text-center mt-1 text-sm">⚠️ Too many polluting items! Remove the bad ones!</p>
          )}
          {ecoScore >= TARGET_SCORE && (
            <p className="text-green-600 font-bold text-center mt-1 text-sm">🎉 Goal reached! Amazing city!</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* City grid */}
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
                          ? placedItem.isBad
                            ? 'bg-red-100 border-2 border-red-400 shadow-md'
                            : 'bg-green-100 border-2 border-green-400 shadow-md'
                          : selected
                          ? selected.isBad
                            ? 'bg-red-50 border-2 border-dashed border-red-400 hover:bg-red-100'
                            : 'bg-white/60 border-2 border-dashed border-blue-400 hover:bg-white/80'
                          : 'bg-white/40 border-2 border-white/60'
                      }`}
                    >
                      {placedItem ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="relative"
                        >
                          <span>{placedItem.emoji}</span>
                          {placedItem.isBad && (
                            <span className="absolute -top-1 -right-1 text-xs">💨</span>
                          )}
                        </motion.div>
                      ) : selected ? (
                        <span className={selected.isBad ? 'text-red-300 text-xl' : 'text-blue-300 text-xl'}>+</span>
                      ) : null}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Tooltip feedback */}
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`mt-3 rounded-2xl px-4 py-2 text-center text-sm font-semibold border-2 ${
                    tooltip.bad
                      ? 'bg-red-100 border-red-400 text-red-700'
                      : 'bg-green-100 border-green-400 text-green-700'
                  }`}
                >
                  {tooltip.text}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Item palette */}
          <div className="space-y-3">
            <div className="flex justify-center">
              <Mascot
                mood={selected?.isBad ? 'thinking' : 'happy'}
                size="sm"
                message={
                  selected
                    ? selected.isBad
                      ? `⚠️ "${selected.name}" pollutes! Are you sure?`
                      : `Place the ${selected.name}! 🌱`
                    : 'Pick wisely — some items hurt the planet! 🌍'
                }
              />
            </div>

            {/* Legend */}
            <div className="flex gap-2 justify-center text-xs font-bold">
              <span className="bg-green-100 text-green-700 border border-green-400 rounded-full px-2 py-1">✅ Eco-friendly</span>
              <span className="bg-red-100 text-red-700 border border-red-400 rounded-full px-2 py-1">❌ Polluting</span>
            </div>

            {/* Good items section */}
            <div>
              <p className="text-xs font-bold text-green-700 mb-1 text-center">🌿 Green Items</p>
              <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
                {CITY_ITEMS.map(item => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectItem(item)}
                    className={`bg-gradient-to-br ${goodCategoryColors[item.category]} text-white rounded-2xl p-2 text-center shadow transition-all ${
                      selected?.id === item.id ? 'ring-4 ring-white ring-offset-2 scale-105' : ''
                    }`}
                  >
                    <div className="text-2xl">{item.emoji}</div>
                    <div className="text-xs font-bold mt-0.5 leading-tight">{item.name}</div>
                    <div className="text-xs text-white/80">+{item.ecoScore}🌿</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Bad items section */}
            <div>
              <p className="text-xs font-bold text-red-600 mb-1 text-center">⚠️ Polluting Items — Avoid these!</p>
              <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
                {BAD_CITY_ITEMS.map(item => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectItem(item)}
                    className={`bg-gradient-to-br from-red-400 to-rose-600 text-white rounded-2xl p-2 text-center shadow transition-all ${
                      selected?.id === item.id ? 'ring-4 ring-white ring-offset-2 scale-105' : ''
                    }`}
                  >
                    <div className="text-2xl">{item.emoji}</div>
                    <div className="text-xs font-bold mt-0.5 leading-tight">{item.name}</div>
                    <div className="text-xs text-white/80">{item.ecoScore}🌿</div>
                  </motion.button>
                ))}
              </div>
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
