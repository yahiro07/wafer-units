import { useEffect, useRef } from "preact/hooks";
import { appConfig } from "@/common/app-config";
import { css } from "@/common/css-realm";
import { flexH, flexV } from "@/common/utility-styles";
import { LoopKey, loopSourceItems } from "@/root/definitions";
import { setupUnit, useAffectStoreToEngine } from "@/root/drivers";
import { pregeneratePreviewData } from "@/root/pregenerate-preview-data";
import { previewData } from "@/root/preview-data";
import { previewDataConverter } from "@/root/preview-data-converter";
import { store } from "@/root/store";
import { seqNumbers } from "@/utils/helpers";

function renderLoopWaveformToCanvas(
  canvas: HTMLCanvasElement,
  loopKey: LoopKey,
) {
  const loop = loopSourceItems.find((item) => item.fileName === loopKey);
  if (!loop) return;
  const gainFix = loop.gainFix ?? 1;
  const base64 = previewData[loopKey];
  const peaks = previewDataConverter.floatArrayFromBase64(base64);
  const ctx = canvas.getContext("2d")!;
  const width = canvas.width;
  const height = canvas.height;
  const midY = height / 2;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#888";
  for (let x = 0; x < width; x++) {
    if (x % 2 === 1) continue;
    const si = Math.floor((x / width) * peaks.length);
    const amp = peaks[si] * midY * gainFix;
    ctx.fillRect(x, midY - amp, 1, amp * 2);
  }
}

const WaveformViewDev = ({ loopKey }: { loopKey: LoopKey }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bounds = canvas?.getBoundingClientRect();
    if (!bounds) return;
    canvas.width = bounds.width;
    canvas.height = bounds.height;
    renderLoopWaveformToCanvas(canvas, loopKey);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

const LoopCard = ({ loopKey }: { loopKey: LoopKey }) => {
  const { selectedLoopKey } = store.useSnapshot();
  if (!loopKey) return null;
  const active = loopKey === selectedLoopKey;
  const onClick = () => {
    store.setSelectedLoopKey(loopKey);
  };
  return (
    <div
      class={css(
        {
          width: "200px",
          height: "50px",
          border: "solid 1px #888",
          position: "relative",
          cursor: "pointer",
        },
        active && { background: "#8f8" },
      )}
      onClick={onClick}
    >
      <WaveformViewDev loopKey={loopKey} />
      <div
        class={css({
          position: "absolute",
          top: 0,
          left: 0,
          fontSize: "12px",
          color: "#888",
        })}
      >
        {loopKey.split(".")[0]}
      </div>
    </div>
  );
};

const PregeneratePreviewDataButton = () => {
  return (
    <div
      class={css({
        position: "absolute",
        top: 0,
        right: 0,
        fontSize: "12px",
        color: "#888",
        "&>button": {
          padding: "4px",
        },
      })}
    >
      <button onClick={pregeneratePreviewData}>pregenerate preview data</button>
    </div>
  );
};

export const App = () => {
  useEffect(setupUnit, []);
  // useEffect(setupSynchronization, []);
  useAffectStoreToEngine();
  return (
    <>
      <div className={css(flexV(12))}>
        <div class={css(flexH(12))}>
          {seqNumbers(4).map((i) => (
            <div key={i} class={css(flexV(4))}>
              <LoopCard loopKey={loopSourceItems[i * 4 + 0]?.fileName} />
              <LoopCard loopKey={loopSourceItems[i * 4 + 1]?.fileName} />
              <LoopCard loopKey={loopSourceItems[i * 4 + 2]?.fileName} />
              <LoopCard loopKey={loopSourceItems[i * 4 + 3]?.fileName} />
            </div>
          ))}
        </div>
        <div class={css(flexH(12))}>
          {seqNumbers(4).map((i) => (
            <div key={i} class={css(flexV(4))}>
              <LoopCard loopKey={loopSourceItems[16 + i * 4 + 0]?.fileName} />
              <LoopCard loopKey={loopSourceItems[16 + i * 4 + 1]?.fileName} />
              <LoopCard loopKey={loopSourceItems[16 + i * 4 + 2]?.fileName} />
              <LoopCard loopKey={loopSourceItems[16 + i * 4 + 3]?.fileName} />
            </div>
          ))}
        </div>
      </div>
      {appConfig.isDevelopment && <PregeneratePreviewDataButton />}
    </>
  );
};
