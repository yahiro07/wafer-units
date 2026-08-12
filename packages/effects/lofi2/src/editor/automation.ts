import { AutomationPort } from "wafer-host/unit-types";
import { store } from "@/editor/store";

type AutomationParameterId =
  | "isOn"
  | "banded"
  | "hi"
  | "degrade"
  | "drive"
  | "noise"
  | "wobble"
  | "mix";

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "isOn", steps: 2 },
      { id: "banded" },
      { id: "hi" },
      { id: "degrade" },
      { id: "drive" },
      { id: "noise" },
      { id: "wobble" },
      { id: "mix" },
    ];
  },
  getParameter(id: AutomationParameterId) {
    const { parameters } = store.state;
    if (id === "isOn") {
      return parameters.isOn ? 1 : 0;
    } else {
      return parameters[id] as number;
    }
  },
  setParameter(id: AutomationParameterId, value) {
    if (id === "isOn") {
      store.patchParameters({ isOn: value > 0.5 });
    } else {
      store.patchParameters({ [id]: value });
    }
  },
};
