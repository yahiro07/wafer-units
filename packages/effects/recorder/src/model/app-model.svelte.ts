import { queryUnitInterface } from "wafer-host/unit-types";
import { createFixedDurationRecorder } from "./recorder";

type RecordingStatus = "none" | "reserved" | "recording" | "done";

type AppStates = {
  bpm: number;
  viewActive: boolean;
  recordingStatus: RecordingStatus;
  recordingProgress: { currentBarPosition: number; totalBars: number } | null;
};

const defaultAppStates: AppStates = {
  bpm: 120,
  viewActive: false,
  recordingStatus: "none",
  recordingProgress: null,
};

export type AppModel = {
  states: AppStates;
  reserveRecording(): void;
  downloadRecordedAudio(): void;
  cleanup(): void;
};

export function createAppModel(): AppModel {
  const unitInterface = queryUnitInterface("wafer-v01");
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const audioInputNode =
    unitInterface?.audioInputNode ?? audioContext.createGain();

  const states = $state(structuredClone(defaultAppStates));
  let recordedBlob: Blob | null = null;

  const recorder = createFixedDurationRecorder(audioContext);

  audioInputNode.connect(recorder.inputNode);

  const internal = {
    onHostStart() {
      if (states.recordingStatus === "reserved") {
        const recordingBars = 16;
        const durationSec = (240 / states.bpm) * recordingBars;

        recorder.start({
          durationSec,
          completeCallback(blob) {
            recordedBlob = blob;
            states.recordingStatus = "done";
            states.recordingProgress = {
              currentBarPosition: recordingBars,
              totalBars: recordingBars,
            };
          },
          progressCallback(currentSec) {
            const pos = currentSec / durationSec;
            states.recordingProgress = {
              currentBarPosition: pos * recordingBars,
              totalBars: recordingBars,
            };
          },
        });
        states.recordingStatus = "recording";
        states.recordingProgress = {
          currentBarPosition: 0,
          totalBars: recordingBars,
        };
        recordedBlob = null;
      }
    },
    onHostStop() {
      if (states.recordingStatus === "recording") {
        recorder.cancel();
        states.recordingStatus = "none";
        states.recordingProgress = null;
      }
    },
  };

  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [320, 200],
      },
      cleanup() {},
      unitCallbacks: {
        setViewActive(value) {
          states.viewActive = value;
        },
      },
      hostCallbacks: {
        setBpm(bpm) {
          states.bpm = bpm;
        },
      },
      clockHandlers: {
        start() {
          internal.onHostStart();
        },
        stop() {
          internal.onHostStop();
        },
      },
    });
  } else {
    states.viewActive = true;
  }

  return {
    states,
    reserveRecording() {
      if (states.recordingStatus === "none") {
        states.recordingStatus = "reserved";
      }
    },
    downloadRecordedAudio() {
      if (recordedBlob) {
        const url = URL.createObjectURL(recordedBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "audio.webm";
        a.click();
        URL.revokeObjectURL(url);
        states.recordingStatus = "none";
      }
    },
    cleanup() {
      audioInputNode.disconnect();
    },
  };
}
