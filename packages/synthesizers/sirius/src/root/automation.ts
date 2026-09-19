import { oscWaveTypesForUi, SynthParameters } from "@/defs/definitions";
import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { AutomationInputPort } from "wafer-host/unit-types";

export const automationInput: AutomationInputPort = {
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
      const index = oscWaveTypesForUi.indexOf(store.state.parameters.oscWave);
      return index / (oscWaveTypesForUi.length - 1);
    } else {
      return store.state.parameters[id as keyof SynthParameters];
    }
  },
  setParameter(id, value) {
    if (id === "oscWave") {
      const index = Math.round(value * (oscWaveTypesForUi.length - 1));
      actions.setParameter("oscWave", oscWaveTypesForUi[index]);
    } else {
      actions.setParameter(id as keyof SynthParameters, value);
    }
  },
};
