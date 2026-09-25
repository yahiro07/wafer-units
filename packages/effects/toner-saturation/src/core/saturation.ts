import {
  parametersMapper,
  saturationCurveFunctions,
} from "@/core/saturation-curve-functions";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";

type SaturationEffect = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  update(parameters: { curveType: number; top: number; drive: number }): void;
  cleanup(): void;
};

const configs = {
  curveSize: 1024,
  curveSteps: 10,
  //since waveShaper node can handle only input in range of -1~1,
  //we need to scale the input to process wider range of signals
  shaperInputScaling: 4,
};

function createCurveBuffer(
  fn: (u: number) => number,
): Float32Array<ArrayBuffer> {
  const { curveSize } = configs;
  const curve = new Float32Array(curveSize);
  for (let i = 0; i < curveSize; i += 1) {
    const u = (i / (curveSize - 1)) * 2 - 1;
    const x = u * configs.shaperInputScaling; //-1~1 --> -4~4
    curve[i] = fn(Math.abs(x)) * Math.sign(x);
  }
  return curve;
}

const curveCache: Record<number, Float32Array<ArrayBuffer>> = {};

function getCurveBufferCached(type: number): Float32Array<ArrayBuffer> {
  if (curveCache[type]) {
    return curveCache[type];
  }
  const curve = createCurveBuffer(
    saturationCurveFunctions[type as keyof typeof saturationCurveFunctions],
  );
  curveCache[type] = curve;
  return curve;
}

export function createSaturationEffect(ac: AudioContext): SaturationEffect {
  const inputNode = ac.createGain();
  const shaperNode = ac.createWaveShaper();
  const outputNode = ac.createGain();
  shaperNode.oversample = "2x";

  connectNodes(inputNode, shaperNode, outputNode);

  let curveLastSet: Float32Array<ArrayBuffer> | null = null;

  return {
    inputNode,
    outputNode,
    update(parameters) {
      const { curveType: prCurveType, top: prTop, drive: prDrive } = parameters;
      const curveBuffer = getCurveBufferCached(prCurveType);
      if (curveLastSet !== curveBuffer) {
        shaperNode.curve = curveBuffer;
        curveLastSet = curveBuffer;
      }

      const inputNodeBaseGain = 1 / configs.shaperInputScaling; //-4~4 ---> -1~1

      const xScale = parametersMapper.mapPrDriveToXCale(prDrive);
      const yScale = parametersMapper.mapPrTopToYScale(prTop);
      const inputGain =
        yScale === 0 ? 0 : (inputNodeBaseGain * xScale) / yScale;
      const outputGain = yScale;

      inputNode.gain.setValueAtTime(inputGain, ac.currentTime + 0.01);
      outputNode.gain.setValueAtTime(outputGain, ac.currentTime + 0.01);
    },
    cleanup() {
      disconnectNodes(inputNode, shaperNode, outputNode);
    },
  };
}
