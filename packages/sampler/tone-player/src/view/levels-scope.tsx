import { Point } from "@lib/mu2609/utils/drag-session";

function makeLevelsPath(levels: number[]) {
  const points = levels.map((level, i) => {
    const xi = i / levels.length;
    return { x: xi, y: level };
  });
  const mapCoord = (p: Point) => ({
    x: p.x * 400,
    y: p.y * 100,
  });
  return `M -100 0 L ${points
    .map((p) => {
      const { x, y } = mapCoord(p);
      return `${x} ${y}`;
    })
    .join(" ")} Z`;
}

export const LevelsScope = ({ levels }: { levels: number[] }) => {
  if (levels.length === 0) return null;
  const path = makeLevelsPath(levels);
  return (
    <svg viewBox="0 -100 400 200" class="w-full h-full">
      <path d={path} stroke="#00f" fill="#00f" />
      <path d={path} stroke="#00f" fill="#00f" transform="scale(1, -1)" />
    </svg>
  );
};
