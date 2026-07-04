import { useMemo } from "preact/hooks";
import { qu } from "@/base/css-realm";
import { LfoWave } from "@/base/types";
import { seqNumbers } from "@/utils/helpers";

const waveFns = {
  [LfoWave.Sine]: (pp) => -Math.cos(2 * Math.PI * pp) * 0.5 + 0.5,
  [LfoWave.Triangle]: (pp) => (pp < 0.5 ? pp * 2 : 1 - (pp - 0.5) * 2),
  [LfoWave.Saw]: (pp) => 1 - pp,
  [LfoWave.Rect]: (pp) => (pp < 0.5 ? 1 : 0),
  [LfoWave.SampleHold]: (pp) => (pp === 0 ? 0 : Math.random()),
} satisfies Record<LfoWave, (pp: number) => number>;

function createSvgWavePathData(
  wave: LfoWave,
  inverted: boolean,
  shifted: boolean,
) {
  const waveFn = waveFns[wave];
  const points = seqNumbers(17).map((i) => {
    let pp = i / 16;
    if (shifted && wave !== LfoWave.SampleHold) {
      const shiftAmount = wave === LfoWave.Saw ? 0.5 : 0.25;
      pp = (pp - shiftAmount + 1) % 1;
    }
    let y = waveFn(pp);
    if (inverted) {
      y = 1 - y;
    }
    return { x: i, y: (1 - y) * 16 };
  });
  const y0 = points[0].y;
  if (y0 === 0 || y0 === 16) {
    points.unshift({ x: -1, y: y0 });
    points.unshift({ x: -1, y: 16 });
    points.push({ x: 17, y: points.at(-1)!.y });
    points.push({ x: 17, y: 16 });
  } else {
    points.unshift({ x: -1, y: y0 });
    points.unshift({ x: -1, y: y0 });
    points.push({ x: 17, y: y0 });
    points.push({ x: 17, y: y0 });
  }

  return `M ${points[0].x},${points[0].y} L ${points
    .slice(1)
    .map((p) => `${p.x},${p.y}`)
    .join(" ")}`;
}

export const UnitWaveView = ({
  wave,
  inverted,
  shifted,
}: {
  wave: LfoWave;
  inverted: boolean;
  shifted: boolean;
}) => {
  const svgPathData = useMemo(
    () => createSvgWavePathData(wave, inverted, shifted),
    [wave, inverted, shifted],
  );
  return (
    <div class={qu.wh(40, 40).bg("#ddd").it}>
      <svg viewBox="0 0 16 16">
        <path d={svgPathData} stroke="#48c" fill="#48c4" />
      </svg>
    </div>
  );
};
