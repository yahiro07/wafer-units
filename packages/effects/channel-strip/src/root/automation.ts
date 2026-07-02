import { AutomationPort } from "wafer-host/unit-types";
import { store } from "@/root/store";

type AutomationParameterId =
  | "volume"
  | "pan"
  | "haas"
  | "lowCut"
  | "eqLow"
  | "eqMid"
  | "eqHigh"
  | "compress";

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "volume" },
      { id: "pan" },
      { id: "haas" },
      { id: "lowCut" },
      { id: "eqLow" },
      { id: "eqMid" },
      { id: "eqHigh" },
      { id: "compress" },
    ];
  },
  getParameter(id: AutomationParameterId) {
    const { parameters } = store.state;
    if (id === "pan") {
      return (parameters.pan + 1) / 2;
    } else {
      return parameters[id];
    }
  },
  setParameter(id: AutomationParameterId, value) {
    if (id === "pan") {
      store.patchParameters({ pan: value * 2 - 1 });
    } else {
      store.patchParameters({ [id]: value });
    }
  },
};
