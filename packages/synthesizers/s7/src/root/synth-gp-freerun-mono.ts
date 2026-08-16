import { ISynthesizer, SynthParameters } from "@/root/synth-common";

type OscillatorNodes = {
  oscillators: OscillatorNode[];
  gains: GainNode[];
  panners: StereoPannerNode[];
};

type OscillatorBank = {
  noteOn(noteNumber: number, time: number): void;
  affectParametersUpdate(): void;
  stop(time: number): void;
};

type AmpGate = {
  inputNode: GainNode;
  gateOn(time: number): void;
  gateOff(time: number): void;
  disconnect(): void;
};

const DETUNE_RATIOS = [0, 0.0146, 0.0381, 0.0883, -0.0146, -0.0381, -0.0883];
const PAN_DIRECTIONS = [0, 0.5, 0.75, 1, -0.5, -0.75, -1];
const ATTACK_SECONDS = 0.001;
const MAX_RELEASE_SECONDS = 3;

function midiNoteToFrequency(noteNumber: number): number {
  return 440 * 2 ** ((noteNumber - 69) / 12);
}

function getBaseFrequency(noteNumber: number, octave: number): number {
  return midiNoteToFrequency(noteNumber + octave * 12);
}

function getOscillatorGain(index: number, unisonMix: number): number {
  const sideGain = index === 0 ? 1 : unisonMix;
  const normalization = Math.sqrt(1 + unisonMix ** 2 * 6);
  return sideGain / normalization;
}

function createAmpGate(
  audioContext: AudioContext,
  destinationNode: AudioNode,
  parameters: SynthParameters,
): AmpGate {
  const inputNode = audioContext.createGain();
  inputNode.gain.value = 0;
  inputNode.connect(destinationNode);

  return {
    inputNode,
    gateOn(time) {
      inputNode.gain.cancelScheduledValues(time);
      inputNode.gain.setValueAtTime(0, time);
      inputNode.gain.linearRampToValueAtTime(1, time + ATTACK_SECONDS);
    },
    gateOff(time) {
      const releaseSeconds = Math.max(
        ATTACK_SECONDS,
        parameters.ampRelease ** 2 * MAX_RELEASE_SECONDS,
      );
      inputNode.gain.cancelScheduledValues(time);
      inputNode.gain.setValueAtTime(1, time);
      inputNode.gain.linearRampToValueAtTime(0, time + releaseSeconds);
    },
    disconnect() {
      inputNode.disconnect();
    },
  };
}

function createOscillatorNodes(
  audioContext: AudioContext,
  destinationNode: AudioNode,
) {
  const nodes: OscillatorNodes = {
    oscillators: [],
    gains: [],
    panners: [],
  };

  for (let index = 0; index < DETUNE_RATIOS.length; index += 1) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const panner = audioContext.createStereoPanner();

    oscillator.type = "sawtooth";
    oscillator.connect(gain);
    gain.connect(panner);
    panner.connect(destinationNode);

    nodes.oscillators.push(oscillator);
    nodes.gains.push(gain);
    nodes.panners.push(panner);
  }
  return nodes;
}

function createOscillatorBank(
  audioContext: AudioContext,
  destinationNode: AudioNode,
  parameters: SynthParameters,
): OscillatorBank {
  let nodes = createOscillatorNodes(audioContext, destinationNode);

  const internal = {
    applyParametersToNodes(
      nodesToApply: OscillatorNodes,
      time: number,
      baseFrequency?: number,
    ): void {
      for (
        let index = 0;
        index < nodesToApply.oscillators.length;
        index += 1
      ) {
        const oscillator = nodesToApply.oscillators[index];

        if (baseFrequency !== undefined) {
          oscillator.frequency.setValueAtTime(baseFrequency, time);
        }
        oscillator.detune.setValueAtTime(
          DETUNE_RATIOS[index] * parameters.unisonDetune ** 2 * 1200,
          time,
        );
        nodesToApply.gains[index].gain.setValueAtTime(
          getOscillatorGain(index, parameters.unisonMix),
          time,
        );
        nodesToApply.panners[index].pan.setValueAtTime(
          PAN_DIRECTIONS[index] * parameters.unisonSpread,
          time,
        );
      }
    },
    startOscillatorNodes(
      nodesToStart: OscillatorNodes,
      time: number,
      baseFrequency: number,
    ) {
      internal.applyParametersToNodes(nodesToStart, time, baseFrequency);
      for (const oscillator of nodesToStart.oscillators) {
        oscillator.start(time);
      }
    },
    stopOscillatorNodes(nodesToStop: OscillatorNodes, time: number) {
      for (const oscillator of nodesToStop.oscillators) {
        oscillator.stop(time);
      }
      const delayMilliseconds =
        Math.max(0, time - audioContext.currentTime + 0.02) * 1000;
      setTimeout(() => {
        for (const oscillator of nodesToStop.oscillators)
          oscillator.disconnect();
        for (const gain of nodesToStop.gains) gain.disconnect();
        for (const panner of nodesToStop.panners) panner.disconnect();
      }, delayMilliseconds);
    },
  };

  internal.startOscillatorNodes(
    nodes,
    audioContext.currentTime,
    getBaseFrequency(69, parameters.octave),
  );

  return {
    noteOn(noteNumber, time) {
      const baseFrequency = getBaseFrequency(noteNumber, parameters.octave);
      if (parameters.phaseRandom) {
        internal.applyParametersToNodes(nodes, time, baseFrequency);
      } else {
        internal.stopOscillatorNodes(nodes, time);
        nodes = createOscillatorNodes(audioContext, destinationNode);
        internal.startOscillatorNodes(nodes, time, baseFrequency);
      }
    },
    affectParametersUpdate() {
      internal.applyParametersToNodes(nodes, audioContext.currentTime);
    },
    stop(time) {
      internal.stopOscillatorNodes(nodes, time);
    },
  };
}

export function createSynthesizerGpFreerunMono(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
): ISynthesizer {
  let parameters = structuredClone(initialParameters);
  let currentNote: number | undefined;

  const outputNode = audioContext.createGain();
  outputNode.gain.value = parameters.volume;
  const ampGate = createAmpGate(audioContext, outputNode, parameters);

  const oscillatorBank = createOscillatorBank(
    audioContext,
    ampGate.inputNode,
    parameters,
  );

  return {
    outputNode,
    setParameters(nextParameters: SynthParameters) {
      Object.assign(parameters, nextParameters);
      const time = audioContext.currentTime;
      outputNode.gain.setValueAtTime(parameters.volume, time);
      oscillatorBank.affectParametersUpdate();
    },
    noteOn(noteNumber: number, time: number) {
      const startTime = Math.max(time, audioContext.currentTime);
      oscillatorBank.noteOn(noteNumber, startTime);
      currentNote = noteNumber;
      ampGate.gateOn(startTime);
    },
    noteOff(noteNumber: number, time: number) {
      if (currentNote !== noteNumber) return;
      currentNote = undefined;
      const stopTime = Math.max(time, audioContext.currentTime);
      ampGate.gateOff(stopTime);
    },
    cleanup() {
      oscillatorBank.stop(audioContext.currentTime);
      ampGate.disconnect();
      outputNode.disconnect();
    },
  };
}
