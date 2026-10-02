import type { UnitInterface } from "wafer-host/unit-types";
import type {
  SynthParameters,
  EffectEngine,
  SynthParameterKey,
} from "./definitions";
import { midiToFrequency } from "@lib/mu2609/utils/synth-math-utils";
import { createCustomWaveformProvider } from "./waveforms/custom-waveform-provider";

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
  parameters: SynthParameters,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const waveProvider = createCustomWaveformProvider(ac);

  let osc: OscillatorNode | undefined;
  let latestWave: PeriodicWave | undefined;

  const internal = {
    affectParameters(keys: SynthParameterKey[]) {
      const waveParamsChanged = (
        ["wave", "shape", "dense", "mix"] as const
      ).some((key) => keys.includes(key));
      if (osc && waveParamsChanged) {
        const pr = parameters;
        const newWave = waveProvider.getPeriodicWave({
          wave: pr.wave,
          shape: pr.shape,
          dense: pr.dense,
          mix: pr.mix,
        });
        if (latestWave !== newWave) {
          osc.setPeriodicWave(newWave);
          latestWave = newWave;
        }
      }
    },
    affectParametersAll() {
      internal.affectParameters(["wave", "shape", "dense", "mix"]);
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
      const wave = waveProvider.getPeriodicWave({
        wave: pr.wave,
        shape: pr.shape,
        dense: pr.dense,
        mix: pr.mix,
      });
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
