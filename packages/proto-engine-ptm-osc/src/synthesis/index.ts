import { midiToFrequency, power2 } from "mofus/mo-synthesis";
import { queryUnitInterfaceForModule } from "wus-unit-types";
import {
  createSynthParameters,
  SynthParameters,
} from "@/definitions/parameters";
import { createChorusEffectEx } from "@/synthesis/chrous-effect-ex";
import { createDensityShaperBlock } from "@/synthesis/density-shaper";
import { createEnvelopeGeneratorADSR } from "@/synthesis/envelope-generator-adsr";
import {
  createHighPassFilterBlock,
  createLowPassFilterBlock,
} from "@/synthesis/filters";
import { createFoldingShaperBlock } from "@/synthesis/folding-shaper";
import { fillShaperCurveBufferWithDcOffsetRemoval } from "@/synthesis/ptm";
import { createReverberator } from "@/synthesis/reverbrator";
import { createShaperCurveBufferCache } from "@/synthesis/shaper-curve-buffer-cache";
import { createAudioNodeChain } from "@/synthesis/webaudio-helper";

export const unitInterface = queryUnitInterfaceForModule(
  "wus-v01",
  import.meta.url,
);

function getNoteFrequency(noteNumber: number, oscOctave: number): number {
  const modNoteNumber = noteNumber + oscOctave * 12;
  return midiToFrequency(modNoteNumber);
}

type SynthesisBus = {
  audioContext: AudioContext;
  voiceDestinationNode: AudioNode;
  synthParameters: SynthParameters;
  finalDestinationNode: AudioNode;
};

function createSynthesisBus(): SynthesisBus {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const voiceDestinationNode = audioContext.createGain();
  const synthParameters = createSynthParameters();
  const finalDestinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  return {
    audioContext,
    voiceDestinationNode,
    synthParameters,
    finalDestinationNode,
  };
}

type Voice = {
  start(time?: number): void;
  stop(time?: number): void;
  updateNodeParameters(): void;
};

const shaper1CurveBufferCache = createShaperCurveBufferCache(
  1024,
  fillShaperCurveBufferWithDcOffsetRemoval,
);

function createOscillatorBlock(audioContext: AudioContext, noteNumber: number) {
  const oscillatorNode = audioContext.createOscillator();
  oscillatorNode.type = "sawtooth";
  const oscShaperNode = audioContext.createWaveShaper();
  oscShaperNode.oversample = "2x";
  const dcBlockerNode = audioContext.createBiquadFilter();
  dcBlockerNode.type = "highpass";
  dcBlockerNode.frequency.value = 10;
  dcBlockerNode.Q.value = Math.SQRT1_2;
  let lastAssignedCurve: Float32Array | null;

  return {
    outputNode: dcBlockerNode,
    setupNodes() {
      oscillatorNode.connect(oscShaperNode);
      oscShaperNode.connect(dcBlockerNode);
      oscillatorNode.start();
    },
    cleanupNodes() {
      oscillatorNode.disconnect();
      oscShaperNode.disconnect();
      oscillatorNode.stop();
    },
    updateNodeParameters(params: {
      wave: number;
      octave: number;
      shape: number;
    }) {
      const freq = getNoteFrequency(noteNumber, params.octave);
      if (oscillatorNode.frequency.value !== freq) {
        oscillatorNode.frequency.value = freq;
      }
      const curve = shaper1CurveBufferCache.update(params.wave, params.shape);
      if (curve !== lastAssignedCurve) {
        oscShaperNode.curve = curve;
        lastAssignedCurve = curve;
      }
    },
  };
}

