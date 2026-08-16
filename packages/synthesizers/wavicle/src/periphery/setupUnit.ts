import { asyncRerender, rerender } from "alumina";
import { nums } from "@/funcs";
import { appStore } from "@/store";
import { unitInterface } from "@/synthLib/unitInterface";

export function setupUnit() {
  const synth = appStore.synthEngine;
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "instrument",
      categoryHint: "synthesizer",
      viewSize: [700, 394],
    },
    noteInput: {
      noteOn(noteNumber, time) {
        synth.noteOn(noteNumber, time);
        asyncRerender();
      },
      noteOff(noteNumber, time) {
        synth.noteOff(noteNumber, time);
        asyncRerender();
      },
    },
    persistence: {
      emitState() {
        const { currentInstrumentKey, instrumentParameters } = synth;
        return { currentInstrumentKey, instrumentParameters };
      },
      applyState(state) {
        const { currentInstrumentKey, instrumentParameters } = state;
        const { volume, release } = instrumentParameters;
        const instrumentValid =
          synth.allInstrumentKeys.includes(currentInstrumentKey);
        if (instrumentValid) {
          synth.setInstrument(currentInstrumentKey, false);
        }
        if (nums.between(volume, 0, 1) && nums.between(release, 0, 1)) {
          synth.setInstrumentParameter("volume", volume);
          synth.setInstrumentParameter("release", release);
        }
        rerender();
      },
    },
  });
}
