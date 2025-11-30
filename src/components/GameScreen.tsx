import React from 'react';
import { Clock, Trophy, Pause } from 'lucide-react';
import { TVFrame } from './TVFrame';
import { GameCanvas } from './GameCanvas';
import type { GameState, Player } from '../types/game';

interface GameScreenProps {
  gameState: GameState;
  player: Player;
  canvasWidth: number;
  canvasHeight: number;
  cornerDangerZone: number;
  onBoxClick: () => void;
  onPause: () => void;
  onStart: () => void;
}

export function GameScreen({
  gameState,
  player,
  canvasWidth,
  canvasHeight,
  cornerDangerZone,
  onBoxClick,
  onPause,
  onStart,
}: GameScreenProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-50 flex flex-col items-center justify-center gap-6 p-6">
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex items-center gap-2 bg-white border-2 border-stone-300 px-4 py-2 rounded-sm shadow-sm">
          <Clock className="w-4 h-4 text-stone-600" />
          <span className="text-stone-800 font-mono text-lg font-semibold">
            {formatTime(gameState.score)}
          </span>
        </div>
        
        <div className="flex items-center gap-2 bg-white border-2 border-amber-400 px-4 py-2 rounded-sm shadow-sm">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span className="text-stone-800 font-mono text-lg font-semibold">
            {formatTime(player.bestScore)}
          </span>
        </div>
      </div>

      <TVFrame className="w-full max-w-md">
        <div style={{ aspectRatio: `${canvasWidth} / ${canvasHeight}` }}>
          <GameCanvas
            box={gameState.box}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            cornerDangerZone={cornerDangerZone}
            onBoxClick={onBoxClick}
            isPlaying={gameState.status === 'playing'}
          />
        </div>
      </TVFrame>

      {gameState.status === 'idle' && (
        <button
          onClick={onStart}
          className="bg-stone-700 text-white px-8 py-4 rounded-sm font-bold text-lg hover:bg-stone-600 transition-colors shadow-md border-b-4 border-stone-900"
        >
          НАЧАТЬ ИГРУ
        </button>
      )}

      {gameState.status === 'playing' && (
        <button
          onClick={onPause}
          className="bg-white text-stone-700 border-2 border-stone-300 px-6 py-3 rounded-sm font-semibold flex items-center gap-2 hover:bg-stone-50 transition-colors shadow-sm"
        >
          <Pause className="w-5 h-5" />
          Пауза
        </button>
      )}
    </div>
  );
}
