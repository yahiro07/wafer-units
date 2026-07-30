import { createSchedulingPlotter } from "@/root/scheduling-plotter";
import { store } from "@/root/store";
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

function setupUnit() {
  let startTime = 0;

  if (!unitInterface) {
    store.setHostBpm(120);
  }

  unitInterface?.completeSetup({
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
  });
}

function setupSynchronization() {
  return store.subscribe((attrs) => {
    const { barLength, schedulingPlotterCanvas } = attrs;
    if (barLength !== undefined) {
      schedulingPlotter.setBarLength(barLength);
    }
    if (schedulingPlotterCanvas !== undefined) {
      schedulingPlotter.setCanvas(schedulingPlotterCanvas);
    }
  });
}

export function useSetupDrivers() {
  useLayoutEffect(setupUnit, []);
  useLayoutEffect(setupSynchronization, []);
}
