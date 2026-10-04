import { AutomationInputPort } from "wafer-host/unit-types";
import { ParametersFacade, ParameterEditSpec } from "../core/definitions";
import { resultOf } from "@lib/mu2609/utils/helpers";

export function createAutomationInput(
  parametersFacade: ParametersFacade,
): AutomationInputPort {
  return {
    getParameterSpecs() {
      return [
        { id: "osc1Shape" },
        { id: "osc2Shape" },
        { id: "osc3Shape" },
        { id: "filterCutoff" },
      ];
    },
    getParameter(id) {
      const parameters = parametersFacade.getParameters();
      if (id === "osc1Shape") {
        return parameters.osc1.shape;
      }
      if (id === "osc2Shape") {
        return parameters.osc2.shape;
      }
      if (id === "osc3Shape") {
        return parameters.osc3.shape;
      }
      if (id === "filterCutoff") {
        return parameters.filter.cutoff;
      }
    },
    setParameter(id, value) {
      const editSpec = resultOf<ParameterEditSpec | undefined>(() => {
        if (id === "osc1Shape") return { osc1: { shape: value } };
        if (id === "osc2Shape") return { osc2: { shape: value } };
        if (id === "osc3Shape") return { osc3: { shape: value } };
        if (id === "filterCutoff") return { filter: { cutoff: value } };
      });
      if (editSpec) {
        parametersFacade.dispatchParameterEdit(editSpec);
      }
    },
  };
}
