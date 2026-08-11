import { AutomationPort } from "wafer-host/unit-types";
import { ChorusType } from "@/core/definitions";
import { store } from "@/editor/store";

type AutomationParameterId = "isOn" | "chorusType" | "chorusLevel";

const chorusTypeCount = 5;

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "isOn", steps: 2 },
      { id: "chorusType", steps: chorusTypeCount },
      { id: "chorusLevel" },
    ];
  },
  getParameter(id: AutomationParameterId) {
    const { parameters } = store.state;
    if (id === "isOn") {
      return parameters.isOn ? 1 : 0;
    } else if (id === "chorusType") {
      return (parameters.chorusType - 1) / (chorusTypeCount - 1);
    } else {
      return parameters.chorusLevel;
    }
  },
  setParameter(id: AutomationParameterId, value) {
    if (id === "isOn") {
      store.patchParameters({ isOn: value > 0.5 });
    } else if (id === "chorusType") {
      const chorusType = (Math.round(value * (chorusTypeCount - 1)) +
        1) as ChorusType;
      if (1 <= chorusType && chorusType <= chorusTypeCount) {
        store.patchParameters({ chorusType });
      }
    } else {
      store.patchParameters({ chorusLevel: value });
    }
  },
};
