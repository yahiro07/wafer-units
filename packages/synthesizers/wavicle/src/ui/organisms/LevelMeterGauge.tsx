import type { FC } from "alumina";
import { css, domStyled, jsx } from "alumina";
import { nums } from "@/funcs";

type Props = {
  level: number;
};

const segmentCount = 20;

function getSegmentColor(index: number) {
  const ratio = index / (segmentCount - 1);
  if (ratio <= 0.4) {
    return "hsl(84deg 100% 52%)";
  } else if (ratio <= 0.9) {
    const hue = nums.lerpMap(ratio, 0.4, 0.9, 84, 0);
    return `hsl(${hue}deg 100% 52%)`;
  } else {
    return "hsl(0deg 100% 52%)";
  }
}

export const LevelMeterGauge: FC<Props> = ({ level }) => {
  const normalizedLevel = Math.max(0, Math.min(1, level));
  const litSegmentCount = Math.round(normalizedLevel * segmentCount);

  return domStyled(
    <div class="gauge">
      {Array.from({ length: segmentCount }, (_, index) => {
        const active = index < litSegmentCount;
        return (
          <div
            class={active ? "segment active" : "segment"}
            style={
              { background: active ? getSegmentColor(index) : undefined } as any
            }
          />
        );
      })}
    </div>,
    css`
      width: 150px;
      height: 28px;
      padding: 3px;
      display: flex;
      gap: 2px;
      background: #1b1b1b;
      border-radius: 2px;
      overflow: hidden;

      .segment {
        flex: 1 1 0;
        height: 100%;
        background: #1b1b1b;
        border-radius: 1px;
        transition: background-color 0.1s ease-out;
      }

      .segment.active {
        box-shadow: inset 0 0 0 1px #fff3;
      }
    `,
  );
};
