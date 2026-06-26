export type StepCode = "on" | "off" | "tie";

const STEP_COUNT = 4;

const normalizeStepIndex = (rawIndex: number) => {
  return ((rawIndex % STEP_COUNT) + STEP_COUNT) % STEP_COUNT;
};

export function createSequencerEngine(notePort: {
  noteOn(noteNumber: number, time: number): void;
  noteOff(noteNumber: number, time: number): void;
}) {
  let duty = 1;
  let bpm = 120;
  let stepCodes: StepCode[] = ["off", "on", "on", "on"];
  let noteNumber = 36 + 9;
  let onStepChange: ((stepIndex: number) => void) | null = null;

  const getTiedDurationStepCount = (startStepIndex: number) => {
    let durationStepCount = 1;
    while (
      durationStepCount < STEP_COUNT &&
      stepCodes[normalizeStepIndex(startStepIndex + durationStepCount)] ===
        "tie"
    ) {
      durationStepCount += 1;
    }
    return durationStepCount;
  };

  const processOnStep = (rawStepIndex: number, time: number) => {
    const stepIndex = normalizeStepIndex(rawStepIndex);
    onStepChange?.(stepIndex);

    const stepCode = stepCodes[stepIndex];
    if (stepCode !== "on") {
      return;
    }

    const durationStepCount = getTiedDurationStepCount(stepIndex);
    const actualDurationStep = durationStepCount + duty - 1;
    const durationSec = (actualDurationStep * 60) / (bpm * 4);

    notePort.noteOn(noteNumber, time);
    notePort.noteOff(noteNumber, time + durationSec);
  };

  return {
    processOnStep,
    setOnStep(onStep: ((stepIndex: number) => void) | null) {
      onStepChange = onStep;
    },
    allNotesOff() {},
    setBpm(newBpm: number) {
      bpm = newBpm;
    },
    setDuty(newDuty: number) {
      duty = newDuty;
    },
    setStepCodes(newStepCodes: StepCode[]) {
      stepCodes = newStepCodes;
    },
    setNoteNumber(newNoteNumber: number) {
      noteNumber = newNoteNumber;
    },
  };
}
