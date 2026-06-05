import { createTestSynthesizer } from "mofus/mx-audio";
import { UnitInterface } from "wus-unit-types";

type AppSynthTarget = {
  resumeIfNeed(): Promise<void>;
  noteOn(noteNumber: number): void;
  noteOff(noteNumber: number): void;
};

export function createAppSynthTarget(
  unitInterface: UnitInterface | undefined,
): AppSynthTarget {
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
    const testSynth = createTestSynthesizer();
    return {
      async resumeIfNeed() {
        await testSynth.resumeIfNeed();
      },
      noteOn(noteNumber: number) {
        testSynth.noteOn(noteNumber);
      },
      noteOff(noteNumber: number) {
        testSynth.noteOff(noteNumber);
      },
    };
  }
}
