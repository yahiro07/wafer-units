import { css } from "@/common/css-realm";
import { uiColors } from "@/components/ui-theme";
import { KnobFrame } from "@/components/headless/knob-frame";
import { linearInterpolate } from "@/utils/helpers";
import { absoluteFull, flexVA } from "@/utils/utility-styles";

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
        <div
          class="tick-plane"
          style={{ transform: `rotate(${tickAngle}deg)` }}
        >
          <div class="tick" />
        </div>
      </div>
    </KnobFrame>
  );
};
const styles = css({
  position: "relative",
  borderRadius: "50%",
  "&:hover": {
    opacity: 0.8,
  },
  width: "40px",
  height: "40px",
  background: "linear-gradient(to bottom, #fff, #0006)",
  padding: "3px",
  border: "solid 0.5px #444",
  "> .inner": {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "#aaa",
  },
  "> .tick-plane": {
    ...absoluteFull(),
    ...flexVA(),
    "> .tick": {
      width: "3.5px",
      height: "13px",
      background: uiColors.clKnobTick,
    },
  },
});
