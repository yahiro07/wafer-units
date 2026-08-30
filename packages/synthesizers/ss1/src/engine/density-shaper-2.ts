import {
  connectNodes,
  createNodeParameterSetter,
} from "@/engine/webaudio-helpers";
import { invPower2, mapUnaryTo, power2 } from "@/utils/synth-math-utils";

function createCurveBuffer(
  fn: (u: number) => number,
): Float32Array<ArrayBuffer> {
  const curveSize = 1024;
  const curve = new Float32Array(curveSize);
  for (let i = 0; i < curveSize; i += 1) {
    const u = (i / (curveSize - 1)) * 2 - 1;
    curve[i] = fn(u);
  }
  return curve;
}

const configs = {
  asymmetric: false,
  withNoise: false,
};

const saturationSpecFactories = {
  tanh() {
    //tanh
    const inputHeadroom = 16;
    return {
      inputHeadroom,
      curve: createCurveBuffer((u) => {
        const x = u * inputHeadroom;
        let y = Math.tanh(x);
        if (configs.asymmetric) {
          const asymmetricalGain = u > 0 ? mapUnaryTo(u, 1, 3) : 1;
          y *= asymmetricalGain;
        }
        if (configs.withNoise) {
          const noiseGain = power2(Math.abs(u)) * 0.2;
          y += Math.random() * noiseGain;
        }
        return y;
      }),
    };
  },
};

export function createDensityShaper2(ac: AudioContext) {
  const inputNode = ac.createGain();
  const shaperNode = ac.createWaveShaper();
  const outputNode = ac.createGain();
  shaperNode.oversample = "2x";
  const spec = saturationSpecFactories.tanh();
  shaperNode.curve = spec.curve;

  let wireState: boolean | null | undefined;

  const updateConnection = (nextWireState: boolean | null) => {
    if (nextWireState === wireState) return;

    if (wireState !== undefined) {
      inputNode.disconnect();
      shaperNode.disconnect();
    }
    if (nextWireState === true) {
      connectNodes(inputNode, shaperNode, outputNode);
    } else if (nextWireState === false) {
      connectNodes(inputNode, outputNode);
    }
    wireState = nextWireState;
  };

  const setters = {
    inputGain: createNodeParameterSetter(ac, inputNode.gain, 0.03),
    outputGain: createNodeParameterSetter(ac, outputNode.gain, 0.03),
  };

  return {
    inputNode,
    outputNode,
    update(level: number) {
      let inGain = 1;
      let outGain = 1;
      const enabled = level > 0;
      const isSwitching =
        (!wireState && enabled) || (wireState && !enabled) || false;
      updateConnection(enabled);
      if (enabled) {
        level *= level;
        const scalerIn = mapUnaryTo(level, 1, 8);
        const scalerOut = mapUnaryTo(invPower2(level), 1, 3);
        inGain = (1 / spec.inputHeadroom) * scalerIn;
        outGain = 1 / scalerOut;
      } else {
        inGain = 1;
        outGain = 1;
      }
      setters.inputGain.set(inGain, isSwitching);
      setters.outputGain.set(outGain, isSwitching);
    },
    cleanup() {
      updateConnection(null);
    },
  };
}
