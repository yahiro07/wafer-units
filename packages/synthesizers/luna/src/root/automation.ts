import {
  numOscWaveTypes,
  OscWave,
  SynthParameters,
} from "@/defs/definitions";
import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { AutomationPort } from "wafer-host/unit-types";

const voiceOctaveMin = -2;
const voiceOctaveMax = 2;
const voiceOctaveSteps = voiceOctaveMax - voiceOctaveMin + 1;

const osc2OctaveMin = -2;
const osc2OctaveMax = 2;
const osc2OctaveSteps = osc2OctaveMax - osc2OctaveMin + 1;

function normalizeStepped(value: number, min: number, max: number) {
  return (value - min) / (max - min);
}

function denormalizeStepped(value: number, min: number, max: number) {
  return Math.round(value * (max - min)) + min;
}

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "voiceOctave", steps: voiceOctaveSteps },
      { id: "osc1Wave", steps: numOscWaveTypes },
      { id: "oscDetune" },
      { id: "osc2Wave", steps: numOscWaveTypes },
      { id: "osc2Octave", steps: osc2OctaveSteps },
      { id: "osc2Volume" },
      { id: "hpfCutoff" },
      { id: "hpfQ" },
      { id: "lpfCutoff" },
      { id: "lpfEnvMod" },
      { id: "lpfQ" },
      { id: "lpfSteep", steps: 2 },
      { id: "attackAltPunch", steps: 2 },
      { id: "ampAttack" },
      { id: "ampDecay" },
      { id: "ampSustain" },
      { id: "ampRelease" },
      { id: "density" },
      { id: "globalVolume" },
      { id: "pitchLfoAltPitchEg", steps: 2 },
      { id: "pitchLfoRate" },
      { id: "pitchLfoDepth" },
      { id: "filterLfoRate" },
      { id: "filterLfoDepth" },
      { id: "reverbDecay" },
      { id: "reverbMix" },
      { id: "reverbDamp" },
      { id: "chorusLevel" },
      { id: "presence" },
    ];
  },
  getParameter(id) {
    const { parameters } = store.state;
    if (id === "voiceOctave") {
      return normalizeStepped(
        parameters.voiceOctave,
        voiceOctaveMin,
        voiceOctaveMax,
      );
    } else if (id === "osc2Octave") {
      return normalizeStepped(
        parameters.osc2Octave,
        osc2OctaveMin,
        osc2OctaveMax,
      );
    } else if (id === "osc1Wave") {
      return parameters.osc1Wave / (numOscWaveTypes - 1);
    } else if (id === "osc2Wave") {
      return parameters.osc2Wave / (numOscWaveTypes - 1);
    } else if (id === "lpfSteep") {
      return parameters.lpfSteep ? 1 : 0;
    } else if (id === "attackAltPunch") {
      return parameters.attackAltPunch ? 1 : 0;
    } else if (id === "pitchLfoAltPitchEg") {
      return parameters.pitchLfoAltPitchEg ? 1 : 0;
    } else {
      return parameters[id as keyof SynthParameters] as number;
    }
  },
  setParameter(id, value) {
    if (id === "voiceOctave") {
      actions.setParameter(
        "voiceOctave",
        denormalizeStepped(value, voiceOctaveMin, voiceOctaveMax),
      );
    } else if (id === "osc2Octave") {
      actions.setParameter(
        "osc2Octave",
        denormalizeStepped(value, osc2OctaveMin, osc2OctaveMax),
      );
    } else if (id === "osc1Wave") {
      actions.setParameter(
        "osc1Wave",
        Math.round(value * (numOscWaveTypes - 1)) as OscWave,
      );
    } else if (id === "osc2Wave") {
      actions.setParameter(
        "osc2Wave",
        Math.round(value * (numOscWaveTypes - 1)) as OscWave,
      );
    } else if (id === "lpfSteep") {
      actions.setParameter("lpfSteep", value > 0.5);
    } else if (id === "attackAltPunch") {
      actions.setParameter("attackAltPunch", value > 0.5);
    } else if (id === "pitchLfoAltPitchEg") {
      actions.setParameter("pitchLfoAltPitchEg", value > 0.5);
    } else {
      actions.setParameter(id as keyof SynthParameters, value);
    }
  },
};
