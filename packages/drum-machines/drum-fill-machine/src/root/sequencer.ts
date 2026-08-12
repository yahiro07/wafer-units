import {
  allSampleKeys,
  defaultSceneEditState,
  PartItem,
  PartKey,
  SceneEditState,
} from "@/core/definitions";
import { createSamplePlayer } from "@/root/sample-player";
import { UnitInterface } from "wafer-host/unit-types";

type SequencerEvent =
  | { type: "oneShotCompleted" }
  | { type: "sampleHit"; partKey: PartKey };

type Sequencer = {
  setSceneEditStateAttrs(attrs: Partial<SceneEditState>): void;
  setOneShotTriggered(triggered: boolean): void;
  subscribeEvents(listener: (ev: SequencerEvent) => void): () => void;
  onHostStart(): void;
  onHostStep(stepIndex: number, time: number): void;
  onHostStop(): void;
  cleanup(): void;
};

export function createSequencer(
  unitInterface: UnitInterface | undefined,
): Sequencer {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  const samplePlayer = createSamplePlayer(audioContext, destinationNode);
  samplePlayer.registerSamples(
    allSampleKeys.map((key) => ({
      id: key,
      uri: `samples/${key}.wav`,
    })),
  );
  const sceneState = structuredClone(defaultSceneEditState);
  const playbackState = {
    // playing: false,
    oneShotTriggered: false,
  };
  const listeners = new Set<(ev: SequencerEvent) => void>();

  const emitEvent = (ev: SequencerEvent) => {
    listeners.forEach((listener) => listener(ev));
  };

  const internal = {
    playSample(part: PartItem, time: number) {
      samplePlayer.play(part.sampleKey, {
        speedRate: 2 ** part.pitchTweak,
        volume: part.volume * 2,
        time,
      });
    },
    handleStep(inputStepIndex: number, time: number) {
      const totalSteps = sceneState.loopBars * 16;
      const stepIndex = inputStepIndex % totalSteps;

      if (sceneState.loopEnabled || playbackState.oneShotTriggered) {
        if (stepIndex === 0) {
          const crashPart = sceneState.crashPartItem;
          if (crashPart.enabled) {
            internal.playSample(crashPart, time);
          }
          if (playbackState.oneShotTriggered) {
            emitEvent({ type: "oneShotCompleted" });
          }
        }
        if (stepIndex >= totalSteps - 16) {
          const rollPart = sceneState.rollPartItem;
          if (rollPart.enabled) {
            internal.playSample(rollPart, time);
          }
        }
      }
    },
  };
  return {
    setSceneEditStateAttrs(attrs) {
      Object.assign(sceneState, attrs);
    },
    setOneShotTriggered(triggered) {
      playbackState.oneShotTriggered = triggered;
    },
    subscribeEvents(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    onHostStart() {
      // playbackState.playing = true;
    },
    onHostStep(stepIndex, time) {
      internal.handleStep(stepIndex, time);
    },
    onHostStop() {
      // playbackState.playing = false;
    },
    cleanup() {
      samplePlayer.cleanup();
    },
  };
}
