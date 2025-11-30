import type { Player, ScoreRecord, Settings, Achievement } from '../types/game';

const STORAGE_KEYS = {
  PLAYER: 'catch_interference_player',
  SCORES: 'catch_interference_scores',
  SETTINGS: 'catch_interference_settings',
} as const;

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_60',
    name: 'Первая минута',
    description: 'Продержись 60 секунд',
    icon: 'Clock',
    unlocked: false,
  },
  {
    id: 'series_5',
    name: 'Серия из 5',
    description: 'Сыграй 5 игр подряд',
    icon: 'Flame',
    unlocked: false,
  },
  {
    id: 'level_10',
    name: 'Десятка',
    description: 'Достигни 10 уровня',
    icon: 'Star',
    unlocked: false,
  },
  {
    id: 'fast_hands',
    name: 'Быстрые руки',
    description: 'Сделай 50 тапов за игру',
    icon: 'Zap',
    unlocked: false,
  },
  {
    id: 'survivor',
    name: 'Выживальщик',
    description: 'Продержись 3 минуты',
    icon: 'Trophy',
    unlocked: false,
  },
];

export const storage = {
  getPlayer(): Player {
    const data = localStorage.getItem(STORAGE_KEYS.PLAYER);
    if (!data) {
      const newPlayer: Player = {
        id: crypto.randomUUID(),
        name: 'Игрок',
        avatar: 1,
        level: 1,
        experience: 0,
        totalPlayTime: 0,
        gamesPlayed: 0,
        bestScore: 0,
        achievements: DEFAULT_ACHIEVEMENTS,
      };
      this.savePlayer(newPlayer);
      return newPlayer;
    }
    return JSON.parse(data);
  },

  savePlayer(player: Player): void {
    localStorage.setItem(STORAGE_KEYS.PLAYER, JSON.stringify(player));
  },

  getScores(): ScoreRecord[] {
    const data = localStorage.getItem(STORAGE_KEYS.SCORES);
    return data ? JSON.parse(data) : [];
  },

  saveScore(score: ScoreRecord): void {
    const scores = this.getScores();
    scores.push(score);
    scores.sort((a, b) => b.score - a.score);
    const top10 = scores.slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(top10));
  },

  getSettings(): Settings {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) {
      const defaultSettings: Settings = {
        sound: true,
        vibration: true,
        theme: 'dark',
      };
      this.saveSettings(defaultSettings);
      return defaultSettings;
    }
    return JSON.parse(data);
  },

  saveSettings(settings: Settings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  addExperience(player: Player, exp: number): Player {
    const updated = { ...player };
    updated.experience += exp;
    
    const expNeeded = updated.level * 100;
    if (updated.experience >= expNeeded) {
      updated.level++;
      updated.experience -= expNeeded;
    }
    
    return updated;
  },

  unlockAchievement(player: Player, achievementId: string): Player {
    const updated = { ...player };
    const achievement = updated.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = Date.now();
    }
    return updated;
  },

  checkAchievements(player: Player, score: number, taps: number): Player {
    let updated = { ...player };
    
    if (score >= 60 && !updated.achievements.find(a => a.id === 'first_60')?.unlocked) {
      updated = this.unlockAchievement(updated, 'first_60');
    }
    
    if (score >= 180 && !updated.achievements.find(a => a.id === 'survivor')?.unlocked) {
      updated = this.unlockAchievement(updated, 'survivor');
    }
    
    if (updated.gamesPlayed >= 5 && !updated.achievements.find(a => a.id === 'series_5')?.unlocked) {
      updated = this.unlockAchievement(updated, 'series_5');
    }
    
    if (updated.level >= 10 && !updated.achievements.find(a => a.id === 'level_10')?.unlocked) {
      updated = this.unlockAchievement(updated, 'level_10');
    }
    
    if (taps >= 50 && !updated.achievements.find(a => a.id === 'fast_hands')?.unlocked) {
      updated = this.unlockAchievement(updated, 'fast_hands');
    }
    
    return updated;
  },
};
