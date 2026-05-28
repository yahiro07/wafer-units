import { createTestSynthesizer } from "test-synthesizer";
import { getHostInterface } from "wus-unit-types";

export const hostInterface = getHostInterface();

export function createTargetSynthesizer() {
  if (hostInterface) {
    return {
      async resumeIfNeed() {},
      noteOn(noteNumber: number) {
        hostInterface.noteOutputPort.noteOn(noteNumber, 1);
      },
      noteOff(noteNumber: number) {
        hostInterface.noteOutputPort.noteOff(noteNumber);
      },
    };
  } else {
    return createTestSynthesizer();
  }
}
