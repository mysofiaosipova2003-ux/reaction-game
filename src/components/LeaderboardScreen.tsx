import React from 'react';
import { Trophy, ArrowLeft } from 'lucide-react';
import { storage } from '../utils/storage';

interface LeaderboardScreenProps {
  onBack: () => void;
}

export function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
  const scores = storage.getScores();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад
        </button>

        <div className="bg-neutral-900 rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold">Таблица рекордов</h2>
          </div>

          {scores.length === 0 ? (
            <div className="text-center text-neutral-400 py-12">
              <p>Пока нет рекордов</p>
              <p className="text-sm mt-2">Сыграйте первую игру!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {scores.map((score, index) => (
                <div
                  key={score.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl ${
                    index === 0
                      ? 'bg-yellow-500/20 border border-yellow-500/30'
                      : 'bg-neutral-800'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index === 0
                        ? 'bg-yellow-500 text-black'
                        : index === 1
                        ? 'bg-neutral-600 text-white'
                        : index === 2
                        ? 'bg-orange-700 text-white'
                        : 'bg-neutral-700 text-neutral-400'
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div className="flex-1">
                    <div className="font-mono text-2xl font-bold">
                      {formatTime(score.score)}
                    </div>
                    <div className="text-sm text-neutral-400">
                      {formatDate(score.date)} • Ур. {score.level}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
