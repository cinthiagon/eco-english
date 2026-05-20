// Projeto desenvolvido por Cinthia Gonçalez — Cruzeiro do Sul Virtual / Universidade Positivo
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { getLevelInfo } from '../services/progress';
import { ProgressBar, Mascot } from '../components/GameUI';

const FACTS = [
  "🌍 Every year, about 8 million tons of plastic waste end up in our oceans!",
  "♻️ Recycling one aluminum can saves enough energy to power a TV for 3 hours!",
  "💧 A dripping tap can waste up to 11,000 liters of water in a single year!",
  "🌳 A single tree can absorb about 22 kg of CO2 from the air every year!",
  "☀️ The sun delivers more energy to Earth in one hour than the whole world uses in a year!",
  "🚲 Cycling instead of driving just one kilometer saves about 150g of CO2!",
];

export default function HomePage() {
  const { progress, updateName } = useProgress();
  const navigate = useNavigate();
  const [showNameModal, setShowNameModal] = useState(false);
  const [newName, setNewName] = useState(progress.name);
  const [factIndex] = useState(() => Math.floor(Math.random() * FACTS.length));
  const levelInfo = getLevelInfo(progress.level);
  const xpProgress = progress.xp % 200;

  const gameCards = [
    { id: 'recycling', emoji: '♻️', title: 'Recycling Game', desc: 'Sort waste into the right bins!', color: 'from-green-400 to-emerald-500', path: '/games/recycling' },
    { id: 'shopping', emoji: '🛒', title: 'Eco Shopping', desc: 'Choose eco-friendly products!', color: 'from-blue-400 to-cyan-500', path: '/games/shopping' },
    { id: 'quiz', emoji: '💡', title: 'Energy Quiz', desc: 'Test your sustainability knowledge!', color: 'from-yellow-400 to-orange-500', path: '/games/quiz' },
    { id: 'wordmatch', emoji: '🔤', title: 'Word Match', desc: 'Match English words to pictures!', color: 'from-purple-400 to-pink-500', path: '/games/wordmatch' },
    { id: 'greencity', emoji: '🏙️', title: 'Green City', desc: 'Build a sustainable city!', color: 'from-teal-400 to-green-500', path: '/games/greencity' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-green-50 to-emerald-100">
      {/* Hero section */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Mascot
            mood="happy"
            size="xl"
            message={`Hello, ${progress.name}! Ready to save the planet? 🌍`}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="font-display text-5xl md:text-7xl text-green-700 mt-6 text-shadow"
        >
          Eco English
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-green-600 mt-2 font-semibold"
        >
          Learn English • Save the Planet! 🌱
        </motion.p>

        {/* Play button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.08, boxShadow: '0 10px 40px rgba(34,197,94,0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/games')}
          className="mt-6 px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-2xl font-display rounded-full shadow-xl hover:shadow-2xl transition-all"
        >
          🎮 Play Now!
        </motion.button>
      </section>

      {/* Player stats */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/80 rounded-3xl p-6 shadow-lg border-2 border-green-200"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-4xl shadow-lg">
                {levelInfo.emoji}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center">
                {progress.level}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <button
                onClick={() => setShowNameModal(true)}
                className="font-display text-2xl text-gray-800 hover:text-green-600 transition-colors"
              >
                {progress.name} ✏️
              </button>
              <p className="text-sm text-green-600 font-semibold">{levelInfo.name}</p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>XP</span>
                  <div className="flex-1">
                    <ProgressBar current={xpProgress} total={200} color="bg-purple-500" />
                  </div>
                  <span>{xpProgress}/{200}</span>
                </div>
              </div>
            </div>

            {/* Coins and stars */}
            <div className="flex gap-4">
              <div className="text-center bg-yellow-50 rounded-2xl p-3 border-2 border-yellow-300">
                <div className="text-3xl">🪙</div>
                <div className="font-bold text-yellow-700">{progress.ecoCoins}</div>
                <div className="text-xs text-gray-500">Eco Coins</div>
              </div>
              <div className="text-center bg-purple-50 rounded-2xl p-3 border-2 border-purple-300">
                <div className="text-3xl">⭐</div>
                <div className="font-bold text-purple-700">{progress.stars}</div>
                <div className="text-xs text-gray-500">Stars</div>
              </div>
              <div className="text-center bg-green-50 rounded-2xl p-3 border-2 border-green-300">
                <div className="text-3xl">🎮</div>
                <div className="font-bold text-green-700">{progress.totalGamesPlayed}</div>
                <div className="text-xs text-gray-500">Games</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Eco Fact */}
      <section className="max-w-4xl mx-auto px-4 pb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-4 text-white text-center shadow-lg"
        >
          <span className="font-bold">🌟 Did you know? </span>
          <span>{FACTS[factIndex]}</span>
        </motion.div>
      </section>

      {/* Game cards */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="font-display text-3xl text-green-700 text-center mb-6">🎮 Choose a Game!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gameCards.map((game, i) => {
            const bestScore = progress.completedGames[game.id];
            return (
              <motion.button
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(game.path)}
                className={`bg-gradient-to-br ${game.color} rounded-3xl p-6 text-white text-left shadow-lg hover:shadow-xl transition-all btn-bounce`}
              >
                <div className="text-5xl mb-3">{game.emoji}</div>
                <h3 className="font-display text-xl">{game.title}</h3>
                <p className="text-white/80 text-sm mt-1">{game.desc}</p>
                {bestScore !== undefined && (
                  <div className="mt-3 flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-xs w-fit">
                    <span>🏆</span>
                    <span>Best: {bestScore}pts</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* SDG section */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white/70 rounded-3xl p-6 border-2 border-green-200">
          <h2 className="font-display text-2xl text-green-700 text-center mb-4">🌍 UN Sustainable Development Goals</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { num: 4, label: 'Quality Education', emoji: '📚' },
              { num: 11, label: 'Sustainable Cities', emoji: '🏙️' },
              { num: 12, label: 'Responsible Consumption', emoji: '♻️' },
              { num: 13, label: 'Climate Action', emoji: '🌡️' },
              { num: 14, label: 'Life Below Water', emoji: '🐋' },
              { num: 15, label: 'Life on Land', emoji: '🌳' },
            ].map(sdg => (
              <div key={sdg.num} className="bg-green-50 border-2 border-green-300 rounded-2xl px-4 py-2 text-center">
                <div className="text-2xl">{sdg.emoji}</div>
                <div className="text-xs font-bold text-green-700">SDG {sdg.num}</div>
                <div className="text-xs text-gray-600">{sdg.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Name modal */}
      <AnimatePresence>
        {showNameModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border-4 border-green-300"
            >
              <div className="text-5xl text-center mb-4">✏️</div>
              <h3 className="font-display text-2xl text-center text-green-700 mb-4">What's your name?</h3>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (updateName(newName), setShowNameModal(false))}
                className="w-full border-3 border-green-300 rounded-2xl px-4 py-3 text-lg text-center font-bold focus:outline-none focus:border-green-500"
                placeholder="Enter your name..."
                maxLength={20}
                autoFocus
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowNameModal(false)}
                  className="flex-1 py-3 bg-gray-200 rounded-2xl font-bold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => { updateName(newName); setShowNameModal(false); }}
                  className="flex-1 py-3 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-colors"
                >
                  Save! 🎉
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
