import { store } from "@/root/store";
import { linearInterpolate } from "@/utils/helpers";
import { AutomationPort } from "wafer-host/unit-types";

type AutomationParameterId = "octave" | "duty";

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "octave", steps: 5 },
      { id: "duty" },
    ];
  },
  getParameter(id: AutomationParameterId) {
    if (id === "octave") {
      return linearInterpolate(store.state.octaveShift, -2, 2, 0, 1);
    } else if (id === "duty") {
      return store.state.stepDuty;
    }
  },
  setParameter(id: AutomationParameterId, value) {
    if (id === "octave") {
      store.setOctaveShift(Math.round(linearInterpolate(value, 0, 1, -2, 2)));
    } else if (id === "duty") {
      store.setStepDuty(value);
    }
  },
};
