import { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { css, styled } from "@/common/css-realm";
import { LevelGauge } from "@/root/level-gauge";
import { cz } from "@lib/mu2609/utils/cz";
import { createSelectorOptions } from "@lib/mu2609/utils/selector-option";
import { flexC, npx } from "@lib/mu2609/utils/utility-styles";
import { ChannelId } from "@/core/definitions";
import { useStoreSnapshot } from "@/root/store";
import { analyzerEngine } from "@/core/engine-instances";
import { actions } from "@/root/actions";
import {
  LayeredLayout,
  GeneralSelector,
  Button,
  GridBackground,
} from "@lib/toner-ui-dark";

const configs = {
  graphWidth: 600,
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
  children,
  height = 100,
  labelContent,
}: {
  children?: ComponentChildren;
  height?: number;
  labelContent: ComponentChildren;
}) => {
  return (
    <div class="flex-h gap-1">
      {labelContent}
      <div style={{ width: configs.graphWidth, height }}>{children}</div>
    </div>
  );
};

const HostBpmContainer = () => {
  const { hostBpm } = useStoreSnapshot();
  return <div class="flex-h gap-1">hostBpm: {hostBpm || "--"}</div>;
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
  return <canvas ref={canvasRef} class="w-full h-full" />;
};

const GraphBorderFrame = styled.div({
  width: "100%",
  height: "100%",
  border: "solid 1px #333",
});

const LaneLabel = ({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) => {
  return (
    <div
      class={cz("flex-ha w-50px font-500 text-sm", onClick && "cursor-pointer")}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

const ChannelLaneContainer = ({
  channelId,
  height,
}: {
  channelId: ChannelId;
  height: number;
}) => {
  // const height = channelId === "ch3" ? 50 : 120;
  const label = {
    ch1: "INPUT",
    ch2: "OUTPUT",
    ch3: "SC-INPUT",
  }[channelId];
  return (
    <LaneBox height={height} labelContent={<LaneLabel label={label} />}>
      <LayeredLayout>
        <GridBackground nx={4} ny={1} />
        <GraphBorderFrame />
        <GraphCanvas
          canvasSetterFn={(canvas) =>
            analyzerEngine.setWaveCanvas(channelId, canvas)
          }
        />
      </LayeredLayout>
    </LaneBox>
  );
};

const TimeSpanGauge = () => {
  const { barLength, hostBpm } = useStoreSnapshot();
  const unitLength = barLength / 4;
  const unitLengthText = unitLength >= 1 ? unitLength : `1/${1 / unitLength}`;
  const unitMs = unitLength * (240 / hostBpm) * 1000;
  const unitMsText = Number(unitMs.toFixed(1));

  return (
    <div class={cssTimeSpanGauge}>
      <div>
        <span>←</span>
        <span>
          {unitLengthText}bar, {unitMsText}ms
        </span>
        <span>→</span>
      </div>
    </div>
  );
};
const cssTimeSpanGauge = css({
  paddingLeft: "54px",
  "> div": {
    width: npx(configs.graphWidth / 4 + 1),
    height: "28px",
    border: "solid 1px #333",
    background: "#444",
    ...flexC(),
    justifyContent: "space-between",
  },
});

const TopControlBar = () => {
  const { barLength } = useStoreSnapshot();
  return (
    <div class="flex-ha gap-4 justify-between">
      <TimeSpanGauge />
      <div class="flex-ha gap-4">
        <HostBpmContainer />
        <div class="flex-ha gap-1">
          <div>bars</div>
          <GeneralSelector
            className="h-28px"
            options={barLengthOptions}
            value={barLength}
            onChange={actions.setBarLength}
          />
        </div>
      </div>
    </div>
  );
};

const BypassButton = () => {
  const { effectEnabled } = useStoreSnapshot();
  return (
    <Button
      children="ENABLE"
      asr={2.4}
      active={effectEnabled}
      onClick={actions.toggleEffectEnabled}
    />
  );
};

const SideChainButton = () => {
  const { sideChain } = useStoreSnapshot();
  return (
    <Button
      children="SIDE-CHAIN"
      asr={2.4}
      active={sideChain}
      onClick={actions.toggleSideChain}
    />
  );
};

const LevelMeterSection = () => {
  return (
    <div class="flex-va gap-2.5 mt-1 -mr-2">
      <div class="-ml-7">
        <BypassButton />
      </div>
      <div class="flex-c gap-2">
        <div>
          <div className="text-sm">INPUT</div>
          <LevelGauge channelId="ch1" />
        </div>
        <div>
          <div className="text-sm">OUTPUT</div>
          <LevelGauge channelId="ch2" />
        </div>
      </div>
      <div class="-ml-7 mt-0.5">
        <SideChainButton />
      </div>
    </div>
  );
};

const ChannelLanesPart = () => {
  const { sideChain } = useStoreSnapshot();
  return (
    <div class="flex-v gap-0.5">
      {sideChain ? (
        <>
          <ChannelLaneContainer channelId="ch1" height={120} />
          <ChannelLaneContainer channelId="ch2" height={120} />
          <ChannelLaneContainer channelId="ch3" height={48} />
        </>
      ) : (
        <>
          <ChannelLaneContainer channelId="ch1" height={145} />
          <ChannelLaneContainer channelId="ch2" height={145} />
        </>
      )}
    </div>
  );
};

export const PlottingSection = () => {
  return (
    <div class="flex-v gap-1.5">
      <TopControlBar />
      <div class="flex-h gap-7">
        <ChannelLanesPart />
        <LevelMeterSection />
      </div>
    </div>
  );
};
