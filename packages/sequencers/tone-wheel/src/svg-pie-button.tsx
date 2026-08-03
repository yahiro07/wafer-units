const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
) => {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
};

const createDonutSegmentPath = (
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngleDeg: number,
  endAngleDeg: number,
) => {
  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngleDeg);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngleDeg);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngleDeg);
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngleDeg);
  const largeArcFlag = endAngleDeg - startAngleDeg > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
};

export const SvgPieButton = ({
  centerX,
  centerY,
  innerRadius,
  outerRadius,
  centerAngle,
  angleHalfRange,
  fill,
  stroke,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: {
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  centerAngle: number;
  angleHalfRange: number;
  fill?: string;
  stroke?: string;
  onPointerDown?: (e: PointerEvent) => void;
  onPointerUp?: () => void;
  onPointerLeave?: () => void;
}) => {
  const startAngle = centerAngle - angleHalfRange;
  const endAngle = centerAngle + angleHalfRange;
  const path = createDonutSegmentPath(
    centerX,
    centerY,
    outerRadius,
    innerRadius,
    startAngle,
    endAngle,
  );

  return (
    <path
      d={path}
      fill={fill}
      stroke={stroke}
      strokeWidth={1}
      style={{ cursor: "pointer" }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    />
  );
};

export const SvgCircleButton = ({
  centerX,
  centerY,
  radius,
  fill,
  stroke,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: {
  centerX: number;
  centerY: number;
  radius: number;
  fill?: string;
  stroke?: string;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
  onPointerLeave?: () => void;
}) => {
  return (
    <circle
      cx={centerX}
      cy={centerY}
      r={radius}
      fill={fill}
      stroke={stroke}
      strokeWidth={1}
      style={{ cursor: "pointer" }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    />
  );
};
