import { createChorus1 } from "./chorus1";
import { createChorus2 } from "./chorus2";
import { createChorus3 } from "./chorus3";
import { createChorus4 } from "./chorus4";
import { createChorus5 } from "./chorus5";
import { ChorusType, EffectParameters } from "./definitions";
import { IChorusEffect } from "./effect-types";

const chorusFactories: Record<ChorusType, (ctx: AudioContext) => IChorusEffect> =
  {
    1: createChorus1,
    2: createChorus2,
    3: createChorus3,
    4: createChorus4,
    5: createChorus5,
  };

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function setSmoothGain(
  gainNode: GainNode,
  value: number,
  audioContext: AudioContext,
) {
  const now = audioContext.currentTime;
  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setTargetAtTime(value, now, 0.015);
}

export function createEffect(
  audioContext: AudioContext,
  initialParameters: EffectParameters,
) {
  const state = {
    parameters: { ...initialParameters },
    chorusType: null as ChorusType | null,
    chorus: null as IChorusEffect | null,
  };
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();
  const bypassGain = audioContext.createGain();
  const effectGain = audioContext.createGain();

  inputNode.connect(bypassGain);
  bypassGain.connect(outputNode);
  effectGain.connect(outputNode);

  function disconnectChorus(chorus: IChorusEffect) {
    inputNode.disconnect(chorus.inputNode);
    chorus.outputNode.disconnect(effectGain);
    chorus.inputNode.disconnect();
    chorus.outputNode.disconnect();
    chorus.cleanupNodes?.();
  }

  function setChorusType(chorusType: ChorusType) {
    if (state.chorusType === chorusType && state.chorus) {
      return;
    }

    if (state.chorus) {
      disconnectChorus(state.chorus);
    }

    const chorus = chorusFactories[chorusType](audioContext);
    inputNode.connect(chorus.inputNode);
    chorus.outputNode.connect(effectGain);
    state.chorusType = chorusType;
    state.chorus = chorus;
  }

  function applyParameters() {
    const parameters = state.parameters;
    setChorusType(parameters.chorusType);
    state.chorus?.setLevel(clamp01(parameters.chorusLevel));
    setSmoothGain(bypassGain, parameters.isOn ? 0 : 1, audioContext);
    setSmoothGain(effectGain, parameters.isOn ? 1 : 0, audioContext);
  }

  applyParameters();

  return {
    inputNode,
    outputNode,
    setParameters(parameters: EffectParameters) {
      state.parameters = { ...parameters };
      applyParameters();
    },
    dispose() {
      if (state.chorus) {
        disconnectChorus(state.chorus);
        state.chorus = null;
        state.chorusType = null;
      }
      inputNode.disconnect();
      bypassGain.disconnect();
      effectGain.disconnect();
      outputNode.disconnect();
    },
  };
}
