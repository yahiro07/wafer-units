import { AutomationPort } from "wafer-host/unit-types";
import { delayTimeValues } from "@/common/constants";
import { store } from "@/root/store";

type AutomationParameterId =
  | "time"
  | "feed"
  | "tone"
  | "mix"
  | "lfoRate"
  | "lfoDepth"
  | "safety";

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "time" },
      { id: "feed" },
      { id: "tone" },
      { id: "mix" },
      { id: "lfoRate" },
      { id: "lfoDepth" },
      { id: "safety", steps: 2 },
    ];
  },
  getParameter(id: AutomationParameterId) {
    const { parameters } = store.state;
    if (id === "time") {
      const index = delayTimeValues.indexOf(parameters.time);
      if (index >= 0) {
        return index / (delayTimeValues.length - 1);
      }
      return undefined;
    } else if (id === "safety") {
      return parameters.safety ? 1 : 0;
    } else {
      return parameters[id] as number;
    }
  },
  setParameter(id: AutomationParameterId, value) {
    if (id === "time") {
      const index = Math.round(value * (delayTimeValues.length - 1));
      if (0 <= index && index < delayTimeValues.length) {
        const delayTime = delayTimeValues[index];
        store.patchParameters({ time: delayTime });
      }
    } else if (id === "safety") {
      store.patchParameters({ safety: value > 0.5 });
    } else {
      store.patchParameters({ [id]: value });
    }
  },
};
