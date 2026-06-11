import { createTestSynthesizer } from "mofur/mx-audio";
import { queryUnitInterface } from "wus-unit-types";

export const unitInterface = queryUnitInterface("wus-v01");

export function createTargetSynthesizer() {
  if (unitInterface) {
    const noteOutput = unitInterface.noteOutputPort;
    return {
      async resumeIfNeed() {},
      noteOn(noteNumber: number) {
        noteOutput.noteOn(noteNumber);
      },
      noteOff(noteNumber: number) {
        noteOutput.noteOff(noteNumber);
      },
    };
  } else {
    return createTestSynthesizer();
  }
}
