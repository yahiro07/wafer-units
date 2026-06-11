import { lowClip } from "mofus/ax";
import { power2 } from "mofus/mo-synthesis";

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
    triggerAttack(time?: number) {
      const t =
        time && time > audioContext.currentTime
          ? time
          : audioContext.currentTime;
      gain.cancelScheduledValues(t);
      gain.setValueAtTime(gainNode.gain.value, t);

      gain.setValueAtTime(0.001, t);
      gain.exponentialRampToValueAtTime(1, t + times.attack);

      gain.exponentialRampToValueAtTime(
        lowClip(egParams.sustain, 0.001),
        t + times.attack + times.decay,
      );
    },
    triggerRelease(time?: number) {
      const t =
        time && time > audioContext.currentTime
          ? time
          : audioContext.currentTime;
      gain.cancelScheduledValues(t);
      gain.setValueAtTime(gainNode.gain.value, t);

      gain.exponentialRampToValueAtTime(0.001, t + times.release);
      gain.setValueAtTime(0, t + times.release);
    },
  };
}
