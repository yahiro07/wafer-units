import { clampValue, mapUnaryTo } from "beams/ax/number-utils";
import { midiToFrequency, power2 } from "beams/mo-synthesis/synth-math-utils";
import { createEffectWrapper } from "@/synthesis/effect-wrapper";

export function createHighPassFilterBlock(
  audioContext: AudioContext,
  noteNumber: number,
) {
  const filterNode = audioContext.createBiquadFilter();
  filterNode.type = "highpass";
  const wrapper = createEffectWrapper(audioContext, filterNode);
  return {
    inputNode: wrapper.inputNode,
    outputNode: wrapper.outputNode,
    setupNodes: wrapper.setupNodes,
    cleanupNodes: wrapper.cleanupNodes,
    updateNodeParameters(params: {
      enabled: boolean;
      cutoff: number;
      peak: number;
    }) {
      wrapper.setEnabled(params.enabled);

      const lowNote = noteNumber - 12;
      const highNote = noteNumber + 48;
      const targetNote = clampValue(
        mapUnaryTo(params.cutoff, lowNote, highNote),
        0,
        127,
      );
      const freq = midiToFrequency(targetNote);
      if (filterNode.frequency.value !== freq) {
        filterNode.frequency.value = freq;
      }
      const q = mapUnaryTo(power2(params.peak), 0, 36);
      if (filterNode.Q.value !== q) {
        filterNode.Q.value = q;
      }
    },
  };
}

export function createLowPassFilterBlock(
  audioContext: AudioContext,
  noteNumber: number,
) {
  const filterNode = audioContext.createBiquadFilter();
  filterNode.type = "lowpass";
  const wrapper = createEffectWrapper(audioContext, filterNode);
  return {
    inputNode: wrapper.inputNode,
    outputNode: wrapper.outputNode,
    setupNodes: wrapper.setupNodes,
    cleanupNodes: wrapper.cleanupNodes,
    updateNodeParameters(params: {
      enabled: boolean;
      cutoff: number;
      peak: number;
    }) {
      wrapper.setEnabled(params.enabled);

      const lowNote = noteNumber - 24;
      const highNote = 127;
      const targetNote = clampValue(
        mapUnaryTo(params.cutoff, lowNote, highNote),
        0,
        127,
      );
      const freq = midiToFrequency(targetNote);
      if (filterNode.frequency.value !== freq) {
        filterNode.frequency.value = freq;
      }
      const q = mapUnaryTo(power2(params.peak), 0, 36);
      if (filterNode.Q.value !== q) {
        filterNode.Q.value = q;
      }
    },
  };
}
