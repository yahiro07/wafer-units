import { mountAppRoot } from "@beam/ax-react";
import "./styles";
import { mapUnaryFrom, mapUnaryTo } from "@beam/ax/number-utils";
import { useEffect, useRef } from "react";
import { createStore } from "snap-store";
import { getHostInterface } from "wus-unit-types";

const store = createStore<{
  fftData: Float32Array | undefined;
  sampleRate: number;
}>({
  fftData: undefined,
  sampleRate: 0,
});

function setupUnitInstance() {
  const hostInterface = getHostInterface();
  if (hostInterface) {
    const audioContext = hostInterface.audioContext;
    store.assigns({ sampleRate: audioContext.sampleRate });
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 1024;
    const getLevels = () => {
      const levels = new Float32Array(analyzer.frequencyBinCount);
      analyzer.getFloatFrequencyData(levels);
      return levels;
    };
    setInterval(() => {
      const fftData = getLevels();
      store.assigns({ fftData });
    }, 16);

    hostInterface.audioSourceNode.connect(analyzer);
    analyzer.connect(hostInterface.audioDestinationNode);

    hostInterface.setupUnitAgent({ type: "effect" });
  }
}
setupUnitInstance();

function frequencyToMidiNoteNumber(freq: number) {
  return 69 + 12 * Math.log2(freq / 440);
}

function degToRad(deg: number) {
  return deg * (Math.PI / 180);
}

function renderCanvasSpectrum(
  canvas: HTMLCanvasElement,
  fftData: Float32Array,
  sampleRate: number,
) {
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.lineWidth = 4;
  // ctx.strokeStyle = "#0f03";
  // ctx.moveTo(0, canvas.height / 2);

  const topFreq = sampleRate / 2;
  for (let i = 0; i < fftData.length; i++) {
    const pp = i / (fftData.length - 1);

    let value = mapUnaryFrom(fftData[i], -120, 0, true);
    if (0) {
      value *= (1 - pp) * (1 - pp);
      const frequency = pp * topFreq;
      const noteNumber = frequencyToMidiNoteNumber(frequency);
      const angle = degToRad(noteNumber * 30);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const baseRadius = cy;

      // const octave = (noteNumber / 12) >>> 0;
      // const ra = linearInterpolate(octave, 0, 10, 0.2, 0.8, true);
      const ra = 0.5 - value * 0.5;
      const rb = 0.5 + value * 0.5;

      const pax = cx + Math.cos(angle) * ra * baseRadius;
      const pay = cy + Math.sin(angle) * ra * baseRadius;
      const pbx = cx + Math.cos(angle) * rb * baseRadius;
      const pby = cy + Math.sin(angle) * rb * baseRadius;

      // const hue = pp * 360;
      // const color = `hsla(${hue}, ${100}%, ${value * 100}%, .3)`;
      const color = "#08f4";

      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(pax, pay);
      ctx.lineTo(pbx, pby);
      ctx.stroke();
    } else {
      const px = pp * canvas.width;
      const py = mapUnaryTo(value, canvas.height, 0);
      ctx.strokeStyle = "#0f0";
      ctx.beginPath();
      ctx.moveTo(px, canvas.height);
      ctx.lineTo(px, py);
      ctx.stroke();
    }
  }
}

const SpectrumView0 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { fftData, sampleRate } = store.useSnapshot();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!(fftData && canvas && sampleRate)) return;
    renderCanvasSpectrum(canvas, fftData, sampleRate);
  }, [fftData, sampleRate]);

  return (
    <div className="w-[240px] h-[120px] bg-black">
      <canvas
        ref={canvasRef}
        width="200"
        height="100"
        className="w-full h-full"
      />
    </div>
  );
};

const PanelRoot = () => {
  return (
    <div className="w-full h-full flex-c bg-gray-300">
      <SpectrumView0 />
    </div>
  );
};

const DevelopmentView = () => {
  return (
    <div className="flex-vc gap-8">
      <div className="w-[600px] h-[100px] bd-red">
        <PanelRoot />
      </div>

      <div className="w-[400px] h-[250px] bd-red">
        <PanelRoot />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="w-dvw h-dvh flex-c">
      {0 ? <PanelRoot /> : <DevelopmentView />}
    </div>
  );
};

mountAppRoot(<App />);
