const MIN_LFO_HZ = 0.5;
const MAX_LFO_HZ = 40;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function mapLfoRateHz(value: number): number {
  return MIN_LFO_HZ * (MAX_LFO_HZ / MIN_LFO_HZ) ** clamp01(value);
}

export function createSineLfo(audioContext: AudioContext) {
  const osc = audioContext.createOscillator();
  const depth = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.value = mapLfoRateHz(0.5);
  depth.gain.value = 0;
  osc.connect(depth);
  osc.start();

  return {
    output: depth,
    apply(rate: number, depthAmount: number, time: number) {
      osc.frequency.setValueAtTime(mapLfoRateHz(rate), time);
      depth.gain.setValueAtTime(depthAmount, time);
    },
    cleanup() {
      try {
        osc.stop();
      } catch {
        // already stopped
      }
      osc.disconnect();
      depth.disconnect();
    },
  };
}
