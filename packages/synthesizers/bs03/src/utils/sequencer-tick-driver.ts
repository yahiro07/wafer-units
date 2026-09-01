type CoreSequencer = {
  //480ppq based
  processScheduling(
    startTime: number,
    ppqFrom: number,
    ppqTo: number,
    bpm: number,
  ): void;
};

type SequencerTickDriverCore = {
  setBpm(bpm: number): void;
  start(sequencer: CoreSequencer): void;
  stop(): void;
};

function mapTimeToPpq(timeSec: number, bpm: number): number {
  const minutes = timeSec / 60;
  const beats = minutes * bpm;
  const ppq = beats * 480;
  return ppq;
}

function callCoreSequencerScheduling(
  sequencer: CoreSequencer,
  startTime: number,
  timeFrom: number,
  timeTo: number,
  bpm: number,
) {
  const ppqFrom = mapTimeToPpq(timeFrom, bpm);
  const ppqTo = mapTimeToPpq(timeTo, bpm);
  sequencer.processScheduling(startTime, ppqFrom, ppqTo, bpm);
}

function createSequencerTickDriverCore(
  audioContext: AudioContext,
  intervalMs: number = 25,
  lookaheadMs: number = 100,
): SequencerTickDriverCore {
  const state = { bpm: 120 };
  const lookaheadSec = lookaheadMs / 1000;

  let timerId: number | null = null;

  return {
    setBpm(bpm: number) {
      state.bpm = bpm;
    },
    start(sequencer: CoreSequencer) {
      const startTime = audioContext.currentTime;

      const getRelativeTime = () => audioContext.currentTime - startTime;

      let timePos = 0;
      {
        const timePosNext = lookaheadSec;
        callCoreSequencerScheduling(
          sequencer,
          startTime,
          timePos,
          timePosNext,
          state.bpm,
        );
        timePos = timePosNext;
      }
      timerId = setInterval(() => {
        const relativeTime = getRelativeTime();
        const timePosNext = relativeTime + lookaheadSec;
        callCoreSequencerScheduling(
          sequencer,
          startTime,
          timePos,
          timePosNext,
          state.bpm,
        );
        timePos = timePosNext;
      }, intervalMs);
    },
    stop() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    },
  };
}

//----------

type TargetSequencer = {
  start?(): void;
  stop?(): void;
  processScheduling?(
    startTime: number, //absolute time based on AudioContext.currentTime
    ppqFrom: number, //480ppq based tick from song start
    ppqTo: number, //480ppq based tick from song start
    bpm: number,
  ): void;
  //16th note based (4ppq) integer step from song start
  processStep?(
    stepIndex: number, //16th note based step from song start, not wrapped
    time: number, //audio context time for actual step position
    unitDuration: number, //length of 16th note in seconds
  ): void;
};

type SequencerTickDriver = {
  setBpm(bpm: number): void;
  start(sequencer: TargetSequencer): void;
  stop(): void;
};

type CrossingStepInfo = {
  stepIndex: number;
  time: number;
};

function getCrossingStepIndices(
  startTime: number,
  ppqFrom: number,
  ppqTo: number,
  bpm: number,
): CrossingStepInfo[] {
  const ppqPerStep = 120;
  const stepFrom = Math.floor(ppqFrom / ppqPerStep);
  const stepTo = Math.floor(ppqTo / ppqPerStep);
  const crossingStepInfos: CrossingStepInfo[] = [];
  const stepDurationSec = ppqPerStep / ((480 * bpm) / 60);
  if (ppqFrom === 0) {
    crossingStepInfos.push({
      stepIndex: 0,
      time: startTime,
    });
  }
  for (let stepIndex = stepFrom + 1; stepIndex <= stepTo; stepIndex++) {
    crossingStepInfos.push({
      stepIndex,
      time: startTime + stepIndex * stepDurationSec,
    });
  }
  return crossingStepInfos;
}

function processSequencerScheduling(
  sequencer: TargetSequencer,
  startTime: number,
  ppqFrom: number,
  ppqTo: number,
  bpm: number,
) {
  const crossingStepInfos = getCrossingStepIndices(
    startTime,
    ppqFrom,
    ppqTo,
    bpm,
  );
  const unitStepDurationSec = 60 / bpm / 4;
  for (const crossingStepInfo of crossingStepInfos) {
    sequencer.processStep?.(
      crossingStepInfo.stepIndex,
      crossingStepInfo.time,
      unitStepDurationSec,
    );
  }
  sequencer.processScheduling?.(startTime, ppqFrom, ppqTo, bpm);
}

export function createSequencerTickDriver(
  audioContext: AudioContext,
): SequencerTickDriver {
  const core = createSequencerTickDriverCore(audioContext, 25, 100);
  let targetSequencer: TargetSequencer | null = null;
  return {
    setBpm: core.setBpm,
    start(sequencer: TargetSequencer) {
      sequencer.start?.();
      core.start({
        processScheduling(startTime, ppqFrom, ppqTo, bpm) {
          processSequencerScheduling(sequencer, startTime, ppqFrom, ppqTo, bpm);
        },
      });
      targetSequencer = sequencer;
    },
    stop() {
      core.stop();
      if (targetSequencer) {
        targetSequencer.stop?.();
        targetSequencer = null;
      }
    },
  };
}
