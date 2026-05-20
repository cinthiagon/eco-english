// Projeto desenvolvido por Cinthia Gonçalez — Cruzeiro do Sul Virtual / Universidade Positivo
import { useState, useCallback, useEffect, useRef } from 'react';
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
  const [correctBin, setCorrectBin] = useState<string | null>(null);

  // Pointer/touch drag state
  const [dragItem, setDragItem] = useState<WasteItem | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const dragItemRef = useRef<WasteItem | null>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  // Tap-to-select fallback for tricky touch scenarios
  const [tapSelected, setTapSelected] = useState<WasteItem | null>(null);

  const processDropOnBin = useCallback((binType: BinType, item: WasteItem) => {
    const correct = item.binType === binType;
    setScore(prev => {
      const newScore = correct ? prev + 1 : prev;
      return newScore;
    });
    setTotal(prev => prev + 1);
    const coins = correct ? 10 : 0;
    setEcoCoins(prev => prev + coins);
    setCorrectBin(correct ? binType : null);
    setFeedback({
      show: true,
      correct,
      text: correct
        ? `Great Job! 🎉 ${item.name} goes in the ${BIN_COLORS[binType].label} bin!`
        : `Oops! ${item.name} belongs in the ${BIN_COLORS[item.binType].label} bin!`,
      fact: item.funFact,
    });
    play(correct ? 'correct' : 'wrong');
    setItems(prev => prev.filter(i => i.id !== item.id));

    setTimeout(() => {
      setFeedback(f => ({ ...f, show: false }));
      setCorrectBin(null);
      if (itemsRef.current.length <= 1) {
        setTimeout(() => {
          setScore(s => {
            setEcoCoins(c => { completeGame('recycling', s, c); return c; });
            return s;
          });
          play('win');
          setFinished(true);
        }, 400);
      }
    }, 2000);
  }, [completeGame, play]);

  // ── Pointer events (mouse + touch via pointer API) ──
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>, item: WasteItem) => {
    e.preventDefault();
    dragItemRef.current = item;
    setDragItem(item);
    setTapSelected(null);
    setDragPos({ x: e.clientX, y: e.clientY });
    play('click');
  }, [play]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragItemRef.current) return;
      e.preventDefault();
      setDragPos({ x: e.clientX, y: e.clientY });
    };

    const onUp = (e: PointerEvent) => {
      const item = dragItemRef.current;
      if (!item) return;
      dragItemRef.current = null;
      setDragItem(null);

      // Hide ghost temporarily to hit-test what's underneath
      const ghost = document.getElementById('drag-ghost');
      if (ghost) ghost.style.pointerEvents = 'none';
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (ghost) ghost.style.pointerEvents = '';

      const binEl = el?.closest('[data-bin]');
      const binType = binEl?.getAttribute('data-bin') as BinType | null;
      if (binType) {
        processDropOnBin(binType, item);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [processDropOnBin]);

  // ── Tap-to-select fallback (tap item → tap bin) ──
  const handleItemTap = useCallback((item: WasteItem) => {
    // Only activate as tap fallback when no drag happened
    if (dragItem) return;
    setTapSelected(prev => prev?.id === item.id ? null : item);
    play('click');
  }, [dragItem, play]);

  const handleBinTap = useCallback((binType: BinType) => {
    if (!tapSelected) return;
    processDropOnBin(binType, tapSelected);
    setTapSelected(null);
  }, [tapSelected, processDropOnBin]);

  const handleRestart = () => {
    setItems(shuffle(WASTE_ITEMS).slice(0, 8));
    setScore(0);
    setTotal(0);
    setEcoCoins(0);
    setFinished(false);
    setFeedback({ show: false, correct: false, text: '', fact: '' });
    setDragItem(null);
    setTapSelected(null);
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 p-4 select-none">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate('/games')} className="bg-white rounded-2xl px-4 py-2 shadow font-bold text-gray-600 hover:bg-gray-50">← Back</button>
          <h1 className="font-display text-3xl text-green-700">♻️ Recycling Game</h1>
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl px-3 py-1">
            <span className="font-bold text-yellow-700">🪙 {ecoCoins}</span>
          </div>
        </div>

        {/* Mascot hint */}
        <div className="flex justify-center mb-4">
          <Mascot
            mood="thinking"
            size="sm"
            message={tapSelected ? `Now tap the correct bin for "${tapSelected.name}"! 🗑️` : 'Drag each item to the correct bin — or tap an item, then tap a bin! 🗑️'}
          />
        </div>

        {/* Score */}
        <div className="text-center mb-4">
          <span className="bg-white rounded-2xl px-4 py-2 shadow font-bold text-green-700">
            ✅ {score} correct &nbsp;|&nbsp; {items.length} items left
          </span>
        </div>

        {/* Bins */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {(Object.keys(BIN_COLORS) as BinType[]).map(binType => {
            const bin = BIN_COLORS[binType];
            const isTarget = tapSelected != null;
            return (
              <motion.div
                key={binType}
                data-bin={binType}
                animate={correctBin === binType ? { scale: [1, 1.15, 1] } : {}}
                onClick={() => handleBinTap(binType)}
                className={`${bin.bg} border-4 ${bin.border} rounded-3xl p-3 text-center cursor-pointer min-h-[100px] sm:min-h-[120px] flex flex-col items-center justify-center transition-all ${
                  isTarget ? 'ring-4 ring-offset-2 ring-current scale-105 shadow-lg' : ''
                } active:scale-95`}
              >
                <div className="text-3xl sm:text-4xl mb-1">🗑️</div>
                <div className="text-xs font-bold text-gray-700">{bin.emoji}</div>
                <div className="text-xs font-bold text-gray-700">{bin.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-4 gap-3">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, y: -50 }}
                layout
                onPointerDown={e => handlePointerDown(e, item)}
                onClick={() => handleItemTap(item)}
                whileHover={{ scale: 1.08, rotate: 3 }}
                className={`bg-white border-3 rounded-2xl p-3 text-center cursor-grab active:cursor-grabbing shadow-md touch-none ${
                  tapSelected?.id === item.id
                    ? 'border-green-500 ring-4 ring-green-300 scale-105'
                    : dragItem?.id === item.id
                    ? 'border-gray-200 opacity-40'
                    : 'border-gray-200'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-1">{item.emoji}</div>
                <div className="text-xs font-bold text-gray-600 leading-tight">{item.name}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Feedback toast */}
        <AnimatePresence>
          {feedback.show && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 rounded-3xl p-4 w-[90vw] max-w-sm text-center shadow-2xl border-4 ${
                feedback.correct ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
              }`}
            >
              <p className={`font-bold text-base ${feedback.correct ? 'text-green-700' : 'text-red-700'}`}>{feedback.text}</p>
              <p className="text-sm text-gray-600 mt-1">{feedback.fact}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating drag ghost */}
      <AnimatePresence>
        {dragItem && (
          <motion.div
            id="drag-ghost"
            initial={{ scale: 1.2, opacity: 0.9 }}
            animate={{ scale: 1.2, opacity: 0.9 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: 'fixed',
              left: dragPos.x - 36,
              top: dragPos.y - 36,
              pointerEvents: 'none',
              zIndex: 9999,
            }}
            className="bg-white border-4 border-green-400 rounded-2xl p-2 shadow-2xl text-center w-[72px]"
          >
            <div className="text-3xl">{dragItem.emoji}</div>
            <div className="text-xs font-bold text-gray-600 leading-tight">{dragItem.name}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
