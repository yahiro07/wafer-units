import { startDragSession } from "@lib/mu2609/utils/drag-session";
import { clampValue } from "@lib/mu2609/utils/helpers";
import { JSXElement, mergeProps } from "solid-js";

type Props = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  dragRange?: number;
  onClick?: () => void;
  dragDisabled?: boolean;
  invertY?: boolean;
  children: JSXElement;
};

export const KnobFrame = (inputProps: Props) => {
  const props = mergeProps({ dragRange: 100 }, inputProps);

  const handlePointerDown = (e0: PointerEvent) => {
    const min = props.min;
    const max = props.max;
    const step = props.step;
    const dragRange = props.dragRange;

    const originalValue = props.value;
    let lastValue = originalValue;

    let moved = false;
    let totalDist = 0;
    startDragSession(e0, {
      onMove(e) {
        if (props.dragDisabled) return;

        let delta =
          -(e.position.y - e.originalPosition.y) / (dragRange / (max - min));
        if (props.invertY) {
          delta = -delta;
        }
        let newValue = originalValue + delta;
        if (step > 0) {
          newValue = Math.round(newValue / step) * step;
        }
        newValue = clampValue(newValue, min, max);
        if (newValue !== lastValue) {
          props.onChange(newValue);
          lastValue = newValue;
        }
        totalDist += Math.abs(e.position.y - e.originalPosition.y);
        if (totalDist > 4) {
          moved = true;
        }
      },
      onUp() {
        if (!moved) {
          props.onClick?.();
        }
      },
    });
  };

  return (
    <div
      on:pointerdown={handlePointerDown}
      style={{
        cursor: "pointer",
        "touch-action": "none",
        "-webkit-tap-highlight-color": "transparent",
      }}
    >
      {props.children}
    </div>
  );
};
