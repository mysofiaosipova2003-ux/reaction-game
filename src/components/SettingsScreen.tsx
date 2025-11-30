import React from 'react';
import { Volume2, VolumeX, Vibrate, ArrowLeft } from 'lucide-react';
import type { Settings } from '../types/game';

interface SettingsScreenProps {
  settings: Settings;
  onBack: () => void;
  onSettingsChange: (settings: Settings) => void;
}

export function SettingsScreen({ settings, onBack, onSettingsChange }: SettingsScreenProps) {
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
          <h2 className="text-3xl font-bold">Настройки</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-2xl">
              <div className="flex items-center gap-3">
                {settings.sound ? (
                  <Volume2 className="w-6 h-6 text-white" />
                ) : (
                  <VolumeX className="w-6 h-6 text-neutral-500" />
                )}
                <span className="font-semibold">Звук</span>
              </div>
              <button
                onClick={() =>
                  onSettingsChange({ ...settings, sound: !settings.sound })
                }
                className={`w-14 h-8 rounded-full transition-colors ${
                  settings.sound ? 'bg-white' : 'bg-neutral-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full transition-transform ${
                    settings.sound
                      ? 'translate-x-7 bg-black'
                      : 'translate-x-1 bg-neutral-500'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-2xl">
              <div className="flex items-center gap-3">
                <Vibrate className={`w-6 h-6 ${settings.vibration ? 'text-white' : 'text-neutral-500'}`} />
                <span className="font-semibold">Вибрация</span>
              </div>
              <button
                onClick={() =>
                  onSettingsChange({
                    ...settings,
                    vibration: !settings.vibration,
                  })
                }
                className={`w-14 h-8 rounded-full transition-colors ${
                  settings.vibration ? 'bg-white' : 'bg-neutral-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full transition-transform ${
                    settings.vibration
                      ? 'translate-x-7 bg-black'
                      : 'translate-x-1 bg-neutral-500'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
