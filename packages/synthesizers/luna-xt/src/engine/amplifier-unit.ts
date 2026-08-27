import { OscId } from "@/defs/definitions";
import { oscParameterKeys, SynthesisBus } from "@/engine/engine-defs";
import { mapUnaryFrom, mapUnaryTo, power2 } from "@/utils/synth-math-utils";

type AmplifierUnit = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  gateOn(time: number): void;
  gateOff(time: number, applyRelease: boolean): number;
  mute(time: number): number;
  cleanup(): void;
};

const configs = {
  expDecayTimeMax: 4,
  linDecayTimeMax: 2,
  expReleaseTimeMax: 4,
  linReleaseTimeMax: 2,
};

const helpers = {
  mapHeadCorn(prHead: number) {
    return {
      height: mapUnaryTo(power2(prHead), 0, 4),
      duration: mapUnaryTo(prHead, 0.02, 0.01),
    };
  },
  mapDecaySustain(prDecayOriginal: number) {
    if (prDecayOriginal < 0.5) {
      const u = mapUnaryFrom(prDecayOriginal, 0, 0.5);
      return { decay: u, sustain: 0 };
    } else {
      const ex = mapUnaryFrom(prDecayOriginal, 1, 0.5);
      const cx = 1 - ex;
      return {
        decay: power2(ex) * 0.3,
        sustain: 0.15 + power2(cx) * 0.85,
      };
    }
  },
  calcDecayTime(prDecay: number, isExponential: boolean) {
    const minDecayTime = 0.1;
    if (isExponential) {
      return prDecay * configs.expDecayTimeMax + minDecayTime;
    } else {
      return prDecay ** 2 * configs.linDecayTimeMax + minDecayTime;
    }
  },
  calcReleaseTime(
    prAmpRelease: number,
    applyRelease: boolean,
    isExponential: boolean,
  ) {
    const jumpTime = 0.001;
    if (!applyRelease) return jumpTime;
    if (isExponential) {
      return prAmpRelease ** 2 * configs.expReleaseTimeMax + jumpTime;
    } else {
      return prAmpRelease ** 3 * configs.linReleaseTimeMax + jumpTime;
    }
  },
};

export function createAmplifierUnit(
  oscId: OscId,
  bus: SynthesisBus,
): AmplifierUnit {
  const pk = oscParameterKeys[oscId];
  const ac = bus.audioContext;
  const headNode = ac.createGain(); //automated for Punch
  headNode.gain.value = 1;

  const secondNode = ac.createGain(); //automated for A-D-S
  secondNode.gain.value = 0;

  const tailNode = ac.createGain(); //automated for R
  tailNode.gain.value = 1;
  headNode.connect(secondNode).connect(tailNode);

  return {
    inputNode: headNode,
    outputNode: tailNode,
    gateOn(time) {
      const pr = bus.parameters;
      const prHead = pr.ampHead;
      if (prHead > 0) {
        const { height, duration } = helpers.mapHeadCorn(prHead);
        headNode.gain.setValueAtTime(1 + height, time);
        headNode.gain.linearRampToValueAtTime(1, time + duration);
      }

      const prDecayOriginal = pr[pk.decay];
      const { decay, sustain } = helpers.mapDecaySustain(prDecayOriginal);
      const prExponential = pr.ampExponential;
      secondNode.gain.setValueAtTime(1, time);
      if (decay < 1) {
        if (prExponential) {
          const decayTime = helpers.calcDecayTime(decay, true);
          secondNode.gain.exponentialRampToValueAtTime(
            sustain + 1e-4,
            time + decayTime,
          );
          secondNode.gain.setValueAtTime(sustain, time + decayTime);
        } else {
          const decayTime = helpers.calcDecayTime(decay, false);
          secondNode.gain.linearRampToValueAtTime(sustain, time + decayTime);
        }
      }
    },
    gateOff(time, applyRelease) {
      const pr = bus.parameters;
      const prExponential = pr.ampExponential;
      const prRelease = pr.ampRelease;
      tailNode.gain.setValueAtTime(1, time);

      let releaseTime = 0;

      if (prExponential) {
        releaseTime = helpers.calcReleaseTime(prRelease, applyRelease, true);
        tailNode.gain.exponentialRampToValueAtTime(1e-4, time + releaseTime);
        tailNode.gain.setValueAtTime(0, time + releaseTime);
      } else {
        releaseTime = helpers.calcReleaseTime(prRelease, applyRelease, false);
        tailNode.gain.linearRampToValueAtTime(0, time + releaseTime);
      }

      return time + releaseTime;
    },
    mute(time) {
      tailNode.gain.cancelScheduledValues(time);
      tailNode.gain.linearRampToValueAtTime(0, time + 0.001);
      tailNode.gain.setValueAtTime(0, time);
      return time + 0.001;
    },
    cleanup() {
      headNode.disconnect();
      secondNode.disconnect();
    },
  };
}
