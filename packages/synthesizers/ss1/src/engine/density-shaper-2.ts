import { connectNodes } from "@/engine/webaudio-helpers";
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

  return {
    inputNode,
    outputNode,
    update(level: number) {
      let inGain = 1;
      let outGain = 1;
      updateConnection(level > 0 ? true : false);
      if (level > 0) {
        level *= level;
        const scalerIn = mapUnaryTo(level, 1, 8);
        const scalerOut = mapUnaryTo(invPower2(level), 1, 3);
        inGain = (1 / spec.inputHeadroom) * scalerIn;
        outGain = 1 / scalerOut;
      } else {
        inGain = 1;
        outGain = 1;
      }
      if (inputNode.gain.value !== inGain) {
        const t = ac.currentTime;
        inputNode.gain.cancelScheduledValues(t);
        const curr = inputNode.gain.value;
        if (curr !== 1) {
          inputNode.gain.setValueAtTime(curr, t);
          inputNode.gain.linearRampToValueAtTime(inGain, t + 0.03);
        } else {
          inputNode.gain.value = inGain;
        }
      }
      if (outputNode.gain.value !== outGain) {
        const t = ac.currentTime;
        outputNode.gain.cancelScheduledValues(t);
        const curr = outputNode.gain.value;
        if (curr !== 1) {
          outputNode.gain.setValueAtTime(curr, t);
          outputNode.gain.linearRampToValueAtTime(outGain, t + 0.03);
        } else {
          outputNode.gain.value = outGain;
        }
      }
    },
    cleanup() {
      updateConnection(null);
    },
  };
}
