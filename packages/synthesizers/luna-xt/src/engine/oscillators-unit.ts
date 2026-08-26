import { oscParameterKeys, SynthesisBus } from "@/engine/engine-defs";
import { createOscillatorCore, OscillatorCore } from "@/engine/oscillator-core";
import { getCustomWaveform } from "@/engine/custom-waveforms";
import { mapUnaryTo, midiToFrequency } from "@/utils/synth-math-utils";
import { OscId, SynthParameters } from "@/defs/definitions";
import { seqNumbers } from "@/utils/helpers";

type OscillatorsUnit = {
  outputNode: AudioNode;
  update(): void;
  start(time: number): void;
  stop(): void;
};

type UnisonManager = {
  preservePartials(num: number, startNewPartials: boolean): OscillatorCore[];
  startAll(time: number): void;
  stopAll(): void;
};

const configs = {
  phaseRandomMaxSec: 0.003,
  detuneHalfMax: 0.7,
};

function createUnisonManager(outputNode: AudioNode): UnisonManager {
  const ac = outputNode.context as AudioContext;
  const oscPartials: OscillatorCore[] = [];

  return {
    preservePartials(num, startNewPartials) {
      for (let i = 0; i < num; i++) {
        if (!oscPartials[i]) {
          oscPartials[i] = createOscillatorCore(ac, outputNode);
          if (startNewPartials) {
            oscPartials[i].start(ac.currentTime);
          }
        }
      }
      if (num < oscPartials.length) {
        for (let i = num; i < oscPartials.length; i++) {
          oscPartials[i].setVolume(0);
        }
        return oscPartials.slice(0, num);
      } else {
        return oscPartials;
      }
    },
    startAll(time) {
      oscPartials.forEach((osc, i) => {
        const isCenter =
          oscPartials.length === 1 || i === Math.floor(oscPartials.length / 2);
        const startDelay = !isCenter
          ? Math.random() * configs.phaseRandomMaxSec
          : 0;
        osc.start(time + startDelay);
      });
    },
    stopAll() {
      oscPartials.forEach((osc) => {
        osc.stop();
      });
    },
  };
}

type UnisonPartialSpec = {
  octave: number;
  detune: number;
  panning: number;
  volume: number;
};

function buildUnisonPartialSpecs(
  oscId: OscId,
  pr: SynthParameters,
): UnisonPartialSpec[] {
  const pk = oscParameterKeys[oscId];
  const prOctave = pr[pk.octave];
  const numUnison = pr[pk.unison];
  const prDetune = pr[pk.detune];
  const isStereo = pr[pk.spread];

  return seqNumbers(numUnison).map((i) => {
    const pos = numUnison === 1 ? 0 : mapUnaryTo(i / numUnison, -1, 1);
    const isCenter = numUnison === 1 || i === Math.floor(numUnison / 2);
    const detune = pos * prDetune ** 2 * configs.detuneHalfMax;
    return {
      octave: prOctave,
      detune,
      panning: isStereo ? pos : 0,
      volume: isCenter ? 1 : 0.7,
    };
  });
}

export function createOscillatorsUnit(
  oscId: OscId,
  bus: SynthesisBus,
  noteNumber: number,
): OscillatorsUnit {
  const pk = oscParameterKeys[oscId];
  const ac = bus.audioContext;
  const pr = bus.parameters;
  const outputNode = ac.createGain();
  const unisonManager = createUnisonManager(outputNode);
  let playing = false;
  return {
    outputNode,
    update() {
      const numUnison = pr[pk.unison];
      const oscPartials = unisonManager.preservePartials(numUnison, playing);
      const unisonPartialSpecs = buildUnisonPartialSpecs(oscId, pr);
      const waveform = getCustomWaveform(ac, pr[pk.wave]);

      for (let i = 0; i < numUnison; i++) {
        const osc = oscPartials[i];
        const spec = unisonPartialSpecs[i];
        const frequency = midiToFrequency(
          noteNumber + spec.octave * 12 + spec.detune,
        );
        osc.setFrequency(frequency);
        osc.setWaveform(waveform);
        osc.setVolume(spec.volume);
        osc.setPanning(spec.panning);
      }
    },
    start(time) {
      unisonManager.startAll(time);
      playing = true;
    },
    stop() {
      unisonManager.stopAll();
    },
  };
}
