class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private play(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  tap() {
    this.play(800, 0.1, 'sine');
  }

  bounce() {
    this.play(400, 0.05, 'square');
  }

  gameOver() {
    if (!this.enabled || !this.audioContext) return;
    this.play(200, 0.3, 'sawtooth');
    setTimeout(() => this.play(150, 0.5, 'sawtooth'), 100);
  }

  achievement() {
    this.play(1200, 0.1, 'sine');
    setTimeout(() => this.play(1400, 0.15, 'sine'), 100);
  }
}

export const soundManager = new SoundManager();
