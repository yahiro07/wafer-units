import { fixedParameters, LaneId } from "@/defs/definitions";
import {
  ampParameterKeys,
  laneParameterKeys,
  SynthesisBus,
} from "@/engine/engine-defs";
import { connectNodes, disconnectNodes } from "@/engine/webaudio-helpers";
import {
  invPower2,
  mapUnaryFrom,
  mapUnaryTo,
  power2,
} from "@/utils/synth-math-utils";

type AmplifierUnit = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  gateOn(time: number): void;
  gateOff(time: number, applyRelease: boolean): number;
  mute(time: number): number;
  cleanup(): void;
};

const configs = {
  expAttackTimeMax: 2,
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
  mapDecayParameterToADS(prDecayOriginal: number, prDecayAltAttack: boolean) {
    if (!prDecayAltAttack) {
      //D, D-S
      if (prDecayOriginal < 0.5) {
        const u = mapUnaryFrom(prDecayOriginal, 0, 0.5);
        return { attack: 0, decay: u, sustain: 0 };
      } else {
        const ex = mapUnaryFrom(prDecayOriginal, 1, 0.5);
        const cx = 1 - ex;
        return {
          attack: 0,
          decay: power2(ex) * 0.3,
          sustain: 0.15 + power2(cx) * 0.85,
        };
      }
    } else {
      //A, A-D-S
      if (prDecayOriginal < 0.5) {
        const u = mapUnaryFrom(prDecayOriginal, 0, 0.5);
        return { attack: u, decay: 0, sustain: 1 };
      } else {
        const ex = mapUnaryFrom(prDecayOriginal, 1, 0.5);
        const cx = 1 - ex;
        return {
          attack: power2(ex) * 0.1,
          decay: power2(ex) * 0.2,
          sustain: 0.15 + power2(cx) * 0.85,
        };
      }
    }
  },
  calcAttackTime(prAttack: number, isExponential: boolean) {
    const minAttackTime = 0.001;
    if (isExponential) {
      return prAttack ** 2 * configs.expAttackTimeMax + minAttackTime;
    } else {
      return prAttack ** 2 * configs.expAttackTimeMax + minAttackTime;
    }
  },
  calcDecayTime(prDecay: number, isExponential: boolean) {
    const minDecayTime = 0.4;
    if (isExponential) {
      return invPower2(prDecay) * configs.expDecayTimeMax + minDecayTime;
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
      return invPower2(prAmpRelease) * configs.expReleaseTimeMax + jumpTime;
    } else {
      return prAmpRelease ** 3 * configs.linReleaseTimeMax + jumpTime;
    }
  },
};

export function createAmplifierUnit(
  bus: SynthesisBus,
  laneId: LaneId,
): AmplifierUnit {
  const pk = ampParameterKeys[laneId];
  const lpk = laneParameterKeys[laneId];
  const ac = bus.audioContext;
  const headNode = ac.createGain(); //automated for A-D-S
  headNode.gain.value = 0;

  const tailNode = ac.createGain(); //automated for R
  tailNode.gain.value = 1;

  const gainNode = ac.createGain(); //volume control
  gainNode.gain.value = 1;

  connectNodes(headNode, tailNode, gainNode);

  return {
    inputNode: headNode,
    outputNode: gainNode,
    gateOn(time) {
      const pr = bus.parameters;
      const prHead = fixedParameters.ampHead;
      if (prHead > 0) {
        const { height, duration } = helpers.mapHeadCorn(prHead);
        gainNode.gain.setValueAtTime(1 + height, time);
        gainNode.gain.linearRampToValueAtTime(1, time + duration);
      }

      const { attack, decay, sustain } = helpers.mapDecayParameterToADS(
        pr[pk.decay],
        pr[pk.decayAltAttack],
      );
      const prExponential = fixedParameters.ampExponential;

      if (prExponential) {
        const attackTime = helpers.calcAttackTime(attack, true);
        const decayTime = helpers.calcDecayTime(decay, true);
        headNode.gain.setValueAtTime(0, time);
        headNode.gain.linearRampToValueAtTime(1, time + attackTime);
        headNode.gain.exponentialRampToValueAtTime(
          sustain + 1e-4,
          time + attackTime + decayTime,
        );
        headNode.gain.setValueAtTime(sustain, time + attackTime + decayTime);
      } else {
        headNode.gain.setValueAtTime(1, time);
        const decayTime = helpers.calcDecayTime(decay, false);
        headNode.gain.linearRampToValueAtTime(sustain, time + decayTime);
      }

      gainNode.gain.value = 1;
    },
    gateOff(time, applyRelease) {
      const pr = bus.parameters;
      const prExponential = fixedParameters.ampExponential;
      const prRelease = pr[pk.release];
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
      disconnectNodes(headNode, tailNode);
    },
  };
}
