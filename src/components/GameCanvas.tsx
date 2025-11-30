import React, { useEffect, useRef } from 'react';
import type { Box } from '../types/game';

interface GameCanvasProps {
  box: Box;
  canvasWidth: number;
  canvasHeight: number;
  cornerDangerZone: number;
  onBoxClick: () => void;
  isPlaying: boolean;
}

const COLOR_MAP = {
  red: '#dc2626',
  yellow: '#fbbf24',
  green: '#16a34a',
  blue: '#2563eb',
};

export function GameCanvas({
  box,
  canvasWidth,
  canvasHeight,
  cornerDangerZone,
  onBoxClick,
  isPlaying,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Office beige/brown background
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, '#d6c7a8');
    gradient.addColorStop(0.5, '#b8a88a');
    gradient.addColorStop(1, '#d6c7a8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Subtle paper texture lines
    ctx.strokeStyle = 'rgba(120, 100, 80, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvasHeight; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvasWidth, i);
      ctx.stroke();
    }

    // Draw corner danger zones - subtle office style
    const corners = [
      { x: 0, y: 0 },
      { x: canvasWidth, y: 0 },
      { x: 0, y: canvasHeight },
      { x: canvasWidth, y: canvasHeight },
    ];

    const boxCenterX = box.x + box.size / 2;
    const boxCenterY = box.y + box.size / 2;

    corners.forEach(corner => {
      const distance = Math.sqrt(
        Math.pow(boxCenterX - corner.x, 2) + Math.pow(boxCenterY - corner.y, 2)
      );
      const isDangerous = distance < cornerDangerZone;

      ctx.beginPath();
      ctx.arc(corner.x, corner.y, cornerDangerZone, 0, Math.PI * 2);
      ctx.fillStyle = isDangerous
        ? 'rgba(153, 27, 27, 0.25)'
        : 'rgba(80, 70, 60, 0.08)';
      ctx.fill();
    });

    // Draw DVD logo box
    const boxColor = COLOR_MAP[box.color];
    
    // Add shadow/depth effect
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    ctx.fillStyle = boxColor;
    ctx.fillRect(box.x, box.y, box.size, box.size);
    
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw "DVD" text with office styling
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DVD', box.x + box.size / 2, box.y + box.size / 2);
    
    // Add small border to DVD box
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(box.x, box.y, box.size, box.size);
  }, [box, canvasWidth, canvasHeight, cornerDangerZone]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvasWidth / rect.width;
    const scaleY = canvasHeight / rect.height;
    
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    if (
      clickX >= box.x &&
      clickX <= box.x + box.size &&
      clickY >= box.y &&
      clickY <= box.y + box.size
    ) {
      onBoxClick();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onClick={handleCanvasClick}
      className="w-full h-full cursor-pointer touch-none"
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
}
