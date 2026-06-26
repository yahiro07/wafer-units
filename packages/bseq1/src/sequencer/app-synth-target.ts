import { createTestSynthesizer } from "mofus/mx-audio";
import { UnitInterface } from "wafer-host/unit-types";

type AppSynthTarget = {
  resumeIfNeed(): void;
  noteOn(noteNumber: number, time: number): void;
  noteOff(noteNumber: number, time: number): void;
};

export function createAppSynthTarget(
  unitInterface: UnitInterface | undefined,
): AppSynthTarget {
  if (unitInterface) {
    const noteOutput = unitInterface.noteOutputPort;
    return {
      resumeIfNeed() {},
      noteOn(noteNumber: number, time: number) {
        noteOutput.noteOn(noteNumber, time);
      },
      noteOff(noteNumber: number, time: number) {
        noteOutput.noteOff(noteNumber, time);
      },
    };
  } else {
    const testSynth = createTestSynthesizer();
    return {
      resumeIfNeed() {
        void testSynth.resumeIfNeed();
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
