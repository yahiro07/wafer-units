import { highClip, seqNumbers } from "mofus/ax";
import { readBufferInterpolated } from "mofus/mo-synthesis";
import { createMemo } from "solid-js";
import { fillShaperCurveBuffer } from "@/synthesis/ptm";
import { createShaperCurveBufferCache } from "@/synthesis/shaper-curve-buffer-cache";

function mapCurveBufferToPathData(
  curveBuffer: Float32Array,
  nx: number,
  ny: number,
): string {
  const points = [
    [0, ny / 2],
    ...seqNumbers(nx).map((i) => {
      const pp = i / (nx - 1);
      const sample = readBufferInterpolated(
        curveBuffer,
        highClip(pp * curveBuffer.length, curveBuffer.length - 1),
      );
      const y = -sample * 0.5 + 0.5;
      return [i, y * ny];
    }),
    [nx - 1, ny / 2],
  ];

  const pathData = points.reduce(
    (acc, [x, y], i) => acc + (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`),
    "",
  );
  return `${pathData}`;
}

export function WaveformView(props: { wave: number; shape: number }) {
  const curveBufferCache = createShaperCurveBufferCache(
    64,
    fillShaperCurveBuffer,
  );
  const nx = 160;
  const ny = 90;
  const pathData = createMemo(() => {
    const curveBuffer = curveBufferCache.update(props.wave, props.shape);
    return mapCurveBufferToPathData(curveBuffer, nx, ny);
  });
  return (
    <div class="bg-[#222]">
      <svg viewBox={`0 0 ${nx} ${ny}`} width={nx} height={ny}>
        <path d={pathData()} stroke="#08f" fill="#08f4" />
      </svg>
    </div>
  );
}
