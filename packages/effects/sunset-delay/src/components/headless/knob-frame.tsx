import { clampValue } from "mofur/ax";
import { startDragSession } from "mofur/ax-ui";
import { Children } from "@/utils/jsx-types";

export function KnobFrame(props: {
  value: number;
  min: number;
  max: number;
  step: number;
  children: Children;
  onChange: (value: number) => void;
  dragRange?: number;
  onClick?: () => void;
  dragDisabled?: boolean;
}) {
  const handlePointerDown = (e0: PointerEvent) => {
    const min = props.min;
    const max = props.max;
    const step = props.step;
    const dragRange = props.dragRange ?? 100;

    const originalValue = props.value;

    let moved = false;
    let totalDist = 0;
    startDragSession(e0, {
      onMove(e) {
        if (props.dragDisabled) return;

        const delta =
          -(e.position.y - e.originalPosition.y) / (dragRange / (max - min));
        let newValue = originalValue + delta;
        if (step > 0) {
          newValue = Math.round(newValue / step) * step;
        }
        newValue = clampValue(newValue, min, max);
        props.onChange(newValue);
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
    <div onPointerDown={handlePointerDown} style={{ cursor: "pointer" }}>
      {props.children}
    </div>
  );
}
