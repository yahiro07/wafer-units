import type { UnitInterface } from "wafer-host/unit-types";
import type {
  SynthParameters,
  EffectEngine,
  SynthParameterKey,
  OscParameters,
} from "./definitions";
import { midiToFrequency } from "@lib/mu2609/utils/synth-math-utils";
import { createCustomWaveformProvider } from "./waveforms/custom-waveform-provider";
import { createTiltingEq } from "./tilting-eq";
import { connectNodes } from "@lib/mu2609/utils/webaudio-helper";
import { createReverb } from "./reverb";

type OscillatorUnit = {
  noteOn(noteNumber: number): void;
  noteOff(noteNumber: number): void;
  applyParametersToNodes(): void;
};

function createOscillatorUnit(
  ac: AudioContext,
  destinationNode: AudioNode,
  parameters: OscParameters,
): OscillatorUnit {
  const waveProvider = createCustomWaveformProvider(ac);

  let osc: OscillatorNode | null = null;
  let latestWave: PeriodicWave | null = null;

  const internal = {
    applyParametersToNodes() {
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
    noteOn(noteNumber) {
      if (osc) {
        osc.stop();
      }
      const freq = midiToFrequency(noteNumber);
      osc = ac.createOscillator();
      latestWave = null;
      internal.applyParametersToNodes();
      osc.frequency.value = freq;
      osc.connect(destinationNode);
      osc.start();
    },
    noteOff(noteNumber) {
      osc?.stop();
      osc = null;
    },
    applyParametersToNodes: internal.applyParametersToNodes,
  };
}

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
  parameters: SynthParameters,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  const oscMixNode = ac.createGain();

  const osc1 = createOscillatorUnit(ac, oscMixNode, parameters.osc1);
  const osc2 = createOscillatorUnit(ac, oscMixNode, parameters.osc2);
  const osc3 = createOscillatorUnit(ac, oscMixNode, parameters.osc3);

  const titlingEq = createTiltingEq(ac);
  const reverb = createReverb(ac);

  const disconnects = connectNodes(
    oscMixNode,
    titlingEq,
    reverb,
    destinationNode,
  );

  const internal = {
    affectParameters(keys: SynthParameterKey[]) {
      if (keys.includes("osc1")) {
        osc1.applyParametersToNodes();
      }
      if (keys.includes("osc2")) {
        osc2.applyParametersToNodes();
      }
      if (keys.includes("osc3")) {
        osc3.applyParametersToNodes();
      }
      if (keys.includes("eq")) {
        titlingEq.update({
          prFreq: parameters.eq.freq,
          prTilt: parameters.eq.tilt,
        });
      }
      if (keys.includes("reverb")) {
        reverb.apply({
          decay: parameters.reverb.time,
          damp: parameters.reverb.tone,
          mix: parameters.reverb.mix,
        });
      }
    },
    affectParametersAll() {
      internal.affectParameters(["osc1", "osc2", "osc3", "eq", "reverb"]);
    },
  };
  internal.affectParametersAll();

  return {
    affectParameters: internal.affectParameters,
    affectParametersAll: internal.affectParametersAll,
    noteOn(noteNumber) {
      osc1.noteOn(noteNumber);
      osc2.noteOn(noteNumber);
      osc3.noteOn(noteNumber);
    },
    noteOff(noteNumber) {
      osc1.noteOff(noteNumber);
      osc2.noteOff(noteNumber);
      osc3.noteOff(noteNumber);
    },
    cleanup() {
      disconnects();
    },
  };
}
