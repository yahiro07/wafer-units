import { saturationCurveFunctions } from "@/core/saturation-curve-functions";
import { store } from "@/root/store";
import { seqNumbers } from "@lib/mu2609/utils/helpers";

export const GraphRoot = () => {
  const { parameters: pr } = store.useSnapshot();

  const prTop = pr.top;
  const prDrive = pr.drive;
  const coreFn =
    saturationCurveFunctions[
      pr.curveType as keyof typeof saturationCurveFunctions
    ] ?? (() => 0);
  const curveLogicalPoints = seqNumbers(41).map((i) => {
    const inputX = (i / 40) * 2;
    const xsc = 1 + prDrive * 1;
    const x = (inputX * xsc) / prTop;
    let y = 0;
    if (prTop > 0) {
      y = coreFn(x);
    }
    return { x: inputX, y: y * prTop };
  });
  const curveScreenPoints = curveLogicalPoints.map(({ x, y }) => {
    return { x: x * 100, y: 100 - y * 100 };
  });
  const curvePointsText = curveScreenPoints
    .map(({ x, y }) => `${x},${y}`)
    .join(" ");
  return (
    <svg viewBox="0 0 200 104" className="w-200px h-104px bg-#333">
      <g transform="translate(0, 4)">
        <line
          x1={100}
          y1={-4}
          x2={100}
          y2={200}
          stroke="#4448"
          strokeWidth={1}
        />
        <line x1={0} y1={0} x2={200} y2={0} stroke="#4448" strokeWidth={1} />
        <line x1={0} y1={100} x2={100} y2={0} stroke="#fff2" strokeWidth={1} />
        <line x1={100} y1={0} x2={200} y2={0} stroke="#fff2" strokeWidth={1} />
        <text x={100} y={98} fill="#fff" fontSize={8} text-anchor="middle">
          1
        </text>
        <text x={4} y={3} fill="#fff" fontSize={8} text-anchor="middle">
          1
        </text>
        <polyline
          points={curvePointsText}
          stroke="#0f0"
          strokeWidth={1}
          fill="none"
        />
      </g>
    </svg>
  );
};
