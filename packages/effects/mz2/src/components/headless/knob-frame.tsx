import { ComponentChildren } from "preact";
import { startDragSession } from "@/utils/drag-session";
import { clampValue } from "@/utils/helpers";

export function KnobFrame(props: {
  value: number;
  min: number;
  max: number;
  step: number;
  children: ComponentChildren;
  onChange: (value: number) => void;
  dragRange?: number;
  onClick?: () => void;
  dragDisabled?: boolean;
  invertY?: boolean;
}) {
  const handlePointerDown = (e0: PointerEvent) => {
    const min = props.min;
    const max = props.max;
    const step = props.step;
    const dragRange = props.dragRange ?? 100;

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
      onPointerDown={handlePointerDown}
      style={{
        cursor: "pointer",
        touchAction: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {props.children}
    </div>
  );
}
