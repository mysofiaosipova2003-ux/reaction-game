class VibrationManager {
  private enabled = true;

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private vibrate(pattern: number | number[]) {
    if (!this.enabled || !navigator.vibrate) return;
    navigator.vibrate(pattern);
  }

  tap() {
    this.vibrate(10);
  }

  gameOver() {
    this.vibrate([100, 50, 100]);
  }

  achievement() {
    this.vibrate([50, 30, 50, 30, 50]);
  }
}

export const vibrationManager = new VibrationManager();
