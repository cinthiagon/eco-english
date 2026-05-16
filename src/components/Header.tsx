// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Gamepad2, Trophy, User, Volume2, VolumeX } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useSound } from '../hooks/useSound';

export default function Header() {
  const location = useLocation();
  const { progress } = useProgress();
  const { enabled, toggle } = useSound();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/games', icon: Gamepad2, label: 'Games' },
    { to: '/achievements', icon: Trophy, label: 'Achievements' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-50 glass shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-3xl"
          >🌱</motion.span>
          <span className="font-display text-2xl text-green-600 hidden sm:block">Eco English</span>
        </Link>

        {/* Stats bar */}
        <div className="flex items-center gap-3 flex-1 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 bg-yellow-100 border-2 border-yellow-400 rounded-full px-3 py-1"
          >
            <span className="text-lg">🪙</span>
            <span className="font-bold text-yellow-700 text-sm">{progress.ecoCoins}</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 bg-purple-100 border-2 border-purple-400 rounded-full px-3 py-1"
          >
            <span className="text-lg">⭐</span>
            <span className="font-bold text-purple-700 text-sm">Lv.{progress.level}</span>
          </motion.div>
        </div>

        {/* Nav + Sound */}
        <nav className="flex items-center gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} title={label}>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-xl transition-colors ${
                  location.pathname === to
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-500 hover:bg-green-100 hover:text-green-600'
                }`}
              >
                <Icon size={22} />
              </motion.div>
            </Link>
          ))}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            title={enabled ? 'Mute sounds' : 'Enable sounds'}
            className="p-2 rounded-xl text-gray-500 hover:bg-green-100 hover:text-green-600 transition-colors"
          >
            {enabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
          </motion.button>
        </nav>
      </div>
    </header>
  );
}
