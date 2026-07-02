import { mapUnaryFrom, mapUnaryTo } from "mofur/ax";
import { AutomationPort } from "wafer-host/unit-types";
import { store } from "@/root/store";

type AutomationParameterId = "octave" | "duty";

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [{ id: "octave" }, { id: "duty" }];
  },
  getParameter(id: AutomationParameterId) {
    if (id === "octave") {
      return mapUnaryFrom(store.state.octave, -2, 2);
    } else if (id === "duty") {
      return store.state.duty;
    }
  },
  setParameter(id: AutomationParameterId, value) {
    if (id === "octave") {
      store.assign({ octave: Math.round(mapUnaryTo(value, -2, 2)) });
    } else if (id === "duty") {
      store.assign({ duty: value });
    }
  },
};
