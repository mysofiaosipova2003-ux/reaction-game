import React from 'react';
import { Play, User, Trophy, Settings } from 'lucide-react';
import type { Player } from '../types/game';

interface MainMenuProps {
  player: Player;
  onPlay: () => void;
  onProfile: () => void;
  onLeaderboard: () => void;
  onSettings: () => void;
}

// Office characters avatars
const officeAvatars = [
  { id: 1, emoji: '👨‍💼', name: 'Майкл' },
  { id: 2, emoji: '👨‍💻', name: 'Дуайт' },
  { id: 3, emoji: '👨‍🔧', name: 'Джим' },
  { id: 4, emoji: '👩‍🎨', name: 'Пэм' },
  { id: 5, emoji: '👨‍🏫', name: 'Райан' },
];

export function MainMenu({
  player,
  onPlay,
  onProfile,
  onLeaderboard,
  onSettings,
}: MainMenuProps) {
  const currentAvatar = officeAvatars.find(a => a.id === player.avatar) || officeAvatars[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-50 text-stone-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          {/* Office style header */}
          <div className="inline-block bg-white px-8 py-4 rounded-sm shadow-md border-2 border-stone-300">
            <div className="text-xs text-stone-500 font-mono mb-1">ФИЛИАЛ СКРЭНТОН</div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight">DVD ЗАСТАВКА</h1>
            <div className="text-xs text-stone-500 font-mono mt-1">Игра в конференц-зале</div>
          </div>
          
          {/* Instructions in office memo style */}
          <div className="bg-white rounded-sm p-5 text-stone-700 text-sm leading-relaxed shadow-sm border border-stone-300">
            <div className="text-xs font-mono text-stone-500 mb-2 pb-2 border-b border-stone-200">СЛУЖЕБНАЯ ЗАПИСКА: ПРАВИЛА ИГРЫ</div>
            <p className="mb-2">Не дай логотипу DVD достичь углов экрана!</p>
            <p className="mb-2">Тапай по логотипу, чтобы изменить его направление.</p>
            <p className="text-stone-500 text-xs mt-3 pt-2 border-t border-stone-200">
              Цвет меняется при касании стенки. Выживай как можно дольше!
            </p>
          </div>
          
          {/* Player info - office badge style */}
          <div className="flex items-center justify-center gap-3 text-stone-600 bg-white px-4 py-2 rounded-sm shadow-sm border border-stone-300">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {currentAvatar.emoji}
              </span>
              <span className="font-semibold">{player.name}</span>
            </div>
            <div className="w-1 h-1 bg-stone-400 rounded-full" />
            <span className="font-mono text-sm">Уровень {player.level}</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* Play button - office style */}
          <button
            onClick={onPlay}
            className="w-full bg-stone-700 text-white py-5 rounded-sm font-bold text-xl flex items-center justify-center gap-3 hover:bg-stone-600 transition-colors shadow-md border-b-4 border-stone-900"
          >
            <Play className="w-6 h-6" />
            НАЧАТЬ ИГРУ
          </button>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={onProfile}
              className="bg-white text-stone-700 py-4 rounded-sm flex flex-col items-center gap-2 hover:bg-stone-50 transition-colors shadow-sm border border-stone-300"
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-semibold">Профиль</span>
            </button>

            <button
              onClick={onLeaderboard}
              className="bg-white text-stone-700 py-4 rounded-sm flex flex-col items-center gap-2 hover:bg-stone-50 transition-colors shadow-sm border border-stone-300"
            >
              <Trophy className="w-6 h-6" />
              <span className="text-xs font-semibold">Рекорды</span>
            </button>

            <button
              onClick={onSettings}
              className="bg-white text-stone-700 py-4 rounded-sm flex flex-col items-center gap-2 hover:bg-stone-50 transition-colors shadow-sm border border-stone-300"
            >
              <Settings className="w-6 h-6" />
              <span className="text-xs font-semibold">Настройки</span>
            </button>
          </div>
        </div>

        {/* Office footer */}
        <div className="text-center text-xs text-stone-500 font-mono">
          <p>Dunder Mifflin Paper Company, Inc.</p>
        </div>
      </div>
    </div>
  );
}
