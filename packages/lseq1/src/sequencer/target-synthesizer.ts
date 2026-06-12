import { createTestSynthesizer } from "mofur/mx-audio";
import { queryUnitInterfaceForModule } from "wus-unit-types";

export const unitInterface = queryUnitInterfaceForModule(
  "wus-v01",
  import.meta.url,
);

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
