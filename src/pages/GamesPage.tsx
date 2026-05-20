// Projeto desenvolvido por Cinthia Gonçalez — Cruzeiro do Sul Virtual / Universidade Positivo
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';

const GAMES = [
  { id: 'recycling', emoji: '♻️', title: 'Recycling Game', desc: 'Sort trash into the correct bins! Learn plastic, paper, glass, metal & organic waste.', color: 'from-green-400 to-emerald-600', path: '/games/recycling', skills: ['Recycling vocabulary', 'Drag & Drop', 'Sorting'] },
  { id: 'shopping', emoji: '🛒', title: 'Eco Shopping', desc: 'Choose eco-friendly products at the supermarket! Good choice vs bad choice.', color: 'from-blue-400 to-cyan-600', path: '/games/shopping', skills: ['Consumer awareness', 'Eco vocabulary', 'Decision making'] },
  { id: 'quiz', emoji: '💡', title: 'Energy Quiz', desc: 'Answer questions about energy, water, and sustainable transport!', color: 'from-yellow-400 to-orange-500', path: '/games/quiz', skills: ['Energy saving', 'Multiple choice', 'Critical thinking'] },
  { id: 'wordmatch', emoji: '🔤', title: 'Word Match', desc: 'Match English words to pictures in a fun memory game!', color: 'from-purple-400 to-pink-600', path: '/games/wordmatch', skills: ['English vocabulary', 'Memory', 'Nature words'] },
  { id: 'greencity', emoji: '🏙️', title: 'Green City', desc: 'Build your own sustainable city with solar panels, trees and more!', color: 'from-teal-400 to-green-600', path: '/games/greencity', skills: ['Urban planning', 'Sustainability', 'Creative thinking'] },
];

export default function GamesPage() {
  const navigate = useNavigate();
  const { progress } = useProgress();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl text-green-700">🎮 All Games</h1>
          <p className="text-green-600 mt-2">Choose a game and start learning!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GAMES.map((game, i) => {
            const bestScore = progress.completedGames[game.id];
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`bg-gradient-to-br ${game.color} rounded-3xl p-6 text-white shadow-xl cursor-pointer`}
                onClick={() => navigate(game.path)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-6xl">{game.emoji}</div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl">{game.title}</h2>
                    <p className="text-white/85 text-sm mt-1">{game.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {game.skills.map(s => (
                        <span key={s} className="bg-white/25 rounded-full px-3 py-1 text-xs font-semibold">{s}</span>
                      ))}
                    </div>
                    {bestScore !== undefined && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="bg-white/30 rounded-full px-3 py-1 text-xs font-bold">🏆 Best Score: {bestScore}</span>
                      </div>
                    )}
                  </div>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="mt-4 flex justify-end"
                >
                  <span className="bg-white/30 rounded-2xl px-4 py-2 font-bold text-sm">Play! →</span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
