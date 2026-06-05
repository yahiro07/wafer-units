import { createTestSynthesizer } from "mofur/mx-audio";
import { getUnitInterface } from "wus-unit-types";

export const unitInterface = getUnitInterface();

export function createTargetSynthesizer() {
  if (unitInterface) {
    const noteOutput = unitInterface.primaryOutputPort.noteOutput;
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
