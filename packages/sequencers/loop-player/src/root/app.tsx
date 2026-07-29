import { useEffect, useRef } from "preact/hooks";
import { css } from "@/common/css-realm";
import { flexH, flexV } from "@/common/utility-styles";
import { seqNumbers } from "@/utils/helpers";

async function loadAudioWaveform(uri: string) {
  const response = await fetch(uri);
  if (!response.ok) throw new Error(`fetch failed: ${uri}`);
  const arrayBuffer = await response.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const left = audioBuffer.getChannelData(0);
  const right =
    audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : left;
  const mono = new Float32Array(audioBuffer.length);
  for (let i = 0; i < mono.length; i++) {
    mono[i] = (left[i] + right[i]) * 0.5;
  }
  return {
    sampleRate: audioBuffer.sampleRate,
    duration: audioBuffer.duration,
    length: audioBuffer.length,
    mono,
  };
}

function downsampleForWaveform(
  samples: Float32Array,
  width: number,
): Float32Array {
  const result = new Float32Array(width);
  const blockSize = samples.length / width;
  for (let i = 0; i < width; i++) {
    let min = 1;
    let max = -1;
    const start = Math.floor(i * blockSize);
    const end = Math.floor((i + 1) * blockSize);
    for (let j = start; j < end; j++) {
      const v = samples[j];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    result[i] = Math.max(Math.abs(min), Math.abs(max));
  }
  return result;
}

async function renderLoopWaveformToCanvas(
  canvas: HTMLCanvasElement,
  uri: string,
) {
  const { mono } = await loadAudioWaveform(uri);
  console.log(mono);
  const ctx = canvas.getContext("2d")!;
  const width = (canvas.width = canvas.clientWidth || 200);
  const height = (canvas.height = canvas.clientHeight || 50);
  const peaks = downsampleForWaveform(mono, width);
  const midY = height / 2;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#888";
  for (let x = 0; x < width; x++) {
    if (x % 2 === 1) continue;
    const amp = peaks[x] * midY;
    ctx.fillRect(x, midY - amp, 1, amp * 2);
  }
}

const WaveformViewDev = () => {
  const uri = "./loops/xkicks-the-jokers-kick.m4a";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bounds = canvas?.getBoundingClientRect();
    if (!bounds) return;
    canvas.width = bounds.width;
    canvas.height = bounds.height;
    renderLoopWaveformToCanvas(canvas, uri);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

const LoopCard = () => {
  const loopKey = "xkicks-the-jokers-kick";
  return (
    <div
      class={css({
        width: "200px",
        height: "50px",
        border: "solid 1px #888",
        position: "relative",
      })}
    >
      <WaveformViewDev />
      <div
        class={css({
          position: "absolute",
          top: 0,
          left: 0,
          fontSize: "12px",
          color: "#888",
        })}
      >
        {loopKey}
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <div class={css(flexH(4))}>
      {seqNumbers(4).map((i) => (
        <div key={i} class={css(flexV(4))}>
          <LoopCard />
          <LoopCard />
          <LoopCard />
          <LoopCard />
        </div>
      ))}
    </div>
  );
};
