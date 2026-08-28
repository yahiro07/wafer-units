export type SaturationType = "type1" | "type2";

const configs = {
  curveSize: 1024,
};

type SaturationSpec = {
  inputHeadroom: number;
  curve: Float32Array<ArrayBuffer>;
};

function createCurveBuffer(
  fn: (u: number) => number,
): Float32Array<ArrayBuffer> {
  const { curveSize } = configs;
  const curve = new Float32Array(curveSize);
  for (let i = 0; i < curveSize; i += 1) {
    const u = (i / (curveSize - 1)) * 2 - 1;
    curve[i] = fn(u);
  }
  return curve;
}

const saturationSpecFactories = {
  type1() {
    //tanh
    const inputHeadroom = 16;
    return {
      inputHeadroom,
      curve: createCurveBuffer((u) => {
        const x = u * inputHeadroom;
        return Math.tanh(x);
      }),
    };
  },
  type2() {
    //x - x^3 / 6.66
    //graph curve
    //https://www.desmos.com/calculator/8t7xmvci0z
    return {
      inputHeadroom: 1.5,
      curve: createCurveBuffer((u) => {
        const x = u * 1.5;
        if (Math.abs(x) <= 1.5) {
          return x - (x * x * x) / 6.66;
        } else {
          return Math.sign(x);
        }
      }),
    };
  },
};

const saturationSpecCache: Record<SaturationType, SaturationSpec | undefined> =
  {
    type1: undefined,
    type2: undefined,
  };

export function createOutputSaturator(ac: AudioContext) {
  const inputNode = ac.createGain();
  const shaperNode = ac.createWaveShaper();
  const outputNode = ac.createGain();
  shaperNode.oversample = "2x";

  let currentType: SaturationType | null | undefined;

  const internal = {
    updateConnection(nextType: SaturationType | null) {
      if (nextType !== currentType) {
        if (currentType !== undefined) {
          inputNode.disconnect();
          shaperNode.disconnect();
        }
        if (nextType) {
          inputNode.connect(shaperNode);
          shaperNode.connect(outputNode);
          const spec = (saturationSpecCache[nextType] ??=
            saturationSpecFactories[nextType]());
          shaperNode.curve = spec.curve;
          inputNode.gain.value = 1 / spec.inputHeadroom;
          outputNode.gain.value = 1;
        } else {
          inputNode.connect(outputNode);
          inputNode.gain.value = 1;
          outputNode.gain.value = 1;
        }
        currentType = nextType;
      }
    },
  };

  return {
    inputNode,
    outputNode,
    update(modeIndex: number) {
      const type = ([null, "type1", "type2"] as const)[modeIndex];
      internal.updateConnection(type);
    },
    cleanup() {
      internal.updateConnection(null);
    },
  };
}
