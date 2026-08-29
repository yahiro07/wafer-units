import { SynthParameters } from "@/defs/definitions";
import { invokeAtAudioTime } from "@/engine/voicing-helper";
import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { inBetween } from "@/utils/helpers";
import { AutomationPort } from "wafer-host/unit-types";

export function createAutomationInput(
  audioContext: AudioContext,
): AutomationPort {
  const exposedParameterKeys: (keyof SynthParameters)[] = [
    "oscMix",
    "lpfCutoff",
    "lpfPeak",
    "reverbMix",
    "density",
    "patchVolume",
  ];
  const internal = {
    wrapSetParameter(
      key: string,
      value: number,
      time = audioContext.currentTime,
    ) {
      const valid =
        exposedParameterKeys.includes(key as keyof SynthParameters) &&
        inBetween(value, 0, 1);
      if (valid) {
        invokeAtAudioTime(audioContext, time, () => {
          actions.setParameter(key as keyof SynthParameters, value);
        });
      }
    },
  };
  return {
    getParameterSpecs() {
      return exposedParameterKeys.map((key) => ({ id: key }));
    },
    getParameter(id) {
      return store.state.parameters[id as keyof SynthParameters] as number;
    },
    setParameter(id, value, time) {
      internal.wrapSetParameter(id, value, time);
    },
  };
}
