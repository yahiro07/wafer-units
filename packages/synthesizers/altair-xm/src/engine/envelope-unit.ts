import { fixedParameters, LaneId } from "@/defs/definitions";
import { createCustomCurveBuilder } from "@/engine/custom-curve-builder";
import { ampParameterKeys, SynthesisBus } from "@/engine/engine-defs";
import { connectNodes, disconnectNodes } from "@/engine/webaudio-helpers";
import { mapUnaryTo, power2 } from "@/utils/synth-math-utils";

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
  bus: SynthesisBus,
  laneId: LaneId,
): EnvelopeUnit {
  const pk = ampParameterKeys[laneId];
  const ac = bus.audioContext;

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

      const pr = bus.parameters;
      const prHead = fixedParameters.ampHead;
      if (prHead > 0) {
        const { height, duration } = helpers.mapHeadCorn(prHead);
        gainNode.gain.setValueAtTime(1 + height, time);
        gainNode.gain.linearRampToValueAtTime(1, time + duration);
      } else {
        gainNode.gain.value = 1;
      }

      const { attack, decay, sustain } = helpers.mapDecayParameterToADS({
        attack: pr[pk.attack],
        decay: pr[pk.decay],
        sustain: pr[pk.sustain],
        full: pr[pk.full],
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
      tailNode.gain.setValueAtTime(1, time);
      if (applyRelease) {
        const pr = bus.parameters;
        const prRelease = pr[pk.release];
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
