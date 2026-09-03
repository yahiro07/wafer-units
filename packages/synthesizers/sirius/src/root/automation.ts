import { SynthParameters } from "@/defs/definitions";
import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { AutomationPort } from "wafer-host/unit-types";

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "oscWave", steps: 3 },
      { id: "oscDetune" },
      { id: "oscSub" },
      { id: "oscDrift" },
      { id: "fxChorus" },
      { id: "fxReverb" },
      { id: "filterCutoff" },
      { id: "filterPeak" },
      { id: "filterDecay" },
      { id: "ampDecay" },
      { id: "ampRelease" },
      { id: "patchVolume" },
    ];
  },
  getParameter(id) {
    if (id === "oscWave") {
      return store.state.parameters.oscWave / 2;
    } else {
      return store.state.parameters[id as keyof SynthParameters];
    }
  },
  setParameter(id, value) {
    if (id === "oscWave") {
      actions.setParameter("oscWave", value * 2);
    } else {
      actions.setParameter(id as keyof SynthParameters, value);
    }
  },
};
