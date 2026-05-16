// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { getLevelInfo } from '../services/progress';
import { ProgressBar } from '../components/GameUI';

const ACHIEVEMENTS_DATA = [
  { id: 'first_game', title: 'First Steps!', emoji: '👣', desc: 'Complete your first game', condition: (p: { totalGamesPlayed: number }) => p.totalGamesPlayed >= 1 },
  { id: 'recycler', title: 'Recycler Hero', emoji: '♻️', desc: 'Complete the Recycling Game', condition: (p: { completedGames: Record<string, number> }) => 'recycling' in p.completedGames },
  { id: 'eco_shopper', title: 'Eco Shopper', emoji: '🛒', desc: 'Complete the Shopping Game', condition: (p: { completedGames: Record<string, number> }) => 'shopping' in p.completedGames },
  { id: 'quiz_master', title: 'Quiz Master', emoji: '💡', desc: 'Complete the Energy Quiz', condition: (p: { completedGames: Record<string, number> }) => 'quiz' in p.completedGames },
  { id: 'word_wizard', title: 'Word Wizard', emoji: '🔤', desc: 'Complete the Word Match game', condition: (p: { completedGames: Record<string, number> }) => 'wordmatch' in p.completedGames },
  { id: 'city_builder', title: 'City Builder', emoji: '🏙️', desc: 'Complete the Green City game', condition: (p: { completedGames: Record<string, number> }) => 'greencity' in p.completedGames },
  { id: 'all_games', title: 'All Star!', emoji: '🌟', desc: 'Complete all 5 games', condition: (p: { completedGames: Record<string, number> }) => Object.keys(p.completedGames).length >= 5 },
  { id: 'coin_collector', title: 'Coin Collector', emoji: '🪙', desc: 'Earn 100 Eco Coins', condition: (p: { ecoCoins: number }) => p.ecoCoins >= 100 },
  { id: 'eco_rich', title: 'Eco Rich!', emoji: '💰', desc: 'Earn 500 Eco Coins', condition: (p: { ecoCoins: number }) => p.ecoCoins >= 500 },
  { id: 'level_5', title: 'Level 5!', emoji: '🚀', desc: 'Reach Level 5', condition: (p: { level: number }) => p.level >= 5 },
  { id: 'gamer', title: 'Super Gamer', emoji: '🎮', desc: 'Play 10 games total', condition: (p: { totalGamesPlayed: number }) => p.totalGamesPlayed >= 10 },
  { id: 'marathon', title: 'Marathon Runner', emoji: '🏃', desc: 'Play 25 games total', condition: (p: { totalGamesPlayed: number }) => p.totalGamesPlayed >= 25 },
];

export default function AchievementsPage() {
  const { progress } = useProgress();
  const levelInfo = getLevelInfo(progress.level);
  const xpProgress = progress.xp % 200;

  const unlocked = ACHIEVEMENTS_DATA.filter(a => a.condition(progress));
  const locked = ACHIEVEMENTS_DATA.filter(a => !a.condition(progress));

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl text-center text-purple-700 mb-2"
        >
          🏆 Achievements
        </motion.h1>
        <p className="text-center text-purple-500 mb-8">You unlocked {unlocked.length}/{ACHIEVEMENTS_DATA.length} achievements!</p>

        {/* Player level card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white mb-8 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="text-6xl">{levelInfo.emoji}</div>
            <div className="flex-1">
              <div className="font-display text-2xl">{progress.name}</div>
              <div className="text-white/80">Level {progress.level} — {levelInfo.name}</div>
              <div className="mt-2 space-y-1">
                <div className="text-sm text-white/70">XP Progress: {xpProgress}/200</div>
                <ProgressBar current={xpProgress} total={200} color="bg-white/60" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{progress.ecoCoins}</div>
              <div className="text-sm text-white/80">Eco Coins 🪙</div>
            </div>
          </div>
        </motion.div>

        {/* Unlocked achievements */}
        {unlocked.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-2xl text-green-700 mb-4">✅ Unlocked ({unlocked.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {unlocked.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-gradient-to-br from-yellow-100 to-amber-100 border-3 border-yellow-400 rounded-2xl p-4 text-center shadow-md"
                >
                  <div className="text-4xl mb-2">{a.emoji}</div>
                  <div className="font-bold text-gray-800 text-sm">{a.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{a.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Locked achievements */}
        {locked.length > 0 && (
          <div>
            <h2 className="font-display text-2xl text-gray-500 mb-4">🔒 Locked ({locked.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {locked.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-4 text-center opacity-60"
                >
                  <div className="text-4xl mb-2 grayscale">🔒</div>
                  <div className="font-bold text-gray-600 text-sm">{a.title}</div>
                  <div className="text-xs text-gray-400 mt-1">{a.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
