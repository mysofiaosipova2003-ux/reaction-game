import React, { useState, useEffect } from 'react';
import { MainMenu } from './components/MainMenu';
import { GameScreen } from './components/GameScreen';
import { PauseScreen } from './components/PauseScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { useGame } from './hooks/useGame';
import { storage } from './utils/storage';
import { soundManager } from './utils/sounds';
import { vibrationManager } from './utils/vibration';

type Screen = 'menu' | 'game' | 'profile' | 'leaderboard' | 'settings';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [settings, setSettings] = useState(storage.getSettings());
  const game = useGame();

  useEffect(() => {
    soundManager.setEnabled(settings.sound);
    vibrationManager.setEnabled(settings.vibration);
  }, [settings.sound, settings.vibration]);

  useEffect(() => {
    const root = document.documentElement;
    
    if (settings.theme === 'light') {
      root.style.setProperty('--bg-primary', '#fef3c7');
      root.style.setProperty('--bg-secondary', '#fefce8');
      root.style.setProperty('--text-primary', '#57534e');
    } else if (settings.theme === 'retro') {
      root.style.setProperty('--bg-primary', '#d6c7a8');
      root.style.setProperty('--bg-secondary', '#e8dcc5');
      root.style.setProperty('--text-primary', '#57534e');
    } else {
      root.style.setProperty('--bg-primary', '#fef3c7');
      root.style.setProperty('--bg-secondary', '#fefce8');
      root.style.setProperty('--text-primary', '#57534e');
    }
  }, [settings.theme]);

  const handlePlay = () => {
    setCurrentScreen('game');
    game.startGame();
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
    game.resetGame();
  };

  const handleSettingsChange = (newSettings: typeof settings) => {
    setSettings(newSettings);
    storage.saveSettings(newSettings);
  };

  const handleAvatarChange = (avatar: number) => {
    game.updatePlayer({ avatar });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-50">
      {currentScreen === 'menu' && (
        <MainMenu
          player={game.player}
          onPlay={handlePlay}
          onProfile={() => setCurrentScreen('profile')}
          onLeaderboard={() => setCurrentScreen('leaderboard')}
          onSettings={() => setCurrentScreen('settings')}
        />
      )}

      {currentScreen === 'game' && (
        <>
          <GameScreen
            gameState={game.gameState}
            player={game.player}
            canvasWidth={game.canvasWidth}
            canvasHeight={game.canvasHeight}
            cornerDangerZone={game.cornerDangerZone}
            onBoxClick={game.handleBoxClick}
            onPause={game.pauseGame}
            onStart={game.startGame}
          />

          {game.gameState.status === 'paused' && (
            <PauseScreen
              onResume={game.resumeGame}
              onRestart={() => {
                game.resetGame();
                game.startGame();
              }}
              onSettings={() => {
                setCurrentScreen('settings');
                game.resetGame();
              }}
            />
          )}

          {game.gameState.status === 'gameover' && (
            <GameOverScreen
              score={game.gameState.score}
              player={game.player}
              onRestart={() => {
                game.resetGame();
                game.startGame();
              }}
              onMenu={handleBackToMenu}
            />
          )}
        </>
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen
          player={game.player}
          onBack={() => setCurrentScreen('menu')}
          onAvatarChange={handleAvatarChange}
        />
      )}

      {currentScreen === 'leaderboard' && (
        <LeaderboardScreen onBack={() => setCurrentScreen('menu')} />
      )}

      {currentScreen === 'settings' && (
        <SettingsScreen
          settings={settings}
          onBack={() => setCurrentScreen('menu')}
          onSettingsChange={handleSettingsChange}
        />
      )}
    </div>
  );
}

export default App;
