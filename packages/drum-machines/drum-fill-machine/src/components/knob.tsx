import { KnobFrame } from "@/components/knob-frame";
import { linearInterpolate } from "@/utils/helpers";
import { css, tw } from "@/common/setup-twind";

export const Knob = ({
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) => {
  const tickAngle = linearInterpolate(value, min, max, -135, 135);
  return (
    <KnobFrame
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    >
      <div class={styles}>
        <div class="inner"></div>
        <div class="tickPlane" style={{ transform: `rotate(${tickAngle}deg)` }}>
          <div class="tick" />
        </div>
      </div>
    </KnobFrame>
  );
};
const styles = tw(
  css({
    "@apply": "relative rounded-full",
    width: "40px",
    height: "40px",
    background: "linear-gradient(to bottom, #fff, #0006)",
    padding: "3px",
    border: "solid 0.5px #4448",
    "& > .inner": {
      "@apply": "w-full h-full rounded-full",
      background: "#eee",
    },
    "& > .tickPlane": {
      "@apply": "absolute-full flex-va",
      "& > .tick": {
        "@apply": "w-[4px] h-[15px] bg-clKnobTick",
      },
    },
  }),
);
