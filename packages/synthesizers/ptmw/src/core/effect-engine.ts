import type { UnitInterface } from "wafer-host/unit-types";
import type { OscParameters } from "./definitions";
import { midiToFrequency } from "@lib/mu2609/utils/synth-math-utils";
import { createCustomWaveformProvider } from "./waveforms/custom-waveform-provider";
import { createTiltingEq } from "./tilting-eq";
import { connectNodes } from "@lib/mu2609/utils/webaudio-helper";
import { createReverb } from "./reverb";

type OscillatorUnit = {
  noteOn(noteNumber: number, parameters: OscParameters): void;
  noteOff(noteNumber: number): void;
  updateParameters(parameters: OscParameters): void;
};

function createOscillatorUnit(
  ac: AudioContext,
  destinationNode: AudioNode,
): OscillatorUnit {
  const waveProvider = createCustomWaveformProvider(ac);

  let osc: OscillatorNode | null = null;
  let latestWave: PeriodicWave | null = null;

  const internal = {
    updateParameters(parameters: OscParameters) {
      if (!osc) return;
      const pr = parameters;
      const wave = waveProvider.getPeriodicWave({
        wave: pr.wave,
        shape: pr.shape,
        dense: pr.dense,
        mix: pr.mix,
      });
      if (latestWave !== wave) {
        osc.setPeriodicWave(wave);
        latestWave = wave;
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

export function createEffectEngine(unitInterface: UnitInterface | undefined) {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  const oscMixNode = ac.createGain();

  const osc1 = createOscillatorUnit(ac, oscMixNode);
  const osc2 = createOscillatorUnit(ac, oscMixNode);
  const osc3 = createOscillatorUnit(ac, oscMixNode);

  const titlingEq = createTiltingEq(ac);
  const reverb = createReverb(ac);

  const disconnects = connectNodes(
    oscMixNode,
    titlingEq,
    reverb,
    destinationNode,
  );

  return {
    osc1,
    osc2,
    osc3,
    titlingEq,
    reverb,
    // affectParameters: internal.affectParameters,
    // affectParametersAll: internal.affectParametersAll,
    // noteOn(noteNumber: number) {
    //   osc1.noteOn(noteNumber);
    //   osc2.noteOn(noteNumber);
    //   osc3.noteOn(noteNumber);
    // },
    // noteOff(noteNumber: number) {
    //   osc1.noteOff(noteNumber);
    //   osc2.noteOff(noteNumber);
    //   osc3.noteOff(noteNumber);
    // },
    cleanup() {
      disconnects();
    },
  };
}
