import React from 'react';
import { Play, RotateCcw, Settings } from 'lucide-react';

interface PauseScreenProps {
  onResume: () => void;
  onRestart: () => void;
  onSettings: () => void;
}

export function PauseScreen({ onResume, onRestart, onSettings }: PauseScreenProps) {
  return (
    <div className="fixed inset-0 bg-stone-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-sm p-8 max-w-sm w-full space-y-6 shadow-2xl border-4 border-stone-300">
        <div className="text-center">
          <div className="text-xs font-mono text-stone-500 mb-2">КОНФЕРЕНЦ-ЗАЛ</div>
          <h2 className="text-stone-800 text-3xl font-bold">ПАУЗА</h2>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={onResume}
            className="w-full bg-stone-700 text-white py-4 rounded-sm font-bold text-lg flex items-center justify-center gap-3 hover:bg-stone-600 transition-colors border-b-4 border-stone-900"
          >
            <Play className="w-5 h-5" />
            Продолжить
          </button>

          <button
            onClick={onRestart}
            className="w-full bg-white text-stone-700 border-2 border-stone-300 py-4 rounded-sm font-semibold flex items-center justify-center gap-3 hover:bg-stone-50 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Начать заново
          </button>

          <button
            onClick={onSettings}
            className="w-full bg-white text-stone-700 border-2 border-stone-300 py-4 rounded-sm font-semibold flex items-center justify-center gap-3 hover:bg-stone-50 transition-colors"
          >
            <Settings className="w-5 h-5" />
            Настройки
          </button>
        </div>

        <div className="text-center text-xs text-stone-500 font-mono pt-4 border-t border-stone-200">
          <p>Dunder Mifflin Paper Company</p>
        </div>
      </div>
    </div>
  );
}
