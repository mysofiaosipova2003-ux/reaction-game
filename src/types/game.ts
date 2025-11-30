export interface Player {
  id: string;
  name: string;
  avatar: number;
  level: number;
  experience: number;
  totalPlayTime: number;
  gamesPlayed: number;
  bestScore: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface GameState {
  status: 'idle' | 'playing' | 'paused' | 'gameover';
  score: number;
  startTime: number;
  box: Box;
}

export interface Box {
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
  color: 'red' | 'yellow' | 'green' | 'blue';
}

export interface ScoreRecord {
  id: string;
  score: number;
  date: number;
  level: number;
}

export type Theme = 'light' | 'dark' | 'retro';

export interface Settings {
  sound: boolean;
  vibration: boolean;
  theme: Theme;
}
