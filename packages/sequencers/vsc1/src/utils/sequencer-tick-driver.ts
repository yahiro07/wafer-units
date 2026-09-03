type TargetSequencer = {
  start?(): void;
  stop?(): void;
  processStep?(stepIndex: number, time: number, unitDuration: number): void;
};

type SequencerTickDriver = {
  setBpm(bpm: number): void;
  start(sequencer: TargetSequencer): void;
  stop(): void;
};

export function createSequencerTickDriver(
  audioContext: AudioContext,
): SequencerTickDriver {
  const state = { bpm: 120 };
  let timerId: number | null = null;
  let target: TargetSequencer | null = null;

  const stepDurationSec = () => 60 / state.bpm / 4;

  const clearTimer = () => {
    if (timerId != null) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return {
    setBpm(bpm) {
      state.bpm = bpm;
    },
    start(sequencer) {
      clearTimer();
      target = sequencer;
      sequencer.start?.();
      let stepIndex = 0;
      const tick = () => {
        const unitDuration = stepDurationSec();
        sequencer.processStep?.(
          stepIndex,
          audioContext.currentTime,
          unitDuration,
        );
        stepIndex += 1;
        timerId = setTimeout(tick, unitDuration * 1000);
      };
      tick();
    },
    stop() {
      clearTimer();
      target?.stop?.();
      target = null;
    },
  };
}
