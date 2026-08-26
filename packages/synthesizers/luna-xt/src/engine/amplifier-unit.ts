import { OscId } from "@/defs/definitions";
import { oscParameterKeys, SynthesisBus } from "@/engine/engine-defs";

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
  calcDecayTime(prDecay: number, isExponential: boolean) {
    const minDecayTime = 0.01;
    if (isExponential) {
      return prDecay ** 2 * configs.expDecayTimeMax + minDecayTime;
    } else {
      return prDecay ** 3 * configs.linDecayTimeMax + minDecayTime;
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
  const headNode = ac.createGain(); //automated for Head-A-D-S
  headNode.gain.value = 0;

  const tailNode = ac.createGain(); //automated for R
  tailNode.gain.value = 1;
  headNode.connect(tailNode);

  return {
    inputNode: headNode,
    outputNode: tailNode,
    gateOn(time) {
      const pr = bus.parameters;
      const prHead = pr.ampHead;
      const prDecay = pr[pk.decay];
      const prExponential = pr.ampExponential;
      headNode.gain.setValueAtTime(1, time);

      let decayTime = 0;
      if (prExponential) {
        decayTime = helpers.calcDecayTime(prDecay, true);
        headNode.gain.exponentialRampToValueAtTime(1e-4, time + decayTime);
        headNode.gain.setValueAtTime(0, time + decayTime);
      } else {
        decayTime = helpers.calcDecayTime(prDecay, false);
        headNode.gain.linearRampToValueAtTime(0, time + decayTime);
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
    },
  };
}
