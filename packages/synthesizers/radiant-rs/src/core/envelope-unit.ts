import { mapUnaryTo } from "@lib/mu2609/utils/helpers";
import { power2 } from "@lib/mu2609/utils/synth-math-utils";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { createCustomCurveBuilder } from "./custom-curve-builder";

type EnvelopeParameters = {
  attack: number;
  decay: number;
  sustain: number;
  // full: boolean;
  release: number;
};

type EnvelopeUnit = {
  outputNode: AudioNode; //DC, mostly 0~1
  gateOn(time: number): void;
  gateOff(time: number, applyRelease: boolean): number;
  cleanup(): void;
};

const configs = {
  expAttackTimeMax: 2,
  expDecayTimeMax: 4,
  expReleaseTimeMax: 4,
};

const helpers = {
  mapHeadCorn(prHead: number) {
    return {
      height: mapUnaryTo(power2(prHead), 0, 4),
      duration: mapUnaryTo(prHead, 0.02, 0.01),
    };
  },
  mapDecayParameterToADS(pr: {
    attack: number;
    decay: number;
    sustain: number;
    full: boolean;
  }) {
    if (pr.full) {
      return { attack: pr.attack, decay: pr.decay, sustain: pr.sustain };
    } else {
      //D-S
      const originalDecay = pr.decay;
      return {
        attack: 0,
        decay: mapUnaryTo(originalDecay, 0.3, 0),
        sustain: mapUnaryTo(power2(originalDecay), 0, 1),
      };
    }
  },
  calcAttackTime(prAttack: number) {
    const minAttackTime = 0.001;
    return prAttack ** 2 * configs.expAttackTimeMax + minAttackTime;
  },
  calcDecayTime(prDecay: number) {
    const minDecayTime = 0.2;
    return prDecay * configs.expDecayTimeMax + minDecayTime;
  },
  calcReleaseTime(prAmpRelease: number) {
    const jumpTime = 0.001;
    return prAmpRelease * configs.expReleaseTimeMax + jumpTime;
  },
};

const customCurve = createCustomCurveBuilder();

export function createEnvelopeUnit(
  ac: AudioContext,
  getParameters: () => EnvelopeParameters,
): EnvelopeUnit {
  const sourceNode = ac.createConstantSource();
  sourceNode.offset.value = 1;

  const headNode = ac.createGain(); //automated for A-D-S
  headNode.gain.value = 0;

  const tailNode = ac.createGain(); //automated for R
  tailNode.gain.value = 1;

  const gainNode = ac.createGain(); //volume control
  gainNode.gain.value = 1;

  connectNodes(sourceNode, headNode, tailNode, gainNode);
  sourceNode.start();

  return {
    outputNode: gainNode,
    gateOn(time) {
      headNode.gain.cancelScheduledValues(time);
      tailNode.gain.cancelScheduledValues(time);
      gainNode.gain.cancelScheduledValues(time);

      const pr = getParameters();
      gainNode.gain.value = 1;

      const { attack, decay, sustain } = helpers.mapDecayParameterToADS({
        attack: pr.attack,
        decay: pr.decay,
        sustain: pr.sustain,
        full: true,
      });
      const attackTime = helpers.calcAttackTime(attack);
      const decayTime = helpers.calcDecayTime(decay);
      headNode.gain.setValueAtTime(0, time);
      headNode.gain.linearRampToValueAtTime(1, time + attackTime);
      headNode.gain.setValueCurveAtTime(
        customCurve.map(1, sustain, 0.03),
        time + attackTime,
        decayTime,
      );
      tailNode.gain.setValueAtTime(1, time);
    },
    gateOff(time, applyRelease) {
      headNode.gain.cancelScheduledValues(time);
      tailNode.gain.cancelScheduledValues(time);
      gainNode.gain.cancelScheduledValues(time);

      tailNode.gain.setValueAtTime(1, time);
      if (applyRelease) {
        const pr = getParameters();
        const prRelease = pr.release;
        let releaseTime = 0;
        releaseTime = helpers.calcReleaseTime(prRelease);
        tailNode.gain.setValueCurveAtTime(
          customCurve.map(1, 0, 0.01),
          time,
          releaseTime,
        );
        return time + releaseTime;
      } else {
        return time;
      }
    },
    cleanup() {
      sourceNode.stop();
      disconnectNodes(sourceNode, headNode, tailNode);
    },
  };
}

type AmplifierUnit = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  gateOn(time: number): void;
  gateOff(time: number, applyRelease: boolean): number;
  cleanup(): void;
};

export function createAmplifierUnit(
  ac: AudioContext,
  getParameters: () => EnvelopeParameters,
): AmplifierUnit {
  const ampEg = createEnvelopeUnit(ac, getParameters);
  const gainNode = ac.createGain();
  gainNode.gain.value = 0;
  ampEg.outputNode.connect(gainNode.gain);
  return {
    inputNode: gainNode,
    outputNode: gainNode,
    gateOn: ampEg.gateOn,
    gateOff: ampEg.gateOff,
    cleanup: ampEg.cleanup,
  };
}
