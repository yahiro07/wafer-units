import type { UnitInterface } from "wafer-host/unit-types";
import type {
  SynthParameters,
  EffectEngine,
  SynthParameterKey,
} from "./definitions";
import { fracPart, midiToFrequency } from "@lib/mu2609/utils/synth-math-utils";

type CustomWaveProvider = {
  getPeriodicWave(wave: number, shape: number): PeriodicWave;
};

function makePeriodicWave(context: AudioContext, fn: (pp: number) => number) {
  const n = 256;
  const terms = 128;
  const ys = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const pp = i / n;
    ys[i] = fn(pp);
  }
  const real = new Float32Array(terms);
  const imag = new Float32Array(terms);
  const g = 2;
  for (let h = 0; h < terms; h++) {
    let re = 0;
    let im = 0;
    for (let i = 0; i < n; i++) {
      const phi = (2 * Math.PI * h * i) / n;
      re += ys[i] * Math.cos(phi);
      im += ys[i] * Math.sin(phi);
    }
    real[h] = (re / n) * g;
    imag[h] = (im / n) * g;
  }
  return context.createPeriodicWave(real, imag, {
    disableNormalization: true,
  });
}

function createCustomWaveProvider(ac: AudioContext): CustomWaveProvider {
  const shapeStep = 80;

  let latestKey: string | undefined;
  let latestWave: PeriodicWave | undefined;

  const internal = {
    generateWaveform(wave: number, color: number): PeriodicWave {
      if (wave === 0) {
        return makePeriodicWave(ac, (pp) => {
          pp = fracPart(pp * (1 + color * 7));
          return 2 * pp - 1;
        });
      }
      return makePeriodicWave(ac, (pp) => 2 * pp - 1);
    },
  };

  return {
    getPeriodicWave(wave, shape) {
      const shapeIndex = Math.round(shape * shapeStep);
      const key = `${wave}-${shapeIndex}`;
      if (key !== latestKey) {
        const steppedShape = shapeIndex / shapeStep;
        console.log(`generating waveform for ${key}`);
        latestWave = internal.generateWaveform(wave, steppedShape);
        latestKey = key;
      }
      return latestWave!;
    },
  };
}

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
  parameters: SynthParameters,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const waveProvider = createCustomWaveProvider(ac);

  let osc: OscillatorNode | undefined;
  let latestWave: PeriodicWave | undefined;

  const internal = {
    affectParameters(keys: SynthParameterKey[]) {
      const waveParamsChanged = (["wave", "shape"] as const).some((key) =>
        keys.includes(key),
      );
      if (osc && waveParamsChanged) {
        const pr = parameters;
        const newWave = waveProvider.getPeriodicWave(pr.wave, pr.shape);
        if (latestWave !== newWave) {
          osc.setPeriodicWave(newWave);
          latestWave = newWave;
        }
      }
    },
    affectParametersAll() {
      internal.affectParameters(["wave", "shape"]);
    },
  };
  internal.affectParametersAll();

  return {
    affectParameters: internal.affectParameters,
    affectParametersAll: internal.affectParametersAll,
    noteOn(noteNumber) {
      if (osc) {
        osc.stop();
      }
      const freq = midiToFrequency(noteNumber);
      osc = ac.createOscillator();
      const pr = parameters;
      const wave = waveProvider.getPeriodicWave(pr.wave, pr.shape);
      osc.setPeriodicWave(wave);
      latestWave = wave;
      osc.frequency.value = freq;
      osc.connect(outputNode);
      osc.start();
    },
    noteOff(noteNumber) {
      osc?.stop();
    },
    cleanup() {
      // disconnectNodes(inputNode, pannerNode, gainNode, outputNode);
    },
  };
}
