import { mapUnaryFrom, mapUnaryTo } from "mofus/ax";
import { AutomationPort } from "wafer-host/unit-types";
import { uiActions } from "@/actions";
import {
  integerParametersRanges,
  SynthParameters,
} from "@/definitions/parameters";
import { appState } from "@/store";

export function createAutomationInput(): AutomationPort {
  return {
    getParameterSpecs() {
      return [
        { id: "oscWave" },
        { id: "oscOctave" },
        { id: "oscShape" },
        { id: "ampAttack" },
        { id: "ampDecay" },
        { id: "ampSustain" },
        { id: "ampRelease" },
        { id: "chorusLevel" },
        { id: "reverbLevel" },
        { id: "hpfCutoff" },
        { id: "hpfPeak" },
        { id: "filterCutoff" },
        { id: "filterPeak" },
        { id: "foldingShaperWave" },
        { id: "foldingShaperLevel" },
        { id: "densityShaperLevel" },
        { id: "masterVolume" },
      ];
    },
    getParameter(_id) {
      const id = _id as keyof SynthParameters;
      const value = appState.synthParams[id];
      if (typeof value === "boolean") {
        return value ? 1 : 0;
      }
      const range =
        integerParametersRanges[id as keyof typeof integerParametersRanges];
      if (range) {
        //normalize to 0~1
        return mapUnaryFrom(value, range.min, range.max, true);
      }
      return value;
    },
    setParameter(_id, value) {
      const id = _id as keyof SynthParameters;
      const range =
        integerParametersRanges[id as keyof typeof integerParametersRanges];
      if (range) {
        //unnormalize from 0~1
        value = Math.round(mapUnaryTo(value, range.min, range.max));
      }
      uiActions.setSynthParam(id, value);
    },
  };
}