function createVoice(bus: SynthesisBus, noteNumber: number): Voice {
  const { audioContext, voiceDestinationNode } = bus;
  const oscillators = createOscillatorBlock(audioContext, noteNumber);
  const highPassFilter = createHighPassFilterBlock(audioContext, noteNumber);
  const lowPassFilter = createLowPassFilterBlock(audioContext, noteNumber);
  const foldingShaper = createFoldingShaperBlock(audioContext);
  const masterGainNode = audioContext.createGain();

  const sp = bus.synthParameters;
  const ampEg = createEnvelopeGeneratorADSR(
    audioContext,
    {
      attack: sp.ampAttack,
      decay: sp.ampDecay,
      sustain: sp.ampSustain,
      release: sp.ampRelease,
    },
    {
      attackMaxSec: 2,
      decayMaxSec: 3,
      releaseMaxSec: 3,
    },
  );

  function updateNodeParameters() {
    const { synthParameters: sp } = bus;
    oscillators.updateNodeParameters({
      wave: sp.oscWave,
      octave: sp.oscOctave,
      shape: sp.oscShape,
    });
    highPassFilter.updateNodeParameters({
      enabled: sp.hpfOn,
      cutoff: sp.hpfCutoff,
      peak: sp.hpfPeak,
    });
    lowPassFilter.updateNodeParameters({
      enabled: sp.filterOn,
      cutoff: sp.filterCutoff,
      peak: sp.filterPeak,
    });
    foldingShaper.updateNodeParameters({
      enabled: sp.foldingShaperOn,
      wave: sp.foldingShaperWave,
      level: sp.foldingShaperLevel,
    });
    const vol = power2(sp.masterVolume);
    if (masterGainNode.gain.value !== vol) {
      masterGainNode.gain.value = vol;
    }
  }

  const nodesChain = createAudioNodeChain(
    oscillators,
    highPassFilter,
    lowPassFilter,
    foldingShaper,
    ampEg.node,
    masterGainNode,
    voiceDestinationNode,
  );

  return {
    start(time?: number) {
      updateNodeParameters();
      nodesChain.connects();
      ampEg.triggerAttack(time);
    },
    stop(time?: number) {
      ampEg.triggerRelease(time);
      const t =
        time && time > audioContext.currentTime
          ? time
          : audioContext.currentTime;
      const delayMs =
        (t - audioContext.currentTime + ampEg.getReleaseTime()) * 1000 + 100;
      setTimeout(
        () => {
          nodesChain.disconnects();
        },
        Math.max(0, delayMs),
      );
    },
    updateNodeParameters,
  };
}

function createEffectChain(bus: SynthesisBus) {
  const { audioContext } = bus;
  const chorus = createChorusEffectEx(audioContext);
  const reverb = createReverberator(audioContext);
  const densityShaper = createDensityShaperBlock(audioContext);

  const nodesChain = createAudioNodeChain(
    bus.voiceDestinationNode,
    densityShaper,
    chorus,
    reverb,
    bus.finalDestinationNode,
  );

  return {
    setupNodes() {
      nodesChain.connects();
    },
    cleanupNodes() {
      nodesChain.disconnects();
    },
    updateNodeParameters() {
      const sp = bus.synthParameters;
      densityShaper.updateNodeParameters({
        enabled: sp.densityShaperLevel > 0,
        level: sp.densityShaperLevel,
      });
      chorus.setLevel(sp.chorusLevel);
      reverb.setLevel(sp.reverbLevel);
    },
  };
}

export function createSynthesizerEngine() {
  const bus = createSynthesisBus();
  const voices: Record<number, Voice> = {};
  const effects = createEffectChain(bus);
  effects.setupNodes();

  const internal = {
    addNote(noteNumber: number, time?: number) {
      const voice = createVoice(bus, noteNumber);
      voice.updateNodeParameters();
      voice.start(time);
      voices[noteNumber] = voice;
    },
    removeNote(noteNumber: number, time?: number) {
      const voice = voices[noteNumber];
      if (voice) {
        voice.stop(time);
        delete voices[noteNumber];
      }
    },
    updateNodeParameters() {
      for (const voice of Object.values(voices)) {
        voice.updateNodeParameters();
      }
      effects.updateNodeParameters();
    },
  };

  return {
    async resumeIfNeeded() {
      if (bus.audioContext.state === "suspended") {
        await bus.audioContext.resume();
      }
    },
    setParameter<K extends keyof SynthParameters>(
      param: K,
      value: SynthParameters[K],
    ) {
      bus.synthParameters[param] = value;
      internal.updateNodeParameters();
    },
    setAllParameters(params: SynthParameters) {
      Object.assign(bus.synthParameters, params);
      internal.updateNodeParameters();
    },
    noteOn(noteNumber: number, time?: number) {
      internal.removeNote(noteNumber, time);
      internal.addNote(noteNumber, time);
    },
    noteOff(noteNumber: number, time?: number) {
      internal.removeNote(noteNumber, time);
    },
  };
}
