// Projeto desenvolvido por Cinthia Gonçalez — Cruzeiro do Sul Virtual / Universidade Positivo
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_QUESTIONS } from '../data/gameData';
import type { QuizQuestion } from '../types';
import { GameComplete, Mascot, ProgressBar } from '../components/GameUI';
import { useProgress } from '../hooks/useProgress';
import { useSound } from '../hooks/useSound';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function EnergyQuiz() {
  const navigate = useNavigate();
  const { completeGame } = useProgress();
  const { play } = useSound();

  const [questions] = useState<QuizQuestion[]>(() => shuffle(QUIZ_QUESTIONS).slice(0, 8));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [ecoCoins, setEcoCoins] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const q = questions[current];
    const correct = idx === q.correctIndex;
    if (correct) {
      setScore(prev => prev + 1);
      setEcoCoins(prev => prev + 15);
      play('correct');
    } else {
      play('wrong');
    }
    setShowExplanation(true);
  }, [selected, questions, current, play]);

  const handleNext = useCallback(() => {
    setSelected(null);
    setShowExplanation(false);
    if (current >= questions.length - 1) {
      completeGame('quiz', score + (selected === questions[current].correctIndex ? 1 : 0), ecoCoins);
      play('win');
      setFinished(true);
    } else {
      setCurrent(prev => prev + 1);
    }
  }, [current, questions, score, selected, ecoCoins, completeGame, play]);

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setEcoCoins(0);
    setFinished(false);
    setShowExplanation(false);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 flex items-center justify-center p-4">
        <GameComplete
          score={score}
          total={questions.length}
          ecoCoins={ecoCoins}
          onPlay={handleRestart}
          onHome={() => navigate('/')}
          message="You're a Sustainability Expert! 🌟"
        />
      </div>
    );
  }

  const q = questions[current];
  const diffColors = { easy: 'bg-green-100 text-green-700', medium: 'bg-yellow-100 text-yellow-700', hard: 'bg-red-100 text-red-700' };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/games')} className="bg-white rounded-2xl px-4 py-2 shadow font-bold text-gray-600">← Back</button>
          <h1 className="font-display text-2xl text-orange-700">💡 Energy Quiz</h1>
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl px-3 py-1">
            <span className="font-bold text-yellow-700">🪙 {ecoCoins}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Question {current + 1} of {questions.length}</span>
            <span>Score: {score}/{current}</span>
          </div>
          <ProgressBar current={current + 1} total={questions.length} color="bg-orange-500" />
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-xl border-3 border-orange-200 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${diffColors[q.difficulty]}`}>
                {q.difficulty.toUpperCase()}
              </span>
              <span className="text-gray-400 text-sm">+15 🪙</span>
            </div>
            <div className="text-6xl text-center mb-4">{q.emoji}</div>
            <h2 className="font-bold text-xl text-gray-800 text-center mb-6">{q.question}</h2>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                let style = 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100';
                if (selected !== null) {
                  if (idx === q.correctIndex) style = 'bg-green-100 border-green-500 text-green-800';
                  else if (idx === selected && selected !== q.correctIndex) style = 'bg-red-100 border-red-500 text-red-800';
                  else style = 'bg-gray-50 border-gray-200 text-gray-400';
                }
                return (
                  <motion.button
                    key={idx}
                    whileHover={selected === null ? { scale: 1.02, x: 4 } : {}}
                    whileTap={selected === null ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(idx)}
                    disabled={selected !== null}
                    className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-semibold transition-all ${style}`}
                  >
                    <span className="text-gray-400 mr-3">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                    {selected !== null && idx === q.correctIndex && <span className="float-right">✅</span>}
                    {selected !== null && idx === selected && selected !== q.correctIndex && <span className="float-right">❌</span>}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`mt-4 p-4 rounded-2xl ${selected === q.correctIndex ? 'bg-green-50 border-2 border-green-300' : 'bg-blue-50 border-2 border-blue-300'}`}
                >
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">{selected === q.correctIndex ? '🎉 Correct! ' : '💡 Learn: '}</span>
                    {q.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        {selected !== null && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-display text-xl rounded-3xl shadow-lg"
          >
            {current >= questions.length - 1 ? '🏁 See Results!' : '➡️ Next Question!'}
          </motion.button>
        )}

        {/* Mascot */}
        {selected === null && (
          <div className="flex justify-center mt-4">
            <Mascot mood="thinking" size="sm" message="Choose the correct answer! 💡" />
          </div>
        )}
      </div>
    </div>
  );
}
