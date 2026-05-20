// Projeto desenvolvido por Cinthia Gonçalez — Cruzeiro do Sul Virtual / Universidade Positivo
import type { PlayerProgress, GameScore } from '../types';

const STORAGE_KEY = 'eco_english_progress';
const SCORES_KEY = 'eco_english_scores';

export const defaultProgress: PlayerProgress = {
  name: 'Eco Explorer',
  ecoCoins: 0,
  xp: 0,
  level: 1,
  achievements: [],
  completedGames: {},
  dailyChallengeDate: '',
  dailyChallengeCompleted: false,
  totalGamesPlayed: 0,
  stars: 0,
};

export function loadProgress(): PlayerProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { ...defaultProgress };
    return { ...defaultProgress, ...JSON.parse(stored) };
  } catch {
    return { ...defaultProgress };
  }
}

export function saveProgress(progress: PlayerProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    console.warn('Could not save progress');
  }
}

export function updateProgress(updates: Partial<PlayerProgress>): PlayerProgress {
  const current = loadProgress();
  const updated = { ...current, ...updates };
  saveProgress(updated);
  return updated;
}

export function addEcoCoins(amount: number): PlayerProgress {
  const p = loadProgress();
  const updated = { ...p, ecoCoins: p.ecoCoins + amount, xp: p.xp + amount * 2 };
  updated.level = Math.floor(updated.xp / 200) + 1;
  updated.stars = Math.floor(updated.ecoCoins / 50);
  saveProgress(updated);
  return updated;
}

export function recordGameCompletion(gameId: string, score: number, ecoCoins: number): PlayerProgress {
  const p = loadProgress();
  const prevBest = p.completedGames[gameId] || 0;
  const updated = {
    ...p,
    completedGames: { ...p.completedGames, [gameId]: Math.max(prevBest, score) },
    ecoCoins: p.ecoCoins + ecoCoins,
    xp: p.xp + ecoCoins * 2,
    totalGamesPlayed: p.totalGamesPlayed + 1,
  };
  updated.level = Math.floor(updated.xp / 200) + 1;
  updated.stars = Math.floor(updated.ecoCoins / 50);
  saveProgress(updated);

  // Save score history
  try {
    const scores: GameScore[] = JSON.parse(localStorage.getItem(SCORES_KEY) || '[]');
    scores.unshift({ gameId, score, ecoCoins, xp: ecoCoins * 2, timestamp: Date.now() });
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores.slice(0, 50)));
  } catch { /* ignore */ }

  return updated;
}

export function setPlayerName(name: string): PlayerProgress {
  return updateProgress({ name });
}

export function unlockAchievement(achievementId: string): PlayerProgress {
  const p = loadProgress();
  if (!p.achievements.includes(achievementId)) {
    return updateProgress({ achievements: [...p.achievements, achievementId] });
  }
  return p;
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SCORES_KEY);
}

export function getLevelInfo(level: number): { name: string; emoji: string; nextLevelXp: number } {
  const levels = [
    { name: 'Eco Seedling', emoji: '🌱' },
    { name: 'Green Sprout', emoji: '🌿' },
    { name: 'Eco Explorer', emoji: '🌍' },
    { name: 'Nature Guardian', emoji: '🌳' },
    { name: 'Planet Protector', emoji: '🦋' },
    { name: 'Eco Champion', emoji: '🏆' },
    { name: 'Earth Hero', emoji: '⭐' },
    { name: 'Sustainability Master', emoji: '🌟' },
  ];
  const idx = Math.min(level - 1, levels.length - 1);
  return { ...levels[idx], nextLevelXp: level * 200 };
}
