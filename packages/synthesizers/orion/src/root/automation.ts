import { numWaveModes, SynthLinearParameters, SynthParameters } from "@/defs/definitions";
import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { AutomationPort } from "wafer-host/unit-types";

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "waveMode", steps: numWaveModes },
      { id: "shape" },
      { id: "envDecay" },
      { id: "detune" },
      { id: "sub", steps: 2 },
      { id: "decay" },
      { id: "release" },
      { id: "drift" },
      { id: "loFi" },
      { id: "chorus" },
      { id: "delay" },
      { id: "reverb" },
      { id: "master" },
    ];
  },
  getParameter(id) {
    if (id === "waveMode") {
      return store.state.parameters.waveMode / numWaveModes;
    } else if (id === "sub") {
      return store.state.parameters.sub ? 1 : 0;
    } else {
      return store.state.parameters[id as keyof SynthLinearParameters];
    }
  },
  setParameter(id, value) {
    if (id === "waveMode") {
      actions.setParameter("waveMode", Math.round(value * numWaveModes));
    } else if (id === "sub") {
      actions.setParameter("sub", value > 0.5);
    } else {
      actions.setParameter(id as keyof SynthParameters, value);
    }
  },
};
