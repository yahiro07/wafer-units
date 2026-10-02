import { midiToFrequency } from "@lib/mu2609/utils/synth-math-utils";
import { defaultSynthParameters, OscParameters } from "./definitions";
import { createCustomWaveformProvider } from "./waveforms/custom-waveform-provider";

type OscillatorsUnit = {
  noteOn(noteNumber: number, parameters: OscParameters): void;
  noteOff(noteNumber: number): void;
  updateParameters(parameters: Partial<OscParameters>): void;
};

export function createOscillatorsUnit(
  ac: AudioContext,
  destinationNode: AudioNode,
): OscillatorsUnit {
  const waveProvider = createCustomWaveformProvider(ac);

  let osc: OscillatorNode | null = null;
  let latestWave: PeriodicWave | null = null;
  let latestParameters: OscParameters = defaultSynthParameters["osc1"];

  const internal = {
    // updateParameters(parameters: OscParameters) {
    //   if (!osc) return;
    //   const pr = parameters;
    //   const wave = waveProvider.getPeriodicWave({
    //     wave: pr.wave,
    //     shape: pr.shape,
    //     dense: pr.dense,
    //     mix: pr.mix,
    //   });
    //   if (latestWave !== wave) {
    //     osc.setPeriodicWave(wave);
    //     latestWave = wave;
    //   }
    //   // latestParameters = parameters;
    // },
    updateParameters(parameters: Partial<OscParameters>) {
      if (!osc) return;
      const pr = parameters;
      const needUpdateWave = (["wave", "shape", "dense", "mix"] as const).some(
        (key) => pr[key] !== undefined,
      );
      if (needUpdateWave) {
        const wave = waveProvider.getPeriodicWave({
          wave: pr.wave ?? latestParameters.wave,
          shape: pr.shape ?? latestParameters.shape,
          dense: pr.dense ?? latestParameters.dense,
          mix: pr.mix ?? latestParameters.mix,
        });
        if (latestWave !== wave) {
          osc.setPeriodicWave(wave);
          latestWave = wave;
        }
      }
    },
  };

  return {
    noteOn(noteNumber, parameters) {
      if (osc) {
        osc.stop();
      }
      const freq = midiToFrequency(noteNumber);
      osc = ac.createOscillator();
      latestWave = null;
      internal.updateParameters(parameters);
      latestParameters = parameters;
      osc.frequency.value = freq;
      osc.connect(destinationNode);
      osc.start();
    },
    noteOff(noteNumber) {
      osc?.stop();
      osc = null;
    },
    updateParameters: internal.updateParameters,
  };
}
