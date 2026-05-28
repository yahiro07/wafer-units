import { lowClip } from "@/utils/number-utils";
import { power2 } from "@/utils/synth-math-utils";

export function createEnvelopeGeneratorADSR(
  audioContext: AudioContext,
  egParams: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  },
  egConfig: {
    attackMaxSec: number;
    decayMaxSec: number;
    releaseMaxSec: number;
  },
) {
  const gainNode = audioContext.createGain();

  const times = {
    attack: power2(egParams.attack) * egConfig.attackMaxSec,
    decay: power2(egParams.decay) * egConfig.decayMaxSec,
    release: power2(egParams.release) * egConfig.releaseMaxSec,
  };

  const { gain } = gainNode;
  return {
    node: gainNode,
    getReleaseTime() {
      return times.release;
    },
    triggerAttack() {
      const now = audioContext.currentTime;
      gain.cancelScheduledValues(now);
      gain.setValueAtTime(gainNode.gain.value, now);

      gain.setValueAtTime(0.001, now);
      gain.exponentialRampToValueAtTime(1, now + times.attack);

      gain.exponentialRampToValueAtTime(
        lowClip(egParams.sustain, 0.001),
        now + times.attack + times.decay,
      );
    },
    triggerRelease() {
      const now = audioContext.currentTime;
      gain.cancelScheduledValues(now);
      gain.setValueAtTime(gainNode.gain.value, now);

      gain.exponentialRampToValueAtTime(0.001, now + times.release);
      gain.setValueAtTime(0, now + times.release);
    },
  };
}
