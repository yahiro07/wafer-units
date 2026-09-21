import { EffectParameters } from "@/core/definitions";
import { mapUnaryTo, seqNumbers } from "@lib/mu2609/utils/helpers";
import { useMemo } from "preact/hooks";
import { makeWrapperCurveFn } from "@/root/curve-functions";

function createSvgWavePathData(parameters: EffectParameters) {
  const curveFn = makeWrapperCurveFn(parameters);

  const numPoints = 128;
  const points0 = seqNumbers(numPoints).map((i) => {
    const pp = i / (numPoints - 1);
    const y = curveFn(pp);
    return { x: pp, y };
  });
  points0.unshift({ x: -0.1, y: points0[0].y });
  points0.unshift({ x: -0.1, y: -0.1 });
  points0.push({ x: 1.1, y: points0.at(-1)!.y });
  points0.push({ x: 1, y: -0.1 });

  const points = points0.map((po) => {
    return { x: mapUnaryTo(po.x, 0, 500), y: mapUnaryTo(po.y, 198, 2) };
  });
  return `M ${points[0].x},${points[0].y} L ${points
    .slice(1)
    .map((p) => `${p.x},${p.y}`)
    .join(" ")}`;
}

export const CurveGraph = ({
  parameters,
}: {
  parameters: EffectParameters;
}) => {
  const svgPathData = useMemo(
    () => createSvgWavePathData(parameters),
    [parameters],
  );
  return (
    <div class="w-500px h-200px bg-#ddd">
      <svg viewBox="0 0 500 200">
        <path
          d={svgPathData}
          stroke="#48c"
          fill="#48c3"
          strokeWidth={2}
          fillOpacity={0}
        />
      </svg>
    </div>
  );
};
