import { createSchedulingPlotter } from "@/root/scheduling-plotter";
import { store } from "@/root/store";
import { createWavePlotter } from "@/root/wave-plotter";
import { useLayoutEffect } from "preact/hooks";
import { queryUnitInterface } from "wafer-host/unit-types";

console.log("timing-checker 1212");

const unitInterface = queryUnitInterface("wafer-v01");
const audioContext = unitInterface?.audioContext ?? new AudioContext();

function mapTimeToBarPosition(time: number) {
  const barSeconds = 240 / store.state.hostBpm;
  return time / barSeconds;
}

const schedulingPlotter = createSchedulingPlotter();
const wavePlotter = createWavePlotter();

function setupUnit() {
  let startTime = 0;

  if (!unitInterface) {
    store.setHostBpm(120);
    return;
  }

  const analyser = audioContext.createAnalyser();
  unitInterface.audioInputNode.connect(analyser);

  const timeDomainData = new Float32Array(1024);

  function updateAnalyser() {
    analyser.getFloatTimeDomainData(timeDomainData);
    let time = audioContext.currentTime - startTime;
    const sampleRate = audioContext.sampleRate;
    const timeDelta = 1 / sampleRate;
    for (let i = 0; i < timeDomainData.length; i++) {
      time += timeDelta;
      const barPosition = mapTimeToBarPosition(time);
      const value = timeDomainData[i];
      wavePlotter.putWaveValue(barPosition, value);
    }
  }

  const timerId = setInterval(updateAnalyser, 20);

  const cleanup = () => {
    unitInterface.audioInputNode.disconnect();
    clearInterval(timerId);
  };

  unitInterface.completeSetup({
    unitAspects: {
      unitType: "effect",
      viewSize: [940, 540],
    },
    hostCallbacks: {
      setBpm(bpm: number) {
        store.setHostBpm(bpm);
      },
    },
    clockHandlers: {
      start() {
        startTime = audioContext.currentTime;
        schedulingPlotter.hostStarted();
      },
      processScheduling(_timeFrom, barFrom, barTo, bpm) {
        if (bpm !== store.state.hostBpm) {
          store.setHostBpm(bpm);
        }
        const timeFromStart = audioContext.currentTime - startTime;
        const barScheduledAt = mapTimeToBarPosition(timeFromStart);
        schedulingPlotter.hostScheduled(barScheduledAt, barFrom, barTo);
      },
      processStep(stepIndex, time) {
        const timeFromStart = time - startTime;
        const barPosition = mapTimeToBarPosition(timeFromStart);
        schedulingPlotter.addScheduleStepPoint(stepIndex, barPosition);
      },
    },
    cleanup,
  });
}

function setupSynchronization() {
  return store.subscribe((attrs) => {
    const { barLength, schedulingPlotterCanvas, wavePlotterCanvasCh1 } = attrs;
    if (barLength !== undefined) {
      schedulingPlotter.setBarLength(barLength);
    }
    if (schedulingPlotterCanvas !== undefined) {
      schedulingPlotter.setCanvas(schedulingPlotterCanvas);
    }
    if (wavePlotterCanvasCh1 !== undefined) {
      wavePlotter.setCanvas(wavePlotterCanvasCh1);
    }
  });
}

export function useSetupDrivers() {
  useLayoutEffect(setupUnit, []);
  useLayoutEffect(setupSynchronization, []);
}
