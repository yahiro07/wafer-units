import { numWaveModes, SynthParameters } from "@/defs/definitions";
import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { AutomationPort } from "wafer-host/unit-types";

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "waveMode", steps: numWaveModes },
      { id: "shape" },
      { id: "envMod" },
      { id: "detune" },
      { id: "sub" },
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
    } else {
      return store.state.parameters[id as keyof SynthParameters];
    }
  },
  setParameter(id, value) {
    if (id === "waveMode") {
      actions.setParameter("waveMode", Math.round(value * numWaveModes));
    } else {
      actions.setParameter(id as keyof SynthParameters, value);
    }
  },
};
