import {
  allOsc1Ratios,
  allOscWaveTypes,
  OscWaveType,
  SynthParameters,
} from "@/defs/definitions";
import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { AutomationPort } from "wafer-host/unit-types";

const octaveMin = -2;
const octaveMax = 2;
const octaveSteps = octaveMax - octaveMin + 1;

function normalizeStepped(value: number, min: number, max: number) {
  return (value - min) / (max - min);
}

function denormalizeStepped(value: number, min: number, max: number) {
  return Math.round(value * (max - min)) + min;
}

function waveFromNormalized(value: number): OscWaveType {
  const index = Math.round(value * (allOscWaveTypes.length - 1));
  return allOscWaveTypes[index] ?? allOscWaveTypes[0];
}

function waveToNormalized(wave: OscWaveType) {
  const index = allOscWaveTypes.indexOf(wave);
  return Math.max(index, 0) / (allOscWaveTypes.length - 1);
}

function ratioFromNormalized(value: number) {
  const index = Math.round(value * (allOsc1Ratios.length - 1));
  return allOsc1Ratios[index] ?? allOsc1Ratios[0];
}

function ratioToNormalized(ratio: number) {
  const index = allOsc1Ratios.indexOf(ratio);
  return Math.max(index, 0) / (allOsc1Ratios.length - 1);
}

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "osc1Wave", steps: allOscWaveTypes.length },
      { id: "osc1Octave", steps: octaveSteps },
      { id: "osc1Ratio", steps: allOsc1Ratios.length },
      { id: "osc1Decay" },
      { id: "osc2Wave", steps: allOscWaveTypes.length },
      { id: "osc2ModAltMix", steps: 2 },
      { id: "osc2Mod" },
      { id: "osc2Decay" },
      { id: "ampRelease" },
      { id: "chorusLevel" },
      { id: "chorusAltReverb", steps: 2 },
      { id: "patchOctave", steps: octaveSteps },
      { id: "patchVolume" },
    ];
  },
  getParameter(id) {
    const { parameters } = store.state;
    if (id === "osc1Wave") {
      return waveToNormalized(parameters.osc1Wave);
    } else if (id === "osc2Wave") {
      return waveToNormalized(parameters.osc2Wave);
    } else if (id === "osc1Octave") {
      return normalizeStepped(parameters.osc1Octave, octaveMin, octaveMax);
    } else if (id === "patchOctave") {
      return normalizeStepped(parameters.patchOctave, octaveMin, octaveMax);
    } else if (id === "osc1Ratio") {
      return ratioToNormalized(parameters.osc1Ratio);
    } else if (id === "osc2ModAltMix") {
      return parameters.osc2ModAltMix ? 1 : 0;
    } else if (id === "chorusAltReverb") {
      return parameters.chorusAltReverb ? 1 : 0;
    } else {
      return parameters[id as keyof SynthParameters] as number;
    }
  },
  setParameter(id, value) {
    if (id === "osc1Wave") {
      actions.patchParameter("osc1Wave", waveFromNormalized(value));
    } else if (id === "osc2Wave") {
      actions.patchParameter("osc2Wave", waveFromNormalized(value));
    } else if (id === "osc1Octave") {
      actions.patchParameter(
        "osc1Octave",
        denormalizeStepped(value, octaveMin, octaveMax),
      );
    } else if (id === "patchOctave") {
      actions.patchParameter(
        "patchOctave",
        denormalizeStepped(value, octaveMin, octaveMax),
      );
    } else if (id === "osc1Ratio") {
      actions.patchParameter("osc1Ratio", ratioFromNormalized(value));
    } else if (id === "osc2ModAltMix") {
      actions.patchParameter("osc2ModAltMix", value > 0.5);
    } else if (id === "chorusAltReverb") {
      actions.patchParameter("chorusAltReverb", value > 0.5);
    } else {
      actions.patchParameter(id as keyof SynthParameters, value);
    }
  },
};
