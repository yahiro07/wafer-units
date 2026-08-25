import { SynthesisBus } from "@/engine/engine-defs";

type AmplifierUnit = {
  inputNode: GainNode;
  outputNode: GainNode;
  gateOn(time: number): void;
  gateOff(time: number, applyRelease: boolean): number;
  mute(time: number): number;
  cleanup(): void;
};

const configs = {
  expReleaseTimeMax: 4,
  linReleaseTimeMax: 2,
};

const helpers = {
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

export function createAmplifierUnit(bus: SynthesisBus): AmplifierUnit {
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
      headNode.gain.setValueAtTime(1, time);
    },
    gateOff(time, applyRelease) {
      const pr = bus.parameters;
      tailNode.gain.setValueAtTime(1, time);

      let releaseTime = 0;

      if (pr.ampExponential) {
        releaseTime = helpers.calcReleaseTime(
          pr.ampRelease,
          applyRelease,
          true,
        );
        tailNode.gain.exponentialRampToValueAtTime(1e-4, time + releaseTime);
      } else {
        releaseTime = helpers.calcReleaseTime(
          pr.ampRelease,
          applyRelease,
          false,
        );
        tailNode.gain.linearRampToValueAtTime(1e-4, time + releaseTime);
      }
      tailNode.gain.setValueAtTime(0, time + releaseTime);

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
