import { UnitInterface } from "wafer-host/unit-types";

type AnalyzerEngine = {
  start(): void;
  stop(): void;
  cleanup(): void;
};

export function createAnalyzerEngine(
  unitInterface: UnitInterface | undefined,
  setFftData: (fftData: Float32Array) => void,
): AnalyzerEngine {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? audioContext.createGain();
  const analyzer = audioContext.createAnalyser();
  analyzer.fftSize = 1024;

  inputNode.connect(analyzer);

  const getAnalyzerFftData = () => {
    const levels = new Float32Array(analyzer.frequencyBinCount);
    analyzer.getFloatFrequencyData(levels);
    return levels;
  };
  let running = false;

  const self: AnalyzerEngine = {
    start() {
      if (!running) {
        const renderLoop = () => {
          const fftData = getAnalyzerFftData();
          setFftData(fftData);
          if (running) {
            requestAnimationFrame(renderLoop);
          }
        };
        running = true;
        renderLoop();
      }
    },
    stop() {
      running = false;
    },
    cleanup() {
      self.stop();
      inputNode.disconnect();
    },
  };
  return self;
}
