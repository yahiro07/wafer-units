import { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { createStore } from "snap-store";
import { queryUnitInterface } from "wafer-host/unit-types";
import { css } from "@/common/css-realm";
import { GeneralSelector } from "@/components/general-selector";
import { GridBackground } from "@/components/grid-background";
import { LayeredLayout } from "@/components/layered-layout";
import { createSelectorOptions } from "@/utils/selector-option";
import { flexC, flexH, flexV, npx } from "@/utils/utility-styles";
import { createSchedulingPlotter } from "@/root/scheduling-plotter";

console.log("timing-checker 1212");

const unitInterface = queryUnitInterface("wafer-v01");
const audioContext = unitInterface?.audioContext ?? new AudioContext();

const store = createStore<{
  barLength: number;
  hostBpm: number;
}>({
  barLength: 1,
  hostBpm: 0,
});

function mapTimeToBarPosition(time: number) {
  const barSeconds = 240 / store.state.hostBpm;
  return time / barSeconds;
}

if (!unitInterface) {
  store.setHostBpm(120);
}

const schedulingPlotter = createSchedulingPlotter();

function setupUnit() {
  let startTime = 0;
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
      viewSize: [1000, 700],
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

function useSetupDrivers() {
  useEffect(setupUnit, []);
  const { barLength } = store.useSnapshot();
  useEffect(() => {
    schedulingPlotter.setBarLength(barLength);
  }, [barLength]);
}

const barLengthOptions = createSelectorOptions([
  [0.0625, "1/16"],
  [0.125, "1/8"],
  [0.25, "1/4"],
  [0.5, "1/2"],
  [1, "1"],
  [2, "2"],
  [4, "4"],
  [8, "8"],
  [16, "16"],
]);

const LaneBox = ({
  label,
  children,
  height = 100,
}: {
  label: string;
  children?: ComponentChildren;
  height?: number;
}) => {
  return (
    <div class={css(flexH(1))}>
      <div class={css(flexC(1), { width: npx(100) })}>{label}</div>
      <div
        class={css({
          width: npx(800),
          height: npx(height),
        })}
      >
        {children}
      </div>
    </div>
  );
};

const HostBpmContainer = () => {
  const { hostBpm } = store.useSnapshot();
  return <div class={css(flexH(1))}>hostBpm: {hostBpm || "--"}</div>;
};

const SchedulerGraphCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const bounds = canvas.getBoundingClientRect();
      canvas.width = Math.round(bounds.width);
      canvas.height = Math.round(bounds.height);
      schedulingPlotter.setCanvas(canvas);
    }
  }, []);
  return (
    <canvas ref={canvasRef} class={css({ width: "100%", height: "100%" })} />
  );
};

const SchedulerLaneContainer = () => {
  return (
    <LaneBox label="scheduler">
      <LayeredLayout>
        <GridBackground nx={4} ny={1} />
        <div
          class={css({
            width: "100%",
            height: "100%",
            border: "solid 1px #aaa",
          })}
        />
        <SchedulerGraphCanvas />
      </LayeredLayout>
    </LaneBox>
  );
};

const ChnLaneContainer = ({ label }: { label: string }) => {
  return (
    <LaneBox label={label}>
      <GridBackground nx={4} ny={1} />
    </LaneBox>
  );
};

export const App = () => {
  useSetupDrivers();
  return (
    <div class={css(flexV(1))}>
      <div class={css(flexH(4), { justifyContent: "flex-end" })}>
        <HostBpmContainer />
        <div class={css(flexH(1))}>
          <div>bars</div>
          <GeneralSelector
            options={barLengthOptions}
            value={1}
            onChange={store.setBarLength}
          />
        </div>
      </div>
      <SchedulerLaneContainer />
      <ChnLaneContainer label="ch1" />
      <ChnLaneContainer label="ch2" />
      <ChnLaneContainer label="ch3" />
    </div>
  );
};
