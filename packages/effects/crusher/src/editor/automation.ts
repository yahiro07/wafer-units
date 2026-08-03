import { AutomationPort } from "wafer-host/unit-types";
import { store } from "@/editor/store";

type AutomationParameterId =
  | "age"
  | "grit"
  | "degrade"
  | "saturationMode"
  | "toneColor";

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "age" },
      { id: "grit" },
      { id: "degrade" },
      { id: "saturationMode" },
      { id: "toneColor" },
    ];
  },
  getParameter(id: AutomationParameterId) {
    const { parameters } = store.state;
    if (id === "saturationMode") {
      return parameters.saturationMode / 2;
    } else {
      return parameters[id] as number;
    }
  },
  setParameter(id: AutomationParameterId, value) {
    if (id === "saturationMode") {
      const saturationMode = Math.round(value * 2);
      store.patchParameters({ saturationMode });
    } else {
      store.patchParameters({ [id]: value });
    }
  },
};
