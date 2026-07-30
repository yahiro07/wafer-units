import { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { css, styled } from "@/common/css-realm";
import { GeneralSelector } from "@/components/general-selector";
import { GridBackground } from "@/components/grid-background";
import { LayeredLayout } from "@/components/layered-layout";
import { createSelectorOptions } from "@/utils/selector-option";
import { flexC, flexH, flexV, npx } from "@/utils/utility-styles";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";

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

const GraphCanvas = ({
  canvasSetterFn,
}: {
  canvasSetterFn: (canvas: HTMLCanvasElement | null) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const bounds = canvas.getBoundingClientRect();
      canvas.width = Math.round(bounds.width);
      canvas.height = Math.round(bounds.height);
      canvasSetterFn(canvas);
      return () => canvasSetterFn(null);
    }
  }, []);
  return (
    <canvas ref={canvasRef} class={css({ width: "100%", height: "100%" })} />
  );
};

const GraphBorderFrame = styled.div({
  width: "100%",
  height: "100%",
  border: "solid 1px #aaa",
});

const SchedulerLaneContainer = () => {
  return (
    <LaneBox label="scheduler">
      <LayeredLayout>
        <GridBackground nx={4} ny={1} />
        <GraphBorderFrame />
        <GraphCanvas canvasSetterFn={store.setSchedulingPlotterCanvas} />
      </LayeredLayout>
    </LaneBox>
  );
};

const ChannelLaneContainer = ({
  channelId,
}: {
  channelId: "ch1" | "ch2" | "ch3";
}) => {
  const canvasSetterFn = {
    ch1: store.setWavePlotterCanvasCh1,
    ch2: store.setWavePlotterCanvasCh1, //todo
    ch3: store.setWavePlotterCanvasCh1, //todo
  }[channelId];
  return (
    <LaneBox label={channelId}>
      <LayeredLayout>
        <GridBackground nx={4} ny={1} />
        <GraphBorderFrame />
        <GraphCanvas canvasSetterFn={canvasSetterFn} />
      </LayeredLayout>
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
      <ChannelLaneContainer channelId="ch1" />
      {/* <ChannelLaneContainer channelId="ch2" /> */}
      {/* <ChannelLaneContainer channelId="ch3" /> */}
    </div>
  );
};
