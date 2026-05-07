
class SoundEngine {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.ctx;
  }

  private createGain(ctx: AudioContext, volume: number, duration: number) {
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    return gain;
  }

  play(type: 'click' | 'notify' | 'success' | 'process' | 'error') {
    try {
      const ctx = this.init();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      let duration = 0.1;
      let volume = 0.1;

      switch (type) {
        case 'click':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
          duration = 0.1;
          volume = 0.05;
          break;
        case 'notify':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(600, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.2);
          duration = 0.3;
          volume = 0.08;
          break;
        case 'success':
          this.playChord([523.25, 659.25, 783.99], 0.5); // C5, E5, G5
          return;
        case 'process':
          osc.type = 'square';
          osc.frequency.setValueAtTime(150, ctx.currentTime);
          duration = 0.05;
          volume = 0.02;
          break;
        case 'error':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(200, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
          duration = 0.4;
          volume = 0.05;
          break;
      }

      const gain = this.createGain(ctx, volume, duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context blocked by browser policy");
    }
  }

  private playChord(freqs: number[], duration: number) {
    const ctx = this.init();
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = this.createGain(ctx, 0.05, duration);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime + (i * 0.05));
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + (i * 0.05));
      osc.stop(ctx.currentTime + duration + (i * 0.05));
    });
  }
}

export const sounds = new SoundEngine();
