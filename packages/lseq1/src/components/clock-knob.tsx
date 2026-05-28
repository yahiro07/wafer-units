import { startDragSession } from "beams/ax-ui/drag-session";
import { ReactNode } from "react";

export function ClockKnobView({ tickAngle }: { tickAngle: number }) {
  return (
    <div className="border border-[#444] bg-[#fff] w-[36px] h-[36px] rounded-full">
      <div
        className="w-full h-full flex justify-center"
        style={{
          transform: `rotate(${tickAngle}deg)`,
        }}
      >
        <div className="w-[1px] h-[18px] bg-[#444]" />
      </div>
    </div>
  );
}

export function ClockKnobFrame({
  children,
  onTick,
}: {
  children: ReactNode;
  onTick?: (dir: -1 | 1) => void;
}) {
  const handlePointerDown = (e0: React.PointerEvent) => {
    const tickStride = 6;
    let accDelta = 0;
    let prevY = 0;
    startDragSession(e0.nativeEvent, {
      onDown(e) {
        prevY = e.position.y;
      },
      onMove(e) {
        const delta = -(e.position.y - prevY);
        accDelta += delta;
        if (Math.abs(accDelta) > tickStride) {
          const dir = Math.sign(accDelta) as -1 | 1;
          onTick?.(dir);
          accDelta = 0;
        }
        prevY = e.position.y;
      },
    });
  };
  return (
    <div onPointerDown={handlePointerDown} className="cursor-pointer">
      {children}
    </div>
  );
}

export function ClockKnob({
  tickAngle,
  onTick,
}: {
  tickAngle: number;
  onTick?: (dir: -1 | 1) => void;
}) {
  return (
    <ClockKnobFrame onTick={onTick}>
      <ClockKnobView tickAngle={tickAngle} />
    </ClockKnobFrame>
  );
}
