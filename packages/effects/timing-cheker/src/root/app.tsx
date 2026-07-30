import { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import { createStore } from "snap-store";
import { queryUnitInterface } from "wafer-host/unit-types";
import { css } from "@/common/css-realm";
import { GeneralSelector } from "@/components/general-selector";
import { GridBackground } from "@/components/grid-background";
import { LayeredLayout } from "@/components/layered-layout";
import { createSelectorOptions } from "@/utils/selector-option";
import { flexC, flexH, flexV, npx } from "@/utils/utility-styles";

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

type SchedulingPoint = {
  barScheduledAt: number;
  barFrom: number;
  barTo: number;
};

function setupUnit() {
  let startTime = 0;
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
      viewSize: [1000, 700],
    },
    hostCallbacks: {
      setBpm(bpm: number) {
        console.log("aa setBpm", bpm);
        store.setHostBpm(bpm);
      },
    },
    clockHandlers: {
      start() {
        startTime = audioContext.currentTime;
        requestAnimationFrame(graphRenderer.clear);
      },
      processScheduling(_timeFrom, barFrom, barTo, bpm) {
        if (bpm !== store.state.hostBpm) {
          store.setHostBpm(bpm);
        }
        const timePositionFromStart = audioContext.currentTime - startTime;
        const barScheduledAt = mapTimeToBarPosition(timePositionFromStart);
        const schedulingPoint: SchedulingPoint = {
          barScheduledAt,
          barFrom,
          barTo,
        };
        requestAnimationFrame(() =>
          graphRenderer.plotSchedulePoint(schedulingPoint),
        );
      },
    },
  });
}

function mapBarPositionToPlotX(barPosition: number, canvasWidth: number) {
  const { barLength } = store.state;
  return ((barPosition % barLength) / barLength) * canvasWidth;
}

let renderIndex = 0;
let lastX0 = 0;

const graphRenderer = {
  clear() {
    const canvas = document.getElementById("canvas_sc") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderIndex = 0;
  },
  plotSchedulePoint(po: SchedulingPoint) {
    const canvas = document.getElementById("canvas_sc") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const canvasWidth = canvas.width;

    const x0 = mapBarPositionToPlotX(po.barScheduledAt, canvasWidth);
    if (x0 < lastX0) {
      graphRenderer.clear();
    }
    const x1 = mapBarPositionToPlotX(po.barFrom, canvasWidth);
    const x2 = mapBarPositionToPlotX(po.barTo, canvasWidth);
    if (!(x0 <= x1 && x1 <= x2)) return;

    const y = 12 + (renderIndex % 10) * 8;
    // ctx.clearRect(x0 - 2, y - 2, x2 - x0 + 4, 8);
    const color = "#fa0";
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, y + 0.5);
    ctx.lineTo(x1, y + 0.5);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.fillRect(x0 - 2, y, 4, 4);
    ctx.fillRect(x1, y, x2 - x1, 4);

    lastX0 = x0;

    renderIndex++;
  },
};

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

const GraphCanvas = ({ id }: { id: string }) => {
  useEffect(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const bounds = canvas.getBoundingClientRect();
    console.log(bounds);
    canvas.width = Math.round(bounds.width);
    canvas.height = Math.round(bounds.height);
  }, []);
  return <canvas id={id} class={css({ width: "100%", height: "100%" })} />;
};

const HostBpmContainer = () => {
  const { hostBpm } = store.useSnapshot();
  return <div class={css(flexH(1))}>hostBpm: {hostBpm || "--"}</div>;
};

const SchedulerLaneContainer = () => {
  return (
    <LaneBox label="scheduler">
      <LayeredLayout>
        <GridBackground nx={4} ny={1} />
        <GraphCanvas id="canvas_sc" />
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
  useEffect(setupUnit, []);
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
