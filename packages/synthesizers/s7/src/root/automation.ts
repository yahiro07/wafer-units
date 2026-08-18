import { store } from "@/root/store";
import { AutomationPort } from "wafer-host/unit-types";

type AutomationParameterId =
  | "octave"
  | "unisonDetune"
  | "unisonSpread"
  | "unisonMix"
  | "phaseRandom"
  | "ampRelease"
  | "volume";

const octaveMin = -2;
const octaveMax = 2;
const octaveSteps = octaveMax - octaveMin + 1;

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "octave", steps: octaveSteps },
      { id: "unisonDetune" },
      { id: "unisonSpread" },
      { id: "unisonMix" },
      { id: "phaseRandom", steps: 2 },
      { id: "ampRelease" },
      { id: "volume" },
    ];
  },
  getParameter(id: AutomationParameterId) {
    const { parameters } = store.state;
    if (id === "octave") {
      return (parameters.octave - octaveMin) / (octaveMax - octaveMin);
    } else if (id === "phaseRandom") {
      return parameters.phaseRandom ? 1 : 0;
    } else {
      return parameters[id];
    }
  },
  setParameter(id: AutomationParameterId, value) {
    if (id === "octave") {
      const octave = Math.round(value * (octaveMax - octaveMin)) + octaveMin;
      store.patchParameters({ octave });
    } else if (id === "phaseRandom") {
      store.patchParameters({ phaseRandom: value > 0.5 });
    } else {
      store.patchParameters({ [id]: value });
    }
  },
};
