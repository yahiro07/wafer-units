import { createTestSynthesizer } from "test-synthesizer";
import { HostInterface } from "wus-unit-types";

type AppSynthTarget = {
  resumeIfNeed(): Promise<void>;
  noteOn(noteNumber: number): void;
  noteOff(noteNumber: number): void;
};

export function createAppSynthTarget(
  hostInterface: HostInterface | undefined,
): AppSynthTarget {
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
