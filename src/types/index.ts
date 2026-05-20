// Projeto desenvolvido por Cinthia Gonçalez — Cruzeiro do Sul Virtual / Universidade Positivo

export interface PlayerProgress {
  name: string;
  ecoCoins: number;
  xp: number;
  level: number;
  achievements: string[];
  completedGames: Record<string, number>; // gameId -> best score
  dailyChallengeDate: string;
  dailyChallengeCompleted: boolean;
  totalGamesPlayed: number;
  stars: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: PlayerProgress) => boolean;
  reward: number;
}

export interface GameScore {
  gameId: string;
  score: number;
  ecoCoins: number;
  xp: number;
  timestamp: number;
}

export type BinType = 'plastic' | 'paper' | 'glass' | 'metal' | 'organic';

export interface WasteItem {
  id: string;
  name: string;
  emoji: string;
  binType: BinType;
  funFact: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  emoji: string;
  isEcoFriendly: boolean;
  explanation: string;
  category: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface WordCard {
  id: string;
  word: string;
  emoji: string;
  category: string;
  translation: string;
}

export interface CityItem {
  id: string;
  name: string;
  emoji: string;
  category: 'nature' | 'energy' | 'transport' | 'building';
  ecoScore: number; // positive = good, negative = bad
  description: string;
  isBad?: boolean;
}
