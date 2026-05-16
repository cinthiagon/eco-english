// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { useState, useEffect, useCallback } from 'react';
import type { PlayerProgress } from '../types';
import { loadProgress, saveProgress, recordGameCompletion, unlockAchievement, setPlayerName } from '../services/progress';

export function useProgress() {
  const [progress, setProgress] = useState<PlayerProgress>(loadProgress);

  const refresh = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener('eco_progress_update', handler);
    return () => window.removeEventListener('eco_progress_update', handler);
  }, [refresh]);

  const updateName = useCallback((name: string) => {
    const updated = setPlayerName(name);
    setProgress(updated);
    window.dispatchEvent(new Event('eco_progress_update'));
  }, []);

  const completeGame = useCallback((gameId: string, score: number, ecoCoins: number) => {
    const updated = recordGameCompletion(gameId, score, ecoCoins);
    setProgress(updated);
    window.dispatchEvent(new Event('eco_progress_update'));
    return updated;
  }, []);

  const unlock = useCallback((achievementId: string) => {
    const updated = unlockAchievement(achievementId);
    setProgress(updated);
    window.dispatchEvent(new Event('eco_progress_update'));
  }, []);

  const manualSave = useCallback((p: PlayerProgress) => {
    saveProgress(p);
    setProgress(p);
    window.dispatchEvent(new Event('eco_progress_update'));
  }, []);

  return { progress, updateName, completeGame, unlock, manualSave, refresh };
}
