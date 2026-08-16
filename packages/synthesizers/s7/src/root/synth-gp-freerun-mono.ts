import { ISynthesizer, SynthParameters } from "@/root/synth-common";

type OscillatorBank = {
  oscillators: OscillatorNode[];
  gains: GainNode[];
  panners: StereoPannerNode[];
};

const DETUNE_RATIOS = [0, 0.0146, 0.0381, 0.0883, -0.0146, -0.0381, -0.0883];
const PAN_DIRECTIONS = [0, 0.5, 0.75, 1, -0.5, -0.75, -1];
const ATTACK_SECONDS = 0.001;
const MAX_RELEASE_SECONDS = 3;

export function createSynthesizerGpFreerunMono(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
): ISynthesizer {
  let parameters = initialParameters;
  let currentNote: number | undefined;

  const outputNode = audioContext.createGain();
  const gateGain = audioContext.createGain();
  outputNode.gain.value = parameters.volume;
  gateGain.gain.value = 0;
  gateGain.connect(outputNode);

  function midiNoteToFrequency(noteNumber: number): number {
    return 440 * 2 ** ((noteNumber - 69) / 12);
  }

  function getBaseFrequency(noteNumber: number): number {
    return midiNoteToFrequency(noteNumber + parameters.octave * 12);
  }

  function getOscillatorGain(index: number): number {
    const sideGain = index === 0 ? 1 : parameters.unisonMix;
    const normalization = Math.sqrt(1 + parameters.unisonMix ** 2 * 6);
    return sideGain / normalization;
  }

  function applyParametersToBank(
    bank: OscillatorBank,
    time: number,
    baseFrequency?: number,
  ): void {
    for (let index = 0; index < bank.oscillators.length; index += 1) {
      const oscillator = bank.oscillators[index];

      if (baseFrequency !== undefined) {
        oscillator.frequency.setValueAtTime(baseFrequency, time);
      }
      oscillator.detune.setValueAtTime(
        DETUNE_RATIOS[index] * parameters.unisonDetune ** 2 * 1200,
        time,
      );
      bank.gains[index].gain.setValueAtTime(getOscillatorGain(index), time);
      bank.panners[index].pan.setValueAtTime(
        PAN_DIRECTIONS[index] * parameters.unisonSpread,
        time,
      );
    }
  }

  function createBank(time: number, baseFrequency: number): OscillatorBank {
    const bank: OscillatorBank = {
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
      panner.connect(gateGain);

      bank.oscillators.push(oscillator);
      bank.gains.push(gain);
      bank.panners.push(panner);
    }

    applyParametersToBank(bank, time, baseFrequency);
    for (const oscillator of bank.oscillators) {
      oscillator.start(time);
    }

    return bank;
  }

  function stopBank(bank: OscillatorBank, time: number): void {
    for (const oscillator of bank.oscillators) {
      oscillator.stop(time);
    }

    const delayMilliseconds =
      Math.max(0, time - audioContext.currentTime + 0.02) * 1000;
    setTimeout(() => {
      for (const oscillator of bank.oscillators) oscillator.disconnect();
      for (const gain of bank.gains) gain.disconnect();
      for (const panner of bank.panners) panner.disconnect();
    }, delayMilliseconds);
  }

  let bank = createBank(audioContext.currentTime, getBaseFrequency(69));

  return {
    outputNode,

    setParameters(nextParameters: SynthParameters) {
      parameters = nextParameters;
      const time = audioContext.currentTime;

      outputNode.gain.setValueAtTime(parameters.volume, time);
      applyParametersToBank(
        bank,
        time,
        currentNote === undefined ? undefined : getBaseFrequency(currentNote),
      );
    },

    noteOn(noteNumber: number, time: number) {
      const startTime = Math.max(time, audioContext.currentTime);
      const baseFrequency = getBaseFrequency(noteNumber);

      if (parameters.phaseRandom) {
        applyParametersToBank(bank, startTime, baseFrequency);
      } else {
        stopBank(bank, startTime);
        bank = createBank(startTime, baseFrequency);
      }

      currentNote = noteNumber;
      gateGain.gain.cancelScheduledValues(startTime);
      gateGain.gain.setValueAtTime(0, startTime);
      gateGain.gain.linearRampToValueAtTime(1, startTime + ATTACK_SECONDS);
    },

    noteOff(noteNumber: number, time: number) {
      if (currentNote !== noteNumber) return;

      currentNote = undefined;
      const stopTime = Math.max(time, audioContext.currentTime);
      const releaseSeconds = Math.max(
        ATTACK_SECONDS,
        parameters.ampRelease ** 2 * MAX_RELEASE_SECONDS,
      );

      gateGain.gain.cancelScheduledValues(stopTime);
      gateGain.gain.setValueAtTime(1, stopTime);
      gateGain.gain.linearRampToValueAtTime(0, stopTime + releaseSeconds);
    },

    cleanup() {
      stopBank(bank, audioContext.currentTime);
      gateGain.disconnect();
      outputNode.disconnect();
    },
  };
}
