import React from 'react';
import { RotateCcw, Trophy, TrendingUp } from 'lucide-react';
import type { Player } from '../types/game';

interface GameOverScreenProps {
  score: number;
  player: Player;
  onRestart: () => void;
  onMenu: () => void;
}

export function GameOverScreen({ score, player, onRestart, onMenu }: GameOverScreenProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isNewRecord = score > player.bestScore;

  return (
    <div className="fixed inset-0 bg-stone-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-sm p-8 max-w-sm w-full space-y-6 shadow-2xl border-4 border-stone-300">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-stone-500 mb-2">КОНФЕРЕНЦ-ЗАЛ</div>
          <h2 className="text-stone-800 text-3xl font-bold">ИГРА ОКОНЧЕНА</h2>
          {isNewRecord && (
            <p className="text-amber-600 font-semibold flex items-center justify-center gap-2 bg-amber-50 py-2 px-4 rounded-sm border border-amber-200">
              <Trophy className="w-5 h-5" />
              НОВЫЙ РЕКОРД!
            </p>
          )}
        </div>

        <div className="space-y-4 bg-stone-50 rounded-sm p-6 border-2 border-stone-200">
          <div className="flex items-center justify-between">
            <span className="text-stone-600 font-semibold">Время выживания</span>
            <span className="text-stone-800 font-mono text-2xl font-bold">
              {formatTime(score)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-600">Лучший рекорд</span>
            <span className="text-stone-800 font-mono text-lg font-semibold">
              {formatTime(player.bestScore)}
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t-2 border-stone-300">
            <span className="text-stone-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Уровень
            </span>
            <span className="text-stone-800 font-bold text-xl">{player.level}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-stone-700 text-white py-4 rounded-sm font-bold text-lg flex items-center justify-center gap-3 hover:bg-stone-600 transition-colors border-b-4 border-stone-900"
          >
            <RotateCcw className="w-5 h-5" />
            ИГРАТЬ СНОВА
          </button>

          <button
            onClick={onMenu}
            className="w-full bg-white text-stone-700 border-2 border-stone-300 py-4 rounded-sm font-semibold hover:bg-stone-50 transition-colors"
          >
            Главное меню
          </button>
        </div>

        <div className="text-center text-xs text-stone-500 font-mono pt-4 border-t border-stone-200">
          <p>Dunder Mifflin Paper Company</p>
        </div>
      </div>
    </div>
  );
}
