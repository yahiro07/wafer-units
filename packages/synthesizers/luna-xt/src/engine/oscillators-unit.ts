import { oscParameterKeys, SynthesisBus } from "@/engine/engine-defs";
import { createOscillatorCore, OscillatorCore } from "@/engine/oscillator-core";
import { getCustomWaveform } from "@/engine/custom-waveforms";
import { mapUnaryTo, midiToFrequency } from "@/utils/synth-math-utils";
import {
  LaneId,
  oscAltWaveMap,
  OscWave,
  SynthParameters,
} from "@/defs/definitions";
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
  detuneHalfMax: 1,
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
  altWave: boolean;
};

const unisonBaseSpecs: Record<
  1 | 2 | 3 | 4 | 5,
  {
    coreIndex: number;
    subIndices?: number[];
    detuneMap?: number[];
    altIndices?: number[];
  }
> = {
  [1]: {
    coreIndex: 0,
  },
  [2]: {
    coreIndex: 0,
    subIndices: [1],
    altIndices: [0],
  },
  [3]: {
    coreIndex: 1,
    subIndices: [2],
    detuneMap: [-0.971, 0, 0.997],
    altIndices: [1],
  },
  [4]: {
    coreIndex: 1,
    subIndices: [0, 2],
    detuneMap: [-0.971, -0.271, 0.278, 0.997],
    altIndices: [1, 2],
  },
  [5]: {
    coreIndex: 2,
    subIndices: [0, 3],
    detuneMap: [-0.971, -0.401, 0, 0.408, 0.997],
    altIndices: [1, 2],
  },
};

function buildUnisonPartialSpecs(
  laneId: LaneId,
  pr: SynthParameters,
): UnisonPartialSpec[] {
  const pk = oscParameterKeys[laneId];
  const prOctave = pr[pk.octave];
  const numUnison = pr[pk.unison];
  const prDetune = pr[pk.detune];
  const isStereo = pr[pk.spread];
  const mixLevel = pr[pk.mix];
  const subEnabled = pr[pk.sub];

  const baseVolume = Math.sqrt(1 / numUnison) + numUnison * 0.04;
  const sideLevel = mixLevel;
  const baseSpec =
    unisonBaseSpecs[numUnison as keyof typeof unisonBaseSpecs] ??
    unisonBaseSpecs[1];

  const specs = seqNumbers(numUnison).map((i) => {
    const pos = numUnison === 1 ? 0 : mapUnaryTo(i / (numUnison - 1), -1, 1);
    const isCore = i === baseSpec.coreIndex;
    const isSub = baseSpec.subIndices?.includes(i);
    const detunePos = true ? (baseSpec.detuneMap?.[i] ?? pos) : pos;
    const detune = detunePos * prDetune ** 2 * configs.detuneHalfMax;
    const octave = subEnabled && isSub ? prOctave - 1 : prOctave;
    let panning = isStereo ? pos : 0;
    if (numUnison === 2) {
      panning *= 0.5;
    }
    const volume = (isCore ? 1 : sideLevel) * baseVolume;
    const altWave =
      (pr._oscAltWaveMix && baseSpec.altIndices?.includes(i)) || false;
    return { octave, detune, panning, volume, altWave };
  });
  if (1) {
    const rms = Math.sqrt(
      specs.reduce((acc, spec) => acc + spec.volume * spec.volume, 0),
    );
    const scale = (rms > 0 ? 1 / rms : 1) * 0.707;
    return specs.map((spec) => ({
      ...spec,
      volume: spec.volume * scale,
    }));
  }
  return specs;
}

export function createOscillatorsUnit(
  laneId: LaneId,
  bus: SynthesisBus,
  noteNumber: number,
): OscillatorsUnit {
  const pk = oscParameterKeys[laneId];
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
      const unisonPartialSpecs = buildUnisonPartialSpecs(laneId, pr);

      const prWave = pr[pk.wave];
      const prWaveAlt = oscAltWaveMap[prWave] ?? OscWave.sawtooth;
      const waveform = getCustomWaveform(ac, prWave);
      const waveformAlt = getCustomWaveform(ac, prWaveAlt);

      for (let i = 0; i < numUnison; i++) {
        const osc = oscPartials[i];
        const spec = unisonPartialSpecs[i];
        const frequency = midiToFrequency(
          noteNumber + spec.octave * 12 + spec.detune,
        );
        osc.setFrequency(frequency);
        osc.setWaveform(spec.altWave ? waveformAlt : waveform);
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
