// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { getLevelInfo, resetProgress } from '../services/progress';
import { ProgressBar } from '../components/GameUI';

export default function ProfilePage() {
  const { progress, updateName, manualSave } = useProgress();
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(progress.name);
  const [showReset, setShowReset] = useState(false);
  const levelInfo = getLevelInfo(progress.level);
  const xpProgress = progress.xp % 200;

  const GAMES_INFO = [
    { id: 'recycling', emoji: '♻️', name: 'Recycling Game' },
    { id: 'shopping', emoji: '🛒', name: 'Eco Shopping' },
    { id: 'quiz', emoji: '💡', name: 'Energy Quiz' },
    { id: 'wordmatch', emoji: '🔤', name: 'Word Match' },
    { id: 'greencity', emoji: '🏙️', name: 'Green City' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl text-center text-blue-700 mb-8"
        >
          👤 My Profile
        </motion.h1>

        {/* Avatar & name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-6 shadow-lg border-2 border-blue-200 mb-6"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-6xl shadow-xl">
                {levelInfo.emoji}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white text-sm font-bold rounded-full w-9 h-9 flex items-center justify-center shadow">
                {progress.level}
              </div>
            </div>

            {editingName ? (
              <div className="flex gap-2 w-full max-w-xs">
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { updateName(newName); setEditingName(false); }}}
                  className="flex-1 border-2 border-green-400 rounded-xl px-3 py-2 text-center font-bold text-lg focus:outline-none"
                  maxLength={20}
                  autoFocus
                />
                <button
                  onClick={() => { updateName(newName); setEditingName(false); }}
                  className="bg-green-500 text-white rounded-xl px-4 py-2 font-bold hover:bg-green-600"
                >✓</button>
              </div>
            ) : (
              <button onClick={() => setEditingName(true)} className="flex items-center gap-2 group">
                <span className="font-display text-2xl text-gray-800 group-hover:text-green-600 transition-colors">{progress.name}</span>
                <span className="text-gray-400">✏️</span>
              </button>
            )}
            <span className="bg-green-100 text-green-700 font-semibold rounded-full px-4 py-1">{levelInfo.name}</span>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Level', value: progress.level, emoji: '⭐', color: 'from-purple-400 to-purple-500' },
            { label: 'Eco Coins', value: progress.ecoCoins, emoji: '🪙', color: 'from-yellow-400 to-amber-500' },
            { label: 'Total XP', value: progress.xp, emoji: '⚡', color: 'from-blue-400 to-blue-500' },
            { label: 'Games Played', value: progress.totalGamesPlayed, emoji: '🎮', color: 'from-green-400 to-emerald-500' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 text-white text-center shadow-md`}
            >
              <div className="text-3xl">{stat.emoji}</div>
              <div className="font-display text-2xl">{stat.value}</div>
              <div className="text-xs text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* XP Progress */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-purple-200 mb-6">
          <h3 className="font-display text-xl text-purple-700 mb-3">Level Progress</h3>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Level {progress.level}</span>
            <span>{xpProgress}/200 XP</span>
            <span>Level {progress.level + 1}</span>
          </div>
          <ProgressBar current={xpProgress} total={200} color="bg-purple-500" />
          <p className="text-sm text-gray-500 mt-2 text-center">
            {200 - xpProgress} XP until next level!
          </p>
        </div>

        {/* Game scores */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-green-200 mb-6">
          <h3 className="font-display text-xl text-green-700 mb-4">🎮 Best Scores</h3>
          <div className="space-y-3">
            {GAMES_INFO.map(game => {
              const best = progress.completedGames[game.id];
              return (
                <div key={game.id} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                  <span className="text-2xl">{game.emoji}</span>
                  <span className="flex-1 font-semibold text-gray-700">{game.name}</span>
                  {best !== undefined ? (
                    <span className="bg-green-100 text-green-700 font-bold rounded-full px-3 py-1 text-sm">🏆 {best}</span>
                  ) : (
                    <span className="text-gray-400 text-sm">Not played yet</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset */}
        <div className="text-center">
          <button
            onClick={() => setShowReset(true)}
            className="text-red-400 hover:text-red-600 text-sm underline transition-colors"
          >
            Reset all progress
          </button>
        </div>

        {/* Reset confirmation */}
        <AnimatePresence>
          {showReset && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border-4 border-red-300"
              >
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="font-display text-2xl text-red-600 mb-2">Reset Progress?</h3>
                <p className="text-gray-600 mb-6">This will delete all your coins, XP and achievements. Are you sure?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReset(false)}
                    className="flex-1 py-3 bg-gray-200 rounded-2xl font-bold hover:bg-gray-300 transition-colors"
                  >Keep it!</button>
                  <button
                    onClick={() => { resetProgress(); manualSave({ name: 'Eco Explorer', ecoCoins: 0, xp: 0, level: 1, achievements: [], completedGames: {}, dailyChallengeDate: '', dailyChallengeCompleted: false, totalGamesPlayed: 0, stars: 0 }); setShowReset(false); }}
                    className="flex-1 py-3 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-colors"
                  >Reset! 🗑️</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
