import { EffectParameters } from "@/core/definitions";
import { parameterMapper } from "@/core/parameter-mapper";
import { store } from "@/root/store";
import { linearInterpolate } from "@lib/mu2609/utils/helpers";
import { useMemo } from "preact/hooks";

function makeCurveGraphPath(pr: EffectParameters) {
  const tp = parameterMapper.mapThreshold(pr.threshold);
  const ratio = parameterMapper.mapRatio(pr.ratio);
  const knee = parameterMapper.mapKnee(pr.knee);
  const dbToCoord = (db: number) => linearInterpolate(db, -40, 0, 0, 100);
  const pt = (dbX: number, dbY: number) =>
    `${dbToCoord(dbX)} ${dbToCoord(dbY)}`;
  const half = knee / 2;
  const start = Math.max(-40, tp - half);
  const end = Math.min(0, tp + half);
  const compressed = (x: number) => tp + (x - tp) / ratio;
  return [
    `M ${pt(-40, -40)}`,
    `L ${pt(start, start)}`,
    `Q ${pt(tp, tp)} ${pt(end, compressed(end))}`,
    `L ${pt(0, compressed(0))}`,
    `L ${pt(0, -40)}`,
    `Z`,
  ].join(" ");
}

export const CurveGraph = () => {
  const { parameters } = store.useSnapshot();
  const path = useMemo(() => makeCurveGraphPath(parameters), [parameters]);
  return (
    <div className="w-60px h-60px bg-#222">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g transform="scale(1, -1) translate(0, -100)">
          <path d={path} stroke="#79f" strokeWidth="1" fill="#79fd" />
        </g>
      </svg>
    </div>
  );
};
