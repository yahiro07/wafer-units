import { EffectParameters } from "@/core/definitions";
import { parameterMapper } from "@/core/parameter-mapper";
import { store } from "@/root/store";
import { linearInterpolate } from "@lib/mu2609/utils/helpers";
import { useMemo } from "preact/hooks";

function makeCurveGraphPath(pr: EffectParameters) {
  const tp = parameterMapper.mapThreshold(pr.threshold);
  const ratio = parameterMapper.mapRatio(pr.ratio);
  const rp = tp - tp / ratio;

  const dbToCoord = (db: number) => linearInterpolate(db, -40, 0, 0, 100);
  return `M 0 0 L ${dbToCoord(tp)} ${dbToCoord(tp)} L 100 ${dbToCoord(rp)}`;
}

export const CurveGraph = () => {
  const { parameters } = store.useSnapshot();
  const path = useMemo(() => makeCurveGraphPath(parameters), [parameters]);
  return (
    <div className="w-60px h-60px bg-#222">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g transform="scale(1, -1) translate(0, -100)">
          <path d={path} fill="none" stroke="#79f" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};
