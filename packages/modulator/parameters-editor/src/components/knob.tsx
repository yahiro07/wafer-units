import { KnobFrame } from "@/components/knob-frame";
import { linearInterpolate } from "@/utils/helpers";
import { tz } from "@/utils/tz";

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
      <div class={styles.base}>
        <div class={styles.inner}></div>
        <div
          class={styles.tickPlane}
          style={{ transform: `rotate(${tickAngle}deg)` }}
        >
          <div class={styles.tick} />
        </div>
      </div>
    </KnobFrame>
  );
};
const styles = {
  base: tz("relative rounded-full", {
    width: "54px",
    height: "54px",
    background: "#d0d0d0",
    padding: "5px",
    border: "solid 0.5px #4448",
  }),
  inner: tz("w-full h-full rounded-full bg-[#eee]"),
  tickPlane: tz("absolute-full flex-va"),
  tick: tz("w-[4px] h-[15px]", "bg-clKnobTick"),
};
