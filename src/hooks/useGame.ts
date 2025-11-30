import { useState, useEffect, useRef, useCallback } from 'react';
import type { GameState, Box, Player } from '../types/game';
import { storage } from '../utils/storage';
import { soundManager } from '../utils/sounds';
import { vibrationManager } from '../utils/vibration';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 450;
const BOX_SIZE = 40;
const INITIAL_SPEED = 3;
const CORNER_DANGER_ZONE = 50;

const COLORS: Array<'red' | 'yellow' | 'green' | 'blue'> = ['red', 'yellow', 'green', 'blue'];

const getRandomColor = (): 'red' | 'yellow' | 'green' | 'blue' => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

export function useGame() {
  const [gameState, setGameState] = useState<GameState>({
    status: 'idle',
    score: 0,
    startTime: 0,
    box: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      size: BOX_SIZE,
      velocityX: INITIAL_SPEED,
      velocityY: INITIAL_SPEED,
      color: 'red',
    },
  });

  const [player, setPlayer] = useState<Player>(storage.getPlayer());
  const [taps, setTaps] = useState(0);
  const animationFrameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);

  const checkCornerCollision = useCallback((box: Box): boolean => {
    const corners = [
      { x: 0, y: 0 },
      { x: CANVAS_WIDTH, y: 0 },
      { x: 0, y: CANVAS_HEIGHT },
      { x: CANVAS_WIDTH, y: CANVAS_HEIGHT },
    ];

    const boxCenterX = box.x + box.size / 2;
    const boxCenterY = box.y + box.size / 2;

    return corners.some(corner => {
      const distance = Math.sqrt(
        Math.pow(boxCenterX - corner.x, 2) + Math.pow(boxCenterY - corner.y, 2)
      );
      return distance < CORNER_DANGER_ZONE;
    });
  }, []);

  const updateGame = useCallback((timestamp: number) => {
    if (gameState.status !== 'playing') return;

    if (!lastUpdateRef.current) {
      lastUpdateRef.current = timestamp;
    }

    const delta = timestamp - lastUpdateRef.current;
    lastUpdateRef.current = timestamp;

    setGameState(prev => {
      const box = { ...prev.box };
      let colorChanged = false;

      box.x += box.velocityX * (delta / 16);
      box.y += box.velocityY * (delta / 16);

      if (box.x <= 0 || box.x + box.size >= CANVAS_WIDTH) {
        box.velocityX *= -1;
        box.x = box.x <= 0 ? 0 : CANVAS_WIDTH - box.size;
        box.color = getRandomColor();
        colorChanged = true;
        soundManager.bounce();
      }

      if (box.y <= 0 || box.y + box.size >= CANVAS_HEIGHT) {
        box.velocityY *= -1;
        box.y = box.y <= 0 ? 0 : CANVAS_HEIGHT - box.size;
        if (!colorChanged) {
          box.color = getRandomColor();
        }
        soundManager.bounce();
      }

      if (checkCornerCollision(box)) {
        soundManager.gameOver();
        vibrationManager.gameOver();
        
        const finalScore = Math.floor((Date.now() - prev.startTime) / 1000);
        
        let updatedPlayer = { ...player };
        updatedPlayer.gamesPlayed++;
        updatedPlayer.totalPlayTime += finalScore;
        
        if (finalScore > updatedPlayer.bestScore) {
          updatedPlayer.bestScore = finalScore;
        }
        
        const expGained = Math.floor(finalScore * 2);
        updatedPlayer = storage.addExperience(updatedPlayer, expGained);
        updatedPlayer = storage.checkAchievements(updatedPlayer, finalScore, taps);
        
        storage.savePlayer(updatedPlayer);
        storage.saveScore({
          id: crypto.randomUUID(),
          score: finalScore,
          date: Date.now(),
          level: updatedPlayer.level,
        });
        
        setPlayer(updatedPlayer);

        return {
          ...prev,
          status: 'gameover',
          score: finalScore,
          box,
        };
      }

      const currentScore = Math.floor((Date.now() - prev.startTime) / 1000);

      return {
        ...prev,
        score: currentScore,
        box,
      };
    });

    animationFrameRef.current = requestAnimationFrame(updateGame);
  }, [gameState.status, checkCornerCollision, player, taps]);

  useEffect(() => {
    if (gameState.status === 'playing') {
      lastUpdateRef.current = 0;
      animationFrameRef.current = requestAnimationFrame(updateGame);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.status, updateGame]);

  const startGame = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const speed = INITIAL_SPEED;

    setGameState({
      status: 'playing',
      score: 0,
      startTime: Date.now(),
      box: {
        x: CANVAS_WIDTH / 2 - BOX_SIZE / 2,
        y: CANVAS_HEIGHT / 2 - BOX_SIZE / 2,
        size: BOX_SIZE,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed,
        color: getRandomColor(),
      },
    });
    setTaps(0);
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'paused' }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'playing' }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      status: 'idle',
      score: 0,
      startTime: 0,
      box: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        size: BOX_SIZE,
        velocityX: INITIAL_SPEED,
        velocityY: INITIAL_SPEED,
        color: 'red',
      },
    });
  }, []);

  const handleBoxClick = useCallback(() => {
    if (gameState.status !== 'playing') return;

    setTaps(prev => prev + 1);
    soundManager.tap();
    vibrationManager.tap();

    setGameState(prev => {
      const box = { ...prev.box };
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.sqrt(box.velocityX ** 2 + box.velocityY ** 2);
      
      box.velocityX = Math.cos(angle) * speed;
      box.velocityY = Math.sin(angle) * speed;

      return { ...prev, box };
    });
  }, [gameState.status]);

  const updatePlayer = useCallback((updates: Partial<Player>) => {
    const updated = { ...player, ...updates };
    setPlayer(updated);
    storage.savePlayer(updated);
  }, [player]);

  return {
    gameState,
    player,
    taps,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    handleBoxClick,
    updatePlayer,
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT,
    cornerDangerZone: CORNER_DANGER_ZONE,
  };
}
