import { seqNumbers } from "mofur/ax";
import { LfoWave } from "@/base/types";
import { qu } from "@/utils/qstyle-goober";

const waveFns = {
  [LfoWave.Sine]: (pp) => -Math.cos(2 * Math.PI * pp) * 0.5 + 0.5,
  [LfoWave.Triangle]: (pp) => (pp < 0.5 ? pp * 2 : 1 - (pp - 0.5) * 2),
  [LfoWave.Saw]: (pp) => 1 - pp,
  [LfoWave.Rect]: (pp) => (pp < 0.5 ? 1 : 0),
  [LfoWave.SampleHold]: () => Math.random(),
} satisfies Record<LfoWave, (pp: number) => number>;

export const UnitWaveView = ({ wave }: { wave: LfoWave }) => {
  const waveFn = waveFns[wave];
  const svgPoints = seqNumbers(16)
    .map((i) => {
      const pp = i / 16;
      const y = waveFn(pp);
      return `${i},${(1 - y) * 16}`;
    })
    .join(" ");
  return (
    <div class={qu.wh(40, 40).bg("#ddd")}>
      <svg viewBox="0 0 16 16">
        <path d={`M 0,16 L ${svgPoints}`} stroke="#48c" fill="none" />
      </svg>
    </div>
  );
};
