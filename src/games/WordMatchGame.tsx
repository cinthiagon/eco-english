// Projeto desenvolvido por Cinthia Gonçalez — Cruzeiro do Sul Virtual / Universidade Positivo
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WORD_CARDS } from '../data/gameData';
import type { WordCard } from '../types';
import { GameComplete } from '../components/GameUI';
import { useProgress } from '../hooks/useProgress';
import { useSound } from '../hooks/useSound';

interface MemoryCard {
  id: string;
  wordCard: WordCard;
  type: 'word' | 'image';
  isFlipped: boolean;
  isMatched: boolean;
}

function createCards(cards: WordCard[]): MemoryCard[] {
  const result: MemoryCard[] = [];
  cards.forEach(wc => {
    result.push({ id: `${wc.id}-word`, wordCard: wc, type: 'word', isFlipped: false, isMatched: false });
    result.push({ id: `${wc.id}-image`, wordCard: wc, type: 'image', isFlipped: false, isMatched: false });
  });
  return result.sort(() => Math.random() - 0.5);
}

export default function WordMatchGame() {
  const navigate = useNavigate();
  const { completeGame } = useProgress();
  const { play } = useSound();

  const LEVEL_SIZES = [6, 8, 10]; // pairs per level
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState<MemoryCard[]>(() => createCards(WORD_CARDS.slice(0, LEVEL_SIZES[0])));
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matches, setMatches] = useState(0);
  const [ecoCoins, setEcoCoins] = useState(0);
  const [moves, setMoves] = useState(0);
  const [finished, setFinished] = useState(false);
  const [checking, setChecking] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, [level]);

  const handleFlip = useCallback((cardId: string) => {
    if (checking || flipped.length >= 2) return;
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    play('click');
    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, isFlipped: true } : c));

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setChecking(true);
      const [id1, id2] = newFlipped;
      const card1 = cards.find(c => c.id === id1)!;
      const card2 = cards.find(c => c.id === id2)!;

      if (card1.wordCard.id === card2.wordCard.id && card1.type !== card2.type) {
        // Match!
        play('coin');
        const newMatches = matches + 1;
        setMatches(newMatches);
        setEcoCoins(prev => prev + 20);
        setCards(prev => prev.map(c =>
          c.id === id1 || c.id === id2 ? { ...c, isMatched: true } : c
        ));
        setFlipped([]);
        setChecking(false);

        const pairsNeeded = LEVEL_SIZES[level];
        if (newMatches === pairsNeeded) {
          if (level < LEVEL_SIZES.length - 1) {
            setTimeout(() => {
              play('win');
              alert(`🎉 Level ${level + 1} Complete! Great job!`);
              const nextLevel = level + 1;
              setLevel(nextLevel);
              setCards(createCards(WORD_CARDS.slice(0, LEVEL_SIZES[nextLevel])));
              setFlipped([]);
              setMatches(0);
              setElapsed(0);
              setChecking(false);
            }, 500);
          } else {
            setTimeout(() => {
              completeGame('wordmatch', newMatches, ecoCoins + 20);
              play('win');
              setFinished(true);
            }, 500);
          }
        }
      } else {
        // No match
        play('wrong');
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === id1 || c.id === id2 ? { ...c, isFlipped: false } : c
          ));
          setFlipped([]);
          setChecking(false);
        }, 1200);
      }
    }
  }, [checking, flipped, cards, matches, ecoCoins, level, completeGame, play, LEVEL_SIZES]);

  const handleRestart = () => {
    setLevel(0);
    setCards(createCards(WORD_CARDS.slice(0, LEVEL_SIZES[0])));
    setFlipped([]);
    setMatches(0);
    setEcoCoins(0);
    setMoves(0);
    setFinished(false);
    setElapsed(0);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 flex items-center justify-center p-4">
        <GameComplete
          score={matches}
          total={LEVEL_SIZES[LEVEL_SIZES.length - 1]}
          ecoCoins={ecoCoins}
          onPlay={handleRestart}
          onHome={() => navigate('/')}
          message="You're an Eco Word Master! 🔤"
        />
      </div>
    );
  }

  const totalPairs = LEVEL_SIZES[level];
  const cols = totalPairs <= 6 ? 4 : totalPairs <= 8 ? 4 : 5;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate('/games')} className="bg-white rounded-2xl px-4 py-2 shadow font-bold text-gray-600">← Back</button>
          <h1 className="font-display text-2xl text-purple-700">🔤 Word Match</h1>
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl px-3 py-1">
            <span className="font-bold text-yellow-700">🪙 {ecoCoins}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mb-4 bg-white/80 rounded-2xl px-4 py-3 shadow">
          <span className="font-bold text-purple-700">Level {level + 1}/{LEVEL_SIZES.length}</span>
          <span className="text-gray-600">✅ {matches}/{totalPairs} pairs</span>
          <span className="text-gray-600">🎯 {moves} moves</span>
          <span className="text-gray-600">⏱️ {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')}</span>
        </div>

        <p className="text-center text-sm text-purple-600 mb-4 font-semibold">
          Match each English word to its picture! 🌿
        </p>

        {/* Card grid */}
        <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          <AnimatePresence>
            {cards.map(card => (
              <motion.div
                key={card.id}
                layout
                initial={{ rotateY: 0 }}
                whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05, y: -3 } : {}}
                whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
                onClick={() => handleFlip(card.id)}
                className={`aspect-square rounded-2xl cursor-pointer flex items-center justify-center shadow-md select-none transition-all ${
                  card.isMatched
                    ? 'bg-green-200 border-3 border-green-500 cursor-default'
                    : card.isFlipped
                    ? 'bg-white border-3 border-purple-400'
                    : 'bg-gradient-to-br from-purple-400 to-pink-500 border-3 border-purple-300'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <motion.div
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    className="text-center p-2"
                  >
                    {card.type === 'image' ? (
                      <div className="text-3xl sm:text-4xl">{card.wordCard.emoji}</div>
                    ) : (
                      <div className="font-display text-xs sm:text-sm text-gray-800 leading-tight">
                        {card.wordCard.word}
                      </div>
                    )}
                    {card.isMatched && (
                      <div className="text-xs text-green-600 font-bold mt-1">✓</div>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-3xl text-white/60">❓</div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
