import React from 'react';
import { User, Trophy, Clock, Star, ArrowLeft } from 'lucide-react';
import type { Player } from '../types/game';

interface ProfileScreenProps {
  player: Player;
  onBack: () => void;
  onAvatarChange: (avatar: number) => void;
}

// Office characters avatars
const officeAvatars = [
  { id: 1, emoji: '👨‍💼', name: 'Майкл' }, // Michael - менеджер
  { id: 2, emoji: '👨‍💻', name: 'Дуайт' },   // Dwight - продавец/ассистент менеджера
  { id: 3, emoji: '👨‍🔧', name: 'Джим' },    // Jim - продавец
  { id: 4, emoji: '👩‍🎨', name: 'Пэм' },     // Pam - секретарь/художница
  { id: 5, emoji: '👨‍🏫', name: 'Райан' },   // Ryan - стажер/менеджер
];

export function ProfileScreen({ player, onBack, onAvatarChange }: ProfileScreenProps) {
  const expNeeded = player.level * 100;
  const expProgress = (player.experience / expNeeded) * 100;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}ч ${mins}м` : `${mins}м`;
  };

  const currentAvatar = officeAvatars.find(a => a.id === player.avatar) || officeAvatars[0];

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
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-neutral-800 rounded-full text-5xl">
              {currentAvatar.emoji}
            </div>
            <h2 className="text-2xl font-bold">{player.name}</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Уровень</span>
              <span className="text-2xl font-bold">{player.level}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-neutral-400">
                <span>Опыт</span>
                <span>{player.experience} / {expNeeded}</span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${expProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
            <div className="text-center space-y-1">
              <Trophy className="w-6 h-6 mx-auto text-yellow-500" />
              <div className="text-2xl font-bold">{player.bestScore}с</div>
              <div className="text-xs text-neutral-400">Рекорд</div>
            </div>

            <div className="text-center space-y-1">
              <Clock className="w-6 h-6 mx-auto text-blue-500" />
              <div className="text-2xl font-bold">{formatTime(player.totalPlayTime)}</div>
              <div className="text-xs text-neutral-400">Всего</div>
            </div>

            <div className="text-center space-y-1">
              <Star className="w-6 h-6 mx-auto text-green-500" />
              <div className="text-2xl font-bold">{player.gamesPlayed}</div>
              <div className="text-xs text-neutral-400">Игр</div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-3xl p-8 space-y-4">
          <h3 className="text-xl font-bold">Выбор персонажа</h3>
          <div className="grid grid-cols-5 gap-4">
            {officeAvatars.map(avatar => (
              <button
                key={avatar.id}
                onClick={() => onAvatarChange(avatar.id)}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-3xl transition-all ${
                  player.avatar === avatar.id
                    ? 'bg-white text-black'
                    : 'bg-neutral-800 hover:bg-neutral-700'
                }`}
                title={avatar.name}
              >
                <div>{avatar.emoji}</div>
                <div className={`text-[10px] mt-1 font-semibold ${
                  player.avatar === avatar.id ? 'text-black' : 'text-neutral-400'
                }`}>
                  {avatar.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-neutral-900 rounded-3xl p-8 space-y-4">
          <h3 className="text-xl font-bold">Достижения</h3>
          <div className="space-y-3">
            {player.achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-2xl ${
                  achievement.unlocked
                    ? 'bg-neutral-800'
                    : 'bg-neutral-800/50 opacity-50'
                }`}
              >
                <div className="text-2xl">
                  {achievement.unlocked ? '🏆' : '🔒'}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{achievement.name}</div>
                  <div className="text-sm text-neutral-400">
                    {achievement.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
