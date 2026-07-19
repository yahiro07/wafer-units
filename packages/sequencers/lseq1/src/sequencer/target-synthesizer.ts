import { createTestSynthesizer } from "mofur/mx-audio";
import { queryUnitInterfaceForModule } from "wafer-host/unit-types";

export const unitInterface = queryUnitInterfaceForModule(
  "wafer-v01",
  import.meta.url,
);

export function createTargetSynthesizer() {
  if (unitInterface) {
    const noteOutputPort = unitInterface.createNoteOutputPort();
    return {
      async resumeIfNeed() {},
      noteOn(noteNumber: number) {
        noteOutputPort.noteOn(noteNumber);
      },
      noteOff(noteNumber: number) {
        noteOutputPort.noteOff(noteNumber);
      },
    };
  } else {
    return createTestSynthesizer();
  }
}
